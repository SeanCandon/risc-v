#pragma once

//
// aboutDlg.h
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

#include "stdafx.h"								// {joj 30/12/12}

//
// AboutDlg
//
class AboutDlg : public QDialog
{
	Q_OBJECT

public:
	AboutDlg(QWidget* = 0);						// constructor

public slots:
	void create();								//

private:
	int created;								//

#ifdef Q_OS_WIN
private slots:
	void systemInfo();							//
#endif

};

// eof
