//
// stdafx.h
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

#include <QtWidgets>
#include <QtWebEngineWidgets/QWebEngineView>
#include <QtWebEngineWidgets/QWebEngineProfile>		// {joj 1/10/17}

#define DEFAULT_WIDTH	800
#define DEFAULT_HEIGHT	600

//
// DEBUG or RELEASE build
//
#ifndef QT_NO_DEBUG
#define QT_DEBUG
#endif

//
// determine if 32 or 64 bit version
//
#if (QT_POINTER_SIZE == 8)
#define X64											// {joj 19/12/11}
#endif

#define MAX(a,b)            (((a) > (b)) ? (a) : (b))
#define MIN(a,b)            (((a) < (b)) ? (a) : (b))

#ifdef QT_DEBUG
#define TRACE(qs) qDebug("%s", qPrintable(qs))		// don't interpret as a format string
#else
#define TRACE(...)
#endif

// eof