#pragma once

//
// tabBarWnd.h
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

#include "stdafx.h"							// {joj 30/12/12}

#define INFO_VIEW	0                       //

//
// TabBarWnd
//
class TabBarWnd : public QWidget {

	Q_OBJECT

public:

	TabBarWnd(QStackedWidget*);				// constructor
	~TabBarWnd();							// destructor

	void setFontSz(int);					// set font sz

protected:

	void paintEvent(QPaintEvent*);			//
	void mouseMoveEvent(QMouseEvent*);		//
	void leaveEvent(QEvent*);				//
	void mousePressEvent(QMouseEvent*);		//

private:

	int fontSz;								//
	QStackedWidget *stackedWidget;			//

	void drawTxt(QPainter*, int);			//
	int findButton(int);					//

	QString txt[2];							// button txt
	double txtx[2];							// button x pos
	QString tip[2];							// tool tip txt

	int highlight;							//

};

// eof
