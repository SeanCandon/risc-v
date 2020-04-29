#pragma once

//
// fileDlg.h
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
// FindReplaceDlg flags
//
#define FIND_MATCH_CASE					1
#define FIND_MATCH_WHOLE_WORDS_ONLY		2
#define FIND_SEARCH_BACKWARDS			4
#define FIND_CIRCULAR_SEARCH			8
#define FIND_ALL_OPEN_FILES			   16

//
// FindReplaceDlg
//
class FindReplaceDlg : public QDialog
{
	Q_OBJECT

public:

	FindReplaceDlg(QWidget* = 0);				// constructor
	void saveState();							// save state

private slots:

	void setFindMode();							//
	void setFindInFilesMode();					//
	void setReplaceMode();						//
	void findNext();							//
	void findAll();								//
	void enableFindButton(const QString&);		//

private:

	int created;								//

	QString savedFindString;					//
	QString savedReplaceString;					//
	int savedFindFlags;							//

	QLineEdit *findString;						// find string line edit
	QLabel *replaceLabel;						// "Replace with:" label
	QLineEdit *replaceString;					// replace string line edit

	QCheckBox *matchCaseCB;						// match case check box
	QCheckBox *matchWholeWordsOnlyCB;			// match whole words only check box
	QCheckBox *circularSearchCB;				// circular search check box

	QGroupBox *direction;						// search direction
	QRadioButton *forwardsRB;					// forwards
	QRadioButton *backwardsRB;					// backwards

	QGroupBox *files;							// search files
	QRadioButton *currentFileRB;				// current file radio button
	QRadioButton *allOpenFilesRB;				// all open files radio button

	QPushButton *findNextPB;					// find next push button
	QPushButton *findAllPB;						// find all push button
	QPushButton *closePB;						// close push button

	void create();								//
	int getFlags();								//

};

// eof
