#pragma once

//
// infoWnd.h
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

#include "stdafx.h"								// pre-compiled headers {joj 30/12/12}

//
// InfoWnd
//
class InfoWnd : public QPlainTextEdit {

public:

	InfoWnd();									// constructor
	~InfoWnd();									// destructor

	void setFontSz(int);						// set font size
	void clear();								// clear
	void append(const QString&);				// append
	void vappend(const char*, ...);				// append

protected:

	void mouseDoubleClickEvent(QMouseEvent*);	// double click event
	void contextMenuEvent(QContextMenuEvent*);	// context menu handling

private:

	int fontSz;									// font size

};

// eof
