//
// main.cpp
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
// 31/05/10	first Qt version
//

#include "stdafx.h"					// pre-compiled headers
#include "vivio.h"					//

Vivio *vApp;						// the application

//
// main
//
// used new QApplication(argc, argv) to stop app "crashing" when closed in DEBUG build
// seems to be a "deep" problem with deleting VivioQWebEnginePage and/or QWebEngineView
//
int main(int argc, char *argv[]) {
	QApplication *qtApp = new QApplication(argc, argv);		// {joj 27/9/17}
	vApp = new Vivio(argc, argv);
	if (vApp->init(argc)) {
		if (vApp->testFlag == 0)
			vApp->show();
		qtApp->exec();
		delete vApp;										// {joj 12/12/17}
	}
	return 0;
}

// eof