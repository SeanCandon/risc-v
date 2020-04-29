#pragma once

//
// fileBarWnd.h
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
// 25/04/10	first Qt version
//

#include "stdafx.h"								// pre-compiled headers {joj 30/12/12}

#define TXTEDIT_VIEW	0						//
#define VIVIO_VIEW		1						//

#define LAZYOPEN		1						//
#define	GOTOLINE		2						//
#define READDATAONLY	4						//
#define READONLY		8						//
#define CREATE		   16						//

#define TESTIFEXISTS   16						//

class ViewStackWnd;								// quicker than include "viewStackWnd.h"
class TxtEditWnd;								// quicker than include "txtEditWnd.h"
class InfoWnd;									// quicker than include "infoWnd.h"

//
// FileInfo
//
class FileInfo {

public:

	QString path;						// full file path
	QString fn;							// file name
	TxtEditWnd *txtEditWnd;				// plain text edit widget
	int readOnly;						// read only
	int stackIndex;						// stack index
	int needToReadOnAccess;				// read file on demand
	int x;								// fn x position on FileBar
	int w;								// fn width on FileBar
	int elided;							// filename elided

	int doRestore;						// do restore if ...
	QDateTime lastModified;				// file last modified time
	int hScroll;						// restore hSroll
	int vScroll;						// restore vScroll
	int selStart;						// restore selStart
	int selEnd;							// restore selEnd

	FileInfo();							// constructor

};

//
// FileBarWnd
//
class FileBarWnd : public QWidget {

	Q_OBJECT										//

public:

	int view;										//
	int editw;										//

	FileBarWnd(ViewStackWnd*, InfoWnd*);			// constructor
	~FileBarWnd();									// destructor

	int open(const QString&, int = 0, int = 0);		//

	void setFontSz(int);							//
	void setShowLineNumbers(bool);					//
	int isModified(int);							//
	int activeFileIsModified();						//
	int isAnyFileModified();						//
	void fileModified();							//
	int modifiedExternally(FileInfo*);				//
	int activeFileCanUndo();						//
	int activeFileCanRedo();						//
	int activeFileHasSelection();					//
	void findNext(const QString&, int);				//
	int findInFile(FileInfo*, const QString&, int);	//
	void findAll(const QString&, int);				//

	int getActiveFileIndex();						//
	QString vivFn();								//

	void saveState();								//
	void restoreState();							//

public slots:

	void activeFileOpenIncludes();					//
	void saveAs();									//
	int saveAll();									//
	void print();									//
	void openJSFile();								// {joj 19/7/16}
	void openHTMFile();								// {joj 19/7/16}
	void compile();									//
	void compileAndRun(int);						//
	void activeFileClose();							//
	void activeFileSave();							//
	void selectAll();								//
	void indent();									//
	void unindent();								//
	void comment();									//
	void uncomment();								//

protected:

	bool event(QEvent*);							//
	void paintEvent(QPaintEvent*);					//
	void resizeEvent(QResizeEvent*);				// {joj 8/1/10}
	void mouseMoveEvent(QMouseEvent*);				//
	void mousePressEvent(QMouseEvent*);				//
	void mouseReleaseEvent(QMouseEvent*);			// {joj 15/11/10}
	void leaveEvent(QEvent*);						//
	void contextMenuEvent(QContextMenuEvent*);		//
	void timerEvent(QTimerEvent*);					// {joj 15/11/10}

private slots:

	void newVivFile();								//
	void newVinFile();								//
	void dialogOpenFile();							// called from menu
	void contextOpenIncludes();						//
	void contextClose();							//
	void contextSave();								//
	void contextCloseAllExcept();					//
	void pasteTmplate();							//
	void activeFileUndo();							//
	void activeFileRedo();							//
	void activeFileCopy();							//
	void activeFileCut();							//
	void activeFilePaste();							//

private:

	ViewStackWnd *viewStackWnd;						//
	InfoWnd *infoWnd;								//
	int fontSz;										//
	int nFiles;										//
	int highlight;									//
	int activeFileIndex;							//
	int bflags;										// {joj 8/11/10}
	int firstFn;									// {joj 9/11/10}
	int nFn;										// # filenames displayed {joj 15/11/10}

	QVector<FileInfo*> fileInfo;					//

	QPainterPath back;								// {joj 8/11/10}
	QPainterPath forward;							// {joj 8/11/10}
	int timer;										// {joj 15/11/10}

	void drawTxt(QPainter*, int);					// {joj 9/11/10}
	int findButton(int);							// find button
	void sampleVivFile(FileInfo*);					//
	void sampleVinFile(FileInfo*);					//
	void recalculateXW();							//
	void bubbleSort();								//
	void newFile(const QString&);					// worker
	void close(int);								// worker
	void closeAll();								// worker
	void closeAllExcept(int);						// worker
	int save(int, int, int);						// worker
	void backForwardAction();						// {joj 15/11/10}

};

// eof
