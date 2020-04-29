//
// tabBarWnd.cpp
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
// 08/06/10	first Qt version
//

#include "stdafx.h"					// pre-compiled headers
#include "main.h"					// vApp
#include "vivio.h"					// Vivio
#include "viewStackWnd.h"			//
#include "tabBarWnd.h"				//

#define DEFAULTFONT		"Tahoma"	//
#define DEFAULTFONTSZ	10			//

#define VBORDER			2			//
#define HBORDER			4			//

//#define INTERVAL		500			// update stats every 500ms

//
// constructor
//
TabBarWnd::TabBarWnd(QStackedWidget *_stackedWidget) {
    stackedWidget = _stackedWidget;
    txt[0] = "info";
    txt[1] = "rtlog";
    txtx[0] = 0;
    txtx[1] = 0;
    tip[0] = "display debug information";
    tip[1] = "display runtime log";
    fontSz = -1;
    setFontSz(DEFAULTFONTSZ);
    highlight = -1;
    setMouseTracking(true);
}

//
// destructor
//
TabBarWnd::~TabBarWnd() {
    // nothing to do
}

// setFontSz
//
void TabBarWnd::setFontSz(int newFontSz) {
    if (newFontSz != fontSz) {
        fontSz = newFontSz;
        QFont font;
        font.setFamily(DEFAULTFONT);
        font.setPointSize(fontSz);
        setFont(font);
        setFixedHeight(fontMetrics().height() + 2*VBORDER);
        txtx[0] = fontMetrics().width(txt[0]) + 2*HBORDER;
        txtx[1] = txtx[0] + fontMetrics().width(txt[1]) + 2*HBORDER;
    }
}

//
// drawTxt
//
void TabBarWnd::drawTxt(QPainter *p, int b) {
    double x = (b < 1) ? 0 : txtx[b-1];
    if (b == highlight) {
        QRect r(x, 0, txtx[b] - x, height());
        p->fillRect(r, Qt::lightGray);
    }
    if (b == stackedWidget->currentIndex()) {
        p->setPen(b == 0 ? Qt::red : Qt::blue);
    } else {
        p->setPen(Qt::black);
    }
    p->drawText(x, 0, txtx[b] - x, height(), Qt::AlignCenter | Qt::AlignVCenter, txt[b]);
}

//
// paintEvent
//
// QPainter can only be created in paintEvent (Qt quirk)
//
// update() called each time content is changed to redraw complete window
//
void TabBarWnd::paintEvent(QPaintEvent *e) {

    QString statsTxt;

 //   if (vApp->player->nRender == 0) {
 //      statsTxt.sprintf("elapsed time: 0.00s tps:%d frames:0 avg per frame -- avg render: -- last render: --", vApp->player->tps);
 //   } else {
 //      statsTxt.sprintf("elapsed time:%6.2fs tps:%d frames:%d avg per frame %0.1fms avg render:%0.1fms last render:%0.1fms", vApp->player->runningTime / 1000.0, vApp->player->tps, vApp->player->nRender, vApp->player->tFrame / vApp->player->nRender, vApp->player->tRender / vApp->player->nRender, vApp->player->tRenderLast);
 //   }

    //
    // background
    //
    QPainter p(this);
    QRect r = e->rect();
    p.fillRect(r, Qt::white);

    //
    // top border
    //
    p.setPen(Qt::lightGray);
    p.drawLine(r.left(), r.top(), r.right(), r.top());

    //
    // info
    //
    drawTxt(&p, 0);
    p.setPen(Qt::lightGray);
    p.drawLine(txtx[0], r.top(), txtx[0], r.bottom());

    //
    // stats
    //
    p.setPen(Qt::black);
    p.drawText(txtx[1] + HBORDER, 0, width(), height(), Qt::AlignLeft | Qt::AlignVCenter, statsTxt);

    //
    // view size
    //
    QSize sz = vApp->viewStackWnd->size();
    QString s;
    s.sprintf(" %d x %d", sz.width(), sz.height());
    p.setBackgroundMode(Qt::OpaqueMode);
    p.setBackground(QBrush(Qt::white));
    p.setPen(Qt::black);
    p.drawText(0, 0, width() - HBORDER, height(), Qt::AlignRight | Qt::AlignVCenter, s);

}

//
// findButton
//
int TabBarWnd::findButton(int x) {
    int button = -1;
    if (x < txtx[0]) {
        button = 0;
    } else if (x < txtx[1]) {
        button = 1;
    }
    return button;
}

//
// mousePressEvent
//
void TabBarWnd::mousePressEvent(QMouseEvent *e) {
    int button = findButton(e->x());
    if (button == -1)
        return;
    if (button != stackedWidget->currentIndex()) {
        stackedWidget->setCurrentIndex(button);
        update();
    }
}

//
// mouseMoveEvent
//
void TabBarWnd::mouseMoveEvent(QMouseEvent *e) {
    int button = findButton(e->x());
    if (highlight != button) {
        highlight = button;
        if (highlight == -1) {
            setToolTip("");
        } else  {
            setToolTip(tip[button]);
        }
        update();
    }
}

//
// leaveEvent
//
void TabBarWnd::leaveEvent(QEvent *) {
    if (highlight != -1) {
        highlight = -1;
        update();
    }
}

// eof