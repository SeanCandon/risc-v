#pragma once

//
// txtEditWnd.h
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

#include "stdafx.h"			// pre-compiled headers {joj 30/12/12}

//
// 31/05/10	first Qt version
//

class FileInfo;				// quicker than include "fileInfo.h"
class FileBarWnd;			// quicker than include "fileBarWnd.h"
class TxtEditWnd;			// forward definition

#define VIVFILE		0		// .viv extension
#define VINFILE		1		// .vin extension
#define DECFILE		2		// .dec extension

//
// LineNumberWnd
//
class LineNumberWnd : public QWidget {
public:
	LineNumberWnd(TxtEditWnd*);			// constructor

protected:
	void paintEvent(QPaintEvent*);

private:
	TxtEditWnd *txtEditWnd;
};

//
// HighLighter
//
class Highlighter : public QSyntaxHighlighter {

	Q_OBJECT

public:
	Highlighter(QTextDocument *parent = 0);

protected:
	void highlightBlock(const QString &text);

private:
	QSet<QString> rw;
	QRegExp commentStartExpression;
	QRegExp commentEndExpression;
	QTextCharFormat rwFormat;
	QTextCharFormat commentFormat;
	QTextCharFormat stringFormat;
	QTextCharFormat vcodeFormat;

};

//
// TxtEditWnd
//
class TxtEditWnd : public QPlainTextEdit {

	Q_OBJECT

public:

	TxtEditWnd(FileBarWnd*, FileInfo*);				// constructor
	~TxtEditWnd();									// destructor

	FileBarWnd *fileBarWnd;							//
	FileInfo *fInfo;								//

	int fontSz;										//

	void clearModified();							//
	int isModified();								//

	int canUndo();									//
	int canRedo();									//

	int open(const QString);						// open
	void gotoLine(int);								// goto Line
	void setFontSz(int);							// set font size
	void setShowLineNumbers(bool);					// show line numbers
	void paintLineNumberWnd(QPaintEvent*);			//

public slots:

	void openIncludes();							// open all include files
	void replaceSpacesWithTabs();					// {joj 5/11/10}
	void comment();									// comment selection
	void uncomment();								// uncomment selection
	void indent();									// increase selection indentation
	void unindent();								// decrease selection indentation

protected:

	void resizeEvent(QResizeEvent*);				//
	void contextMenuEvent(QContextMenuEvent*);		//
	void showEvent(QShowEvent*);					//

private slots:

	void updateLineNumberWnd(const QRect&, int);	//
	void setModified();								//
	void setCanUndo(bool);							//
	void setCanRedo(bool);							//

	void contextOpenInclude();						//

private:

	QString url;									//

	int type;										// file type
	int modified;									//
	int _canUndo;									//
	int _canRedo;									//

	int lineNumberWndWidth;							// line number window width
	LineNumberWnd *lineNumberWnd;					// line number window

	Highlighter *highlighter;						// highlighter
	int openInclude(QString, QString&, int);		// worker

};

// eof
