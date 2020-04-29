//
// fileDlg.cpp
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
// 30/06/10	first Qt version
//

#include "stdafx.h"						// pre-compiled headers
#include "findReplaceDlg.h"				//
#include "main.h"						// vApp
#include "vivio.h"						//
#include "fileBarWnd.h"					//

//
// constructor
//
// two stage construction to speed start-up
//
FindReplaceDlg::FindReplaceDlg(QWidget *parent) : QDialog(parent) {
	created = 0;
	QSettings settings;
	savedFindString = settings.value("findString", "").toString();
	savedReplaceString = settings.value("replaceString", "").toString();
	savedFindFlags = settings.value("findFlags", FIND_CIRCULAR_SEARCH).toInt();
}

//
// create
//
void FindReplaceDlg::create() {

	if (created == 0) {

		QLabel *findLabel = new QLabel("Find &what:");
		findString = new QLineEdit(savedFindString);
		findString->setFixedWidth(250);
		findLabel->setBuddy(findString);

		replaceLabel = new QLabel("Replace with:");
		replaceString = new QLineEdit(savedReplaceString);
		replaceString->setFixedWidth(250);
		replaceLabel->setBuddy(replaceString);

		matchCaseCB = new QCheckBox("Match &case");
		matchCaseCB->setChecked(savedFindFlags & FIND_MATCH_CASE);
		matchWholeWordsOnlyCB = new QCheckBox("Match &whole words ONLY");
		matchWholeWordsOnlyCB->setChecked(savedFindFlags & FIND_MATCH_WHOLE_WORDS_ONLY);
		circularSearchCB = new QCheckBox("Circular search");
		circularSearchCB->setChecked(savedFindFlags & FIND_CIRCULAR_SEARCH);

		direction = new QGroupBox("Search Direction");
		forwardsRB = new QRadioButton("&Forwards");
		backwardsRB = new QRadioButton("&Backwards");
		((savedFindFlags & FIND_SEARCH_BACKWARDS) ? backwardsRB : forwardsRB)->setChecked(true);

		files = new QGroupBox("Search");
		currentFileRB = new QRadioButton("&Current file");
		allOpenFilesRB = new QRadioButton("&All open files");
		((savedFindFlags & FIND_ALL_OPEN_FILES) ? allOpenFilesRB : currentFileRB)->setChecked(true);

		findNextPB = new QPushButton("&Find Next");
		findNextPB->setEnabled(savedFindString.length());
		findAllPB = new QPushButton("&Find ALL");
		findAllPB->setEnabled(savedFindString.length());
		closePB = new QPushButton("Close");

		QHBoxLayout *row0 = new QHBoxLayout;
		row0->addWidget(findLabel);
		row0->addWidget(findString);
		row0->setAlignment(findLabel, Qt::AlignLeft);
		row0->setAlignment(findString, Qt::AlignRight);

		QHBoxLayout *row1 = new QHBoxLayout;
		row1->addWidget(replaceLabel);
		row1->addWidget(replaceString);
		row1->setAlignment(replaceLabel, Qt::AlignLeft);
		row1->setAlignment(replaceString, Qt::AlignRight);

		QVBoxLayout *cell0 = new QVBoxLayout;
		cell0->addWidget(matchCaseCB);
		cell0->addWidget(matchWholeWordsOnlyCB);
		cell0->addWidget(circularSearchCB);

		QVBoxLayout *cell1 = new QVBoxLayout;
		cell1->addWidget(forwardsRB);
		cell1->addWidget(backwardsRB);
		direction->setLayout(cell1);

		QVBoxLayout *cell2 = new QVBoxLayout;
		cell2->addWidget(currentFileRB);
		cell2->addWidget(allOpenFilesRB);
		files->setLayout(cell2);

		QHBoxLayout *row2 = new QHBoxLayout;
		row2->addLayout(cell0);
		row2->addWidget(direction);
		row2->addWidget(files);

		QHBoxLayout *row3 = new QHBoxLayout;
		row3->addWidget(findNextPB);
		row3->addWidget(findAllPB);
		row3->addWidget(closePB);

		QVBoxLayout *mainLayout = new QVBoxLayout;
		mainLayout->addLayout(row0);
		mainLayout->addLayout(row1);
		mainLayout->addLayout(row2);
		mainLayout->addLayout(row3);

		setLayout(mainLayout);

		setFixedHeight(sizeHint().height());

		connect(findString, SIGNAL(textChanged(const QString&)), this, SLOT(enableFindButton(const QString&)));
		connect(findNextPB, SIGNAL(clicked()), this, SLOT(findNext()));
		connect(findAllPB, SIGNAL(clicked()), this, SLOT(findAll()));
		connect(closePB, SIGNAL(clicked()), this, SLOT(close()));

		created = 1;

	}

}

//
// setFindMode [slot]
//
void FindReplaceDlg::setFindMode() {
	create();
	setWindowTitle("Find");
	replaceLabel->hide();
	replaceString->hide();
	circularSearchCB->show();
	direction->show();
	files->hide();
	findNextPB->show();
	findAllPB->hide();
	show();
	raise();
	activateWindow();
}

//
// setFindInFilesMode [slot]
//
void FindReplaceDlg::setFindInFilesMode() {
	create();
	setWindowTitle("Find in Files");
	replaceLabel->hide();
	replaceString->hide();
	circularSearchCB->hide();
	direction->hide();
	files->show();
	findNextPB->hide();
	findAllPB->show();
	show();
	raise();
	activateWindow();
}

//
// setReplaceMode [slot]
//
void FindReplaceDlg::setReplaceMode() {
	create();
	setWindowTitle("Replace");
	replaceLabel->show();
	replaceString->show();
	circularSearchCB->hide();
	direction->hide();
	files->show();
	//findNextPB->hide();
	//findAllPB->hide();
	show();
	raise();
	activateWindow();
}

//
// enableFindButton
//
void FindReplaceDlg::enableFindButton(const QString &txt) {
	findNextPB->setEnabled(txt.isEmpty() == 0);
	findAllPB->setEnabled(txt.isEmpty() == 0);
}

//
// getFlags
//
int FindReplaceDlg::getFlags() {
	int flags = 0;
	if (matchCaseCB->isChecked())
		flags |= FIND_MATCH_CASE;
	if (matchWholeWordsOnlyCB->isChecked())
		flags |= FIND_MATCH_WHOLE_WORDS_ONLY;
	if (backwardsRB->isChecked())
		flags |= FIND_SEARCH_BACKWARDS;
	if (circularSearchCB->isChecked())
		flags |= FIND_CIRCULAR_SEARCH;
	if (allOpenFilesRB->isChecked())
		flags |= FIND_ALL_OPEN_FILES;
	return flags;
}

//
// findNext [slot]
//
// used saved findString and flags if FindReplaceDlg not yet created
//
void FindReplaceDlg::findNext() {
	if (created) {
		vApp->fileBarWnd->findNext(findString->text(), getFlags());
	} else {
		vApp->fileBarWnd->findNext(savedFindString, savedFindFlags);
	}
}

//
// findAll [slot]
//
void FindReplaceDlg::findAll() {
	vApp->fileBarWnd->findAll(findString->text(), getFlags());
}
//
// saveState
//
void FindReplaceDlg::saveState() {
	if (created == 0)
		return;
	QSettings settings;
	settings.setValue("findString", findString->text());
	settings.setValue("replaceString", replaceString->text());
	settings.setValue("findFlags", getFlags());
}

// eof
