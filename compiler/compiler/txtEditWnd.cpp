//
// txtEditWnd.cpp
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

//
// see Qt documentation "Code Editor Example"
// see Qt documentation "Syntax Highlighter Example"
//

//
// 31/05/10	first Qt version
//

#include "stdafx.h"			// pre-compiled headers
#include "txtEditWnd.h"		//
#include "main.h"			// vApp
#include "vivio.h"			//
#include "fileBarWnd.h"		//
#include "findReplaceDlg.h"	//

#define DEFAULTFONT		"Courier New"

#define HBORDER			4	//

#define	TAB	char(9)			//
#define LF	char(10)		//
#define CR	char(13)		//

//
// constructor
//
LineNumberWnd::LineNumberWnd(TxtEditWnd *_txtEditWnd) : QWidget(_txtEditWnd) {
    txtEditWnd = _txtEditWnd;
    hide();
    setAutoFillBackground(0);
}

//
// paintEvent
//
void LineNumberWnd::paintEvent(QPaintEvent *e) {
    txtEditWnd->paintLineNumberWnd(e);
}

//
// constructor
//
Highlighter::Highlighter(QTextDocument *parent) : QSyntaxHighlighter(parent) {
    //
    // reserved words
    //
	rw += "do";				// {joj 3/3/15}
    rw += "if";
    rw += "in";
    rw += "for";
    rw += "new";
	rw += "num";			// joj 1/9/16
    rw += "ref";
    rw += "else";
    rw += "this";
    rw += "when";
    rw += "break";
    rw += "class";
    rw += "const";
    rw += "while";
    rw += "delete";
	rw += "objvar";			// {joj 23/1/15}
    rw += "return";
    rw += "static";
	rw += "string";			// {joj 1/9/16}
    rw += "#pragma";
    rw += "extends";
    rw += "foreach";
    rw += "#include";
    rw += "continue";
    rw += "function";

    //
    // source code formatting
    //
    rwFormat.setForeground(Qt::blue);
    stringFormat.setForeground(Qt::red);
    stringFormat.setFontItalic(true);
    commentFormat.setForeground(Qt::darkGreen);
    vcodeFormat.setForeground(Qt::red);

}

//
// highlightBlock
//
void Highlighter::highlightBlock(const QString &text) {

    int len = text.length();

    int state = 0;
    QString s;

    int firstPos = 0;
    int pos = 0;

    while (pos < len) {

        switch (state) {

        case 0:

            if (text[pos].isLetter() || (text[pos] == QChar('$')) || (text[pos] == QChar('_')) || (text[pos] == QChar('#'))) {

                state = 1;
                firstPos = pos;
                s += text[pos];

            } else if (text[pos] == QChar('"')) {

                state = 10;
                firstPos = pos;
                s += text[pos];

            } else if (text[pos] == QChar('/')) {

                state = 20;
                firstPos = pos;

            } else if ((pos == 0) && text[pos] == QChar('!')) {

                state = 30;

            }
            break;

        case 1:

            if (text[pos].isLetterOrNumber() || (text[pos] == QChar('$')) || (text[pos] == QChar('_'))) {

                s += text[pos];

            } else  {

                if (rw.contains(s)) {

                    setFormat(firstPos, pos - firstPos + 1, rwFormat);

                } else {

                    pos--;

                }

                state = 0;
                s.clear();

            }
            break;

        case 10:

            s += text[pos];

            if (text[pos] == QChar('"')) {

                state = 0;
                setFormat(firstPos, pos - firstPos + 1, stringFormat);
                s.clear();

            } else if (text[pos] == QChar('\\')) {

                state = 11;

            }
            break;

        case 11:

            s += text[pos];
            state = 10;
            break;


        case 20:

            if (text[pos] == QChar('/')) {

                setFormat(firstPos, len - firstPos + 1, commentFormat);
                return;

            }

            state = 0;
            break;

        case 30:

            if (text[pos] == QChar('!')) {

                setFormat(0, len, vcodeFormat);
                return;

            }
            state = 0;
            break;

        }

        pos++;

    }

    if (state == 1) {

        if (rw.contains(s))
            setFormat(firstPos, pos - firstPos + 1, rwFormat);

    }

}

//
// constructor
//
TxtEditWnd::TxtEditWnd(FileBarWnd *_fileBarWnd, FileInfo *_fInfo) {

    fileBarWnd = _fileBarWnd;
    fInfo = _fInfo;

    modified = 0;
    _canUndo = 0;
    _canRedo = 0;

    setFrameStyle(QFrame::NoFrame);

    setFontSz(vApp->fontSz);	// side-effect calculates lineNumberWndWidth

    setWordWrapMode(QTextOption::NoWrap);

    QPalette p = palette();
    p.setColor(QPalette::Inactive, QPalette::Highlight, Qt::darkGray);
    p.setColor(QPalette::Inactive, QPalette::HighlightedText, Qt::white);
    setPalette(p);

    lineNumberWnd = new LineNumberWnd(this);
    highlighter = new Highlighter(document());

    setShowLineNumbers(vApp->showLineNumbers);

    connect(this, SIGNAL(updateRequest(const QRect&, int)), this, SLOT(updateLineNumberWnd(const QRect&, int)));
    connect(this, SIGNAL(textChanged()), this, SLOT(setModified()));
    connect(this, SIGNAL(undoAvailable(bool)), this, SLOT(setCanUndo(bool)));
    connect(this, SIGNAL(redoAvailable(bool)), this, SLOT(setCanRedo(bool)));

    appendPlainText("#\n# empty vivio file\n#\n");

}

//
// destructor
//
TxtEditWnd::~TxtEditWnd() {
    //delete highlighter;
}

//
// setShowLineNumbers
//
void TxtEditWnd::setShowLineNumbers(bool b) {
    lineNumberWnd->setVisible(b);
    setViewportMargins(b ? lineNumberWndWidth : 0, 0, 0, 0);
}

//
// clearModified
//
void TxtEditWnd::clearModified() {
    modified = 0;
}

//
// setModified [slot]
//
void TxtEditWnd::setModified() {
    modified = 1;
    fileBarWnd->fileModified();
}

//
// isModified
//
int TxtEditWnd::isModified() {
    return modified;
}

//
// setCanUndo [slot]
//
void TxtEditWnd::setCanUndo(bool b) {
    _canUndo = b;
}

//
// canUndo
//
int TxtEditWnd::canUndo() {
    return _canUndo;
}

//
// setCanRedo [slot]
//
void TxtEditWnd::setCanRedo(bool b) {
    _canRedo = b;
}

//
// canRedo
//
int TxtEditWnd::canRedo() {
    return _canRedo;
}

//
// setFontSz
//
void TxtEditWnd::setFontSz(int newFontSz) {
	if (newFontSz != fontSz) {
        fontSz = newFontSz;
        QFont font;
        font.setFamily(DEFAULTFONT);
        font.setPointSize(fontSz);
        setFont(font);
        int cw = fontMetrics().width("1");
        lineNumberWndWidth = 6*cw + 2*HBORDER;
        setTabStopWidth(4*cw);
        setViewportMargins(vApp->showLineNumbers ? lineNumberWndWidth : 0, 0, 0, 0);
    }
}

//
// updateLineNumbers
//
void TxtEditWnd::updateLineNumberWnd(const QRect &r, int dy) {
    if (dy) {
        lineNumberWnd->scroll(0, dy);
    } else {
        lineNumberWnd->update(0, r.y(), lineNumberWndWidth, r.height());
    }
}

//
// resizeEvent
//
void TxtEditWnd::resizeEvent(QResizeEvent *e) {
    QPlainTextEdit::resizeEvent(e);
    QRect r = contentsRect();
    lineNumberWnd->setGeometry(r.left(), r.top(), lineNumberWndWidth, r.bottom());
}

//
// showEvent
//
// restoring scroll position needs to be done here!
// doesn't work in open
//
void TxtEditWnd::showEvent(QShowEvent *e) {
    if (fInfo->doRestore) {
        horizontalScrollBar()->setValue(fInfo->hScroll);
        verticalScrollBar()->setValue(fInfo->vScroll);
        fInfo->doRestore = 0;
    }
}

//
// paintLineNumberWnd
//
void TxtEditWnd::paintLineNumberWnd(QPaintEvent *e) {
    QPainter painter(lineNumberWnd);
    QRect r = e->rect();
    painter.fillRect(r, Qt::white);
    painter.setPen(Qt::darkGray);
    painter.drawLine(r.right(), r.top(), r.right(), r.bottom());

    QTextBlock block = firstVisibleBlock();
    int blockNumber = block.blockNumber();
    int top = (int) blockBoundingGeometry(block).translated(contentOffset()).top();
    int bottom = top + (int) blockBoundingRect(block).height();

    while (block.isValid() && top <= e->rect().bottom()) {
        if (block.isVisible() && bottom >= e->rect().top()) {
            QString number = QString::number(blockNumber + 1);
            painter.setPen(Qt::darkGray);
            painter.drawText(0, top, lineNumberWndWidth - HBORDER, fontMetrics().height(), Qt::AlignRight, number);
        }
        block = block.next();
        top = bottom;
        bottom = top + (int) blockBoundingRect(block).height();
        blockNumber++;
     }
}

//
// open
//
// NB: revert to QFile instead of UrlReader
//
int TxtEditWnd::open(const QString _url) {
    url = _url;

    type = VIVFILE;
    if (url.endsWith(".vin")) {
        type = VINFILE;
    } else if (url.endsWith(".dec")) {
        type = DECFILE;
    }

    QFile qf(url);
    if (qf.open(QIODevice::ReadOnly | QIODevice::Unbuffered) == 0) {
        QMessageBox::warning(NULL, "Vivio error", QString("Cannot read file %1").arg(url));
        return 0;
    }
    setPlainText(QString::fromLatin1(qf.readAll()));	// {joj 3/1/15}

    modified = 0;

    QFileInfo qFileInfo(url);
    fInfo->doRestore = qFileInfo.lastModified() == fInfo->lastModified;

    if (fInfo->doRestore) {
        QTextCursor txtCursor = textCursor();	// NB: makes a copy of the textCursor
        txtCursor.setPosition(fInfo->selStart);
        txtCursor.setPosition(fInfo->selEnd, QTextCursor::KeepAnchor);
        setTextCursor(txtCursor);
        setFocus();
    } else {
        fInfo->lastModified = qFileInfo.lastModified();
    }

    return 1;

}

//
// gotoLine
//
void TxtEditWnd::gotoLine(int lineNo) {
    QTextCursor txtCursor = textCursor();	// NB: makes a copy of the textCursor
    txtCursor.setPosition(document()->findBlockByLineNumber(lineNo - 1).position());
    setTextCursor(txtCursor);
    setFocus();
    ensureCursorVisible();
}

//
// openInclude
//
// look in .viv directory and then include directories
//
// return 1 on success
//
int TxtEditWnd::openInclude(QString incFn, QString &path, int openFlags) {
    QString vivDir = fileBarWnd->vivFn();
    vivDir = vivDir.left(vivDir.lastIndexOf("/"));

	QString dirPath = vivDir;	// .viv directory

	int n = 0;

    while (1) {

		QFileInfo qFileInfo(dirPath);
		if (qFileInfo.isRelative()) {
			qFileInfo.setFile(vivDir + "/" + dirPath + "/" + incFn);
		} else {
			qFileInfo.setFile(dirPath + "/" + incFn);
		}

		if (qFileInfo.exists()) {
			path = qFileInfo.canonicalFilePath();
			if ((openFlags & TESTIFEXISTS) == 0)
				fileBarWnd->open(path, openFlags);
			return 1;
		}

		dirPath = vApp->vivioPath.section(";", n, n);

		if (dirPath.count() == 0)
			break;

		n++;

	}

    return 0;
}

//
// contextOpenInclude [slot]
//
void TxtEditWnd::contextOpenInclude() {
    QAction *action = qobject_cast<QAction *>(sender());
    QString path;
    openInclude(action->data().toString(), path, 0);
}

//
// openIncludes [slot]
//
// look for include statements
//
// TODO: make work if include statement spread across more than one line
//
void TxtEditWnd::openIncludes() {
    QTextBlock txtBlock = document()->firstBlock();

    while (txtBlock.isValid()) {

        QString txt = txtBlock.text();
        int cnt = txt.length();

        QString incFn;

        //
        // look for #include
        //
        int i = 0;
        while (i < cnt-8) {

            if (txt[i] == '/') {		// skip comment

                i++;
                if (txt[i] == '/')
                    goto L;

            } else if (txt[i] == '#') {	// possible include

                i++;
                if (txt.indexOf("include", i) == i) {
                    i += 7;
                    while ((i < cnt) && (txt[i] == ' ' || txt[i] == TAB))
                        i++;
                    if (txt[i] == '"') {
                        i++;
                        incFn = "";
                        while ((i < cnt) && (txt[i] != '"')) {
                            incFn += txt[i];
                            i++;
                        }
                        QString path;
                        openInclude(incFn, path, LAZYOPEN);
                    }
                }

            } else {

                i++;

            }
        }

    L:

        txtBlock = txtBlock.next();

    }

}

//
// comment [slot]
//
void TxtEditWnd::comment() {
    QTextCursor cursor = textCursor();		// makes a copy of QTextCursor

    int firstPos = textCursor().anchor();
    int lastPos = textCursor().position();
    int rev = 0;

    //
    // may need swap pos and lastPos depending on how selection made
    //
    if (firstPos > lastPos) {
        int tmp = firstPos;
        firstPos = lastPos;
        lastPos = tmp;
        rev = 1;
    }

    int pos = firstPos;
    //int n = 0;

    cursor.beginEditBlock();
    while (pos <= lastPos) {
        cursor.setPosition(pos);
        if (cursor.atBlockEnd()) {
            cursor.insertText("//");
            lastPos += 2;
        } else {
            cursor.insertText("// ");
            lastPos += 3;
        }
        QTextBlock nextBlock = document()->findBlock(pos).next();
        pos = nextBlock.isValid() ? nextBlock.position() : lastPos + 1;
    }
    cursor.endEditBlock();

    //
    // restore cursor
    //
    cursor.setPosition(rev ? lastPos : firstPos);
    cursor.setPosition(rev ? firstPos : lastPos, QTextCursor::KeepAnchor);
    setTextCursor(cursor);

}

//
// uncomment [slot]
//
void TxtEditWnd::uncomment() {
    QTextCursor cursor = textCursor();		// makes a copy of QTextCursor

    int firstPos = textCursor().anchor();
    int lastPos = textCursor().position();
    int rev = 0;

    //
    // may need swap pos and lastPos depending on how selection made
    //
    if (firstPos > lastPos) {
        int tmp = firstPos;
        firstPos = lastPos;
        lastPos = tmp;
        rev = 1;
    }

    int pos = firstPos;

    cursor.beginEditBlock();
    while (pos < lastPos) {
        cursor.setPosition(pos);
        cursor.setPosition(pos + 3, QTextCursor::KeepAnchor);
        if (cursor.selectedText() == "// ") {
            cursor.deleteChar(); // deletes selected text
            lastPos -= 3;
        } else {
            cursor.setPosition(pos + 2, QTextCursor::KeepAnchor);
            if (cursor.selectedText() == "//") {
                cursor.deleteChar(); // deletes selected text
                lastPos -= 2;
            }
        }
        QTextBlock nextBlock = document()->findBlock(pos).next();
        pos = nextBlock.isValid() ? nextBlock.position() : lastPos;
    }
    cursor.endEditBlock();

    //
    // restore cursor
    //
    cursor.setPosition(rev ? lastPos : firstPos);
    cursor.setPosition(rev ? firstPos : lastPos, QTextCursor::KeepAnchor);
    setTextCursor(cursor);

}

//
// replaceSpacesWithTabs [slot]	{joj 5/11/10}
//
void TxtEditWnd::replaceSpacesWithTabs() {

    QByteArray ba = fInfo->txtEditWnd->toPlainText().toLatin1();

    int j = 0;
    int modified = 0;

    for (int i = 0, x = 0, n = 0, string = 0, escape = 0; i < ba.count(); i++) {

        char ch = ba[i];

        switch (ch) {

        case TAB:
            ba[j++] = ch;
            x = (x + 4) / 4 * 4;
            n = 0;
            escape = 0;
            break;

        case LF:
            ba[j++] = ch;
            x = 0;
            n = 0;
            escape = 0;
            break;

        case ' ':					// SPACE
            ba[j++] = ch;
            x++;
            n++;
            if (((x % 4) == 0) && (string == 0)) {
                j -= n;
                ba[j++] = 9;
                n = 0;
                modified = 1;
            }
            escape = 0;
            break;

        case '"':
            ba[j++] = ch;
            x++;
            n = 0;
            if (string == 0) {
                string = 1;
            } else if (escape == 0) {
                string = 0;
            }
            escape = 0;
            break;

        case '\\':
            ba[j++] = ch;
            x++;
            n = 0;
            escape = (escape) ? 0 : 1;
            break;

        default:
            ba[j++] = ch;
            x++;
            n = 0;
            escape =0;
            break;
        }
    }

    if (modified) {
        ba.resize(j);
        fInfo->txtEditWnd->setPlainText(ba);
    }

}

//
// indent [slot]
//
void TxtEditWnd::indent() {

    QTextCursor cursor = textCursor();		// makes a copy of QTextCursor

    int firstPos = textCursor().anchor();
    int lastPos = textCursor().position();
    int rev = 0;

    //
    // may need swap pos and lastPos depending on how selection made
    //
    if (firstPos > lastPos) {
        int tmp = firstPos;
        firstPos = lastPos;
        lastPos = tmp;
        rev = 1;
    }

    int pos = firstPos;
    //int n = 0;

    cursor.beginEditBlock();
    while (pos <= lastPos) {
        cursor.setPosition(pos);
        cursor.insertText("\t");
        lastPos += 1;
        QTextBlock nextBlock = document()->findBlock(pos).next();
        pos = nextBlock.isValid() ? nextBlock.position() : lastPos + 1;
    }
    cursor.endEditBlock();

    //
    // restore cursor
    //
    cursor.setPosition(rev ? lastPos : firstPos);
    cursor.setPosition(rev ? firstPos : lastPos, QTextCursor::KeepAnchor);
    setTextCursor(cursor);
}

//
// unindent [slot]
//
void TxtEditWnd::unindent() {

    QTextCursor cursor = textCursor();		// makes a copy of QTextCursor

    int firstPos = textCursor().anchor();
    int lastPos = textCursor().position();
    int rev = 0;

    //
    // may need swap pos and lastPos depending on how selection made
    //
    if (firstPos > lastPos) {
        int tmp = firstPos;
        firstPos = lastPos;
        lastPos = tmp;
        rev = 1;
    }

    int pos = firstPos;

    cursor.beginEditBlock();
    while (pos < lastPos) {
        cursor.setPosition(pos);
        cursor.setPosition(pos + 1, QTextCursor::KeepAnchor);
        if (cursor.selectedText() == "\t") {
            cursor.deleteChar(); // deletes selected text
            lastPos -= 1;
        }
        QTextBlock nextBlock = document()->findBlock(pos).next();
        pos = nextBlock.isValid() ? nextBlock.position() : lastPos;
    }
    cursor.endEditBlock();

    //
    // restore cursor
    //
    cursor.setPosition(rev ? lastPos : firstPos);
    cursor.setPosition(rev ? firstPos : lastPos, QTextCursor::KeepAnchor);
    setTextCursor(cursor);
}

//
// contextMenuEvent
//
// connects to QPlainTextEdit copy(), clear() & paste()
//
void TxtEditWnd::contextMenuEvent(QContextMenuEvent *e) {

    QMenu menu(this);

    //
    // test if cursor in an include file string
    //
    QTextCursor txtCursor = cursorForPosition(e->pos());
    QString fn = txtCursor.block().text();
    int start = txtCursor.columnNumber();
    int end = start;

    while ((start >= 0) && (fn[start] != '"'))
        start--;

    while ((end < fn.length()) && (fn[end] != '"'))
        end++;
    fn = fn.mid(start + 1, end - start -1);

    QAction openIncludeAction(this);
    if (type != DECFILE) {

        QString path;
        if (openInclude(fn, path, TESTIFEXISTS)) {

            openIncludeAction.setText(QString("Open %1").arg(path));
            openIncludeAction.setData(fn);
            menu.addAction(&openIncludeAction);
            connect(&openIncludeAction, SIGNAL(triggered()), this, SLOT(contextOpenInclude()));
        }
    }

    QAction openIncludesAction("Open #includes", this);
    if (type != DECFILE) {
        menu.addAction(&openIncludesAction);
        connect(&openIncludesAction, SIGNAL(triggered()), this, SLOT(openIncludes()));
    }

    menu.addSeparator();

    QAction saveAction("Save", this);
    if (isReadOnly() == 0) {
        saveAction.setEnabled(isModified());
        menu.addAction(&saveAction);
        connect(&saveAction, SIGNAL(triggered()), fileBarWnd, SLOT(activeFileSave()));
    }

    QAction closeAction("Close", this);
    closeAction.setEnabled(fileBarWnd->getActiveFileIndex());
    menu.addAction(&closeAction);
    connect(&closeAction, SIGNAL(triggered()), fileBarWnd, SLOT(activeFileClose()));

    menu.addSeparator();

    QAction cutAction("Cut", this);
    if (isReadOnly() == 0) {
        cutAction.setDisabled(textCursor().hasSelection() == 0);
        menu.addAction(&cutAction);
        connect(&cutAction, SIGNAL(triggered()), this, SLOT(cut()));
    }

    QAction copyAction("Copy", this);
    copyAction.setDisabled(textCursor().hasSelection() == 0);
    menu.addAction(&copyAction);
    connect(&copyAction, SIGNAL(triggered()), this, SLOT(copy()));


    QAction pasteAction("Paste", this);
    if (isReadOnly() == 0) {
        pasteAction.setEnabled(QApplication::clipboard()->text().length());
        menu.addAction(&pasteAction);
        connect(&pasteAction, SIGNAL(triggered()), this, SLOT(paste()));
    }

    menu.addSeparator();

    if (isReadOnly() == 0) {

        menu.addMenu(vApp->addCodeTemplateMenu);

        menu.addSeparator();

    }

    QAction selectAllAction("Select All", this);
    menu.addAction(&selectAllAction);
    connect(&selectAllAction, SIGNAL(triggered()), fileBarWnd, SLOT(selectAll()));

    menu.addSeparator();

    QAction findAction("Find", this);
    findAction.setShortcut(QKeySequence::Find);
    menu.addAction(&findAction);
    connect(&findAction, SIGNAL(triggered()), vApp->findReplaceDlg, SLOT(setFindMode()));

    QAction findNextAction("&Find Next", this);
    findNextAction.setShortcut(QKeySequence::FindNext);
    menu.addAction(&findNextAction);
    connect(&findNextAction, SIGNAL(triggered()), vApp->findReplaceDlg, SLOT(findNext()));

    QAction replaceAction("Replace", this);
    if (isReadOnly() == 0) {
        replaceAction.setDisabled(textCursor().hasSelection() == 0);
        menu.addAction(&replaceAction);
        //	connect(&replaceAction, SIGNAL(triggered()), this, SLOT(selectAll()));
    }

    menu.addSeparator();

    QAction replaceSpacesWithTabsAction("Replace spaces with tabs", this);
    if (isReadOnly() == 0) {
        menu.addAction(&replaceSpacesWithTabsAction);
        connect(&replaceSpacesWithTabsAction, SIGNAL(triggered()), this, SLOT(replaceSpacesWithTabs()));
    }

    menu.addSeparator();

    QAction indentAction("Increase indent", this);
    if (isReadOnly() == 0) {
        indentAction.setDisabled(textCursor().hasSelection() == 0);
        menu.addAction(&indentAction);
        connect(&indentAction, SIGNAL(triggered()), this, SLOT(indent()));
    }

    QAction unindentAction("Decrease indent", this);
    if (isReadOnly() == 0) {
        unindentAction.setDisabled(textCursor().hasSelection() == 0);
        menu.addAction(&unindentAction);
        connect(&unindentAction, SIGNAL(triggered()), this, SLOT(unindent()));
    }

    QAction commentAction("Comment", this);
    if (isReadOnly() == 0) {
        commentAction.setDisabled(textCursor().hasSelection() == 0);
        menu.addAction(&commentAction);
        connect(&commentAction, SIGNAL(triggered()), this, SLOT(comment()));
    }

    QAction uncommentAction("Uncomment", this);
    if (isReadOnly() == 0) {
        uncommentAction.setDisabled(textCursor().hasSelection() == 0);
        menu.addAction(&uncommentAction);
        connect(&uncommentAction, SIGNAL(triggered()), this, SLOT(uncomment()));
    }

    //menu.addSeparator();

    //QAction versionAction(vApp->player->versionLongTxt, this);
	//menu.addAction(&versionAction);

    menu.exec(e->globalPos());

}

// eof
