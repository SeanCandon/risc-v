//
// fileBarWnd.cpp
//
// Copyright (C) 1996 - 2018 jones@scss.tcd.ie
//
// This program is free software; you can redistribute it and/or modify it under
// the terms of the GNU General Public License as published by the Free Software Foundation;
// either version 2 of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
// without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
// See the GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software Foundation Inc.,
// 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
//

#include "stdafx.h"									// pre-compiled headers
#include <QtPrintSupport/QtPrintSupport>			// {joj 7/2/13}

#include "main.h"									// vApp
#include "vivio.h"									//
#include "fileBarWnd.h"								//
#include "viewStackWnd.h"							//
#include "txtEditWnd.h"								//
#include "compiler.h"								//
#include "infoWnd.h"								//
#include "findReplaceDlg.h"							//

#define DEFAULT_FONT	"Tahoma"					//
#define DEFAULT_FONT_SZ	10							//

#define VBORDER			3							//
#define HBORDER			4							//

#define BBORDER			2							// back/forward button border

#define MAXFNX() (width() - 4*BBORDER - height())	// {joj 15/11/10}

#define TIMEMS			200							// {joj 15/11/10}

//
// constructor
//
FileInfo::FileInfo() {
    txtEditWnd = NULL;				//
    doRestore = 0;					//
}

//
// constructor
//
FileBarWnd::FileBarWnd(ViewStackWnd *_viewStackWnd, InfoWnd *_infoWnd) {
    viewStackWnd = _viewStackWnd;
    infoWnd = _infoWnd;

    QFont font;
    font.setFamily(DEFAULT_FONT);
    font.setPointSize(DEFAULT_FONT_SZ);
    setFont(font);

    editw = fontMetrics().width("edit") + 2*HBORDER + 2;
    setFixedHeight(fontMetrics().height() + 2*VBORDER);

    view = TXTEDIT_VIEW;
    activeFileIndex = nFiles = 0;
    highlight = -1;
    bflags = 0;					// {joj 8/11/10}
    firstFn = 1;				// {joj 9/11/10}
    nFn = 0;					// {joj 15/11/10}
    timer = 0;					// {joj 15/11/10}
    setFontSz(vApp->fontSz);

    setMouseTracking(true);
}

//
// destructor
//
FileBarWnd::~FileBarWnd() {
    // nothing to do
}

//
// newFile
//
void FileBarWnd::newFile(const QString &ext) {

    QString msg1 = "New " + ext + " file";
    QString msg2 = "Vivio files (*" + ext + " files)";

    QString path = QFileDialog::getSaveFileName(this, msg1, vApp->fileDialogDir, msg2);

    if (path == "")
        return;

    //
    // NB: delete file if already exists (already asked in QFileDialog)
    //
    if (QFileInfo(path).exists()) {
        QFile qFile(path);
        if (qFile.remove() == 0) {
            QMessageBox::warning(NULL, "Vivio", QString("Unable to remove \"%1\"?").arg(path), QMessageBox::Ok);
            return;
        }
    }

    //
    // NB: update fileDialogDir
    //
    QSettings settings;
    vApp->fileDialogDir = path.left(path.lastIndexOf('/') + 1);
    settings.setValue("fileDialogDir", vApp->fileDialogDir);

    open(path, CREATE);

}

//
// newVivFile
//
void FileBarWnd::newVivFile() {
    newFile(".viv");
}

//
// newVinFile
//
void FileBarWnd::newVinFile() {
    newFile(".vin");
}

//
// setShowLineNumbers
//
void FileBarWnd::setShowLineNumbers(bool b) {
    for (int i = 0; i < nFiles; i++)
        fileInfo[i]->txtEditWnd->setShowLineNumbers(b);
}

//
// isModified
//
int FileBarWnd::isModified(int i) {
    return fileInfo[i]->txtEditWnd && fileInfo[i]->txtEditWnd->isModified();
}

//
// activeFileIsModified
//
int FileBarWnd::activeFileIsModified() {
    return isModified(activeFileIndex);
}

//
// isAnyFileModified
//
int FileBarWnd::isAnyFileModified() {
    for (int i = 0; i < nFiles; i++) {
        if (isModified(i))
            return 1;
    }
    return 0;
}

//
// fileModified
//
void FileBarWnd::fileModified() {
    recalculateXW();
    update();
}

//
// modifiedExternally
//
int FileBarWnd::modifiedExternally(FileInfo *fInfo) {
    QFileInfo qqInfo(fInfo->path);
    return QFileInfo(fInfo->path).lastModified() > fInfo->lastModified;
}

//
// activeFileCanUndo
//
int FileBarWnd::activeFileCanUndo() {
    Q_ASSERT(fileInfo[activeFileIndex]->txtEditWnd);
    return fileInfo[activeFileIndex]->txtEditWnd->canUndo();
}

//
// activeFileCanRedo
//
int FileBarWnd::activeFileCanRedo() {
    Q_ASSERT(fileInfo[activeFileIndex]->txtEditWnd);
    return fileInfo[activeFileIndex]->txtEditWnd->canRedo();
}

//
// activeFileHasSelection
//
int FileBarWnd::activeFileHasSelection() {
    Q_ASSERT(fileInfo[activeFileIndex]->txtEditWnd);
    return fileInfo[activeFileIndex]->txtEditWnd->textCursor().hasSelection();
}

//
// findNext
//
// NB: searches active file
//
void FileBarWnd::findNext(const QString &txt, int flags) {

    Q_ASSERT(fileInfo[activeFileIndex]->txtEditWnd);

    //
    // convert flags
    //
    QTextDocument::FindFlags ff = 0;
    if (flags & FIND_SEARCH_BACKWARDS)
        ff |= QTextDocument::FindBackward;
    if (flags & FIND_MATCH_CASE)
        ff |= QTextDocument::FindCaseSensitively;
    if (flags & FIND_MATCH_WHOLE_WORDS_ONLY)
        ff |= QTextDocument::FindWholeWords;

    TxtEditWnd *txtEditWnd = fileInfo[activeFileIndex]->txtEditWnd;

    if (txtEditWnd->find(txt, ff) == 0) {

        if (flags & FIND_CIRCULAR_SEARCH) {

            QTextCursor savedTextCursor = txtEditWnd->textCursor();
            QTextCursor textCursor = txtEditWnd->textCursor();
            textCursor.movePosition((flags & FIND_SEARCH_BACKWARDS) ? QTextCursor::End : QTextCursor::Start);
            txtEditWnd->setTextCursor(textCursor);

            if (txtEditWnd->find(txt, ff) == 0) {
                txtEditWnd->setTextCursor(savedTextCursor);
                vApp->infoWnd->vappend("Find: \"%s\" NOT found\n", qPrintable(txt));
            }

        } else {

            vApp->infoWnd->vappend("Find: \"%s\" NOT found\n", qPrintable(txt));

        }
    }

}

//
// findInFile
//
int FileBarWnd::findInFile(FileInfo *fInfo, const QString& txt, int flags) {

    int cnt = 0;

    //
    // convert flags
    //
    QTextDocument::FindFlags ff = 0;
    if (flags & FIND_MATCH_CASE)
        ff |= QTextDocument::FindCaseSensitively;
    if (flags & FIND_MATCH_WHOLE_WORDS_ONLY)
        ff |= QTextDocument::FindWholeWords;

    //
    // make sure file has been read into txtEditWnd
    //
    open(fInfo->path, READDATAONLY);

    TxtEditWnd *txtEditWnd = fInfo->txtEditWnd;

    QTextCursor savedTextCursor = txtEditWnd->textCursor();
    int hScroll = txtEditWnd->horizontalScrollBar()->value();
    int vScroll = txtEditWnd->verticalScrollBar()->value();

    txtEditWnd->moveCursor(QTextCursor::Start);
    while (txtEditWnd->find(txt, ff)) {
        vApp->infoWnd->vappend("%s (%d) : %s\n", qPrintable(fInfo->path), txtEditWnd->textCursor().blockNumber() + 1, qPrintable(txtEditWnd->textCursor().block().text()));
        txtEditWnd->moveCursor(QTextCursor::EndOfLine);
        cnt++;
    }

    txtEditWnd->setTextCursor(savedTextCursor);
    txtEditWnd->horizontalScrollBar()->setValue(hScroll);
    txtEditWnd->verticalScrollBar()->setValue(vScroll);

    return cnt;
}

//
// findAll
//
void FileBarWnd::findAll(const QString &txt, int flags) {
    vApp->infoWnd->clear();
    int cnt = 0;
    if (flags & FIND_ALL_OPEN_FILES) {
        for (int i = 0; i < nFiles; i++)
            cnt += findInFile(fileInfo[i], txt, flags);
    } else {
        cnt = findInFile(fileInfo[activeFileIndex], txt, flags);
    }
    if (cnt == 0) {
        vApp->infoWnd->vappend("Find: \"%s\" NOT found\n", qPrintable(txt));
    } else if (cnt == 1) {
        vApp->infoWnd->vappend("Find: \"%s\" found in 1 line\n", qPrintable(txt));
    } else {
        vApp->infoWnd->vappend("Find: \"%s\" found in %d lines\n", qPrintable(txt), cnt);
    }
}


//
// sampleVivFile
//
void FileBarWnd::sampleVivFile(FileInfo *fInfo) {
    TxtEditWnd *txtEditWnd = fInfo->txtEditWnd;
    txtEditWnd->setPlainText("//");
    txtEditWnd->appendPlainText("// sample .viv file");
    txtEditWnd->appendPlainText("//");
}

//
// sampleVinFile
//
void FileBarWnd::sampleVinFile(FileInfo *fInfo) {
    TxtEditWnd *txtEditWnd = fInfo->txtEditWnd;
    txtEditWnd->setPlainText("//");
    txtEditWnd->appendPlainText("// sample .vin file");
    txtEditWnd->appendPlainText("//");
}

//
// recalculateXW
//
// NB: first file name (.viv) always displayed
//
void FileBarWnd::recalculateXW() {
    int i = 0;
    nFn = 0;
    while (i < nFiles) {
        FileInfo *fInfo = fileInfo[i];
        fInfo->x = (i == 0) ? editw : (i == firstFn) ? fileInfo[0]->x + fileInfo[0]->w : fileInfo[i - 1]->x + fileInfo[i - 1]->w;
        QString path = fInfo->fn;
        if (fInfo->readOnly) {
            path += "-";
        } else if (isModified(i)) {
            path += "*";
        }
        i = (i == 0) ? firstFn : i + 1;
        nFn++;
        fInfo->w = fontMetrics().width(path) + 2*HBORDER;

        //
        // NB: checks if filename extends beyond fileBar width
        // NB: doesn't alter fInfo->w
        // NB: elided txt computed in drawTxt()
        //
        if (fInfo->x + fInfo->w > MAXFNX()) {
            fInfo->elided = 1;
            break;
        } else {
            fInfo->elided = 0;
        }
    }
}

//
// bubbleSort
//
// NB: one item at most will be in the wrong position
//
void FileBarWnd::bubbleSort() {
    if (nFiles > 2) {
        int n = nFiles;
        do {
            int newn = 0;
            for (int i = 1; i < n - 1; i++) {
                if (fileInfo[i]->fn.compare(fileInfo[i+1]->fn, Qt::CaseInsensitive) > 0) {
                    FileInfo *tmp = fileInfo[i];
                    fileInfo[i] = fileInfo[i+1];
                    fileInfo[i+1] = tmp;
                    newn = i + 1;
                }
            }
            n = newn;
        } while (n > 2);
        recalculateXW();
    }
}

//
// open
//
// flags: LAZYOPEN			add filename to filebar but don't read data (read on demand)
// flags: GOTOLINE			goto line number after opening file
// flags: READDATAONLY		read data, but don't add filename to file bar
// flags: READONLY			open file in read ONLY mode
// flags: CREATE			open new file
//
// NB: return 1 on success, 0 on failure
//
int FileBarWnd::open(const QString &path, int flags, int lineNo) {

    //
    // treat empty file name as a special case
    //
    if (path == "")
        flags |= CREATE;

    //
    // check file exists
    //
    int r = (flags & CREATE) || QFileInfo(path).exists();

    //
    // check if file already open
    //
    int i, found = 0;
    for (i = 0; i < nFiles; i++) {
        if (fileInfo[i]->path == path) {
            found = 1;
            break;
        }
    }

    FileInfo *fInfo;

    if (!found) {

        //
        // save and close all files if opening a .viv file
        //
        if (path.endsWith(".viv")) {
            saveAll();
            closeAll();
            vApp->addToRecent(path);
			vApp->setWindowTitle("VivioJS - " + path);
            firstFn = 1;	// {joj 16/11/10}
            nFn = 1;		// {joj 16/11/10}
        }

        //
        // expand fileInfo if needed
        //
        if (nFiles >= fileInfo.size())
            fileInfo.append(new FileInfo());

        fInfo = fileInfo[nFiles];
        fInfo->path = path;
        fInfo->fn = (path == "") ? "<new unsaved file>" : QFileInfo(path).fileName();
        fInfo->readOnly = (flags & READONLY) ? 1 : 0;
        fInfo->needToReadOnAccess = 1;
        nFiles++;

        //
        // NB: re-sort filenames into alphabetic order
        // NB: determine index of new file
        //
        bubbleSort();
        i = 0;
        while (i < nFiles)	{
            if (fileInfo[i] == fInfo)
                break;
            i++;
        }

    } else {

        fInfo = fileInfo[i];
        if ((flags & READDATAONLY) == 0)
            activeFileIndex = i;

    }

    if (r) {

        if ((flags & LAZYOPEN) == 0) {

            if (fInfo->txtEditWnd == NULL) {

                fInfo->txtEditWnd = new TxtEditWnd(this, fInfo);
                fInfo->stackIndex = viewStackWnd->addWidget(fInfo->txtEditWnd);

            }

            if (modifiedExternally(fInfo) && fInfo->needToReadOnAccess == 0) {

                if (QMessageBox::question(NULL, "Vivio", QString("%1 has been modified.\n\nDo you wish to re-read file?").arg(fInfo->path), QMessageBox::Ok | QMessageBox::No) == QMessageBox::Ok)
                    fInfo->needToReadOnAccess = 1;

            }

            if (fInfo->needToReadOnAccess) {

                if ((flags & CREATE) || fInfo->txtEditWnd->open(path) == 0) {

                    if (path.endsWith(".viv")) {
                        sampleVivFile(fInfo);
                    } else {
                        sampleVinFile(fInfo);
                    }

                }

                fInfo->needToReadOnAccess = 0;

            }

            fInfo->txtEditWnd->setReadOnly(fInfo->readOnly);

            if (flags & GOTOLINE)
                fInfo->txtEditWnd->gotoLine(lineNo);

            if ((flags & READDATAONLY) == 0) {
                activeFileIndex = i;
                viewStackWnd->setCurrentIndex(fInfo->stackIndex);
            }


        }

    } else {

        fInfo->fn = (fInfo->path == "") ?  "<new unsaved file>" : QFileInfo(fInfo->path).fileName();
        fInfo->readOnly = 0;

    }

    view = TXTEDIT_VIEW;

    //
    // NB: make sure file name visible in fileBarWnd
    //
    if (activeFileIndex != 0) {									// {joj 15/11/10}
        while (1) {												// {joj 15/11/10}
            recalculateXW();									// {joj 15/11/10}
            if (activeFileIndex < firstFn) {					// {joj 15/11/10}
                firstFn--;										// {joj 15/11/10}
            } else if (activeFileIndex > firstFn + nFn - 2) {	// {joj 16/11/10}
                firstFn++;										// {joj 16/11/10}
            } else if (fileInfo[activeFileIndex]->elided) {		// {joj 16/11/10}
                firstFn++;										// {joj 16/11/10}
            } else {											// {joj 15/11/10}
                break;											// {joj 15/11/10}
            }													// {joj 15/11/10}
        }														// {joj 15/11/10}
    }															// {joj 15/11/10}
    update();
	
	if (r && path.endsWith(".viv")) {
		vApp->vivFn = path.left(path.lastIndexOf('.'));												// TODO: improve
		vApp->vivDir = vApp->vivFn.left(vApp->vivFn.lastIndexOf("/"));								// TODO: improve
		vApp->vivFn = vApp->vivFn.right(vApp->vivFn.length() - vApp->vivFn.lastIndexOf("/") - 1);	// TODO: improve
		vApp->htmPath = path.left(path.lastIndexOf('.')) + " 100.htm";								// TODO: improve
		vApp->jsPath = path.left(path.lastIndexOf('.')) + ".js";									// TODO: improve
	}

    return r;

}

//
// dialogOpenFile - called from menu
//
void FileBarWnd::dialogOpenFile() {

    QString path = QFileDialog::getOpenFileName(this, "Open file", vApp->fileDialogDir, "Vivio files (*.viv *.vin)");

    if (path == "")
        return;

    open(path);

    //
    // NB: update fileDialogDir
    //
    QSettings settings;
    vApp->fileDialogDir = path.left(path.lastIndexOf('/') + 1);
    settings.setValue("fileDialogDir", vApp->fileDialogDir);

}

//
// close
//
void FileBarWnd::close(int i) {

    Q_ASSERT(i >= 0);

    save(i, 1, 0);

    FileInfo *saveFileInfo = fileInfo[i];
    for (int j = i + 1; j < nFiles; j++)
        fileInfo[j-1] = fileInfo[j];
    fileInfo[nFiles-1] = saveFileInfo;
    nFiles--;

    activeFileIndex = (activeFileIndex > nFiles - 1) ? nFiles - 1 : activeFileIndex;

    if (fileInfo[activeFileIndex]->needToReadOnAccess) {
        open(fileInfo[activeFileIndex]->path);
    } else {
        viewStackWnd->setCurrentIndex(fileInfo[activeFileIndex]->stackIndex);
    }

    recalculateXW();
    update();

}

//
// closeAll
//
void FileBarWnd::closeAll() {
    for (int i = 0; i < nFiles; i++) {
        fileInfo[i]->path = "";
        if (fileInfo[i]->txtEditWnd)
            fileInfo[i]->txtEditWnd->setPlainText("");
    }
    viewStackWnd->setCurrentIndex(1);
    activeFileIndex = 0;
    nFiles = 0;
}

//
// activeFileClose
//
void FileBarWnd::activeFileClose() {
    close(activeFileIndex);
}

//
// closeAllExcept
//
void FileBarWnd::closeAllExcept(int b) {
    for (int i = nFiles - 1; i > 0; i--) {
        if (i != b)
            close(i);
    }
    activeFileIndex = (activeFileIndex > 0) ? 1 : 0;
}

//
// contextCloseAllExcept [slot]
//
void FileBarWnd::contextCloseAllExcept() {
    QAction *action = qobject_cast<QAction *>(sender());
    closeAllExcept(action->data().toInt());
}

//
// activeFileOpenIncludes
//
void FileBarWnd::activeFileOpenIncludes()
{
    if (fileInfo[activeFileIndex]->needToReadOnAccess)
        open(fileInfo[activeFileIndex]->path);
    fileInfo[activeFileIndex]->txtEditWnd->openIncludes();
}

//
// contextOpenIncludes
//
// NB: called from context menu
//
void FileBarWnd::contextOpenIncludes() {
    QAction *action = qobject_cast<QAction *>(sender());
    int i = action->data().toInt();
    if (fileInfo[i]->needToReadOnAccess)
        open(fileInfo[i]->path);
    fileInfo[i]->txtEditWnd->openIncludes();
}

//
// print [slot]
//
void FileBarWnd::print() {

    QPrinter printer;

    QPrintDialog printDialog(&printer, NULL);
    printDialog.setOption(QAbstractPrintDialog::PrintToFile);
    printDialog.setOption(QAbstractPrintDialog::PrintSelection);
    printDialog.setOption(QAbstractPrintDialog::PrintPageRange);

    if (printDialog.exec() == QDialog::Accepted) {

        if (view == TXTEDIT_VIEW) {

            fileInfo[activeFileIndex]->txtEditWnd->print(&printer);

        } else {

            //QPainter painter(&printer);
            //QPixmap pm = QPixmap::grabWidget(vApp->player);
            //painter.drawPixmap(0, 0, pm);

        }

    }
}

//
// openJSFile [slot]
//
void FileBarWnd::openJSFile() {
    open(vApp->jsPath, READONLY);	// {joj 19/7/16}
}

//
// openHTMFile [slot]
//
void FileBarWnd::openHTMFile() {
	open(vApp->htmPath, READONLY);	// {joj 19/7/16}
}

//
// compile [slot]
//
void FileBarWnd::compile() {
    if (saveAll()) {
        QString path = fileInfo[0]->path;
        infoWnd->clear();
        vApp->compiler->compile(path, COMPRESS, NULL);
        if (modifiedExternally(fileInfo[activeFileIndex]))
            open(fileInfo[activeFileIndex]->path);	// in case active file modifed
    }
}

//
// compileAndRun [slot]
//
void FileBarWnd::compileAndRun(int execMd) {
    //try {																				// {joj 14/3/15}
	//
		if (saveAll()) {
			QString path = fileInfo[0]->path;
			infoWnd->clear();
			if (vApp->compiler->compile(path, COMPRESS, NULL)) {
				if (vApp->cmdArgs.isEmpty() == 0) {										// {joj 14/1/12}
					//vApp->player->setArgs(vApp->cmdArgs, 0);							// {joj 14/1/12}
					vApp->cmdArgs = "";													// {joj 14/1/12}
					vApp->clearArgsWhenRun = 0;											// {joj 14/1/12}
				} else if (vApp->clearArgsWhenRun) {									// {joj 12/1/12}
					//vApp->player->args.clear();										// {joj 12/1/12}
                }																		// {joj 12/1/12}
#ifdef Q_OS_WIN																			// {joj 5/7/17}
				vApp->browserWnd->load(QUrl(vApp->htmPath));
#else
                vApp->browserWnd->load(QUrl("file://" + vApp->htmPath));                // {joj 5/7/17} linux needs "file://"
#endif
				view = VIVIO_VIEW;
				viewStackWnd->setCurrentIndex(0);
				update();
//				vApp->player->setFocus();												// {joj 29/10/12}
			}
		}
	//} catch (vivio_error) {															// {joj 14/3/15}
	//	 infoWnd->vappend("execution ABORTED");											// {joj 14/3/15}
	//} catch(...) {																	// {joj 14/3/15}
	//	int xxx = 0;	
	//}																					// {joj 14/3/15}

}

//
// contextClose
//
// called from context menu
//
void FileBarWnd::contextClose() {
    QAction *action = qobject_cast<QAction *>(sender());
    close(action->data().toInt());
}

//
// save [worker]
//
// NB: i is file index
// NB: set ask if wish to seek confirmation that file is to be saved
// NB: set forcedSave if file is to be saved even if not modified (used by saveAs)
// NB: return 0 if a file that needs to be saved can't be saved
//
int FileBarWnd::save(int i, int ask, int forcedSave) {

    if ((forcedSave == 0) && (isModified(i) == 0))
        return 1;

    FileInfo *fInfo = fileInfo[i];

    if (fInfo->path == "") {

        if (i == 0) {
            fInfo->path = QFileDialog::getSaveFileName(this, "Open file", vApp->fileDialogDir, "Vivio files (*.viv)");
        } else {
            fInfo->path = QFileDialog::getSaveFileName(this, "Open file", vApp->fileDialogDir, "Vivio files (*.vin)");
        }

        if (fInfo->path == "")
            return 0;

        //
        // NB: update fileDialogDir
        //
        QSettings settings;
        vApp->fileDialogDir = fInfo->path.left(fInfo->path.lastIndexOf('/') + 1);
        settings.setValue("fileDialogDir", vApp->fileDialogDir);

        fInfo->fn = QFileInfo(fInfo->path).fileName();

        //if (i == 0)
        //    vApp->setWindowTitle(vApp->player->versionShortTxt + " - " + fInfo->fn);

        update();

    }

    if (ask) {

        if (QMessageBox::question(NULL, "Vivio", QString("Do you wish to save?\n\n %1").arg(fInfo->path), QMessageBox::Yes | QMessageBox::No) != QMessageBox::Yes)
            return 0;

    }

    QFile qf(fInfo->path);
    if (qf.open(QIODevice::WriteOnly) == false)
        return 0;

    if (qf.write(fInfo->txtEditWnd->toPlainText().toLatin1()) == -1)
        return 0;
    qf.close();

    fInfo->lastModified = QFileInfo(fInfo->path).lastModified();
    fInfo->txtEditWnd->clearModified();
    update();

    return 1;

}

//
// activeFileSave
//
void FileBarWnd::activeFileSave() {
    save(activeFileIndex, 0, 0);
}

//
// contextSave
//
void FileBarWnd::contextSave() {
    QAction *action = qobject_cast<QAction *>(sender());
    save(action->data().toInt(), 0, 0);
}

//
// saveAs [slot]
//
void FileBarWnd::saveAs()
{
    FileInfo *fInfo = fileInfo[activeFileIndex];

    if (activeFileIndex == 0) {
        fInfo->path = QFileDialog::getSaveFileName(this, "Open file", vApp->fileDialogDir, "Vivio files (*.viv)");
    } else {
        fInfo->path = QFileDialog::getSaveFileName(this, "Open file", vApp->fileDialogDir, "Vivio include files (*.vin)");
    }

    if (fInfo->path == "")
        return;

    //
    // NB: update fileDialogDir
    //
    QSettings settings;
    vApp->fileDialogDir = fInfo->path.left(fInfo->path.lastIndexOf('/') + 1);
    settings.setValue("fileDialogDir", vApp->fileDialogDir);

    fInfo->fn = QFileInfo(fInfo->path).fileName();

    //
    // NB: re-sort file names
    // NB: find new activeFileIndex
    //
    bubbleSort();
    activeFileIndex = 0;
    while (activeFileIndex < nFiles)	{
        if (fileInfo[activeFileIndex] == fInfo)
            break;
        activeFileIndex++;
    }

    //
    // save file
    //
    save(activeFileIndex, 0, 1);

    //
    // update window title if changing name of .viv file
    //
    //if (activeFileIndex == 0)
    //    vApp->setWindowTitle(vApp->player->versionShortTxt + " - " + fInfo->fn);

    update();

}

//
// saveAll [slot]
//
// NB: return 1 if all files saved
//
int FileBarWnd::saveAll() {

    QString files;

    //
    // make list of modifiled files
    //
    for (int i = 0; i < nFiles; i++) {
        if (isModified(i))
            files += fileInfo[i]->fn + " ";
    }

    //
    // return if no modified files
    //
    if (files.size() == 0)
        return 1;

    //
    // ask if wish to save files
    //
    if (QMessageBox::question(NULL, "Vivio", QString("You need to save the following files:\n\n %1").arg(files), QMessageBox::Ok | QMessageBox::No) == QMessageBox::Ok) {

        for (int i = 0; i < nFiles; i++) {
            if (save(i, 0, 0) == 0)
                return 0;
        }

        return 1;

    }

    return 0;

}

//
// selectAll [slot]
//
void FileBarWnd::selectAll() {
    Q_ASSERT(fileInfo[activeFileIndex]->txtEditWnd);
    fileInfo[activeFileIndex]->txtEditWnd->selectAll();
}

//
// indent [slot]
//
void FileBarWnd::indent() {
    Q_ASSERT(fileInfo[activeFileIndex]->txtEditWnd);
    fileInfo[activeFileIndex]->txtEditWnd->indent();
}

//
// unindent [slot]
//
void FileBarWnd::unindent() {
    Q_ASSERT(fileInfo[activeFileIndex]->txtEditWnd);
    fileInfo[activeFileIndex]->txtEditWnd->unindent();
}

//
// comment [slot]
//
void FileBarWnd::comment() {
    fileInfo[activeFileIndex]->txtEditWnd->comment();
}

//
// uncomment [slot]
//
void FileBarWnd::uncomment() {
    Q_ASSERT(fileInfo[activeFileIndex]->txtEditWnd);
    fileInfo[activeFileIndex]->txtEditWnd->uncomment();
}

//
// setFontSz
//
// NB: change fontSz of all TxtEditWnd windows
// NB. doesn't change fontSz of font used by fileBarWnd
//
void FileBarWnd::setFontSz(int fontSz) {
    for (int i = 0; i < nFiles; i++)
        fileInfo[i]->txtEditWnd->setFontSz(fontSz);
}

//
// getActiveFileIndex
//
int FileBarWnd::getActiveFileIndex() {
    return activeFileIndex;
}

//
// vivFn
//
QString FileBarWnd::vivFn() {
    return fileInfo[0]->path;
}

//
// pasteTmplate [slot]
//
void FileBarWnd::pasteTmplate() {
    QAction *action = qobject_cast<QAction *>(sender());
    fileInfo[activeFileIndex]->txtEditWnd->insertPlainText(action->data().toString());
}

//
// activeFileUndo [slot]
//
void FileBarWnd::activeFileUndo() {
    Q_ASSERT(fileInfo[activeFileIndex]->txtEditWnd);
    fileInfo[activeFileIndex]->txtEditWnd->undo();
}

//
// activeFileRedo [slot]
//
void FileBarWnd::activeFileRedo() {
    Q_ASSERT(fileInfo[activeFileIndex]->txtEditWnd);
    fileInfo[activeFileIndex]->txtEditWnd->redo();
}

//
// activeFileCopy [slot]
//
void FileBarWnd::activeFileCopy() {
    Q_ASSERT(fileInfo[activeFileIndex]->txtEditWnd);
    fileInfo[activeFileIndex]->txtEditWnd->copy();
}

//
// activeFileCut [slot]
//
void FileBarWnd::activeFileCut() {
    Q_ASSERT(fileInfo[activeFileIndex]->txtEditWnd);
    fileInfo[activeFileIndex]->txtEditWnd->cut();
}

//
// activeFilePaste [slot]
//
void FileBarWnd::activeFilePaste() {
    Q_ASSERT(fileInfo[activeFileIndex]->txtEditWnd);
    fileInfo[activeFileIndex]->txtEditWnd->paste();
}

//
// drawTxt
//
// NB: b == 0	"run" or "edit"
// NB: b > 0	fileInfo[b-1].fn
//
void FileBarWnd::drawTxt(QPainter *p, int b) {

    QString qs;
    int x, w;

    if (b == 0) {
        qs = (view == TXTEDIT_VIEW) ? "run" : "edit";
        x = 0;
        w = editw;
    } else {
        qs = fileInfo[b-1]->fn.toLatin1();
        if (fileInfo[b-1]->readOnly) {
            qs += "-";
        } else if (isModified(b-1)) {
            qs += "*";
        }
        x = fileInfo[b-1]->x;
        w = fileInfo[b-1]->w;
    }

    int elided = 0;															// {joj 9/11/10}
    if (x + w > MAXFNX()) {													// {joj 9/11/10}
        w = MAXFNX() - x;													// {joj 15/11/10}
        qs = fontMetrics().elidedText(qs, Qt::ElideRight, w - 2*HBORDER);	// {joj 9/11/10}
        elided = 1;															// {joj 9/11/10}
    }																		// {joj 9/11/10}

    if (b == highlight) {
        QRect r(x, 0, w, height() - 1);
        p->fillRect(r, Qt::lightGray);
    } else if (b == 0) {
        QRect r(0, 0, editw, height() - 1);
        p->fillRect(r, QColor(0, 196, 0));
    }

    if (b == 0) {
        p->setPen((b == highlight) ? Qt::black : Qt::white);
    } else {
        p->setPen((b - 1 == activeFileIndex) ? Qt::red : Qt::black);
    }

    p->drawText(x, 0, w, height(), Qt::AlignCenter | Qt::AlignVCenter, qs);

    p->setPen(Qt::lightGray);
    if (elided == 0)
        p->drawLine(x + w, 0, x + w, height());

    if ((b == nFiles) && (elided == 0))
        p->drawLine(x + w + 2, 0, x + w + 2, height());

}

//
// paintEvent
//
// NB: QPainter for a display window can only be created in paintEvent (Qt quirk)
// NB: update() called when content changed to redraw window
//
void FileBarWnd::paintEvent(QPaintEvent *e) {

    QPainter p(this);

    //
    // fill background
    //
    QRect r = e->rect();
    p.fillRect(r, Qt::white);

    //
    // bottom border
    //
    p.setPen(Qt::lightGray);
    p.drawLine(r.left(), r.bottom(), r.right(), r.bottom());

    //
    // run or edit
    //
    drawTxt(&p, 0);

    //
    // .viv file
    //
    drawTxt(&p,	1);

    //
    // file names
    //
    for (int i = firstFn + 1, n = 1; n < nFn; i++, n++)
        drawTxt(&p, i);

    //
    // buttons
    //
    p.setRenderHint(QPainter::Antialiasing, 1);
    p.setPen(Qt::darkGray);
    p.setBrush(firstFn <= 1 ? Qt::white : bflags & 1 ? Qt::darkGray : Qt::lightGray);
    p.drawPath(back);
    p.setBrush(fileInfo[firstFn + nFn - 2]->elided == 0 ? Qt::white : bflags & 2 ? Qt::darkGray : Qt::lightGray);
    p.drawPath(forward);

}

//
// resizeEvent
//
// NB: re-calculate back and forward button co-ordinates
//
void FileBarWnd::resizeEvent(QResizeEvent *e) {

    int w = e->size().width();
    int h = e->size().height();

    back = QPainterPath();
    back.moveTo(w-3*BBORDER-h/2, BBORDER);
    back.lineTo(w-3*BBORDER-h/2, h-BBORDER);
    back.lineTo(w-3*BBORDER-h, h/2);
    back.closeSubpath();

    forward = QPainterPath();
    forward.moveTo(w-BBORDER-h/2, BBORDER);
    forward.lineTo(w-BBORDER-h/2, h-BBORDER);
    forward.lineTo(w-BBORDER, h/2);
    forward.closeSubpath();

    recalculateXW();	//{joj 15/11/10}
}

//
// findButton
//
int FileBarWnd::findButton(int x) {
    if (x > width() - 4*BBORDER - height())
        return -1;
    if (x < editw)
        return 0;
    for (int i = 0; i < nFiles; i++) {
        if (x < fileInfo[i]->x + fileInfo[i]->w)
            return i + 1;
    }
    return -1;
}

//
// event
//
// NB: used to intercept and handle toolTip events
//
bool FileBarWnd::event(QEvent *e) {
    if (e->type() == QEvent::ToolTip) {
        QHelpEvent *he = static_cast<QHelpEvent *>(e);
        int b = findButton(he->x());
        if (b > 0)
            setToolTip(fileInfo[b-1]->path);
    }
    return QWidget::event(e);
}

//
// mouseMoveEvent
//
// NB: updated 8/11/10}
//
void FileBarWnd::mouseMoveEvent(QMouseEvent *e) {
    int oldbflags = bflags;
    int oldhighlight = highlight;

    if (back.contains(e->pos())) {

        bflags = (bflags & ~3) | 1;

    } else if (forward.contains(e->pos())) {

        bflags = ((bflags) & ~3) | 2;   // {joj 13/12/11}

    } else {

        int b = findButton(e->x());

        if (highlight != b)
            highlight = b;

    }

    if ((oldhighlight != highlight) || ((oldbflags & 3) != (bflags & 3)))
        update();

}

//
// leaveEvent
//
void FileBarWnd::leaveEvent(QEvent *e) {
    if ((highlight != -1) || (bflags & 3)) {
        highlight = -1;
        bflags &= ~3;
        update();
    }
    if (timer) {
        killTimer(timer);
        timer = 0;
    }
}

//
// backForwardAction {joj 15/11/10}
//
void FileBarWnd::backForwardAction() {
    if (bflags & 3) {
        if (bflags & 1) {
            if (firstFn > 1)
                firstFn--;
        } else if (bflags & 2) {
            if (fileInfo[firstFn + nFn - 2]->elided == 1)
                firstFn++;
        }
        recalculateXW();
        update();
    }
}

//
// mousePressEvent
//
void FileBarWnd::mousePressEvent(QMouseEvent *e) {

    if (e->button() != Qt::LeftButton)
        return;

    int b = findButton(e->x());

    if (b == -1) {

        if ((back.contains(e->pos())) || forward.contains(e->pos())) {	// {joj 15/11/10}
            backForwardAction();										// {joj 15/11/10}
            Q_ASSERT(timer == 0);										// {joj 15/11/10}
            timer = startTimer(TIMEMS);									// {joj 15/11/10}
        }																// {joj 15/11/10}

        return;
    }

    if (b == 0) {

        if (view == TXTEDIT_VIEW) {

            compileAndRun(0);

        } else {

            view = TXTEDIT_VIEW;
            viewStackWnd->setCurrentIndex(fileInfo[activeFileIndex]->stackIndex);
            if (modifiedExternally(fileInfo[activeFileIndex]))	// check if active file modifed
                open(fileInfo[activeFileIndex]->path);
            update();

        }

    } else {

        view = TXTEDIT_VIEW;
        open(fileInfo[b - 1]->path);

    }


}

//
// mouseReleaseEvent
//
// NB: kill timer if active
//
void FileBarWnd::mouseReleaseEvent(QMouseEvent *e) {
    if (timer) {			// {joj 15/11/10}
        killTimer(timer);	// {joj 15/11/10}
        timer = 0;			// {joj 15/11/10}
    }						// {joj 15/11/10}
}

//
// contextMenuEvent
//
// NB: connects to QPlainTextEdit copy(), clear() & selectAll()
//
void FileBarWnd::contextMenuEvent(QContextMenuEvent *e) {

    int b = findButton(e->x()) - 1;

    if (b < 0)
        return;

    QMenu menu(this);

    QAction openIncludesAction("Open #includes", this);
    openIncludesAction.setData(b);
    menu.addAction(&openIncludesAction);
    connect(&openIncludesAction, SIGNAL(triggered()), this, SLOT(contextOpenIncludes()));

    menu.addSeparator();

    QAction saveAction(this);

    if ((b == 0) && (fileInfo[0]->path == "")) {

        saveAction.setText("Save As");
        connect(&saveAction, SIGNAL(triggered()), this, SLOT(contextSave()));

    } else {

        saveAction.setText("Save");
        saveAction.setEnabled(isModified(b));
        connect(&saveAction, SIGNAL(triggered()), this, SLOT(contextSave()));

    }
    menu.addAction(&saveAction);

    QAction closeAction(this);
    if (b > 0) {

        closeAction.setText("Close");
        closeAction.setData(b);
        menu.addAction(&closeAction);
        connect(&closeAction, SIGNAL(triggered()), this, SLOT(contextClose()));
    }

    QAction closeAllExceptAction(this);

    if (nFiles > 2) {

        if (b == 0) {

            closeAllExceptAction.setText(QString("Close ALL files except \"%1\"").arg(fileInfo[0]->fn));

        } else {

            closeAllExceptAction.setText(QString("Close ALL files except \"%1\" && \"%2\"").arg(fileInfo[0]->fn).arg(fileInfo[b]->fn));

        }

        closeAllExceptAction.setData(b);
        menu.addAction(&closeAllExceptAction);
        connect(&closeAllExceptAction, SIGNAL(triggered()), this, SLOT(contextCloseAllExcept()));

    }

    menu.exec(e->globalPos());

}

//
// saveState
//
void FileBarWnd::saveState() {

    QSettings settings;

    //
    // remove previous files state
    //
    settings.remove("files");

    //
    // save current state
    //
    settings.beginGroup("files");

    settings.setValue("nFiles", nFiles);
    settings.setValue("activeFileIndex", activeFileIndex);
    settings.setValue("firstFn", firstFn);						// {joj 15/11/10}

    QString s;

    for (int i = 0; i < nFiles; i++) {

        FileInfo *fInfo = fileInfo[i];

        s.sprintf("fileName%d", i);
        settings.setValue(s, fInfo->path.replace("\\", "/"));	// {joj 8/7/17}

        s.sprintf("lastModified%d", i);
        QFileInfo qFileInfo(fInfo->path);
        settings.setValue(s, qFileInfo.exists() ? qFileInfo.lastModified() : QDateTime());

        if (fInfo->needToReadOnAccess) {

            s.sprintf("hScroll%d", i);
            settings.setValue(s, fInfo->hScroll);
            s.sprintf("vScroll%d", i);
            settings.setValue(s, fInfo->vScroll);

            s.sprintf("selStart%d", i);
            settings.setValue(s, fInfo->selStart);
            s.sprintf("selEnd%d", i);
            settings.setValue(s, fInfo->selEnd);


        } else {

            s.sprintf("hScroll%d", i);
            settings.setValue(s, fInfo->txtEditWnd->horizontalScrollBar()->value());
            s.sprintf("vScroll%d", i);
            settings.setValue(s, fInfo->txtEditWnd->verticalScrollBar()->value());

            s.sprintf("selStart%d", i);
            settings.setValue(s, fInfo->txtEditWnd->textCursor().selectionStart());
            s.sprintf("selEnd%d", i);
            settings.setValue(s, fInfo->txtEditWnd->textCursor().selectionEnd());

        }

    }

    settings.endGroup();

}

//
// restoreState
//
void FileBarWnd::restoreState() {

    QSettings settings;

    settings.beginGroup("files");

    int n = settings.value("nFiles").toInt();
    if (n == 0) {
        open("");		// open "<new unsaved file>"
        return;
    }

    QString s;
    QString path;

    infoWnd->clear();

    int afIndex = settings.value("activeFileIndex").toInt();
    int fFn = settings.value("firstFn", 1).toInt();							// {joj 15/11/10}

    for (int i = 0, fn = 0; i < n; i++) {									// {joj 27/10/17}

        int readOnly = 0;                                                   // {joj 5/7/17} move here to keep g++ happy
        s.sprintf("fileName%d", i);
        path = QFileInfo(settings.value(s).toString()).canonicalFilePath();	// {joj 4/2/12}
		if (path.isEmpty())													// {joj 11/11/16}
			goto L;															// {joj 11/11/16}

        infoWnd->vappend("opening %s ... ", qPrintable(path));

        //
        // NB: open .dec files read ONLY
        //
        if (path.endsWith(".dec"))
            readOnly = READONLY;

        if (open(path, LAZYOPEN | readOnly)) {

            infoWnd->append("OK\n");

            FileInfo *fInfo = fileInfo[fn];									// joj 27/10/17}

            s.sprintf("lastModified%d", fn);								// joj 27/10/17}
            fInfo->lastModified = settings.value(s).toDateTime();
            s.sprintf("hScroll%d", fn);										// joj 27/10/17}
            fInfo->hScroll = settings.value(s, 0).toInt();
            s.sprintf("vScroll%d", fn);										// joj 27/10/17}
            fInfo->vScroll = settings.value(s, 0).toInt();
            s.sprintf("selStart%d", fn);									// joj 27/10/17}
            fInfo->selStart = settings.value(s, 0).toInt();
            s.sprintf("selEnd%d", fn);										// joj 27/10/17}
            fInfo->selEnd = settings.value(s, 0).toInt();

            fn++;															// joj 27/10/17}
			fInfo->doRestore = 1;

        } else {

		L:
			//infoWnd->append("FAILED\n");

            if (i == 0) {

                QMessageBox::question(NULL, "Vivio", QString("Unable to open %1\n\nRemoving filename from recent file list.").arg(path), QMessageBox::Ok);
                vApp->removeFromRecent(path);
                nFiles = 0;
                afIndex = 0;
                fFn = 1;							// {joj 15/11/10}
				fileInfo.clear();					// {joj 11/11/16}
				fileInfo.append(new FileInfo());	// {joj 11/11/16}
                fileInfo[0]->path = "";
                break;

            }

            //nFiles--;
            if (afIndex > nFiles)
                afIndex--;

        }

    }

    settings.endGroup();

    activeFileIndex = afIndex;
    firstFn = fFn;	// {joj 15/11/10}
    open(fileInfo[activeFileIndex]->path);

}

//
// timerEvent
//
void FileBarWnd::timerEvent(QTimerEvent *e) {
    backForwardAction();	// {joj 15/11/10}
}

// eof
