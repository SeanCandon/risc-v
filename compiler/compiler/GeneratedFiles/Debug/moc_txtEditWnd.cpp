/****************************************************************************
** Meta object code from reading C++ file 'txtEditWnd.h'
**
** Created by: The Qt Meta Object Compiler version 67 (Qt 5.10.1)
**
** WARNING! All changes made in this file will be lost!
*****************************************************************************/

#include "stdafx.h"
#include "../../txtEditWnd.h"
#include <QtCore/qbytearray.h>
#include <QtCore/qmetatype.h>
#if !defined(Q_MOC_OUTPUT_REVISION)
#error "The header file 'txtEditWnd.h' doesn't include <QObject>."
#elif Q_MOC_OUTPUT_REVISION != 67
#error "This file was generated using the moc from 5.10.1. It"
#error "cannot be used with the include files from this version of Qt."
#error "(The moc has changed too much.)"
#endif

QT_BEGIN_MOC_NAMESPACE
QT_WARNING_PUSH
QT_WARNING_DISABLE_DEPRECATED
struct qt_meta_stringdata_Highlighter_t {
    QByteArrayData data[1];
    char stringdata0[12];
};
#define QT_MOC_LITERAL(idx, ofs, len) \
    Q_STATIC_BYTE_ARRAY_DATA_HEADER_INITIALIZER_WITH_OFFSET(len, \
    qptrdiff(offsetof(qt_meta_stringdata_Highlighter_t, stringdata0) + ofs \
        - idx * sizeof(QByteArrayData)) \
    )
static const qt_meta_stringdata_Highlighter_t qt_meta_stringdata_Highlighter = {
    {
QT_MOC_LITERAL(0, 0, 11) // "Highlighter"

    },
    "Highlighter"
};
#undef QT_MOC_LITERAL

static const uint qt_meta_data_Highlighter[] = {

 // content:
       7,       // revision
       0,       // classname
       0,    0, // classinfo
       0,    0, // methods
       0,    0, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       0,       // signalCount

       0        // eod
};

void Highlighter::qt_static_metacall(QObject *_o, QMetaObject::Call _c, int _id, void **_a)
{
    Q_UNUSED(_o);
    Q_UNUSED(_id);
    Q_UNUSED(_c);
    Q_UNUSED(_a);
}

QT_INIT_METAOBJECT const QMetaObject Highlighter::staticMetaObject = {
    { &QSyntaxHighlighter::staticMetaObject, qt_meta_stringdata_Highlighter.data,
      qt_meta_data_Highlighter,  qt_static_metacall, nullptr, nullptr}
};


const QMetaObject *Highlighter::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->dynamicMetaObject() : &staticMetaObject;
}

void *Highlighter::qt_metacast(const char *_clname)
{
    if (!_clname) return nullptr;
    if (!strcmp(_clname, qt_meta_stringdata_Highlighter.stringdata0))
        return static_cast<void*>(this);
    return QSyntaxHighlighter::qt_metacast(_clname);
}

int Highlighter::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QSyntaxHighlighter::qt_metacall(_c, _id, _a);
    return _id;
}
struct qt_meta_stringdata_TxtEditWnd_t {
    QByteArrayData data[13];
    char stringdata0[154];
};
#define QT_MOC_LITERAL(idx, ofs, len) \
    Q_STATIC_BYTE_ARRAY_DATA_HEADER_INITIALIZER_WITH_OFFSET(len, \
    qptrdiff(offsetof(qt_meta_stringdata_TxtEditWnd_t, stringdata0) + ofs \
        - idx * sizeof(QByteArrayData)) \
    )
static const qt_meta_stringdata_TxtEditWnd_t qt_meta_stringdata_TxtEditWnd = {
    {
QT_MOC_LITERAL(0, 0, 10), // "TxtEditWnd"
QT_MOC_LITERAL(1, 11, 12), // "openIncludes"
QT_MOC_LITERAL(2, 24, 0), // ""
QT_MOC_LITERAL(3, 25, 21), // "replaceSpacesWithTabs"
QT_MOC_LITERAL(4, 47, 7), // "comment"
QT_MOC_LITERAL(5, 55, 9), // "uncomment"
QT_MOC_LITERAL(6, 65, 6), // "indent"
QT_MOC_LITERAL(7, 72, 8), // "unindent"
QT_MOC_LITERAL(8, 81, 19), // "updateLineNumberWnd"
QT_MOC_LITERAL(9, 101, 11), // "setModified"
QT_MOC_LITERAL(10, 113, 10), // "setCanUndo"
QT_MOC_LITERAL(11, 124, 10), // "setCanRedo"
QT_MOC_LITERAL(12, 135, 18) // "contextOpenInclude"

    },
    "TxtEditWnd\0openIncludes\0\0replaceSpacesWithTabs\0"
    "comment\0uncomment\0indent\0unindent\0"
    "updateLineNumberWnd\0setModified\0"
    "setCanUndo\0setCanRedo\0contextOpenInclude"
};
#undef QT_MOC_LITERAL

static const uint qt_meta_data_TxtEditWnd[] = {

 // content:
       7,       // revision
       0,       // classname
       0,    0, // classinfo
      11,   14, // methods
       0,    0, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       0,       // signalCount

 // slots: name, argc, parameters, tag, flags
       1,    0,   69,    2, 0x0a /* Public */,
       3,    0,   70,    2, 0x0a /* Public */,
       4,    0,   71,    2, 0x0a /* Public */,
       5,    0,   72,    2, 0x0a /* Public */,
       6,    0,   73,    2, 0x0a /* Public */,
       7,    0,   74,    2, 0x0a /* Public */,
       8,    2,   75,    2, 0x08 /* Private */,
       9,    0,   80,    2, 0x08 /* Private */,
      10,    1,   81,    2, 0x08 /* Private */,
      11,    1,   84,    2, 0x08 /* Private */,
      12,    0,   87,    2, 0x08 /* Private */,

 // slots: parameters
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void, QMetaType::QRect, QMetaType::Int,    2,    2,
    QMetaType::Void,
    QMetaType::Void, QMetaType::Bool,    2,
    QMetaType::Void, QMetaType::Bool,    2,
    QMetaType::Void,

       0        // eod
};

void TxtEditWnd::qt_static_metacall(QObject *_o, QMetaObject::Call _c, int _id, void **_a)
{
    if (_c == QMetaObject::InvokeMetaMethod) {
        TxtEditWnd *_t = static_cast<TxtEditWnd *>(_o);
        Q_UNUSED(_t)
        switch (_id) {
        case 0: _t->openIncludes(); break;
        case 1: _t->replaceSpacesWithTabs(); break;
        case 2: _t->comment(); break;
        case 3: _t->uncomment(); break;
        case 4: _t->indent(); break;
        case 5: _t->unindent(); break;
        case 6: _t->updateLineNumberWnd((*reinterpret_cast< const QRect(*)>(_a[1])),(*reinterpret_cast< int(*)>(_a[2]))); break;
        case 7: _t->setModified(); break;
        case 8: _t->setCanUndo((*reinterpret_cast< bool(*)>(_a[1]))); break;
        case 9: _t->setCanRedo((*reinterpret_cast< bool(*)>(_a[1]))); break;
        case 10: _t->contextOpenInclude(); break;
        default: ;
        }
    }
}

QT_INIT_METAOBJECT const QMetaObject TxtEditWnd::staticMetaObject = {
    { &QPlainTextEdit::staticMetaObject, qt_meta_stringdata_TxtEditWnd.data,
      qt_meta_data_TxtEditWnd,  qt_static_metacall, nullptr, nullptr}
};


const QMetaObject *TxtEditWnd::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->dynamicMetaObject() : &staticMetaObject;
}

void *TxtEditWnd::qt_metacast(const char *_clname)
{
    if (!_clname) return nullptr;
    if (!strcmp(_clname, qt_meta_stringdata_TxtEditWnd.stringdata0))
        return static_cast<void*>(this);
    return QPlainTextEdit::qt_metacast(_clname);
}

int TxtEditWnd::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QPlainTextEdit::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    if (_c == QMetaObject::InvokeMetaMethod) {
        if (_id < 11)
            qt_static_metacall(this, _c, _id, _a);
        _id -= 11;
    } else if (_c == QMetaObject::RegisterMethodArgumentMetaType) {
        if (_id < 11)
            *reinterpret_cast<int*>(_a[0]) = -1;
        _id -= 11;
    }
    return _id;
}
QT_WARNING_POP
QT_END_MOC_NAMESPACE
