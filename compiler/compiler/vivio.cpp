//
// vivio.cpp
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
// 01/06/10 first Qt version
// 18/07/16 VS2015 + Qt5.7
// 18/07/16 VivioJS
// 23/01/17 Qt5.8
// 02/06/17 VS2017 + Qt5.9
// 04/07/17 Qt5.9.1
// 04/07/17 QtCreator used along side VS2017
// 25/07/17 nested classes
// 27/07/17 default parameters for builtin functions initialised by JavaSCript VPlayer instead of compiler
// 28/07/17 array initialisation
// 04/10/17 ref parameters
// 09/12/17 Qt5.10.0
// 14/02/18 Qt5.10.1
//

//
// for windows deployment run "windeployqt.exe vivio.exe" in VivioJS/bin directory
//

#include "stdafx.h"                                     // pre-compiled headers
#include "main.h"                                       // vApp
#include "vivio.h"                                      //
#include "viewStackWnd.h"                               //
#include "fileBarWnd.h"                                 //
#include "txtEditWnd.h"                                 //
#include "tabBarWnd.h"                                  //
#include "infoWnd.h"                                    //
#include "compiler.h"                                   //
#include "findReplaceDlg.h"                             //
#include "includeDlg.h"                                 //
#include "aboutDlg.h"                                   //

#define APP_DEFAULT_FONT_SZ                    10       //
#define APP_DEFAULT_SHOW_LINE_NUMBERS           1       //
#define APP_DEFAULT_ALWAYS_COMPILE_WHEN_RUN     1       //
#define APP_DEFAULT_CLEAR_ARGS_WHEN_RUN         1       //
#define APP_DEFAULT_CHECK_ARRAY_BOUNDS          0       //
#define APP_DEFAULT_SHOW_UPDATE_RECTS           0       //
#define APP_DEFAULT_HIDE_PLAYER_TOOLTIPS        0       //

//
// tmplate
//
// mStr     tStr
//
//   0        0         // end of menu
//   1        0         // menu separator
//  str       0         // paste mStr (rather than tStr)
//  str       1         // popup menu
//  str      str        // normal menu item
//

Tmplate tmplate[] = {
    {"GObj creation", (char*)1},
        {"Arc(layer, options, pen, brush, x, y, cx, cy, rx, ry, startAngle, spanAngle, txtpen = 0, font = 0, fs = 0, ...)", 0},		// {joj 22/2/18}
        {"Bezier(layer, options, pen, brush, [x, y, ix0, iy0, ic0x, ic0y, ic1x, ic1y, ix1, iy1, ic2x, ic2y, ...])", 0},
        {"Ellipse(layer, options, pen, brush, x, y, ix, iy, iw, ih, txtpen = 0, font = 0, fs = 0, ...)", 0},
        {"Ellipse2(layer, options, pen, brush, x, y, iw, ih, txtpen = 0, font = 0, fs = 0, ...)", 0},
        {"Group([layer, options, x, y, ix, iy, iw, ih])", 0},
        {"Image(layer, options, pen, url, x, y, ix, iy, iw, ih, txtpen = 0, font = 0, fs = 0, ...)", 0},							// {joj 22/2/18}
        {"Line(layer, options, pen, x, y [, ix0, iy0, ix1, iy1, ...])", 0},
        {"Line2(layer, options, pen [, x, y, ix1, iy1, ...])", 0},
        {"Path creation", (char*)1},
            //{"$A(options, x, y, w, h, startAngle, theta)", 0},
            //{"$C(options, font, x, y, w, h, s)", 0},
            {"$E(options, x, y, w, h)", 0},
            //{"$L(options, [x0, y0, x1, y1, ...])", 0},
            //{"$P(options, x, y, w, h, startAngle, theta)", 0},
            {"$R(options, x, y, w, h)", 0},
            //{"$S(options, tension, [x0, y0, x1, y1, ...])", 0},
            {0, 0},
        {"Pie(layer, options, pen, brush, x, y, cx, cy, rx, ry, startAngle, spanAngle, txtpen = 0, font = 0, fs = 0, ...)", 0},		// {joj 22/2/18}
        {"Polygon(layer, options, pen, brush, x, y [, ix0, iy0, ix1, iy0, ...])", 0},
        {"Rectangle(layer, options, pen, brush, x, y, ix, iy, iw, ih [, txtpen = 0, font = 0, txt = 0, ...])", 0},
        {"Rectangle2(layer, options, pen, brush, x, y, iw, ih, [txtpen = 0, font = 0, txt = 0, ...])", 0},
        //{"Shape(layer, options, pen, brush, x, y, path, txtpen = 0, font = 0, txt = 0, ...)", 0},
        {"Spline(layer, options, pen, brush, tension, x, y [, ix0, iy0, ix1, iy1, ...])", 0},
        {"Txt(layer, options, x, y, txtpen = 0, font = 0, fs = 0, ...)", 0},
        {0, 0},
        {"GObj event handlers", (char*)1},
		{"eventEE(flags, x, y) {enter exit}", "when gObj ~> eventEE(num flags, num x, num y) {\n\n}\n"},							// {joj 22/2/18}
        {"eventMB(button, flags, x, y) {mouse button}", "when gObj ~> eventMB(num down, num flags, num x, num y) {\n\n}\n"},		// {joj 22/2/18}
        {"eventGRABBED(type, p1, flags, x, y)", "when gObj ~> eventGRABBED(num type, num p1, num flags, num x, num y) {\n\n}\n"},	// {joj 22/2/18}
        {"eventKB(key, flags, x, y) {keyboard}", "when gObj ~> eventKB(num key, num flags, num x, num y) {\n\n}\n"},				// {joj 22/2/18}
        //{"eventWINSZ() {executed when window size changed}", "when gObj.eventWINSZ() {\n\n}\n"},
        {"eventUPDATED() {called when gObj is updated}", "when gObj ~> eventUPDATED() {\n\n}\n"},									// {joj 22/2/18}
        {0, 0},
    {"GObj get property functions", (char*)1},
        {"getBrush()", 0},
        //{"getClipH()", 0},
        //{"getClipRgn()", 0},
        //{"getClipW()", 0},
        //{"getClipX()", 0},
        //{"getClipY()", 0},
        //{"getCursor()", 0},
        {"getFont()", 0},
        //{"getH()", 0},
        {"getIH()", 0},
        {"getIW()", 0},
        //{"getIX()", 0},
        //{"getIY()", 0},
        {"getLayer()", 0},
        {"getOpacity()", 0},
        {"getOptions()", 0},
        {"getPen()", 0},
        {"getPinX()", 0},
        {"getPinY()", 0},
        {"getPostClipPath()", 0},																									// {joj 22/2/18}
        //{"getPostClipRgn()", 0},
        //{"getClipW()", 0},
        //{"getPostClipX()", 0},
        //{"getPostClipY()", 0},
        {"getTextureOffX()", 0},
        {"getTextureOffY()", 0},
        {"getTheta()", 0},																											// {joj 22/2/18}
        {"getTxt()", 0},
        {"getTxtH()", 0},
        {"getTxtLen()", 0},
        {"getTxtOffX()", 0},
        {"getTxtOffY()", 0},
        {"getTxtPen()", 0},																											// {joj 22/2/18}
		{"getTxtW()", 0},
        {"getW()", 0},
        {"getX()", 0},
        {"getY()", 0},
        {0, 0},
    {"GObj set property functions", (char*)1},
        {"setAngle(theta, steps = 0, interval = 0, wait = 0)", 0},																	// {joj 22/2/18}
        {"setBrush(brush)", 0},
        {"setClipPath(path)", 0},																									// {joj 22/2/18}
        //{"setCursor(cursor)", 0},
        {"setFont(font)", 0},
        {"setMapping(x, y, w, h, vx, vy, vw, vh, steps = 0, interval = 0, wait = 0)", 0},
        {"setOpacity(opacity, steps = 0, interval = 0, wait = 0)", 0},
        {"setOptions(options)", 0},
        {"setPen(pen)", 0},
		{"setPin(pinx, piny, steps = 0, interval = 0, wait = 0)", 0},																// {joj 22/2/18}
        {"setPos(x, y, steps = 0, interval = 0, wait = 0)", 0},
        //{"setPostClip(x, y, w, h)", 0},
        //{"setPostClipRegion(region)", 0},
        {"setSize(w, h, steps = 0, interval = 0, wait = 0)", 0},
		{"setTextureOff(offx, offy, steps = 0, interval = 0, wait = 0)", 0},
		{"setTxt(fs, ...)", 0},
		{"setTxt3(pen = 0, font = 0, fs = 0, ...)", 0 },																			// {joj 22/2/18}
		{"setTxtBgBrush(brush)", 0},																								// {joj 22/2/18}
        {"setTxtOff(offx, offy, steps = 0, interval = 0, wait = 0)", 0},
		{"setTxtPen(pen)", 0},
        {0, 0},
    {"GObj other functions", (char*)1},
		{"attachTo(group)", 0},																										// {joj 22/2/18}
        //{"contains(x, y)", 0},
        //{"destroy()", 0},
		{"detach()", 0},																											// {joj 22/2/18}
        {"grab()", 0},
        {"flash(pen, brush, steps = 0, interval = 0, wait = 0)", 0},
        {"moveToBack()", 0},
        {"moveToFront()", 0},
        {"reset()", 0},
		{"rotate(dtheta, steps = 0, interval = 0, wait = 0)", 0},																	// {joj 22/2/18}
		{"scale(sx, sy, steps = 0, interval = 0, wait = 0)", 0},
		{"translate(dx, dy, steps = 0, interval = 0, wait = 0)", 0},
		{"translatePin(dx, dy, steps = 0, interval = 0, wait = 0)", 0 },															// {joj 22/2/18}
        {"ungrab()", 0},
        {"update()", 0},
        {0, 0},
    {"Arc functions", (char*)1},
        {"getStartAngle()", 0},
        {"getSpanAngle()", 0},																										// {joj 22/2/18}
        {"rotateStartAngle(dtheta, steps = 0, interval = 0, wait = 0)", 0},
        {"rotateSpanAngle(dTheta, steps = 0, interval = 0, wait = 0)", 0},															// {joj 22/2/18}
        {"setStartAngle(theta, steps = 0, interval = 0, wait = 0)", 0},										
        {"setSpanAngle(theta, steps = 0, interval = 0, wait = 0)", 0},																// {joj 22/2/18}												
        {0, 0},
    {"Bezier functions", (char*)1},
		{"getNPts(index)", 0 },																										// {joj 22/2/18}
        {"getPtX(index)", 0},
        {"getPtY(index)", 0},
        {"setNPts(n)", 0},																											// {joj 22/2/18}
        {"setPt(index, x, y, steps = 0, interval = 0, wait = 0)", 0},
		{"translatePt(index, dx, dy, steps = 0, interval = 0, wait = 0)", 0 },														// {joj 22/2/18}													
		{0, 0},
    {"Ellipse functions", (char*)1},
		{"getNPts(index)", 0 },																										// {joj 22/2/18}
		{"getPtX(index)", 0},
        {"getPtY(index)", 0},
        {"setPt(index, x, y, steps = 0, interval = 0, wait = 0)", 0},
        {"translatePt(index, dx, dy, steps = 0, interval = 0, wait = 0)", 0},														// {joj 22/2/18}
       {0, 0},
    {"Line functions", (char*)1},
		{"getNPts(index)", 0 },																										// {joj 22/2/18}
		{"getPtX(index)", 0},
        {"getPtY(index)", 0},
        {"setNPts(n)", 0},
        {"setPt(index, x, y, steps = 0, interval = 0, wait = 0)", 0},
        {"translatePt(index, dx, dy, steps = 0, interval = 0, wait = 0)", 0},														// {joj 22/2/18}
        {0, 0},
    {"Path functions", (char*)1},
        {"$closedPath(path)", 0},
        {"$openPath(path)", 0},
        {"$outlinePath(path)", 0},
        {0, 0},
    {"Pie functions", (char*)1},
		{"getSpanAngle()", 0},
		{"getStartAngle()", 0},
		{"rotateSpanAngle(theta, steps = 0, interval = 0, wait = 0)", 0},
		{"rotateStartAngle(theta, steps = 0, interval = 0, wait = 0)", 0},
        {"setSpanAngle(angle, steps = 0, interval = 0, wait = 0)", 0},																// {joj 23/3/18}
        {"setStartAngle(angle, steps = 0, interval = 0, wait = 0)", 0},																// {joj 23/3/18}
        {0, 0},
    {"Polygon functions", (char*)1},
		{"getNPts(index)", 0 },																										// {joj 22/2/18}
		{"getPtX(index)", 0},
        {"getPtY(index)", 0},
        {"setNPts(n, [allocated = 0])", 0},
        {"setPt(index, x, y, steps = 0, interval = 0, wait = 0)", 0},
        {"translatePt(index, dx, dy, steps = 0, interval = 0, wait = 0)", 0},														// {joj 22/2/18}
		{0, 0},
    {"Rectangle functions", (char*)1},
		{"getNPts(index)", 0 },																										// {joj 22/2/18}
		{"getPtX(index)", 0},
        {"getPtY(index)", 0},
		{"getRoundedX(index)", 0 },																									// {joj 22/2/18}
		{"getRoundedY(index)", 0 },																									// {joj 22/2/18}
        {"setPt(index, x, y, steps = 0, interval = 0, wait = 0)", 0},
        {"setRounded(rx, ry, steps = 0, interval = 0, wait = 0)", 0},
 		{"translatePt(index, dx, dy, steps = 0, interval = 0, wait = 0)", 0},														// {joj 22/2/18}
		{0, 0},
    {"Spline functions", (char*)1},
		{"getNPts(index)", 0 },																										// {joj 22/2/18}
		{"getPtX(index)", 0},
        {"getPtY(index)", 0},
        {"getTension()", 0},
        {"setNPts(n)", 0},
        {"setPt(index, x, y, steps = 0, interval = 0, wait = 0)", 0},
        {"setTension(tension, steps = 0, interval = 0, wait = 0)", 0},
        {"translatePt(index, dx, dy, steps = 0, interval = 0, wait = 0)", 0},														// {joj 22/2/18}
		{0, 0},
    {"Brush", (char*)1},
        {"NullBrush()", 0},																							
        {"GradientBrush(options, x0, x1, y0, y1, rgba0, rgba1)", 0},										// {joj 22/2/18}
        {"ImageBrush(options, url)", 0},																	// {joj 22/2/18}
        {"RadialBrush(options, x0, x1, r0, y0, y1, r1, rgba0, rgba1)", 0},									// {joj 22/2/18}
        {"SolidBrush(rgba)", 0},																			// {joj 22/2/18}
        {(char*)1, 0},
        {"setNull()", 0},																					// {joj 22/2/18}
        {"setGradient(options, x0, x1, y0, y1, rgba0, rgba1)", 0},											// {joj 22/2/18}
        {"setImage(oprions, url)", 0},																		// {joj 22/2/18}
        {"setRadial(options, x0, x1, r0, y0, y1, r1, rgba0, rgba1)", 0},									// {joj 22/2/18}
        {"setSolid(rgba)", 0},																				// {joj 22/2/18}
        {(char*)1, 0},
		{"getOptions()", 0 },																				// {joj 22/2/18}
 		{"getR0()", 0 },																					// {joj 22/2/18}
		{"getR1()", 0 },																					// {joj 22/2/18}
		{"getRGBA()", 0 },																					// {joj 22/2/18}
		{"getRGBA0()", 0},																					// {joj 22/2/18}
		{"getRGBA1()", 0 },																					// {joj 22/2/18}
        {"getType()", 0},
        {"getURL()", 0},
		{"getX0()", 0 },																					// {joj 22/2/18}
		{"getX1()", 0 },																					// {joj 22/2/18}
		{"getY0()", 0 },																					// {joj 22/2/18}
		{"getY1()", 0 },																					// {joj 22/2/18}
        {"setRGBA(rgba, steps = 0, interval = 0, wait = 0)", 0},											// {joj 22/2/18}
        {"setRGBA2(rgba1, rgba2, steps = 0, interval = 0, wait = 0)", 0},									// {joj 22/2/18}
        {0, 0},
    {"Font", (char*)1},
        {"Font(face, sz, flags = 0)", 0},
        {(char*)1, 0},
        {"getFace()", 0},
        {"getFlags()", 0},
        {"getSz()", 0},
        {"setFont(face, sz, flags = 0)", 0},
        {"setSz(sz, steps = 0, interval = 0, wait = 0)", 0},
        {0, 0},
    {"Layer", (char*)1},
        {"Layer(z = 0, options = 0)", 0},																	// {joj 22/2/18}
        {"setOpacity(opacity, steps = 0, interval = 0, wait = 0)", 0},
        {0, 0},
    {"Pen", (char*)1},
		{"NullPen()", 0},																					// {joj 22/2/18}
        {"SolidPen(style = 0, width = 1, rgba = 0, caps = 0, startCapScale = 2, endCapScale = 2])", 0 },	// {joj 22/2/18}
        {"ImagePen(options, style, width, url = 0, caps = 0, startCapScale = 2, endCapScale = 2])", 0},		// {joj 22/2/18}
        {(char*)1, 0},
        {"setNull()",0},
		{"setImage(options, style, width, url = 0, caps = 0, startCapScale = 2, endCapScale = 2])", 0 },	// {joj 22/2/18}
        {"setSolid(style = 0, width = 1, rgba = 0, caps = 0, startCapScale = 2, endCapScale = 2])", 0},		// {joj 22/2/18}
        {(char*)1, 0},
        {"getEndCapScale()", 0},																			// {joj 20/10/10}
        {"getCaps()", 0},																					// [joj 22/2/18}
        {"getRGBA()", 0},																					// {joj 22/2/18}
		{"getOptions()", 0 },																				// {joj 22/2/18}
        {"getStartCapScale()", 0},																			// {joj 20/10/10}
        {"getStyle()", 0},
        {"getType()", 0},
		{"getURL()", 0 },																					// {joj 22/2/18}
        {"getWidth()", 0},
        {"setRGBA(rgba, steps = 0, interval = 0, wait = 0)", 0},											// {joj 22/2/18}
        {"setWidth(width, steps = 0, interval = 0, wait = 0)", 0},
        {0, 0},
    {"args", (char*)1},
        {"getArg(name, defaultStr)", 0},																	// {joj 22/2/18}
        {"getArgAsNum(name, defaultNum)", 0},																// {joj 22/2/18}
        {"setArg(name, str, daysToLive = -1)", 0},															// {joj 22/2/18}
		{"setArgFromNum(name, num, daysToLive = -1)", 0 },													// {joj 22/2/18}
        {0, 0},
        {"global event handlers", (char*)1},
        {"eventSetTPS(tps)", "when ~> eventSetTPS(num tps) {\n\n}\n"},										// {joj 22/2/18}
        {"eventStartStop(start)", "when ~> eventStopEvent(num start) {\n\n}\n"},							// {joj 22/2/18}
        {"eventFire(str)", "when ~> eventFire(string str) {\n\n}\n"},										// {joj 22/2/18}
        {"eventTick(tick)", "when ~> eventTick(num tick) {\n\n}\n"},										// {joj 22/2/18}
        //{"eventGoto(tick, backwards)", "when eventTick(int tick, int backwards) {\n\n}\n"},
        {0, 0},
	{ "global constants", (char*)1 },
		{"brush types", (char*)1},																			// {joj 22/2/18}
			{"GRADIENTBRUSH", 0},
			{"IMAGEBRUSH", 0},
			{"NULLBRUSH", 0},
			{"RADIALBRUSH", 0},
			{"SOLIDBRUSH", 0},
			{0, 0},
		{ "colours", (char*)1},																				// {joj 22/2/18}
			{"BLACK", 0},
			{"BLUE", 0},
			{"CYAN", 0},
			{"GREEN", 0},
			{"MAGENTA", 0},
			{"GRAY32", 0},
			{"GRAY64", 0},
			{"GRAY96", 0},
			{"GRAY128", 0},
			{"GRAY160", 0},
			{"GRAY192", 0},
			{"GRAY224", 0},
			{"RED", 0},
			{"WHITE", 0},
			{"YELLOW", 0},
			{0, 0},
		{"event types", (char*)1},																			// {joj 22/2/18}
			{"KEY", 0},
			{"MB", 0},
			{"MM", 0},
			{0, 0},
		{"font styles", (char*)1},																			// {joj 22/2/18}
			{"BOLD", 0},
			{"ITALIC", 0},
			{"STRIKETHROUGH", 0},
			{"SMALLCAPS", 0},
			{"UNDERLINE", 0},
			{0, 0},
		{"mouse event button flags", (char*)1},																// {joj 22/2/18}
			{"MB_ALT", 0},
			{"MB_CTRL", 0},
			{"MB_LEFT", 0},
			{"MB_MIDDLE", 0},
			{"MB_RIGHT", 0},
			{"MB_SHIFT", 0},
			{0, 0},
		{"pen caps", (char*)1 },																			// {joj 22/2/18}
			{"ARROW40_END", 0},
			{"ARROW60_END", 0},
			{"ARROW90_END", 0},
			{"ARROW40_START", 0},
			{"ARROW60_START", 0},
			{"ARROW90_START", 0},
			{"BUTT_END", 0},
			{"BUTT_START", 0},																				
			{"CIRCLE_END", 0},
			{"CIRCLE_START", 0},
			{"ROUND_END", 0},
			{"ROUND_START", 0},
			{"SQUARE_END", 0},
			{"SQUARE_START", 0},
			{0, 0},
		{"pen joins", (char*)1},																			// {joj 22/2/18}
			{"BEVEL_JOIN", 0},
			{"MITRE_JOIN", 0},
			{"ROUND_JOIN", 0},
			{0, 0},
		{"pen styles", (char*)1},																			// {joj 23/3/18}
			{"SOLID", 0},
			{"DASH", 0},
			{"DOT", 0},
			{"DASH_DOT", 0},
			{"DASH_DOT_DOT", 0},
			{0, 0},
		{"pen types", (char*)1},																			// {joj 22/2/18}
			{"IMAGEPEN", 0},
			{"NULLPEN", 0},
			{"SOLIDPEN", 0},
			{0, 0},
		{"text alignment flags", (char*)1},																	// {joj 22/2/18}
			{"JUSTIFY", 0},
			{"HCENTRE", 0},
			{"HLEFT", 0},
			{"HMASK", 0},
			{"HRIGHT", 0},
			{"VBOTTON", 0},
			{"VCENTRE", 0},
			{"VMASK", 0},
			{"VTOP", 0},
			{0, 0},
		{0, 0},
	{"global event handlers", (char*)1},
        {"eventSetTPS(tps)", "when ~> eventSetTPS(num tps) {\n\n}\n"},										// {joj 22/2/18}
        {"eventStartStop(start)", "when ~> eventStopEvent(num start) {\n\n}\n"},							// {joj 22/2/18}
        {"eventFire(str)", "when ~> eventFire(string str) {\n\n}\n"},										// {joj 22/2/18}
        {"eventTick(tick)", "when ~> eventTick(num tick) {\n\n}\n"},										// {joj 22/2/18}
        //{"eventGoto(tick, backwards)", "when eventTick(int tick, int backwards) {\n\n}\n"},
        {0, 0},
    {"global functions", (char*)1},
        //{"barrier(forkID, [forkID, ...])", 0},
        {"checkPoint()", 0},
        //{"clock()", 0},
        {"debug(fs, ...)", 0},
        {"fork(f)", 0},
		{"fromCodePoint(code)", 0},																			// {joj 27/3/18}
        //{"getRT(rtValue)", 0},																			// {joj 29/7/08}
        {"getTick()", 0},
        {"getTPS()", 0},
        {"getUrl(url)", 0},
        {"getWVX()", 0},
        {"getWVY()", 0},
        {"getWVW()", 0},
        {"getWVH()", 0},
        {"getWW()", 0},
        {"getWH()", 0},
		//{"gotoTick(tick)", 0},
		{"lastModifiedMS()", 0 },																			// {joj 22/2/18}
        {"load(filename)", 0},
        {"mkTime(year, month, day, hour = 0, min = 0, sec = 0)", 0},
        //{"rdtsc(ref hdw = 0) {returns integer low dword}", 0},
        {"reset()", 0},
        {"rgba(r, g, b, a = 1)", 0},																		// {joj 22/2/18}
        {"setBgBrush(brush)", 0},																			// {joj 22/2/18}
        {"setBgPen(pen)", 0},																				// {joj 22/2/18}
        //{"setRT(parameter, value)", 0},																	// {joj 29/7/08}
        {"setSSParameters(mode, interval, nsubintervals = 0)", 0},											// {joj 22/2/18}
        {"setTPS(tps)", 0},
        {"setViewport(x, y, w, h, keepAspectRatio = 1)", 0},												// {joj 22/2/18}
        {"sprintf(fs, ...)", 0},																			// {joj 22/2/18}
		{"sizeOf(array)", 0},																				// {joj 22/2/18}
		{"start()", 0},
        {"stop()", 0},
        {"timetoString(time, fs)", 0},																		// {joj 22/2/18}
        {"timeMS()", 0},																					// {joj 22/2/18}
        //{"TRACE(fs, ...)", 0},
        {"wait(ticks)", 0},
        {0, 0},
	{ "mathematical functions", (char*)1 },
		{ "abs(r)", 0 },
		{ "acos(x)", 0 },
		{ "asin(x)", 0 },
		{ "atan(x)", 0 },
		{ "atan2(x, y)", 0 },
		{ "ceil(x)", 0 },
		{ "cos(x)", 0 },
		{ "exp(x)", 0 },
		{ "floor(x)", 0 },
		{ "log(x)", 0 },
		{ "log10(x)", 0 },
		{ "pow(x, y)", 0 },
		{ "random()", 0 },																					// {joj 22/2/18}
		{ "round(x)", 0 },
		{ "sin(x)", 0 },
		{ "sqrt(x)", 0 },
		{ "tan(x)", 0 },
		{ "trunc(x)", 0 },
		{ 0, 0 },
	{"string functions", (char*)1},
		{"endsWith(str [, pos]}", 0},																		// {joj 22/2/18}
        {"find(str)", 0},
		{"left(cnt)", 0},
		{"indexOf(str, fromIndex = 0)", 0 },																// {joj 22/2/18}
		{"lastIndexOf(str, fromIndex = 0)", 0 },															// {joj 22/2/18}
        {"len()", 0},
        {"mid(pos, len)", 0},
        {"regExpSplit(regEXp, flags = 0, limit = 0)", 0},													// {joj 22/2/18}
        {"rfind(str)", 0},
        {"right(cnt)", 0},
		{"slice(start [, end])", 0 },																		// {joj 22/2/18}
        {"split(separator [, limit)", 0},																	// {joj 22/2/18}
		{"startsWith(str [, pos]}", 0 },																	// {joj 22/2/18}
        {"toNum()", 0},																						// {joj 22/2/18}
        {0, 0},
    {0, 0}
};

//
// font sizes
//
int fontSize[] = {8, 9, 0, 10, 0, 12, 14, 16, 20};

//
// window size menu sizes
//
typedef struct {
    int w;
    int h;
} WindowSz;

WindowSz windowSz[] = {
    {800,  600},            // 4:3
    {1024, 768},
    {0, 0},
    {1024, 640},            // 16:10
    {1200, 750},
    {0, 0},
    {576,  324},            // 16:9
    {608,  342},
    {854,  480},
    {1024, 576},
    {1200, 675},
    {0, 0}
};

//
// showFileMenu [slot]
//
// enable / disable buttons as function of state
//
void Vivio::showFileMenu() {
    int b = fileBarWnd->view == TXTEDIT_VIEW;

    newVinFileAction->setEnabled(b);
    openIncludesAction->setEnabled(b);
    closeAction->setEnabled(b & fileBarWnd->getActiveFileIndex());
    saveAction->setEnabled(b & fileBarWnd->activeFileIsModified());
    saveAsAction->setEnabled(b);
    saveAllAction->setEnabled(b & fileBarWnd->isAnyFileModified());

    for (int i = 0; i < MAXRECENTFILES; i++) {
        if (recentFileAction[i]->text().count())
            recentFileAction[i]->setVisible(true);
    }

}

//
// showEditMenu [slot]
//
// NB: enable / disable buttons as function of state
//
void Vivio::showEditMenu() {

    int b = fileBarWnd->view == TXTEDIT_VIEW;

    undoAction->setEnabled(b & fileBarWnd->activeFileCanUndo());
    redoAction->setEnabled(b & fileBarWnd->activeFileCanRedo());
    copyAction->setEnabled(b & fileBarWnd->activeFileHasSelection());
    cutAction->setEnabled(b & fileBarWnd->activeFileHasSelection());
    pasteAction->setEnabled(b && QApplication::clipboard()->text().length());
    addCodeTemplateMenu->setEnabled(b);
    findAction->setEnabled(b);
    findNextAction->setEnabled(b);
    replaceAction->setEnabled(b);
    increaseIndentAction->setEnabled(b);
    decreaseIndentAction->setEnabled(b & fileBarWnd->activeFileHasSelection());
    commentAction->setEnabled(b);
    uncommentAction->setEnabled(b & fileBarWnd->activeFileHasSelection());
}

//
// showViewMenu [slot]
//
// enable / disable buttons as function of application state
//
void Vivio::showViewMenu() {
    QFileInfo jsInfo(jsPath);
    jsAction->setText(vivFn + ".js");
    jsAction->setEnabled(jsInfo.exists());
    QFileInfo htmInfo(htmPath);
    htmAction->setText(vivFn + "100.htm");
    htmAction->setEnabled(htmInfo.exists());
    //layerMenu->setEnabled(fileBarWnd->view == VIVIO_VIEW);
}

//
// mkTmplateMenu
//
void Vivio::mkTmplateMenu(QMenu* m) {
    Tmplate *t = tmplate;
    mkTmplateSubMenu(m, t);
}

//
// makeTmplateSubMenu
//
Tmplate* Vivio::mkTmplateSubMenu(QMenu *m, Tmplate *t) {
    while (t->mStr) {
        if (t->mStr == (char*)1) {
            m->addSeparator();
        } else if (t->tStr == (char*)1) {
            QMenu *subMenu = m->addMenu(t->mStr);
            t = mkTmplateSubMenu(subMenu, ++t);
        } else {
            QAction *action = new QAction(t->mStr, this);
            action->setData(t->tStr ? t->tStr : t->mStr);
            m->addAction(action);
            connect(action, SIGNAL(triggered()), fileBarWnd, SLOT(pasteTmplate()));
        }
        t++;
    }
    return t;
}

//
// setFontSz
//
void Vivio::setFontSz(int newFontSz) {
    if (newFontSz != fontSz) {
        fontSz = newFontSz;
        fileBarWnd->setFontSz(fontSz);
        infoWnd->setFontSz(fontSz);
    }
}

//
// setFontSz
//
// called from menu
//
void Vivio::setFontSz() {
    QAction *action = qobject_cast<QAction *>(sender());
    setFontSz(fontSize[action->data().toInt()]);
}

//
// setShowLineNumbers
//
// called from menu
//
void Vivio::setShowLineNumbers(bool b) {
    showLineNumbers = b;
    fileBarWnd->setShowLineNumbers(b);
}

//
// setWindowSz
//
// works by calculating size of main application window and letting Qt do the layout
//
void Vivio::setWindowSz() {

    QAction *action = qobject_cast<QAction *>(sender());
    int i = action->data().toInt();
    int w = windowSz[i].w;
    int h = windowSz[i].h;

    QSize sz1 = size();
    QSize sz2 = viewStackWnd->size();
    QList<int> splitterSizes = splitter->sizes();

    int dw = w - sz2.width();
    int dh = h - sz2.height();

    splitterSizes.first() += dh;
    splitter->setSizes(splitterSizes);

    resize(sz1.width() + dw, sz1.height() + dh);

}

//
// setAlwaysCompileWhenRun
//
void Vivio::setAlwaysCompileWhenRun(bool b) {
    alwaysCompileWhenRun = b;
}

//
// setClearArgsWhenRun
//
void Vivio::setClearArgsWhenRun(bool b) {
    clearArgsWhenRun = b;
}

//
// setCheckArrayBounds [slot]
//
void Vivio::setCheckArrayBounds(bool b) {
    checkArrayBounds = b;
}

//
// setShowUpdateRects [slot]
//
void Vivio::setShowUpdateRects(bool b) {
    //player->showUpdateMbbs = showUpdateMbbs = b;
}

//
// setHidePlayerToolTips
//
void Vivio::setHidePlayerToolTips(bool b) {
    hidePlayerToolTips = b;
}

//
// showWindowSzMenu
//
void Vivio::showWindowSzMenu() {

    QSize sz = viewStackWnd->size();
    int w = sz.width();
    int h = sz.height();

    int cnt = windowSzAction.count() - 1;
    for (int i = 0; i < cnt; i++) {
        int j = windowSzAction[i]->data().toInt();
        windowSzAction[i]->setChecked((windowSz[j].w == w) && (windowSz[j].h == h));
    }

    QString s;
    s.sprintf("current size %d x %d", w, h);
    windowSzAction[cnt]->setText(s);
}

//
// addToRecent
//
void Vivio::addToRecent(const QString& path) {

    int i = 0;
    int found = 0;

    for (; i < MAXRECENTFILES; i++) {
        if (recentFileAction[i]->text() == path) {
            found = 1;
            break;
        }
    }

    if (found && i == 0)    // quick..
        return;             // exit

    for (i = MIN(i, MAXRECENTFILES-1); i > 0; i--)  // {joj 13/12/11}
        recentFileAction[i]->setText(recentFileAction[i - 1]->text());

    recentFileAction[0]->setText(path);

    //
    // save settings
    //
    QSettings settings;
    QString s;

    settings.remove("recentFiles");
    settings.beginGroup("recentFiles");

    for (i = 0; i < MAXRECENTFILES; i++) {
        if (recentFileAction[i]->text().count() == 0)
            break;
        s.sprintf("recentFileName%d", i);
        settings.setValue(s, recentFileAction[i]->text());
    }

    settings.endGroup();

}

//
// removeFromRecent
//
void Vivio::removeFromRecent(const QString& path) {

    int i = 0;
    int found = 0;

    for (; i < MAXRECENTFILES; i++) {
        if (recentFileAction[i]->text() == path) {
            found = 1;
            break;
        }
    }

    if (found == 0) // quick..
        return;     // exit

    for (; i < MAXRECENTFILES - 1; i++)
        recentFileAction[i]->setText(recentFileAction[i + 1]->text());
    recentFileAction[MAXRECENTFILES - 1]->setText("");


    //
    // save settings
    //
    QSettings settings;
    QString s;

    settings.remove("recentFiles");
    settings.beginGroup("recentFiles");

    for (i = 0; i < MAXRECENTFILES; i++) {
        if (recentFileAction[i]->text().count() == 0)
            break;
        s.sprintf("recentFileName%d", i);
        settings.setValue(s, recentFileAction[i]->text());
    }

    settings.endGroup();

}

//
// compileAndRun [slot]
//
void Vivio::compileAndRun() {
    fileBarWnd->compileAndRun(0);
}

//
// showStatsWnd [slot]
//
void Vivio::showStatsWnd(bool b) {
    //statsWnd->setVisible(b);
}

//
// gotoUrl
//
void Vivio::gotoUrl(const QUrl &url) {
    if (url.isEmpty())
        return;
    QDesktopServices::openUrl(url);
}

//
// vivioAnimations [slot]
//
void Vivio::vivioAnimations() {
    gotoUrl(QUrl(VIVIOANIMATIONS));
}

//
// vivioHelp [slot]
//
void Vivio::vivioHelp() {
   gotoUrl(QUrl(VIVIOHELP));
}

//
// vivioHome [slot]
//
void Vivio::vivioHome() {
    gotoUrl(QUrl(VIVIOHOME));
}

//
// recentFileOpen [slot]
//
void Vivio::recentFileOpen() {
    QString path = qobject_cast<QAction*>(sender())->text();
    if (fileBarWnd->open(path) == 0) {
        QMessageBox::question(NULL, "Vivio", QString("Unable to open %1\n\nRemoving filename from recent file list.").arg(path), QMessageBox::Ok);
        removeFromRecent(path);
    }
}

//
// createMenus
//
void Vivio::createMenus() {

    QAction *action;
    // QActionGroup *actionGroup;   // {joj 13/12/11}
    QMenu *menu;
    QMenu *subMenu;

    //
    // File menu
    //
    menu = menuBar()->addMenu("&File");
    connect(menu, SIGNAL(aboutToShow()), this, SLOT(showFileMenu()));

    subMenu = menu->addMenu("&New");
    action = new QAction("New Vivio project (.viv)", this);
    subMenu->addAction(action);
    connect(action, SIGNAL(triggered()), fileBarWnd, SLOT(newVivFile()));

    newVinFileAction = new QAction("New Vivio include file (.vin)", this);
    subMenu->addAction(newVinFileAction);
    connect(newVinFileAction, SIGNAL(triggered()), fileBarWnd, SLOT(newVinFile()));

    action = new QAction("&Open", this);
    action->setShortcut(QKeySequence::Open);
    menu->addAction(action);
    connect(action, SIGNAL(triggered()), fileBarWnd, SLOT(dialogOpenFile()));

    openIncludesAction = new QAction("Open #include files", this);
    menu->addAction(openIncludesAction);
    connect(openIncludesAction, SIGNAL(triggered()), fileBarWnd, SLOT(activeFileOpenIncludes()));

    closeAction = new QAction("Close", this);
    closeAction->setShortcut(QKeySequence::Close);
    menu->addAction(closeAction);
    connect(closeAction, SIGNAL(triggered()), fileBarWnd, SLOT(activeFileClose()));

    saveAction = new QAction("&Save", this);
    saveAction->setShortcut(QKeySequence::Save);
    menu->addAction(saveAction);
    connect(saveAction, SIGNAL(triggered()), fileBarWnd, SLOT(activeFileSave()));

    saveAsAction = new QAction("Save As", this);
    saveAsAction->setShortcut(QKeySequence::SaveAs);
    menu->addAction(saveAsAction);
    connect(saveAsAction, SIGNAL(triggered()), fileBarWnd, SLOT(saveAs()));

    saveAllAction = new QAction("Save ALL", this);
    menu->addAction(saveAllAction);
    connect(saveAllAction, SIGNAL(triggered()), fileBarWnd, SLOT(saveAll()));

    menu->addSeparator();

    action = new QAction("&Print", this);
    action->setShortcut(QKeySequence::Print);
    menu->addAction(action);
    connect(action, SIGNAL(triggered()), fileBarWnd, SLOT(print()));

    menu->addSeparator();

    for (int i = 0; i < MAXRECENTFILES; i++) {
        recentFileAction[i] = new QAction(this);
        recentFileAction[i]->setVisible(false);
        menu->addAction(recentFileAction[i]);
        connect(recentFileAction[i], SIGNAL(triggered()), this, SLOT(recentFileOpen()));
    }

    menu->addSeparator();

    action = new QAction("E&xit", this);
    action->setShortcut(QKeySequence::Quit);
    menu->addAction(action);
    connect(action, SIGNAL(triggered()), this, SLOT(close()));

    //
    // Edit menu
    //
    menu = menuBar()->addMenu("&Edit");
    connect(menu, SIGNAL(aboutToShow()), this, SLOT(showEditMenu()));

    undoAction = new QAction("Undo", this);
    undoAction->setShortcut(QKeySequence::Undo);
    menu->addAction(undoAction);
    connect(undoAction, SIGNAL(triggered()), fileBarWnd, SLOT(activeFileUndo()));

    redoAction = new QAction("Redo", this);
    redoAction->setShortcut(QKeySequence::Redo);
    menu->addAction(redoAction);
    connect(redoAction, SIGNAL(triggered()), fileBarWnd, SLOT(activeFileRedo()));

    menu->addSeparator();

    copyAction = new QAction("&Copy", this);
    copyAction->setShortcut(QKeySequence::Copy);
    menu->addAction(copyAction);
    connect(copyAction, SIGNAL(triggered()), fileBarWnd, SLOT(activeFileCopy()));

    cutAction = new QAction("&Cut", this);
    cutAction->setShortcut(QKeySequence::Cut);
    menu->addAction(cutAction);
    connect(cutAction, SIGNAL(triggered()), fileBarWnd, SLOT(activeFileCut()));

    pasteAction = new QAction("&Paste", this);
    pasteAction->setShortcut(QKeySequence::Paste);
    menu->addAction(pasteAction);
    connect(pasteAction, SIGNAL(triggered()), fileBarWnd, SLOT(activeFilePaste()));

    menu->addSeparator();

    addCodeTemplateMenu = menu->addMenu("Add code template");
    mkTmplateMenu(addCodeTemplateMenu);

    menu->addSeparator();

    QAction *selectAllAction = new QAction("&Select All", this);
    selectAllAction->setShortcut(QKeySequence::SelectAll);
    menu->addAction(selectAllAction);
    connect(selectAllAction, SIGNAL(triggered()), fileBarWnd, SLOT(selectAll()));

    menu->addSeparator();

    findAction = new QAction("&Find", this);
    findAction->setShortcut(QKeySequence::Find);
    menu->addAction(findAction);
    connect(findAction, SIGNAL(triggered()), findReplaceDlg, SLOT(setFindMode()));

    findNextAction = new QAction("&Find Next", this);
    findNextAction->setShortcut(QKeySequence::FindNext);
    menu->addAction(findNextAction);
    connect(findNextAction, SIGNAL(triggered()), findReplaceDlg, SLOT(findNext()));

    findInFilesAction = new QAction("&Find in Files", this);
    menu->addAction(findInFilesAction);
    connect(findInFilesAction, SIGNAL(triggered()), findReplaceDlg, SLOT(setFindInFilesMode()));

    replaceAction = new QAction("&Replace", this);
    replaceAction->setShortcut(QKeySequence::Replace);
    menu->addAction(replaceAction);
    connect(replaceAction, SIGNAL(triggered()), findReplaceDlg, SLOT(setReplaceMode()));

    menu->addSeparator();

    increaseIndentAction = new QAction("Increase indent", this);
    menu->addAction(increaseIndentAction);
    connect(increaseIndentAction, SIGNAL(triggered()), fileBarWnd, SLOT(indent()));

    decreaseIndentAction = new QAction("Decrease indent", this);
    menu->addAction(decreaseIndentAction);
    connect(decreaseIndentAction, SIGNAL(triggered()), fileBarWnd, SLOT(unindent()));

    commentAction = new QAction("Comment", this);
    menu->addAction(commentAction);
    connect(commentAction, SIGNAL(triggered()), fileBarWnd, SLOT(comment()));

    uncommentAction = new QAction("Uncomment", this);
    menu->addAction(uncommentAction);
    connect(uncommentAction, SIGNAL(triggered()), fileBarWnd, SLOT(uncomment()));

    //
    // View menu
    //
    menu = menuBar()->addMenu("&View");
    connect(menu, SIGNAL(aboutToShow()), this, SLOT(showViewMenu()));

    jsAction = new QAction("xxx.js", this);
    //jsAction->setCheckable(true);
    menu->addAction(jsAction);
    connect(jsAction, SIGNAL(triggered()), fileBarWnd, SLOT(openJSFile()));
    htmAction = new QAction("xxx.htm", this);
    //htmAction->setCheckable(true);
    menu->addAction(htmAction);
    connect(htmAction, SIGNAL(triggered()), fileBarWnd, SLOT(openHTMFile()));

    menu->addSeparator();

    layerMenu = menu->addMenu("Layers");
	//connect(layerMenu, SIGNAL(aboutToShow()), player, SLOT(showLayerMenu()));

    menu->addSeparator();

    action = new QAction("Compile", this);
    menu->addAction(action);
    connect(action, SIGNAL(triggered()), fileBarWnd, SLOT(compile()));

//  action = new QAction("Debug", this);
//  menu->addAction(action);
//  //connect(action, SIGNAL(triggered()), this, SLOT(newFile)));

    action = new QAction("Compile and run", this);
    menu->addAction(action);
    connect(action, SIGNAL(triggered()), this, SLOT(compileAndRun()));

    //
    // Options menu
    //
    menu = menuBar()->addMenu("&Options");

    action = new QAction("&Line numbers", this);
    action->setCheckable(true);
    action->setChecked(showLineNumbers);
    menu->addAction(action);
    connect(action, SIGNAL(triggered(bool)), this, SLOT(setShowLineNumbers(bool)));

    //
    // font size sub-menu
    //
    subMenu = menu->addMenu("Font size");
    fontActionGroup = new QActionGroup(this);
    for (unsigned int i = 0; i < sizeof(fontSize) / sizeof(int); i++) { // {joj 13/12/11}
        if (fontSize[i]) {
            action = new QAction(QString("%1 pt").arg(fontSize[i]), this);
            action->setCheckable(true);
            if (fontSize[i] == fontSz)
                action->setChecked(true);
            action->setData(i);
            fontActionGroup->addAction(action);
            subMenu->addAction(action);
            connect(action, SIGNAL(triggered()), this, SLOT(setFontSz()));
        } else {
            subMenu->addSeparator();
        }
    }

    //
    // window size sub-menu
    //
    subMenu = menu->addMenu("Window size");
    connect(subMenu, SIGNAL(aboutToShow()), this, SLOT(showWindowSzMenu()));
    for (unsigned int i = 0; i < sizeof(windowSz) / sizeof(WindowSz); i++) {    // {joj 13/12/11}
        if (windowSz[i].w) {
            action = new QAction(QString("%1 x %2").arg(windowSz[i].w).arg(windowSz[i].h), this);
            action->setCheckable(true);
            action->setData(i);
            subMenu->addAction(action);
            connect(action, SIGNAL(triggered()), this, SLOT(setWindowSz()));
            windowSzAction.append(action);
        } else {
            subMenu->addSeparator();
        }
    }
    action = new QAction("100 x 100", this);
    subMenu->addAction(action);
    windowSzAction.append(action);

    menu->addSeparator();

    action = new QAction("Always compile when run", this);
    action->setCheckable(true);
    action->setChecked(alwaysCompileWhenRun);
    menu->addAction(action);
    connect(action, SIGNAL(triggered(bool)), this, SLOT(setAlwaysCompileWhenRun(bool)));

    action = new QAction("Clear args when run", this);
    action->setCheckable(true);
    action->setChecked(clearArgsWhenRun);
    menu->addAction(action);
    connect(action, SIGNAL(triggered(bool)), this, SLOT(setClearArgsWhenRun(bool)));

    menu->addSeparator();

    action = new QAction("SSE2", this);
    action->setCheckable(true);
    menu->addAction(action);
    //connect(action, SIGNAL(triggered()), this, SLOT(newFile)));

    action = new QAction("check array bounds", this);
    action->setCheckable(true);
    action->setChecked(checkArrayBounds);
    menu->addAction(action);
    connect(action, SIGNAL(toggled(bool)), this, SLOT(setCheckArrayBounds(bool)));

    action = new QAction("Use RDTSC for statistics", this);
    action->setCheckable(true);
    menu->addAction(action);
    //connect(action, SIGNAL(triggered()), this, SLOT(newFile)));

    action = new QAction("Show update rectanges", this);
    action->setCheckable(true);
    action->setChecked(showUpdateMbbs);
    menu->addAction(action);
    connect(action, SIGNAL(toggled(bool)), this, SLOT(setShowUpdateRects(bool)));

    action = new QAction("Hide player tool tips", this);
    action->setCheckable(true);
    action->setChecked(hidePlayerToolTips);
    menu->addAction(action);
    connect(action, SIGNAL(toggled(bool)), this, SLOT(setHidePlayerToolTips(bool)));

    menu->addSeparator();

    action = new QAction("Vivio path", this);
    menu->addAction(action);
    connect(action, SIGNAL(triggered()), includeDlg, SLOT(create()));

    menu->addSeparator();

    action = new QAction("Shuttle", this);
    action->setCheckable(true);
    menu->addAction(action);
    //connect(action, SIGNAL(triggered()), this, SLOT(newFile)));

    action = new QAction("Statistics", this);
    action->setCheckable(true);
    menu->addAction(action);
    connect(action, SIGNAL(toggled(bool)), this, SLOT(showStatsWnd(bool)));

    //
    // Help menu
    //
    menu = menuBar()->addMenu("&Help");

    action = new QAction("Vivio animation page", this);
    menu->addAction(action);
    connect(action, SIGNAL(triggered()), this, SLOT(vivioAnimations()));

    action = new QAction("Vivio help page", this);
    menu->addAction(action);
    connect(action, SIGNAL(triggered()), this, SLOT(vivioHelp()));

    action = new QAction("Vivio home page", this);
    menu->addAction(action);
    connect(action, SIGNAL(triggered()), this, SLOT(vivioHome()));  // {joj 17/12/11}

    menu->addSeparator();

    action = new QAction("About Vivio", this);
    menu->addAction(action);
    connect(action, SIGNAL(triggered()), aboutDlg, SLOT(create()));

}

//
// parseCommandLine
//
// vivio                                            - open in previous state
// vivio [-args x=1 y=2] fn.viv                     - initialise args
// vivio [-args x=1 y=2] -c fn.viv                  - compile ONLY
// vivio [-args x=1 y=2] -c *.viv                   - compile ONLY with wildcard filename
// vivio [-args x=1 y=2] -c 23 "24 25" 26 fn.viv    - compile and check for compiler errors 23, 24 and 25 (in order)
// vivio [-args x=1 y=2] -r s0 "s1 s2" s3 fn.viv    - compile, execute and check against run time log
//
// NB: return 1 if commandLine OK
//
int Vivio::parseCmdLine(int argc, char **argv) {
	
	//QMessageBox::warning(NULL, "Vivio", cmdPath);

    if (argc <= 1)      // no arguments
        return 1;

    //
    // get vivio args
    //
    int arg = 1;

    if (QString(argv[arg]) == "-args") {

        arg++;
        while (1) {

            if (arg >= argc - 1)
                break;
            if ((QString(argv[arg]) == "-c") || (QString(argv[arg]) == "-t"))
                break;
            if (cmdArgs.length())
                cmdArgs += " ";
            cmdArgs += argv[arg];
            arg++;

        }

    }

    if (arg >= argc)
        return 0;

    QString s(argv[arg]);

    if ((s == "-c") || (s == "-t")) {

        compileOnlyFlag = (s == "-c");
        testFlag = (s == "-t");

        arg++;
        while (1) {
            if (arg >= argc - 1)
                break;
            if (cmdCheckString.length())
                cmdCheckString += " ";
            cmdCheckString += argv[arg];
            arg++;
        }

    }

    if (arg != argc - 1)
        return 0;

    //
    // make file path absolute
    //
    QFileInfo qqInfo(argv[arg]);
    cmdPath = (qqInfo.isAbsolute()) ? argv[arg] : QDir::currentPath() + "/" + argv[arg];
    cmdPath.replace("\\", "/");  // {joj 8/7/17}

    return 1;

}

//
// cmdLineError
//
void Vivio::cmdLineError(int argc, char **argv) {

    QString msg = "vivio";

    //
    // reconstruct command line
    //
    for (int i = 1; i < argc; i++) {
        msg += " ";
        if (QString(argv[i]).contains(" ")) {
            msg += "\"";
            msg += argv[i];
            msg += "\"";
        } else {
            msg += argv[i];
        }
    }

    msg += "\n\n";
    msg += "The following command line arguments expected:\n\n";
    msg += "vivio\n";
    msg += "vivio [-args x=1 y=2] fn.viv\n";
    msg += "vivio [-args x=1 y=2] -c fn.viv\n";
    msg += "vivio [-args x=1 y=2] -c *.viv\n";
    msg += "vivio [-args x=1 y=2] -cd fn.viv\n";
    msg += "vivio [-args x=1 y=2] -c 23 \"24 25\" 26 fn.viv\n";
    msg += "vivio [-args x=1 y=2] -t s0 \"s1 s2\" s3 fn.viv\n\n";

    msg += "-args, -c and -r are followed by zero or more strings (which may be in double quotes)\n";

    QMessageBox::warning(NULL, tr("Vivio command line error"), msg);

}

//
// constructor
//
Vivio::Vivio(int argc, char *argv[]) {

    QApplication::setOrganizationName("Trinity College Dublin");
    QApplication::setApplicationName("VivioJS");

    QString date = QFileInfo(QCoreApplication::applicationFilePath()).lastModified().date().toString("dd-MMM-yyyy");

#ifdef QT_DEBUG
    versionTxt.sprintf("VivioJS %d.%d build %d [DEBUG VERSION %s]", MAJORVERSION, MINORVERSION, BUILD, qPrintable(date));
#else
    versionTxt.sprintf("VivioJS %d.%d build %d [%s] ", MAJORVERSION, MINORVERSION, BUILD, qPrintable(date));
#endif

    compileOnlyFlag = testFlag = 0;

    if (parseCmdLine(argc, argv) == 0)
        cmdLineError(argc, argv);

    QSettings settings;

    fontSz = settings.value("fontSz", APP_DEFAULT_FONT_SZ).toInt();
    showLineNumbers = settings.value("showLineNumbers", APP_DEFAULT_SHOW_LINE_NUMBERS).toInt();

    alwaysCompileWhenRun = settings.value("alwaysCompileWhenRun", APP_DEFAULT_ALWAYS_COMPILE_WHEN_RUN).toInt();
    clearArgsWhenRun = settings.value("clearArgsWhenRun", APP_DEFAULT_CLEAR_ARGS_WHEN_RUN).toInt();

    checkArrayBounds = settings.value("checkArrayBounds", APP_DEFAULT_CHECK_ARRAY_BOUNDS).toInt();
    showUpdateMbbs = settings.value("showUpdateRects", APP_DEFAULT_SHOW_UPDATE_RECTS).toInt();
    hidePlayerToolTips = settings.value("hideToolTips", APP_DEFAULT_HIDE_PLAYER_TOOLTIPS).toInt();

    vivioPath = settings.value("vivioPath", "").toString();
    fileDialogDir = settings.value("fileDialogDir", "").toString();

    //
    // initialise vivioPath to something reasonable if NOT set already
    // determine include directory from .exe
    //
    if (vivioPath.count() == 0) {
        QString exeFn = QCoreApplication::applicationFilePath();
        int pos;
        if ((pos = exeFn.indexOf("/VivioJS/")) != -1) {                 // {joj 15/2/12}
            vivioPath = exeFn.left(pos + 8) + "/include;";				// {joj 15/2/12}
        } else if ((pos = exeFn.indexOf("/src/vivio/")) != -1) {
            vivioPath = exeFn.left(pos) + "/include;";
        } else if ((pos = exeFn.indexOf("/bin/vivio.exe")) != -1) {
            vivioPath = exeFn.left(pos) + "/include;";
        }
        settings.setValue("vivioPath", vivioPath);
    }

    //
    // initialise fileDialogDir to something reasonable if NOT set already
    // determine directory from .exe
    //
    if (fileDialogDir.count() == 0) {
        QString exeFn = QCoreApplication::applicationFilePath();
        int pos;
        if ((pos = exeFn.indexOf("/src/vivioJS/")) != -1) {
            fileDialogDir = exeFn.left(pos) + "/demos/";
        } else if ((pos = exeFn.indexOf("/bin/vivio.exe")) != -1) {
            fileDialogDir = exeFn.left(pos) + "/demos/";
        }
        settings.setValue("fileDialogDir", fileDialogDir);
    }

    setAcceptDrops(true);

}

//
// VivioQWebEnginePage
//
// override javasScriptConsoleMessage which is called from JavaScript console.log
// if a new QWebEngineProfile() is not created, a breakpoint is triggered in DEBUG mode
//
// constructor
//
VivioQWebEnginePage::VivioQWebEnginePage(QObject *parent = Q_NULLPTR) : QWebEnginePage(new QWebEngineProfile(), parent) {	// {joj 1/10/17}
	connect(this, SIGNAL(windowCloseRequested()), vApp, SLOT(closeIDE()));
}

//
// javaScriptConsoleMessage
//
void VivioQWebEnginePage::javaScriptConsoleMessage(JavaScriptConsoleMessageLevel level, const QString& msg, int line, const QString& src) {
	vApp->resultString = msg;
	vApp->infoWnd->append(msg);
	if (msg.endsWith("\n") == 0)
		vApp->infoWnd->append("\n");
}

//
// init
//
// return 1 to start qtApp.exec()
//
int Vivio::init(int argc) {
	
    QWidget *central = new QWidget();

    QVBoxLayout *vBox = new QVBoxLayout();
    vBox->setContentsMargins(0, 0, 0, 0);
    vBox->setSpacing(0);

    splitter = new QSplitter(Qt::Vertical);

	viewStackWnd = new ViewStackWnd();
 	browserPage = new VivioQWebEnginePage();
	browserWnd = new QWebEngineView();
	browserWnd->setPage(browserPage);
	viewStackWnd->addWidget(browserWnd);

    infoWnd = new InfoWnd();
    fileBarWnd = new FileBarWnd(viewStackWnd, infoWnd);

    statusStackWnd = new QStackedWidget();
	statusStackWnd->addWidget(infoWnd);

    splitter->addWidget(viewStackWnd);
    splitter->addWidget(statusStackWnd);

    tabBarWnd = new TabBarWnd(statusStackWnd);

    vBox->addWidget(fileBarWnd);
    vBox->addWidget(splitter);
    vBox->addWidget(tabBarWnd);

    central->setLayout(vBox);
    setCentralWidget(central);

    // create dialogs
    findReplaceDlg = new FindReplaceDlg(this);
    includeDlg = new IncludeDlg(this);
    aboutDlg = new AboutDlg(this);

    // create statistics wnd
    //statsWnd = new StatsWnd(player);

    // create menus
	createMenus();

    // default size when run for the first time
    resize(DEFAULT_WIDTH, DEFAULT_HEIGHT);

    QList<int> splitterSizes = splitter->sizes();
    splitterSizes[0] = DEFAULT_HEIGHT - 100;
    splitterSizes[1] = 100;
    splitter->setSizes(splitterSizes);

    // create compiler
    compiler = new Compiler(infoWnd);

    //
    // restore saved state
    // carry out command line flags
    //
  	commonRestoreState();		// {joj 24/7/17}
	if (argc > 1)				// {joj 24/7/17}
        return doCmd();			// {joj 28/9/17}
   
	fileBarWnd->restoreState();	// {joj 1/10/17}

    return 1;

}

//
// dragEnterEvent
//
void Vivio::dragEnterEvent(QDragEnterEvent *e) {
    if (e->mimeData()->hasUrls()) {
        QList<QUrl> urls = e->mimeData()->urls();
        if (urls.count() == 1) {
            QString url = urls[0].toLocalFile();
            if (url.endsWith(".viv") || url.endsWith(".vin"))
                e->acceptProposedAction();
        }
    }
}

//
// dropEvent
//
void Vivio::dropEvent(QDropEvent *e) {
    QList<QUrl> urls = e->mimeData()->urls();
    QString url = urls[0].toLocalFile();
    fileBarWnd->open(url);
}

//
// closeEvent
//
// NB: called when app closed
//
void Vivio::closeEvent(QCloseEvent *e) {
    saveState();
	//delete statsWnd;                // {joj 4/11/10}
    //QMainWindow::closeEvent(e);
}

//
// saveState
//
void Vivio::saveState() {
    fileBarWnd->saveAll();          // save files
    QSettings settings;             // save general settings
    settings.setValue("fontSz", fontSz);
    settings.setValue("showLineNumbers", showLineNumbers);
    settings.setValue("alwaysCompileWhenRun", alwaysCompileWhenRun);
    settings.setValue("clearArgsWhenRun", clearArgsWhenRun);
    settings.setValue("checkArrayBounds", checkArrayBounds);
    settings.setValue("showUpdateRects", showUpdateMbbs);
    settings.setValue("hideToolTips", hidePlayerToolTips);
    settings.setValue("geometry", saveGeometry());
    settings.setValue("splitterSizes", splitter->saveState());
    //settings.setValue("statsWnd", statsWnd->saveGeometry());  // {joj 4/11/10}
    fileBarWnd->saveState();        // save state of editor files
    findReplaceDlg->saveState();    // save state of dialogs
}

//
// commonRestoreState
//
void Vivio::commonRestoreState() {
    QSettings settings;
    QString s;

    restoreGeometry(settings.value("geometry").toByteArray());
    splitter->restoreState(settings.value("splitterSizes").toByteArray());
    //statsWnd->restoreGeometry(settings.value("statsWnd").toByteArray());  // {joj 4/11/10}

    for (int i = 0; i < MAXRECENTFILES; i++) {
        s.sprintf("recentFiles/recentFileName%d", i);
        recentFileAction[i]->setText(settings.value(s, "").toString());
    }

    //fileBarWnd->restoreState();

}

//
// doCmd
//
// return 1 to start qtApp.exec()
//
int Vivio::doCmd() {

    QString errs;

	vApp->vivDir = cmdPath.left(cmdPath.lastIndexOf('/'));										// {joj 27/9/17}
    vApp->vivFn = cmdPath.left(cmdPath.lastIndexOf('.'));                                       // TODO: improve
    vApp->vivFn = vApp->vivFn.right(vApp->vivFn.length() - vApp->vivFn.lastIndexOf("/") - 1);   // TODO: improve
    vApp->htmPath = cmdPath.left(cmdPath.lastIndexOf('.')) + " 100.htm";                        // TODO: improve
    vApp->jsPath = cmdPath.left(cmdPath.lastIndexOf('.')) + ".js";                              // TODO: improve

    if (compileOnlyFlag) {	// compileOnlyFlag takes precedence

        if (cmdPath.contains("*")) {

			QFileInfo fInfo(cmdPath);																		// does wildcard matching
            QDir dir = fInfo.dir();
            QString fn = fInfo.fileName();
            QFileInfoList fileList = dir.entryInfoList(QStringList(fn), QDir::Files, QDir::Name);
			for (int i = 0; i < fileList.count(); i++) {
                cmdPath = fileList[i].absoluteFilePath();													// {joj 28/9/17}
				vApp->vivDir = cmdPath.left(cmdPath.lastIndexOf('/'));										// {joj 27/9/17}
				vApp->vivFn = cmdPath.left(cmdPath.lastIndexOf('.'));                                       // TODO: improve
				vApp->vivFn = vApp->vivFn.right(vApp->vivFn.length() - vApp->vivFn.lastIndexOf("/") - 1);   // TODO: improve
				vApp->htmPath = cmdPath.left(cmdPath.lastIndexOf('.')) + " 100.htm";                        // TODO: improve
				vApp->jsPath = cmdPath.left(cmdPath.lastIndexOf('.')) + ".js";                              // TODO: improve
				if (compiler->compile(cmdPath, COMPRESS, NULL) == 0) {										// stop if compile error
					fileBarWnd->open(cmdPath);																// open source file
					return 1;
				}
            }
			return 0;

        } else {

            int r = compiler->compile(cmdPath, COMPRESS, &errs);		// returns 1 if no errors
			if (r == 1)													// {joj 14/11/17}
				return 0;												// {joj 14/11/17}
            //if ((r == 1) && cmdCheckString.isEmpty())					// OK if no errors and none expected
            //    return 0;
            //if ((r == 0) && (errs == cmdCheckString))					// OK if errors as expected
			//	return 0;	
			fileBarWnd->open(cmdPath);									// open file which has errors

        }

    } else if (testFlag) {

		fileBarWnd->open(cmdPath);												// {joj 28/9/17}
		int r = compiler->compile(cmdPath, COMPRESS, NULL);						// returns 1 if NO errors

        if (r == 1) {
            if (cmdArgs.isEmpty() == 0) {										// {joj 14/1/12}
                //player->setArgs(vApp->cmdArgs, 0);							// {joj 14/1/12}
                cmdArgs = "";													// {joj 14/1/12}
                clearArgsWhenRun = 0;											// {joj 14/1/12}
            } else if (clearArgsWhenRun) {										// {joj 12/1/12}
                //player->args.clear();											// {joj 12/1/12}
            }
			vApp->browserWnd->load(QUrl(vApp->htmPath + "?vivioTestFlag=1"));	// {joj 28/10/16}
        } else {
			vApp->testFlag = 0;													// so qtApp->show() will be called
		}

    } else {

		fileBarWnd->open(cmdPath);												// {joj 1/10/17}
		infoWnd->vappend("opening %s ... ", qPrintable(cmdPath));				// {joj 1/10/17}

	}

	return 1;
}

//
// closeIDE [slot]	{joj 27/9/17}
//
// the vivioJS animation calls closeIDE (in vivio.js)
// closeIDE executes window.close() if testFlag (set from url?vivioTestFlag=1
// window.close() links to closeIDE in vivio.js (via the QT signal slot mechanism)
// closeIDE closes application 
//
void Vivio::closeIDE() {
	Q_ASSERT(testFlag);
	if (resultString == cmdCheckString) {
		close();
	} else {
		vApp->show();
	}
}

// eof