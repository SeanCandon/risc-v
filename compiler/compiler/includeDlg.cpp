//
// includeDlg.cpp
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
#include "includeDlg.h"					//
#include "main.h"						// vApp
#include "vivio.h"						//

//
// constructor
//
// two stage construction to speed start-up
//
IncludeDlg::IncludeDlg(QWidget *parent) : QDialog(parent) {
	created = 0;
	QPalette p = palette();
	p.setColor(QPalette::Inactive, QPalette::Highlight, Qt::darkGray);
	p.setColor(QPalette::Inactive, QPalette::HighlightedText, Qt::white);
	setPalette(p);
}

//
// create [slot]
//
void IncludeDlg::create() {
	if (created == 0) {

		addPB = new QPushButton("Add");
		deletePB = new QPushButton("Delete");
		deletePB->setEnabled(false);
		moveUpPB = new QPushButton("Move up");
		moveUpPB->setEnabled(false);
		moveDownPB = new QPushButton("Move down");
		moveDownPB->setEnabled(false);
		browsePB = new QPushButton("Browse");
		browsePB->setEnabled(false);

		list = new QListWidget();

		if (vApp->vivioPath.count()) {
			int n = 0;
			while (1) {
				QString dir = vApp->vivioPath.section(";", n, n);
				if (dir.count() == 0)
					break;
				QListWidgetItem *item = new QListWidgetItem(dir);
				item->setFlags(item->flags () | Qt::ItemIsEditable);
				list->addItem(item);
				n++;
			}
		}

		okPB = new QPushButton("OK");
		cancelPB = new QPushButton("Cancel");

		QHBoxLayout *topRow = new QHBoxLayout;
		topRow->addWidget(addPB);
		topRow->addWidget(deletePB);
		topRow->addWidget(moveUpPB);
		topRow->addWidget(moveDownPB);
		topRow->addWidget(browsePB);

		QHBoxLayout *bottomRow = new QHBoxLayout;
		bottomRow->addWidget(okPB);
		bottomRow->addWidget(cancelPB);

		QVBoxLayout *mainLayout = new QVBoxLayout;
		mainLayout->addLayout(topRow);
		mainLayout->addWidget(list);
		mainLayout->addLayout(bottomRow);

		setLayout(mainLayout);

		setWindowTitle("Set Vivio path");
		setFixedHeight(sizeHint().height());

		connect(addPB, SIGNAL(clicked()), this, SLOT(add()));
		connect(deletePB, SIGNAL(clicked()), this, SLOT(remove()));
		connect(list, SIGNAL(itemSelectionChanged()), this, SLOT(enableButtons()));
		connect(moveUpPB, SIGNAL(clicked()), this, SLOT(moveUp()));
		connect(moveDownPB, SIGNAL(clicked()), this, SLOT(moveDown()));
		connect(browsePB, SIGNAL(clicked()), this, SLOT(browse()));
		connect(okPB, SIGNAL(clicked()), this, SLOT(ok()));
		connect(cancelPB, SIGNAL(clicked()), this, SLOT(close()));

		created = 1;

	}

	show();
	raise();
	activateWindow();

}

//
// add [slot]
//
void IncludeDlg::add() {
	QListWidgetItem *item = new QListWidgetItem("<new dir>");
	item->setFlags(item->flags () | Qt::ItemIsEditable);
	item->setToolTip("Absolute directory path or relative to .viv file directory");
	list->insertItem (0, item);
	enableButtons();
}

//
// remove [slot]
//
void IncludeDlg::remove() {
	delete list->currentItem();	// not obvious from documentation
	enableButtons();
}

//
// enableButtons [slot]
//
void IncludeDlg::enableButtons() {
	if (list->selectedItems().count()) {
		int cnt = list->count();
		deletePB->setEnabled(true);
		moveUpPB->setEnabled(cnt && list->currentRow());
		moveDownPB->setEnabled(cnt && (list->currentRow() != cnt - 1));
		browsePB->setEnabled(true);
	}
}

//
// moveUp [slot]
//
void IncludeDlg::moveUp() {
	int row = list->currentRow() - 1;
	list->insertItem(row, list->takeItem(row + 1));
	list->setCurrentRow(row);
}

//
// moveDown [slot]
//
void IncludeDlg::moveDown() {
	int row = list->currentRow() + 1;
	list->insertItem(row, list->takeItem(row - 1));
	list->setCurrentRow(row);
}

//
// browse [slot]
//
void IncludeDlg::browse() {
	QString dir = QFileDialog::getExistingDirectory (this, "", vApp->fileDialogDir);
	if (dir.count())
		list->currentItem()->setText(dir);
}

//
// ok [slot]
//
void IncludeDlg::ok() {
	QString vivioPath;
	for (int i = 0; i < list->count(); i++) {
		vivioPath += (i) ? ";" : "";
		vivioPath += list->item(i)->text();
	}
	vApp->vivioPath = vivioPath;				// {joj 16/11/10}
	QSettings settings;							// {joj 16/11/10}
	settings.setValue("vivioPath", vivioPath);	// {joj 16/11/10}
	close();
}

// eof