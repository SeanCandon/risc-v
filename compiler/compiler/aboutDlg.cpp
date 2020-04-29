//
// aboutDlg.cpp
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
// 26/07/10	first Qt version
//

#include "stdafx.h"						// pre-compiled headers
#include "aboutDlg.h"					//
#include "main.h"						// vApp
#include "vivio.h"						//

//
// constructor
//
// two stage construction to speed start-up
//
AboutDlg::AboutDlg(QWidget *parent) : QDialog(parent) {
    created = 0;
    setWindowTitle("About Vivio");
    QPalette p = palette();
	p.setColor(QPalette::Window, QColor(255, 255, 255));
    setPalette(p);
}

//
// create
//
void AboutDlg::create() {

    if (created == 0) {

        QHBoxLayout *mainLayout = new QHBoxLayout;
        QVBoxLayout *rhsCol = new QVBoxLayout;

        QString txt;

        txt += vApp->versionTxt + "\n";						// {joj 19/9/16}
        txt += "Qt " +  QString(QT_VERSION_STR) + "\n\n";	// {joj 7/1/12}

        txt += QString::fromLatin1("(C) 1996 - 2018 jones@scss.tcd.ie\n\n");

		txt += "Jeremy Jones\n";
        txt += "School of Computer Science and Statistics\n";
        txt += "Trinity College\n";
        txt += "Dublin 2\n\n";

        txt += "All rights reserved.\n\n";

		txt += "Vivio comes with ABSOLUTELY NO WARRANTY.\n\n";

        txt += "This program is free software; you can redistribute it and/or\n";
        txt += "modify it under the terms of the GNU General Public License\n";
        txt += "as published by the Free Software Foundation; either version 2\n";
        txt += "of the License, or (at your option) any later version.";

        QLabel *txtLabel = new QLabel(txt);
        txtLabel->setMargin(5);

		QLabel *tcdLogoLabel = new QLabel;								// joj 3/1/15}
        QImage *tcdLogo = new QImage(":tcd.png");
        *tcdLogo = tcdLogo->scaledToWidth(160, Qt::SmoothTransformation);
        tcdLogoLabel->setPixmap(QPixmap::fromImage(*tcdLogo));
        tcdLogoLabel->setAlignment(Qt::AlignHCenter);
        rhsCol->addWidget(tcdLogoLabel);

        QLabel *vivioLogoLabel = new QLabel;
        QImage *vivioLogo = new QImage(":vivioLogo.png");
        *vivioLogo = vivioLogo->scaledToWidth(32, Qt::SmoothTransformation);
        vivioLogoLabel->setPixmap(QPixmap::fromImage(*vivioLogo));
        vivioLogoLabel->setAlignment(Qt::AlignHCenter);
		vivioLogoLabel->setMargin(4);
        rhsCol->addWidget(vivioLogoLabel);

        QLabel *qtLogoLabel = new QLabel;
        QImage *qtLogo = new QImage(":Built_with_Qt_RGB_logo.png");
        *qtLogo = qtLogo->scaledToWidth(112, Qt::SmoothTransformation);
        qtLogoLabel->setPixmap(QPixmap::fromImage(*qtLogo));
        qtLogoLabel->setAlignment(Qt::AlignHCenter);
        rhsCol->addWidget(qtLogoLabel);

        //rhsCol->addStretch();
		//rhsCol->addSpacing(20);


#ifdef Q_OS_WIN
        QPushButton *systemInfoPB = new QPushButton("System Info");
        rhsCol->addWidget(systemInfoPB);
        connect(systemInfoPB, SIGNAL(clicked()), this, SLOT(systemInfo()));
#endif

        QPushButton *okPB = new QPushButton("OK");
        rhsCol->addWidget(okPB);
        connect(okPB, SIGNAL(clicked()), this, SLOT(close()));

        mainLayout->addWidget(txtLabel);
        mainLayout->addLayout(rhsCol);

        setLayout(mainLayout);

        setFixedHeight(sizeHint().height());

        created = 1;

    }

    show();
    raise();
    activateWindow();

}

#ifdef Q_OS_WIN
void AboutDlg::systemInfo() {
    QProcess::startDetached("\"C:/Program Files/Common Files/Microsoft Shared/MSInfo/msinfo32.exe\"");
}
#endif

// eof
