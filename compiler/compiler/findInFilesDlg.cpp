//
// findInFilesDlg.cpp
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
#include "findInFilesDlg.h"				//
#include "main.h"						// vApp
#include "vivio.h"						//
#include "fileBarWnd.h"					//
#include "replaceDlg.h"					//

//
// constructor
//
// two stage construction to speed start-up
//
FindInFilesDlg::FindInFilesDlg(QWidget *parent) : QDialog(parent) {
	created = 0;
	QSettings settings;
	savedFindString = settings.value("findString", "").toString();
	savedFindFlags = settings.value("findFlags", FIND_CIRCULAR_SEARCH).toInt();
}

//
// create [slot]
//
void FindInFilesDlg::create() {

	if (created == 0) {

		QLabel *label = new QLabel("Find &what:");
		findString = new QLineEdit(savedFindString);
		findString->setFixedWidth(250);
		label->setBuddy(findString);

		matchCaseCB = new QCheckBox("Match &case");
		matchCaseCB->setChecked(savedFindFlags & FIND_MATCH_CASE);
		matchWholeWordsOnlyCB = new QCheckBox("Match &whole words ONLY");
		matchWholeWordsOnlyCB->setChecked(savedFindFlags & FIND_MATCH_WHOLE_WORDS_ONLY);

		QGroupBox *cell_1_1 = new QGroupBox("Search");
		currentFileRB = new QRadioButton("&Current file");
		allOpenFilesRB = new QRadioButton("&All open files");
		((savedFindFlags & FIND_ALL_OPEN_FILES) ? allOpenFilesRB : currentFileRB)->setChecked(true);

		findAllPB = new QPushButton("Find &All");
		findAllPB->setEnabled(savedFindString.length());
		closePB = new QPushButton("Close");

		QHBoxLayout *row0 = new QHBoxLayout;
		row0->addWidget(label);
		row0->addWidget(findString);

		QVBoxLayout *cell_0_1 = new QVBoxLayout;
		cell_0_1->addWidget(matchCaseCB);
		cell_0_1->addWidget(matchWholeWordsOnlyCB);

		QVBoxLayout *search = new QVBoxLayout;
		search->addWidget(currentFileRB);
		search->addWidget(allOpenFilesRB);
		cell_1_1->setLayout(search);

		QHBoxLayout *row1 = new QHBoxLayout;
		row1->addLayout(cell_0_1);
		row1->addWidget(cell_1_1);

		QHBoxLayout *row2 = new QHBoxLayout;
		row2->addWidget(findAllPB);
		row2->addWidget(closePB);

		QVBoxLayout *mainLayout = new QVBoxLayout;
		mainLayout->addLayout(row0);
		mainLayout->addLayout(row1);
		mainLayout->addLayout(row2);

		setLayout(mainLayout);

		setWindowTitle("Find in Files");
		setFixedHeight(sizeHint().height());

		connect(findString, SIGNAL(textChanged(const QString&)), this, SLOT(enableFindButton(const QString&)));
		connect(findAllPB, SIGNAL(clicked()), this, SLOT(findAll()));
		connect(closePB, SIGNAL(clicked()), this, SLOT(close()));

		created = 1;

	}

	//vApp->findDlg->hide();
	//vApp->replaceDlg->hide();

	show();
	raise();
	activateWindow();

}

//
// enableFindButton
//
void FindInFilesDlg::enableFindButton(const QString &txt) {
	findAllPB->setEnabled(txt.isEmpty() == 0);
}

//
// getFlags
//
int FindInFilesDlg::getFlags() {
	int flags = 0;
	if (matchCaseCB->isChecked())
		flags |= FIND_MATCH_CASE;
	if (matchWholeWordsOnlyCB->isChecked())
		flags |= FIND_MATCH_WHOLE_WORDS_ONLY;
	if (allOpenFilesRB->isChecked())
		flags |= FIND_ALL_OPEN_FILES;
	return flags;
}

//
// find [slot]
//
void FindInFilesDlg::find() {
	vApp->fileBarWnd->findAll(findString->text(), getFlags());
}

//
// saveState
//
void FindInFilesDlg::saveState() {
	if (created == 0)
		return;
	QSettings settings;
	settings.setValue("findString", findString->text());
	settings.setValue("findFlags", getFlags());
}

// eof
