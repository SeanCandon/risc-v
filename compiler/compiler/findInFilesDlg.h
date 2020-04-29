#pragma once

//
// findInFilesDlg.h
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
// FindInFilesDlg flags
//
#define FIND_MATCH_CASE					1
#define FIND_MATCH_WHOLE_WORDS_ONLY		2
#define FIND_SEARCH_BACKWARDS			4
#define FIND_CIRCULAR_SEARCH			8
#define FIND_ALL_OPEN_FILES			   16

//
// FindInFilesDlg
//
class FindInFilesDlg : public QDialog
{
	Q_OBJECT

public:

	FindInFilesDlg(QWidget* = 0);				// constructor
	void saveState();							// save state

private slots:

	void create();								//
	void find();								//
	void enableFindButton(const QString&);		//

private:

	int created;								//
	QString savedFindString;					//
	int savedFindFlags;							//

	QLineEdit *findString;						// find string line edit
	QCheckBox *matchCaseCB;						// match case check box
	QCheckBox *matchWholeWordsOnlyCB;			// match whole words only check box
	QRadioButton *currentFileRB;				// current file radio button
	QRadioButton *allOpenFilesRB;				// all open files radio button
	QPushButton *findAllPB;						// find all push button
	QPushButton *closePB;						// close push button

	int getFlags();

};

// eof
