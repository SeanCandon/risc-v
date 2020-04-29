#pragma once

//
// replaceDlg.h
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
// ReplaceDlg
//
class ReplaceDlg : public QDialog
{
	Q_OBJECT

public:

	ReplaceDlg(QWidget* = NULL);

signals:

//	void findNext(const QString&, int);
//	void findPrevious(const QString&, int);

private slots:

//	void findClicked();
//	void enableFindButton(const QString&);

private:

	QLabel *label;
	QLineEdit *lineEdit;
	QCheckBox *caseCheclBox;
	QCheckBox *backWardCheckBox;
	QPushButton *findButton;
	QPushButton *closeButton;

};

// eof
