//
// compiler.cpp
//
// Copyright  1996 - 2018 jones@scss.tcd.ie
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

#include "stdafx.h"                         // pre-compiled headers
#include "main.h"                           // vApp
#include "vivio.h"                          //
#include "compiler.h"                       //
#include "infoWnd.h"                        //

#ifdef QT_DEBUG
#define DEBUGSYM(sym)	debugSym(sym)		//
#else
#define DEBUGSYM(sym)						//
#endif

#define TAB			9									// tab
#define	LF			10									// line feed
#define CR			13									// carriage return

#define NEXTCH()	((chPtr < endOfFilePtr) ? *chPtr : 0)

static const char* symToStr[] = {       // {joj 4/7/17} added const to keep g++ happy
	"nullSym",
	"*", "/", "%", ">>", "<<",
	"&", "+", "-", "^", "|",
	"==", "!=", "<", "<=", ">", ">=",
	"~", "!", "++", "--",
	"&&", "||",
	"=", "=>", "+=", "-=", "*=", "/=", "%=", "|=", "&=", "^=", ">>=", "<<=",
	"numConstSym", "stringConstSym", 
	".", ",", ":", "~>", "..", "?",
	"(", ")", "[", "]", "{", "}", "[<", ">]",
	";",
	"identSym", "numSym", "stringSym",
	"if", "else",
	"for", "foreach", "do", "while", "break", "continue", "function", "return",
	"const", "class", "this", "#pragma", "#include", "static", "extends", "in",
	"base", "undefined", "when", "ref",
	"eofSym", "warning sym is out of range"
};

static ASTOp symToASTOp[] = {
	nullAST,
	mulAST, divAST, modAST, shrAST, shlAST,
	andAST, addAST, minusAST, xorAST, orAST,
	eqlAST, neqAST, lessAST, leqAST, grtAST, geqAST,
	invertAST, notAST, addaddAST, minusminusAST,
	candAST, corAST,
	assignAST, assignRefAST, addEqlAST, minusEqlAST, mulEqlAST, divEqlAST, modEqlAST, orEqlAST, andEqlAST, xorEqlAST, shrEqlAST, shlEqlAST,	// {joj 20/10/17}
	numAST, stringAST
};

static const char* astToStr[] = {       // {joj 4/7/17} added const to keep g++ happy
	"",
	"*", "/", "%", ">>", "<<",
	"&", "+", "-", "^", "|",
	"==", "!=", "<", "<=", ">", ">=",
	"~", "!", "++", "--",
	"&&", "||",
	"=", "=>", "+=", "-=", "*=", "/=", "%=", "|=", "&=", "^=", ">>=", "<<=",
	"numAST", "stringAST",
	"callAST", "negAST",
	"constAST", "varAST", "idAST", "ifAST", "dotAST", "indexAST", "classAST", "funcAST", "paramAST", "condExprAST", "blockAST", "returnAST",
	"forAST", "foreachAST", "whileAST", "doAST", "exprlistAST", "baseAST", "thisAST", "progAST", "selectorAST", "breakAST", "continueAST",
	"typListAST", "initAST", "undefinedAST", "whenAST"
};

//
// AST constructor
//
AST::AST(ASTOp astop, int srcFileNo, char *linePtr, int line) {
	op = astop;
	id0 = 0;
	id1 = 0;
	num = 0;
	flags = 0;
	r = NULL;	// {joj 10/11/17}
	this->srcFileNo = srcFileNo;
	this->linePtr = linePtr;
	this->line = line;
}

//
// newAST
//
AST* Compiler::newAST(ASTOp astop) {
	return new AST(astop, srcFileNo, linePtr, line);
}

//
// newAST
//
AST* Compiler::newAST(ASTOp astop, int id0) {
	AST *ast = new AST(astop, srcFileNo, linePtr, line);
	ast->id0 = id0;
	return ast;
}

//
// newAST
//
AST* Compiler::newAST(ASTOp astop, double num) {
	AST *ast = new AST(astop, srcFileNo, linePtr, line);
	ast->num = num;
	return ast;
}

//
// newAST
//
AST* Compiler::newAST(ASTOp astop, int id0, int id1) {
	AST *ast = new AST(astop, srcFileNo, linePtr, line);
	ast->id0 = id0;
	ast->id1 = id1;
	return ast;
}

//
// newAST {joj 22/9/17}
//
AST* Compiler::newAST(ASTOp astop, int id0, AST *p0) {
	AST *ast = new AST(astop, srcFileNo, linePtr, line);
	ast->id0 = id0;
	ast->arg.append(p0);
	return ast;
}

//
// newAST
//
AST* Compiler::newAST(ASTOp astop, AST *p0) {
	AST *ast = new AST(astop, srcFileNo, linePtr, line);
	ast->arg.append(p0);
	return ast;
}

//
// newAST
//
AST* Compiler::newAST(ASTOp astop, AST *p0, AST *p1) {
	AST *ast = new AST(astop, srcFileNo, linePtr, line);
	ast->arg.append(p0);
	ast->arg.append(p1);
	return ast;
}

//
// newAST
//
AST* Compiler::newAST(ASTOp astop, AST *p0, AST *p1, AST *p2) {
	AST *ast = new AST(astop, srcFileNo, linePtr, line);
	ast->arg.append(p0);
	ast->arg.append(p1);
	ast->arg.append(p2);
	return ast;
}

//
// constructor
//
Obj::Obj(int _id, ObjTyp _objTyp) {
	objTyp = _objTyp;
	id = _id;
	left = NULL;
	right = NULL;
	flags = 0;
	typID = 0;
	typPtr = NULL;
	level = 0;
	addr = 0;
	caseLabel = -1;
	parentScope = NULL;
	members = NULL;
	derivedFromID = 0;
	derivedFrom = NULL;
	//nd = 0;
}

//
// addParam
//
void Obj::addParam(Obj *varObj, int flags, double defaultNum) {
	Q_ASSERT(varObj->objTyp == VarObj);
	varObj->flags |= PARAMETER;
	parameter.append(new Param(varObj, flags, defaultNum));
	if (flags & POPTIONAL)
		this->flags |= HASPOPTIONAL;
}

//
// isDerivedFrom
//
int Obj::isDerivedFrom(Obj *derivedFrom) {
	Obj *obj = this;
	while (obj) {
		if (obj == derivedFrom)
			return 1;
		obj = obj->derivedFrom;
	}
	return 0;
}
//
// class Param
//
Param::Param(Obj* _varObj, int _flags, double _defaultVal) {
	varObj = _varObj;				// var obj
	flags = _flags;					// flag
	defaultVal = _defaultVal;		// default num {joj 31/7/08}
}

//
// error
//
// avoid displaying identical errors
// avoid displaying source line multiple times
//
void Compiler::error(int srcFileNo, char *linePtr, int line, QString& errMsg) {

	if ((lastErrFnIndex != srcFileNo) || (lastErrLine != line) || (lastErrMsg != errMsg)) {

		QString ss;

		if ((lastErrFnIndex != srcFileNo) || (lastErrLine != line)) {
			ss += srcFileName[srcFileNo] + " (" + QString::number(line) + ") : ";
			char *chPtr = linePtr;
			while (chPtr < endFileBuf[srcFileNo] && *chPtr != CR && *chPtr != LF)	// {joj 13/8/08}
				ss += *chPtr++;
			ss += "\n";
		}

		ss += "\t" + QString(errMsg) + "\n";

		//if (errList.count())
		//	errList += " ";
		//errList += QString::number(err);

		infoWnd->append(qPrintable(ss));
		lastErrFnIndex = srcFileNo;
		lastErrLine = line;
		lastErrMsg = errMsg;

		errors++;

	}
}

//
// pass1Error
//
void Compiler::pass1Error(QString errMsg) {
	error(srcFileNo, linePtr, line, QString("pass1: %0").arg(errMsg));
}

//
// pass2Error
//
void Compiler::pass2Error(AST *ast, QString errMsg) {
	if (ast) {
		error(ast->srcFileNo, ast->linePtr, ast->line, QString("pass2: %0").arg(errMsg));
	} else {
		error(lastErrFnIndex, NULL, lastErrLine, QString("pass2: %0").arg(errMsg));
	}
}

//
// enter
//
int Compiler::enter(const char *name) {
	int id = stringToId.value(name, -1);
	if (id == -1) {
		id = string.size();
		string.append(name);
		stringToId[name] = id;
	}
	return id;
}

//
// enterKeyWord
//
int Compiler::enterKeyWord(const char *kw, Symbol sym) {
	int id = enter(kw);
	idToSym[id] = sym;
	return id;
}

//
// newObj
//
// id = 0 treated as a special case
//
Obj *Compiler::newObj(int id, ObjTyp objType) {
	//TRACE(QString("newObj(%0)").arg(idToQString(id)));
	int d = 0;
	Obj *obj, *oobj = NULL;
	if (id) {
		obj = topScope->members;
		while (obj) {
			if ((d = diff(id, obj->id)) == 0) {
				pass1Error(QString("duplicate identifier [%0]").arg(string[id]));
				return obj;
			}
			oobj = obj;
			obj = (d < 0) ? obj->left : obj->right;
		}
	}
	obj = new Obj(id, objType);
	if (id) {
		if (topScope->members == NULL) {
			topScope->members = obj;
		} else {
			if (d < 0) {
				oobj->left = obj;
			} else {
				oobj->right = obj;
			}
		}
	}
	return obj;
}

//
// newVar (helper)
//
Obj *Compiler::newVar(Obj *typPtr, int flags) {
	Obj *varObj = newObj(0, VarObj);
	varObj->flags |= flags | VALIDTYPPTR;
	varObj->typPtr = typPtr;
	return varObj;
}

//
// newExpr (helper)
//
Obj *Compiler::newExpr(Obj *typPtr) {
	Obj *exprObj = newObj(0, ExprObj);
	exprObj->flags |= VALIDTYPPTR;
	exprObj->typPtr = typPtr;
	return exprObj;
}

//
// newRef (helper)
//
Obj *Compiler::newRef(Obj *typPtr) {
	Obj *refObj = newObj(0, RefObj);
	refObj->typPtr = typPtr;
	refObj->flags |= BYREF;
	return refObj;
}

//
// newArrayVar - helper
//
//Obj *Compiler::newArrayVar(Obj *type) {
//	Obj *varObj = newObj(0, ArrayObj);
//	return varObj;
//}

//
// pushScope
//
// globalScope is a TypeObj (without a name)
// can push TypeObj, MethodObj and BlockObj scope objects
// need to save addr and set new level and addr
//
Obj* Compiler::pushScope(Obj* obj) {
	Q_ASSERT((obj->objTyp == TypObj) || (obj->objTyp == MethodObj) || (obj->objTyp == BlockObj));
	obj->parentScope = topScope;
	topScope = obj;
	return topScope;
}

//
// popScope
//
// need to save addr and restore level and addr
//
void Compiler::popScope() {
	Q_ASSERT(topScope);
	topScope = topScope->parentScope;
}

//
// enterTyp
//
Obj *Compiler::enterTyp(const char *name, Obj *derivedFrom, int flag) {
	Obj *typ = newObj(enter(name), TypObj);
	typ->derivedFrom = derivedFrom;
	typ->flags = flag;
	return typ;
}

//
// enterExtraConstructor
//
// for extra constructors
//
Obj *Compiler::enterExtraConstructor(const char *name, Obj *typ, int flag = 0) {
	Obj *obj = newObj(enter(name), MethodObj);
	obj->typID = typ->id;
	obj->flags = CONSTRUCTOR | BUILTINMETHOD | flag;
	return obj;
}

//
// enterConst
//
Obj *Compiler::enterConst(const char *name, Obj *typ) {
	Obj *obj = newObj(enter(name), VarObj);
	obj->flags |= EXTCONSTANT;
	obj->typID = typ->id;
	return obj;
}

//
// enterMethod
//
Obj *Compiler::enterMethod(Obj *typ, const char *name, int flag = 0) {
	Obj *obj = newObj(enter(name), MethodObj);
	obj->typPtr = typ;										// {joj 20/9/17}
	obj->flags = BUILTINMETHOD | VALIDTYPPTR | flag;		// {joj 20/9/17}
	return obj;
}

//
// init
//
void Compiler::init() {

	Obj *f;

	sym1 = nullSym;
	line1 = 1;	// {joj 17/8/16}
	errors = 0;
	lastErrFnIndex = lastErrLine = -1;
	lastErrMsg = "";
	ehn = 0;												// {joj 22/9/17}

	topScope = NULL;										// {joj 18/10/16}
	enter("$topScope");										// helps debugging {joj 10/8/17}

	enterKeyWord("do", doSym);								// {joj 31/1/10}
	enterKeyWord("if", ifSym);
	enterKeyWord("in", inSym);								// {joj 15/5/08}
	enterKeyWord("for", forSym);
	numID = enterKeyWord("num", numSym);					// {joj 22/9/17}
	enterKeyWord("base", baseSym);							// {joj 27/7/17}
	enterKeyWord("else", elseSym);
	enterKeyWord("this", thisSym);
	enterKeyWord("break", breakSym);
	enterKeyWord("class", classSym);
	enterKeyWord("const", constSym);
	enterKeyWord("when", whenSym);							// {joj 22/9/17}
	enterKeyWord("while", whileSym);
	enterKeyWord("return", returnSym);
	enterKeyWord("static", staticSym);
	enterKeyWord("string", stringSym);						// {joj 20/8/16}
	enterKeyWord("#pragma", pragmaSym);						// {joj 11/10/07}
	enterKeyWord("extends", extendsSym);
	enterKeyWord("foreach", foreachSym);					// {joj 15/5/08}
	enterKeyWord("#include", includeSym);
	enterKeyWord("continue", continueSym);
	enterKeyWord("function", funcSym);
	enterKeyWord("undefined", undefinedSym);				// {joj 1/8/17}

	// root TypeObj
	globalScope = topScope = newObj(0, TypObj);				// create global scope
	globalScope->level = GLOBAL;							// slight of hand setting TypeObj whenAST: GLOBAL
	globalScope->addr = 1;									// g[0] for top GroupObj

	// void typ
	voidTyp = enterTyp("$void", NULL, BUILTINOBJ);								// {joj 17/11/17}
	voidVar = newVar(voidTyp);													// used by fork
	voidArrayVar = newVar(voidTyp, ARRAY);										// used by sizeOf

	// num type
	numTyp = enterTyp("num", NULL, BUILTINOBJ);
	numVar = newVar(numTyp);
	numExpr = newExpr(numTyp);
	zeroExpr = newExpr(numTyp);													// {joj 21/9/17}
	undefinedExpr = newExpr(numTyp);											// {joj 21/9/17}

	// undefined
	undefinedConst = enterConst("$undefined", numTyp);							// {joj 1/8/17}

	// string type
	stringTyp = enterTyp("string", NULL, BUILTINOBJ);
	stringVar = newVar(stringTyp);
	stringArrayVar = newVar(stringTyp, ARRAY);									// {joj 3/10/17}
	stringExpr = newExpr(stringTyp);

	// num functions
	pushScope(numTyp);
	f = enterMethod(stringTyp, "toString", INOBJECT);							// toString()
	popScope();

	// string functions
	pushScope(stringTyp);
	f = enterMethod(numTyp, "endsWith", INOBJECT);								// endsWith(str, pos)
	f->addParam(stringVar);														//  str
	f->addParam(numVar, POPTIONAL);												//  pos = 0
	f = enterMethod(numTyp, "find", INOBJECT);									// find(str)
	f->addParam(stringVar);														//	str
	f = enterMethod(stringTyp, "left", INOBJECT);								// left(cnt)
	f->addParam(numVar);														//	cnt
	f = enterMethod(numTyp, "indexOf", INOBJECT);								// indexOf(str, fromIndex)
	f->addParam(stringVar);														//	str
	f->addParam(numVar, POPTIONAL);												//	fromIndex = 0
	f = enterMethod(numTyp, "lastIndexOf", INOBJECT);							// lastIndexOf(str fromIndex])
	f->addParam(stringVar);														//	str
	f->addParam(numVar, POPTIONAL);												//	fromIndex = 0
	f = enterMethod(numTyp, "len", INOBJECT);									// len()
	f = enterMethod(stringTyp, "concat", INOBJECT);								// concat(s)
	f->addParam(stringVar);
	f = enterMethod(stringTyp, "mid", INOBJECT);								// mid(pos, cnt)
	f->addParam(numVar);
	f->addParam(numVar);
	f = enterMethod(stringArrayVar, "regExpSplit", INOBJECT);					// regExpSplit(regExpr, flags, limit)	{joj 3/10/17}
	f->addParam(stringVar);														//	regExpr
	f->addParam(stringVar, POPTIONAL);											//	flags = 0
	f->addParam(numVar, POPTIONAL);												//	limit = 0
	f = enterMethod(numTyp, "rfind", INOBJECT);									// rfind(str)
	f->addParam(stringVar);														//	str
	f = enterMethod(stringTyp, "right", INOBJECT);								// right(cnt)
	f->addParam(numVar);														//	cnt
	f = enterMethod(stringTyp, "slice", INOBJECT);								// slice(start [, end])
	f->addParam(numVar);														//	start
	f->addParam(numVar, POPTIONAL);												//	end
	f = enterMethod(stringArrayVar, "split", INOBJECT);							// split(separator, limit)
	f->addParam(stringVar);														//	separator
	f->addParam(numVar, POPTIONAL);												//	limit
	f = enterMethod(numTyp, "startsWith", INOBJECT);							// startsWith(str [, position])
	f->addParam(stringVar);														//
	f->addParam(numVar, POPTIONAL);												//
	f = enterMethod(numTyp, "toNum", INOBJECT);									// toNum()
	popScope();

	// pre-defined Path class
	pathTyp = enterTyp("Path", NULL, BUILTINOBJ);								// Path
	pathVar = newVar(pathTyp);													//

	//
	// Pen type
	//
	// can extend functionality as needs must
	//
	penTyp = enterTyp("Pen", NULL, BUILTINOBJ);									// Pen type (NB: NOT a constructor)
	penVar = newVar(penTyp);
	pushScope(penTyp);

	f = enterMethod(numTyp, "getType", INOBJECT);								// getType()
	f = enterMethod(numTyp, "getOptions", INOBJECT);							// getOptions()
	f = enterMethod(numTyp, "getStyle", INOBJECT);								// getStyle()
	f = enterMethod(numTyp, "getWidth", INOBJECT);								// getWidth()
	f = enterMethod(numTyp, "getRGBA", INOBJECT);								// getRGBA()
	f = enterMethod(stringTyp, "getURL", INOBJECT);								// getURL()
	f = enterMethod(numTyp, "getCaps", INOBJECT);								// getCaps()
	f = enterMethod(numTyp, "getEndCapScale", INOBJECT);						// getEndCapScale()
	f = enterMethod(numTyp, "getStartCapScale", INOBJECT);						// getStartCapScale()

	// setNull
	f = enterMethod(penTyp, "setNull", INOBJECT);								// setNull()

	// setSolid
	f = enterMethod(penTyp, "setSolid", INOBJECT);								// setSolid(style, width, rgba, caps, startCapScale, endCapScale)
	f->addParam(numVar, POPTIONAL);												//	style = 0
	f->addParam(numVar, POPTIONAL);												//	width = 1
	f->addParam(numVar, POPTIONAL);												//	rgba = 0
	f->addParam(numVar, POPTIONAL);												//	caps = 0
	f->addParam(numVar, POPTIONAL);												//	startCapScale = 2
	f->addParam(numVar, POPTIONAL);												//	endCapScale = 2

	// setImage
	f = enterMethod(penTyp, "setImage", INOBJECT);								// setImage(options, style, width, url, caps, startCapScale, endCapScale)
	f->addParam(numVar);														//	options
	f->addParam(numVar);														//	style
	f->addParam(numVar);														//	width
	f->addParam(stringVar);														//	url
	f->addParam(numVar, POPTIONAL);												//	caps = 0
	f->addParam(numVar, POPTIONAL);												//	startCapScale = 2
	f->addParam(numVar, POPTIONAL);												//	endCapScale = 2

	// setRGBA
	f = enterMethod(penTyp, "setRGBA", INOBJECT);								// setRGBA(rgba, nsteps, interval, wait)
	f->addParam(numVar);														//	rgba
	f->addParam(numVar, POPTIONAL);												//	nsteps = 0
	f->addParam(numVar, POPTIONAL);												//	interval = 1
	f->addParam(numVar, POPTIONAL | CANWAIT);									//	wait = 0

	// setWidth
	f = enterMethod(penTyp, "setWidth", INOBJECT);								// setWidth(width, nsteps, interval, wait)
	f->addParam(numVar);														// rgba
	f->addParam(numVar, POPTIONAL);												// nsteps = 0
	f->addParam(numVar, POPTIONAL);												// interval = 1
	f->addParam(numVar, POPTIONAL | CANWAIT);									// wait = 0
	popScope();
	
	// NullPen constructor
	f = enterExtraConstructor("NullPen", penTyp, IMPORT);						// NullPen()

	// SolidPen constructor
	f = enterExtraConstructor("SolidPen", penTyp, IMPORT);						// SolidPen(style, width, rgba, caps, startCapScale, endCapScale)
	f->addParam(numVar, POPTIONAL);												//	style = 0
	f->addParam(numVar, POPTIONAL);												//	width = 1
	f->addParam(numVar, POPTIONAL);												//	rgba = 0
	f->addParam(numVar, POPTIONAL);												//	caps = 0
	f->addParam(numVar, POPTIONAL);												//	startCapScale = 2
	f->addParam(numVar, POPTIONAL);												//	endCapScale = 2

	// ImagePen constructor
	f = enterExtraConstructor("ImagePen", penTyp, IMPORT);						// ImagePen(options, style, width, url, caps, startCapScale, endCapScale)
	f->addParam(numVar);														//	options
	f->addParam(numVar);														//	style
	f->addParam(numVar);														//	width
	f->addParam(stringVar);														//	url
	f->addParam(numVar, POPTIONAL);												//	caps = 0
	f->addParam(numVar, POPTIONAL);												//	startCapScale = 2
	f->addParam(numVar, POPTIONAL);												//	endCapScale = 2
																				
	//
	// Brush type
	//
	// can extend functionality as needs must
	//
	brushTyp = enterTyp("Brush", NULL, BUILTINOBJ);								// Brush type (NB: NOT a constructor)
	brushVar = newVar(brushTyp);
	pushScope(brushTyp);

	f = enterMethod(numTyp, "getType", INOBJECT);								// getType()
	f = enterMethod(numTyp, "getRGBA", INOBJECT);								// getRGBA()
	f = enterMethod(numTyp, "getOptions", INOBJECT);							// getOptions()
	f = enterMethod(stringTyp, "getURL", INOBJECT);								// getURL()
	f = enterMethod(numTyp, "getX0", INOBJECT);									// getX0()
	f = enterMethod(numTyp, "getY0", INOBJECT);									// getY0()
	f = enterMethod(numTyp, "getR0", INOBJECT);									// getR0()
	f = enterMethod(numTyp, "getX1", INOBJECT);									// getX1()
	f = enterMethod(numTyp, "getY1", INOBJECT);									// getY1()
	f = enterMethod(numTyp, "getR1", INOBJECT);									// getR1()
	f = enterMethod(numTyp, "getRGBA0", INOBJECT);								// getRGBA0()
	f = enterMethod(numTyp, "getRGBA1", INOBJECT);								// getRGBA1()

	// setNull
	f = enterMethod(brushTyp, "setNull", INOBJECT);								// setNull()

	// setSolid
	f = enterMethod(brushTyp, "setSolid", INOBJECT);							// setSolid(rgba)
	f->addParam(numVar);														//	rgba

	// setImage
	f = enterMethod(brushTyp, "setImage", INOBJECT);							// setImage(options, url)
	f->addParam(numVar);														//	options
	f->addParam(stringVar);														//	url

	// setGradient
	f = enterMethod(brushTyp, "setGradient", INOBJECT);							// setGradient(options, x0, y0, x1, y1, rgba0, rgba1)
	f->addParam(numVar);														//	options
	f->addParam(numVar);														//	x0
	f->addParam(numVar);														//	x1
	f->addParam(numVar);														//	y0
	f->addParam(numVar);														//	y1
	f->addParam(numVar);														//	rgba0
	f->addParam(numVar);														//	rgba1

	// setRadial
	f = enterMethod(brushTyp, "setRadial", INOBJECT);							// setRadial(options, x0, y0, x1, y1, rgba0, rgba1)
	f->addParam(numVar);														//  options
	f->addParam(numVar);														//	x0
	f->addParam(numVar);														//	x1
	f->addParam(numVar);														//	r0
	f->addParam(numVar);														//	y0
	f->addParam(numVar);														//	y1
	f->addParam(numVar);														//	r1
	f->addParam(numVar);														//	rgba0
	f->addParam(numVar);														//	rgba1

	// setRGBA
	f = enterMethod(numTyp, "setRGBA", INOBJECT);								// setRGBA(rgba, nsteps, interval, wait)
	f->addParam(numVar);														//	rgba
	f->addParam(numVar, POPTIONAL);												//	nsteps = 0
	f->addParam(numVar, POPTIONAL);												//	interval = 1
	f->addParam(numVar, POPTIONAL | CANWAIT);									//	wait = 0
																				
	// setRGBA2
	f = enterMethod(numTyp, "setRGBA2", INOBJECT);								// setRGBA2(rgba0, rgba1, nsteps, interval, wait)
	f->addParam(numVar);														//	rgba0
	f->addParam(numVar);														//	rgba1
	f->addParam(numVar, POPTIONAL);												//	nsteps = 0
	f->addParam(numVar, POPTIONAL);												//	interval = 1
	f->addParam(numVar, POPTIONAL | CANWAIT);									//	wait = 0
	popScope();

	// NullBrush constructor
	f = enterExtraConstructor("NullBrush", brushTyp, IMPORT);					// NullBrush()

	// SolidBrush constructor													// SolidBrush
	f = enterExtraConstructor("SolidBrush", brushTyp, IMPORT);					// SolidBrush(rgba)
	f->addParam(numVar);														//	rgba

	// ImageBrush constructor
	f = enterExtraConstructor("ImageBrush", brushTyp, IMPORT);					// ImageBrush(options, url)
	f->addParam(numVar);														//	options
	f->addParam(stringVar);														//	url

	// GradientBrush constructor
	f = enterExtraConstructor("GradientBrush", brushTyp, IMPORT);				// GradientBrush(options, x0, y0, x1, y1,rgba0, rgba1)
	f->addParam(numVar);														//  options
	f->addParam(numVar);														//	x0
	f->addParam(numVar);														//	x1
	f->addParam(numVar);														//	y0
	f->addParam(numVar);														//	y1
	f->addParam(numVar);														//	rgba0
	f->addParam(numVar);														//	rgba1

	// RadialBrush constructor
	f = enterExtraConstructor("RadialBrush", brushTyp, IMPORT);					// RadialBrush(options, x0, y0, r0, x1, y1, r1, rgba0, rgba1)
	f->addParam(numVar);														//  options
	f->addParam(numVar);														//	x0
	f->addParam(numVar);														//	x1
	f->addParam(numVar);														//	r0
	f->addParam(numVar);														//	y0
	f->addParam(numVar);														//	y1
	f->addParam(numVar);														//	r1
	f->addParam(numVar);														//	rgba0
	f->addParam(numVar);														//	rgba1

	//
	// Font type
	//
	fontTyp = enterTyp("Font", NULL, BUILTINOBJ |CONSTRUCTOR | IMPORT);			// Font(face, sz, flags)
	fontTyp->addParam(stringVar);												//	face
	fontTyp->addParam(numVar);													//	sz
	fontTyp->addParam(numVar, POPTIONAL);										//	flags = 0
	fontVar = newVar(fontTyp);
	pushScope(fontTyp);

	f = enterMethod(stringTyp, "getFace", INOBJECT);							// getFace()
	f = enterMethod(numTyp, "getSz", INOBJECT);									// getSz()
	f = enterMethod(numTyp, "getFlags", INOBJECT);								// getFlags()

	f = enterMethod(fontTyp, "setFont", INOBJECT);								// setFont(face, sz, flags)
	f->addParam(stringVar);														//	face
	f->addParam(numVar);														//	sz
	f->addParam(numVar, POPTIONAL);												//	flags = 0

	f = enterMethod(numTyp, "setSz", INOBJECT);									// setSz(sz, nsteps, interval, wait)
	f->addParam(numVar);														//	sz
	f->addParam(numVar, POPTIONAL);												//	nsteps = 0
	f->addParam(numVar, POPTIONAL);												//	interval = 1
	f->addParam(numVar, POPTIONAL | CANWAIT);									//	wait = 0

	popScope();

	//
	// Layer type
	//
	layerTyp = enterTyp("Layer", NULL, BUILTINOBJ |  CONSTRUCTOR | IMPORT);		// Layer(z, options)
	layerTyp->addParam(numVar, POPTIONAL);										//	z = 0
	layerTyp->addParam(numVar, POPTIONAL);										//	options = 0
	layerVar = newVar(layerTyp);
	pushScope(layerTyp);

	f = enterMethod(numTyp, "setOpacity", INOBJECT);							// setOpacity(opacity, nsteps, interval, wait)
	f->addParam(numVar);														//	opacity
	f->addParam(numVar, POPTIONAL);												//	nsteps = 0
	f->addParam(numVar, POPTIONAL);												//	interval = 1
	f->addParam(numVar, POPTIONAL | CANWAIT);									//	wait = 0
	popScope();

	//
	// global constants
	//	
	enterConst("ABSOLUTE", numTyp);
	enterConst("CLOSED", numTyp);												// {joj 7/7/17}
	enterConst("HITINVISIBLE", numTyp);											// {joj 13/7/17}
	enterConst("HITWINDOW", numTyp);											// {joj 15/7/17}
	enterConst("NOATTACH", numTyp);												// {joj 3/11/17}
	enterConst("RELATIVE", numTyp);
	enterConst("RT", numTyp);													// {joj 6/7/17}
	enterConst("VERSION", stringTyp);											// {joj 13/7/17}

	enterConst("BLACK", numTyp);
	enterConst("BLUE", numTyp);
	enterConst("CYAN", numTyp);
	enterConst("GREEN", numTyp);
	enterConst("MAGENTA", numTyp);
	enterConst("GRAY32", numTyp);
	enterConst("GRAY64", numTyp);
	enterConst("GRAY96", numTyp);
	enterConst("GRAY128", numTyp);
	enterConst("GRAY160", numTyp);
	enterConst("GRAY192", numTyp);
	enterConst("GRAY224", numTyp);
	enterConst("RED", numTyp);
	enterConst("WHITE", numTyp);
	enterConst("YELLOW", numTyp);

	enterConst("HLEFT", numTyp);
	enterConst("HCENTRE", numTyp);
	enterConst("HRIGHT", numTyp);
	enterConst("HMASK", numTyp);
	enterConst("VTOP", numTyp);
	enterConst("VCENTRE", numTyp);
	enterConst("VBOTTOM", numTyp);
	enterConst("VMASK", numTyp);
	enterConst("JUSTIFY", numTyp);
	
	enterConst("MM", numTyp);			// {joj 11/7/17}
	enterConst("MB", numTyp);			// {joj 11/7/17}
	enterConst("KEY", numTyp);			// {joj 11/7/17}

	enterConst("MB_LEFT", numTyp);
	enterConst("MB_RIGHT", numTyp);
	enterConst("MB_MIDDLE", numTyp);
	enterConst("MB_SHIFT", numTyp);
	enterConst("MB_CTRL", numTyp);
	enterConst("MB_ALT", numTyp);

	enterConst("PROPAGATE", numTyp);
	enterConst("REMEMBER", numTyp);

	enterConst("BOLD", numTyp);
	enterConst("ITALIC", numTyp);
	enterConst("UNDERLINE", numTyp);
	enterConst("STRIKETHROUGH", numTyp);
	enterConst("SMALLCAPS", numTyp);

	enterConst("NULLPEN", numTyp);					// pen types
	enterConst("SOLIDPEN", numTyp);
	enterConst("IMAGEPEN", numTyp);

	enterConst("SOLID", numTyp);					// pen styles
	enterConst("DASH", numTyp);
	enterConst("DOT", numTyp);
	enterConst("DASH_DOT", numTyp);
	enterConst("DASH_DOT_DOT", numTyp);
	enterConst("MAX_STYLE", numTyp);
	
	enterConst("BUTT_START", numTyp);				// pen caps
	enterConst("BUTT_END", numTyp);
	enterConst("ROUND_START", numTyp);
	enterConst("ROUND_END", numTyp);
	enterConst("SQUARE_START", numTyp);
	enterConst("SQUARE_END", numTyp);
	enterConst("ARROW40_START", numTyp);
	enterConst("ARROW60_START", numTyp);
	enterConst("ARROW90_START", numTyp);
	enterConst("ARROW40_END", numTyp);
	enterConst("ARROW60_END", numTyp);
	enterConst("ARROW90_END", numTyp);
	enterConst("CIRCLE_START", numTyp);
	enterConst("CIRCLE_END", numTyp);
	enterConst("MAX_CAP", numTyp);

	enterConst("BEVEL_JOIN", numTyp);				// pen joins
	enterConst("ROUND_JOIN", numTyp);
	enterConst("MITRE_JOIN", numTyp);
	enterConst("MAX_JOIN", numTyp);	

	enterConst("NULLBRUSH", numTyp);				// brush types
	enterConst("SOLIDBRUSH", numTyp);
	enterConst("IMAGEBRUSH", numTyp);
	enterConst("GRADIENTBRUSH", numTyp);
	enterConst("RADIALBRUSH", numTyp);

	//
	// global functions
	//
	//f = enterMethod(numTyp, "barrier", OPTARG_NUM);							// barrier(			{joj 30/1/07}
	//f->addParam(numVar);														//	forkID [, forkID, ...])

	enterMethod(numTyp, "checkPoint", IMPORT);									// checkPoint()

	f = enterMethod(numTyp, "debug", OPTARG_ANY | IMPORT);						// debug(fs, ...)
	f->addParam(stringVar);														//	fs

	f = enterMethod(numTyp, "fork", IMPORT | FORKF);							// fork(f)
	f->addParam(voidVar);														//	f
	
	f = enterMethod(stringTyp, "fromCodePoint", IMPORT);						// timeToString(code)	{joj 27/3/18}
	f->addParam(numVar);														//	code

	f = enterMethod(stringTyp, "sprintf", OPTARG_ANY | IMPORT);					// s = sprintf(
	f->addParam(stringVar);														//	fs, ...)

	//f = enterMethod(numTyp, "getRT");											// getRT(rtValue)
	//f->addParam(numVar);														//	rtValue

	enterMethod(numTyp, "lastModifiedMS", IMPORT);								// lastModifiedMS()

	enterMethod(numTyp, "getTick", IMPORT);										// getTick()

	enterMethod(numTyp, "getTPS", IMPORT);										// getTPS()

	f = enterMethod(numTyp, "getURL", IMPORT);									// getURL(url)
	f->addParam(stringVar);														//	url

	enterMethod(numTyp, "getWVX", IMPORT);										// getWVX()

	enterMethod(numTyp, "getWVY", IMPORT);										// getWVY()

	enterMethod(numTyp, "getWVW", IMPORT);										// getWVW()

	enterMethod(numTyp, "getWVH", IMPORT);										// getWVH()

	enterMethod(numTyp, "getWW", IMPORT);										// getWW()

	enterMethod(numTyp, "getWH", IMPORT);										// getWH()

	//f = enterMethod(numTyp, "gotoTick");										// gotoTick(tick)
	//f->addParam(numVar);														//	tick

	f = enterMethod(numTyp, "load");											// load(filename)
	f->addParam(stringVar);														//	filename

	f = enterMethod(numTyp, "mkTime", IMPORT);									// mkTime(year, month, day, hour, min, sec)
	f->addParam(numVar);														//	year
	f->addParam(numVar);														//	month
	f->addParam(numVar);														//	day
	f->addParam(numVar, POPTIONAL);												//	hour = 0
	f->addParam(numVar, POPTIONAL);												//	min = 0
	f->addParam(numVar, POPTIONAL);												//	sec = 0

	//enterMethod(numTyp, "nopropagate");										// nopropagate() {joj 12/9/16}

	//enterMethod(numTyp, "remember");											// remember() {joj 12/9/16}
	
	enterMethod(numTyp, "reset", IMPORT);										// reset()
	
	f = enterMethod(numTyp, "rgba", IMPORT);									// rgba(red, green, blue, alpha)
	f->addParam(numVar);														//	red
	f->addParam(numVar);														//	green
	f->addParam(numVar);														//	blue
	f->addParam(numVar, POPTIONAL);												//	alpha = 1

	f = enterMethod(brushTyp, "setBgBrush", IMPORT);							// setBgBrush(brush)
	f->addParam(brushVar);														//	brush
	
	f = enterMethod(brushTyp, "setBgPen", IMPORT);								// setBgPen(pen)
	f->addParam(penVar);														//	pen
		
	f = enterMethod(numTyp, "setSSParameters");									// setSSParameters(mode, interval, nsubintervals)
	f->addParam(numVar);														//	mode,
	f->addParam(numVar);														//	interval,
	f->addParam(numVar, POPTIONAL);												//	nsubintervals = 0
	
	f = enterMethod(numTyp, "setTPS", IMPORT);									// setTPS(tps)
	f->addParam(numVar);														//	tps

	f = enterMethod(NULL, "setViewport", IMPORT);								// setViewport(x, y, w, h, keepAspectRatio)
	f->addParam(numVar);														//	x
	f->addParam(numVar);														//	y
	f->addParam(numVar);														//	w
	f->addParam(numVar);														//	h
	f->addParam(numVar, POPTIONAL);												//	keepAspectRatio = 1
	
	f = enterMethod(numTyp, "sizeOf", IMPORT);									// sizeOf(array)	{joj 3/10/17}
	f->addParam(voidArrayVar);													//	array			{joj 3/10/17}

	f = enterMethod(numTyp, "start", IMPORT);									// start()

	f = enterMethod(numTyp, "stop", IMPORT);									// stop()

	f = enterMethod(stringTyp, "timeToString", IMPORT);							// timeToString(time, fs)
	f->addParam(numVar);														//	time
	f->addParam(stringVar, POPTIONAL);											//	fs

	f = enterMethod(numTyp, "timeMS", IMPORT);									// timeMS()
	
	f = enterMethod(numTyp, "wait", WAITF);										// wait(ticks)
	f->addParam(numVar);														//	ticks

	f = enterMethod(numTyp, "sendToMem", IMPORT);
	f->addParam(stringVar);
	f->addParam(stringVar);
	f->addParam(stringVar);
	f->addParam(stringVar);
	f->addParam(stringVar);
	f->addParam(stringVar);
	f->addParam(stringVar);

	f = enterMethod(numTyp, "sendToHart", IMPORT);
	f->addParam(numVar);
	f->addParam(stringVar);
	f->addParam(stringVar);
	f->addParam(stringVar);

	f = enterMethod(stringTyp, "getMessage", IMPORT);

	f = enterMethod(stringTyp, "getTitle", IMPORT);

	f = enterMethod(numTyp, "newHart", IMPORT);

	f = enterMethod(numTyp, "startParallel", IMPORT);
	f = enterMethod(numTyp, "endParallel", IMPORT);

	f = enterMethod(numTyp, "isHart2", IMPORT);

	f = enterMethod(numTyp, "stringToNum", IMPORT);
	f->addParam(stringVar);

	//
	// argument functions
	//
	// daysToLive  <0		page lifeTime ONLY
	//			  	0		browser instance lifeTime (saved in a cookie)
	//			  	n 		saved between browser instances for n days (also saved in a cookie)
	//
	f = enterMethod(stringTyp, "getArg", IMPORT);								// getArg(argName, defaultStr)
	f->addParam(stringVar);														//	argName
	f->addParam(stringVar);														//	defaultStr

	f = enterMethod(numTyp, "getArgAsNum", IMPORT);								// getArgAsNum(argName, defaultNum)
	f->addParam(stringVar);														//	argName
	f->addParam(numVar);														//	defaultNum

	f = enterMethod(NULL, "setArg", IMPORT);									// setArg(argName, str, daysToLive)
	f->addParam(stringVar);														//	argName
	f->addParam(stringVar);														//	str
	f->addParam(numVar, POPTIONAL);												//	daysToLive = -1

	f = enterMethod(NULL, "setArgFromNum", IMPORT);								// setArgFromNum(argName, num, daysToLive)
	f->addParam(stringVar);														//	argName
	f->addParam(numVar);														//	num
	f->addParam(numVar, POPTIONAL);												//	daysToLive = -1

	//
	// mathematical functions
	//
	f = enterMethod(numTyp, "abs", IMPORT);										// abs(x)
	f->addParam(numVar);
	f = enterMethod(numTyp, "acos", IMPORT);									// acos(x) - return degrees
	f->addParam(numVar);
	f = enterMethod(numTyp, "asin", IMPORT);									// asin(x) - return degrees
	f->addParam(numVar);
	f = enterMethod(numTyp, "atan", IMPORT);									// atan(x) - return degrees
	f->addParam(numVar);
	f = enterMethod(numTyp, "atan2", IMPORT);									// atan2(y, x) - return degrees
	f->addParam(numVar);
	f->addParam(numVar);
	f = enterMethod(numTyp, "ceil", IMPORT);									// ceil(r)
	f->addParam(numVar);
	f = enterMethod(numTyp, "cos", IMPORT);										// cos(
	f->addParam(numVar);
	f = enterMethod(numTyp, "exp", IMPORT);										// exp(r)
	f->addParam(numVar);
	f = enterMethod(numTyp, "floor", IMPORT);									// floor(r)
	f->addParam(numVar);
	f = enterMethod(numTyp, "log", IMPORT);										// log(r)
	f->addParam(numVar);
	f = enterMethod(numTyp, "log10", IMPORT);									// log(x)
	f->addParam(numVar);
	f = enterMethod(numTyp, "pow", IMPORT);										// pow(x, y)
	f->addParam(numVar);
	f->addParam(numVar);
	f = enterMethod(numTyp, "random", IMPORT);									// random()
	f = enterMethod(numTyp, "round", IMPORT);									// round(x)
	f->addParam(numVar);
	f = enterMethod(numTyp, "sin", IMPORT);										// sin(degrees)
	f->addParam(numVar);
	f = enterMethod(numTyp, "sqrt", IMPORT);									// sqrt(x)
	f->addParam(numVar);
	f = enterMethod(numTyp, "tan", IMPORT);										// tan(degrees)
	f->addParam(numVar);
	f = enterMethod(numTyp, "trunc", IMPORT);									// trunc(x)
	f->addParam(numVar);

	//
	// arc path
	//
	//f = enterMethod(pathTyp, "A$");											// A$(
	//f->addParam(numVar);														//	options,
	//f->addParam(numVar);														//	x,
	//f->addParam(numVar);														//	y,
	//f->addParam(numVar);														//	w,
	//f->addParam(numVar);														//	h,
	//f->addParam(numVar);														//	angle,
	//f->addParam(numVar);														//	theta)

	//
	// character path
	//
	//f = enterMethod(pathTyp, "C$");											// C$(
	//f->addParam(numVar);														//	options,
	//f->addParam(fontVar);														//	font,
	//f->addParam(numVar);														//	x,
	//f->addParam(numVar);														//	y,
	//f->addParam(numVar);														//	w,
	//f->addParam(numVar);														//	h,
	//f->addParam(stringVar);													//	txt)

	//
	// elliptical path
	//
	f = enterMethod(pathTyp, "E$", IMPORT);										// E$(
	f->addParam(numVar);														//	x,
	f->addParam(numVar);														//	y,
	f->addParam(numVar);														//	w,
	f->addParam(numVar);														//	h)

	//
	// line path
	//
	//f = enterMethod(pathTyp, "L$", OPTARG_NUM);								// L$(
	//f->addParam(numVar);														//	options, [x0,y0, x1,y0, ...])

	//
	// pie path
	//
	//f = enterMethod(pathTyp, "P$");											// P$(
	//f->addParam(numVar);														//	options,
	//f->addParam(numVar);														//	x,
	//f->addParam(numVar);														//	y,
	//f->addParam(numVar);														//	w,
	//f->addParam(numVar);														//	h,
	//f->addParam(numVar);														//	angle,
	//f->addParam(numVar);														//	theta)

	//
	// rectangular path
	//
	f = enterMethod(pathTyp, "R$", IMPORT);										// R$(
	f->addParam(numVar);														//	x,
	f->addParam(numVar);														//	y,
	f->addParam(numVar);														//	w,
	f->addParam(numVar);														//	h)

	//
	// spline path
	//
	//f = enterMethod(pathTyp, "S$", OPTARG_NUM);								// S$(
	//f->addParam(numVar);														//	options,
	//f->addParam(numVar);														//	tension, [x0,y0, x1,y0, ...])


	//
	// path functions
	//
	//f = enterMethod(pathTyp, "$closedPath");									// $closedPath(
	//f->addParam(pathVar);														//	path)
	//f = enterMethod(pathTyp, "$openPath");									// $openPath(
	//f->addParam(pathVar);														//	path)
	//f = enterMethod(pathTyp, "$outlinePath");									// $outlinePath(
	//f->addParam(pathVar);														//	path)

	//
	// global event handlers
	//
	f = enterMethod(numTyp, "eventSetTPS", EVENTF);								// when ~> eventSetTPS(		// {joj 27/9/07}
	f->addParam(numVar);														//	tps)
	f = enterMethod(numTyp, "eventStartStop", EVENTF);							// when ~> eventStartStop(	// {joj 27/9/07}
	f->addParam(numVar);														//	start)
	f = enterMethod(numTyp, "eventFire", EVENTF);								// when ~> eventFire(		// {joj 27/9/07}
	f->addParam(stringVar);														//	eventStr)
	f = enterMethod(numTyp, "eventTick", EVENTF);								// when ~> eventTick(		// {joj 22/11/07}
	f->addParam(numVar);														//	tick)
	//f = enterMethod(numTyp, "eventGoto", EVENTF);								// when ~> eventGoto(		// {joj 13/8/07}
	//f->addParam(numVar);														//	tick,
	//f->addParam(numVar);														//	backwards)
	//f = enterMethod(numTyp, "eventWINSZ", INOBJECT | EVENTF);					// eventWINSZ()

	//
	// defined GObj (graphical object)
	// base type for Rectangle, Line, Ellipse, Group...
	//
	gobjTyp = enterTyp("GObj", NULL, EXTENDABLEBUILTINOBJ);						// {joj 20/1/06}
	gobjVar = newVar(gobjTyp);
	pushScope(gobjTyp);

	//
	// gObj events
	//
	f = enterMethod(numTyp, "eventEE", INOBJECT | GOBJEVENTF);					// when gObj ~> eventEE(flags, x, y)
	f->addParam(numVar);														//	flags
	f->addParam(numVar);														//	x
	f->addParam(numVar);														//	y

	f = enterMethod(numTyp, "eventMB", INOBJECT | GOBJEVENTF);					// when gObj ~> eventMB(down, flags, x, y)
	f->addParam(numVar);														//	down
	f->addParam(numVar);														//	flags
	f->addParam(numVar);														//	x
	f->addParam(numVar);														//	y

	f = enterMethod(numTyp, "eventMessage", INOBJECT | GOBJEVENTF);					// when bc ~> eventMB(down, flags, x, y)
	f->addParam(stringVar);

	f = enterMethod(numTyp, "eventGRABBED", INOBJECT | GOBJEVENTF);				// when gObj ~> eventGRABBED(eventTyp, p1, flags, x, y)
	f->addParam(numVar);														//	eventTyp,
	f->addParam(numVar);														//	p1
	f->addParam(numVar);														//	flags
	f->addParam(numVar);														//	x
	f->addParam(numVar);														//	y

	f = enterMethod(numTyp, "eventKEY", INOBJECT | GOBJEVENTF);					// when gObj ~> eventKEY(key, flags, x, y)
	f->addParam(numVar);														//	key
	f->addParam(numVar);														//	flags
	f->addParam(numVar);														//	x
	f->addParam(numVar);														//	y

	f = enterMethod(numTyp, "eventUPDATED", INOBJECT | GOBJEVENTF);				// when gObj ~> eventUPDATED()

	//
	// GObj functions
	//
	Obj* attachTo = enterMethod(numTyp, "attachTo", INOBJECT);					// attachTo(group)
	//f->addParam(groupVar);													// NB FIX after Group has been defined
	Obj* detach = enterMethod(numTyp, "detach", INOBJECT);						// detach() NB: fix up after Group defined numTyp -> groupTyp

	//f = enterMethod(numTyp, "contains", INOBJECT | GOBJ);						// contains(x, y, options)
	//f->addParam(numVar);														//	x
	//f->addParam(numVar);														//	y
	//f->addParam(numVar, POPTIONAL);											//	options = 0
	//f = enterMethod(numTyp, "destroy", INOBJECT | GOBJ);						// destroy()

	f = enterMethod(brushTyp, "getBrush", INOBJECT | GOBJ);						// getBrush()
	//f = enterMethod(pathTyp, "getClipPath", INOBJECT | GOBJ);					// getClipPath()	{joj 6/9/10}
	//f = enterMethod(numTyp, "getCursor", INOBJECT | GOBJ);					// getCursor()		{joj 6/8/09}
	f = enterMethod(fontTyp, "getFont", INOBJECT | GOBJ);						// getFont()		{joj 5/8/09}
	//f = enterMethod(numTyp, "getH", INOBJECT | GOBJ);							// getH()
	f = enterMethod(numTyp, "getIH", INOBJECT | GOBJ);							// getIH()
	f = enterMethod(numTyp, "getIW", INOBJECT | GOBJ);							// getIW()
	//f = enterMethod(numTyp, "getIX", INOBJECT | GOBJ);						// getIX()
	//f = enterMethod(numTyp, "getIY", INOBJECT | GOBJ);						// getIY()
	f = enterMethod(layerTyp, "getLayer", INOBJECT | GOBJ);						// getLayer()		{joj 5/8/09}
	f = enterMethod(numTyp, "getOpacity", INOBJECT | GOBJ);						// getOpacity()		{joj 9/8/08}
	f = enterMethod(numTyp, "getOptions", INOBJECT | GOBJ);						// getOptions()		{joj 15/7/17}
	f = enterMethod(penTyp, "getPen", INOBJECT | GOBJ);							// getPen()			{joj 5/8/09}
	f = enterMethod(numTyp, "getPinX", INOBJECT | GOBJ);						// getPinX()
	f = enterMethod(numTyp, "getPinY", INOBJECT | GOBJ);						// getPinY()
	f = enterMethod(pathTyp, "getPostClipPath", INOBJECT | GOBJ);				// getPostClipPath(){joj 6/9/10}
	f = enterMethod(numTyp, "getTextureOffX", INOBJECT | GOBJ);					// getTextureOffX()	{joj 29/7/09}
	f = enterMethod(numTyp, "getTextureOffY", INOBJECT | GOBJ);					// getTextureOffY()	{joj 29/7/09}
	f = enterMethod(numTyp, "getTheta", INOBJECT | GOBJ);						// getTheta()
	f = enterMethod(stringTyp, "getTxt", INOBJECT | GOBJ);						// getTxt()
	f = enterMethod(numTyp, "getTxtH", INOBJECT | GOBJ);						// getTxtH()
	f = enterMethod(numTyp, "getTxtLen", INOBJECT | GOBJ);						// getTxtLen()		{joj 6/8/09}
	f = enterMethod(numTyp, "getTxtOffX", INOBJECT | GOBJ);						// getTxtOffX()		{joj 29/7/09}
	f = enterMethod(numTyp, "getTxtOffY", INOBJECT | GOBJ);						// getTxtOffY()		{joj 29/7/09}
	f = enterMethod(penTyp, "getTxtPen", INOBJECT | GOBJ);						// getTxtPen()
	f = enterMethod(numTyp, "getTxtW", INOBJECT | GOBJ);						// getTxtH()
	f = enterMethod(numTyp, "getW", INOBJECT | GOBJ);							// getW()
	f = enterMethod(numTyp, "getX", INOBJECT | GOBJ);							// getX()
	f = enterMethod(numTyp, "getY", INOBJECT | GOBJ);							// getY()
	f = enterMethod(gobjTyp, "grab", INOBJECT | GOBJ);							// grab()			{joj 3/3/06}
	f = enterMethod(numTyp, "flash", INOBJECT | GOBJ);							// flash(pen, brush, nsteps, interval, wait)
	f->addParam(penVar);														//	pen
	f->addParam(brushVar);														//	brush
	f->addParam(numVar, POPTIONAL);												//	nsteps = 0
	f->addParam(numVar, POPTIONAL);												//	interval = 1
	f->addParam(numVar, POPTIONAL | CANWAIT);									//	wait = 0
	f = enterMethod(numTyp, "moveToBack", INOBJECT | GOBJ);						// moveToBack()
	f = enterMethod(numTyp, "moveToFront", INOBJECT | GOBJ);					// moveToFront()
	f = enterMethod(numTyp, "reset", INOBJECT | GOBJ);							// reset()
	f = enterMethod(numTyp, "rotate", INOBJECT | GOBJ);							// rotate(dtheta, nsteps, interval, wait)
	//f->addParam(numVar);														//	dpinx,
	//f->addParam(numVar);														//	dpiny,
	f->addParam(numVar);														//	dtheta
	f->addParam(numVar, POPTIONAL);												//	nsteps
	f->addParam(numVar, POPTIONAL);												//	interval
	f->addParam(numVar, POPTIONAL | CANWAIT);									//	wait
	f = enterMethod(numTyp, "scale", INOBJECT | GOBJ);							// scale(sz, sy, nsteps, interval, wait)
	f->addParam(numVar);														//	sx
	f->addParam(numVar);														//	sy
	f->addParam(numVar, POPTIONAL);												//	nsteps = 0
	f->addParam(numVar, POPTIONAL);												//	interval = 1
	f->addParam(numVar, POPTIONAL | CANWAIT);									//	wait = 0
	f = enterMethod(numTyp, "setAngle", INOBJECT | GOBJ);						// setAngle(theta, nsteps, interval, wait)
	f->addParam(numVar);														//	theta
	f->addParam(numVar, POPTIONAL);												//	nsteps = 0
	f->addParam(numVar, POPTIONAL);												//	interval = 1
	f->addParam(numVar, POPTIONAL | CANWAIT);									//	wait = 0
	f = enterMethod(brushTyp, "setBrush", INOBJECT | GOBJ);						// setBrush(brush)
	f->addParam(brushVar);														//	brush
	f = enterMethod(pathTyp, "setClipPath", INOBJECT | GOBJ);					// setClipPath(path)
	f->addParam(pathVar);														//	path
	//f = enterMethod(numTyp, "setCursor", INOBJECT | GOBJ);					// setCursor(cursor)
	//f->addParam(numVar);														//	cursor
	f = enterMethod(fontTyp, "setFont", INOBJECT | GOBJ);						// setFont(font)
	f->addParam(fontVar);														//	font
	f = enterMethod(numTyp, "setMapping", INOBJECT);							// setMapping(x, y, w, h, vx, vy, vw, vh, nsteps, interval, wait)
	f->addParam(numVar);														//	x
	f->addParam(numVar);														//	y
	f->addParam(numVar);														//	w
	f->addParam(numVar);														//	h
	f->addParam(numVar);														//	vx
	f->addParam(numVar);														//	vy
	f->addParam(numVar);														//	vw
	f->addParam(numVar);														//	vh
	f->addParam(numVar, POPTIONAL);												//	nsteps = 0
	f->addParam(numVar, POPTIONAL);												//	interval = 1
	f->addParam(numVar, POPTIONAL | CANWAIT);									//	wait = 0
	f = enterMethod(numTyp, "setOpacity", INOBJECT | GOBJ);						// setOpacity(opacity, [nsteps, interval, wait)
	f->addParam(numVar);														//	opacity
	f->addParam(numVar, POPTIONAL);												//	nsteps = 0
	f->addParam(numVar, POPTIONAL);												//	interval = 1
	f->addParam(numVar, POPTIONAL | CANWAIT);									//	wait = 0
	f = enterMethod(numTyp, "setOptions", INOBJECT | GOBJ);						// setOptions(options)
	f->addParam(numVar);														//	options
	f = enterMethod(penTyp, "setPen", INOBJECT | GOBJ);							// setPen(pen)
	f->addParam(penVar);														//	pen
	f = enterMethod(penTyp, "setPin", INOBJECT | GOBJ);							// setPin(x, y, nsteps, interval, wait)
	f->addParam(numVar);														//	x
	f->addParam(numVar);														//	y
	f->addParam(numVar, POPTIONAL);												//	nsteps = 0
	f->addParam(numVar, POPTIONAL);												//	interval = 1
	f->addParam(numVar, POPTIONAL | CANWAIT);									//	wait = 0
	f = enterMethod(numTyp, "setPos", INOBJECT | GOBJ);							// setPos(x, y, nsteps, interval, wait)
	f->addParam(numVar);														//	x
	f->addParam(numVar);														//	y
	f->addParam(numVar, POPTIONAL);												//	nsteps = 0
	f->addParam(numVar, POPTIONAL);												//	interval = 1
	f->addParam(numVar, POPTIONAL | CANWAIT);									//	wait = 0
	f = enterMethod(numTyp, "setSize", INOBJECT | GOBJ);						// setSize(w, h, nsteps, interval, wait)
	f->addParam(numVar);														//	w
	f->addParam(numVar);														//	h
	f->addParam(numVar, POPTIONAL);												//	nsteps = 0
	f->addParam(numVar, POPTIONAL);												//	interval = 1
	f->addParam(numVar, POPTIONAL | CANWAIT);									//	wait = 0
	f = enterMethod(numTyp, "setTextureOff", INOBJECT | GOBJ);					// setTextureOff(offx, offy, nsteps, interval, wait)
	f->addParam(numVar);														//	offx
	f->addParam(numVar);														//	offy
	f->addParam(numVar, POPTIONAL);												//	nsteps = 0
	f->addParam(numVar, POPTIONAL);												//	interval = 1
	f->addParam(numVar, POPTIONAL | CANWAIT);									//	wait = 0
	f = enterMethod(numTyp, "setTxt", OPTARG_ANY | INOBJECT | GOBJ);			// setTxt(s, ...)
	f->addParam(stringVar);														//	s
	f = enterMethod(numTyp, "setTxt3", OPTARG_ANY | INOBJECT | GOBJ);			// setTxt3(pen, font, s, ...)
	f->addParam(penVar, POPTIONAL);												//	pen  = 0
	f->addParam(fontVar, POPTIONAL);											//	font = 0
	f->addParam(stringVar, POPTIONAL);											//	s = 0
	f = enterMethod(brushTyp, "setTxtBgBrush", INOBJECT | GOBJ);				// setTxtBgBrush(brush)
	f->addParam(brushVar);														//	brush
	f = enterMethod(numTyp, "setTxtOff", INOBJECT | GOBJ);						// setTxtOff(txtOffx, txtOffy, nsteps, interval, wait)
	f->addParam(numVar);														//	txtOffx
	f->addParam(numVar);														//	txtOffy
	f->addParam(numVar, POPTIONAL);												//	nsteps = 0
	f->addParam(numVar, POPTIONAL);												//	interval = 1
	f->addParam(numVar, POPTIONAL | CANWAIT);									//	wait = 0
	f = enterMethod(penTyp, "setTxtPen", INOBJECT | GOBJ);						// setTxtPen(pen)
	f->addParam(penVar);														//	pen
	f = enterMethod(numTyp, "translate", INOBJECT | GOBJ);						// translate(dx, dy, nstes, interval, wait)
	f->addParam(numVar);														//	dx
	f->addParam(numVar);														//	dy
	f->addParam(numVar, POPTIONAL);												//	nsteps = 0
	f->addParam(numVar, POPTIONAL);												//	interval = 1
	f->addParam(numVar, POPTIONAL | CANWAIT);									//	wait = 0
	f = enterMethod(penTyp, "translatePin", INOBJECT | GOBJ);					// translatePin(dx, dy, nsteps, interval, wait)
	f->addParam(numVar);														//	dx
	f->addParam(numVar);														//	dy
	f->addParam(numVar, POPTIONAL);												//	nsteps = 0
	f->addParam(numVar, POPTIONAL);												//	interval = 1
	f->addParam(numVar, POPTIONAL | CANWAIT);									//	wait = 0
	f = enterMethod(numTyp, "ungrab", INOBJECT | GOBJ);							// ungrab()
	f = enterMethod(numTyp, "update", INOBJECT | GOBJ);							// update()
	popScope();

	//
	// define Arc
	//
	arcTyp = enterTyp("Arc", gobjTyp, GOBJ | OPTARG_ANY | EXTENDABLEBUILTINOBJ | CONSTRUCTOR | IMPORT);	// Arc(
	arcTyp->addParam(layerVar);													//	layer,
	arcTyp->addParam(numVar);													//	options,
	arcTyp->addParam(penVar);													//	pen,
	arcTyp->addParam(brushVar);													//	brush,
	arcTyp->addParam(numVar);													//	xpos,
	arcTyp->addParam(numVar);													//	ypos,
	arcTyp->addParam(numVar);													//	cx,
	arcTyp->addParam(numVar);													//	cy,
	arcTyp->addParam(numVar);													//	rx,
	arcTyp->addParam(numVar);													//	ry,
	arcTyp->addParam(numVar);													//	startAngle,
	arcTyp->addParam(numVar);													//	spanAngle,
	arcTyp->addParam(penVar, POPTIONAL);										//	[txtpen= 0,
	arcTyp->addParam(fontVar, POPTIONAL);										//	font = 0,
	arcTyp->addParam(stringVar, POPTIONAL);										//	txt = 0, ...])
	pushScope(arcTyp);

	f = enterMethod(numTyp, "getStartAngle", INOBJECT);							// getStartAngle()	// {joj 8/8/09}
	f = enterMethod(numTyp, "getSpanAngle", INOBJECT);							// getSpanAngle()	// {joj 8/8/09}

	f = enterMethod(numTyp, "rotateStartAngle", INOBJECT);						// rotateStartAngle
	f->addParam(numVar);														//	theta
	f->addParam(numVar, POPTIONAL);												//	nsteps = 0
	f->addParam(numVar, POPTIONAL);												//	interval = 1
	f->addParam(numVar, POPTIONAL | CANWAIT);									//	wait = 0

	f = enterMethod(numTyp, "rotateSpanAngle", INOBJECT);						// rotateSpanAngle
	f->addParam(numVar);														//	theta
	f->addParam(numVar, POPTIONAL);												//	nsteps = 0
	f->addParam(numVar, POPTIONAL);												//	interval = 1
	f->addParam(numVar, POPTIONAL | CANWAIT);									//	wait = 0
		
	f = enterMethod(numTyp, "setStartAngle", INOBJECT);							// setStartAngle	// {joj 23/3/18}
	f->addParam(numVar);														//	angle
	f->addParam(numVar, POPTIONAL);												//	nsteps = 0
	f->addParam(numVar, POPTIONAL);												//	interval = 1
	f->addParam(numVar, POPTIONAL | CANWAIT);									//	wait = 0

	f = enterMethod(numTyp, "setSpanAngle", INOBJECT);							// setSpanAngle		// {joj 23/3/18}
	f->addParam(numVar);														//	angle
	f->addParam(numVar, POPTIONAL);												//	nsteps = 0
	f->addParam(numVar, POPTIONAL);												//	interval = 1
	f->addParam(numVar, POPTIONAL | CANWAIT);									//	wait = 0

	popScope();

	//
	// Bezier
	//
	bezierTyp = enterTyp("Bezier", gobjTyp, GOBJ | OPTARG_NUM | EXTENDABLEBUILTINOBJ | CONSTRUCTOR | IMPORT);			// {joj 20/1/06}
	bezierTyp->addParam(layerVar);											//	layer,
	bezierTyp->addParam(numVar);											//	options,
	bezierTyp->addParam(penVar);											//	pen,
	bezierTyp->addParam(brushVar);											//	brush,
	bezierTyp->addParam(numVar);											//	xpos,
	bezierTyp->addParam(numVar);											//	ypos, [x0, y0, c00x, c00y, c01x, c01y, x1, y1, ...])
	pushScope(bezierTyp);

	f = enterMethod(numTyp, "getNPts", INOBJECT);							// getNPts()		{joj 6/8/09}
	f = enterMethod(numTyp, "getPtX", INOBJECT);							// getPtX(			{joj 8/9/09}
	f->addParam(numVar);													//	index)
	f = enterMethod(numTyp, "getPtY", INOBJECT);							// getPtY(			{joj 8/9/09}
	f->addParam(numVar);													//	index)

	f = enterMethod(numTyp, "setNPts", INOBJECT);							// setNPts(
	f->addParam(numVar);													//	n,
	f->addParam(numVar, POPTIONAL);											//	[allocated = 0])	{joj 19/1/07}

	f = enterMethod(numTyp, "setPt", INOBJECT);								// setPt(index, x, y, [nsteps = 0, interval = 1, wait = 0])
	f->addParam(numVar);
	f->addParam(numVar);
	f->addParam(numVar);
	f->addParam(numVar, POPTIONAL);
	f->addParam(numVar, POPTIONAL);
	f->addParam(numVar, POPTIONAL | CANWAIT);

	f = enterMethod(numTyp, "translatePt", INOBJECT);						// translatePt(index, dx, dy, [nsteps = 0, interval = 1, wait = 0])
	f->addParam(numVar);
	f->addParam(numVar);
	f->addParam(numVar);
	f->addParam(numVar, POPTIONAL);
	f->addParam(numVar, POPTIONAL);
	f->addParam(numVar, POPTIONAL | CANWAIT);

	popScope();

	//
	// Ellipse
	//
	ellipseTyp = enterTyp("Ellipse", gobjTyp, GOBJ | OPTARG_ANY | EXTENDABLEBUILTINOBJ | CONSTRUCTOR | IMPORT);	// Ellipse(
	ellipseTyp->addParam(layerVar);																	//	layer,
	ellipseTyp->addParam(numVar);																	//	options,
	ellipseTyp->addParam(penVar);																	//	pen,
	ellipseTyp->addParam(brushVar);																	//	brush,
	ellipseTyp->addParam(numVar);																	//	xpos,
	ellipseTyp->addParam(numVar);																	//	ypos,
	ellipseTyp->addParam(numVar);																	//	x,
	ellipseTyp->addParam(numVar);																	//	y,
	ellipseTyp->addParam(numVar);																	//	w,
	ellipseTyp->addParam(numVar);																	//	h,
	ellipseTyp->addParam(penVar, POPTIONAL);														//	[txtpen = 0,
	ellipseTyp->addParam(fontVar, POPTIONAL);														//	font = 0,
	ellipseTyp->addParam(stringVar, POPTIONAL);														//	txt = 0, ...])
	pushScope(ellipseTyp);

	f = enterMethod(numTyp, "getNPts", INOBJECT);							// getNPts()
	f = enterMethod(numTyp, "getPtX", INOBJECT);							// getPtX(index)
	f->addParam(numVar);
	f = enterMethod(numTyp, "getPtY", INOBJECT);							// getPtY(index)
	f->addParam(numVar);

	f = enterMethod(numTyp, "setPt", INOBJECT);								// setPt(index, x, y, [nsteps = 0, interval = 1, wait = 0])
	f->addParam(numVar);
	f->addParam(numVar);
	f->addParam(numVar);
	f->addParam(numVar, POPTIONAL);
	f->addParam(numVar, POPTIONAL);
	f->addParam(numVar, POPTIONAL | CANWAIT);

	f = enterMethod(numTyp, "translatePt", INOBJECT);						// translatePt(index, dx, dy, [nsteps = 0, interval = 1, wait = 0])
	f->addParam(numVar);
	f->addParam(numVar);
	f->addParam(numVar);
	f->addParam(numVar, POPTIONAL);
	f->addParam(numVar, POPTIONAL);
	f->addParam(numVar, POPTIONAL | CANWAIT);
	popScope();

	//
	// Ellipse
	//
	f = enterExtraConstructor("Ellipse2", ellipseTyp, GOBJ | OPTARG_ANY | IMPORT);	// Ellipse2(
	f->addParam(layerVar);															//	layer,
	f->addParam(numVar);															//	options,
	f->addParam(penVar);															//	pen,
	f->addParam(brushVar);															//	brush,
	f->addParam(numVar);															//	x,
	f->addParam(numVar);															//	y,
	f->addParam(numVar);															//	w,
	f->addParam(numVar);															//	h,
	f->addParam(penVar, POPTIONAL);													//	[txtpen = 0,
	f->addParam(fontVar, POPTIONAL);												//	font = 0,
	f->addParam(stringVar, POPTIONAL);												//	txt = 0, ...])

	//
	// Image
	//
	imageTyp = enterTyp("Image", gobjTyp, GOBJ | OPTARG_ANY | EXTENDABLEBUILTINOBJ | CONSTRUCTOR | IMPORT);	// Image(
	imageTyp->addParam(layerVar);														//	layer,
	imageTyp->addParam(numVar);															//	options,
	imageTyp->addParam(penVar);															//	pen,
	imageTyp->addParam(stringVar);														//	url,
	imageTyp->addParam(numVar);															//	xpos,
	imageTyp->addParam(numVar);															//	ypos,
	imageTyp->addParam(numVar);															//	x,
	imageTyp->addParam(numVar);															//	y,
	imageTyp->addParam(numVar);															//	w,
	imageTyp->addParam(numVar);															//	h,
	imageTyp->addParam(penVar, POPTIONAL);												//	[txtpen = 0,
	imageTyp->addParam(fontVar, POPTIONAL);												//	font = 0,
	imageTyp->addParam(stringVar, POPTIONAL);											//	txt = 0, ...])

	//
	// Line
	//
	lineTyp = enterTyp("Line", gobjTyp, GOBJ | OPTARG_NUM | EXTENDABLEBUILTINOBJ | CONSTRUCTOR | IMPORT);	// Line(
	lineTyp->addParam(layerVar);																			//	layer,
	lineTyp->addParam(numVar);																				//	options,
	lineTyp->addParam(penVar);																				//	pen,
	lineTyp->addParam(numVar);																				//	xpos,
	lineTyp->addParam(numVar);																				//	ypos, [x0, y0, x1, y1, ...])
	pushScope(lineTyp);

	f = enterMethod(numTyp, "getNPts", INOBJECT);							// getNPts()		{joj 6/8/09}
	f = enterMethod(numTyp, "getPtX", INOBJECT);							// getPtX(			{joj 8/9/09}
	f->addParam(numVar);													//	index)
	f = enterMethod(numTyp, "getPtY", INOBJECT);							// getPtY(			{joj 8/9/09}
	f->addParam(numVar);													//	index)

	f = enterMethod(numTyp, "setNPts", INOBJECT);							// setNPts(
	f->addParam(numVar);													//	n,
	f->addParam(numVar, POPTIONAL);											//	[allocated = 0])	{joj 19/1/07}

	f = enterMethod(numTyp, "setPt", INOBJECT);								// setPt(index, x, y, [nsteps = 0, interval = 1, wait = 0])
	f->addParam(numVar);
	f->addParam(numVar);
	f->addParam(numVar);
	f->addParam(numVar, POPTIONAL);
	f->addParam(numVar, POPTIONAL);
	f->addParam(numVar, POPTIONAL | CANWAIT);

	f = enterMethod(numTyp, "translatePt", INOBJECT);						// translatePt(index, dx, dy, [nsteps = 0, interval = 1, wait = 0])
	f->addParam(numVar);
	f->addParam(numVar);
	f->addParam(numVar);
	f->addParam(numVar, POPTIONAL);
	f->addParam(numVar, POPTIONAL);
	f->addParam(numVar, POPTIONAL | CANWAIT);

	popScope();

	//
	// Line2
	//
	f = enterExtraConstructor("Line2", lineTyp, GOBJ | OPTARG_NUM | IMPORT);	// Line2(
	f->addParam(layerVar);														//  layer,
	f->addParam(numVar);														//	options,
	f->addParam(penVar);														//	pen, [x0, y0, x1, y1, ...])

	//
	// define Pie object
	//
	pieTyp = enterTyp("Pie", arcTyp, GOBJ | OPTARG_ANY | EXTENDABLEBUILTINOBJ | CONSTRUCTOR | IMPORT);	// Pie(
	pieTyp->addParam(layerVar);													//	layer,
	pieTyp->addParam(numVar);													//	options,
	pieTyp->addParam(penVar);													//	pen,
	pieTyp->addParam(brushVar);													//	brush,
	pieTyp->addParam(numVar);													//	xpos,
	pieTyp->addParam(numVar);													//	ypos,
	pieTyp->addParam(numVar);													//	cx,
	pieTyp->addParam(numVar);													//	cy,
	pieTyp->addParam(numVar);													//	rx,
	pieTyp->addParam(numVar);													//	ry,
	pieTyp->addParam(numVar);													//	startAngle,
	pieTyp->addParam(numVar);													//	spanAngle,
	pieTyp->addParam(penVar, POPTIONAL);										//	[txtpen = 0,
	pieTyp->addParam(fontVar, POPTIONAL);										//	font = 0,
	pieTyp->addParam(stringVar, POPTIONAL);										//	txt = 0, ...])

	//
	// define Polygon object
	//
	
	polygonTyp = enterTyp("Polygon", gobjTyp, GOBJ | OPTARG_NUM | EXTENDABLEBUILTINOBJ | CONSTRUCTOR | IMPORT);	// Polygon(
	polygonTyp->addParam(layerVar);																				//	layer,
	polygonTyp->addParam(numVar);																				//	options,
	polygonTyp->addParam(penVar);																				//	pen,
	polygonTyp->addParam(brushVar);																				//	brush,
	polygonTyp->addParam(numVar);																				//	xpos,
	polygonTyp->addParam(numVar);																				//	ypos, [x0, y0, x1, y1, ...])
	pushScope(polygonTyp);

	f = enterMethod(numTyp, "getNPts", INOBJECT);							// getNPts()
	f = enterMethod(numTyp, "getPtX", INOBJECT);							// getPtX(index)
	f->addParam(numVar);
	f = enterMethod(numTyp, "getPtY", INOBJECT);							// getPtY(index)
	f->addParam(numVar);

	f = enterMethod(numTyp, "setNPts", INOBJECT);							// setNPts(n, [allocated = 0])
	f->addParam(numVar);
	f->addParam(numVar, POPTIONAL);

	f = enterMethod(numTyp, "setPt", INOBJECT);								// setPt(index, x, y, [nsteps = 0, interval = 1, wait = 0])
	f->addParam(numVar);
	f->addParam(numVar);
	f->addParam(numVar);
	f->addParam(numVar, POPTIONAL);
	f->addParam(numVar, POPTIONAL);
	f->addParam(numVar, POPTIONAL | CANWAIT);

	f = enterMethod(numTyp, "translatePt", INOBJECT);						// translatePt(index, dx, dy, [nsteps = 0, interval = 1, wait = 0])
	f->addParam(numVar);
	f->addParam(numVar);
	f->addParam(numVar);
	f->addParam(numVar, POPTIONAL);
	f->addParam(numVar, POPTIONAL);
	f->addParam(numVar, POPTIONAL | CANWAIT);

	popScope();

	//
	// BroadcastChannel
	//
	broadcastChannelTyp = enterTyp("BroadcastChannel", NULL, EXTENDABLEBUILTINOBJ | CONSTRUCTOR);
	broadcastChannelTyp->addParam(stringVar);
	pushScope(broadcastChannelTyp);

	//f = enterMethod(stringTyp, "onmessage", INOBJECT);
	f = enterMethod(numTyp, "postMessage", INOBJECT);
	f->addParam(stringTyp);

	//f = enterMethod(numTyp, "eventMessage", INOBJECT | EVENTF);					// when bc ~> eventMB(down, flags, x, y)
	//f->addParam(stringVar);														//	down														//	flags
	
	popScope();
	
	//
	// Rectangle
	//
	rectangleTyp = enterTyp("Rectangle", gobjTyp, GOBJ | OPTARG_ANY | EXTENDABLEBUILTINOBJ | CONSTRUCTOR | IMPORT);	// Rectangle(
	rectangleTyp->addParam(layerVar);																	//	layer,
	rectangleTyp->addParam(numVar);																		//	options,
	rectangleTyp->addParam(penVar);																		//	pen,
	rectangleTyp->addParam(brushVar);																	//	brush,
	rectangleTyp->addParam(numVar);																		//	xpos,
	rectangleTyp->addParam(numVar);																		//	ypos,
	rectangleTyp->addParam(numVar);																		//	x,
	rectangleTyp->addParam(numVar);																		//	y,
	rectangleTyp->addParam(numVar);																		//	w,
	rectangleTyp->addParam(numVar);																		//	h,
	rectangleTyp->addParam(penVar, POPTIONAL);															//	[txtpen = 0,
	rectangleTyp->addParam(fontVar, POPTIONAL);															//	font = 0,
	rectangleTyp->addParam(stringVar, POPTIONAL);														//	txt = 0])
	pushScope(rectangleTyp);

	f = enterMethod(numTyp, "getNPts", INOBJECT);							// getNPts()		{joj 6/8/09}
	f = enterMethod(numTyp, "getPtX", INOBJECT);							// getPtX(			{joj 8/9/09}
	f->addParam(numVar);													//	index)
	f = enterMethod(numTyp, "getPtY", INOBJECT);							// getPtY(			{joj 8/9/09}
	f->addParam(numVar);													//	index)
	f = enterMethod(numTyp, "getRoundedX", INOBJECT);						// getRoundedX()	{joj 8/8/09}
	f = enterMethod(numTyp, "getRoundedY", INOBJECT);						// getRoundedY()	{joj 8/8/09}

	f = enterMethod(numTyp, "setPt", INOBJECT);								// setPt(index, x, y, [nsteps = 0, interval = 1, wait = 0])
	f->addParam(numVar);
	f->addParam(numVar);
	f->addParam(numVar);
	f->addParam(numVar, POPTIONAL);
	f->addParam(numVar, POPTIONAL);
	f->addParam(numVar, POPTIONAL | CANWAIT);

	f = enterMethod(rectangleTyp, "setRounded", INOBJECT);					// setRounded(rx, ry, [nsteps = 0, interval = 1, wait = 0])
	f->addParam(numVar);
	f->addParam(numVar);
	f->addParam(numVar, POPTIONAL);
	f->addParam(numVar, POPTIONAL);
	f->addParam(numVar, POPTIONAL | CANWAIT);

	f = enterMethod(numTyp, "translatePt", INOBJECT);						// translatePt(index, dx, dy, [nsteps = 0, interval = 1, wait = 0])
	f->addParam(numVar);
	f->addParam(numVar);
	f->addParam(numVar);
	f->addParam(numVar, POPTIONAL);
	f->addParam(numVar, POPTIONAL);
	f->addParam(numVar, POPTIONAL | CANWAIT);

	popScope();

	//
	// Rectangle2
	//
	f = enterExtraConstructor("Rectangle2", rectangleTyp, GOBJ | OPTARG_ANY | IMPORT);			// Rectangle2(
	f->addParam(layerVar);																		//	layer,
	f->addParam(numVar);																		//	options,
	f->addParam(penVar);																		//	pen,
	f->addParam(brushVar);																		//	brush,
	f->addParam(numVar);																		//	x,
	f->addParam(numVar);																		//	y,
	f->addParam(numVar);																		//	w,
	f->addParam(numVar);																		//	h,
	f->addParam(penVar, POPTIONAL);																//	[txtpen = 0,
	f->addParam(fontVar, POPTIONAL);															//	font = 0,
	f->addParam(stringVar, POPTIONAL);															//	txt = 0])

	//
	// Txt
	//
	f = enterExtraConstructor("Txt", rectangleTyp, GOBJ | OPTARG_ANY | IMPORT);					// Txt(
	f->addParam(layerVar);																		//	layer,
	f->addParam(numVar);																		//	options,
	f->addParam(numVar, POPTIONAL);																//	xpos,
	f->addParam(numVar, POPTIONAL);																//	ypos,
	f->addParam(penVar, POPTIONAL);																//	[txtpen = 0,
	f->addParam(fontVar, POPTIONAL);															//	font = 0,
	f->addParam(stringVar, POPTIONAL);															//	txt = 0, ...])

	//
	// Shape
	//
	shapeTyp = enterTyp("Shape", gobjTyp, EXTENDABLEBUILTINOBJ);					// Shape(
	shapeTyp->addParam(layerVar);													//	layer,
	shapeTyp->addParam(numVar);														//	options,
	shapeTyp->addParam(penVar);														//	pen,
	shapeTyp->addParam(brushVar);													//	brush,
	shapeTyp->addParam(numVar, POPTIONAL);											//	xpos,
	shapeTyp->addParam(numVar, POPTIONAL);											//	ypos,
	shapeTyp->addParam(pathVar);													//	path,
	shapeTyp->addParam(penVar, POPTIONAL);											//	[txtpen = 0,
	shapeTyp->addParam(fontVar, POPTIONAL);											//	font = 0,
	shapeTyp->addParam(stringVar, POPTIONAL);										//	txt = 0, ...])

	//
	// Spline
	//
	splineTyp = enterTyp("Spline", gobjTyp, GOBJ | OPTARG_NUM | EXTENDABLEBUILTINOBJ | CONSTRUCTOR | IMPORT);	// {joj 20/1/06}
	splineTyp->addParam(layerVar);													//	layer,
	splineTyp->addParam(numVar);													//	options,
	splineTyp->addParam(penVar);													//  pen,
	splineTyp->addParam(brushVar);													//	brush,
	splineTyp->addParam(numVar);													//	tension
	splineTyp->addParam(numVar);													//	xpos,
	splineTyp->addParam(numVar);													//	ypos, [x0, y0, x1, y1, ...])
	pushScope(splineTyp);

	f = enterMethod(numTyp, "getNPts", INOBJECT);							// getNPts()		{joj 6/8/09}
	f = enterMethod(numTyp, "getPtX", INOBJECT);							// getPtX(			{joj 8/9/09}
	f->addParam(numVar);													//	index)
	f = enterMethod(numTyp, "getPtY", INOBJECT);							// getPtY(			{joj 8/9/09}
	f->addParam(numVar);													//	index)
	f = enterMethod(numTyp, "getTension", INOBJECT);						// getTension()		{joj 8/8/09}

	f = enterMethod(numTyp, "setNPts", INOBJECT);							// setNPts(
	f->addParam(numVar);													//	n,
	f->addParam(numVar, POPTIONAL);											//	[allocated = 0])	{joj 19/1/07}

	f = enterMethod(numTyp, "setPt", INOBJECT);								// setPt(				{joj 9/1/06}
	f->addParam(numVar);													//	index,
	f->addParam(numVar);													//	x,
	f->addParam(numVar);													//	y,
	f->addParam(numVar, POPTIONAL);
	f->addParam(numVar, POPTIONAL);
	f->addParam(numVar, POPTIONAL | CANWAIT);

	f = enterMethod(numTyp, "setTension", INOBJECT);						// setTension(tension, [, nsteps = 0, interval = 1, wait = 0])
	f->addParam(numVar);
	f->addParam(numVar, POPTIONAL);
	f->addParam(numVar, POPTIONAL);
	f->addParam(numVar, POPTIONAL | CANWAIT);

	f = enterMethod(numTyp, "translatePt", INOBJECT);						// translatePt(index, dx, dy [, nsteps = 0, interval = 1, wait = 0])
	f->addParam(numVar);
	f->addParam(numVar);
	f->addParam(numVar);
	f->addParam(numVar, POPTIONAL);
	f->addParam(numVar, POPTIONAL);
	f->addParam(numVar, POPTIONAL | CANWAIT);

	popScope();

	//
	// Group
	//
	groupTyp = enterTyp("Group", rectangleTyp, GOBJ | EXTENDABLEBUILTINOBJ | CONSTRUCTOR | IMPORT);	// Group(layer, options, xpos, ypos, x, y, w, h)
	groupTyp->addParam(layerVar, POPTIONAL);														//	layer = 0
	groupTyp->addParam(numVar, POPTIONAL);															//	options = 0
	groupTyp->addParam(numVar, POPTIONAL);															//	xpos = 0
	groupTyp->addParam(numVar, POPTIONAL);															//	ypos = 0
	groupTyp->addParam(numVar, POPTIONAL);															//	x = 0
	groupTyp->addParam(numVar, POPTIONAL);															//	y = 0
	groupTyp->addParam(numVar, POPTIONAL);															//	w = 0
	groupTyp->addParam(numVar, POPTIONAL);															//	h = 0
	groupVar = newVar(groupTyp);
	
	// FIXUPS
	attachTo->addParam(groupVar);																	// {joj 13/7/17}
	detach->typID = groupTyp->id;																	// {joj 13/7/17}

	//pushScope(groupTyp);																			//
	//f = enterMethod(numTyp, "attach", INOBJECT | OPTARG_GOBJ);									// attach([gObj, gObj,...])
	//f = enterMethod(numTyp, "detach", INOBJECT | OPTARG_GOBJ);									// detach([gObj, gObj,...])
	//popScope();


	//
	//globalScope derived from GroupObj
	//
	globalScope->derivedFrom = groupTyp;
	//globalScope->flags |= GROUP;

}

//
// tidyup
//
void Compiler::tidyUp() {
	srcFileName.clear();			// {joj 26/10/10}
	srcFileBuf.clear();				// {joj 2/11/16}
	endFileBuf.clear();				// {joj 5/9/16}
	constImports.clear();			// {joj 6/9/16}
	varImports.clear();				// {joj 2/9/16}
	constDefs.clear();				// {joj 7/9/16}
	js[0].clear();					// {joj 27/9/16}
	js[1].clear();					// {joj 27/9/16}
	func.clear();					// {joj 6/10/16}
	loopStart.clear();				// {joj 6/10/16}
	loopEnd.clear();				// {joj 6/10/16}
	string.clear();					// {joj 8/9/16}
	stringToId.clear();				// {joj 8/9/16}
	idToSym.clear();				// {joj 8/9/16}
}

//
// constructor
//
Compiler::Compiler(InfoWnd *_infoWnd) {
	infoWnd = _infoWnd;
	id = 0;
	num = 0;
	//enterName = 1;					// {joj 31/7/17}
	//topScope = NULL;
}

//
// destructor
//
Compiler::~Compiler() {
	// nothing to do
}

//
// findVivioJs
//
QString Compiler::findVivioJS() {
	QString dir = vApp->vivDir, nextDir;
	QString parent, fn;
	QFileInfo f;
	while (1) {
		fn = dir + "/vivio.js";
		f.setFile(fn);
		if (f.exists() && f.isFile())
			return parent + "vivio.js";
		fn = dir + "/www/vivio.js";
		f.setFile(fn);
		if (f.exists() && f.isFile())
			return parent + "www/vivio.js";
		nextDir = dir.left(dir.lastIndexOf("/"));
		if ((dir == nextDir) || (nextDir.count() == 0))
			break;
		dir = nextDir;
		parent += "../";
	}
	infoWnd->vappend("Unable to find vivio.js when generating \"%s\"\n", qPrintable(vApp->htmPath));
	return dir + "/vivio.js";
}

//
// compile
//
// return 1 if no errors
//
int Compiler::compile(const QString &vivFn, int flags, QString *errs) {

	QElapsedTimer eTimer;												// {joj 21/2/15}
	eTimer.start();														// {joj 21/2/15}

	srcFileNo = 0;														// {joj 20/10/10}
	srcFileName.append(vivFn);											// {joj 20/10/10}

	caseLabel = 1;														// {joj 15/9/16}

	qint64 sz;															// file size {joj 16/2/13}
	QFile qVivFile(vivFn);
	if (qVivFile.open(QIODevice::ReadOnly | QIODevice::Text)) {
		sz = qVivFile.size();
		srcFileBuf.append((char*) malloc(sz));							// {joj 4/9/16}
		qVivFile.read(srcFileBuf[srcFileNo], sz);
		qVivFile.close();
	} else {
		infoWnd->append(QString("unable to read %1\n").arg(vivFn));		// {joj 16/2/13}
		return 0;
	}

	infoWnd->append(QString("compiling %1\n").arg(vivFn));				// {joj 16/2/13}

	linePtr = chPtr = endOfFilePtr = srcFileBuf[srcFileNo];				// initialise chPtr, linePtr and endOfFilePtr
	endFileBuf.append(endOfFilePtr += sz);								// calculate endOfFilePtr

	int pragma;															// {joj 11/10/07}
	AST* ast = pass1(pragma);											// {joj 19/8/16}
	if (errors == 0) {
		eval(ast, topScope);											// pass2
		if (errors == 0) {
			QString *s;													//
			int k = 0;
			determineCanWaitFuncs();									// {joj 18/9/16}
			if (checkCanWaitFuncs()) {									// {joj 14/11/17}
				varImports += "addWaitToEventQ";						// {joj 15/9/16}
				varImports += "$g";
				varImports += "terminateThread";						// {joj 15/9/16}
				if (vApp->testFlag)										// {joj 27/9/17}
					varImports += "closeIDE";							// {joj 27/9/17}
				js[1].append(QStringList(""));							// {joj 21/9/16}
				genJS(1, 0, k, ast, topScope);							// pass3
			}															// {joj 14/11/17}
		}
	}

	qint64 ms = eTimer.elapsed();

	if (errors == 0) {
		infoWnd->vappend("NO Errors [%3.2fs]\n", (double) ms / 1000);	// {joj 21/2/15}
	} else if (errors == 1) {
		infoWnd->vappend("1 error\n");
	} else if (errors > 1) {
		infoWnd->vappend("%d errors\n", errors);
	}

	//
	// if compilation errors don't generate .htm and .js files
	//
	if (errors)	{
		//if (errs)					// {joj 1/7/08}
		//	*errs = errList;		// {joj 1/7/08}
		tidyUp();
		return 0;					// errors
	}

	//
	// create .htm file
	//
	// use ../www/vivio.js so there is only one copy of runtime {joj 28/10/16}
	//
	// TODO: find vivio.js
	//			
	QFile qF(vApp->htmPath);
	if (qF.open(QIODevice::WriteOnly | QIODevice::Text)) {
		QString fn = vApp->vivFn.left(vApp->vivFn.lastIndexOf('.'));	// {joj 24/10/16}
		fn = fn.replace("\\", "/");										// {joj 24/10/16}
		fn = fn.right(fn.length() - fn.lastIndexOf("/") - 1);			// {joj 24/10/16}
		qF.write("<!DOCTYPE html>\n\n");
		qF.write("<html>\n");
		qF.write("<head>\n");
		qF.write("\t<meta charset = \"utf-8\" />\n");
		qF.write("\t<title>VivioJS IDE</title>\n");
		qF.write(qPrintable("\t<script src = \"" + findVivioJS() + "\"></script>\n"));
		qF.write(qPrintable("\t<script src = \"" + fn + ".js\"></script>\n"));
		qF.write("</head>\n\n");
		qF.write("<body style = \"margin:0; padding:0\">\n\n");
		qF.write("<!--tabindex needed for keyboard input-->\n");
		qF.write("<canvas id = \"canvas\" tabindex = \"1\" style = \"width:100%; height:100%; position:absolute; overflow:hidden; display:block;\">\n");
		qF.write("\tNo canvas support\n");
		qF.write("</canvas>\n\n");
		qF.write("<script>\n");
		fn = fn.replace(' ', '_');	// module/function name
		qF.write(qPrintable("\tvplayer = new VPlayer(\"canvas\", " + fn + ");\n"));
		qF.write("</script>\n\n");
		qF.write("</body>\n");
		qF.write("</html>\n");
		qF.close();
	} else {
		infoWnd->vappend("Unable to create file \"%s\"\n", qPrintable(vApp->htmPath));
	}
	
	//
	// create .js file
	//
	qF.setFileName(vApp->jsPath);
	if (qF.open(QIODevice::WriteOnly | QIODevice::Text | QIODevice::Truncate)) {

		qF.write("\"use strict\"\n\n");
		qF.write("function ");
		QString fn = vivFn.left(vivFn.lastIndexOf('.'));			// {joj 24/10/16}
		fn = fn.replace("\\", "/");									// {joj 24/10/16}
		fn = fn.right(fn.length() - fn.lastIndexOf("/") - 1);		// {joj 24/10/16}
		qF.write(qPrintable(fn.replace(' ', '_')));					// {joj 25/8/16}
		qF.write("(vplayer) {\n\n");

		//
		// const imports
		//
		if (constImports.length()) {
			constImports.sort(Qt::CaseInsensitive);
			for (int i = 0; i < constImports.length(); i++)
				qF.write(QString("\tconst %0 = vplayer.%0\n").arg(constImports[i]).toLatin1());
			qF.write("\n");
		}

		//
		// var imports
		//
		if (varImports.length()) {
			varImports.sort(Qt::CaseInsensitive);
			for (int i = 0; i < varImports.length(); i++)
				qF.write(QString("\tvar %0 = vplayer.%0\n").arg(varImports[i]).toLatin1());
			qF.write("\n");
		}

		//
		// const declaration
		//
		if (constDefs.length()) {
			for (int i = 0; i < constDefs.length(); i++)
				qF.write(QString("\tconst %0\n").arg(constDefs[i]).toLatin1());
			qF.write("\n");
		}

		qF.write("\tvar $thread = 0\n");
		qF.write("\tvar $pc = 0\n");
		qF.write("\tvar $fp = -1\n");
		qF.write("\tvar $sp = -1\n");
		qF.write("\tvar $acc = 0\n");
		qF.write("\tvar $obj = 0\n");
		qF.write("\tvar $stack = 0\n\n");
		if (vApp->testFlag)
			qF.write("\tvar $testFlag = 1\n\n");

		qF.write("\tfunction callf(pc, obj) {\n");
		qF.write("\t\tif (obj === undefined)\n");
		qF.write("\t\t\tobj = 0\n");
		qF.write("\t\tlet l = arguments.length - 1\n");
		qF.write("\t\tfor (let i = l; i >= 2; i--)\n");
		qF.write("\t\t\t$stack[++$sp] = arguments[i]\n");
		qF.write("\t\t$acc = obj\n");
		qF.write("\t\t$stack[++$sp] = $pc + 1\n");
		qF.write("\t\t$pc = pc\n");
		qF.write("\t\treturn $acc\n");		// {joj 9/11/17}
		qF.write("\t}\n\n");

		qF.write("\tfunction enterf(n) {\t// n = # local variables\n");
		qF.write("\t\t$stack[++$sp] = $obj\n");
		qF.write("\t\t$stack[++$sp] = $fp\n");
		qF.write("\t\t$fp = $sp\n");
		qF.write("\t\t$obj = $acc\n");
		qF.write("\t\t$sp += n\n");
		qF.write("\t}\n\n");

		qF.write("\tfunction returnf(n) {\t// n = # parameters to pop\n");
		qF.write("\t\t$sp = $fp\n");
		qF.write("\t\t$fp = $stack[$sp--]\n");
		qF.write("\t\t$obj = $stack[$sp--]\n");
		qF.write("\t\t$pc = $stack[$sp--]\n");
		qF.write("\t\tif ($pc == -1) {\n");
		qF.write("\t\t\tterminateThread($thread)\n");
		qF.write("\t\t\t$thread = 0\n");
		qF.write("\t\t\treturn\n");
		qF.write("\t\t}\n");
		qF.write("\t\t$sp -= n\n");
		qF.write("\t}\n\n");

		qF.write("\tfunction suspendThread() {\n");
		qF.write("\t\tif ($thread == 0)\n");
		qF.write("\t\t\treturn 0;\n");
		qF.write("\t\t$thread.pc = $pc\n");
		qF.write("\t\t$thread.fp = $fp\n");
		qF.write("\t\t$thread.sp = $sp\n");
		qF.write("\t\t$thread.acc = $acc\n");
		qF.write("\t\t$thread.obj = $obj\n");
		qF.write("\t\treturn $thread\n");
		qF.write("\t}\n\n");

		qF.write("\tfunction waitTracker() {\n");
		qF.write("\t\t$pc++\n");
		//qF.write("\t\tsuspendThread();\n");
		qF.write("\t\treturn $thread\n");
		qF.write("\t}\n\n");

		qF.write("\tfunction resumeThread(toThread) {\n");
		qF.write("\t\t$pc = toThread.pc\n");
		qF.write("\t\t$fp = toThread.fp\n");
		qF.write("\t\t$sp = toThread.sp\n");
		qF.write("\t\t$acc = toThread.acc\n");
		qF.write("\t\t$obj = toThread.obj\n");
		qF.write("\t\t$stack = toThread.stack\n");
		qF.write("\t\t$thread = toThread\n");
		qF.write("\t}\n\n");

		qF.write("\tfunction switchToThread(toThread) {\n");
		qF.write("\t\tif ($thread == toThread)\n");
		qF.write("\t\t\treturn\n");
		qF.write("\t\tsuspendThread()\n");
		qF.write("\t\tresumeThread(toThread)\n");
		qF.write("\t}\n\n");

		qF.write("\tfunction wait(ticks, pc) {\n");
		qF.write("\t\t$pc = (pc === undefined) ? $pc + 1 : pc\n");
		qF.write("\t\tsuspendThread()\n");
		qF.write("\t\taddWaitToEventQ(ticks, $thread)\n");
		qF.write("\t\treturn 1\n");										// NEEDED {joj 24/9/17}
		qF.write("\t}\n");

		//
		// map case labels so they are in ascending order
		//
		QMap<int, int> label;
		caseLabel = 1;
		for (int j = 0; j < js[1].size(); j++) {
			for (int k = 0; k < js[1][j].size(); k++) {
				if (js[1][j][k].startsWith("££")) {
					int v = 0;
					int l = 2;
					while (js[1][j][k][l].isDigit()) {
						v = v * 10 + js[1][j][k][l].digitValue();
						l++;
					}
					label[v] = caseLabel;
					//js[1][j][k] = QString("case %0:%1").arg(caseLabel).arg(js[1][j][k].right(js[1][j][k].size() - l));
					js[1][j][k] = QString("case %0:").arg(caseLabel);
					caseLabel++;
				}
			}
		}

		//
		// output normal functions (CANWAIT == 0)
		// genJS can generate empty lines, easier to suppress here
		// remap labels on the fly
		//
		int tabs = 1;
		for (int j = 0; j < js[0].size(); j++) {
			qF.write("\n");	// empty line before each function
			for (int k = 0; k < js[0][j].size(); k++) {
				if (js[0][j][k].length() == 0)
					continue;
				int l = 0, ll, v;
				while (1) {
					if ((l = js[0][j][k].indexOf("££", l)) == -1)
						break;
					ll = l + 2;
					v = 0;
					while (js[0][j][k][ll].isDigit()) {
						v = v * 10 + js[0][j][k][ll].digitValue();
						ll++;
					}
					js[0][j][k].replace(l, ll - l, QString("%0").arg(label[v]));
					l = ll;
				}
				if (js[0][j][k].startsWith("}"))
					tabs--;
				for (int l = 0; l < tabs; l++)
					qF.write("\t");
				qF.write(QString("%0\n").arg(js[0][j][k]).toLatin1());
				if (js[0][j][k].endsWith("{"))
					tabs++;
			}
		}

		qF.write("\n");

		qF.write("\tfunction execute(thread) {\n\n");
		qF.write("\t\tswitchToThread(thread);\n\n");
		qF.write("\t\twhile (1) {\n");

		qF.write("\t\t\tswitch ($pc) {\n");
		qF.write("\t\t\tcase -1:\n");
		qF.write("\t\t\t\treturn;\t\t// catch thread termination\n");
		qF.write("\t\t\tcase 0:\n");
		qF.write("\t\t\t\tenterf(0);\t// started with a function call\n");
		
		//
		// output main + CANWAIT functions
		// genJS can generate empty lines, easier to suppress here
		// remap labels on the fly
		//
		tabs = 4;
		for (int j = 0; j < js[1].size(); j++) {
			for (int k = 0; k < js[1][j].size(); k++) {
				if (js[1][j][k].isEmpty())
					continue;
				int l = 0, ll, v;
				while (1) {
					if ((l = js[1][j][k].indexOf("££", l)) == -1)
						break;
					ll = l + 2;
					v = 0;
					while (js[1][j][k][ll].isDigit()) {
						v = v * 10 + js[1][j][k][ll].digitValue();
						ll++;
					}
					js[1][j][k].replace(l, ll - l, QString("%0").arg(label[v]));
					l = ll;	
				}
				if (js[1][j][k].startsWith("}"))
					tabs--;
				int b = js[1][j][k].startsWith("case");
				for (int l = 0; l < (b ? 3 : tabs); l++)
					qF.write("\t");
				qF.write(QString("%0\n").arg(js[1][j][k]).toLatin1());
				if (js[1][j][k].endsWith("{"))
					tabs++;
			}
		}

		qF.write("\t\t\t}\n");
		qF.write("\t\t}\n");
		qF.write("\t}\n\n");

		qF.write("\tthis.getThread = function() { return $thread; };\n");
		qF.write("\tthis.execute = execute;\n");
		qF.write("\tthis.resumeThread = resumeThread;\n");
		qF.write("\tthis.suspendThread = suspendThread;\n");
		qF.write("\tthis.waitTracker = waitTracker;\n\n");

		qF.write("}\n\n");
		qF.write("// eof\n");
		qF.close();

	} else {
		infoWnd->vappend("Unable to create file \"%s\"\n", qPrintable(vApp->jsPath));
	}

	tidyUp();
	return 1;

}

//
// findInScope (helper)
//
// set base to search base classes
//
Obj *Compiler::findInScope(int id, Obj *scope, int base) {
	Q_ASSERT(scope);
	Q_ASSERT((scope->objTyp == MethodObj) || (scope->objTyp == TypObj));
	Obj *obj = scope->members;
	int d;
	while (obj) {
		//TRACE(QString("findinScope: id=%0 obj->id=%1").arg(string[id]).arg(string[obj->id]));
		//infoWnd->append(qPrintable(QString("findinScope: id=%0 obj->id=%1\n").arg(string[id]).arg(string[obj->id])));
		if ((d = diff(id, obj->id)) == 0)
			return obj;
		obj = (d < 0) ? obj->left : obj->right;
	}
	if (base && scope->derivedFrom)
		return findInScope(id, scope->derivedFrom, base);
	return NULL;
}

//
// fullName	{joj 9/11/17}
//
QString Compiler::fullName(Obj *obj, Obj *scope) {
	QString qs;
	int dot = 0;
	while (obj != topScope) {
		qs.prepend(memberName(obj->id, scope, 0) + (dot ? ".prototype." : ""));
		dot = 1;
		obj = obj->parentScope;
	}
	return qs;
}

//
// memberName (helper)
//
// handle names that are overriden
//
QString Compiler::memberName(int id, Obj *scope, int baseOp) {
	if ((scope->objTyp == TypObj) && scope->derivedFrom) {
		//TRACE(QString("memberName: id=%0 scope->id=%1)").arg(string[id]).arg(string[scope->id]));
		Obj *r = scope;
		int inScope = 0, j = -1;
		while (r) {
			if (findInScope(id, r, 0)) {
				if (r == scope)
					inScope = 1;
				j++;
			}
			r = r->derivedFrom;
		}
		if (baseOp && inScope)
			j--;
		if (j) {
			return (new QString(j, '$') + string[id]);
		}
	}
	return string[id];
}

//
// find
//
// check function members (functions are not allowed to nest)
// check class and base class members including global variables
//
Obj* Compiler::find(int id, Obj *scope) {
	//TRACE(QString("find(id=%0 scope=%1)").arg(string[id]).arg(string[scope->id]));
	//infoWnd->append(qPrintable(QString("find(id=%0 scope=%1)\n").arg(string[id]).arg(string[scope->id])));
	Obj* obj = NULL;
	while (scope) {
		if (obj = findInScope(id, scope, 1))
			//if (!(obj->objType == VarObj && scope != topScope && obj->level == LOCAL))
				return obj;
		if (scope->objTyp == TypObj) {
			Obj* derivedFrom = scope->derivedFrom;
			while (derivedFrom) {
				if (obj = findInScope(id, derivedFrom, 1))
					return obj;
				derivedFrom = derivedFrom->derivedFrom;
			}
		}
		scope = scope->parentScope;
	}
	return obj;
}

//
// findScope
//
// check function members (functions are not allowed to nest)
// check class and base class members including global variables
//
Obj* Compiler::findScope(Obj *obj, Obj *scope) {
	Q_ASSERT(obj);
	while (scope) {
		if (findInScope(obj->id, scope, 1))
			return scope;
		scope = scope->parentScope;
	}
	return NULL;
}

//
// isDerivedFromGObj
//
int Compiler::isDerivedFromGObj(Obj *obj) {
	while (obj) {
		if (obj->flags & GOBJ)
			return 1;
		obj = obj->derivedFrom;
	}
	return 0;
}

//
// isDerivedFromGroup
//
int Compiler::isDerivedFromGroupObj(Obj *obj) {
	while (obj) {
		if (obj == groupTyp)
			return 1;
		obj = obj->derivedFrom;
	}
	return 0;
}

//
// findGroupObj
//
Obj* Compiler::findGroupObj(Obj *obj) {
	while (obj) {
		if (isDerivedFromGroupObj(obj))
			return obj;
		obj = obj->parentScope;
	}
	return NULL;
}

//
// funcCall
//
AST* Compiler::funcCall(AST *ast) {
	checkSym(lparSym, "( expected");
	if (checkSym(rparSym, 0))
		return ast;
	do {
		if (AST *a = expression()) 
			ast->arg.append(a);
	} while (checkSym(commaSym, 0));
	checkSym(rparSym, ") expected");
	return ast;
}

//
// selector
//
AST* Compiler::selector(AST *ast) {

	Q_ASSERT(ast->op == idAST || ast->op == baseAST || ast->op == thisAST || ast->op == callAST);

	int dotID, typID;

	while (1) {

		switch (sym) {

		case lbrakSym:
			getSym();
			if (ast->op != selectorAST) {
				ast = newAST(selectorAST, ast, newAST(indexAST, expression()));
			} else {
				ast->arg.append(newAST(indexAST, expression()));
			}
			checkSym(rbrakSym, "] expected");
			break;

		case dotSym:
			getSym();
			dotID = id;
			if (sym == idSym) {
				getSym();
				if (ast->op != selectorAST) {
					ast = newAST(selectorAST, ast, newAST(dotAST, dotID));
				} else {					
					ast->arg.append(newAST(dotAST, dotID));
				}
			//} else if ((sym >= eventEESym) && (sym <= eventMBSym)) {
			//	return ast;
			} else {
				pass1Error("identifier expected");
			}
			break;

		case lparSym:
			ast = funcCall(newAST(callAST, ast));	// {joj 25/8/16}
			break;

		default:
			return ast;				// {joj 19/8/16}

		}
	}

	return ast;
}

//
// formalParams
//
// first parameter at $stack[$fp-3], second at $stack[$fp-4], ...
// first local variable at $stack[$fp+1], second at $stack[$fp+2], ...
//
AST* Compiler::formalParams(AST *ast, Obj *func, int whenFlag) {

	int typID, varID;
	int n = 0;
	AST *constAst = NULL;
	Obj *obj;

	func->addr = -3;
	checkSym(lparSym, "( expected");
	if ((sym == numSym) || (sym == stringSym) || (sym == idSym)) {	// type
		while (1) {
			int byRef =  0;			// {joj 6/10/17}
			typID = id;
			if ((sym != numSym) && (sym != stringSym) && (sym != idSym))
				pass1Error("type expected");
			getSym();	
			int varID = n;
			if (sym == idSym) {
				varID = id;
				getSym();
			} else {
				varID = enter(QString("$%0").arg(n).toUtf8());
			}
			if (sym == assignRefSym) {	// {joj 24/10/17}
				byRef = BYREF;
				getSym();
			}

			obj = newObj(varID, VarObj);
			obj->level = LOCAL;	
			obj->addr = func->addr--;
			obj->typID = typID;
			obj->flags |= byRef;
			func->addParam(obj, 0, 0);

			AST *p = newAST(paramAST, typID, varID);
			p->arg.append((sym == lbrakSym) ? arrayDeclaration(obj, 1) : NULL);

			if (sym == assignSym) {
				if (byRef)
					pass1Error("cannot initialise a by ref parameter");
				getSym();
				if (sym == numConstSym) {
					constAst = newAST(numAST, num);
				} else if (sym == stringConstSym) {
					constAst = newAST(stringAST, id);
				} else {
					pass1Error("constant expected");
				}
				getSym();
				if (constAst) {
					func->flags |= HASPOPTIONAL;
					func->parameter.last()->ast = constAst;
					func->parameter.last()->flags |= POPTIONAL;	// { joj 3/10/17}
					p->arg.append(constAst);
					constAst = NULL;
				}
			}
			ast->arg.append(p);

			if (sym != commaSym)
				break;

			getSym();
			n++;
		}
	}
	func->addr = 1;
	checkSym(rparSym, ") expected");
	return ast;
}

//
// classDeclaration
//
// class X(...) {...};
// class X(...) extends Y(...) {...}
//
AST* Compiler::classDeclaration() {
	getSym(); // classSym
	int classID = id;
	checkSym(idSym, "identifier expected");
	AST *ast = newAST(classAST, classID);
	Obj *klass = findInScope(classID, topScope, 0);
	if (klass == NULL) {
		klass = newObj(classID, TypObj);
		klass->level = OBJECT;
		klass->typID = classID;
		klass->flags |= CONSTRUCTOR;
		if (topScope != globalScope)				// {joj 9/11/17}
			klass->flags |= INOBJECT;				// {joj 9/11/17}
		pushScope(klass);
		formalParams(ast, klass, 0);
		AST *initAST = NULL;
		if (sym == extendsSym) {
			getSym();
			klass->derivedFromID = ast->id1 = id;	// derivedFromID / baseID
			checkSym(idSym, "identifier expected");
			initAST = funcCall(newAST(callAST, newAST(idAST, ast->id1)));
			initAST->flags |= ASTINIT;
		}
		AST *blk = block();
		if (initAST)
			blk->arg.prepend(initAST);
		ast->arg.append(blk);
		popScope();
	} else {
		pass1Error(QString("duplicate class %0").arg(string[classID]));
	}
	return ast;
}

//
// functionDeclaration
//
AST* Compiler::functionDeclaration(int retID, int whenFlag) {
	AST *ast = NULL;
	
	if (topScope->objTyp == MethodObj)
		pass1Error("cannot declare a function within a function");

	int funcID;
	if (whenFlag) {
		funcID = enter(QString("$eh%0").arg(ehn++).toUtf8());
	} else {
		getSym();						// consume funcSy
		funcID = id;
		checkSym(idSym, "identifier expected");
	}

	ast = newAST(funcAST, funcID, retID);

	Obj *func = findInScope(funcID, topScope, 0);
	if (func == NULL) {
		func = newObj(funcID, MethodObj);
		func->level = LOCAL;
		func->typID = retID;
		if (topScope != globalScope)
			func->flags |= INOBJECT;
		pushScope(func);
		formalParams(ast, func, whenFlag);	// {joj 22/9/17}
		ast->arg.append(block());	// 
		popScope();
	} else {
		pass1Error(QString("duplicate identifier: %0").arg(string[funcID]));
	}
	
	return ast;
}

//
// ifStatement
//
AST* Compiler::ifStatement() {
	AST *ast = NULL;
	getSym();							// ifSym
	checkSym(lparSym, ") expected");
	ast = newAST(ifAST, expression());	// {joj 19/8/16}
	checkSym(rparSym, ") expected");
	ast->arg.append(statement());		// {joj 19/8/16}
	if (sym == elseSym) {				// {joj 29/1/10}
		getSym();
		ast->arg.append(statement());	// {joj 19/8/16}
	}
	return ast;
}

//
// whenStatement {joj 22/9/17}
//
// when setTPSEvent(num tps) { ... }					- global event
// when eventLB(num down, num x, num y) { ... }			- event for class or enclosing group
// when g.eventLB(num down, num x, num y) { ... }		- gObj event
//
AST* Compiler::whenStatement() {
	AST *ast = NULL;
	getSym();							// whenSym
	if (sym == idSym) {
		int gid = id;
		getSym();
		ast = selector(newAST(idAST, gid));
	}
	checkSym(firesSym, "~> expected");
	int eventID = id;
	checkSym(idSym, "event identifier expected");
	ast = newAST(whenAST, id, ast);
	ast->arg.append(functionDeclaration(numID, 1));
	return ast;
}

//
// checkSym
//
int Compiler::checkSym(Symbol sy, QString errMsg) {
	if (sym == sy) {
		getSym();
		return 1;
	}
	if (errMsg != 0)
		pass1Error(QString("%0 [%1]").arg(errMsg).arg(symToQString(sym)));
	return 0;
}

//
// factor
//
AST* Compiler::factor() {

	int funcID;
	AST *ast = NULL;

	switch (sym) {

	case baseSym:
		getSym();
		ast = selector(newAST(baseAST));
		break;

	case thisSym:
		getSym();
		ast = selector(newAST(thisAST));
		break;

	case idSym:
		funcID = id;
		if (sym1 == lparSym) {
			getSym();
			ast = funcCall(newAST(callAST, newAST(idAST, funcID)));
		} else {	
			ast = newAST(idAST, funcID);
			getSym();
		}
		ast = selector(ast);
		break;

	case numConstSym:
		ast = newAST(numAST, num);
		getSym();
		break;

	case stringConstSym:
		ast = newAST(stringAST, id);	// NB: do first to get correct string ID
		getSym();
		break;

	case lparSym:
		getSym();
		ast = expression();
		ast->flags |= ASTPRECEDENCE;
		checkSym(rparSym, "( expected");
		break;

	case undefinedSym:
		ast = newAST(undefinedAST);
		getSym();
		break;

	case semiSym: // ignore
		break;

	default:
		pass1Error(QString("unexpected symbol: %0").arg(symToQString(sym)));

	}
	return ast;
}

//
// unary operators
//
// !factor		{notSy}
// -factor
// ~factor		{invertSy}
// +factor
//
// ++factor		{pre-increment}
// --factor		{pre-decrement}
//
// factor++		{post-increment}
// factor--		{post-decrement}
//
AST* Compiler::unary() {

	AST *ast = NULL;
	switch (sym) {

	case notSym:		// !
		getSym();
		ast = newAST(notAST, factor());
		break;

	case minusSym:		// -
		getSym();
		ast = newAST(negAST, factor());
		break;

	case invertSym:		// ~
		getSym();
		ast = newAST(invertAST, factor());
		break;

	case addAddSym:		// ++
		getSym();
		ast = newAST(addaddAST, factor());
		break;

	case minusMinusSym:	// --
		getSym();
		ast = newAST(minusminusAST, factor());
		break;

	default:
		if (sym == addSym)
			getSym();
		ast = factor();
	}

	if (sym == addAddSym) {
		getSym();
		ast = newAST(addaddAST, ast);
		ast->flags |= ASTPOST;
	} else if (sym == minusMinusSym) {
		getSym();
		ast = newAST(minusminusAST, ast);
		ast->flags |= ASTPOST;
	}

	return ast;
}

//
// unary op unary
//
// * / % >> <<
//
AST* Compiler::expression6() {						// {joj 19/8/16}
	AST *ast = unary(), *z = NULL;					// {joj 19/8/16}
	ASTOp astOp;
	while ((sym >= mulSym) && (sym <= shlSym)) {
		astOp = symToASTOp[sym];
		getSym();
		if (z == NULL) {
			z = ast = newAST(astOp, ast, unary());
		} else {
			z = z->arg[1] = newAST(astOp, z->arg[1], unary());
		}
	}
	return ast;
}

//
// expression 5
//
// & + - ^ |
//
AST* Compiler::expression5() {						// {joj 19/8/16}
	AST *ast = expression6(), *z = NULL;			// {joj 19/8/16}
	ASTOp astOp;
	while ((sym >= andSym) && (sym <= orSym)) {
		astOp = symToASTOp[sym];
		getSym();
		if (z == NULL) {
			z = ast = newAST(astOp, ast, expression6());
		} else {
			z = z->arg[1] = newAST(astOp, z->arg[1], expression6());
		}
	}
	return ast;
}

//
// expression4
//
// == != < <= > >=
//
AST* Compiler::expression4() {
	AST *ast = expression5(), *z = NULL;
	ASTOp astOp;
	while ((sym >= eqlSym) && (sym <= geqSym)) {
		astOp = symToASTOp[sym];
		getSym();
		if (z == NULL) {
			z = ast = newAST(astOp, ast, expression5());
		}
		else {
			z = z->arg[1] = newAST(astOp, z->arg[1], expression5());
		}
	}
	return ast;
}

//
// expression3
//
// expression4 && expression4
//
AST* Compiler::expression3() {
	int c = 0;
	AST *ast = expression4();
	while (checkSym(candSym, 0)) {
		if (0 == c++)  {
			ast = newAST(candAST, ast, expression4());
		} else {
			ast->arg.append(expression4());
		}
	}
	return ast;
}

//
// expression2
//
// expression3 || expression3
//
AST* Compiler::expression2() {
	int c = 0;
	AST *ast = expression3();
	while (checkSym(corSym, 0)) {
		if (0 == c++) {
			ast = newAST(corAST, ast, expression3());
		} else {
			ast->arg.append(expression3());
		}
	}
	return ast;
}

//
// expression1
//
// expression2 [? expression1 : expression1]
//
AST* Compiler::expression1() {
	AST *ast = expression2();
	if (sym == qmarkSym) {
		getSym();
		ast = newAST(condExprAST, ast, expression1());
		checkSym(colonSym, ": expected");
		ast->arg.append(expression1());
	}
	return ast;
}

//
// expression
//
// expression1 {op expression1}
//
// = => += -= *= /= %= |= &= ^= >>= <<=
//
AST* Compiler::expression() {
	AST *ast = expression1(), *z = NULL;
	ASTOp astOp;
	while ((sym >= assignSym) && (sym <= shlEqlSym)) {
		astOp = symToASTOp[sym];
		getSym();
		if (z == NULL) {
			z = ast = newAST(astOp, ast, expression1());
		} else {
			z = z->arg[1] = newAST(astOp, z->arg[1], expression1());
		}
	}
	return ast;
}

//
// expressionList
//
AST* Compiler::expressionList() {
	AST *ast = expression();
	int cnt = 0;
	while (checkSym(commaSym, 0)) {
		if (cnt++) {
			ast->arg.append(expression());
		} else {
			ast = newAST(exprListAST, ast, expression());
		}
	}
	return ast;
}

//
// declarationOrExpressionList
//
AST* Compiler::declarationOrExpressionList() {
	AST *ast = declarationOrExpression();
	int cnt = 0;
	while (checkSym(commaSym, 0)) {
		if (cnt++) {
			ast->arg.append(declarationOrExpression());
		} else {
			ast = newAST(exprListAST, ast, declarationOrExpression());
		}
	}
	return ast;
}

//
// block {joj 29/1/10}
//
AST* Compiler::block() {
	AST *ast = newAST(blockAST), *stmnt = NULL;
	checkSym(lbraceSym, "{ expected");
	while ((sym != rbraceSym) && (sym != eofSym)) {
		if (stmnt = statement())
			ast->arg.append(stmnt);
	} 
	checkSym(rbraceSym, "} expected");	
	return ast;
}

//
// constDeclaration
//
AST* Compiler::constDeclaration() {

	AST *ast = NULL;
	Obj *obj;

	getSym(); // const
	int typID = id;
	getSym(); // type

	ast = newAST((topScope == globalScope) ? constAST : varAST, typID);	// {joj 24/10/17}

	while (1) {

		int varID = id;

		if (checkSym(idSym, "type and identifier expected") == 0)
			break;

		if (findInScope(varID, topScope, 0)) {
			pass1Error(QString("duplicate identifier: %0").arg(string[varID]));
			break;
		}

		ast->arg.append(newAST(idAST, varID));

		checkSym(assignSym, "= expected");

		obj = newObj(varID, VarObj);
		if (topScope == globalScope) {
			obj->flags |= CONSTANT;
			ast->arg.append(expression());
		} else {
			obj->level = topScope->level;
			obj->addr = topScope->addr++;
			ast->arg.append(NULL);	// no indices
			ast->arg.append(expression());
			ast->flags |= (obj->level == OBJECT) ? ASTOBJECT : (obj->level == LOCAL) ? ASTLOCAL : 0;
		}
		obj->typID = typID;

		if (checkSym(commaSym, 0) == 0)
			break;

	}

	return ast;

}

//
// newArrayObj - helper
//
Obj *Compiler::newArrayObj(int typID, int flags) {
	Obj *obj = new Obj(0, VarObj);
	obj->typID = typID;
	obj->flags |= flags;
	return obj;
}

//
// arrayDeclaration {joj 20/9/17}
//
// n dimensional array uses typPtr to create VarObj -> VarObj -> VarObj -> typeID structure
// formalParam indicates called from formalParams otherise varDeclaration
//
AST* Compiler::arrayDeclaration(Obj *obj, int formalParam) {
	AST *ast;
	int b;
	getSym(); // "["
	if ((sym == numSym) || (sym == stringSym)) {
		b = 1;	// associative array
		ast = newAST(typListAST);
		ast->arg.append(newAST(idAST, id));
		getSym();
	} else {
		b = 0;	// fixed size or dynamic array
		ast = newAST(exprListAST);
		ast->arg.append(formalParam ? NULL : expression());
	}
	obj->flags |= (ARRAY | (b ? AARRAY : 0));	// {joj 21/9/17}
	if (checkSym(rbrakSym, "] expected")) {
		Obj *arrayObj = obj;
		while (checkSym(lbrakSym,0)) {
			if (b) {
				if ((sym == numSym) || (sym == stringSym)) {
					ast->arg.append(newAST(idAST, id));
					getSym();
				} else {
					pass1Error(QString("num or string expression expected: %0").arg(string[id]));
				}
			} else {
				ast->arg.append(formalParam ? NULL : expression());
			}
			arrayObj->flags |= VALIDTYPPTR;
			arrayObj->typPtr = newArrayObj(arrayObj->typID, ARRAY | (b ? AARRAY : 0));	// {joj 21/9/17}
			arrayObj = arrayObj->typPtr;
			checkSym(rbrakSym, "] expected");
		}
	}
	return ast;
}

//
// arrayInit {joj 28/7/17}
//
AST* Compiler::arrayInit(int nd) {
	AST *ast = newAST(initAST);
	if (checkSym(lbrakSym, "[ expected")) {
		while (1) {
			if (sym == lbrakSym) {
				ast->arg.append(arrayInit(nd - 1));
			} else {
				if (sym == rbrakSym)
					break;
				ast->arg.append(expression());
				if (checkSym(commaSym, 0) == 0)
					break;
			}
		}
		checkSym(rbrakSym, "] expected");
	}
	return ast;
}

//
// varDeclaration
//
// num v0 = 0, v1 = 1, v2;				// variables
// num a0[3][4][n];						// array [indices must be integers]
// num a1[2][2] = [[0, 1] [ 2, 3]];		// initialised array
// num aa[num][string];					// associative array [indices must be num or string]
//
// ref num v = ref a;
//
AST* Compiler::varDeclaration() {
	
	AST *ast = NULL;
	AST *ast1;	// array indices
	Obj *obj;

	int typID = id;
	getSym(); // type

	ast = newAST(varAST, typID);		// {joj 24/10/17}

	while (1) {

		int ref = 0;
		int varID = id;
		if (checkSym(idSym, "identifier expected") == 0)
			break;

		if (obj = findInScope(varID, topScope, 0)) {
			pass1Error(QString("duplicate identifier [%0]").arg(string[varID]));
			break;
		}

		if (sym == assignRefSym) {
			ref = 1;
			getSym();
		}

		obj = newObj(varID, VarObj);
		obj->level = topScope->level;
		obj->addr = topScope->addr++;
		obj->typID = typID;
		obj->flags |= ref ? BYREF : 0;
		
		ast->flags |= (obj->level == OBJECT) ? ASTOBJECT : (obj->level == LOCAL) ? ASTLOCAL : 0;
		ast->arg.append(newAST(idAST, varID));	// id

		if (sym == lbrakSym) {
			ast->arg.append(arrayDeclaration(obj, 0));
			ast->arg.append(checkSym(assignSym, 0) ? arrayInit(0) : NULL);
		} else if (sym == assignSym) {
			getSym(); // =
			ast->arg.append(NULL);
			ast->arg.append(expression());
		} else if (ref && (sym != commaSym) && (sym != semiSym)) {	// {joj 20/10/17}
			ast->arg.append(NULL);									// {joj 20/10/17}
			ast->arg.append(newAST(assignRefAST, factor()));		// selector?? {joj 20/10/17}
		} else {
			ast->arg.append(NULL);
			ast->arg.append(NULL);
		}
		if (checkSym(commaSym, 0) == 0)
			break;

	}

	return ast;

}

//
// declarationOrExpression
//
AST* Compiler::declarationOrExpression() {

	AST* ast = NULL;
	int funcID;

L:

	switch (sym) {

	case numConstSym:
	case stringConstSym:
		ast = expression();
		break;

	case numSym:
	case stringSym:
		ast = varDeclaration();
		break;

	case constSym:
		ast = constDeclaration();
		break;

	case idSym:
		//if (sym1 == lparSym) {
		//	funcID = id;
		//	getSym();
		//	ast = funcCall(newAST(callAST, newAST(idAST, funcID)));
		//} else if (sym1 == idSym) {
		if (sym1 == idSym) {			// {joj 15/11/17}
			ast = varDeclaration();
		} else {
			ast = expression();
		}
		break;

	case eofSym:				// {joj 3/5/15}
		break;

	default:
		pass1Error(QString("unexpected symbol: %0").arg(symToQString(sym)));
		getSym();
		break;

	}

	return ast;					// {joj 19/8/16}

}

//
// declarationOrStatement
//
AST* Compiler::declarationOrStatement() {

	AST* ast = NULL;
	int funcID;

L:

	switch (sym) {

	case numConstSym:
	case stringConstSym:
	case addAddSym:			//	{joj 6/10/17}
	case minusMinusSym:		//	{joj 6/10/17}
		ast = expression();
		checkSym(semiSym, "; expected");
		break;

	case numSym:
	case stringSym:
		if (sym1 == funcSym) {
			int retID = id;
			getSym();
			ast = functionDeclaration(retID, 0);
		} else {
			ast = varDeclaration();
		}
		break;

	case breakSym:
		getSym();
		ast = newAST(breakAST);	// TODO: check if within a loop
		checkSym(semiSym, "; expected");
		break;

	case continueSym:
		getSym();
		ast = newAST(continueAST);	// TODO: check if within a loop
		checkSym(semiSym, "; expected");
		break;

	//case staticSym:
	case constSym:
		ast = constDeclaration();
		break;

	case idSym:
		if (sym1 == lparSym) {
			funcID = id;
			getSym();
			ast = funcCall(newAST(callAST, newAST(idAST, funcID)));
		} else if (sym1 == funcSym) {
			int retID = id;
			getSym();
			ast = functionDeclaration(retID, 0);
		//} else if (sym1 == idSym) {
		//	ast = varDeclaration();
		} else {
			ast = declarationOrExpressionList();
		}
		break;

	//case continueSym:
	//	getSym();
	//	if (loops.isEmpty()) {
	//		error(17);		// continue not within a for, foreach or while statement
	//	} else {
	//		genJF(&loops.back()->continueChain);
	//	}
	//	checkSym(semiSym, 26);	// ; expected {joj 29/1/10}
	//	break;

	case forSym:
		ast = forStatement();
		break;

	case foreachSym:
		ast = foreachStatement();
		break;

	case funcSym:
		ast = functionDeclaration(0, 0);	// no result
		break;

	case ifSym:
		ast = ifStatement();
		break;

	case includeSym:
		includeStatement();
		goto L;

	case classSym:
		ast = classDeclaration();
		break;
	
	case returnSym:
		ast = returnStatement();
		checkSym(semiSym, "; expected");
		break;

	case whileSym:
		ast = whileStatement();
		break;

	case doSym:
		ast = doWhileStatement();
		break;

	case whenSym:
		ast = whenStatement();		//{joj 22/9/17}
		break;

	case semiSym:	// empty statement
		getSym();	// consume ;
		break;

	case lbraceSym:
		ast = block();
		break;

	case baseSym:					// {joj 3/11/17}
		ast = expressionList();		// {joj 3/11/17}
		break;						// {joj 3/11/17}

	case eofSym:					// {joj 3/5/15}
		break;

	default:
		pass1Error(QString("unexpected symbol: %0").arg(symToQString(sym)));
		getSym();
		break;

	}

	//checkSym(semiSym, "; expected");
	//if (sym == semiSym)			// {joj 14/9/16}
	//	getSym();					// messes up ; in for statement

	return ast;					// {joj 19/8/16}

}

//
// statement
//
AST* Compiler::statement() {
	return declarationOrStatement();
}

//
// program {joj 29/1/10}
//
AST* Compiler::program() {
	//
	// handle pragma directive - must be at start of file {joj 11/10/07}
	//
	//if (sym == pragmaSym) {
	//	getSym();
	//	while (sym == identSym) {
	//		if (cmpIdentifier("noanimation") == 0) {
	//			pragma |= VCODE_NOANIMATION;
	//		}
	//		else if (cmpIdentifier("noreverse") == 0) {
	//			pragma |= VCODE_NOREVERSE;
	//		}
	//		else if (cmpIdentifier("checkarraybounds") == 0) {
	//			pragma |= VCODE_CHECKBOUNDS;
	//		}
	//		else {
	//			error(83); // #pragma directive NOANIMATION or NOREVERSE or ARRAYINDEXCHECKS expected
	//		}
	//		getSym();
	//		if (sym != commaSym)
	//			break;
	//		getSym();					// eat the comma
	//		getSym();
	//	}
	//}
	//while (statement(whenScope, 1));
	
	AST *ast = newAST(progAST);
	while (sym != eofSym) {
		if (AST *a = declarationOrStatement())
			ast->arg.append(a);
		checkSym(semiSym, 0);
	}
	return ast;
}

void Compiler::pushFileState() {
	FileState *fs = new FileState();
	fs->srcFileNo = srcFileNo;
	fs->endOfFilePtr = endOfFilePtr;
	fs->linePtr = linePtr;
	fs->chPtr = chPtr;
	fs->line1 = line1;
	fileState.prepend(fs);
}

void Compiler::popFileState() {
	FileState *fs = fileState.takeFirst();
	srcFileNo = fs->srcFileNo;
	endOfFilePtr = fs->endOfFilePtr;
	linePtr = fs->linePtr;
	chPtr = fs->chPtr;
	line1 = fs->line1;
}

//
// includeWorker
//
// return 1 on success
//
int Compiler::includeWorker(QString vinFn) {

	//TRACE(QString("#include %1\n").arg(vinFn));

	QFile qVinFile(vinFn);
	if (qVinFile.open(QIODevice::ReadOnly | QIODevice::Text) == 0)
		return 0;

	pushFileState();

	srcFileNo = srcFileName.count();
	srcFileName.append(vinFn);											// {joj 20/10/10}
	qint64 sz = qVinFile.size();
	srcFileBuf.append((char*) malloc(sz));
	qVinFile.read(srcFileBuf[srcFileNo], sz);
	qVinFile.close();

	line1 = 1;															// {joj 5/9/16}
	linePtr1 = chPtr = endOfFilePtr = srcFileBuf[srcFileNo];			// initialise chPtr and linePtr
	endFileBuf.append(endOfFilePtr += sz);								// {joj 5/9/16}
	getSym();															// get first sym
	getSym();															//

	return 1;

}

//
//	include statement
//
//	open file relative to source file directory
//	open file relative to Vivio include directories (eg. C:\Vivio\include)
//
void Compiler::includeStatement() {

	if (sym1 != stringConstSym) {
		pass1Error("filename expected");
		getSym();
		return;
	}

	//
	// check current directory
	//
	QString incFn = string[id1];
	QString dir = srcFileName[0];
	dir = dir.left(dir.lastIndexOf("/"));

	if (includeWorker(dir + "/" + incFn))
		return;

	//
	// check directories in path
	//
	if (vApp->vivioPath.count()) {
		int n = 0;
		while (1) {
			dir = vApp->vivioPath.section(";", n, n);
			if (dir.count() == 0)
				break;
			if (includeWorker(dir + "/" + incFn))
				return;
			n++;
		}
	}

	pass1Error(QString("unable to open file: \"%0\"").arg(string[id1]));
	getSym();	// includeSym
	getSym();	// stringConstSym

}

//
// whileStatement
//
AST* Compiler::whileStatement() {
	AST *ast = newAST(whileAST);
	getSym(); // while
	checkSym(lparSym, "( expected");
	ast->arg.append(declarationOrExpressionList());
	checkSym(rparSym, ") expected");
	ast->arg.append(statement());
	return ast;
}

//
// doWhileStatement
//
AST* Compiler::doWhileStatement() {
	getSym(); // doSym
	AST *ast = newAST(doAST, statement());
	getSym();
	checkSym(lparSym, "( expected");
	ast->arg.append(expression());
	checkSym(rparSym, ") expected");
	ast->arg.append(statement());
	return ast;
}

//
// forStatement
//
AST* Compiler::forStatement() {
	AST *ast = newAST(forAST);
	getSym(); // for
	checkSym(lparSym, "( expected");
	ast->arg.append(sym == semiSym ? NULL : declarationOrExpressionList());
	checkSym(semiSym, "; expected");
	ast->arg.append(sym == semiSym ? NULL : expression());
	checkSym(semiSym, "; expected");
	ast->arg.append(sym == rparSym ? NULL : expressionList());
	checkSym(rparSym, ") expected");
	ast->arg.append(statement());
	return ast;
}

//
// foreachStatement
//
AST* Compiler::foreachStatement() {
	AST *ast = newAST(foreachAST);
	getSym(); // for
	checkSym(lparSym, "( expected");
	ast->arg.append(declarationOrExpression());
	checkSym(inSym, "in expected");
	if (sym == idSym) {									// NEEDS FIXING {joj 4/8/17}
		ast->arg.append(selector(newAST(idAST, id)));	// NEEDS FIXING {joj 4/8/17}
		getSym();										// NEEDS FIXING {joj 4/8/17}
	}	
	checkSym(rparSym, ") expected");
	ast->arg.append(statement());
	return ast;
}

//
// returnStatement
//
AST* Compiler::returnStatement() {
	getSym();	// consume returnSy
	return newAST(returnAST, expression());
}

//
// resolveTyp
//
// if obj->objTyp == ExprObj VALIDTYPTR set
//
Obj* Compiler::resolveTyp(AST *ast, Obj* obj, Obj *scope) {
	if (obj == 0)		// {joj 17/17/17}
		return obj;		// {joj 17/17/17}
	Q_ASSERT(obj->objTyp != BlockObj);
	if (obj->objTyp == TypObj)
		return obj;
	if (obj->objTyp == RefObj)
		obj = obj->typPtr;
	if (obj->flags & VALIDTYPPTR)
		return obj->typPtr;
	obj->flags |= VALIDTYPPTR;
	if ((obj->objTyp == MethodObj) && (obj->typID == 0))	// {joj 17/11/17}
		return NULL;										// {joj 17/11/17}
	if (Obj *typ = find(obj->typID, scope)) {
		if (typ->objTyp == TypObj) {
			obj->typPtr = typ;
			return typ;
		} else {
			pass2Error(ast, QString("type expected [%0]").arg(string[obj->typID]));
		}
	} else {
		pass2Error(ast, QString("unknown type %0").arg(string[obj->typID]));
	}
	obj->typPtr = numTyp;	// default
	return numTyp;			// default
}

//
// compatible {26/9/17}
//
int Compiler::compatible(AST *ast, Obj *left, Obj*right, Obj *scope) {
	if ((left == NULL) || (right == NULL))
		return 0;
	if ((right == zeroExpr) || (right == undefinedExpr))
		return 1;
	if (right->objTyp == ExprObj)
		right = right->typPtr;
	//if ((right->flags & ARRAY) != (left->flags & ARRAY))
	//	return 0;
	Obj *leftTyp = resolveTyp(ast, left, scope);
	Obj *rightTyp = resolveTyp(ast, right, scope);
	if ((leftTyp == voidTyp) || (rightTyp == voidTyp))
		return 1;
	while ((leftTyp->flags & ARRAY) && (rightTyp->flags & ARRAY)) {	// check arrays are compatible
		if ((leftTyp->flags & VALIDTYPPTR) == 0)
			resolveTyp(ast, leftTyp, scope);
		if ((rightTyp->flags & VALIDTYPPTR) == 0)
			resolveTyp(ast, rightTyp, scope);
		leftTyp = leftTyp->typPtr;
		rightTyp = rightTyp->typPtr;
	}
	return rightTyp->isDerivedFrom(leftTyp);	// {joj 17/11/17}
}

//
// compatibleBinOp
//
Obj* Compiler::compatibleBinOp(int op, Obj *left, Obj*right, Obj *scope) {
	if ((left == NULL) || (right == NULL))
		return NULL;
	if ((left->objTyp != TypObj) && (left->objTyp != VarObj) && (left->objTyp != ExprObj))
		return NULL;
	if ((right->objTyp != TypObj) && (right->objTyp != VarObj) && (right->objTyp != ExprObj))
		return NULL;
	Obj *leftTyp = resolveTyp(NULL, left, scope);
	Obj *rightTyp = resolveTyp(NULL, right, scope);
	if ((leftTyp == numTyp) && (rightTyp == numTyp))
		return numExpr;
	if ((op == addAST) && (leftTyp == stringTyp) && (rightTyp == stringTyp))
		return stringExpr;
	if (((op == lessAST) || (op == leqAST) || (op == grtAST) || (op == geqAST)) && (leftTyp == stringTyp) && (rightTyp == stringTyp))
		return numExpr;
	if ((op == eqlAST) || (op == neqAST))
		return numExpr;
	return NULL;
}

//
// assignmentCompatible
//
//
int Compiler::assignmentCompatible(AST *ast, Obj *left, Obj *right, Obj *scope) {
	if ((left == NULL) || (right == NULL))
		return 0;
	if ((left->objTyp != VarObj) || (left->flags & CONSTANT))
		return 0;
	return compatible(ast, left, right, scope);
}


//
// determineCanWaitFuncs
//
void Compiler::determineCanWaitFuncs() {
	//TRACE("determineCanWaitFuncs");
	int changed;
	do {
		changed = 0;
		for (int i = 0; i < func.size(); i++) {
			//TRACE(QString("func[%0] %1 CANWAIT==%2").arg(i).arg(string[func[i]->id]).arg(func[i]->flags & CANWAIT ? 1 : 0));
			if (func[i]->flags & CANWAIT)
				continue;
			for (int j = 0; j < func[i]->calls.size(); j++) {
				//TRACE(QString("\tcall[%0] %1").arg(j).arg(string[func[i]->calls[j]->id]));
				if (func[i]->calls[j]->flags & CANWAIT) {
					//TRACE(QString("\t\tfunc %0 CANWAIT=1").arg(string[func[i]->id]));
					func[i]->flags |= CANWAIT;
					changed = 1;
					break;
				}
			}
		}
	} while (changed);
}

//
// checkCanWaitFuncs (return 1 if OK)
//
int Compiler::checkCanWaitFuncs() {
	//TRACE("checkCanWaitFuncs");
	int r = 1;
	for (int i = 0; i < func.size(); i++) {
		if ((func[i]->flags & CANWAIT) && (func[i]->typID != 0)) {
			pass2Error(NULL, QString("%0 is a \"wait\" function and cannot return a result (not yet implemented)").arg(string[func[i]->id]));
			r = 0;
		}
	}
	return r;
}

//
// eval (pass2)
//
// semantic analysis
//
// all type, variable and method names have been entered into symbol table, but all are
// defined in terms of a typeID rataher than a pointer to the dtat structure.
// this is because typpes can be defined or redefine in later code.
// these are resolved in pass2
//
// handles errors here so that error checking is unnecessary when generating code (genJS)
// returns NULL on error
//
Obj* Compiler::eval(AST *ast, Obj *scope) {

	if (ast == NULL)		// {joj 1/8/17}
		return NULL;		// {joj 1/8/17}

	//TRACE(QString("eval: ast->op: %0").arg(astToStr[ast->op]));

	Obj *obj = NULL, *typ = NULL, *v = NULL;
	Obj *left, *right;
	Obj *r = NULL;	// default
	int i, n;

	switch (ast->op) {

	case numAST:
		r = (ast->num == 0) ? zeroExpr : numExpr;
		break;

	case stringAST:
		r = stringExpr;
		break;

	// id0:typeID
	case idAST:
		if (r = find(ast->id0, scope)) {									// {joj 19/9/17}
			resolveTyp(ast, r, scope);
			if (r->flags & BYREF) {											// {joj 6/10/17}
				TRACE(QString("idAST %0").arg(string[ast->id0]));			// {joj 6/10/17}
				ast->flags |= ASTBYREF;										// {joj 6/10/17}
			}																// {joj 6/10/17}
			ast->r = r;														// remember {joj 10/11/17}
			break;
		}
		pass2Error(ast, QString("unknown identifier %0").arg(string[ast->id0]));
		break;

	// id0:typeID [arg[0]:idAST arg[1]:]*
	case constAST: // variable can only be assigned once
		if (typ = find(ast->id0, scope)) {	// {joj 24/10/17}
			if (typ->objTyp == TypObj) {
				for (int i = 0, v = 0; i < ast->arg.size(); i += 2) {	// {joj 24/10/17}
					if (compatible(ast, typ, eval(ast->arg[i + 1], scope), scope) == NULL)
						pass2Error(ast, "assignment between incompatible types");
				}
			} else {
				pass2Error(ast, QString("type expected [%0]").arg(string[ast->arg[0]->id0]));
			}
		} else {
			pass2Error(ast, QString("unknown type %0").arg(string[ast->arg[0]->id0]));
		}
		break;

	// id0:typeID [arg[0]:idAST arg[1]:indices arg[2]:init]*
	case varAST:
		typ = find(ast->id0, scope);	// type {joj 24/10/17}
		if ((typ == NULL) || (typ->objTyp != TypObj)) {
			pass2Error(ast, QString("type expected [%0]").arg(string[ast->id0]));
			break;
		}
		n = 0;
		while (n < ast->arg.length()) { // in triples <id, indices, init>
			v = find(ast->arg[n]->id0, scope);	// id
			if ((v == NULL) || (v->objTyp != VarObj)) {	// {joj 31/7/17 FIX}
				pass2Error(ast, QString("identifier expected: %0").arg(string[ast->arg[1]->id0]));
				break;
			}
			if (ast->arg[n + 1]) { // array
				// TOFIX check compatibility
				Q_ASSERT(ast->arg[n + 1]->op == exprListAST || ast->arg[n + 1]->op == typListAST);
				if (ast->arg[n + 1]->op == exprListAST) {
					AST *ast1 = ast->arg[n+1];
					for (int i = 0; i < ast1->arg.length(); i++) {
						if (ast1->arg[i]) {
							Obj *indx = eval(ast1->arg[i], scope);				// {joj 4/11/17}
							if ((indx == NULL) || (indx->typPtr != numTyp))		// {joj 4/11/17}
								pass2Error(ast, "num expression expected");
						}
					}
				}
			} else if (ast->arg[n + 2] && (assignmentCompatible(ast, v, eval(ast->arg[n + 2], scope), scope) == 0)) {				// joj 5/9/17}
				pass2Error(ast, "assignment between incompatible types");
			} else if ((typ == stringTyp) && (ast->arg[n+2] == NULL) && (v->objTyp == VarObj) && ((v->flags & ARRAY) == 0)) {		// initialise strings {joj 31/07/17}
				ast->arg[n+2] = newAST(stringAST, enter(""));
			}
			n += 3;
		}
		break;

	case initAST:
		TRACE("TODO: eval initAST");
		for (int i = 0; i < ast->arg.length(); i++)
			r = eval(ast->arg[i], scope);
		break;

	// arg[0]:idAST arg[1]:parameter1 arg[2]:parameter2 ...
	case callAST:
		if (r = obj = eval(ast->arg[0], scope)) {

			if (obj->flags & FORKF)	{			// fork(f) treated as a special case
				if ((ast->arg.size() == 2) && (ast->arg[1]->op == callAST)) {
					ast->arg[1]->flags |= ASTFORKF;
				} else {		
					pass2Error(ast, QString("fork function parameter expected"));
				}
			}

			if ((obj->objTyp == MethodObj) || ((obj->objTyp == TypObj) && (obj->flags & CONSTRUCTOR))) {	// {joj 29/8/17}
				if ((obj->flags & CONSTRUCTOR) && ((ast->flags & ASTINIT) == 0))
					ast->flags |= ASTCONSTRUCTOR;
				if (obj->objTyp == MethodObj)					// function result
					r = newExpr(resolveTyp(ast, obj, scope));	// {joj 20/9/17}
				int sz = obj->parameter.size();
				for (int i = 1; i < ast->arg.length(); i++) {	// check parameters
					if ((i - 1) >= sz) {
						if (obj->flags & OPTARG_ANY) {
							eval(ast->arg[i], scope);			// no check
						} else if (obj->flags & OPTARG_NUM) {
							if (compatible(ast, eval(ast->arg[i], scope), numTyp, scope) == 0)
								pass2Error(ast, QString("parameter %0: num expected").arg(i - 1));
						} else {
							pass2Error(ast, QString("passing more than %0 parameter%1 to function %2").arg(sz).arg(sz == 1 ? "" : "s").arg(string[obj->id]));	// {joj 3/10/17}
							break;
						}
					} else {
						if (v = eval(ast->arg[i], scope)) {
							if (obj->parameter[i - 1]->varObj->flags & BYREF) {										// {joj 6/10/17}	TEMPORARY FIX
								ast->arg[i]->flags |= ASTPASSBYREF;													// {joj 6/10/17}
								if (ast->arg[i]->op == idAST) {														// {joj 8/10/17}
									if ((scope->objTyp == MethodObj) && findInScope(ast->arg[i]->id0, scope, 0))	// if method variable passed by reference, mark method as CANWAIT so
										scope->flags |= CANWAIT;													// stack index can be passed as the address
								}																					// {joj 8/10/17}
							}																						// {joj 6/10/17}
							if (compatible(ast, obj->parameter[i - 1]->varObj, v, scope) == 0)
								pass2Error(ast, QString("parameter %0: %1%2 expected [%3]").arg(i).arg(obj->parameter[i - 1]->varObj->flags & ARRAY ? "array of " : "").arg(string[obj->parameter[i - 1]->varObj->typPtr->id]).arg(string[v->id]));	// {joj 17/11/17}
							if ((obj->parameter[i - 1]->flags & CANWAIT) && !((ast->arg[i]->op == numAST) && (ast->arg[i]->num == 0))) {	// {joj 24/9/17}
								scope->flags |= CANWAIT;
								ast->flags |= ASTCANWAIT;
							}
						}
					}
				}
				int minNoOfParameters = 0;																																					// {joj 3/10/17}
				while ((minNoOfParameters < sz) && ((obj->parameter[minNoOfParameters]->flags & POPTIONAL) == 0))																			// {joj 3/10/17}
					minNoOfParameters++;																																					// {joj 3/10/17}
				if ((ast->arg.length() - 1) < minNoOfParameters)																															// {joj 3/10/17}
					pass2Error(ast, QString("%0%1 parameter%2 expected").arg(sz > minNoOfParameters ? "minimum of " : "").arg(minNoOfParameters).arg(minNoOfParameters == 1 ? "" : "s"));	// {joj 4/10/17}
				if (obj->flags & WAITF) {	// wait(ticks) treated separately
					scope->flags |= CANWAIT;
					ast->flags |= ASTCANWAIT;
				} else if (((obj->flags & BUILTINMETHOD) == 0) && ((ast->flags & ASTFORKF) == 0) && (scope->calls.contains(obj) == 0)) {
					scope->calls += obj;
				}
			} else {
				pass2Error(ast, QString("function or constructor expected [%0]").arg(string[obj->id]));
			}
		} else {
			pass2Error(ast, QString("unknown function: %0()").arg(string[ast->arg[0]->id0]));
		}
		break;

	case assignAST:
		if (r = eval(ast->arg[0], scope)) {
			if (assignmentCompatible(ast, r, eval(ast->arg[1], scope), scope) == 0) {
				pass2Error(ast, r->flags & CONSTANT ? QString("constant variable %0 already intitialised").arg(string[r->id]) : "assigning incompatible operands");
			}
		} else {
			pass2Error(ast, "variable selector expected");
		}
		break;

	case addEqlAST:
	case minusEqlAST:
	case mulEqlAST:
	case divEqlAST:
	case modEqlAST:
	case orEqlAST:
	case andEqlAST:
	case xorEqlAST:
	case shrEqlAST:
	case shlEqlAST:
		r = eval(ast->arg[0], scope);
		if (compatible(ast, r, eval(ast->arg[1], scope), scope) == 0)
			pass2Error(ast, "assignment operation between incompatible types");
		break;

	case andAST:
	case addAST:
	case minusAST:
	case xorAST:
	case orAST:
	case mulAST:
	case divAST:
	case modAST:
	case shrAST:
	case shlAST:
	case eqlAST:
	case neqAST:
	case lessAST:
	case leqAST:
	case grtAST:
	case geqAST:
		left = eval(ast->arg[0], scope);
		right = eval(ast->arg[1], scope);
		if ((r = compatibleBinOp(ast->op, left, right, scope)) == NULL)
			pass2Error(ast, QString("incompatible operands for binary operator %0").arg(astToStr[ast->op]));
		break;

	case candAST:
	case corAST:
		for (int i = 0; i < ast->arg.size(); i++)
			eval(ast->arg[i], scope);
		r = numExpr;
		break;

	case selectorAST: {

		if ((r = eval(ast->arg[0], scope)) == NULL)
			break;
		if ((r->objTyp != VarObj) && (r->objTyp != ExprObj)) {																// {joj 3/11/17}
			pass2Error(ast, "selector expected");																			// {joj 3/11/17}
		}																													// {joj 3/11/17}
		i = 1;
		while (i < ast->arg.size()) {
			if (ast->arg[i]->op == dotAST) {
				Obj *os = resolveTyp(ast, r, scope);																		// {joj 21/9/17}
				Obj *o0 = os;
				while (o0->derivedFromID && o0->derivedFrom == NULL) {
					Obj *o1 = find(o0->derivedFromID, os);
					if (o1 && o1->objTyp == TypObj) {
						o0->derivedFrom = o1;
					} else {
						pass2Error(ast, QString("derived from unknown class %0").arg(string[o0->derivedFromID]));
						break;
					}
					o0 = o0->derivedFrom;
				}
				if ((r = findInScope(ast->arg[i]->id0, os, 1)) == NULL) {													// {joj 21/9/17}
					pass2Error(ast, QString("unknown object member %0").arg(string[ast->arg[i]->id0]));
					break;																									// {joj 27/7/17}
				}
			} else if (ast->arg[i]->op == indexAST) {
				if (r->flags & ARRAY) {																						// {joj 21/9/17}
					if (v = eval(ast->arg[i]->arg[0], scope)) {																// {joj 6/10/17}
						typ = resolveTyp(ast, v, scope);																	// {joj 26/9/17}
						if ((typ != numTyp && typ != stringTyp)) {															// {joj 20/9/17}
							pass2Error(ast, QString("num or string index expression expected [%0]").arg(string[typ->id]));
							break;
						}
						if (r->typPtr && (r->typPtr->flags & ARRAY)) {														// {joj 21/9/17}
							r = r->typPtr;																					// {joj 21/9/17}
						}
						else {
							r = newVar(resolveTyp(ast, r, scope));															// {joj 21/9/17}
						}
					}
				} else {
					pass2Error(ast, "too many indices");																	// {joj 21/9/17}
					break;
				}
			} else {
				Q_ASSERT(0);
			}
			i++;
		}
		break;

	}

	case invertAST:
	case notAST:
	case negAST:
		r = eval(ast->arg[0], scope);
		break;

	case addaddAST:
	case minusminusAST:
		r = eval(ast->arg[0], scope);
		if (r == NULL || r->typPtr != numTyp)
			pass2Error(ast, QString("num variable expected"));
		break;

	case whileAST:
		eval(ast->arg[0], scope);	// condition
		eval(ast->arg[1], scope);	// statement
		break;

	case doAST:
		eval(ast->arg[0], scope);	// statement
		eval(ast->arg[1], scope);	// condition
		break;

	case forAST:
		eval(ast->arg[0], scope);	// init
		eval(ast->arg[1], scope);	// condition
		eval(ast->arg[2], scope);	// post
		eval(ast->arg[3], scope);	// statement
		break;

	case foreachAST:
		// NEEDS FIXING {joj 4/8/17}
		break;

	case ifAST:
		eval(ast->arg[0], scope);
		//if (eval(ast->arg[0], scope) != numTyp)
		//	pass2Error(ast, "num expected");
		eval(ast->arg[1], scope);
		if (ast->arg.size() == 3)
			eval(ast->arg[2], scope);
		break;

	case returnAST:
		if (ast->arg[0]) {
			v = eval(ast->arg[0], scope);		// {joj 27/07/17}
			if (scope->typID == 0) {			// {joj 27/07/17}
				pass2Error(ast, "function doesn't return a result");
			} else if (compatible(ast, v, scope, scope) == 0) {
				pass2Error(ast, "return expression type doesn't match function result");
			}
		} else {
			if (scope->typID)					// {joj 27/07/17}
				pass2Error(ast, "return expression expected");
		}
		break;

	case breakAST:
		break;

	case continueAST:
		break;

	//case dotAST:
	//	if (obj = findInScope(ast->id0, scope)) {
	//		r = find(obj->typID, scope);
	//	} else {
	//		pass2Error(ast, QString("unknown object member: %0").arg(string[ast->id0]));
	//	}
	//	break;

	//case indexAST:
	//	r = eval(ast->arg[0], scope);
		//r = find(scope->indexID[0], scope);
	//	break;

	case classAST:
		r = find(ast->id0, scope);
		Q_ASSERT(r);
		func += r;
		n = ast->arg.length() - 1;
		if ((ast->id1) && (r->derivedFrom == NULL)) {	// derived from base class
			obj = find(ast->id1, scope);
			if (obj && obj->objTyp == TypObj) {
				r->derivedFrom = obj;
			} else {
				pass2Error(ast, QString("derived from unknown class %0").arg(string[ast->id1]));
			}
		}
		eval(ast->arg[n], r);
		break;

	// id0:funcID id1:retID arg[0]:paramAST arg[1]:paramAST ... blockAST
	case funcAST:
		if (obj = find(ast->id0, scope)) {
			func += obj; // add to func
			if ((ast->id1) && ((r = find(ast->id1, scope)) == NULL))
				pass2Error(ast, QString("unknown function result type: %0").arg(string[ast->id1]));
			for (i = 0; i < ast->arg.length(); i++)		// parameters and block {joj 6/11/17}
				eval(ast->arg[i], obj);					
		} else {
			pass2Error(ast, QString("unknown function: %0").arg(string[ast->id1]));
		}
		break;

	// id0:typID id1:varID arg[0]:init
	case paramAST:
		typ = find(ast->id0, scope);
		if ((typ == NULL) || (typ->objTyp != TypObj))
			pass2Error(ast, QString("type expected [%0]").arg(string[ast->id0]));
		break;

	case condExprAST:
		eval(ast->arg[0], scope);		// condition
		r = eval(ast->arg[1], scope);	// lhs
		if ((compatible(ast, r, eval(ast->arg[2], scope), scope) == 0))
			pass2Error(ast, "conditional expression: lhs and rhs are NOT compatible");
		break;

	case exprListAST:
		for (int i = 0; i < ast->arg.size(); i++)
			eval(ast->arg[i], scope);
		break;

	case blockAST:
		for (int i = 0; i < ast->arg.size(); i++)
			eval(ast->arg[i], scope);
		break;

	// id0:eventID arg[0]:selectorAST arg[1]:funcAST
	case whenAST: {
		obj = find(ast->id0, scope);	// event handler prototype
		if ((obj == NULL) || (obj->objTyp != MethodObj) || ((obj->flags & (EVENTF | GOBJEVENTF)) == 0))	{	// {joj 27/10/17}
			pass2Error(ast, QString("event identifier expected [%0]").arg(string[ast->id0]));
			break;
		} 
		if ((obj->flags & EVENTF) && (varImports.contains("addGlobalEventHandler") == 0))	// {joj 27/10/17}
			varImports += "addGlobalEventHandler";											// {joj 27/10/17}
		if ((obj->flags & EVENTF) && ast->arg[0]) {											// {joj 27/10/17}
			pass2Error(ast, "global event handler, selector NOT expected");					// {joj 27/10/17}
		} else if (obj->flags & GOBJEVENTF)  {												// {joj 27/10/17}
			if (ast->arg[0]) {																// {joj 27/10/17}
				Obj *selector = eval(ast->arg[0], scope);									// {joj 27/10/17}
				if (selector == NULL || isDerivedFromGObj(selector->typPtr) == 0)			// {joj 4/11/17}
					pass2Error(ast, "GObj expected");										// {joj 27/10/17}
			} else {																		// {joj 27/10/17}
				if (isDerivedFromGObj(scope) == 0)											// {joj 27/10/17}
					pass2Error(ast, "obj NOT derived from GObj");							// {joj 27/10/17}
			}																				// {joj 27/10/17}
		}																					// {joj 27/10/17}
		Obj *func = find(ast->arg[1]->id0, scope);														
		Q_ASSERT(func);
		int i = 0;
		for (; (i < obj->parameter.size()) && (i < func->parameter.size()); i++) {			// check parameters against prototype {joj 26/9/17}
			Obj *protoTyp = obj->parameter[i]->varObj->typPtr;								// initialised by compiler
			typ = resolveTyp(ast, func->parameter[i]->varObj, scope);
			if (protoTyp != typ)
				pass2Error(ast, QString("%0 parameter %1: %2 expected [%3]").arg(string[ast->id0]).arg(i + 1).arg(string[protoTyp->id]).arg(string[typ->id]));
		}
		if (i < obj->parameter.size())
			pass2Error(ast, QString("%0 %1 parameters expected").arg(string[ast->id0]).arg(obj->parameter.size()));
		else if (i < func->parameter.size()) {
			pass2Error(ast, QString("%0 ONLY %1 parameters expected").arg(string[ast->id0]).arg(obj->parameter.size()));
		}
		eval(ast->arg[1], scope);	// needed to add event function to function list
		break;
	}

	case thisAST:
		r = scope;
		while (r->objTyp != TypObj)
			r = r->parentScope; 
		//for (int i = 0; i < ast->arg.size(); i++)
		//	r = eval(ast->arg[i], obj);
		break;

	case baseAST:
		r = scope;
		while (r->objTyp != TypObj)
			r = r->parentScope;
		if ((r->objTyp != TypObj) || (r->derivedFrom == NULL)) {
			pass2Error(ast, "base must be used within a derived class");
			r = NULL;
		} else {
			r = newExpr(r->derivedFrom);
		}
		break;

	case assignRefAST:	// {joj 17/10/17}
		r = eval(ast->arg[0], scope);
		ast->arg[0]->flags &= ~ASTBYREF;	// TEMPORARY FIX {joj 24/10/17}
		//if (ast->arg.size() == 2)	// {joj 10/11/17}
		//	ast->arg.removeLast();	// {joj 10/11/17}
		if (r->objTyp != VarObj) {
			pass2Error(ast, "variable expected");
			r = NULL;
		} else {
			if (scope->objTyp == MethodObj)
				scope->flags |= CANWAIT;
			r = newRef(r);	
		}
		break;

	case progAST:
		for (int i = 0; i < ast->arg.size(); i++)
			r = eval(ast->arg[i], scope);
		break;

	case undefinedAST:
		return undefinedExpr;
		break;

	default:
		TRACE(QString("eval: unexpected ast->op: %0").arg(astToStr[ast->op]));
		Q_ASSERT(0);
		break;

	}

	return r;
}

#define NEWLINEJS()								\
	k = js[i][j].size();						\
	js[i][j].append("");

#define JS										\
	js[i][j][k]

//
// genByRef {joj 6/10/17}
//
QString Compiler::genByRef(QString s) {
	int pos;
	if (s.endsWith("]")) {
		pos = s.length() - 2;																				// find matching [ {joj 8/10/17}
		int cnt = 1;
		while (cnt) {
			if (s[pos] == "]") {
				cnt++;
			} else if (s[pos] == "[") {
				cnt --;
			}
			pos--;
		}
		return QString("{o:%0, a:%1}").arg(s.left(pos+1)).arg(s.mid(pos+2, s.length() - pos - 3));			// {joj 8/10/17}
	} else if ((pos = s.lastIndexOf(".")) != -1) {
		return QString("{o:%0, a:\"%1\"}").arg(s.left(pos)).arg(s.mid(pos + 1, s.length() - pos - 1));
	} else {
		return QString("{o:this, a:\"%0\"}").arg(s);
	}
}

//
// genJS
//
// JavaScript VM code generation (minimal checking as all carried out in pass2)
// JavaScript generation (minimal checking as all carried out in pass2)
//
// Creating GObjs
// ----------------
//
// Calls to create GObjs (eg Rectangle) have an additional GroupObj parameter (the first parameter) since
// all GObjs are attached to a group. If created at global scope, GObjs are attached to the global GroupObj
// represented by global variable g[0], but if created within a module derived from GroupObj the additional
// parameter is this. Furthermore, all objects dervived from a GObj have the additional GroupObj parameter
// eg if A derived from B which is derived from GObj, A and B have the additional GrobObj parameter.
// Check if an object is derived from a GObj by following the derivedFrom link and testing if obj->flags & GOBJ (last valid link).
// Check if an object is derived from a GroupObj by following the derivedFrom link and testing if equal to groupTyp.
// NB: GroupObj is a GObj.
//
// TODO: the VPlayer object could be derived from GroupObj for consistency
//
// i = 0	non wait code
// i = 1	wait code
//
Obj* Compiler::genJS(int i, int j, int &k, AST *ast, Obj *scope) {

	Q_ASSERT(i == 0 || i == 1);
	Q_ASSERT(j < js[i].size());
	
	if (ast == NULL)		// {joj 1/8/17}
		return NULL;		// {joj 1/8/17}

	Obj *obj = NULL, *os, *r = NULL;
	int savei, savej, savek;
	int l0, l1, l2;
	int n, v;

	if (ast->flags & ASTPRECEDENCE)
		JS += "(";

	switch (ast->op) {

	case numAST:
		JS += QString("%0").arg(ast->num, 0, 'g', 17);
		break;

	case stringAST:
		JS += QString("\"%0\"").arg(string[ast->id0]);
		break;

	// id0:varID
	case idAST:
		r = (ast->r) ? ast->r : find(ast->id0, scope);	// {joj 10/11/17}
		Q_ASSERT((r->objTyp == TypObj && r->flags && CONSTRUCTOR) || (r->objTyp == VarObj) || (r->objTyp == MethodObj));	// {joj 10/11/17}
		os = findScope(r, scope);
		if (ast->flags & ASTBYREF) {
			Q_ASSERT(r->objTyp == VarObj && r->flags & BYREF);
		//if ((r->objTyp == VarObj) && (r->flags & BYREF)) {
			if (i == 0) {
				if (r->level == 0) {		// global
					JS += QString("%0.o[%0.a]").arg(string[ast->id0]);
				} else if (r->level == 1) { // object
					JS += QString("this.%0.o[this.%0.a]").arg(string[ast->id0]);
				} else {					// local
					JS += QString("%0.o[%0.a]").arg(string[ast->id0]);;
				}
			} else {	// {joj 17/10/17}
				if (r->level == 0) {
					JS += QString("$g[%0].o[$g[%0].a]").arg(r->addr);
				} else if (r->level == 1) {
					JS += "TODO";
				} else {
					JS += QString("$stack[$fp+%0].o[$stack[$fp+%0].a]").arg(r->addr);
				}
			}
		} else if (r->caseLabel >= 0) {
			Q_ASSERT(i == 1);
			JS += QString("££%0").arg(r->caseLabel);
		} else if (os == globalScope) {
			if (r->objTyp == VarObj) {			// {joj 31/7/17} fix
				if ((r->flags & CONSTANT) || (r->flags & EXTCONSTANT)) {
					JS += string[ast->id0];
					if ((r->flags & EXTCONSTANT) && ((r->flags & IMPORTED) == 0)) {
						constImports += string[ast->id0];
						r->flags |= IMPORTED;
					}
				} else {
					JS += QString("$g[%0]").arg(r->addr);
				}
			} else {
				if (isDerivedFromGObj(r) && ((r->flags & CONSTRUCTOR) == 0))
					JS += "$g[0].";
				JS += string[ast->id0];
			}
		} else if ((os->objTyp == TypObj) && ((r->flags & PARAMETER) == 0)) {
		//} else if (r->level == 1) {
			//if (i) {
				if (scope != os) {
					JS += QString(i ? "$obj" : "this");													// {joj 9/11/17}
					Obj* s = scope;																		// {joj 6/10/17}
					while (s != os) {																	// {joj 6/10/17}
						if (s->objTyp == TypObj)														// {joj 6/10/17}
							JS += QString(".$parent");													// {joj 6/10/17}
						s = s->parentScope;																// {joj 6/10/17}
					}																					// {joj 6/10/17}
					JS += QString(".%0").arg(memberName(ast->id0, os, 0));								// {joj 6/10/17}
				} else {
					JS += QString("%0.%1").arg(i ? "$obj" : "this").arg(memberName(ast->id0, os, 0));	// {joj 9/11/17}
				}
		} else {
			if (i) {
				if (r->addr >= 0) {
					JS += QString("$stack[$fp+%0]").arg(r->addr);
				} else {
					JS += QString("$stack[$fp%0]").arg(r->addr);				// "-" included in address
				}
			} else {
				JS += QString("%0").arg(string[ast->id0]);
			}
		}
		//if (r->objTyp == VarArrayObj)	// {joj 31/7/17 FIX}
		//	r = find(r->typID, scope);
		//r = (r->flags & VALIDTYPPTR) ? r->typPtr : find(r->typID, scope);			// {joj 31/7/17}
		break;

	case selectorAST: {

		int baseOp = ast->arg[0]->op == baseAST;	// {joj 27/7/17}
		r = genJS(i, j, k, ast->arg[0], scope);
		Q_ASSERT(r);
		int ii = 1;
		while (ii < ast->arg.size()) {
			switch(ast->arg[ii]->op) {
			case dotAST: {
				Obj * os = (r->objTyp == TypObj) ? r : r->typPtr;
				JS += QString(".%0").arg(memberName(ast->arg[ii]->id0, os, baseOp));// {joj 27/7/17}
				r = findInScope(ast->arg[ii]->id0, os, 1);							// NB t used as scope
				ii++;
				break;
			}
			case indexAST:
				if (r->flags & AARRAY) {
					JS += "[";
					int b = 0;
					while (ii < ast->arg.size() && ast->arg[ii]->op == indexAST) {
						if (b) {
							JS += "+\":\"+";
						} else {
							b = 1;
						}
						genJS(i, j, k, ast->arg[ii]->arg[0], scope);
						r = (r->flags & VALIDTYPPTR) ? r->typPtr : find(r->typID, scope);		// {joj 1/8/17}
						ii++;
					}
					JS += "]";
				} else { // ARRAY
					while (ii < ast->arg.size() && ast->arg[ii]->op == indexAST) {
						JS += "[";
						genJS(i, j, k, ast->arg[ii]->arg[0], scope);
						JS += "]";
						if (r->typPtr->flags & ARRAY) {
							r = r->typPtr;
						} else {
							r = newVar(r->typPtr);
						}
						ii++;
					}
				}
				break;
			default:
				Q_ASSERT(0);
			}
		}
		break;
	}

	// id0:typeID [arg[0]:idAST arg[1]:expr]*
	case constAST:
		for (int ii = 0, v = 0; ii < ast->arg.size(); ii += 2, v = 1) {	// {joj 24/10/17}
			if (v)
				JS += ", ";
			genJS(i, j, k, ast->arg[ii], scope);
			JS += " = ";
			genJS(i, j, k, ast->arg[ii + 1], scope);
		}
		constDefs.append(JS);	// FIXED? {joj 21/9/16}
		JS = "";				// FIXED {joj 21/9/16}
		break;

	case varAST:
		if ((i == 0) && (ast->flags & ASTLOCAL)) // local variable
			JS += "let ";	//  need to sort out block scope {joj 15/11/17}
			//JS += "var ";
		for (int ii = 0, v = 0; ii < ast->arg.length(); ii += 3) { // in triples <id, indices, init>
			if ((i == 1) && (ast->arg[ii + 1] == NULL) && (ast->arg[ii + 2] == NULL)) // {joj 5/10/16}
				continue;
			if (v)
				JS += ", ";
			obj = find(ast->arg[ii]->id0, scope);
			if (obj->level == GLOBAL) {
				if (ast->arg[ii + 1] || ast->arg[ii + 2]) {
					JS += QString("$g[%0]").arg(obj->addr);
					v = 1;
				}
			} else if (obj->level == OBJECT) {
				//JS += QString("this.%0").arg(string[ast->arg[ii]->id0]);
				if (i) {
					JS += QString("$obj.%0").arg(memberName(ast->arg[ii]->id0, scope, 0));		// {joj 9/11/17}
				} else {
					JS += QString("this.%0").arg(memberName(ast->arg[ii]->id0, scope, 0));		// {joj 27/7/17}
				}
				v = 1;
			} else {
				if (i == 1) {
					if (ast->arg[ii+2])
						JS += QString("$stack[$fp+%0]").arg(obj->addr);
				} else {
					JS += string[ast->arg[ii]->id0];
				}
				v = 1;
			}
			if (ast->arg[ii + 1] && (ast->arg[ii+2] == 0)) {	// {joj 28/7/17}
				if (varImports.contains("newArray") == 0)		// {joj 28/9/16}
					varImports += "newArray";
				JS += " = newArray(";
				if (ast->arg[ii+1]->op == exprListAST) {		// {joj 1/8/17}
					AST *ast1 = ast->arg[ii + 1];
					for (int jj = 0; jj < ast1->arg.length(); jj++) {
						if (jj)
							JS += ", ";
						if (ast1->arg[jj]) {
							genJS(i, j, k, ast1->arg[jj], scope);
						} else {
							JS += "0";
						}
					}
				}
				JS += ")";
			}
			if (ast->arg[ii + 2]) {
				JS += " = ";
				genJS(i, j, k, ast->arg[ii + 2], scope);
			}
		}
		break;

	case initAST:
		JS += "[";
		for (int ii = 0; ii < ast->arg.length(); ii++) {
			if (ii > 0)
				JS += ", ";
			genJS(i, j, k, ast->arg[ii], scope);
		}
		JS += "]";
		break;

	// arg[0]:idAST arg[1]:parameter1 arg[2]:paramter2 ...
	case callAST:
		obj = eval(ast->arg[0], scope);						// NB eval

		if (obj->flags & CANWAIT) {							// check if calling a CANWAIT function

			Q_ASSERT((i == 1) || (ast->flags & ASTFORKF));	// {joj 24/9/17}

			if (obj->flags & BUILTINMETHOD) {
				JS += QString("%0(").arg(string[obj->id]);
				n = 0;
			} else {
				if (obj->caseLabel == -1)
					obj->caseLabel = caseLabel++;
				if (ast->flags & ASTFORKF) {
					JS += QString("££%0, ").arg(obj->caseLabel);
				} else {
					JS += QString("callf(££%0, ").arg(obj->caseLabel);
				}
				int c = JS.size();							// pretty awful code
				genJS(i, j, k, ast->arg[0], scope);			// removing function name to get object if present
				int cc = JS.lastIndexOf('.');
				if (cc == -1 || cc < c) {
					JS.resize(c);
					if (obj->flags & CONSTRUCTOR) {
						JS += "new ";
						JS += fullName(obj, scope);
						JS += "()";
					} else {
						JS += "$obj";
					}
				} else {
					JS.resize(cc);
				}
				n = 1;
			}
			for (int ii = 1; ii < ast->arg.length(); ii++, n = 1) { // actual parameters
				if (n > 0)
					JS += ", ";
				genJS(i, j, k, ast->arg[ii], scope);
			}
			if (((obj->flags & (BUILTINMETHOD | BUILTINOBJ)) == 0) && (obj->flags & HASPOPTIONAL)) { // optional parameters {joj 28/7/17}
				for (int ii = ast->arg.length() - 1; ii < obj->parameter.length(); ii++) { 
					if (n > 0)
						JS += ", ";
					genJS(i, j, k, obj->parameter[ii]->ast, scope);
				}
			}
			if ((ast->flags & ASTFORKF) == 0)
				JS += ")";
			if (string[obj->id] == "wait") {
				NEWLINEJS();
				JS += "return";
			} else if ((ast->flags & ASTFORKF) == 0) {
				NEWLINEJS();
				JS += "continue";
			}
			if ((ast->flags & ASTFORKF) == 0) {
				NEWLINEJS();
				JS += QString("££%0").arg(caseLabel++);
			}

		} else {

			if (ast->flags & ASTCONSTRUCTOR)
				JS += "new ";

			if ((obj->flags & IMPORT) && ((obj->flags & IMPORTED) == 0)) {
				obj->flags |= IMPORTED;
				varImports += string[obj->id];
			}
			if (ast->flags & ASTCANWAIT) {
				Q_ASSERT(i == 1);
				JS += "if (";
			}
			genJS(i, j, k, ast->arg[0], scope);
			int comma = 1;																													// {joj 3/10/17}
			if ((ast->flags & ASTCONSTRUCTOR) && ((obj->flags & (BUILTINMETHOD | BUILTINOBJ)) == 0) && (obj->parentScope != topScope)) {	// {joj 2/8/17}
				Obj *ts = scope;																											// {joj 9/11/17}
				while (ts->objTyp != TypObj)																								// {joj 9/11/17}
					ts = ts->parentScope;																									// {joj 9/11/17}
				if (obj->parentScope == ts) {																								// {joj 3/11/17}
					JS += i ? "($obj" : "(this";																							// {joj 9/11/17}
				} else {																													// {joj 3/11/17}
					JS += "(";																												// {joj 3/11/17}
					int ii = 0;																												// {joj 3/11/17}
					for (Obj *s = ts; s != obj->parentScope; s = s->parentScope, ii = 1) {													// {joj 3/11/17}
						if (ii)																												// {joj 3/11/17}
							JS += ".";																										// {joj 3/11/17}
						JS += "$parent";																									// {joj 3/11/17}
					}																														// {joj 3/11/17}
				}																															// {joj 3/11/17}
			} else if (ast->flags & ASTINIT) {
				JS += ".call(this";
			} else {
				JS += "("; comma = 0;																										// {joj 3/10/17}
			}
			if (isDerivedFromGObj(obj) && (obj->flags & CONSTRUCTOR)) {									// need to set group (first parameter)
				if (comma)																				// {joj 3/10/17}
					JS += ", ";
				if (findGroupObj(scope) == globalScope) {												// will always find a groupObj
					JS += "$g[0]";
				} else {
					JS += (ast->flags & ASTINIT) ? "$grp" : "this";
				}
				comma = 1;																				// {joj 3/10/17}
			}
			for (int ii = 1; ii < ast->arg.length(); ii++) {											// actual parameters
				int byRef = ast->arg[ii]->flags & ASTPASSBYREF;											// {joj 6/10/17}	TEMPORARY FIX
				int startPos = 0, endPos = 0;															// {joj 6/10/17}
				if (comma || (ii > 1))																	// {joj 3/10/17}
					JS += ", ";																			// {joj 3/10/17}
				if (byRef)																				// {joj 6/10/17}
					startPos = js[i][j][k].length();													// {joj 6/10/17}
				genJS(i, j, k, ast->arg[ii], scope);
				if (byRef) {																			// {joj 6/10/17}
					endPos = js[i][j][k].length();														// {joj 6/10/17}
					QString s = js[i][j][k].right(endPos - startPos);									// {joj 6/10/17}
					js[i][j][k].chop(endPos - startPos);												// {joj 6/10/17}
					js[i][j][k] += genByRef(s);															// {joj 7/10/17}
				}																						// {joj 6/10/17}
			}
			if (((obj->flags & (BUILTINMETHOD | BUILTINOBJ)) == 0) && (obj->flags & HASPOPTIONAL)) {	// optional parameters {joj 28/7/17}
				for (int ii = ast->arg.length() - 1; ii < obj->parameter.length(); ii++) {
					if (comma || (ii > 0))																// {joj 3/10/17}		
						JS += ", ";																		// {joj 3/10/17}
					genJS(i, j, k, obj->parameter[ii]->ast, scope);	
				}
			}
			JS += ")";
			if (ast->flags & ASTCANWAIT) {
				JS += ")";
				NEWLINEJS();
				JS += "return";
				NEWLINEJS();
				JS += QString("$pc = ££%0").arg(caseLabel);
				NEWLINEJS();
				JS += QString("££%0").arg(caseLabel);
				caseLabel++;
			}
		}
		if (obj->objTyp == MethodObj)			// {joj 6/11/16}
			r = resolveTyp(ast, obj, scope);	// {joj 20/9/17}
		break;

	case assignAST:
	case addEqlAST:
	case minusEqlAST:
	case mulEqlAST:
	case divEqlAST:
	case modEqlAST:
	case orEqlAST:
	case andEqlAST:
	case xorEqlAST:
	case shrEqlAST:
	case shlEqlAST:
	case andAST:
	case addAST:
	case minusAST:
	case xorAST:
	case orAST:
	case mulAST:
	case divAST:
	case modAST:
	case shrAST:
	case shlAST:
	case eqlAST:
	case neqAST:
	case lessAST:
	case leqAST:
	case grtAST:
	case geqAST:
		genJS(i, j, k, ast->arg[0], scope);
		JS += astToStr[ast->op];
		genJS(i, j, k, ast->arg[1], scope);
		break;

	case candAST:
	case corAST:
		genJS(i, j, k, ast->arg[0], scope);
		for (int ii = 1; ii < ast->arg.size(); ii++) {
			JS += QString(" %0 ").arg(astToStr[ast->op]);
			genJS(i, j, k, ast->arg[ii], scope);
		}
		break;

	case invertAST:
	case notAST:
		JS += astToStr[ast->op];
		genJS(i, j, k, ast->arg[0], scope);
		break;

	case negAST:
		JS += "-";
		genJS(i, j, k, ast->arg[0], scope);
		break;

	case addaddAST:
	case minusminusAST:
		if ((ast->flags & ASTPOST) == 0)		// NB parentheses {joj 26/8/16}
			JS += astToStr[ast->op];
		genJS(i, j, k, ast->arg[0], scope);
		if (ast->flags & ASTPOST)
			JS += astToStr[ast->op];
		break;

	case whileAST: // {joj 13/9/16}
		if (i == 0) {
			JS += "while (";
			genJS(i, j, k, ast->arg[0], scope);
			JS += ")";
			genJS(i, j, k, ast->arg[1], scope);		// statement
		} else {
			loopStart += (l0 = caseLabel++);
			loopEnd += (l1 = caseLabel++);
			NEWLINEJS();							// {joj 8/10/16}
			JS += QString("$pc = ££%0").arg(l0);	// {joj 8/10/16}
			NEWLINEJS();
			JS += QString("££%0").arg(l0);
			NEWLINEJS();
			JS += "if (!(";
			genJS(i, j, k, ast->arg[0], scope);
			JS += ")) {";
			NEWLINEJS();
			JS += QString("$pc = ££%0").arg(l1);
			NEWLINEJS();
			JS += "continue";
			NEWLINEJS();
			JS += "}";
			NEWLINEJS();
			genJS(i, j, k, ast->arg[1], scope);
			NEWLINEJS();
			JS += QString("$pc = ££%0").arg(l0);	// {joj 5/10/16}
			NEWLINEJS();
			JS += "continue";
			NEWLINEJS();
			JS += QString("££%0").arg(l1);
			NEWLINEJS();
			loopStart.removeLast();
			loopEnd.removeLast();
		}
		break;

	case doAST: // {joj 14/9/16}
		if (i == 0) {
			JS += "do";
			genJS(i, j, k, ast->arg[0], scope);
			JS += (ast->arg[0]->op == blockAST) ? " while ("  : "while (";
			genJS(i, j, k, ast->arg[1], scope);	// statement
			JS += ")";
		} else { // {joj 6/10/16}
			loopStart += (l0 = caseLabel++);
			loopEnd += (l1 = caseLabel++);
			NEWLINEJS();							// {joj 8/10/16}
			JS += QString("$pc = ££%0").arg(l0);	// {joj 8/10/16}
			NEWLINEJS();
			JS += QString("££%0").arg(l0);
			NEWLINEJS();
			genJS(i, j, k, ast->arg[0], scope);
			NEWLINEJS();
			JS += "if(";
			genJS(i, j, k, ast->arg[1], scope);
			JS += ") {";
			NEWLINEJS();
			JS += QString("$pc = ££%0").arg(l0);
			NEWLINEJS();
			JS += "continue";
			NEWLINEJS();
			JS += "}";
			NEWLINEJS();
			JS += QString("$pc = ££%0").arg(l1);
			NEWLINEJS();
			JS += QString("££%0").arg(l1);
			NEWLINEJS();
			loopStart.removeLast();
			loopEnd.removeLast();
		}
		break;

	case forAST:
		if (i == 0) {
			JS += "for (";
			if (ast->arg[0])								// {joj 1/8/17}
				genJS(i, j, k, ast->arg[0], scope);
			JS += "; ";
			if (ast->arg[1])								// {joj 1/8/17}
				genJS(i, j, k, ast->arg[1], scope);
			JS += "; ";
			if (ast->arg[2])								// {joj 1/8/17}
				genJS(i, j, k, ast->arg[2], scope);
			JS += ")";
			if (ast->arg[3]) {								// {joj 26/10/17}
				if (ast->arg[3]->op != blockAST)
					NEWLINEJS();
				genJS(i, j, k, ast->arg[3], scope);			// statement
			}
		} else {
			l0 = caseLabel++;
			loopStart += (l1 = caseLabel++);
			loopEnd += (l2 = caseLabel++);
			if (ast->arg[0])								// {joj 1/8/17}
				genJS(i, j, k, ast->arg[0], scope);
			NEWLINEJS();									// {joj 8/10/16}
			JS += QString("$pc = ££%0").arg(l0);			// {joj 8/10/16}
			NEWLINEJS();
			JS += QString("££%0").arg(l0);
			if (ast->arg[1]) {								// {joj 1/8/17}
				NEWLINEJS();
				JS += "if (!(";
				genJS(i, j, k, ast->arg[1], scope);
				JS += ")) {";
				NEWLINEJS();
				JS += QString("$pc = ££%0").arg(l2);
				NEWLINEJS();
				JS += "continue";
				NEWLINEJS();
				JS += "}";
			}
			NEWLINEJS();
			genJS(i, j, k, ast->arg[3], scope);				// statement
			if (ast->arg[2]) {								// {joj 1/8/17}
				NEWLINEJS();
				JS += QString("$pc = ££%0").arg(l1);
				NEWLINEJS();
				JS += QString("££%0").arg(l1);				// target for continue inside for loop
				NEWLINEJS();
				genJS(i, j, k, ast->arg[2], scope);			// next step
			}
			NEWLINEJS();
			JS += QString("$pc = ££%0").arg(l0);
			NEWLINEJS();
			JS += "continue";
			NEWLINEJS();
			JS += QString("££%0").arg(l2);
			loopStart.removeLast();
			loopEnd.removeLast();
		}
		break;

	case foreachAST:
		//if (i == 0) {
			JS += "for (";
			genJS(i, j, k, ast->arg[0], scope);
			JS += " in ";
			genJS(i, j, k, ast->arg[1], scope);
			JS += ")";
			if (ast->arg[2]->op != blockAST)
				NEWLINEJS();
			genJS(i, j, k, ast->arg[2], scope);
		//} else {
			// NEEDS FIXING {joj 4/8/17}
		//}
		break;

	case ifAST:
		if (i) {
			if (ast->arg.size() == 2) {	// if (b) s0
				JS += "if (!(";
				genJS(i, j, k, ast->arg[0], scope);
				JS += ")) {";
				l0 = caseLabel++;
				NEWLINEJS();
				JS += QString("$pc = ££%0").arg(l0);
				NEWLINEJS();
				JS += "continue";
				NEWLINEJS();
				JS += "}";
				NEWLINEJS();
				genJS(i, j, k, ast->arg[1], scope);
				NEWLINEJS();
				JS += QString("$pc = ££%0").arg(l0);
				NEWLINEJS();
				JS += QString("££%0").arg(l0);
			} else {				// if (b) s0 else s1
				JS += "if (!(";
				genJS(i, j, k, ast->arg[0], scope);
				JS += ")) {";
				l0 = caseLabel++;
				l1 = caseLabel++;
				NEWLINEJS();
				JS += QString("$pc = ££%0").arg(l0);
				NEWLINEJS();
				JS += "continue";
				NEWLINEJS();
				JS += "}";
				NEWLINEJS();
				genJS(i, j, k, ast->arg[1], scope);
				NEWLINEJS();
				JS += QString("$pc = ££%0").arg(l1);
				NEWLINEJS();
				JS += "continue";
				NEWLINEJS();
				JS += QString("££%0").arg(l0);
				NEWLINEJS();
				genJS(i, j, k, ast->arg[2], scope);
				NEWLINEJS();
				JS += QString("$pc = ££%0").arg(l1);
				NEWLINEJS();
				JS += QString("££%0").arg(l1);
			}
		} else {
			JS += "if (";
			genJS(i, j, k, ast->arg[0], scope);
			JS += ")";
			if (ast->arg[1]->op != blockAST)
				NEWLINEJS();
			genJS(i, j, k, ast->arg[1], scope);
			if (ast->arg.size() == 3) {
				if (ast->arg[1]->op != blockAST) {
					NEWLINEJS();
					JS += "else ";
				} else {
					JS += " else";
				}
				if (ast->arg[2]->op != blockAST)
					NEWLINEJS();
				genJS(i, j, k, ast->arg[2], scope);
			}
		}
		break;

	case returnAST:
		NEWLINEJS();
		if (i) {
			if (ast->arg[0]) {
				JS += "$thread.flags = ";
				genJS(i, j, k, ast->arg[0], scope);
				NEWLINEJS();
			}
			JS += QString("returnf(%0)").arg(scope->parameter.size());
			NEWLINEJS();
			JS += "continue";
		} else {
			if (ast->arg[0]) {
				JS += "return ";
				genJS(i, j, k, ast->arg[0], scope);
			} else {
				JS += "return";
			}
		}
		break;

	case breakAST:
		if (i == 0) {
			JS += "break";
		} else {
			JS += QString("$pc = ££%0").arg(loopEnd.last());
			NEWLINEJS();
			JS += "continue";
		}
		break;

	case continueAST:
		if (i == 0) {
			JS += "continue";
		} else {
			JS += QString("$pc = ££%0").arg(loopStart.last());
			NEWLINEJS();
			JS += "continue";
		}
		break;

	case classAST: {
		savei = i;
		savej = j;
		savek = k;
		obj = find(ast->id0, scope);
		QString qs = fullName(obj, scope);																	// {joj 9/11/17}
		if (obj->flags & CANWAIT) {
			i = 0;																							// {joj 9/11/17}
			j = js[0].size();																				// {joj 9/11/17}
			k = 0;																							// {joj 9/11/17}
			js[0].append(QStringList(""));																	// {joj 9/11/17}
			if (obj->flags & INOBJECT) {																	// {joj 9/11/17}
				JS += QString("%0 = function() {").arg(qs);													// {joj 9/11/17}
			} else {																						// {joj 9/11/17}
				JS += QString("function %0() {").arg(string[ast->id0]);										// {joj 9/11/17}
			}																								// {joj 9/11/17}
			NEWLINEJS();																					// {joj 9/11/17}
			JS += "VObj.call(this)";																		// {joj 9/11/17}
			NEWLINEJS();																					// {joj 9/11/17}
			JS += "}";																						// {joj 9/11/17}
			NEWLINEJS();																					// {joj 9/11/17}
			if (obj->derivedFrom) {																			// {joj 9/11/17}
				JS += QString("%0.prototype = Object.create(%1.prototype)").arg(qs).arg(string[ast->id1]);	// {joj 9/11/17}
			} else {																						// {joj 9/11/17}
				if (varImports.contains("VObj") == 0)														// {joj 8/10/16}
					varImports += "VObj";																	// {joj 9/11/17}
				JS += QString("%0.prototype = Object.create(VObj.prototype)").arg(qs);						// {joj 9/11/17}
			}																								// {joj 9/11/17}
			i = 1;
			j = js[1].size();
			k = 0;
			js[1].append(QStringList(""));
			if (obj->caseLabel == -1)
				obj->caseLabel = caseLabel++;
			JS += QString("££%0").arg(obj->caseLabel);
			NEWLINEJS();
			JS += QString("enterf(%0);\t// %1").arg(obj->addr - 1).arg(string[ast->id0]);	// locals start at address 1
			NEWLINEJS();
			genJS(i, j, k, ast->arg.last(), obj);	// blockAST
			NEWLINEJS();
			JS += QString("returnf(%0)").arg(obj->parameter.size());
			NEWLINEJS();
			JS += "continue";
		} else {
			int needComma = 0;	// {joj 3/11/17}
			i = 0;
			j = js[0].size();
			k = 0;
			js[0].append(QStringList(""));
			if (obj->flags & INOBJECT) {																	// {joj 9/11/17}
				JS += QString("%0 = function(").arg(qs);													// {joj 9/11/17}
			} else {																						// {joj 9/11/17}
				JS += QString("function %0(").arg(string[ast->id0]);
			}																								// {joj 9/11/17}
			if (obj->parentScope != topScope) {	// {joj 25/7/17}
				JS += "$parent";				// {joj 25/7/17}
				needComma = 1;					// {joj 3/11/17}
			}
			if (isDerivedFromGObj(obj))	{		// CHECK if this and the above can both be true
				if (needComma)					// {joj 3/11/17}
					JS += ", ";					// {joj 3/11/17}
				JS += "$grp";
				needComma = 1;					// {joj 3/11/17
			}
			n = ast->arg.length() - 1;
			for (int ii = 0; ii < n; ii++) {
				if ((ii == 0 && needComma) || ii)	// {joj 3/11/17}
					JS += ", ";
				genJS(i, j, k, ast->arg[ii], scope);
			}
			JS += ")";
			if (obj->derivedFrom == NULL)
				ast->arg[n]->flags |= ASTVOBJ;
			genJS(i, j, k, ast->arg[n], obj);		// blockAST (NB: change of scope)
			NEWLINEJS();
			if (obj->derivedFrom) {
				JS += QString("%0.prototype = Object.create(%1.prototype)").arg(qs).arg(string[ast->id1]);	// {joj 9/11/17}
			} else {
				if (varImports.contains("VObj") == 0)														// {joj 8/10/16}
					varImports += "VObj";
				JS += QString("%0.prototype = Object.create(VObj.prototype)").arg(qs);						// {joj 9/11/17}
			}
			//NEWLINEJS();																					// {joj 9/11/17}
			//JS += QString("%0.constructor = %1;").arg(qs).arg(string[ast->id0]);							// {joj 9/11/17}
		}
		k = savek;
		j = savej;
		i = savei;
		break;
	}

	case funcAST:
		savei = i;
		savej = j;
		savek = k;			
		obj = find(ast->id0, scope);
		if (obj->flags & CANWAIT) {
			i = 1;
			j = js[1].size();
			k = 0;
			js[1].append(QStringList(""));
			if (obj->caseLabel == -1)
				obj->caseLabel = caseLabel++;
			JS += QString("££%0").arg(obj->caseLabel);
			NEWLINEJS();
			JS += QString("enterf(%0);\t// %1").arg(obj->addr - 1).arg(string[ast->id0]);	// locals start at address 1
			NEWLINEJS();
			genJS(i, j, k, ast->arg.last(), obj);	// blockAST
			NEWLINEJS();
			JS += QString("returnf(%0)").arg(obj->parameter.size());
			NEWLINEJS();
			JS += "continue";
		} else {
			i = 0;
			j = js[0].size();
			k = 0;
			js[0].append(QStringList(""));
			if (obj->flags & INOBJECT) {
				QString qs = fullName(obj, scope);												// {joj 9/11/17}
				JS += QString("%0 = function(").arg(qs);										// {joj 9/11/17}
			} else { 
				JS += QString("function %0(").arg(string[ast->id0]);
			}
			for (int ii = 0; ii < ast->arg.size() - 1; ii++) {
				if (ii)
					JS += ", ";
				genJS(i, j, k, ast->arg[ii], scope);
			}
			JS += ")";
			genJS(i, j, k, ast->arg.last(), obj);	// blockAST
		}
		k = savek;
		j = savej;
		i = savei;
		break;

	case paramAST:
		JS += QString("%0").arg(string[ast->id1]);
		//if (ast->arg.size()) {
		//	JS += " = ";
		//	genJS(i, j, k, ast->arg[0], scope);
		//}
		break;

	case condExprAST:
		genJS(i, j, k, ast->arg[0], scope);
		JS += " ? ";
		genJS(i, j, k, ast->arg[1], scope);
		JS += " : ";
		genJS(i, j, k, ast->arg[2], scope);
		break;

	case blockAST:
		if (i) {
			for (int ii = 0; ii < ast->arg.size(); ii++) {
				if ((ast->arg[ii]->op != classAST) && (ast->arg[ii]->op != funcAST) && (ast->arg[ii]->op != constAST))
					NEWLINEJS();
				genJS(i, j, k, ast->arg[ii], scope);
			}
		} else {
			JS += " {";
			if ((scope->flags & CONSTRUCTOR) && (scope->parentScope != topScope)) {		// {joj 25/7/17}
				NEWLINEJS();						// {joj 25/7/17}
				JS += "this.$parent = $parent";		// {joj 25/7/17}
			}										// {joj 25/7/17}
			if (ast->flags & ASTVOBJ) {
				NEWLINEJS();
				JS += "VObj.call(this)";
			}
			for (int ii = 0; ii < ast->arg.size(); ii++) {
				if ((ast->arg[ii]->op != classAST) && (ast->arg[ii]->op != funcAST) && (ast->arg[ii]->op != constAST))
					NEWLINEJS();
				genJS(i, j, k, ast->arg[ii], scope);
				//if ((JS.endsWith("}") == 0) && (ast->arg[ii]->op != classAST) && (ast->arg[ii]->op != funcAST))
				//	JS += ";";
			}
			NEWLINEJS();
			JS += "}";
		}
		break;

	case exprListAST:
		genJS(i, j, k, ast->arg[0], scope);
		for (int ii = 1; ii < ast->arg.size(); ii++) {
			JS += ", ";
			genJS(i, j, k, ast->arg[ii], scope);
		}
		break;

	case whenAST:																	// {joj 22/9/17}
		genJS(i, j, k, ast->arg[1], scope);											// generate event function
		if (find(ast->id0, scope)->flags & EVENTF) {								// global event handler
			JS += QString("addGlobalEventHandler(\"%0\", ").arg(string[ast->id0]);	// add global event handler {joj 27/10/17}
		} else {
			if (ast->arg[0]) {														// add global event handler
				genJS(i, j, k, ast->arg[0], scope);
			} else {
				JS += (scope->level == GLOBAL) ? "$g[0]" : "this";
			}
			JS += QString(".addEventHandler(\"%0\", ").arg(string[ast->id0]);
		}
		if (ast->arg[0]) {
			JS += "this, ";
		} else {
			JS += (scope->level == GLOBAL) ? "0, " : "this, ";
		}
		r = find(ast->arg[1]->id0, scope);
		if (r->flags & CANWAIT) {					// {joj 24/9/17}
			JS += QString("%0").arg(r->caseLabel);
		} else {
			if (r->flags & INOBJECT) 
				JS += "this.";
			JS += string[ast->arg[1]->id0];
		}
		JS += ")";
		break;

	case baseAST:	// {joj 27/7/17}
	case thisAST:
		r = scope;
		while (r->objTyp != TypObj)
			r = r->parentScope;
		if (i) {
			JS += "$obj";
		} else {
			JS += "this";
		}
		break;

	case assignRefAST: {											// {joj 17/10/17}
		if (ast->arg.length() == 1) {								// {joj 20/10/17}
			int startPos = js[i][j][k].length();
			genJS(i, j, k, ast->arg[0], scope);
			int endPos = js[i][j][k].length();
			QString s = js[i][j][k].right(endPos - startPos);
			js[i][j][k].chop(endPos - startPos);
			js[i][j][k] += genByRef(s);
		} else {													// {joj 20/10/17}
			genJS(i, j, k, ast->arg[0], scope);						// {joj 20/10/17}
			JS += " = ";											// {joj 20/10/17}
			int startPos = js[i][j][k].length();					// {joj 20/10/17}
			genJS(i, j, k, ast->arg[1], scope);						// {joj 20/10/17}
			int endPos = js[i][j][k].length();						// {joj 20/10/17}
			QString s = js[i][j][k].right(endPos - startPos);		// {joj 20/10/17}
			js[i][j][k].chop(endPos - startPos);					// {joj 20/10/17}
			js[i][j][k] += genByRef(s);								// {joj 20/10/17}
		}															// {joj 20/10/17}
		break;
	}

	case progAST:
		for (int ii = 0; ii < ast->arg.size(); ii++) {
			if ((ast->arg[ii]->op != classAST) && (ast->arg[ii]->op != funcAST))
				NEWLINEJS();
			genJS(i, j, k, ast->arg[ii], scope);
			//if ((JS.endsWith("}") == 0) && (JS.startsWith("££") == 0) && JS.length())	// handles case where const or var declarations are moved
			//	JS += ";";
		}
		NEWLINEJS();
		JS += "returnf(0)";
		if (vApp->testFlag) {		// {joj 27/9/17}
			NEWLINEJS();
			JS += "closeIDE()";
		}
		NEWLINEJS();
		JS += "continue";
		break;

	case undefinedAST:				// {joj 1/8/17}
		JS += "undefined";
		break;

	default:
		TRACE(QString("genJS: unexpected ast->op: %0").arg(astToStr[ast->op]));
		Q_ASSERT(0);

	}

	if (ast->flags & ASTPRECEDENCE)
		JS += ")";

	return r;
}

//
// parse
//
// LL(2) parser
//
// added exception handling {joj 12/2/06}
// exceptions not caught in DEBUG version so cause of exception can be determined
//
// multipass compiler allows forward definitions
//
// Class T0() {
//	T1 t1;
// }
// 
// Class T1() {
//	T0 t1;
// }
// 
// int v = 0;		// global
// 
// function F() {
//	v = 1;			// will use local rather than global v
//	int v = 2;		// even though v is defined later
// }
//
//
// pass 1: all declared class, function and variable names are entered into scope (by id).
// pass 2: all names are looked by id
//
AST* Compiler::pass1(int &pragma) {
#ifndef QT_DEBUG
	try {
#endif
		pragma = 0;								// {joj 11/10/07}
		init();

		sym1 = nullSym;							// {joj 21/8/16}
		getSym();								// get first symbol
		getSym();								// get second symbol

		AST *ast = program();					// {joj 19/8/16}

		if (sym != eofSym)
			pass1Error("end-of-file expected");	//

		return ast;

		//closeScope();	// not sure why this causes problems

#ifndef QT_DEBUG
	} catch (...) {
		pass1Error("internal compiler error");
		return NULL;
	}
#endif
}

//
// diff
//
int Compiler::diff(int i, int j) {
	return QString::compare(string[i], string[j]);
}

//
// scanIdentifier
//
Symbol Compiler::scanIdentifier() {
	QString str;
	do {
		str += *chPtr++;
	} while (((NEXTCH() >= 'a') && (NEXTCH() <= 'z')) || ((NEXTCH() >= '0') && (NEXTCH() <= '9')) || ((NEXTCH() >= 'A') && (NEXTCH() <= 'Z')) || (NEXTCH() == '$') || (NEXTCH() == '_'));
	id1 = enter(str.toLatin1());			// rethink
	return idToSym.value(id1, idSym);
}

//
// scanNumber
//
// integer and real
//
Symbol Compiler::scanNumber() {
	QString str;
	do {
		str += *chPtr++;
	} while ((NEXTCH() >= '0') && (NEXTCH() <= '9'));
	if (NEXTCH() == '.') {	// decimal point
		str += *chPtr++;
		while ((NEXTCH() >= '0') && (NEXTCH() <= '9'))
			str += *chPtr++;
		if ((NEXTCH() == 'e') || (NEXTCH() == 'E')) {
			str += *chPtr++;
			if ((NEXTCH() == '-') || (NEXTCH() == '+'))
				str += *chPtr++;
			while ((NEXTCH() >= '0') && (NEXTCH() <= '9'))
				str += *chPtr++;
		}
	}
	num1 = str.toDouble();
	return numConstSym;
}

//
// scanHexNumber
//
Symbol Compiler::scanHexNumber() {
	QString str;
	do {
		str += *chPtr++;
	} while (isxdigit(NEXTCH()));	// C++ runtime
	unsigned int v = str.toUInt(0, 16);
	num1 = v;
	return numConstSym;
}

//
// scanString
//
Symbol Compiler::scanString() {
	QString str;
	chPtr++;						// skip "
	while (NEXTCH() != '"') {	
		if (NEXTCH() < ' ') {		// check for illegal characters
			pass1Error("illegal character");
			break;
		}
		char ch = *chPtr++;
        if (ch == '\\') {
			switch (NEXTCH()) {
			case 'n':				// \n
				str += "\\n"; chPtr++;
				break;
			case 'u':				// \u0123 unicode escape sequences {joj 23/3/18}
				str += "\\u"; chPtr++;
				for (int i = 0; i < 4; i++) {
					if (isxdigit(NEXTCH()) == 0) {
						pass1Error(QString("invalid unicode escape sequence (\\u%0)").arg(QString::fromLatin1(chPtr - i, i + 1)));
						break;
					}
					str += *chPtr++;
				}
				break;
			case 't':				// \t
				str += "\\t"; chPtr++;
				break;
			case '"':				// \"
				str += "\\\""; chPtr++;
				break;
			case '\\':				//
				str += "\\\\"; chPtr++;
				break;
			default:
				pass1Error("unexpected character");
			}
		} else {
			str += ch;
		}
	}
	chPtr++;
	id1 = enter(str.toLatin1());	// rethink
	return stringConstSym;
}

#ifdef QT_DEBUG
//
// debugSym
//
void Compiler::debugSym(Symbol sym) {
	TRACE(QString("line %0: ").arg(line) + symToQString(sym));
}
#endif

//
// symToQString
//
QString Compiler::symToQString(Symbol sym) {
	switch (sym) {
	case numConstSym:
		return QString("%0").arg(num1);
		break;
	case stringConstSym:
		return QString("\"%0\"").arg(string[id1]);
		break;
	case idSym:
		return QString("%0").arg(string[id1]);
		break;
	default:
		return QString("%0").arg(symToStr[sym]);
	}
}

//
// getSymHelper
//
// read next symbol from source file
//
void Compiler::getSymHelper() {
	sym = sym1;
	id = id1;
	num = num1;
	linePtr = linePtr1;
	line = line1;

	while (1) {

		switch (NEXTCH()) {

		case 0:	 // eof
			if (fileState.size()) {
				popFileState();
				continue;
			} else {
				sym1 = eofSym;
			}
			return;

		case LF: // line feed
			chPtr++;
			linePtr1 = chPtr;
			line1++;
			continue;

		case TAB:	// tab
		case CR:	// carriage return
		case ' ':	// space
			chPtr++;
			continue;

		case 'A': case 'B': case 'C': case 'D': case 'E': case 'F':
		case 'G': case 'H': case 'I': case 'J': case 'K': case 'L':
		case 'M': case 'N': case 'O': case 'P': case 'Q': case 'R':
		case 'S': case 'T': case 'U': case 'V': case 'W': case 'X':	case 'Y': case 'Z':
		case 'a': case 'b': case 'c': case 'd': case 'e': case 'f':
		case 'g': case 'h': case 'i': case 'j': case 'k': case 'l':
		case 'm': case 'n': case 'o': case 'p': case 'q': case 'r':
		case 's': case 't': case 'u': case 'v': case 'w': case 'x':	case 'y': case 'z':
		//case '$':
		case '_':
		case '#': // #include, #pragma, ...
			sym1 = scanIdentifier();
			return;

		case '0': case '1': case '2': case '3': case '4':
		case '5': case '6': case '7': case '8': case '9':
			if (*chPtr == '0') {
				chPtr++;
				if ((NEXTCH() == 'x') || (NEXTCH() == 'X')) {
					chPtr++;
					sym1 = scanHexNumber();
					return;
				}
				chPtr--;
			}
			sym1 = scanNumber();
			return;

		case '"':
			sym1 = scanString();
			return;

		case '&':
			chPtr++;
			if (NEXTCH() == '&') {
				chPtr++;
				sym1 = candSym;
				return;
			} else if (NEXTCH() == '=') {
				chPtr++;
				sym1 = andEqlSym;
				return;
			}
			sym1 = andSym;
			return;

		case '(':
			chPtr++;
			sym1 = lparSym;
			return;

		case ')':
			chPtr++;
			sym1 = rparSym;
			return;

		case '*':
			chPtr++;
			if (NEXTCH() == '=') {
				chPtr++;
				sym1 = mulEqlSym;
			} else {
				sym1 = mulSym;
			}
			return;

		case '+':
			chPtr++;
			if (NEXTCH() == '=') {
				chPtr++;
				sym1 = addEqlSym;
			} else if (NEXTCH() == '+') {
				chPtr++;
				sym1 = addAddSym;
			} else {
				sym1 = addSym;
			}
			return;

		case ',':
			chPtr++;
			sym1 = commaSym;
			return;

		case '-':
			chPtr++;
			if (NEXTCH() == '=') {
				chPtr++;
				sym1 = minusEqlSym;
			} else if (NEXTCH() == '-') {
				chPtr++;
				sym1 = minusMinusSym;
			} else {
				sym1 = minusSym;
			}
			return;

		case '.':
			chPtr++;
			sym1 = dotSym;
			return;

		case '/':
			chPtr++;
			if (NEXTCH() == '/') {
				while ((NEXTCH() != LF) && (NEXTCH() != 0)) // skip comment to end of line
					chPtr++;
				continue;
			} else if (NEXTCH() == '=') {
				chPtr++;
				sym1 = divEqlSym;
			} else {
				sym1 = divSym;
			}
			return;

		case '%':
			chPtr++;
			if (NEXTCH() == '=') {
				chPtr++;
				sym1 = modEqlSym;
			} else {
				sym1 = modSym;
			}
			return;

		case ':':
			chPtr++;
			sym1 = colonSym;
			return;

		case ';':
			chPtr++;
			sym1 = semiSym;
			return;

		case '<':	// < <=  << <<=
			chPtr++;
			if (NEXTCH() == '=') {
				chPtr++;
				sym1 = leqSym;
			} else if (NEXTCH() == '<') {
				chPtr++;
				if (NEXTCH() == '=') {
					chPtr++;
					sym1 = shlEqlSym;
				} else {
					sym1 = shlSym;
				}
			} else {
				sym1 = lessSym;
			}
			return;

		case '=':	// = => ==
			chPtr++;
			if (NEXTCH() == '=') {
				chPtr++;
				sym1 = eqlSym;
			} else if (NEXTCH() == '>') {	// {joj 20/10/17}
				chPtr++;					// {joj 20/10/17}
				sym1 = assignRefSym;		// {joj 20/10/17}
			} else {
				sym1 = assignSym;
			}
			return;

		case '>':	// > >] >> >>=
			chPtr++;
			if (NEXTCH() == '=') {
				chPtr++;
				sym1 = geqSym;
			} else if (NEXTCH() == ']') {
				chPtr++;
				sym1 = rboundSym;
			} else if (NEXTCH() == '>') {
				chPtr++;
				if (NEXTCH() == '=') {
					chPtr++;
					sym1 = shrEqlSym;
				} else {
					sym1 = shrSym;
				}
			}  else {
				sym1 = greaterSym;
			}
			return;

		case '[':	// [ [<
			chPtr++;
			if (NEXTCH() == '<') {
				chPtr++;
				sym1 = lboundSym;
			} else {
				sym1 = lbrakSym;
			}
			return;

		case ']':
			chPtr++;
			sym1 = rbrakSym;
			return;

		case '^':
			chPtr++;
			if (NEXTCH() == '=') {
				chPtr++;
				sym1 = xorEqlSym;
			} else {
				sym1 = xorSym;
			}
			return;

		case '{':
			chPtr++;
			sym1 = lbraceSym;
			return;

		case '|':
			chPtr++;
			if (NEXTCH() == '|') {
				chPtr++;
				sym1 = corSym;
			} else if (NEXTCH() == '=') {
				chPtr++;
				sym1 = orEqlSym;
			} else {
				sym1 = orSym;
			}
			return;

		case '}':
			chPtr++;
			sym1 = rbraceSym;
			return;

		case '!':
			chPtr++;
			if (NEXTCH() == '=') {
				chPtr++;
				sym1 = neqSym;
			} else {
				sym1 = notSym;
			}
			return;

		case '~':
			chPtr++;
			if (NEXTCH() == '>') {
				chPtr++;
				sym1 = firesSym;
			}
			else {
				sym1 = invertSym;
			}
			return;

		case '?':
			chPtr++;
			sym1 = qmarkSym;
			return;

		default:
			chPtr++;
			sym1 = nullSym;
			return;

		}
	}
}

//
// getSym
//
void Compiler::getSym() {
	getSymHelper();
	//DEBUGSYM(sym1);
}

// eof
