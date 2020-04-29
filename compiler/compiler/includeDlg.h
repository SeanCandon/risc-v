#pragma once

//
// includeDlg.h
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

#include "stdafx.h"						// pre-compiled headers {joj 30/12/12}

//
// IncludeDlg
//
class IncludeDlg : public QDialog
{
	Q_OBJECT

public:

	IncludeDlg(QWidget* = 0);					// constructor

private slots:

	void create();								//
	void add();									//
	void remove();								//
	void enableButtons();						//
	void moveUp();								//
	void moveDown();							//
	void ok();									//
	void browse();								//

private:

	int created;								//

	QPushButton *addPB;							//
	QPushButton *deletePB;						//
	QPushButton *moveUpPB;						//
	QPushButton *moveDownPB;					//
	QListWidget *list;							//
	QPushButton *browsePB;						//
	QPushButton *okPB;							//
	QPushButton *cancelPB;						//

};

// eof
