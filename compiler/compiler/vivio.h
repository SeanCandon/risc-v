#pragma once

//
// vivio.h
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
// 29/06/17 no longer need ui_vivio.h
//

#include "stdafx.h"             // pre-compiled headers {joj 13/12/11}

class FileBarWnd;				// quicker than include "fileBarWnd.h"
class ViewStackWnd;				// quicker than include "viewStackWnd.h"
class TabBarWnd;				// quicker than include "tabBarWnd.h"
class InfoWnd;					// quicker than include "infoWnd.h"
class Compiler;					// quicker than include "compiler.h"
class FindReplaceDlg;			// quicker than include "findReplaceDlg.h"
class IncludeDlg;				// quicker than include "includeDlg.h"
class AboutDlg;					// quicker than include "aboutDlg.h"

#define MAJORVERSION	17		// vivioJS 17.12 build 0
#define MINORVERSION	12
#define BUILD			0

#define NMBB			8		// number of mbbs in Mbbs (see mbbs.h)
#define	NLAYER			8		// max number of layers
#define MAXRECENTFILES	4		// max number of recent files

#define VIVIOANIMATIONS			"https://www.scss.tcd.ie/Jeremy.Jones/vivio/vivio.htm"
#define VIVIOHELP				"https://www.scss.tcd.ie/Jeremy.Jones/vivio/playerHelp.htm"
#define VIVIOHOME				"https://www.scss.tcd.ie/Jeremy.Jones/vivio/home.htm"

//
// Template
//
typedef struct {
    const char *mStr;			// menu string {joj 13/12/11}
    const char *tStr;			// template string {joj 13/12/11}
} Tmplate;

//
// VivioQWebEnginePage
//
// used to overide javasScriptConsoleMessage
//
class VivioQWebEnginePage : public QWebEnginePage {

public:
	VivioQWebEnginePage(QObject*);	// constructor

protected:
	void javaScriptConsoleMessage(JavaScriptConsoleMessageLevel, const QString&, int, const QString&);

};

//
// Vivio
//
class Vivio : public QMainWindow {

	Q_OBJECT

public:

	FileBarWnd *fileBarWnd;						//
	QSplitter *splitter;						//
	ViewStackWnd *viewStackWnd;					//
	TabBarWnd *tabBarWnd;						//
	InfoWnd *infoWnd;							//
	FindReplaceDlg *findReplaceDlg;				//
	AboutDlg *aboutDlg;							//
	QWebEngineView *browserWnd;					// {joj 18/7/16}
	VivioQWebEnginePage *browserPage;			// }joj 10/12/17}
	QString versionTxt;							// {joj 19/9/16}

	Compiler *compiler;							//

	int fontSz;									//
	int showLineNumbers;						//
	int alwaysCompileWhenRun;					//
	int clearArgsWhenRun;						//
	int checkArrayBounds;						//
	int showUpdateMbbs;							//
	int hidePlayerToolTips;						//
	QString fileDialogDir;						//
	QString cmdArgs;							// {joj 14/1/12}
	QString htmPath;							// {joj 18/7/16}
	QString jsPath;								// {joj 19/7/16}
	QString vivDir;								// {joj 8/7/17}
	QString vivFn;								// {joj 19/7/16}
	QString vivioPath;							//
	QString resultString;						// {joj 27/9/17}
	int testFlag;								// {joj 27/9/17}

	QMenu *addCodeTemplateMenu;					//

	Vivio(int, char**);							// constructor {joj 22/7/10}

	int init(int);								//
	void saveState();							//
	void commonRestoreState();					//
	void addToRecent(const QString&);			//
	void removeFromRecent(const QString&);		//

protected:

	void closeEvent(QCloseEvent*);				//
	void dragEnterEvent(QDragEnterEvent*);		//
	void dropEvent(QDropEvent*);				//

public slots:

	void setWindowSz();							// {joj 6/1/12} now public

	void showFileMenu();						//
	void showEditMenu();						//
	void showViewMenu();						//	{joj 19/7/10}

	void recentFileOpen();						//

	void compileAndRun();						//

	void setFontSz();							//
	void setShowLineNumbers(bool);				//
	void showWindowSzMenu();					//
	void setAlwaysCompileWhenRun(bool);			//
	void setClearArgsWhenRun(bool);				//
	void setCheckArrayBounds(bool);				//
	void setShowUpdateRects(bool);				//
	void setHidePlayerToolTips(bool);			//
	void showStatsWnd(bool);					// {joj 4/11/10}

	void vivioAnimations();						//
	void vivioHelp();							//
	void vivioHome();							// {joj 27/17/11}
	void closeIDE();							// {joj 27/9/17}					

private:

	QString cmdCheckString;						//
	QString cmdPath;							//
	int compileOnlyFlag;						//

	int parseCmdLine(int, char**);				//
	void cmdLineError(int, char**);				//
	int doCmd();								// {joj 28/9/17}

	void mkTmplateMenu(QMenu*);					//
	Tmplate* mkTmplateSubMenu(QMenu*, Tmplate*);//

	QAction *newVinFileAction;					//
	QAction *openIncludesAction;				//
	QAction *closeAction;						//
	QAction *saveAction;						//
	QAction *saveAsAction;						//
	QAction *saveAllAction;						//
	QAction *recentFileAction[MAXRECENTFILES];	//

	QAction *undoAction;						//
	QAction *redoAction;						//
	QAction *copyAction;						//
	QAction *cutAction;							//
	QAction	*pasteAction;						//
	QAction *findAction;						//
	QAction *findNextAction;					//
	QAction *findInFilesAction;					//
	QAction *replaceAction;						//
	QAction *increaseIndentAction;				//
	QAction *decreaseIndentAction;				//
	QAction *commentAction;						//
	QAction *uncommentAction;					//

	QAction *jsAction;							// {joj 19/7/16}
	QAction *htmAction;							// {joj 19/7/16}
	QMenu *layerMenu;							//

	QVector<QAction*> windowSzAction;			//

	QActionGroup *fontActionGroup;				//
	QStackedWidget *statusStackWnd;				//

	IncludeDlg *includeDlg;						//

	void createMenus();							//
	void setFontSz(int);						//
	void gotoUrl(const QUrl&);					// {joj 20/9/16}

};

// eof