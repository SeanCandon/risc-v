#pragma once

//
// compiler.h
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

class InfoWnd;						// quicker than include "infoWnd.h"

#define NFILENAMES		16			// initial number of files names

enum Symbol	{

	nullSym,
	mulSym, divSym, modSym, shrSym, shlSym,
	andSym, addSym, minusSym, xorSym, orSym,
	eqlSym, neqSym, lessSym, leqSym, greaterSym, geqSym,
	invertSym, notSym, addAddSym, minusMinusSym,
	candSym, corSym,
	assignSym, assignRefSym, addEqlSym, minusEqlSym, mulEqlSym, divEqlSym, modEqlSym, orEqlSym, andEqlSym, xorEqlSym, shrEqlSym, shlEqlSym,		// {joj 20/10/17}
	numConstSym, stringConstSym, 
	dotSym, commaSym, colonSym, firesSym, ellipsisSym, qmarkSym,
	lparSym, rparSym, lbrakSym, rbrakSym, lbraceSym, rbraceSym, rboundSym, lboundSym,
	semiSym,
	idSym, numSym, stringSym,
	ifSym, elseSym,
	forSym, foreachSym, doSym, whileSym, breakSym, continueSym, funcSym, returnSym,
	constSym, classSym, thisSym, pragmaSym, includeSym, staticSym, extendsSym, inSym,
	baseSym, undefinedSym,	whenSym,																											// {joj 22/9/17}
	eofSym

};

//
// compile flags
//
#define CHECKERRS					1		// check compile errors
#define COMPRESS					2		// compress vcode
#define FORCECOMPILE				4		// force compile flag

//
// addressing mode flags
//
#define GLOBAL		0
#define	OBJECT		1
#define	LOCAL		2

//
// Obj flags
//
// TypObj 
//
#define	BUILTINOBJ				0x00010000					// builtin object type
#define EXTENDABLE				0x00020000					// user extendable {joj 20/1/06}
#define EXTENDABLEBUILTINOBJ	(BUILTINOBJ | EXTENDABLE)	// {joj 20/1/06}
#define ARRAY					0x00040000					// an array {joj 31/7/17}
#define AARRAY					0x00080000					// an associative array (ARRAY will also be set) {joj 31/7/17}
#define HASPOPTIONAL			0x00100000					// function has optional parameters
#define	VALIDTYPPTR				0x00200000					// {joj 31/7/17}
#define CANWAIT					0x00400000					// function can wait
#define PARAMETER				0x00800000					// parameter
#define GOBJ					0x02000000					// GObj function {joj 25/8/16}
#define CONSTRUCTOR				0x04000000					// constructor
#define INOBJECT				0x08000000					// method in object
#define EXTCONSTANT				0x10000000					// external constant that needs to be imported
#define CONSTANT				0x20000000					// {joj 2/9/16}
#define IMPORT					0x40000000					// need to import from vivio.js runtime {joj 2/9/16}
#define IMPORTED				0x80000000					// mark as imported {joj 2/9/16}

//
// VarObj
//
#define BYREF					0x01000000
//#define STATICMEMBER			0x80000000					// static member {joj 28/1/08}
//#define CANREUSEVAR			0x40000000					// can reuse {joj 8/7/08}
//#define AAKEYSTRING			0x20000000					// key string {joj 14/7/08}

//
// BlockObj
//

//
// MethodObj
//
#define NORMAL					0x00000000					// nothing special
#define BUILTINMETHOD			0x00000001					// builtin method
#define OPTARG_ANY				0x00000002					// optional # of arguments of any type
#define OPTARG_NUM				0x00000004					// optional # of integer arguments
#define OPTARG_GOBJ				0x00000010					// optional # of GObj arguments attach/detach
#define EVENTF					0x00000020					// global event handler {joj 26/10/17}
#define GOBJEVENTF				0x00000040					// gobj event handler {joj 26/10/17}
#define WAITF					0x00000080					// wait function
#define FORKF					0x00000100					// fork function

//
// exprObj
//

class Param;												// forward definition

#define ASTPRECEDENCE			0x00000001
#define ASTPOST					0x00000002
#define ASTOBJECT				0x00000004
#define ASTLOCAL				0x00000008
#define ASTCONSTRUCTOR			0x00000010
#define ASTINIT					0x00000020
#define ASTCANWAIT				0x00000040
#define ASTFORKF				0x00000080
#define ASTVOBJ					0x00000100
#define ASTBYREF				0x00000200					// {joj 6/10/17}
#define ASTPASSBYREF			0x00000400					// {joj 6/10/17}

enum ASTOp	{
	nullAST,
	mulAST, divAST, modAST, shrAST, shlAST,
	andAST, addAST, minusAST, xorAST, orAST,
	eqlAST, neqAST, lessAST, leqAST, grtAST, geqAST,
	invertAST, notAST, addaddAST, minusminusAST,
	candAST, corAST,
	assignAST, assignRefAST, addEqlAST, minusEqlAST, mulEqlAST, divEqlAST, modEqlAST, orEqlAST, andEqlAST, xorEqlAST, shrEqlAST, shlEqlAST,		// {joj 24/10/17}
	numAST, stringAST, 
	callAST, negAST, 
	constAST, varAST, idAST, ifAST, dotAST, indexAST, classAST, funcAST, paramAST, condExprAST, blockAST, returnAST,
	forAST, foreachAST, whileAST, doAST, exprListAST, baseAST, thisAST, progAST, selectorAST, breakAST, continueAST,							// {joj 4/8/17}
	typListAST, initAST, undefinedAST, whenAST																									// {joj 20/10/17}
};


//
// Obj
//

enum ObjTyp {TypObj, VarObj, MethodObj, BlockObj, ExprObj, RefObj};

class Obj {

public:

	ObjTyp objTyp;									// ObjType
	int id;											// id
	Obj *left;										// left pointer
	Obj *right;										// right pointer
	int flags;										// flag
	int typID;										// type iD or ID for return / element
	Obj* typPtr;									// pointer to type object  {joj 31/7/17}
	int level;										// addressing mode (0:global, 1:object or 2:local)
	int addr;										// used to access globals and in CANWAIT code
	int caseLabel;									// valid if flags & CANWAIT
	Obj *parentScope;								// TypObj, MethodObj, BlockObj
	Obj *members;									// objects in scope
	int derivedFromID;								// {joj 21/9/17}
	Obj *derivedFrom;								// derived from class
	QVector<Param*> parameter;						// parameters
	QVector<Obj*> calls;							// the unique functions a class constructor or function calls

	// methods

	Obj(int, ObjTyp);								// constructor
	void addParam(Obj*, int = 0, double = 0);		// add formal parameter helper
	int isDerivedFrom(Obj*);						// {joj 10/8/17}

};

//
// AST
//
class AST {

public:

	ASTOp op;										//
	int id0;										//
	int id1;										//
	double num;										// {joj 17/9/16}
	int flags;										//
	QVector<AST*> arg;								//
	Obj* r;											// remember lookup {joj 10/11/17}
	int srcFileNo;									//
	char *linePtr;									//
	int line;										//

	AST(ASTOp, int, char*, int);					// constructor

};

//
// Param
//
class Param {	
public:
	Obj *varObj;									// var object
	int flags;										// flag
	double defaultVal; 								// default value (always save as an int) {joj 31/7/08}
	AST *ast;										// {joj 2/11/16}
	Param(Obj*, int, double);						// constructor
};

//
// FileState
//
class FileState {
public:
	int srcFileNo;
	char *endOfFilePtr;
	char *linePtr;
	char *endPtr;
	char *chPtr;
	int line1;
};

//
// Parameter flags
//
#define POPTIONAL		1					// optional parameter
//#define BYREF			2					// parameter passed by reference

//
// Compiler
//
class Compiler : public QObject {

public:

	Compiler(InfoWnd*);													// constructor
	~Compiler();														// destructor
	int compile(const QString&, int, QString*);							// compile
		
	Obj* topScope;														// top scope

private:

	void init();														// init
	void tidyUp();														// tidyUp
	QString findVivioJS();												// find vivio.js file

	InfoWnd *infoWnd;													//

//
// pass1 syntax analysis
//

	QVector<QString> string;											// {joj 24/8/16}
	QHash<QString, int> stringToId;										// {joj 24/8/16}
	QHash<int, Symbol> idToSym;											// {joj 24/8/16}
	QString symToQString(Symbol);										// {joj 1/9/16}
	Obj* undefinedConst;												// {joj 1/8/17}
	int numID;															// {joj 22/9/17}
	int ehn;															// event handler number {joj 22/9/17}

	AST* newAST(ASTOp);													// new AST
	AST* newAST(ASTOp, int);											// new AST
	AST* newAST(ASTOp, double);											// new AST
	AST* newAST(ASTOp, int, int);										// new AST
	AST* newAST(ASTOp, int, AST*);										// new AST {joj 22/9/17}
	AST* newAST(ASTOp, AST*);											// new AST
	AST* newAST(ASTOp, AST*, AST*);										// new AST
	AST* newAST(ASTOp, AST*, AST*, AST*);								// new AST

	AST* pass1(int&);													// pass1 {joj 19/8/16}
	void pass1Error(QString);											// pass1 error

	void getSymHelper();												// {joj 21/8/16}
	void getSym();														// {joj 21/8/16}
	Symbol scanIdentifier();											// {joj 24/8/16}
	Symbol scanNumber();												// {joj 24/8/16}
	Symbol scanHexNumber();												// {jpj 24/8/16}
	Symbol scanString();												// {joj 5/3/10}
	int diff(int, int);
	int enterKeyWord(const char*, Symbol);								// {joj 22/9/17}
	AST* statement();													// {joj 19/8/16}
	AST* constDeclaration();											// {joj 25/8/16}
	AST* varDeclaration();												// {joj 2/9/16}
	AST* declarationOrExpression();										// {joj 15/9/16}
	AST* declarationOrStatement();										// {joj 21/8/16}
	AST* program();														// program {joj 19/8/16}
	AST* block();														// block {joj 25/8/16}
	int checkSym(Symbol, QString);										// check symbol

	void error(int, char*, int, QString&);								// error
	void pass2Error(AST*, QString);										// pass2 error

	AST* funcCall(AST*);												// {joj 25/8/16}
	AST* selector(AST*);												// {joj 22/9/17}
	AST* formalParams(AST*, Obj*, int);                                 // formal parameters {joj 22/9/17}

	AST* factor();														// factor {joj 19/8/16}
	AST* unary();														// unary {joj 19/8/16}
	AST* expression6();													// expression6 {joj 19/8/16}
	AST* expression5();													// expression5 {joj 19/8/16}
	AST* expression4();													// expression4 {joj 19/8/16}
	AST* expression3();													// expression3 {joj 19/8/16}
	AST* expression2();													// expression2 {joj 19/8/16}
	AST* expression1();													// expression1 {joj 19/8/16}
	AST* expression();													// expression {joj 19/8/16}
	AST* expressionList();												// ExpressionList {joj 28/9/16}
	AST* declarationOrExpressionList();									// declarationOrExpressionList {joj 15/9/16}

	AST* classDeclaration();											// class declaration
	AST* forStatement();												// for statement
	AST* foreachStatement();											// foreach statement
	//void forkParameter(Item*);										// forkParameter {joj 30/1/07}
	AST* functionDeclaration(int, int);									// function declaration {joj 22/9/17}
	int includeWorker(QString);											// include statement worker
	void includeStatement();											// include statement
	AST* ifStatement();													// if statement
	AST* whileStatement();												// while statement
	AST* doWhileStatement();											// do while statement {joj 31/1/10}
	AST* whenStatement();												// when statement {joj 22/9/17}
	AST* returnStatement();												// return statement
	AST* arrayDeclaration(Obj*, int);									// array initialisation {joj 31/7/17}
	AST* arrayInit(int);												// array initialisation {joj 28/7/17}

//
// pass2 semantic analysis
//
	Obj* eval(AST*, Obj*);								// eval
	Obj *findInScope(int, Obj*, int);					// {joj 16/11/16}
	Obj* findGroupObj(Obj*);							// 
	int isDerivedFromGObj(Obj*);						// true if derived from GObj
	int isDerivedFromGroupObj(Obj*);					// true if derived from GroupObj
	QString fullName(Obj*, Obj*);						// {joj 9/11/17}
	QString memberName(int, Obj*, int);					// {joj 27/7/17}

	Obj* find(int, Obj*);								// {joj 20/8/16}
	Obj* findScope(Obj*, Obj*);							// {joj 7/9/16}
	int enter(const char*);								// {joj 24/8/16}
	Obj *enterTyp(const char*, Obj*, int);				// create a type

	Obj *enterExtraConstructor(const char*, Obj*, int);	// create extra constructor

	Obj *enterConst(const char*, Obj*);					// create a constant
	Obj *enterMethod(Obj*, const char*, int);			// create a method
	Obj *newObj(int, ObjTyp);							//
	Obj *newVar(Obj*, int = 0);							// {joj 3/10/17}
	Obj *newArrayObj(int, int);							// {joj 20/9/17}
	Obj *newExpr(Obj*);									// {joj 19/9/17}
	Obj *newRef(Obj*);									// {joj 17/10/17}
	Obj* pushScope(Obj*);								// push scope
	void popScope();									// pop scope

	int compatible(AST*, Obj*, Obj*, Obj*);				// check if types are compatible
	Obj* compatibleBinOp(int, Obj*, Obj*, Obj*);		// check if valid binary op
	int assignmentCompatible(AST*, Obj*, Obj*, Obj*);	// check if assignment compatible
	Obj* resolveTyp(AST*, Obj*, Obj*);					// resolve type

	QVector<Obj*> func;									// {joj 18/9/16}
	void determineCanWaitFuncs();						// {joj 18/9/16}
	int checkCanWaitFuncs();							// {joj 14/11/17}
	Obj *numExpr;										// {joj 19/9/17}
	Obj *stringExpr;									// {joj 19/9/17}
	Obj *zeroExpr;										// {joj 21/9/17}
	Obj *undefinedExpr;									// {joj 21/9/17}
	Obj *voidVar;										// {joj 16/9/17}
	Obj *voidArrayVar;									// {joj 16/9/17}

//
// pass3 code generation
//
	QStringList constImports;							// {joj 6/9/16}
	QStringList varImports;								// {joj 2/9/16}
	QStringList constDefs;								// {joj 6/9/16}
	QVector<QStringList> js[2];							// {joj 27/9/16}
	QVector<int> loopStart;								// {joj 6/10/16}
	QVector<int> loopEnd;								// {joj 6/10/16}
	int caseLabel;										// {joj 15/9/16}

	QString genByRef(QString);							// {joj 6/10/17}
	Obj* genJS(int, int, int&, AST*, Obj*);				// genJS {joj 27/9/16}

	char *endOfFilePtr;									// end of file ptr (into file buffer)
	char *linePtr, *linePtr1;							// points to start of current line
	char *chPtr;										// current character in file buffer
	int id, id1;										//
	double num, num1;									// num constants {joj 17/9/16}
	int line, line1;									// current line number

	Symbol sym;											// current symbol
	Symbol sym1;										// next symbol
	int eventpc;
	Obj* globalScope;									// global scope
	Obj *voidTyp;										// void type
	Obj *numTyp;										// num type
	Obj *stringTyp;										// string type
	Obj *pathTyp;										// Path type
	Obj *penTyp;										// Pen type
	Obj *brushTyp;										// null brush type object
	Obj *fontTyp;										// Font object type object
	Obj *layerTyp;										// layer type
	Obj *gobjTyp;										// base type for graphical object
	Obj *arcTyp;										// arc object
	Obj *bezierTyp;										// bezier object
	Obj	*ellipseTyp;									// ellipse object
	Obj *imageTyp;										// image object
	Obj *lineTyp;										// line object
	Obj	*pieTyp;										// pie object
	Obj *polygonTyp;									// polygon object
	Obj *broadcastChannelTyp;
	Obj *rectangleTyp;									// rectangle object
	Obj	*shapeTyp;										// shape object
	Obj *splineTyp;										// cardinal spline
	Obj *groupTyp;										// group object
	Obj *nullConst;										// NULL object

	Obj *numVar;										// int variable (used by inbuilt functions)
	Obj *stringVar;										// string variable (used by inbuilt functions)
	Obj *stringArrayVar;								// string array variable (used by inbuilt functions)
	Obj *brushVar;										// brush variable (used by inbuilt functions)
	Obj *penVar;										// pen variable (used by inbuilt functions)
	Obj *fontVar;										// font variable (used by inbuilt functions)
	Obj *pathVar;										// path variable (used by inbuilt functions)
	Obj *layerVar;										// layer variable (used by inbuilt functions)
	Obj *groupVar;										// group variable (used by inbuilt functions)
	Obj *gobjVar;										// gObj variable (used by inbuilt functions)

	//
	// general
	//
	int srcFileNo;										// source file number
	QVector<QString> srcFileName;						// source file names {joj 4/9/16}
	QVector<char*> srcFileBuf;							// source file buffers
	QVector<char*> endFileBuf;							// end of file buffere {joj 5/9/16}
	QVector<FileState*> fileState;						// {joj 5/9/16}
	void pushFileState();								// {joj 5/9/16}
	void popFileState();								// {joj 5/9/16}
	int errors;											// # errors
	int lastErrFnIndex;									// last error file index
	int lastErrLine;									// last error line number (in file)
	QString lastErrMsg;									// last error msg

#ifdef QT_DEBUG

	void debugSym(Symbol);								// {joj 17/8/16}

#endif

};

// eof
