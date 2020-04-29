//
// infoWnd.cpp
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
// 18/06/10	first Qt version
//

#include "stdafx.h"					// pre-compiled headers
#include "infoWnd.h"				//
#include "main.h"					// vApp
#include "vivio.h"					// vApp->fontSz vApp->fileBarWnd
#include "fileBarWnd.h"				//

#define DEFAULT_FONT	"Tahoma"	//

//
// constructor
//
InfoWnd::InfoWnd() {
	setFrameStyle(QFrame::NoFrame);
	fontSz = -1;
	setFontSz(vApp->fontSz);
	setWordWrapMode(QTextOption::NoWrap);
	setReadOnly(true);
	QPalette p = palette();
	p.setColor(QPalette::Text, Qt::red);
	setPalette(p);
}

//
// destructor
//
InfoWnd::~InfoWnd() {
	// nothing to do
}

//
// setFontSz
//
void InfoWnd::setFontSz(int newFontSz) {
	if (newFontSz != fontSz) {
		fontSz = newFontSz;
		QFont font;
		font.setFamily(DEFAULT_FONT);
		font.setPointSize(fontSz);
		setFont(font);
		setTabStopWidth(4*fontMetrics().width("1"));
	}
}

//
// clear
//
void InfoWnd::clear() {
	setPlainText("");
}

//
// append
//
void InfoWnd::append(const QString &qs) {
	textCursor().movePosition(QTextCursor::End);	// append ...
	textCursor().insertText(qs);					// text and ...
	ensureCursorVisible();							// make sure visible
}

//
// vappend
//
void InfoWnd::vappend(const char *formats, ...) {
	if (formats) {
		va_list vargs;									// ANSI
		va_start(vargs, formats);						// vargs points to first optional parameter (must have at least one parameter)
		QString s;										//
		s.vsprintf(formats, vargs);						//
		textCursor().movePosition(QTextCursor::End);	// append ...
		textCursor().insertText(s);						// text
		ensureCursorVisible();
	}
}

//
// mouseDoubleClickEvent
//
// look for string of the following form:
//
// Runtime error @ x86pc = 01470065 vpc = 00000016: ACCESS VIOLATION 	(runtime error)
// C:\vivio\demos\test\v3.4\v3.3 - 3.viv (17) : s[2] = "aaa";			(compilation error or result of find in files)
//

#define RTERRSTR1 "Runtime error @ x86pc = "
#define RTERRSTR2 "Warning @ x86pc = "

void InfoWnd::mouseDoubleClickEvent(QMouseEvent *e) {
	QString txt = textCursor().block().text();

	QString fn;
	int lineno = 0;

//	int r = 0;
//
//
//		if ((strncmp(&txtbuf[pos], RTERRSTR1, strlen(RTERRSTR1)) == 0) || (strncmp(&txtbuf[pos], RTERRSTR2, strlen(RTERRSTR2)) == 0)) {
//
//			int x86pc, vpc;
//			int vpcpos = pos + ((strncmp(&txtbuf[pos], RTERRSTR1, strlen(RTERRSTR1)) == 0) ? strlen(RTERRSTR1) : strlen(RTERRSTR2)) - 1;
//
//			if (sscanf_s(&txtbuf[vpcpos], "%x %*s %*s %x", &x86pc, &vpc) == 2) {	// {joj 5/3/07}
//
//				theApp.pFrame->OnViewJit();
//
//				//
//				// use simple string comparison for speed
//				//
//				char vpcc[32];
//				sprintf_s(&vpcc[0], sizeof(vpcc), "!!  %08x", vpc);	// {joj 5/3/07}
//
//				char *buf = vivEditWnd->txtbuf;
//				int sz = vivEditWnd->sz;
//
//				int pos = 0;
//				int lineno = 1;
//				while (pos < sz) {
//					int startpos = pos;
//					int len = 0;
//					while ((buf[pos] != LF) && (pos < sz)) {
//						pos++;
//						len++;
//					}
//					if ((len > 32) && strncmp(&buf[startpos], vpcc, 12) == 0) {
//						vivEditWnd->open(vivEditWnd->getActiveFileInfo()->path, OPEN_ERRORLINE, lineno);	// {joj 10/8/09}
//						r = 1;
//						break;
//					}
//					lineno++;
//					pos++; // skip LF
//				}
//			}
//
//		} else {

		//
		// extract file name and lineno
		//
		for (int i = 0; i < txt.count() - 3; i++) {
			if (txt[i] == ')' && txt[i+1] == ' ' && txt[i+2] == ':') {
				int j = i - 1;
				while (j >= 0 && txt[j].isDigit())
					j--;
				if (txt[j] != '(')
					break;
				int k = j + 1;
				while (txt[k].isDigit()) {
					lineno = lineno*10 + txt[k].digitValue();
					k++;
				}
				fn = txt.left(j-1);
				vApp->fileBarWnd->open(fn, GOTOLINE, lineno);	// [open file and] set cursor to selected line {joj 10/8/09}
				break;
			}
		}

	QWidget::mouseDoubleClickEvent(e);

}

//
// contextMenuEvent
//
// connects to QPlainTextEdit copy(), clear() & selectAll()
//
void InfoWnd::contextMenuEvent(QContextMenuEvent *e) {
	QMenu menu(this);
	QAction copyAction("copy", this);
	copyAction.setShortcuts(QKeySequence::Copy);
	copyAction.setDisabled(textCursor().hasSelection() == 0);
	menu.addAction(&copyAction);
	connect(&copyAction, SIGNAL(triggered()), this, SLOT(copy()));
	menu.addSeparator();
	QAction clearAction("clear", this);
	clearAction.setShortcut(QString("Ctrl+X"));
	menu.addAction(&clearAction);
	connect(&clearAction, SIGNAL(triggered()), this, SLOT(clear()));
	menu.addSeparator();
	QAction selectAllAction("select All", this);
	selectAllAction.setShortcuts(QKeySequence::SelectAll);
	menu.addAction(&selectAllAction);
	connect(&selectAllAction, SIGNAL(triggered()), this, SLOT(selectAll()));
	menu.addSeparator();
	menu.exec(e->globalPos());
}

// eof
