"use strict"

function dlx(vplayer) {

	const ABSOLUTE = vplayer.ABSOLUTE
	const ARROW60_END = vplayer.ARROW60_END
	const BEVEL_JOIN = vplayer.BEVEL_JOIN
	const BLACK = vplayer.BLACK
	const BLUE = vplayer.BLUE
	const BOLD = vplayer.BOLD
	const BUTT_END = vplayer.BUTT_END
	const DASH = vplayer.DASH
	const DOT = vplayer.DOT
	const GRAY192 = vplayer.GRAY192
	const GRAY224 = vplayer.GRAY224
	const GRAY64 = vplayer.GRAY64
	const GREEN = vplayer.GREEN
	const HLEFT = vplayer.HLEFT
	const ITALIC = vplayer.ITALIC
	const MB_LEFT = vplayer.MB_LEFT
	const MB_RIGHT = vplayer.MB_RIGHT
	const RED = vplayer.RED
	const ROUND_END = vplayer.ROUND_END
	const ROUND_JOIN = vplayer.ROUND_JOIN
	const ROUND_START = vplayer.ROUND_START
	const SMALLCAPS = vplayer.SMALLCAPS
	const SOLID = vplayer.SOLID
	const STRIKETHROUGH = vplayer.STRIKETHROUGH
	const VTOP = vplayer.VTOP
	const WHITE = vplayer.WHITE
	const YELLOW = vplayer.YELLOW

	var $g = vplayer.$g
	var addWaitToEventQ = vplayer.addWaitToEventQ
	var checkPoint = vplayer.checkPoint
	var endParallel = vplayer.endParallel
	var floor = vplayer.floor
	var Font = vplayer.Font
	var fork = vplayer.fork
	var getArg = vplayer.getArg
	var getArgAsNum = vplayer.getArgAsNum
	var getMessage = vplayer.getMessage
	var getTitle = vplayer.getTitle
	var getURL = vplayer.getURL
	var Group = vplayer.Group
	var Image = vplayer.Image
	var isHart2 = vplayer.isHart2
	var Layer = vplayer.Layer
	var Line = vplayer.Line
	var Line2 = vplayer.Line2
	var newArray = vplayer.newArray
	var Polygon = vplayer.Polygon
	var R$ = vplayer.R$
	var Rectangle = vplayer.Rectangle
	var Rectangle2 = vplayer.Rectangle2
	var reset = vplayer.reset
	var rgba = vplayer.rgba
	var round = vplayer.round
	var sendToMem = vplayer.sendToMem
	var setArg = vplayer.setArg
	var setBgBrush = vplayer.setBgBrush
	var setTPS = vplayer.setTPS
	var setViewport = vplayer.setViewport
	var SolidBrush = vplayer.SolidBrush
	var SolidPen = vplayer.SolidPen
	var sprintf = vplayer.sprintf
	var sqrt = vplayer.sqrt
	var startParallel = vplayer.startParallel
	var stop = vplayer.stop
	var stringToNum = vplayer.stringToNum
	var terminateThread = vplayer.terminateThread
	var timeMS = vplayer.timeMS
	var Txt = vplayer.Txt
	var VObj = vplayer.VObj

	const THIN = 1
	const MEDIUM = 3
	const THICK = 5
	const DARK_BLUE = rgba(0, 0, 0.625)
	const LIGHT_BLUE = rgba(0.75, 1, 1)
	const PURPLE = rgba(0.75, 0.625, 0.75)
	const BORDEAU = rgba(0.375, 0, 0)
	const MARINE = rgba(0.375, 0.625, 0.375)
	const LIGHT_YELLOW = rgba(1, 1, 0.75)
	const ORANGE = 16753920
	const LIGHT_RED = rgba(1, 0.80000000000000004, 0.79000000000000004)
	const LIGHT_GREEN = rgba(0.56000000000000005, 0.93000000000000005, 0.56000000000000005)
	const MEMORY_ADDRESSES = 18
	const WIDTH = 1000
	const HEIGHT = 490
	const maxexample = 5
	const NO_STALL = 0
	const DATA_STALL = 1
	const CTRL_STALL = 2
	const PIPELINING_ENABLED = 0
	const PIPELINING_DISABLED = 1
	const BRANCH_PREDICTION = 0
	const BRANCH_INTERLOCK = 1
	const DELAYED_BRANCHES = 2
	const LOAD_INTERLOCK = 0
	const NO_LOAD_INTERLOCK = 1
	const ALU_FORWARDING = 0
	const ALU_INTERLOCK = 1
	const NO_ALU_INTERLOCK = 2
	const FORWARDING_TO_SMDR = 0
	const STORE_INTERLOCK = 1
	const NO_STORE_INTERLOCK = 2
	const ZERO_FORWARDING = 0
	const ZERO_INTERLOCK = 1
	const NO_ZERO_INTERLOCK = 2
	const HART_1 = 1
	const HART_2 = 2
	const MAX_INSTR = 42
	const NOP = 0
	const ADD = 1
	const SUB = 2
	const AND = 3
	const OR = 4
	const XOR = 5
	const SLL = 6
	const SRL = 7
	const SRA = 8
	const SLT = 9
	const SGT = 10
	const SLE = 11
	const SGE = 12
	const ADDi = 13
	const SUBi = 14
	const ANDi = 15
	const ORi = 16
	const XORi = 17
	const SLLi = 18
	const SRLi = 19
	const SRAi = 20
	const SLTi = 21
	const SGTi = 22
	const SLEi = 23
	const SGEi = 24
	const LD = 25
	const ST = 26
	const BEQ = 27
	const BNE = 28
	const BLT = 29
	const BLE = 30
	const BGT = 31
	const BGE = 32
	const J = 33
	const JAL = 34
	const JR = 35
	const JALR = 36
	const MUL = 37
	const DIV = 38
	const REM = 39
	const LR = 40
	const SC = 41
	const HALT = 42
	const STALL = 43
	const EMPTY = 44
	const OP_TYPE_UNUSED = 0
	const OP_TYPE_REG = 1
	const OP_TYPE_IMM = 2
	const HORIZONTAL = 0
	const VERTICAL = 1
	const LEFT = 0
	const RIGHT = 1
	const TOP = 2
	const BOTTOM = 3
	const BUTTON_PE = 0
	const BUTTON_BP = 1
	const BUTTON_LI = 2
	const BUTTON_AF = 3
	const BUTTON_SF = 4
	const BUTTON_ZF = 5
	const BUTTON_SP = 6
	const BUTTON_PAR = 7
	const NUM_REGS = 32
	const REG_WIDTH = 20
	const REG_HEIGHT = 25
	const LOGOW = 20
	const LOGOH = 20
	const CHECK = 0
	const EXEC = 1

	var $thread = 0
	var $pc = 0
	var $fp = -1
	var $sp = -1
	var $acc = 0
	var $obj = 0
	var $stack = 0

	function callf(pc, obj) {
		if (obj === undefined)
			obj = 0
		let l = arguments.length - 1
		for (let i = l; i >= 2; i--)
			$stack[++$sp] = arguments[i]
		$acc = obj
		$stack[++$sp] = $pc + 1
		$pc = pc
		return $acc
	}

	function enterf(n) {	// n = # local variables
		$stack[++$sp] = $obj
		$stack[++$sp] = $fp
		$fp = $sp
		$obj = $acc
		$sp += n
	}

	function returnf(n) {	// n = # parameters to pop
		$sp = $fp
		$fp = $stack[$sp--]
		$obj = $stack[$sp--]
		$pc = $stack[$sp--]
		if ($pc == -1) {
			terminateThread($thread)
			$thread = 0
			return
		}
		$sp -= n
	}

	function suspendThread() {
		if ($thread == 0)
			return 0;
		$thread.pc = $pc
		$thread.fp = $fp
		$thread.sp = $sp
		$thread.acc = $acc
		$thread.obj = $obj
		return $thread
	}

	function waitTracker() {
		$pc++
		return $thread
	}

	function resumeThread(toThread) {
		$pc = toThread.pc
		$fp = toThread.fp
		$sp = toThread.sp
		$acc = toThread.acc
		$obj = toThread.obj
		$stack = toThread.stack
		$thread = toThread
	}

	function switchToThread(toThread) {
		if ($thread == toThread)
			return
		suspendThread()
		resumeThread(toThread)
	}

	function wait(ticks, pc) {
		$pc = (pc === undefined) ? $pc + 1 : pc
		suspendThread()
		addWaitToEventQ(ticks, $thread)
		return 1
	}

	function instrIsNop(instr) {
		return (instr==NOP || instr==STALL || instr==EMPTY || instr==HALT) ? 1 : 0
	}

	function instrIsMulti(instr) {
		return ((instr>=MUL) && (instr<=REM)) ? 1 : 0
	}

	function instrIsArRR(instr) {
		return ((instr>=ADD && instr<=SGE) || instrIsMulti(instr) || (instr==SC)) ? 1 : 0
	}

	function instrIsArRI(instr) {
		return ((instr>=ADDi) && (instr<=SGEi)) ? 1 : 0
	}

	function instrIsBranch(instr) {
		return ((instr>=BEQ) && (instr<=BGE)) ? 1 : 0
	}

	function isJorJAL(instr) {
		return ((instr==J) || (instr==JAL)) ? 1 : 0
	}

	function instrIsJumpR(instr) {
		return ((instr==JR) || (instr==JALR)) ? 1 : 0
	}

	function instrIsJump(instr) {
		return (isJorJAL(instr) || instrIsJumpR(instr)) ? 1 : 0
	}

	function instrIsBranchOrJump(instr) {
		return (instrIsBranch(instr) || isJorJAL(instr) || instrIsJumpR(instr)) ? 1 : 0
	}

	function instrIsJumpAndLink(instr) {
		return ((instr==JAL) || (instr==JALR)) ? 1 : 0
	}

	function instrIsAtomic(instr) {
		return ((instr==LR) || (instr==SC)) ? 1 : 0
	}

	function instrIsLoadOrStore(instr) {
		return ((instr==LD) || (instr==ST) || instrIsAtomic(instr)) ? 1 : 0
	}

	function instrOpTypeRdt(instr) {
		if (instrIsArRR(instr) || instrIsArRI(instr) || instrIsJumpAndLink(instr) || instrIsLoadOrStore(instr) || instrIsBranch(instr))
		return OP_TYPE_REG
		else 
		return OP_TYPE_UNUSED
	}

	function instrOpTypeRs1(instr) {
		if (instrIsNop(instr) || instrIsJumpR(instr) || isJorJAL(instr) || instr==LR)
		return OP_TYPE_UNUSED
		else 
		return OP_TYPE_REG
	}

	function instrOpTypeRs2(instr) {
		if (instrIsNop(instr))
		return OP_TYPE_UNUSED
		else 
		if (instrIsArRR(instr) || instrIsJumpR(instr) || instr==LR)
		return OP_TYPE_REG
		else 
		return OP_TYPE_IMM
	}

	function instrText(instr, rdt, rs1, rs2) {
		if (instrIsNop(instr))
		return sprintf("%s", $g[42][instr])
		else 
		if (instrIsArRR(instr))
		return sprintf("%s x%d,x%d,x%d", $g[42][instr], rdt, rs1, rs2)
		else 
		if (instrIsArRI(instr))
		return sprintf("%s x%d,x%d,%02X", $g[42][instr], rdt, rs1, rs2)
		else 
		if (instr==LD)
		return sprintf("LD x%d,x%d+%02X", rdt, rs1, rs2)
		else 
		if (instr==ST)
		return sprintf("ST x%d,x%d+%02X", rdt, rs1, rs2)
		else 
		if (instrIsBranch(instr))
		return sprintf("%s x%d,x%d,%02X", $g[42][instr], rdt, rs1, rs2)
		else 
		if (instr==LR)
		return sprintf("%s x%d, x%d", $g[42][instr], rdt, rs2)
		else 
		if (instr==J)
		return sprintf("%s %02X", $g[42][instr], rs2)
		else 
		if (instr==JAL)
		return sprintf("%s x%d, %02X", $g[42][instr], rdt, rs2)
		else 
		if (instr==JR)
		return sprintf("%s x%d", $g[42][instr], rs2)
		else 
		if (instr==JALR)
		return sprintf("%s x%d, x%d", $g[42][instr], rdt, rs2)
		return "EMPTY"
	}

	function se8(t) {
		if (t&128)
		return (-1^255|t)
		else 
		return t
	}

	function instrExecute(instr, op1, op2) {
		if (instr==ADD || instr==ADDi)
		return (se8(op1)+se8(op2))&255
		else 
		if (instr==SUB || instr==SUBi)
		return (se8(op1)-se8(op2))&255
		else 
		if (instr==AND || instr==ANDi)
		return op1&op2
		else 
		if (instr==OR || instr==ORi)
		return op1|op2
		else 
		if (instr==XOR || instr==XORi)
		return op1^op2
		else 
		if (instr==SLL || instr==SLLi)
		return (op1<<op2)&255
		else 
		if (instr==SRL || instr==SRLi)
		return (op1>>op2)&255
		else 
		if (instr==SRA || instr==SRAi)
		return arithShiftRight(op1, op2)
		else 
		if (instr==SLT || instr==SLTi)
		return op1<op2 ? 1 : 0
		else 
		if (instr==SGT || instr==SGTi)
		return op1>op2 ? 1 : 0
		else 
		if (instr==SLE || instr==SLEi)
		return op1<=op2 ? 1 : 0
		else 
		if (instr==SGE || instr==SGEi)
		return op1>=op2 ? 1 : 0
		else 
		if (instr==BEQ)
		return op1==op2 ? 1 : 0
		else 
		if (instr==BNE)
		return op1!=op2 ? 1 : 0
		else 
		if (instr==BLT)
		return op1<op2 ? 1 : 0
		else 
		if (instr==BLE)
		return op1<=op2 ? 1 : 0
		else 
		if (instr==BGT)
		return op1>op2 ? 1 : 0
		else 
		if (instr==BGE)
		return op1>=op2 ? 1 : 0
		else 
		if (instr==LD || instr==ST || instr==LR)
		return (se8(op1)+se8(op2))&255
		else 
		if (instr==JAL || instr==JALR)
		return op2
		else 
		return 238
	}

	function arithShiftRight(a, b) {
		let mask = 128
		for (let i = 0; i<b; i++) {
			let temp = a&mask
			a=(a>>1)&255
			a=a|temp
		}
		return a
	}

	function Instruction(_x, _y, _w, _h, _addr) {
		VObj.call(this)
		this.x = _x
		this.y = _y
		this.w = _w
		this.h = _h
		this.addr = _addr
		this.vIns = 0, this.vRdt = 0, this.vRs1 = 0, this.vRs2 = 0
		this.opTypeRdt = 0, this.opTypeRs1 = 0, this.opTypeRs2 = 0
		this.clk
		this.fw = this.w/6
		this.insPen = new SolidPen(0, 0, BLACK)
		this.rdtPen = new SolidPen(0, 0, BLACK)
		this.rs1Pen = new SolidPen(0, 0, BLACK)
		this.rs2Pen = new SolidPen(0, 0, BLACK)
		this.brush = new SolidBrush(WHITE)
		this.adr = new Rectangle2($g[0], $g[21], 0, 0, this.brush, this.x, this.y, this.fw, this.h, 0, $g[19], "%02X", this.addr)
		this.ins = new Rectangle2($g[0], $g[21], HLEFT, 0, this.brush, this.x+this.fw, this.y, 2*this.fw, this.h, this.insPen, $g[19], " NOP")
		this.rdt = new Rectangle2($g[0], $g[21], 0, 0, this.brush, this.x+3*this.fw, this.y, this.fw, this.h, this.rdtPen, $g[19], "-")
		this.rs1 = new Rectangle2($g[0], $g[21], 0, 0, this.brush, this.x+4*this.fw, this.y, this.fw, this.h, this.rs1Pen, $g[19], "-")
		this.rs2 = new Rectangle2($g[0], $g[21], 0, 0, this.brush, this.x+5*this.fw, this.y, this.fw, this.h, this.rs2Pen, $g[19], "-")
		this.dot = new Rectangle2($g[0], $g[21], 0, 0, $g[13], this.x+this.fw*0.80000000000000004, this.y+2, this.h/2, this.h/2)
		this.dot.setOpacity(0)
		this.arrowDown = new Line($g[0], $g[21], 0, $g[46], 0, 0, this.x+this.w+2, this.y+this.h*0.5, 5, 0, 0, 0, 0, 0)
		this.arrowUp = new Line($g[0], $g[21], 0, $g[46], 0, 0, this.x-2, this.y+this.h*0.5, -5, 0, 0, 0, 0, 0)
		this.arrowDown.setOpacity(0)
		this.arrowUp.setOpacity(0)
		this.adr.addEventHandler("eventEE", this, this.$eh0)
		this.ins.addEventHandler("eventEE", this, this.$eh1)
		this.rdt.addEventHandler("eventEE", this, this.$eh2)
		this.rs1.addEventHandler("eventEE", this, this.$eh3)
		this.rs2.addEventHandler("eventEE", this, this.$eh4)
		this.ins.addEventHandler("eventMB", this, this.$eh5)
		this.rdt.addEventHandler("eventMB", this, this.$eh6)
		this.rs1.addEventHandler("eventMB", this, this.$eh7)
		this.rs2.addEventHandler("eventMB", this, this.$eh8)
	}
	Instruction.prototype = Object.create(VObj.prototype)

	Instruction.prototype.$eh0 = function(enter, $1, $2) {
		this.brush.setSolid(enter ? MARINE : WHITE)
		return 0
	}

	Instruction.prototype.$eh1 = function(enter, $1, $2) {
		this.brush.setSolid(enter ? MARINE : WHITE)
		this.insPen.setRGBA(enter ? RED : BLACK)
		return 0
	}

	Instruction.prototype.$eh2 = function(enter, $1, $2) {
		this.brush.setSolid(enter ? MARINE : WHITE)
		if (this.opTypeRdt!=OP_TYPE_UNUSED) {
			this.rdtPen.setRGBA(enter ? RED : BLACK)
		} else {
			this.rdtPen.setRGBA(BLACK)
		}
		return 0
	}

	Instruction.prototype.$eh3 = function(enter, $1, $2) {
		this.brush.setSolid(enter ? MARINE : WHITE)
		if (this.opTypeRs1!=OP_TYPE_UNUSED) {
			this.rs1Pen.setRGBA(enter ? RED : BLACK)
		} else {
			this.rs1Pen.setRGBA(BLACK)
		}
		return 0
	}

	Instruction.prototype.$eh4 = function(enter, $1, $2) {
		this.brush.setSolid(enter ? MARINE : WHITE)
		if (this.opTypeRs2!=OP_TYPE_UNUSED) {
			this.rs2Pen.setRGBA(enter ? RED : BLACK)
		} else {
			this.rs2Pen.setRGBA(BLACK)
		}
		return 0
	}

	Instruction.prototype.getOpcode = function() {
		return this.vIns<<24|this.vRdt<<16|this.vRs1<<8|this.vRs2
	}

	Instruction.prototype.initRegs = function(remember) {
		let offset
		this.ins.setTxt("%c%s", 32, $g[42][this.vIns])
		this.opTypeRdt=instrOpTypeRdt(this.vIns)
		this.opTypeRs1=instrOpTypeRs1(this.vIns)
		this.opTypeRs2=instrOpTypeRs2(this.vIns)
		if (this.opTypeRdt==OP_TYPE_UNUSED)
		this.rdt.setTxt("-")
		else 
		this.rdt.setTxt("x%d", this.vRdt)
		if (this.opTypeRs1==OP_TYPE_UNUSED)
		this.rs1.setTxt("-")
		else 
		this.rs1.setTxt("x%d", this.vRs1)
		if (this.opTypeRs2==OP_TYPE_UNUSED)
		this.rs2.setTxt("-")
		else 
		if (this.opTypeRs2==OP_TYPE_REG)
		this.rs2.setTxt("x%d", this.vRs2)
		else 
		this.rs2.setTxt("%02X", this.vRs2)
		if (instrIsBranch(this.vIns) || isJorJAL(this.vIns)) {
			if (this.vRs2&128) {
				offset=(se8(this.vRs2)/4)*this.h+this.h/2
				this.arrowUp.setPt(2, this.x-7, this.y+offset)
				this.arrowUp.setPt(3, this.x-2, this.y+offset)
				this.arrowUp.setOpacity(1)
				this.arrowDown.setOpacity(0)
			} else {
				offset=(this.vRs2/4)*this.h+this.h/2
				this.arrowDown.setPt(2, this.x+this.w+7, this.y+offset)
				this.arrowDown.setPt(3, this.x+this.w+2, this.y+offset)
				this.arrowDown.setOpacity(1)
				this.arrowUp.setOpacity(0)
			}
		} else {
			this.arrowUp.setOpacity(0)
			this.arrowDown.setOpacity(0)
		}
		if (remember) {
			let s = sprintf("i%d", this.addr/4)
			setArg(s, this.getOpcode().toString())
			$g[18]=0
			setArg("example", $g[18].toString())
		}
	}

	Instruction.prototype.setValue = function(instr, rdt, rs1, rd2imm) {
		this.vIns=instr
		this.vRdt=rdt
		this.vRs1=rs1
		this.vRs2=rd2imm&255
		this.initRegs(0)
	}

	Instruction.prototype.setOpcode = function(opcode) {
		this.vIns=(opcode&4278190080)>>24
		this.vRdt=(opcode&16711680)>>16
		this.vRs1=(opcode&65280)>>8
		this.vRs2=(opcode&255)
		this.initRegs(0)
	}

	Instruction.prototype.$eh5 = function(down, flags, x, y) {
		if (!$g[26]) {
			if (down) {
				this.clk=timeMS()
				if (flags&MB_LEFT) {
					this.vIns=(this.vIns==MAX_INSTR) ? 0 : this.vIns+1
				} else
				if (flags&MB_RIGHT) {
					this.vIns=(this.vIns==0) ? MAX_INSTR : this.vIns-1
				}
			} else {
				this.clk=this.clk+500
				if (timeMS()>this.clk)
				this.vIns=0
			}
			this.initRegs(1)
		}
		return 0
	}

	Instruction.prototype.$eh6 = function(down, flags, x, y) {
		if (!$g[26] && down && this.opTypeRdt!=OP_TYPE_UNUSED) {
			if (flags&MB_LEFT) {
				this.vRdt=(this.vRdt==31) ? 0 : this.vRdt+1
			} else
			if (flags&MB_RIGHT)
			this.vRdt=(this.vRdt==0) ? 31 : this.vRdt-1
			this.initRegs(1)
		}
	}

	Instruction.prototype.$eh7 = function(down, flags, x, y) {
		if (!$g[26] && down && this.opTypeRdt!=OP_TYPE_UNUSED) {
			if (flags&MB_LEFT) {
				this.vRs1=(this.vRs1==31) ? 0 : this.vRs1+1
			} else
			if (flags&MB_RIGHT)
			this.vRs1=(this.vRs1==0) ? 31 : this.vRs1-1
			this.initRegs(1)
		}
		return 0
	}

	Instruction.prototype.$eh8 = function(down, flags, x, y) {
		if (!$g[26] && down) {
			if (flags&MB_LEFT) {
				if (this.opTypeRs2==OP_TYPE_REG) {
					this.vRs2=(this.vRs2+1)%32
				} else
				if (this.opTypeRs2==OP_TYPE_IMM) {
					this.clk=timeMS()
					this.vRs2=(this.vRs2+1)%256
				}
			} else
			if (flags&MB_RIGHT) {
				if (this.opTypeRs2==OP_TYPE_REG) {
					this.vRs2=(this.vRs2-1)%32
					if (this.vRs2<0)
					this.vRs2=32+this.vRs2
				} else
				if (this.opTypeRs2==OP_TYPE_IMM) {
					this.clk=timeMS()
					this.vRs2=(this.vRs2-1)%256
					if (this.vRs2<0)
					this.vRs2=256+this.vRs2
				}
			} else {
				if (this.opTypeRs2==OP_TYPE_IMM) {
					this.clk=this.clk+500
					if (timeMS()>this.clk)
					this.vRs2=0
				}
			}
			this.initRegs(1)
		}
	}

	function InstructionMemory(x, y, w, h) {
		VObj.call(this)
		this.ih = (h-4)/32
		this.instruction = newArray(32)
		this.active = 31
		this.r = new Rectangle2($g[0], 0, 0, $g[1], $g[43], x, y, w, h)
		this.r.setRounded(2, 2)
		new Rectangle2($g[0], 0, 0, $g[1], $g[44], x+2, y+2, w-4, h-4)
		for (this.lp1 = 0; this.lp1<32; this.lp1++)
		this.instruction[this.lp1]=new Instruction(x+2, y+2+this.lp1*this.ih, w-4, this.ih, this.lp1*4)
	}
	InstructionMemory.prototype = Object.create(VObj.prototype)

	InstructionMemory.prototype.setValue = function(addr, instr, rdt, rs1, rs2imm) {
		this.instruction[addr/4].setValue(instr, rdt, rs1, rs2imm)
	}

	InstructionMemory.prototype.getOpcode = function(addr) {
		return this.instruction[addr/4].getOpcode()
	}

	InstructionMemory.prototype.setOpcode = function(addr, opcode) {
		this.instruction[addr/4].setOpcode(opcode)
	}

	InstructionMemory.prototype.setActive = function(addr) {
		this.instruction[this.active].dot.setOpacity(0)
		this.active=addr/4
		this.instruction[this.active].dot.setOpacity(1)
	}

	function InstructionRegister(x, y, w, h, caption) {
		VObj.call(this)
		this.vIns = EMPTY, this.vRdt = 0, this.vRs1 = 0, this.vRs2 = 0
		this.nIns = EMPTY, this.nRdt = 0, this.nRs1 = 0, this.nRs2 = 0
		this.txt = "EMPTY"
		this.r1 = new Rectangle2($g[0], 0, 0, $g[1], $g[5], x, y, w, h)
		this.r1.setRounded(2, 2)
		this.r2 = new Rectangle2($g[0], 0, 0, $g[1], $g[14], x+2, y+2, w-4, h-14)
		this.r2.setRounded(2, 2)
		this.r3 = new Rectangle2($g[0], 0, 0, 0, 0, x, y+h-10, w, 10, $g[4], $g[19], caption)
		this.label = new Txt($g[0], $g[21], 0, x+w/2, y+(h-14)/2, 0, $g[19], this.txt)
		this.label.rotate(-90)
	}
	InstructionRegister.prototype = Object.create(VObj.prototype)

	InstructionRegister.prototype.setNewValue = function(instr, rdt, rs1, rs2) {
		this.nIns=instr
		this.nRdt=rdt
		this.nRs1=rs1
		this.nRs2=rs2
	}

	InstructionRegister.prototype.setNewInstruction = function(i) {
		this.nIns=i.vIns
		this.nRdt=i.vRdt
		this.nRs1=i.vRs1
		this.nRs2=i.vRs2
	}

	InstructionRegister.prototype.getNewInstrTxt = function() {
		return instrText(this.nIns, this.nRdt, this.nRs1, this.nRs2)
	}

	InstructionRegister.prototype.setOpacity = function(opacity) {
		this.r1.setOpacity(opacity)
		this.r2.setOpacity(opacity)
		this.r3.setOpacity(opacity)
		this.label.setOpacity(opacity)
	}

	InstructionRegister.prototype.reset = function() {
		this.vIns=EMPTY
		this.vRdt=this.vRs1=this.vRs2=0
		this.nIns=EMPTY
		this.nRdt=this.nRs1=this.nRs2=0
		this.txt=instrText(this.vIns, this.vRdt, this.vRs1, this.vRs2)
		this.label.setTxt(this.txt)
	}

	function Register(x, y, w, h, labelPos, caption) {
		VObj.call(this)
		this.vx, this.vy, this.vw, this.vh
		this.value = 0, this.newValue = 0
		this.tag = 0, this.newTag = 0
		this.useTag = 0, this.invalid = 0
		this.fixed = 0
		this.label
		this.r2
		this._x = x
		this._y = y
		this._w = w
		this._h = h
		this.regCol = $g[15]
		this.r1 = new Rectangle2($g[0], 0, 0, $g[1], $g[47], x, y, w, h)
		this.r1.setRounded(2, 2)
		this.bg1 = new Rectangle2($g[0], $g[21], 0, 0, $g[14], this.vx, this.vy, this.vw/2, this.vh)
		this.bg2 = new Rectangle2($g[0], $g[21], 0, 0, $g[14], this.vx+this.vw/2, this.vy, this.vw/2, this.vh)
		if (w>=h) {
			this.vy=y+2
			this.vw=w-14
			this.vh=h-4
			if (labelPos==LEFT) {
				this.r2=new Rectangle($g[0], 0, 0, 0, 0, x+7-1, y+h/2, -7, -h/2, 14, h, 0, $g[19], caption)
				this.r2.rotate(-90)
				this.vx=x+12
			} else
			if (labelPos==RIGHT) {
				this.r2=new Rectangle($g[0], 0, 0, 0, 0, x+w-7, y+h/2, -7, -h/2, 14, h, 0, $g[19], caption)
				this.r2.rotate(-90)
				this.vx=x+2
			}
		} else {
			this.vx=x+2
			this.vw=w-4
			this.vh=h-14
			if (labelPos==TOP) {
				this.r2=new Rectangle2($g[0], 0, 0, 0, 0, x, y, w, 14, 0, $g[19], caption)
				this.vy=y+12
			} else
			if (labelPos==BOTTOM) {
				this.r2=new Rectangle2($g[0], 0, 0, 0, 0, x, y+h-10, w, 10, 0, $g[19], caption)
				this.vy=y+2
			}
		}
		if (w>=h) {
			this.label=new Rectangle2($g[0], $g[21], 0, 0, $g[15], this.vx, this.vy, this.vw, this.vh, 0, $g[19], "%02X", this.value)
		} else {
			this.label=new Rectangle($g[0], $g[21], 0, 0, $g[15], this.vx+this.vw/2, this.vy+this.vh/2, -this.vw/2, -this.vh/2, this.vw, this.vh, 0, $g[19], "%02X", this.value)
		}
		this.label.setRounded(2, 2)
		this.label.addEventHandler("eventEE", this, this.$eh9)
		this.label.addEventHandler("eventMB", this, this.$eh10)
		this.hmode = 0
	}
	Register.prototype = Object.create(VObj.prototype)

	Register.prototype.setFixed = function() {
		this.fixed=1
	}

	Register.prototype.rotateLabel = function(d) {
		this.r2.rotate(d)
	}

	Register.prototype.setColour = function(b) {
		this.label.setBrush(b)
		this.regCol=b
	}

	Register.prototype.setOpacity = function(opacity) {
		this.r1.setOpacity(opacity)
		this.r2.setOpacity(opacity)
		this.bg1.setOpacity(opacity)
		this.bg2.setOpacity(opacity)
		this.label.setOpacity(opacity)
	}

	Register.prototype.updateLabel = function() {
		if (this.invalid) {
			this.label.setTxt("INV")
		} else
		if (this.useTag) {
			if (this.tag>=0)
			this.label.setTxt("R%d:%02X", this.tag, this.value)
			else 
			this.label.setTxt("--:%02X", this.value)
		} else {
			this.label.setTxt("%02X", this.value)
		}
		return 0
	}

	Register.prototype.$eh9 = function(enter, x, y) {
		if (this.fixed==0)
		this.label.setBrush(enter ? $g[14] : this.regCol)
		return 0
	}

	Register.prototype.$eh10 = function(down, flags, x, y) {
		if (this.fixed==0 && down) {
			if (flags&MB_LEFT) {
				this.value=(this.value+1)&255
			} else
			if (flags&MB_RIGHT) {
				this.value=(this.value-1)&255
			}
			this.updateLabel()
		}
		return 0
	}

	Register.prototype.setValue = function(val) {
		this.value=val
		this.invalid=0
		this.updateLabel()
	}

	Register.prototype.setNewValue = function(val) {
		this.newValue=val
	}

	Register.prototype.setNewTag = function(t) {
		this.newTag=t
	}

	Register.prototype.setTag = function(t) {
		this.useTag=1
		this.tag=t
		this.updateLabel()
	}

	Register.prototype.setInvalid = function(i) {
		this.useTag=1
		this.invalid=i
	}

	Register.prototype.tagMatches = function(t) {
		return (this.invalid) ? 0 : (this.tag==t) ? 1 : 0
	}

	Register.prototype.highlight = function(brush) {
		if (this.hmode==0) {
			this.bg1.setBrush(brush)
			this.bg2.setBrush(brush)
			this.hmode=1
		} else {
			this.bg2.setBrush(brush)
		}
	}

	Register.prototype.unHighlight = function() {
		this.bg1.setBrush($g[14])
		this.bg2.setBrush($g[14])
		this.hmode=0
	}

	Register.prototype.reset = function() {
		this.value=0
		this.newValue=0
		this.tag=0
		this.newTag=0
		this.useTag=0
		this.invalid=0
		this.unHighlight()
		this.updateLabel()
	}

	function Component(_x, _y, _w, _h, caption) {
		VObj.call(this)
		this.x = _x
		this.y = _y
		this.w = _w
		this.h = _h
		this.bg = new Rectangle2($g[0], 0, 0, $g[1], $g[49], this.x, this.y, this.w, this.h)
		this.bg.setRounded(2, 2)
		this.label
		if (this.w>=this.h) {
			this.label=new Rectangle2($g[0], 0, 0, 0, 0, this.x, this.y, this.w, this.h, 0, $g[50], caption)
		} else {
			this.label=new Rectangle($g[0], 0, 0, 0, 0, this.x+this.w/2-1, this.y+this.h/2, -this.w/2, -this.h/2, this.w, this.h, 0, $g[50], caption)
			this.label.rotate(-90)
		}
	}
	Component.prototype = Object.create(VObj.prototype)

	Component.prototype.setOpacity = function(opacity) {
		this.bg.setOpacity(opacity)
		this.label.setOpacity(opacity)
	}

	function Stack(_x, _y) {
		VObj.call(this)
		this.w = 100
		this.h = 20
		this.length = MEMORY_ADDRESSES
		this.x = _x
		this.y = _y
		this.addr_size = 4
		this.maxdigits = 3
		this.off = 40
		this.apSP = new AnimPipe()
		this.spText = new Rectangle2($g[0], 0, 0, $g[4], $g[51], 120, 120, 20, 8, $g[4], $g[50], sprintf(""))
		this.spAddr = -2
		this.prevSPAddr = -1
		this.apFP = new AnimPipe()
		this.fpText = new Rectangle2($g[0], 0, 0, $g[4], $g[51], 120, 120, 20, 8, $g[4], $g[50], sprintf(""))
		this.fpAddr = -3
		this.currFrame = 0
		this.frameColours = newArray(3)
		this.frameColours[0]=$g[8]
		this.frameColours[1]=$g[7]
		this.frameColours[2]=$g[9]
		this.frames = newArray(3)
		this.frames[0]=new Frame(0, 0)
		this.frames[1]=new Frame(0, 0)
		this.frames[2]=new Frame(0, 0)
		this.outer_x = this.x
		this.outer_y = this.y
		this.outer_w = this.w
		this.outer_h = (this.h*this.length+20)
		this.x=this.x+10
		this.y=this.y+10
		this.w=this.w/2
		this.outer = new Rectangle2($g[0], 0, 0, $g[1], $g[51], this.outer_x, this.outer_y, this.outer_w, this.outer_h)
		this.hex = newArray(this.length*this.addr_size)
		this.chars = newArray(18)
		fillchars(this.chars)
		this.div = (this.length*this.addr_size)/16
		this.digits = 1
		for (this.i = 1; this.i<=this.maxdigits; this.i++) {
			this.p = this.div^this.i
			if (this.div<this.p) {
				this.digits=this.i+1
				break
			}
		}
		countHex(this.hex, 0, (this.length*this.addr_size), this.digits, this.chars, "")
		this.addresses = newArray(this.length)
		this.j = 0
		for (this.i=0; this.i<(this.length*this.addr_size); this.i+=this.addr_size) {
			this.addresses[this.j]=this.hex[this.i]
			this.j++
		}
		this.stack = newArray(this.length)
		for (this.j=(this.length-1); this.j>=0; this.j--) {
			this.r = new Register(this.x, this.y, this.w, this.h, LEFT, this.addresses[this.j])
			this.r.rotateLabel(90)
			this.stack[this.j]=this.r
			this.y+=this.h
		}
	}
	Stack.prototype = Object.create(VObj.prototype)

	Stack.prototype.getVal = function(addr) {
		let pos = floor((addr/4))%MEMORY_ADDRESSES
		return this.stack[pos].value
	}

	Stack.prototype.highlight = function(addr) {
		this.stack[addr].highlight($g[25])
	}

	Stack.prototype.clearFrame = function() {
		if (this.currFrame>0) {
			let f = this.frames[this.currFrame-1]
			let s = f.getStart()
			let e = f.getEnd()
			let n = s-e
			if (n==0) {
				let fpR = this.stack[s]
				if (this.currFrame>=2) {
					fpR.setColour(this.frameColours[this.currFrame-2])
				} else {
					fpR.setColour($g[15])
				}
			} else {
				for (let i = 0; i<=n; i++) {
					let r = this.stack[s-i]
					if (i==0 && this.currFrame>=2) {
						r.setColour(this.frameColours[this.currFrame-2])
					} else {
						r.setColour($g[15])
					}
				}
			}
			f.setStart(0)
			f.setEnd(0)
			this.currFrame--
		}
	}

	Stack.prototype.setSP = function(addr) {
		let pos = floor((addr/4))%MEMORY_ADDRESSES
		let a = this.stack[pos]
		if (this.spAddr==this.fpAddr) {
			let tpos = floor((this.spAddr/4))%MEMORY_ADDRESSES
			let ta = this.stack[tpos]
			let tax = ta._x
			let tay = ta._y
			let taw = ta._w
			let tah = ta._h
			this.fpText.setOpacity(0)
			this.fpText=new Rectangle2($g[0], 0, 0, $g[4], $g[51], (tax+taw+13), (tay+6), 20, 8, $g[3], $g[50], sprintf("FP"))
		}
		this.prevSPAddr=this.spAddr
		this.spAddr=addr
		let ax = a._x
		let ay = a._y
		let aw = a._w
		let ah = a._h
		this.spText.setOpacity(0)
		if (this.spAddr==this.fpAddr) {
			this.fpText.setOpacity(0)
			this.spText=new Rectangle2($g[0], 0, 0, $g[4], $g[51], (ax+aw+20), (ay+6), 15, 8, $g[3], $g[50], sprintf("SP/FP"))
		} else {
			this.spText=new Rectangle2($g[0], 0, 0, $g[4], $g[51], (ax+aw+13), (ay+6), 20, 8, $g[3], $g[50], sprintf("SP"))
		}
		this.apSP.setOpacity(0)
		this.apSP.reset()
		this.apSP.setPoint(0, ax+aw+15, ay+10)
		this.apSP.setPoint(1, ax+aw+2, ay+10)
		this.apSP.setOpacity(1)
		if (this.currFrame>0) {
			let col = this.frameColours[this.currFrame-1]
			let st = this.frames[this.currFrame-1].getStart()
			if (pos>st) {
				this.clearFrame()
			} else {
				this.frames[this.currFrame-1].setEnd(this.spAddr)
			}
			let prevPos = floor((this.prevSPAddr/4))%MEMORY_ADDRESSES
			let n = pos-prevPos
			if (this.prevSPAddr<this.spAddr) {
				if (n>0 && (pos-n>=0)) {
					for (let j = 1; j<=n; j++) {
						let r1 = this.stack[pos-j]
						r1.setColour($g[15])
					}
				} else
				if (n==0) {
					let r2 = this.stack[pos]
					r2.setColour(col)
				}
			} else {
				n=prevPos-pos
				if (n>0 && (pos-n>=0)) {
					for (let k = 1; k<=n; k++) {
						let r3 = this.stack[prevPos-k]
						r3.setColour(col)
					}
				} else
				if (n==0) {
					let r4 = this.stack[pos]
					r4.setColour(col)
				}
			}
		}
	}

	Stack.prototype.setFP = function(addr) {
		let pos = floor((addr/4))%MEMORY_ADDRESSES
		let a = this.stack[pos]
		this.fpAddr=addr
		let ax = a._x
		let ay = a._y
		let aw = a._w
		let ah = a._h
		if (this.spAddr!=this.fpAddr) {
			this.fpText.setOpacity(0)
			this.fpText=new Rectangle2($g[0], 0, 0, $g[4], $g[51], (ax+aw+13), (ay+6), 20, 8, $g[3], $g[50], sprintf("FP"))
		} else {
			this.spText.setOpacity(0)
			this.fpText.setOpacity(0)
			this.spText=new Rectangle2($g[0], 0, 0, $g[4], $g[51], (ax+aw+20), (ay+6), 15, 8, $g[3], $g[50], sprintf("SP/FP"))
			this.apSP.setOpacity(0)
			this.apSP.reset()
			this.apSP.setPoint(0, ax+aw+15, ay+10)
			this.apSP.setPoint(1, ax+aw+2, ay+10)
			this.apSP.setOpacity(1)
		}
		this.apFP.setOpacity(0)
		this.apFP.reset()
		this.apFP.setPoint(0, ax+aw+15, ay+10)
		this.apFP.setPoint(1, ax+aw+2, ay+10)
		this.apFP.setOpacity(1)
	}

	Stack.prototype.setAll = function(v) {
		this.outer.setOpacity(v)
		this.apSP.setOpacity(v)
		this.apFP.setOpacity(v)
		this.spText.setOpacity(v)
		this.fpText.setOpacity(v)
		for (let i = 0; i<this.length; i++) {
			this.stack[i].setOpacity(v)
		}
	}

	function countHex(h, index, length, digits, chars, pref) {
		let endreached = 0
		for (let i = 0; i<16; i++) {
			if (digits>1) {
				let newindex = 0
				let newpref = pref+chars[i]
				if (endreached==0)
				newindex=countHex(h, index, length, (digits-1), chars, newpref)
				if (index>=length)
				return 0
				index=newindex
			} else {
				if (index+i<length)
				h[index+i]=pref+chars[i]
			}
		}
		return index+16
	}

	function Frame(s, e) {
		VObj.call(this)
		this.start = s
		this.end = e
	}
	Frame.prototype = Object.create(VObj.prototype)

	Frame.prototype.setStart = function(s) {
		this.start=floor((s/4))%MEMORY_ADDRESSES
	}

	Frame.prototype.setEnd = function(e) {
		this.end=floor((e/4))%MEMORY_ADDRESSES
	}

	Frame.prototype.getStart = function() {
		return this.start
	}

	Frame.prototype.getEnd = function() {
		return this.end
	}

	function fillchars(chars) {
		chars[0]="0"
		chars[1]="1"
		chars[2]="2"
		chars[3]="3"
		chars[4]="4"
		chars[5]="5"
		chars[6]="6"
		chars[7]="7"
		chars[8]="8"
		chars[9]="9"
		chars[10]="A"
		chars[11]="B"
		chars[12]="C"
		chars[13]="D"
		chars[14]="E"
		chars[15]="F"
	}

	function ALU(_x, _y, _w, _h) {
		VObj.call(this)
		this.x = _x
		this.y = _y
		this.w = _w
		this.h = _h
		this.alu = new Polygon($g[0], 0, ABSOLUTE, $g[1], $g[49], this.x, this.y, 0, 0, this.w, this.h/4, this.w, 3*this.h/4, 0, this.h, 0, 5*this.h/8, this.w/2, this.h/2, 0, 3*this.h/8)
		new Rectangle2($g[0], 0, 0, 0, 0, this.x, this.y-10, this.w, 10, 0, $g[50], "ALU")
		this.op = ""
		this.txtOp = new Rectangle($g[0], $g[21], 0, 0, $g[13], this.x, this.y+this.h/2, 0, -this.h/12, 2*this.w/3, this.h/6, $g[4], $g[50], this.op)
		this.txtOp.setOpacity(0)
		this.txtOp.setRounded(2, 2)
		this.txtResult = new Rectangle($g[0], $g[23], 0, $g[1], $g[15], this.x+3*this.w/4, this.y+this.h/2, 0, -this.h/12, this.w/2, this.h/6, $g[1], $g[50])
		this.txtResult.setOpacity(0)
		this.txtResult.setRounded(2, 2)
	}
	ALU.prototype = Object.create(VObj.prototype)

	ALU.prototype.setTxtOpStr = function(s) {
		this.op=s
		this.txtOp.setTxt(this.op)
		this.txtOp.setOpacity(1)
	}

	ALU.prototype.expand = function() {
		this.txtOp=new Rectangle($g[0], $g[21], 0, 0, $g[13], this.x, this.y+this.h/2, 0, -this.h/12, 3*this.w/3, this.h/6, $g[4], $g[50], this.op)
		this.txtOp.setOpacity(0)
		this.txtOp.setRounded(2, 2)
	}

	ALU.prototype.setTxtOp = function(vIns) {
		this.op=""
		if (vIns==ADD || vIns==ADDi)
		this.op="ADD"
		else 
		if (vIns==SUB || vIns==SUBi)
		this.op="SUB"
		else 
		if (vIns==AND || vIns==ANDi)
		this.op="AND"
		else 
		if (vIns==OR || vIns==ORi)
		this.op="OR"
		else 
		if (vIns==XOR || vIns==XORi)
		this.op="XOR"
		else 
		if (vIns==SLL || vIns==SLLi)
		this.op="SLL"
		else 
		if (vIns==SRL || vIns==SRLi)
		this.op="SRL"
		else 
		if (vIns==SRA || vIns==SRAi)
		this.op="SRA"
		else 
		if (vIns==SLT || vIns==SLTi)
		this.op="SLT"
		else 
		if (vIns==SGT || vIns==SGTi)
		this.op="SGT"
		else 
		if (vIns==SLE || vIns==SLEi)
		this.op="SLE"
		else 
		if (vIns==SGE || vIns==SGEi)
		this.op="SGE"
		else 
		if (vIns==BEQ)
		this.op="BEQ"
		else 
		if (vIns==BNE)
		this.op="BNE"
		else 
		if (vIns==BLT)
		this.op="BLT"
		else 
		if (vIns==BLE)
		this.op="BLE"
		else 
		if (vIns==BGT)
		this.op="BGT"
		else 
		if (vIns==BGE)
		this.op="BGE"
		else 
		if (vIns==MUL)
		this.op="ADD"
		else 
		if (vIns==DIV || vIns==REM)
		this.op="SUB"
		else 
		if (vIns==LD || vIns==ST || vIns==LR || vIns==SC)
		this.op="ADD"
		else 
		if (vIns==JAL || vIns==JALR)
		this.op="ADD"
		this.txtOp.setTxt(this.op)
		this.txtOp.setOpacity(1)
	}

	function AnimPipe() {
		VObj.call(this)
		this.w = 5
		this.n = 0
		this.px = newArray(0)
		this.py = newArray(0)
		this.ls = newArray(0)
		this.ll = 0
		this.head = 1
		this.bgPen0 = new SolidPen(SOLID, this.w, GRAY192, BEVEL_JOIN|BUTT_END)
		this.bgPen1 = new SolidPen(SOLID, this.w, GRAY192, BEVEL_JOIN|ARROW60_END)
		this.fgPen0 = new SolidPen(SOLID, this.w, RED, BEVEL_JOIN|BUTT_END)
		this.fgPen1 = new SolidPen(SOLID, this.w, RED, BEVEL_JOIN|ARROW60_END)
		this.bgLine = new Line($g[0], $g[22], 0, this.bgPen1, 0, 0)
		this.fgLine = new Line($g[0], $g[23], 0, this.fgPen0, 0, 0)
	}
	AnimPipe.prototype = Object.create(VObj.prototype)

	AnimPipe.prototype.setOpacity = function(opacity) {
		this.bgLine.setOpacity(opacity)
		this.fgLine.setOpacity(opacity)
	}

	AnimPipe.prototype.setHead = function(h) {
		this.head=h ? 1 : 0
		this.bgLine.setPen(this.head ? this.bgPen1 : this.bgPen0)
		this.fgLine.setPen(this.fgPen0)
	}

	AnimPipe.prototype.resize = function(neww) {
		this.w=neww
		this.bgPen0=new SolidPen(SOLID, neww, GRAY192, BEVEL_JOIN|BUTT_END)
		this.bgPen1=new SolidPen(SOLID, neww, GRAY192, BEVEL_JOIN|ARROW60_END)
		this.fgPen0=new SolidPen(SOLID, neww, RED, BEVEL_JOIN|BUTT_END)
		this.fgPen1=new SolidPen(SOLID, neww, RED, BEVEL_JOIN|ARROW60_END)
		this.bgLine=new Line($g[0], $g[22], 0, this.bgPen1, 0, 0)
		this.fgLine=new Line($g[0], $g[23], 0, this.fgPen0, 0, 0)
	}

	AnimPipe.prototype.addPoint = function(x, y) {
		this.px[this.n]=x
		this.py[this.n]=y
		this.bgLine.setPt(this.n, x, y)
		this.n++
	}

	AnimPipe.prototype.calcLength = function() {
		let dx, dy
		this.ll=0
		for (let i = 0; i<this.n-1; i++) {
			dx=this.px[i+1]-this.px[i]
			dy=this.py[i+1]-this.py[i]
			this.ll+=this.ls[i]=sqrt(dx*dx+dy*dy)
		}
	}

	AnimPipe.prototype.setPoint = function(n, x, y) {
		this.px[n]=x
		this.py[n]=y
		this.bgLine.setPt(n, x, y)
	}

	AnimPipe.prototype.reset = function() {
		this.fgLine.setNPts(0)
		this.fgLine.setPen(this.fgPen0)
	}

	function AnimatedClock($grp, x, y, w, h) {
		Group.call(this, $grp, 0, 0, x, y, 0, 0, w, h)
		this.cw = w
		this.chw = this.cw/2
		this.ch = h-6
		this.stall = 0, this.type = 0
		this.setClipPath(R$(0, 0, w, h))
		this.clkDisplay = new Rectangle2(this, 0, 0, $g[1], $g[14], 0, 0, w, h)
		this.clkDisplay.setRounded(2, 2)
		this.prev_clock = new Line(this, $g[23], 0, $g[52], -this.chw+this.chw/5, 3+this.ch, 0, 0, 0, -this.ch, this.chw, 0, 0, this.ch, this.chw, 0)
		this.next_clock = new Line(this, $g[23], 0, $g[53], this.chw+this.chw/5, 3+this.ch, 0, 0, 0, -this.ch, this.chw, 0, 0, this.ch, this.chw, 0)
		this.dot = new Rectangle2(this, $g[23], 0, 0, $g[5], w/2-3, h-6, 6, 6)
		this.canUpdate
	}
	AnimatedClock.prototype = Object.create(Group.prototype)

	AnimatedClock.prototype.setStall = function(s, t) {
		this.stall=s
		this.type=t
		if (this.canUpdate)
		this.prev_clock.setPen(this.stall ? (this.type ? $g[54] : $g[52]) : $g[53])
	}

	function Button(x, y, w, h, caption, ID) {
		VObj.call(this)
		this.label = new Rectangle2($g[0], 0, 0, $g[1], $g[55], x, y, w, h, $g[1], $g[19], caption)
		this.label.addEventHandler("eventEE", this, this.$eh11)
	}
	Button.prototype = Object.create(VObj.prototype)

	Button.prototype.$eh11 = function(enter, x, y) {
		this.label.setBrush(enter ? $g[56] : $g[55])
		return 0
	}

	Button.prototype.setCaption = function(caption) {
		this.label.setTxt(caption)
	}

	Button.prototype.showLocked = function(locked) {
		this.label.setFont(locked ? $g[20] : $g[19])
	}

	function resetWires() {
		$g[91].reset()
		$g[89].reset()
		$g[90].setOpacity(0)
		$g[92].reset()
		$g[93].reset()
		$g[94].reset()
		$g[95].reset()
		$g[96].reset()
		$g[97].reset()
		$g[98].reset()
		$g[99].reset()
		$g[100].reset()
		$g[101].reset()
		$g[122].reset()
		$g[123].reset()
		$g[124].reset()
		$g[125].reset()
		$g[126].reset()
		$g[127].reset()
		$g[128].setOpacity(0)
		$g[129].reset()
		$g[130].setOpacity(0)
		$g[132].reset()
		$g[133].setOpacity(0)
		$g[134].reset()
		$g[135].reset()
		$g[136].reset()
		$g[131].reset()
		$g[139].reset()
		$g[140].setOpacity(0)
		$g[142].reset()
		$g[141].reset()
		$g[144].reset()
		$g[145].reset()
		$g[146].setOpacity(0)
		$g[147].reset()
		$g[148].setOpacity(0)
		$g[143].setOpacity(0)
		$g[118].setPen($g[114])
		$g[120].setPen($g[114])
		$g[121].setPen($g[114])
		$g[119].setPen($g[114])
		$g[178].setPen($g[114])
		$g[156].reset()
		$g[157].reset()
		$g[159].reset()
		$g[160].reset()
		$g[161].reset()
		$g[162].reset()
		$g[163].setOpacity(0)
		$g[164].reset()
		$g[165].reset()
		$g[166].reset()
		$g[167].reset()
		$g[168].reset()
		$g[169].reset()
		$g[170].reset()
		$g[171].reset()
		$g[172].reset()
		$g[179].reset()
		$g[182].reset()
		$g[198].reset()
		$g[183].reset()
		$g[155].txtOp.setOpacity(0)
		$g[155].txtResult.setOpacity(0)
		$g[118].setPen($g[114])
		$g[120].setPen($g[114])
		$g[192].reset()
		$g[193].reset()
		$g[194].reset()
		$g[195].reset()
		$g[196].reset()
		$g[197].reset()
		$g[158].reset()
		$g[188].reset()
		$g[189].reset()
		$g[190].reset()
		$g[201].reset()
	}

	function parallelMode() {
		if ($g[37]==1) {
			$g[184].setAll(0)
			$g[188].setOpacity(1)
			$g[189].setOpacity(1)
			$g[190].setOpacity(1)
			$g[185].setOpacity(1)
			$g[186].setOpacity(1)
		} else {
			$g[184].setAll(1)
			$g[188].setOpacity(0)
			$g[189].setOpacity(0)
			$g[190].setOpacity(0)
			$g[185].setOpacity(0)
			$g[186].setOpacity(0)
		}
	}

	function resetRegisters() {
		$g[82].reset()
		$g[82].setValue(124)
		$g[103].reset()
		$g[150].reset()
		$g[151].reset()
		$g[175].reset()
		$g[174].reset()
		$g[200].reset()
		$g[84][0].reset()
		$g[84][1].reset()
		$g[85][0].reset()
		$g[85][1].reset()
		$g[102].reset()
		$g[149].reset()
		$g[173].reset()
		$g[199].reset()
		$g[80].setActive(124)
		$g[174].setInvalid(1)
		$g[174].updateLabel()
		$g[200].setInvalid(1)
		$g[200].updateLabel()
		$g[84][0].setValue(-1)
		$g[84][0].setInvalid(1)
		$g[84][0].updateLabel()
		$g[84][1].setValue(-1)
		$g[84][1].setInvalid(1)
		$g[84][1].updateLabel()
		$g[39]=0
		$g[40]=0
		$g[77].setTxt("%4d", 0)
		$g[78].setTxt("%4d", 0)
	}

	function resetCircuit() {
		resetRegisters()
		resetWires()
	}

	function showBTB(opacity) {
		$g[83].setOpacity(opacity)
		$g[84][0].setOpacity(opacity)
		$g[84][1].setOpacity(opacity)
		$g[85][0].setOpacity(opacity)
		$g[85][1].setOpacity(opacity)
		$g[97].setOpacity(opacity)
		$g[122].setOpacity(opacity)
		$g[86].setOpacity(opacity)
		$g[100].setOpacity(opacity)
		$g[93].setOpacity(opacity)
		$g[139].setOpacity(opacity)
		$g[142].setOpacity(opacity)
		$g[112].setOpacity(opacity)
		$g[141].setOpacity(opacity)
	}

	function showALUForwarding(opacity) {
		if (opacity==0) {
			$g[160].setPoint(0, 440, 210)
			$g[160].setPoint(1, 510, 210)
			$g[161].setPoint(0, ($g[33]) ? 440 : 430, 240)
			$g[161].setPoint(1, 500, 240)
			$g[162].setPoint(2, 450, 260)
			$g[162].setPoint(3, 500, 260)
			$g[160].setHead(0)
		} else {
			$g[160].setPoint(0, 440, 220)
			$g[160].setPoint(1, 500, 220)
			$g[161].setPoint(0, 440, 240)
			$g[161].setPoint(1, 500, 240)
			$g[162].setPoint(2, 450, 250)
			$g[162].setPoint(3, 500, 250)
			$g[160].setHead(1)
		}
		$g[152].setOpacity(opacity)
		$g[157].setOpacity(opacity)
		$g[159].setOpacity(opacity)
		$g[165].setOpacity(opacity)
		$g[164].setOpacity(opacity)
	}

	function showSMDRForwarding(opacity) {
		if (opacity==0) {
			$g[168].setPoint(1, 435, 330)
			$g[168].setPoint(2, 510, 330)
			$g[168].setHead(0)
		} else {
			$g[168].setPoint(1, 435, 340)
			$g[168].setPoint(2, 500, 340)
			$g[168].setHead(1)
		}
		$g[154].setOpacity(opacity)
		$g[166].setOpacity(opacity)
		$g[167].setOpacity(opacity)
	}

	function showParallelComponents(opacity) {
		$g[176].setOpacity(opacity)
		$g[177].setOpacity(opacity)
		$g[158].setOpacity(opacity)
		$g[182].setOpacity(opacity)
		$g[179].setOpacity(opacity)
		$g[198].setOpacity(opacity)
		$g[181].setOpacity(opacity)
		$g[183].setOpacity(opacity)
		$g[180].setOpacity(opacity)
		$g[178].setOpacity(opacity)
	}

	function showZeroForwarding(opacity) {
		if (opacity==0) {
		} else {
		}
	}

	function showPipeline(opacity) {
		if (opacity==0) {
			$g[99].setPoint(1, 260, 230)
			$g[99].setPoint(2, 260, 240)
			$g[124].setPoint(0, 260, 230)
			$g[125].setPoint(0, 260, 230)
			$g[101].setPoint(1, 410, 390)
			$g[147].setPoint(1, 375, 210)
			$g[147].setPoint(2, 440, 210)
			$g[144].setPoint(1, 440, 240)
			$g[168].setPoint(0, 435, 240)
			$g[161].setPoint(0, 440, 240)
			$g[172].setPoint(0, 570, 230)
			$g[172].setPoint(1, 620, 230)
			$g[169].setPoint(1, 640, 330)
			$g[194].setPoint(1, 720, 230)
			$g[101].setHead(0)
			$g[99].setHead(0)
			$g[147].setHead(0)
			$g[160].setHead(0)
			$g[144].setHead(0)
			$g[168].setHead(0)
			$g[169].setHead(0)
			$g[170].setHead(0)
			$g[171].setHead(0)
			$g[172].setHead(0)
			$g[194].setHead(0)
			showBTB(opacity)
			showALUForwarding(opacity)
			showSMDRForwarding(opacity)
			showZeroForwarding(opacity)
			showParallelComponents(opacity)
			$g[120].setOpacity(opacity)
		} else {
			$g[99].setPoint(1, 240, 230)
			$g[99].setPoint(2, 250, 230)
			$g[124].setPoint(0, 260, 250)
			$g[125].setPoint(0, 260, 250)
			$g[101].setPoint(1, 390, 390)
			$g[147].setPoint(1, 375, 210)
			$g[147].setPoint(2, 420, 210)
			$g[144].setPoint(1, 420, 240)
			$g[168].setPoint(0, 435, 270)
			$g[172].setPoint(0, 570, 240)
			$g[172].setPoint(1, 600, 240)
			$g[169].setPoint(1, 600, 330)
			$g[194].setPoint(1, 700, 230)
			$g[101].setHead(1)
			$g[99].setHead(1)
			$g[147].setHead(1)
			$g[160].setHead(1)
			$g[144].setHead(1)
			$g[168].setHead(1)
			$g[169].setHead(1)
			$g[170].setHead(1)
			$g[171].setHead(1)
			$g[172].setHead(1)
			$g[194].setHead(1)
			showBTB($g[31]==BRANCH_PREDICTION ? 1 : 0)
			showALUForwarding($g[33]==ALU_FORWARDING ? 1 : 0)
			showSMDRForwarding($g[34]==FORWARDING_TO_SMDR ? 1 : 0)
			showZeroForwarding($g[35]==ZERO_FORWARDING ? 1 : 0)
			showParallelComponents(opacity)
			$g[120].setOpacity(opacity)
		}
		$g[98].setOpacity(opacity)
		$g[88].setOpacity(opacity)
		$g[95].setOpacity(opacity)
		$g[103].setOpacity(opacity)
		$g[149].setOpacity(opacity)
		$g[173].setOpacity(opacity)
		$g[199].setOpacity(opacity)
		$g[156].setOpacity(opacity)
		$g[192].setOpacity(opacity)
		$g[150].setOpacity(opacity)
		$g[151].setOpacity(opacity)
		$g[174].setOpacity(opacity)
		$g[200].setOpacity(opacity)
		$g[175].setOpacity(opacity)
		$g[69].label.setOpacity(opacity)
		$g[70].label.setOpacity(opacity)
		$g[71].label.setOpacity(opacity)
		$g[72].label.setOpacity(opacity)
		$g[73].label.setOpacity(opacity)
		$g[74].label.setOpacity(opacity)
	}

	function setPEMode(mode) {
		$g[30]=mode
		if ($g[30]==0) {
			$g[68].setCaption("Pipelining Enabled")
			showPipeline(1)
		} else
		if ($g[30]==1) {
			$g[68].setCaption("Pipelining Disabled")
			showPipeline(0)
		}
		setArg("peMode", $g[30].toString())
	}

	function setBPMode(mode) {
		$g[31]=mode
		if ($g[31]==0) {
			$g[69].setCaption("Branch Prediction")
			showBTB(1)
		} else
		if ($g[31]==1) {
			$g[69].setCaption("Branch Interlock")
			showBTB(0)
		} else
		if ($g[31]==2) {
			$g[69].setCaption("Delayed Branches")
			showBTB(0)
		}
		setArg("bpMode", $g[31].toString())
	}

	function setLIMode(mode) {
		$g[32]=mode
		if ($g[32]==0) {
			$g[70].setCaption("Load Interlock")
		} else
		if ($g[32]==1) {
			$g[70].setCaption("No Load Interlock")
		}
		setArg("liMode", $g[32].toString())
	}

	function setAFMode(mode) {
		$g[33]=mode
		if ($g[33]==0) {
			$g[71].setCaption("ALU Forwarding")
			showALUForwarding(1)
		} else
		if ($g[33]==1) {
			$g[71].setCaption("ALU Interlock")
			showALUForwarding(0)
		} else
		if ($g[33]==2) {
			$g[71].setCaption("No ALU Interlock")
			showALUForwarding(0)
		}
		setArg("afMode", $g[33].toString())
	}

	function setSFMode(mode) {
		$g[34]=mode
		if ($g[34]==0) {
			$g[72].setCaption("Store Operand\nForwarding")
			showSMDRForwarding(1)
		} else
		if ($g[34]==1) {
			$g[72].setCaption("Store Interlock")
			showSMDRForwarding(0)
		} else
		if ($g[34]==2) {
			$g[72].setCaption("No Store Interlock")
			showSMDRForwarding(0)
		}
		setArg("sfMode", $g[34].toString())
	}

	function setZFMode(mode) {
		$g[35]=mode
		if ($g[35]==0) {
			$g[73].setCaption("Zero Forwarding")
			showZeroForwarding(1)
		} else
		if ($g[35]==1) {
			$g[73].setCaption("Zero Interlock")
			showZeroForwarding(0)
		} else
		if ($g[35]==2) {
			$g[73].setCaption("No Zero Interlock")
			showZeroForwarding(0)
		}
		setArg("zfMode", $g[35].toString())
	}

	function $eh12(enter, x, y) {
		$g[210].setBrush(enter ? $g[11] : $g[15])
	}

	function $eh13(down, flags, x, y) {
		if (down && (flags&MB_LEFT)) {
			setArg("help", "0")
			$g[24].setOpacity(0)
		}
		return 0
	}

	function btbIndex(pc) {
		for (let lp1 = 0; lp1<2; lp1++)
		if ($g[84][lp1].value==pc)
		return lp1
		return -1
	}

	function calcNoCycles(op1) {
		let c = 0
		let b1 = op1&1
		let b2 = op1&2
		b2=b2>>1
		let b3 = op1&4
		b3=b3>>2
		let b4 = op1&8
		b4=b4>>4
		if (b1==0) {
			c++
		} else {
			c+=2
		}
		if (b2==b1) {
			c++
		} else {
			c+=2
		}
		if (b2==b3) {
			c++
		} else {
			c+=2
		}
		if (b3==b4) {
			c++
		} else {
			c+=2
		}
		if ($g[232]==0) {
			let b5 = op1&16
			let b6 = op1&32
			b6=b6>>1
			let b7 = op1&64
			b7=b7>>2
			let b8 = op1&128
			b8=b8>>4
			if (b5==b4) {
				c++
			} else {
				c+=2
			}
			if (b6==b5) {
				c++
			} else {
				c+=2
			}
			if (b7==b6) {
				c++
			} else {
				c+=2
			}
			if (b8==b7) {
				c++
			} else {
				c+=2
			}
		}
		$g[226]=c
	}

	function restoreDiv() {
		let ret = 0
		let aa = 0
		let mb_p1 = 0
		if ($g[232]==1) {
			let p11 = $g[228]&15
			p11=p11<<4
			aa=$g[230]<<1
			mb_p1=p11&128
			mb_p1=mb_p1>>7
			aa=aa|mb_p1
			ret=aa
			p11=p11<<1
			aa=(se8(aa)-se8($g[229]))&255
			$g[230]=aa
			p11=p11>>4
			$g[228]=p11
			$g[228]=$g[228]&15
			return ret
		} else {
			aa=$g[230]<<1
			mb_p1=$g[228]&128
			mb_p1=mb_p1>>7
			aa=aa|mb_p1
			ret=aa
			$g[228]=$g[228]<<1
			aa=(se8(aa)-se8($g[229]))&255
			$g[230]=aa
			$g[228]=$g[228]&255
			return ret
		}
	}

	function booth8() {
		let p21
		let p2m
		let b1 = $g[228]&1
		if (b1!=$g[227]) {
			if (b1>$g[227]) {
				$g[229]=(se8($g[229])-se8($g[230]))&255
				$g[234]="SUB+ASR"
			} else {
				$g[229]=(se8($g[229])+se8($g[230]))&255
				$g[234]="ADD+ASR"
			}
			p21=$g[229]&1
			p21=p21<<7
			p2m=$g[229]&128
			$g[228]=($g[228]>>1)&255
			$g[228]=$g[228]|p21
			$g[229]=($g[229]>>1)&255
			$g[229]=$g[229]|p2m
			$g[227]=b1
		} else {
			p21=$g[229]&1
			p21=p21<<7
			p2m=$g[229]&128
			$g[228]=($g[228]>>1)&255
			$g[228]=$g[228]|p21
			$g[229]=($g[229]>>1)&255
			$g[229]=$g[229]|p2m
			$g[227]=b1
			$g[234]="SRA"
		}
	}

	function booth() {
		let b1 = $g[228]&1
		if (b1!=$g[227]) {
			let p3 = $g[228]&15
			let q = $g[228]&240
			q=q>>4
			if (b1>$g[227]) {
				q=(se8(q)-se8($g[230]))&255
				$g[234]="SUB+ASR"
			} else {
				q=(se8(q)+se8($g[230]))&255
				$g[234]="ADD+ASR"
			}
			q=q<<4
			q=q&240
			$g[228]=q|p3
			let ms = $g[228]&128
			$g[228]=($g[228]>>1)&255
			$g[228]=$g[228]|ms
			$g[227]=b1
		} else {
			$g[234]="SRA"
			let lb = $g[228]&128
			$g[228]=($g[228]>>1)&255
			$g[228]=$g[228]|lb
			$g[227]=b1
		}
	}

	function calcNewPC() {
		if (instrIsBranch($g[149].vIns)) {
			if ($g[219]==1) {
				$g[212]=$g[132]
				fork(42, $g[136], 10)
				$g[215]=$g[138].value&127
				$g[216]=$g[92]
			} else {
				$g[212]=$g[129]
				$g[215]=($g[103].value+4)&127
				$g[219]=0
			}
		} else {
			if (isJorJAL($g[102].vIns)) {
				$g[212]=$g[132]
				$g[213]=$g[139]
				$g[215]=($g[103].value+$g[102].vRs2)&127
				$g[216]=$g[92]
			} else
			if (instrIsJumpR($g[102].vIns)) {
				$g[215]=($g[104][$g[102].vRs2].value)&127
				$g[216]=$g[94]
				$g[213]=$g[142]
			}
		}
	}

	function updBTB() {
		if ($g[215]!=$g[82].value) {
			$g[82].setNewValue($g[215])
			$g[211]=$g[216]
			if ($g[31]==BRANCH_PREDICTION) {
				if ($g[215]==$g[103].value+4) {
					if (btbIndex($g[103].value)>=0)
					$g[84][btbIndex($g[103].value)].setInvalid(1)
				} else {
					if (btbIndex($g[103].value)>=0)
					$g[28]=btbIndex($g[103].value)
					else 
					$g[28]=($g[28]) ? 0 : 1
					$g[84][$g[28]].setNewValue($g[103].value)
					$g[84][$g[28]].setInvalid(0)
					$g[84][$g[28]].useTag=0
					$g[85][$g[28]].setNewValue($g[215])
				}
			}
		}
	}

	function detectStall() {
		$g[27]=NO_STALL
		$g[29]=0
		if ($g[33]==ALU_INTERLOCK) {
			if (instrOpTypeRdt($g[149].vIns)==OP_TYPE_REG) {
				if ((instrOpTypeRs1($g[102].vIns)==OP_TYPE_REG) && ($g[102].vRs1==$g[149].vRdt))
				$g[27]=DATA_STALL
				if ((instrOpTypeRs2($g[102].vIns)==OP_TYPE_REG) && ($g[102].vRs2==$g[149].vRdt))
				$g[27]=DATA_STALL
			}
			if (instrOpTypeRdt($g[173].vIns)==OP_TYPE_REG) {
				if ((instrOpTypeRs1($g[102].vIns)==OP_TYPE_REG) && ($g[102].vRs1==$g[173].vRdt))
				$g[27]=DATA_STALL
				if ((instrOpTypeRs2($g[102].vIns)==OP_TYPE_REG) && ($g[102].vRs2==$g[173].vRdt))
				$g[27]=DATA_STALL
			}
		}
		if (($g[34]==STORE_INTERLOCK) && ($g[102].vIns==ST)) {
			if ((instrOpTypeRdt($g[149].vIns)==OP_TYPE_REG) && ($g[149].vRdt==$g[102].vRdt))
			$g[27]=DATA_STALL
			if ((instrOpTypeRdt($g[173].vIns)==OP_TYPE_REG) && ($g[173].vRdt==$g[102].vRdt))
			$g[27]=DATA_STALL
		}
		if (instrIsJumpR($g[102].vIns) && (instrIsBranch($g[149].vIns)==0)) {
			if ((instrOpTypeRdt($g[149].vIns)==OP_TYPE_REG) && ($g[149].vRdt==$g[102].vRs2))
			$g[27]=DATA_STALL
			if ((instrOpTypeRdt($g[173].vIns)==OP_TYPE_REG) && ($g[173].vRdt==$g[102].vRs2))
			$g[27]=DATA_STALL
		}
		if (($g[32]==LOAD_INTERLOCK) && ($g[149].vIns==LD)) {
			if ((instrOpTypeRs1($g[102].vIns)==OP_TYPE_REG) && ($g[102].vRs1==$g[149].vRdt))
			$g[27]=DATA_STALL
			if ((instrOpTypeRs2($g[102].vIns)==OP_TYPE_REG) && ($g[102].vRs2==$g[149].vRdt))
			$g[27]=DATA_STALL
		}
		if (instrIsMulti($g[149].vIns) && ($g[224]==1)) {
			$g[27]=DATA_STALL
		}
		if (($g[149].vIns==SC) && ($g[235]==1)) {
			$g[27]=DATA_STALL
		}
		if ($g[239]==1) {
			$g[27]=DATA_STALL
		}
		if (instrIsBranch($g[149].vIns)) {
			if (instrIsJump($g[102].vIns) && ($g[219]==0) && ($g[27]==NO_STALL)) {
				$g[29]=1
				$g[27]=CTRL_STALL
			} else
			if (instrIsJump($g[102].vIns) && ($g[219]==1) && ($g[27]==NO_STALL)) {
				$g[27]=NO_STALL
				$g[220]=1
			} else
			if ((instrIsBranch($g[102].vIns)==0) && ($g[219]==1) && ($g[27]==NO_STALL)) {
				$g[29]=1
				$g[27]=CTRL_STALL
			} else {
				$g[27]=NO_STALL
				$g[220]=0
			}
		} else {
			if (($g[27]==NO_STALL) && ($g[31]!=DELAYED_BRANCHES) && instrIsJump($g[102].vIns) && ($g[215]!=$g[82].value)) {
				$g[29]=1
				$g[27]=CTRL_STALL
			}
		}
		if ($g[27]==DATA_STALL) {
			$g[81].setStall(1, 0)
		} else
		if ($g[27]==CTRL_STALL) {
			$g[81].setStall(1, 1)
		}
	}

	function $eh14(m) {
		if (m=="not busy") {
			$g[239]=0
			fork(514, $obj)
		} else {
			fork(507, $obj)
			if (m=="busy2") {
				$g[239]=1
			} else {
				let p = m.find(", ")
				let nm = m.left(p)
				if (nm=="busy1") {
					$g[239]=1
					m=m.right(-p-2)
					let value = stringToNum(m)
					fork(519, $obj, value)
				} else {
					let ins = stringToNum(nm)
					m=m.right(-p-2)
					let val = stringToNum(m)
					if (ins==SC) {
						fork(519, $obj, val)
					} else
					if (ins==LD || ins==LR) {
						fork(516, $obj, val)
					}
				}
			}
		}
	}

	function pollBus(ins, val1, val2) {
		$g[238][0]=ins
		$g[238][1]=val1
		$g[238][2]=val2
		sendToMem("busy?", ", ", $g[36].toString(), "", "", "", "")
	}

	function setlocked() {
		let b_locked = $g[38] || $g[26]
		$g[68].showLocked(b_locked)
		$g[69].showLocked(b_locked)
		$g[70].showLocked(b_locked)
		$g[71].showLocked(b_locked)
		$g[72].showLocked(b_locked)
		$g[73].showLocked(b_locked)
	}

	function $eh15(down, flags, x, y) {
		if (down && (flags&MB_LEFT) && (!$g[38]) && (!$g[26])) {
			setPEMode(($g[30]+1)%2)
			resetCircuit()
		}
		return 0
	}

	function $eh16(down, flags, x, y) {
		if (down && (flags&MB_LEFT) && (!$g[38]) && (!$g[26])) {
			setBPMode(($g[31]+1)%3)
			resetCircuit()
		}
		return 0
	}

	function $eh17(down, flags, x, y) {
		if (down && (flags&MB_LEFT) && (!$g[38]) && (!$g[26])) {
			setLIMode(($g[32]+1)%2)
			resetCircuit()
		}
		return 0
	}

	function $eh18(down, flags, x, y) {
		if (down && (flags&MB_LEFT) && (!$g[38]) && (!$g[26])) {
			setAFMode(($g[33]+1)%3)
			resetCircuit()
		}
		return 0
	}

	function $eh19(down, flags, $2, $3) {
		if (down && (flags&MB_LEFT) && (!$g[38]) && (!$g[26])) {
			setSFMode(($g[34]+1)%3)
			resetCircuit()
		}
		return 0
	}

	function $eh20(down, flags, $2, $3) {
		if (down && (flags&MB_LEFT) && (!$g[38]) && (!$g[26])) {
			setZFMode(($g[35]+1)%3)
			resetCircuit()
		}
		return 0
	}

	function $eh21(down, flags, x, y) {
		if (down && flags && MB_LEFT) {
			if ($g[37]==0) {
				$g[37]=1
				startParallel()
				$g[74].setCaption("Non-parallel")
			} else {
				$g[37]=0
				$g[74].setCaption("Parallel")
				endParallel()
			}
			parallelMode()
		}
	}

	function $eh22(down, flags, x, y) {
		if (down && (flags&MB_LEFT)) {
			let lp1, opcode, reg
			let instr
			let s = "saveanim.php?state="
			for (lp1=0; lp1<32; lp1++) {
				instr=$g[80].instruction[lp1]
				opcode=(instr.vIns<<24)|(instr.vRdt<<16)|(instr.vRs1<<8)|(instr.vRs2)
				s=sprintf("%si%d='0x%08X' ", s, lp1, opcode)
			}
			for (lp1=0; lp1<4; lp1++) {
				reg=$g[104][lp1].value
				s=sprintf("%sr%d='0x%02X' ", s, lp1, reg)
			}
			s=sprintf("%speMode='%d' bpMode='%d' liMode='%d' afMode='%d' sfMode='%d' zfMode='%d'", s, $g[30], $g[31], $g[32], $g[33], $g[34], $g[35])
			getURL(s)
		}
		return 0
	}

	function $eh23(down, flags, x, y) {
		if (down && (flags&MB_LEFT))
		getURL("https://www.scss.tcd.ie/Jeremy.Jones/VivioJS/vivio.htm")
		return 0
	}

	function $eh24(down, flags, $2, $3) {
		if (down && (flags&MB_LEFT))
		getURL("showanim.php")
	}

	function $eh25(enter, x, y) {
		$g[79].setBrush(enter ? $g[10] : $g[14])
		$g[79].setTxtPen(enter ? $g[3] : $g[1])
		return 0
	}

	function $eh26(down, flags, x, y) {
		if (down && (flags&MB_LEFT)) {
			$g[18]=($g[18]==maxexample) ? 0 : $g[18]+1
			setArg("example", $g[18].toString())
			if ($g[37]==1) {
				reset()
				$g[37]=1
				$g[74].setCaption("Non-parallel")
				parallelMode()
			} else {
				reset()
			}
		}
		return 0
	}

	function execute(thread) {

		switchToThread(thread);

		while (1) {
			switch ($pc) {
			case -1:
				return;		// catch thread termination
			case 0:
				enterf(0);	// started with a function call
				$g[1] = new SolidPen(0, 1, BLACK)
				$g[2] = new SolidPen(0, 0, GRAY64)
				$g[3] = new SolidPen(0, 0, RED)
				$g[4] = new SolidPen(0, 0, WHITE)
				$g[5] = new SolidBrush(BLACK)
				$g[6] = new SolidBrush(GRAY64)
				$g[7] = new SolidBrush(LIGHT_BLUE)
				$g[8] = new SolidBrush(LIGHT_RED)
				$g[9] = new SolidBrush(LIGHT_GREEN)
				$g[10] = new SolidBrush(GRAY192)
				$g[11] = new SolidBrush(GRAY224)
				$g[12] = new SolidBrush(MARINE)
				$g[13] = new SolidBrush(RED)
				$g[14] = new SolidBrush(WHITE)
				$g[15] = new SolidBrush(YELLOW)
				$g[16] = new SolidBrush(BLUE)
				$g[17] = new SolidBrush(GREEN)
				$g[18] = 0
				setViewport(0, 0, WIDTH, HEIGHT, 1)
				setBgBrush($g[14])
				$g[19] = new Font("Calibri", 8)
				$g[20] = new Font("Calibri", 8, STRIKETHROUGH)
				$g[21] = new Layer(1, 3)
				$g[22] = new Layer(2, 3)
				$g[23] = new Layer(3, 0)
				$g[24] = new Layer(5, 0)
				$g[25] = new SolidBrush(RED)
				$g[26] = 0
				$g[27] = NO_STALL
				$g[28] = 1
				$g[29] = 0
				$g[30] = 0
				$g[31] = 0
				$g[32] = 0
				$g[33] = 0
				$g[34] = 0
				$g[35] = 0
				$g[36] = HART_1
				$g[37] = 0
				$g[38] = 0
				$g[39] = 0
				$g[40] = 0
				$g[41] = getTitle()
				if (!($g[41]=="Hart 2")) {
					$pc = 1
					continue
				}
				$g[36]=HART_2
				isHart2()
				$g[37]=1
				$pc = 1
			case 1:
				getMessage()
				$g[42] = newArray(44)
				$g[42][NOP]="NOP"
				$g[42][ADD]="ADD"
				$g[42][SUB]="SUB"
				$g[42][AND]="AND"
				$g[42][OR]="OR"
				$g[42][XOR]="XOR"
				$g[42][SLL]="SLL"
				$g[42][SRL]="SRL"
				$g[42][SRA]="SRA"
				$g[42][SLT]="SLT"
				$g[42][SGT]="SGT"
				$g[42][SLE]="SLE"
				$g[42][SGE]="SGE"
				$g[42][ADDi]="ADDi"
				$g[42][SUBi]="SUBi"
				$g[42][ANDi]="ANDi"
				$g[42][ORi]="ORi"
				$g[42][XORi]="XORi"
				$g[42][SLLi]="SLLi"
				$g[42][SRLi]="SRLi"
				$g[42][SRAi]="SRAi"
				$g[42][SLTi]="SLTi"
				$g[42][SGTi]="SGTi"
				$g[42][SLEi]="SLEi"
				$g[42][SGEi]="SGEi"
				$g[42][LD]="LD"
				$g[42][ST]="ST"
				$g[42][BEQ]="BEQ"
				$g[42][BNE]="BNE"
				$g[42][BLT]="BLT"
				$g[42][BLE]="BLE"
				$g[42][BGT]="BGT"
				$g[42][BGE]="BGE"
				$g[42][J]="J"
				$g[42][JAL]="JAL"
				$g[42][JR]="JR"
				$g[42][JALR]="JALR"
				$g[42][MUL]="MUL"
				$g[42][DIV]="DIV"
				$g[42][REM]="REM"
				$g[42][LR]="LR"
				$g[42][SC]="SC"
				$g[42][HALT]="HALT"
				$g[42][STALL]="STALL"
				$g[42][EMPTY]="EMPTY"
				$g[43] = new SolidBrush(BORDEAU)
				$g[44] = new SolidBrush(WHITE)
				$g[45] = new SolidPen(DOT, 1, rgba(0.75, 0.75, 0.75))
				$g[46] = new SolidPen(SOLID, 1, RED, ARROW60_END)
				$g[47] = new SolidBrush(PURPLE)
				$g[48] = new SolidBrush(WHITE)
				$g[49] = new SolidBrush(LIGHT_BLUE)
				$g[50] = new Font("Calibri", 9)
				$g[51] = new SolidBrush(WHITE)
				$g[52] = new SolidPen(SOLID, 1, RED, ROUND_START|ROUND_JOIN|ROUND_END)
				$g[53] = new SolidPen(SOLID, 1, GREEN, ROUND_START|ROUND_JOIN|ROUND_END)
				$g[54] = new SolidPen(SOLID, 1, ORANGE, ROUND_START|ROUND_JOIN|ROUND_END)
				$g[55] = new SolidBrush(WHITE)
				$g[56] = new SolidBrush(GRAY224)
				$g[57] = getArg("name", "")
				if (!($g[57]!="")) {
					$pc = 2
					continue
				}
				$g[57]=sprintf(":  %s", $g[57])
				$pc = 2
			case 2:
				$g[58] = new Font("Calibri", 20, SMALLCAPS|ITALIC)
				$g[59] = new Rectangle2($g[0], 0, HLEFT, 0, new SolidBrush(DARK_BLUE), 0, 10, 200, 30, $g[4], $g[58], sprintf(" RISC-V ANIMATION %s", $g[57]))
				$g[60] = new SolidPen(DASH, 1, DARK_BLUE, ROUND_START|ROUND_JOIN|ROUND_END)
				new Line2($g[0], 0, ABSOLUTE, $g[60], 110, 80, 740, 80)
				new Line2($g[0], 0, ABSOLUTE, $g[60], 110, 440, 740, 440)
				new Line2($g[0], 0, ABSOLUTE, $g[60], 110, 80, 110, 440)
				$g[61] = new Line2($g[0], 0, ABSOLUTE, $g[60], 240, 80, 240, 440)
				$g[62] = new Line2($g[0], 0, ABSOLUTE, $g[60], 390, 80, 390, 440)
				$g[63] = new Line2($g[0], 0, ABSOLUTE, $g[60], 590, 80, 590, 440)
				$g[64] = new Line2($g[0], 0, ABSOLUTE, $g[60], 690, 80, 690, 440)
				new Line2($g[0], 0, ABSOLUTE, $g[60], 740, 80, 740, 440)
				$g[65] = new SolidPen(DOT, THIN, BLACK)
				new Line2($g[0], 0, ABSOLUTE, $g[65], 10, 450, 700, 450)
				$g[66] = new Font("Calibri", 10, BOLD)
				$g[67] = new Button(20, 460, 70, 20, "Save Configuration", BUTTON_SP)
				$g[68] = new Button(100, 460, 70, 20, "Pipelining Enabled", BUTTON_PE)
				$g[69] = new Button(180, 460, 70, 20, "Branch Prediction", BUTTON_BP)
				$g[70] = new Button(260, 460, 70, 20, "Load Interlock", BUTTON_LI)
				$g[71] = new Button(340, 460, 70, 20, "ALU Forwarding", BUTTON_AF)
				$g[72] = new Button(420, 460, 70, 20, "Store Operand\nForwarding", BUTTON_SF)
				$g[73] = new Button(500, 460, 70, 20, "Zero Forwarding", BUTTON_ZF)
				$g[74] = new Button(580, 460, 70, 20, "Parallel", BUTTON_PAR)
				$g[75] = new Image($g[0], 0, 0, 0, "vivio.png", 660, 460, 0, 0, LOGOW, LOGOH)
				new Txt($g[0], 0, HLEFT|VTOP, 0, 46, $g[2], $g[19], "instructions executed:")
				$g[76] = new Txt($g[0], 0, HLEFT|VTOP, 0, 56, $g[2], $g[19], "ticks:")
				$g[77] = new Txt($g[0], 0, HLEFT|VTOP, 80, 46, $g[3], $g[19], "0")
				$g[78] = new Txt($g[0], 0, HLEFT|VTOP, 80, 56, $g[3], $g[19], "0")
				$g[79] = new Rectangle2($g[0], 0, 0, 0, 0, 0, 68, 100, 10, 0, $g[19], "Instruction Cache")
				$g[80] = new InstructionMemory(0, 80, 100, 320)
				$g[81] = new AnimatedClock($g[0], 0, 410, 80, 30)
				$g[82] = new Register(200, 210, 20, 40, TOP, "PC")
				$g[83] = new Rectangle2($g[0], 0, 0, 0, 0, 150, 85, 80, 10, 0, $g[19], "Branch Target Buffer")
				$g[84] = newArray(2)
				$g[84][0]=new Register(150, 100, 40, 20, LEFT, "PC")
				$g[84][1]=new Register(150, 120, 40, 20, LEFT, "PC")
				$g[85] = newArray(2)
				$g[85][0]=new Register(190, 100, 40, 20, RIGHT, "PPC")
				$g[85][1]=new Register(190, 120, 40, 20, RIGHT, "PPC")
				$g[86] = new Component(200, 170, 30, 10, "mux 2")
				$g[87] = new Component(170, 205, 10, 50, "mux 1")
				$g[88] = new Component(160, 270, 20, 10, "+4")
				$g[89] = new AnimPipe()
				$g[89].addPoint(110, 390)
				$g[89].addPoint(250, 390)
				$g[90] = new Rectangle($g[0], $g[23], 0, 0, $g[13], 180, 390, -30, -6, 60, 12, $g[4], $g[19])
				$g[90].setRounded(2, 2)
				$g[91] = new AnimPipe()
				$g[91].addPoint(210, 250)
				$g[91].addPoint(210, 320)
				$g[91].addPoint(110, 320)
				$g[92] = new AnimPipe()
				$g[92].addPoint(300, 170)
				$g[92].addPoint(300, 160)
				$g[92].addPoint(150, 160)
				$g[92].addPoint(150, 215)
				$g[92].addPoint(170, 215)
				$g[93] = new AnimPipe()
				$g[93].addPoint(150, 120)
				$g[93].addPoint(140, 120)
				$g[93].addPoint(140, 225)
				$g[93].addPoint(170, 225)
				$g[94] = new AnimPipe()
				$g[94].addPoint(240, 50)
				$g[94].addPoint(130, 50)
				$g[94].addPoint(130, 235)
				$g[94].addPoint(170, 235)
				$g[95] = new AnimPipe()
				$g[95].addPoint(160, 275)
				$g[95].addPoint(120, 275)
				$g[95].addPoint(120, 245)
				$g[95].addPoint(170, 245)
				$g[96] = new AnimPipe()
				$g[96].addPoint(180, 230)
				$g[96].addPoint(200, 230)
				$g[97] = new AnimPipe()
				$g[97].addPoint(210, 210)
				$g[97].addPoint(210, 180)
				$g[98] = new AnimPipe()
				$g[98].addPoint(210, 250)
				$g[98].addPoint(210, 275)
				$g[98].addPoint(180, 275)
				$g[99] = new AnimPipe()
				$g[99].addPoint(220, 230)
				$g[99].addPoint(240, 230)
				$g[99].addPoint(240, 230)
				$g[100] = new AnimPipe()
				$g[100].addPoint(215, 170)
				$g[100].addPoint(215, 140)
				$g[101] = new AnimPipe()
				$g[101].addPoint(270, 390)
				$g[101].addPoint(390, 390)
				$g[102] = new InstructionRegister(250, 350, 20, 85, "ID")
				$g[103] = new Register(250, 210, 20, 40, TOP, "PC1")
				new Txt($g[0], 0, HLEFT|VTOP, 570, 40, 0, $g[19], "Register\nFile")
				$g[104] = newArray(NUM_REGS)
				$g[105] = 240
				$g[106] = 25
				$g[107] = TOP
				$g[202]=0
				$pc = 3
			case 3:
				if (!($g[202]<NUM_REGS)) {
					$pc = 6
					continue
				}
				if (!($g[202]==(NUM_REGS/2))) {
					$pc = 4
					continue
				}
				$g[107]=BOTTOM
				$g[105]=240
				$g[106]+=REG_HEIGHT
				$pc = 4
			case 4:
				$g[108] = "x"+$g[202].toString()
				$g[104][$g[202]]=new Register($g[105], $g[106], REG_WIDTH, REG_HEIGHT, $g[107], $g[108])
				$g[105]+=REG_WIDTH
				$pc = 5
			case 5:
				$g[202]++
				$pc = 3
				continue
			case 6:
				$g[109] = new Component(275, 170, 50, 10, "mux 3")
				$g[110] = new Component(270, 320, 30, 10, "ADD4")
				$g[111] = new Component(300, 320, 30, 10, "ADDi")
				$g[112] = new Component(250, 100, 10, 40, "mux 4")
				$g[113] = new Component(375, 220, 10, 30, "mux 5")
				new Rectangle2($g[0], 0, 0, 0, 0, 280, 365, 20, 10, 0, $g[19], "4")
				$g[114] = new SolidPen(SOLID, 0, PURPLE, ARROW60_END)
				$g[115] = new SolidPen(SOLID, 2, RED, ARROW60_END)
				$g[116] = new SolidPen(SOLID, MEDIUM, BLACK)
				$g[117] = new Txt($g[0], $g[21], HLEFT|VTOP, 542, 376, 0, $g[19], "zero")
				$g[118] = new Line2($g[0], $g[21], ABSOLUTE, $g[114], 550, 375, 550, 260)
				$g[119] = new Line2($g[0], $g[21], ABSOLUTE, $g[114], 550, 375, 550, 280, 520, 280, 520, 260, 530, 260)
				$g[120] = new Line2($g[0], $g[21], ABSOLUTE, $g[114], 550, 360, 410, 360, 410, 220, 420, 220)
				$g[121] = new Line2($g[0], $g[21], ABSOLUTE, $g[114], 570, 220, 580, 220, 580, 150, 385, 150, 385, 175, 325, 175)
				$g[122] = new AnimPipe()
				$g[122].addPoint(260, 210)
				$g[122].addPoint(260, 200)
				$g[122].addPoint(220, 200)
				$g[122].addPoint(220, 180)
				$g[123] = new AnimPipe()
				$g[123].addPoint(285, 320)
				$g[123].addPoint(285, 240)
				$g[123].addPoint(375, 240)
				$g[124] = new AnimPipe()
				$g[124].addPoint(260, 250)
				$g[124].addPoint(260, 345)
				$g[124].addPoint(290, 345)
				$g[124].addPoint(290, 330)
				$g[125] = new AnimPipe()
				$g[125].addPoint(260, 250)
				$g[125].addPoint(260, 345)
				$g[125].addPoint(310, 346)
				$g[125].addPoint(310, 330)
				$g[126] = new AnimPipe()
				$g[126].addPoint(290, 360)
				$g[126].addPoint(290, 330)
				$g[127] = new AnimPipe()
				$g[127].addPoint(270, 390)
				$g[127].addPoint(320, 390)
				$g[127].addPoint(320, 330)
				$g[128] = new Rectangle($g[0], $g[23], 0, 0, $g[13], 320, 376, -12, -6, 24, 12, $g[4], $g[19])
				$g[128].setRounded(2, 2)
				$g[129] = new AnimPipe()
				$g[129].addPoint(295, 320)
				$g[129].addPoint(295, 180)
				$g[130] = new Rectangle($g[0], $g[23], 0, 0, $g[13], 285, 200, -12, -6, 24, 12, $g[4], $g[19])
				$g[130].setRounded(2, 2)
				$g[131] = new AnimPipe()
				$g[131].addPoint(315, 320)
				$g[131].addPoint(315, 310)
				$g[132] = new AnimPipe()
				$g[132].addPoint(307, 300)
				$g[132].addPoint(307, 180)
				$g[133] = new Rectangle($g[0], $g[23], 0, 0, $g[13], 315, 200, -12, -6, 24, 12, $g[4], $g[19])
				$g[133].setRounded(2, 2)
				$g[134] = new AnimPipe()
				$g[134].addPoint(307, 300)
				$g[134].addPoint(307, 240)
				$g[134].addPoint(375, 240)
				$g[135] = new AnimPipe()
				$g[135].addPoint(315, 300)
				$g[135].addPoint(315, 280)
				$g[135].addPoint(345, 280)
				$g[136] = new AnimPipe()
				$g[136].addPoint(360, 270)
				$g[136].addPoint(360, 255)
				$g[136].addPoint(317, 255)
				$g[136].addPoint(317, 180)
				$g[137] = new Component(297, 300, 40, 10, "demux 1")
				$g[138] = new Register(345, 270, 30, 20, LEFT, "M")
				$g[138].rotateLabel(90)
				$g[139] = new AnimPipe()
				$g[139].addPoint(300, 170)
				$g[139].addPoint(300, 130)
				$g[139].addPoint(260, 130)
				$g[140] = new Rectangle($g[0], $g[23], 0, 0, $g[13], 300, 160, -12, -6, 24, 12, $g[4], $g[19])
				$g[140].setRounded(2, 2)
				$g[141] = new AnimPipe()
				$g[141].addPoint(250, 120)
				$g[141].addPoint(230, 120)
				$g[142] = new AnimPipe()
				$g[142].addPoint(240, 60)
				$g[142].addPoint(220, 60)
				$g[142].addPoint(220, 83)
				$g[142].addPoint(280, 83)
				$g[142].addPoint(280, 110)
				$g[142].addPoint(260, 110)
				$g[143] = new Rectangle($g[0], $g[23], 0, 0, $g[13], 200, 44, -12, 0, 24, 12, $g[4], $g[19])
				$g[144] = new AnimPipe()
				$g[144].addPoint(385, 240)
				$g[144].addPoint(420, 240)
				$g[145] = new AnimPipe()
				$g[145].addPoint(360, 75)
				$g[145].addPoint(360, 230)
				$g[145].addPoint(375, 230)
				$g[146] = new Rectangle($g[0], $g[23], 0, 0, $g[13], 340, 82, -12, 0, 24, 12, $g[4], $g[19], "R0:0")
				$g[146].setRounded(2, 2)
				$g[147] = new AnimPipe()
				$g[147].addPoint(375, 75)
				$g[147].addPoint(375, 210)
				$g[147].addPoint(420, 210)
				$g[148] = new Rectangle($g[0], $g[23], 0, 0, $g[13], 370, 82, -12, 0, 24, 12, $g[4], $g[19], "R0:0")
				$g[148].setRounded(2, 2)
				$g[149] = new InstructionRegister(390, 350, 20, 85, "EX")
				$g[150] = new Register(420, 190, 20, 40, TOP, "A")
				$g[151] = new Register(420, 230, 20, 40, BOTTOM, "B")
				$g[152] = new Component(500, 180, 10, 50, "mux 6")
				$g[153] = new Component(500, 230, 10, 50, "mux 7")
				$g[154] = new Component(500, 310, 10, 40, "mux 8")
				$g[155] = new ALU(530, 190, 40, 80)
				$g[156] = new AnimPipe()
				$g[156].addPoint(410, 390)
				$g[156].addPoint(610, 390)
				$g[157] = new AnimPipe()
				$g[157].addPoint(610, 210)
				$g[157].addPoint(610, 170)
				$g[157].addPoint(470, 170)
				$g[157].addPoint(470, 190)
				$g[157].addPoint(500, 190)
				$g[158] = new AnimPipe()
				$g[158].addPoint(610, 210)
				$g[158].addPoint(610, 100)
				$g[158].addPoint(420, 100)
				$g[158].addPoint(420, 115)
				$g[159] = new AnimPipe()
				$g[159].addPoint(710, 210)
				$g[159].addPoint(710, 160)
				$g[159].addPoint(460, 160)
				$g[159].addPoint(460, 200)
				$g[159].addPoint(500, 200)
				$g[160] = new AnimPipe()
				$g[160].addPoint(440, 220)
				$g[160].addPoint(500, 220)
				$g[161] = new AnimPipe()
				$g[161].addPoint(440, 240)
				$g[161].addPoint(500, 240)
				$g[162] = new AnimPipe()
				$g[162].addPoint(410, 390)
				$g[162].addPoint(450, 390)
				$g[162].addPoint(450, 250)
				$g[162].addPoint(500, 250)
				$g[163] = new Rectangle($g[0], $g[23], 0, 0, $g[13], 432, 370, -10, 0, 20, 12, $g[4], $g[19], "IMM")
				$g[163].setRounded(2, 2)
				$g[164] = new AnimPipe()
				$g[164].addPoint(710, 250)
				$g[164].addPoint(710, 300)
				$g[164].addPoint(460, 300)
				$g[164].addPoint(460, 260)
				$g[164].addPoint(500, 260)
				$g[165] = new AnimPipe()
				$g[165].addPoint(610, 250)
				$g[165].addPoint(610, 290)
				$g[165].addPoint(470, 290)
				$g[165].addPoint(470, 270)
				$g[165].addPoint(500, 270)
				$g[166] = new AnimPipe()
				$g[166].addPoint(610, 250)
				$g[166].addPoint(610, 290)
				$g[166].addPoint(470, 290)
				$g[166].addPoint(470, 320)
				$g[166].addPoint(500, 320)
				$g[167] = new AnimPipe()
				$g[167].addPoint(710, 250)
				$g[167].addPoint(710, 300)
				$g[167].addPoint(460, 300)
				$g[167].addPoint(460, 330)
				$g[167].addPoint(500, 330)
				$g[168] = new AnimPipe()
				$g[168].addPoint(435, 270)
				$g[168].addPoint(435, 340)
				$g[168].addPoint(500, 340)
				$g[169] = new AnimPipe()
				$g[169].addPoint(510, 330)
				$g[169].addPoint(600, 330)
				$g[170] = new AnimPipe()
				$g[170].addPoint(510, 210)
				$g[170].addPoint(530, 210)
				$g[171] = new AnimPipe()
				$g[171].addPoint(510, 250)
				$g[171].addPoint(530, 250)
				$g[172] = new AnimPipe()
				$g[172].addPoint(570, 240)
				$g[172].addPoint(600, 240)
				$g[173] = new InstructionRegister(610, 350, 20, 85, "MA")
				$g[174] = new Register(600, 210, 20, 40, TOP, "O0")
				$g[175] = new Register(600, 320, 40, 20, RIGHT, "SMR")
				new Txt($g[0], $g[21], HLEFT|VTOP, 658, 120, 0, $g[19], "memory\naddress")
				new Txt($g[0], $g[21], HLEFT|VTOP, 755, 300, 0, $g[19], "memory\ndata-in")
				new Txt($g[0], $g[21], HLEFT|VTOP, 755, 65, 0, $g[19], "memory\ndata-out")
				$g[176] = new Register(400, 115, 40, 30, LEFT, "LPAR")
				$g[177] = new Register(510, 115, 20, 30, TOP, "LF")
				$g[178] = new Line2($g[0], $g[21], ABSOLUTE, $g[114], 520, 145, 520, 200, 530, 200)
				$g[179] = new AnimPipe()
				$g[179].addPoint(550, 130)
				$g[179].addPoint(530, 130)
				$g[180] = new Txt($g[0], $g[21], HLEFT|VTOP, 552, 125, 0, $g[19], "1")
				$g[181] = new Rectangle2($g[0], 0, 0, $g[1], $g[15], 470, 120, 20, 20, $g[1], $g[50], sprintf("="))
				$g[181].setRounded(2, 2)
				$g[182] = new AnimPipe()
				$g[182].addPoint(440, 135)
				$g[182].addPoint(470, 135)
				$g[183] = new AnimPipe()
				$g[183].addPoint(490, 130)
				$g[183].addPoint(510, 130)
				$g[184] = new Stack(800, 60)
				$g[185] = new Rectangle2($g[0], 0, 0, $g[4], $g[14], 795, 10, 10, 10, $g[1], $g[19], sprintf("Memory Bus"))
				$g[185].setOpacity(0)
				$g[186] = new Rectangle2($g[0], 0, 0, $g[4], $g[14], 880, 230, 10, 10, $g[1], $g[19], sprintf("to/from memory"))
				$g[186].setOpacity(0)
				$g[187] = new Rectangle2($g[0], 0, 0, $g[4], $g[14], 880, 180, 10, 10, $g[3], $g[19], sprintf("Bus Busy"))
				$g[187].setOpacity(0)
				$g[188] = new AnimPipe()
				$g[188].resize(20)
				$g[188].addPoint(800, 70)
				$g[188].addPoint(800, 450)
				$g[189] = new AnimPipe()
				$g[189].resize(20)
				$g[189].addPoint(800, 410)
				$g[189].addPoint(800, 30)
				$g[188].setOpacity(0)
				$g[189].setOpacity(0)
				$g[190] = new AnimPipe()
				$g[190].resize(10)
				$g[190].addPoint(810, 250)
				$g[190].addPoint(950, 250)
				$g[190].setOpacity(0)
				$g[191] = new Component(670, 210, 10, 40, "mux 9")
				$g[192] = new AnimPipe()
				$g[192].addPoint(630, 390)
				$g[192].addPoint(700, 390)
				$g[193] = new AnimPipe()
				$g[193].addPoint(620, 230)
				$g[193].addPoint(670, 230)
				$g[194] = new AnimPipe()
				$g[194].addPoint(680, 230)
				$g[194].addPoint(700, 230)
				$g[195] = new AnimPipe()
				$g[195].addPoint(620, 230)
				$g[195].addPoint(630, 230)
				$g[195].addPoint(630, 110)
				$g[195].addPoint(800, 110)
				$g[196] = new AnimPipe()
				$g[196].addPoint(640, 330)
				$g[196].addPoint(800, 330)
				$g[197] = new AnimPipe()
				$g[197].addPoint(800, 90)
				$g[197].addPoint(650, 90)
				$g[197].addPoint(650, 220)
				$g[197].addPoint(670, 220)
				$g[198] = new AnimPipe()
				$g[198].addPoint(800, 90)
				$g[198].addPoint(450, 90)
				$g[198].addPoint(450, 125)
				$g[198].addPoint(470, 125)
				$g[199] = new InstructionRegister(700, 350, 20, 85, "WB")
				$g[200] = new Register(700, 210, 20, 40, TOP, "O1")
				$g[201] = new AnimPipe()
				$g[201].addPoint(720, 230)
				$g[201].addPoint(730, 230)
				$g[201].addPoint(730, 10)
				$g[201].addPoint(470, 10)
				$g[201].addPoint(470, 25)
				$g[155].txtResult.moveToFront()
				parallelMode()
				resetCircuit()
				$g[204] = ""
				$g[202]=0
				$pc = 7
			case 7:
				if (!($g[202]<32)) {
					$pc = 9
					continue
				}
				$g[80].setOpcode(4*$g[202], 0)
				$pc = 8
			case 8:
				$g[202]++
				$pc = 7
				continue
			case 9:
				$g[202]=0
				$pc = 10
			case 10:
				if (!($g[202]<4)) {
					$pc = 12
					continue
				}
				$g[204]=sprintf("r%d", $g[202])
				$g[104][$g[202]].setValue(getArgAsNum($g[204], 0))
				$pc = 11
			case 11:
				$g[202]++
				$pc = 10
				continue
			case 12:
				setTPS(20)
				$g[18]=getArgAsNum("example", 0)
				if (!($g[18]==0)) {
					$pc = 16
					continue
				}
				$g[202]=0
				$pc = 13
			case 13:
				if (!($g[202]<32)) {
					$pc = 15
					continue
				}
				$g[204]=sprintf("i%d", $g[202])
				$g[80].setOpcode(4*$g[202], getArgAsNum($g[204], 0))
				$pc = 14
			case 14:
				$g[202]++
				$pc = 13
				continue
			case 15:
				$pc = 26
				continue
			case 16:
				if (!($g[18]==1)) {
					$pc = 17
					continue
				}
				$g[80].setValue(0, ADDi, 12, 0, 4)
				$g[80].setValue(4, ADDi, 13, 0, 5)
				$g[80].setValue(8, ST, 12, 2, 0)
				$g[80].setValue(12, SUBi, 2, 2, 4)
				$g[80].setValue(16, JAL, 1, 0, 16)
				$g[80].setValue(20, XOR, 0, 0, 0)
				$g[80].setValue(24, HALT, 0, 0, 0)
				$g[80].setValue(32, ST, 1, 2, 0)
				$g[80].setValue(36, ADD, 8, 0, 2)
				$g[80].setValue(40, SUBi, 2, 2, 4)
				$g[80].setValue(44, SUB, 10, 12, 13)
				$g[80].setValue(48, SUBi, 2, 2, 4)
				$g[80].setValue(52, SUBi, 2, 2, 4)
				$g[80].setValue(56, JAL, 1, 0, 24)
				$g[80].setValue(60, LD, 1, 8, 0)
				$g[80].setValue(64, ADDi, 2, 2, 12)
				$g[80].setValue(68, JALR, 0, 0, 1)
				$g[80].setValue(80, ST, 1, 2, 0)
				$g[80].setValue(84, ADD, 9, 0, 2)
				$g[80].setValue(88, SUBi, 2, 2, 4)
				$g[80].setValue(92, ST, 8, 2, 0)
				$g[80].setValue(96, SUBi, 2, 2, 4)
				$g[80].setValue(100, ADD, 8, 0, 9)
				$g[80].setValue(104, LD, 1, 8, 0)
				$g[80].setValue(108, LD, 8, 8, -4)
				$g[80].setValue(112, ADDi, 2, 2, 8)
				$g[80].setValue(116, JALR, 0, 0, 1)
				$pc = 25
				continue
			case 17:
				if (!($g[18]==2)) {
					$pc = 18
					continue
				}
				$g[104][3].setValue(8)
				$g[104][5].setValue(12)
				$g[80].setValue(0, LR, 4, 0, 3)
				$g[80].setValue(4, SC, 1, 5, 3)
				$pc = 24
				continue
			case 18:
				if (!($g[18]==3)) {
					$pc = 19
					continue
				}
				$g[104][3].setValue(8)
				$g[104][5].setValue(6)
				$g[80].setValue(0, LR, 4, 0, 3)
				$g[80].setValue(4, NOP, 0, 0, 0)
				$g[80].setValue(8, NOP, 0, 0, 0)
				$g[80].setValue(12, NOP, 0, 0, 0)
				$g[80].setValue(16, SC, 1, 5, 3)
				$pc = 23
				continue
			case 19:
				if (!($g[18]==4)) {
					$pc = 20
					continue
				}
				$g[80].setValue(0, ADDi, 1, 0, 13)
				$g[80].setValue(4, ADDi, 2, 0, 4)
				$g[80].setValue(8, DIV, 3, 1, 2)
				$pc = 22
				continue
			case 20:
				if (!($g[18]==5)) {
					$pc = 21
					continue
				}
				$g[80].setValue(0, ADDi, 1, 0, 3)
				$g[80].setValue(4, ADDi, 2, 0, 2)
				$g[80].setValue(8, MUL, 3, 1, 2)
				$pc = 21
			case 21:
				$pc = 22
			case 22:
				$pc = 23
			case 23:
				$pc = 24
			case 24:
				$pc = 25
			case 25:
				$pc = 26
			case 26:
				if (!($g[18]>0)) {
					$pc = 30
					continue
				}
				$g[202]=0
				$pc = 27
			case 27:
				if (!($g[202]<32)) {
					$pc = 29
					continue
				}
				$g[204]=sprintf("i%d", $g[202])
				setArg($g[204], $g[80].getOpcode($g[202]*4).toString())
				$pc = 28
			case 28:
				$g[202]++
				$pc = 27
				continue
			case 29:
				$g[18]=($g[18]>maxexample) ? 0 : $g[18]
				$pc = 30
			case 30:
				$g[205] = getArgAsNum("haltOnHalt", 1)
				$g[31]=getArgAsNum("bpMode", 0)
				setBPMode($g[31])
				$g[32]=getArgAsNum("liMode", 0)
				setLIMode($g[32])
				$g[33]=getArgAsNum("afMode", 0)
				setAFMode($g[33])
				$g[34]=getArgAsNum("sfMode", 0)
				setSFMode($g[34])
				$g[35]=getArgAsNum("zfMode", 0)
				setZFMode($g[35])
				$g[30]=getArgAsNum("peMode", 0)
				setPEMode($g[30])
				$g[26]=getArgAsNum("locked", 0)
				$g[206] = getArgAsNum("help", 1)
				$g[207] = new Rectangle2($g[0], $g[24], 0, 0, $g[14], 0, 0, WIDTH, HEIGHT)
				$g[207].setOpacity(0.5)
				$g[207].setRounded(10, 10)
				$g[208] = new SolidPen(SOLID, 2, RED, ROUND_START|ROUND_JOIN|ROUND_END)
				$g[209] = new Font("Arial", 12, BOLD)
				new Txt($g[0], $g[24], HLEFT|VTOP, 212, 290, $g[208], $g[209], "LEFT CLICK on animation background to start and stop clock.\n\nSHIFT LEFT CLICK on background to execute \"single RISC-V clock cycle\".")
				if (!(!$g[26])) {
					$pc = 31
					continue
				}
				$g[207]=new Rectangle2($g[0], $g[24], 0, $g[208], 0, 10, 68, 80, 10)
				$g[207].setRounded(5, 5)
				$g[207]=new Rectangle2($g[0], $g[24], 0, $g[208], 0, 15, 121, 30, 10)
				$g[207].setRounded(5, 5)
				$g[207]=new Rectangle2($g[0], $g[24], 0, $g[208], 0, 50, 121, 14, 10)
				$g[207].setRounded(5, 5)
				$g[207]=new Rectangle2($g[0], $g[24], 0, $g[208], 0, 66, 121, 14, 10)
				$g[207].setRounded(5, 5)
				$g[207]=new Rectangle2($g[0], $g[24], 0, $g[208], 0, 82, 121, 14, 10)
				$g[207].setRounded(5, 5)
				new Txt($g[0], $g[24], HLEFT|VTOP, 110, 60, $g[208], $g[209], "LEFT CLICK to change\ninitial program.")
				new Txt($g[0], $g[24], HLEFT|VTOP, 110, 105, $g[208], $g[209], "LEFT or RIGHT CLICK to \"rotate\"\ninstructions and operands.\nHold and release to reset value.")
				$pc = 31
			case 31:
				$g[207]=new Rectangle2($g[0], $g[24], 0, $g[208], 0, 540, 25, 20, 25)
				$g[207].setRounded(10, 10)
				new Txt($g[0], $g[24], HLEFT|VTOP, 570, 40, $g[208], $g[209], "LEFT or RIGHT CLICK register\nto increment or decrement value.")
				if (!(!$g[26])) {
					$pc = 32
					continue
				}
				$g[207]=new Rectangle2($g[0], $g[24], 0, $g[208], 0, 110, 455, 550, 30)
				$g[207].setRounded(10, 10)
				new Txt($g[0], $g[24], HLEFT|VTOP, 180, 435, $g[208], $g[209], "LEFT CLICK on any of the buttons below to change circuit configuration.")
				$pc = 32
			case 32:
				$g[210] = new Rectangle2($g[0], $g[24], 0, $g[208], $g[15], 305, 230, 100, 30, $g[208], $g[209], "CLOSE HELP")
				$g[210].setRounded(5, 5)
				$g[210].addEventHandler("eventEE", this, $eh12)
				$g[210].addEventHandler("eventMB", this, $eh13)
				if (!($g[206]==0)) {
					$pc = 33
					continue
				}
				$g[24].setOpacity(0)
				$pc = 33
			case 33:
				$g[104][2].setValue(68)
				if (!($g[36]==HART_1)) {
					$pc = 34
					continue
				}
				$g[184].setSP(68)
				$pc = 34
			case 34:
				$g[217] = 1
				$g[218] = 0
				$g[219] = 0
				$g[220] = 0
				$g[221] = 1
				$g[222] = CHECK
				$g[224] = 0
				$g[225] = 0
				$g[231] = 1
				$g[233] = 0
				$g[234] = ""
				$g[235] = 0
				$g[236] = 0
				$g[237] = 0
				$g[238] = newArray(3)
				$g[239] = 0
				$g[240] = new Rectangle2($g[0], 0, 0, $g[4], $g[14], 950, 450, 0, 0, $g[1], $g[19], sprintf(""))
				$g[240].addEventHandler("eventMessage", this, $eh14)
				$g[68].label.addEventHandler("eventMB", this, $eh15)
				$g[69].label.addEventHandler("eventMB", this, $eh16)
				$g[70].label.addEventHandler("eventMB", this, $eh17)
				$g[71].label.addEventHandler("eventMB", this, $eh18)
				$g[72].label.addEventHandler("eventMB", this, $eh19)
				$g[73].label.addEventHandler("eventMB", this, $eh20)
				$g[74].label.addEventHandler("eventMB", this, $eh21)
				$g[67].label.addEventHandler("eventMB", this, $eh22)
				$g[75].addEventHandler("eventMB", this, $eh23)
				$g[59].addEventHandler("eventMB", this, $eh24)
				$g[79].addEventHandler("eventEE", this, $eh25)
				$g[79].addEventHandler("eventMB", this, $eh26)
				callf(523, $obj)
				continue
			case 35:
				returnf(0)
				continue
			case 36:
				enterf(0);	// update
				$obj.vIns=$obj.nIns
				$obj.vRdt=$obj.nRdt
				$obj.vRs1=$obj.nRs1
				$obj.vRs2=$obj.nRs2
				$obj.txt=instrText($obj.vIns, $obj.vRdt, $obj.vRs1, $obj.vRs2)
				$obj.label.setTxt($obj.txt)
				$obj.r2.setBrush($g[15])
				if (wait(16))
				return
				$pc = 37
			case 37:
				$obj.r2.setBrush($g[14])
				returnf(0)
				continue
			case 38:
				enterf(0);	// update
				$obj.value=$obj.newValue
				$obj.tag=$obj.newTag
				$obj.updateLabel()
				$obj.bg1.setBrush($g[15])
				$obj.bg2.setBrush($g[15])
				if (wait(16))
				return
				$pc = 39
			case 39:
				$obj.bg1.setBrush($g[14])
				$obj.bg2.setBrush($g[14])
				returnf(0)
				continue
			case 40:
				enterf(1);	// store
				$stack[$fp+1] = floor(($stack[$fp-3]/4))%MEMORY_ADDRESSES
				$obj.stack[$stack[$fp+1]].setNewValue($stack[$fp-4])
				callf(38, $obj.stack[$stack[$fp+1]])
				continue
			case 41:
				returnf(2)
				continue
			case 42:
				enterf(5);	// animate
				$stack[$fp+1] = 0, $stack[$fp+3] = 0
				$stack[$fp+4] = 0
				$obj.calcLength()
				$obj.fgLine.setPt(0, $obj.px[0], $obj.py[0])
				$obj.fgLine.setPen($obj.fgPen0)
				$stack[$fp+5] = 1
				$pc = 43
			case 43:
				if (!($stack[$fp+5]<$obj.n)) {
					$pc = 46
					continue
				}
				$obj.fgLine.setPt($stack[$fp+5], $obj.px[$stack[$fp+5]-1], $obj.py[$stack[$fp+5]-1])
				$stack[$fp+1]+=$obj.ls[$stack[$fp+5]-1]
				$stack[$fp+2]=round($stack[$fp+1]*$stack[$fp-3]/$obj.ll)
				if ($obj.fgLine.setPt($stack[$fp+5], $obj.px[$stack[$fp+5]], $obj.py[$stack[$fp+5]], $stack[$fp+2]-$stack[$fp+3], 1, 1))
				return
				$pc = 44
			case 44:
				$stack[$fp+3]=$stack[$fp+2]
				$pc = 45
			case 45:
				$stack[$fp+5]++
				$pc = 43
				continue
			case 46:
				if (!($obj.head)) {
					$pc = 47
					continue
				}
				$obj.fgLine.setPen($obj.fgPen1)
				$pc = 47
			case 47:
				returnf(1)
				continue
			case 48:
				enterf(4);	// clockCycle
				$stack[$fp+1] = $stack[$fp-3]/2
				$stack[$fp+2] = $stack[$fp-3]/5
				$stack[$fp+3] = $stack[$fp-3]/10
				$obj.canUpdate=0
				$obj.prev_clock.translate(-$obj.chw, 0, $stack[$fp+1], 1, 0)
				$obj.next_clock.translate(-$obj.chw, 0, $stack[$fp+1], 1, 0)
				$obj.dot.translate(0, -$obj.ch, $stack[$fp+2], 1, 0)
				if (wait($stack[$fp+1]))
				return
				$pc = 49
			case 49:
				$obj.prev_clock.translate(-$obj.chw, 0, $stack[$fp+1], 1, 0)
				$obj.next_clock.translate(-$obj.chw, 0, $stack[$fp+1], 1, 0)
				$obj.dot.translate(0, $obj.ch, $stack[$fp+2], 1, 0)
				if (wait($stack[$fp+3]))
				return
				$pc = 50
			case 50:
				$obj.canUpdate=1
				$obj.prev_clock.translate(2*$obj.cw, 0)
				$obj.prev_clock.setPen($obj.stall ? ($obj.type ? $g[54] : $g[52]) : $g[53])
				if (wait($stack[$fp+2]*2))
				return
				$pc = 51
			case 51:
				$stack[$fp+4] = $obj.next_clock
				$obj.next_clock=$obj.prev_clock
				$obj.prev_clock=$stack[$fp+4]
				if (!($obj.stall)) {
					$pc = 52
					continue
				}
				$obj.stall--
				$pc = 52
			case 52:
				returnf(1)
				continue
			case 53:
				enterf(0);	// ifExec
				if (!(($g[27]==NO_STALL) || ($g[27]==CTRL_STALL))) {
					$pc = 54
					continue
				}
				fork(38, $g[82])
				$g[80].setActive($g[82].newValue)
				$pc = 54
			case 54:
				if (wait(8))
				return
				$pc = 55
			case 55:
				if (!(($g[31]==BRANCH_PREDICTION) && (btbIndex($g[82].value)!=-1))) {
					$pc = 56
					continue
				}
				$g[28]=btbIndex($g[82].value)
				$g[82].setNewValue($g[85][$g[28]].value)
				$g[211]=$g[93]
				$pc = 57
				continue
			case 56:
				$g[82].setNewValue(($g[82].value+4)&127)
				$g[211]=$g[95]
				$pc = 57
			case 57:
				$g[103].setNewValue($g[82].value)
				$g[102].setNewInstruction($g[80].instruction[$g[82].value/4])
				if (wait(8))
				return
				$pc = 58
			case 58:
				fork(42, $g[99], 64)
				fork(42, $g[91], 24)
				fork(42, $g[98], 24)
				if (!(($g[31]==BRANCH_PREDICTION) && (instrIsJump($g[102].vIns)))) {
					$pc = 64
					continue
				}
				if (!($g[27]==CTRL_STALL)) {
					$pc = 60
					continue
				}
				callf(42, $g[97], 12)
				continue
			case 59:
				$pc = 62
				continue
			case 60:
				callf(42, $g[122], 12)
				continue
			case 61:
				$pc = 62
			case 62:
				callf(42, $g[100], 12)
				continue
			case 63:
				$pc = 66
				continue
			case 64:
				if (wait(24))
				return
				$pc = 65
			case 65:
				$pc = 66
			case 66:
				fork(42, $g[89], 40)
				if (!(($g[31]==BRANCH_PREDICTION) && (btbIndex($g[82].value)!=-1))) {
					$pc = 67
					continue
				}
				$g[84][btbIndex($g[82].value)].highlight($g[25])
				$g[85][btbIndex($g[82].value)].highlight($g[25])
				$pc = 67
			case 67:
				$g[90].setTxt($g[102].getNewInstrTxt())
				if ($g[90].setOpacity(1, 16, 1, 1))
				return
				$pc = 68
			case 68:
				callf(42, $g[211], 16)
				continue
			case 69:
				callf(42, $g[96], 8)
				continue
			case 70:
				returnf(0)
				continue
			case 71:
				enterf(0);	// sendBTBOperands
				callf(42, $g[213], 18)
				continue
			case 72:
				callf(42, $g[141], 6)
				continue
			case 73:
				returnf(0)
				continue
			case 74:
				enterf(1);	// idExec
				if (!($g[27]==NO_STALL)) {
					$pc = 75
					continue
				}
				fork(38, $g[103])
				fork(36, $g[102])
				$pc = 75
			case 75:
				if (!($g[220]==1)) {
					$pc = 76
					continue
				}
				$g[102].setNewValue(STALL, 0, 0, 0)
				$g[220]=0
				$pc = 76
			case 76:
				if (!($g[29] && ($g[31]==BRANCH_PREDICTION))) {
					$pc = 77
					continue
				}
				fork(38, $g[84][$g[28]])
				fork(38, $g[85][$g[28]])
				$pc = 77
			case 77:
				if (wait(16))
				return
				$pc = 78
			case 78:
				fork(42, $g[101], 64)
				if (!(instrIsBranch($g[102].vIns))) {
					$pc = 84
					continue
				}
				fork(42, $g[124], 16)
				fork(42, $g[126], 16)
				fork(42, $g[125], 16)
				fork(42, $g[127], 16)
				fork(42, $g[147], 16)
				fork(42, $g[145], 16)
				if (wait(12))
				return
				$pc = 79
			case 79:
				$g[128].setTxt("%02X", $g[102].vRs2)
				$g[128].setOpacity(1)
				if (wait(4))
				return
				$pc = 80
			case 80:
				fork(42, $g[129], 8)
				fork(42, $g[131], 8)
				if (wait(2))
				return
				$pc = 81
			case 81:
				fork(42, $g[135], 8)
				$g[104][$g[102].vRs1].highlight($g[25])
				$g[150].setNewValue($g[104][$g[102].vRs1].value)
				$g[104][$g[102].vRdt].highlight($g[25])
				$g[151].setNewValue($g[104][$g[102].vRdt].value)
				fork(42, $g[144], 5)
				if (wait(4))
				return
				$pc = 82
			case 82:
				$g[138].setNewValue($g[103].value+$g[102].vRs2)
				callf(38, $g[138])
				continue
			case 83:
				$pc = 99
				continue
			case 84:
				if (!(isJorJAL($g[102].vIns))) {
					$pc = 93
					continue
				}
				if (!($g[102].vIns==JAL)) {
					$pc = 85
					continue
				}
				fork(42, $g[124], 16)
				fork(42, $g[126], 16)
				$pc = 85
			case 85:
				if (!($g[27]==NO_STALL)) {
					$pc = 90
					continue
				}
				fork(42, $g[125], 16)
				fork(42, $g[127], 16)
				if (wait(12))
				return
				$pc = 86
			case 86:
				$g[128].setTxt("%02X", $g[102].vRs2)
				$g[128].setOpacity(1)
				if (wait(4))
				return
				$pc = 87
			case 87:
				fork(42, $g[131], 8)
				if (wait(2))
				return
				$pc = 88
			case 88:
				callf(42, $g[132], 8)
				continue
			case 89:
				$pc = 92
				continue
			case 90:
				if (wait(24))
				return
				$pc = 91
			case 91:
				$pc = 92
			case 92:
				$pc = 98
				continue
			case 93:
				if (!($g[102].vIns==JALR)) {
					$pc = 95
					continue
				}
				fork(42, $g[124], 32)
				fork(42, $g[126], 32)
				if (wait(24))
				return
				$pc = 94
			case 94:
				$pc = 97
				continue
			case 95:
				if (wait(24))
				return
				$pc = 96
			case 96:
				$pc = 97
			case 97:
				$pc = 98
			case 98:
				$pc = 99
			case 99:
				if (wait(9))
				return
				$pc = 100
			case 100:
				if (!(instrIsJump($g[102].vIns) || instrIsBranch($g[149].vIns))) {
					$pc = 101
					continue
				}
				calcNewPC()
				$pc = 101
			case 101:
				if (!(instrIsJumpR($g[102].vIns) && ($g[27]==NO_STALL))) {
					$pc = 102
					continue
				}
				$g[143].setTxt("%02X", $g[215])
				$g[143].setOpacity(1, 8, 1, 0)
				$pc = 102
			case 102:
				if (!(instrIsBranchOrJump($g[102].vIns))) {
					$pc = 103
					continue
				}
				fork(71, $obj)
				$pc = 103
			case 103:
				detectStall()
				$g[219]=0
				if (!((instrIsJump($g[102].vIns) || instrIsBranch($g[149].vIns)) && ($g[27]!=DATA_STALL))) {
					$pc = 104
					continue
				}
				updBTB()
				$pc = 104
			case 104:
				if (!($g[239]==0)) {
					$pc = 108
					continue
				}
				if (!($g[27]==NO_STALL)) {
					$pc = 105
					continue
				}
				$g[149].setNewValue($g[102].vIns, $g[102].vRdt, $g[102].vRs1, $g[102].vRs2)
				$pc = 107
				continue
			case 105:
				if (!($g[220]==0 && $g[224]==0 && $g[237]==0)) {
					$pc = 106
					continue
				}
				$g[149].setNewValue(STALL, 0, 0, 0)
				$pc = 106
			case 106:
				$pc = 107
			case 107:
				$pc = 109
				continue
			case 108:
				$g[149].setNewValue($g[149].vIns, $g[149].vRdt, $g[149].vRs1, $g[149].vRs2)
				$g[173].setNewValue(STALL, 0, 0, 0)
				$pc = 109
			case 109:
				if (wait(7))
				return
				$pc = 110
			case 110:
				if (!(instrIsBranch($g[102].vIns)==0)) {
					$pc = 133
					continue
				}
				if (!(instrOpTypeRdt($g[102].vIns)==OP_TYPE_REG)) {
					$pc = 132
					continue
				}
				if (!(instrIsJumpAndLink($g[102].vIns))) {
					$pc = 117
					continue
				}
				if (!($g[27]==NO_STALL)) {
					$pc = 113
					continue
				}
				$g[150].setNewValue(0)
				$g[151].setNewValue(($g[103].value+4)&127)
				callf(42, $g[123], 18)
				continue
			case 111:
				callf(42, $g[144], 6)
				continue
			case 112:
				$pc = 116
				continue
			case 113:
				$g[150].setNewValue(0)
				$g[151].setNewValue(($g[103].value+$g[102].vRs2)&127)
				callf(42, $g[134], 18)
				continue
			case 114:
				callf(42, $g[144], 6)
				continue
			case 115:
				$pc = 116
			case 116:
				$pc = 131
				continue
			case 117:
				$g[104][$g[102].vRs1].highlight($g[25])
				if (!(instrIsAtomic($g[102].vIns))) {
					$pc = 118
					continue
				}
				$g[150].setNewValue($g[104][$g[102].vRs2].value)
				$pc = 119
				continue
			case 118:
				$g[150].setNewValue($g[104][$g[102].vRs1].value)
				$pc = 119
			case 119:
				if (!(instrOpTypeRs2($g[102].vIns)==OP_TYPE_REG)) {
					$pc = 124
					continue
				}
				$g[104][$g[102].vRs2].highlight($g[25])
				if (!($g[102].vIns==SC)) {
					$pc = 120
					continue
				}
				$g[151].setNewValue($g[104][$g[102].vRs1].value)
				$pc = 123
				continue
			case 120:
				if (!($g[102].vIns==LR)) {
					$pc = 121
					continue
				}
				$pc = 122
				continue
			case 121:
				$g[151].setNewValue($g[104][$g[102].vRs2].value)
				$pc = 122
			case 122:
				$pc = 123
			case 123:
				$pc = 125
				continue
			case 124:
				$g[104][$g[102].vRdt].highlight($g[25])
				$g[151].setNewValue($g[104][$g[102].vRdt].value)
				$pc = 125
			case 125:
				$g[148].setTxt("R%d:%02X", $g[102].vRs1, $g[104][$g[102].vRs1].value)
				$g[148].setOpacity(1)
				fork(42, $g[147], 5)
				if (!(instrIsBranch($g[102].vIns))) {
					$pc = 127
					continue
				}
				fork(42, $g[145], 5)
				callf(42, $g[144], 5)
				continue
			case 126:
				$pc = 127
			case 127:
				if (!((!instrIsArRI($g[102].vIns)) && ($g[102].vIns!=LD) && ($g[102].vIns!=LR))) {
					$pc = 130
					continue
				}
				$stack[$fp+1] = ($g[102].vIns==ST) ? $g[102].vRdt : $g[102].vRs2
				$g[146].setTxt("R%d:%02X", $stack[$fp+1], $g[104][$stack[$fp+1]].value)
				$g[146].setOpacity(1)
				callf(42, $g[145], 18)
				continue
			case 128:
				callf(42, $g[144], 6)
				continue
			case 129:
				$pc = 130
			case 130:
				$pc = 131
			case 131:
				$pc = 132
			case 132:
				$pc = 133
			case 133:
				returnf(0)
				continue
			case 134:
				enterf(9);	// exExec
				fork(36, $g[149])
				if (!(!instrIsNop($g[149].nIns))) {
					$pc = 135
					continue
				}
				fork(38, $g[150])
				fork(38, $g[151])
				$pc = 135
			case 135:
				if (wait(8))
				return
				$pc = 136
			case 136:
				$g[173].setNewValue($g[149].vIns, $g[149].vRdt, $g[149].vRs1, $g[149].vRs2)
				if (!(instrOpTypeRdt($g[149].vIns)==OP_TYPE_REG)) {
					$pc = 256
					continue
				}
				if (!(instrIsMulti($g[149].vIns))) {
					$pc = 146
					continue
				}
				if (!($g[149].vIns==MUL)) {
					$pc = 138
					continue
				}
				$g[224]=1
				if (!($g[221]==0)) {
					$pc = 137
					continue
				}
				$stack[$fp+1]=0
				$stack[$fp+2]=0
				$pc = 137
			case 137:
				$pc = 145
				continue
			case 138:
				if (!($g[221]==0)) {
					$pc = 144
					continue
				}
				$stack[$fp+2]=0
				if (!($g[222]==CHECK)) {
					$pc = 139
					continue
				}
				$stack[$fp+1]=$g[157]
				$stack[$fp+4]=$g[174].value
				$pc = 143
				continue
			case 139:
				if (!($g[222]==EXEC)) {
					$pc = 142
					continue
				}
				if (!($g[225]==0)) {
					$pc = 140
					continue
				}
				$stack[$fp+1]=$g[159]
				$stack[$fp+4]=$g[200].value
				$pc = 141
				continue
			case 140:
				$stack[$fp+1]=0
				$pc = 141
			case 141:
				$pc = 142
			case 142:
				$pc = 143
			case 143:
				$pc = 144
			case 144:
				$pc = 145
			case 145:
				$pc = 146
			case 146:
				if (!(instrIsJumpAndLink($g[149].vIns))) {
					$pc = 147
					continue
				}
				$stack[$fp+1]=0
				$stack[$fp+4]=0
				$pc = 172
				continue
			case 147:
				if (!($g[33]==ALU_FORWARDING)) {
					$pc = 163
					continue
				}
				if (!(!(instrIsMulti($g[149].vIns) && $g[221]==0))) {
					$pc = 162
					continue
				}
				if (!($g[149].vIns==SC)) {
					$pc = 156
					continue
				}
				if (!($g[235]==0)) {
					$pc = 154
					continue
				}
				$stack[$fp+4]=$g[177].value
				$g[178].setPen($g[115])
				if (!($g[239]==0)) {
					$pc = 152
					continue
				}
				if (!($g[174].tagMatches($g[149].vRs1))) {
					$pc = 148
					continue
				}
				$stack[$fp+1]=$g[157]
				$g[228]=$g[174].value
				$pc = 151
				continue
			case 148:
				if (!($g[200].tagMatches($g[149].vRs1))) {
					$pc = 149
					continue
				}
				$stack[$fp+1]=$g[159]
				$g[228]=$g[200].value
				$pc = 150
				continue
			case 149:
				$stack[$fp+1]=$g[160]
				$g[228]=$g[150].value
				$pc = 150
			case 150:
				$pc = 151
			case 151:
				$pc = 153
				continue
			case 152:
				$g[239]=0
				$pc = 153
			case 153:
				$pc = 155
				continue
			case 154:
				$stack[$fp+4]=$g[228]
				$stack[$fp+1]=0
				$stack[$fp+3]=0
				$pc = 155
			case 155:
				$pc = 161
				continue
			case 156:
				if (!($g[174].tagMatches($g[149].vRs1))) {
					$pc = 157
					continue
				}
				$stack[$fp+1]=$g[157]
				$stack[$fp+4]=$g[174].value
				$pc = 160
				continue
			case 157:
				if (!($g[200].tagMatches($g[149].vRs1))) {
					$pc = 158
					continue
				}
				$stack[$fp+1]=$g[159]
				$stack[$fp+4]=$g[200].value
				$pc = 159
				continue
			case 158:
				$stack[$fp+1]=$g[160]
				$stack[$fp+4]=$g[150].value
				$pc = 159
			case 159:
				$pc = 160
			case 160:
				$pc = 161
			case 161:
				$pc = 162
			case 162:
				$pc = 171
				continue
			case 163:
				if (!(!(instrIsMulti($g[149].vIns) && $g[221]==0))) {
					$pc = 170
					continue
				}
				if (!($g[149].vIns==SC)) {
					$pc = 168
					continue
				}
				if (!($g[235]==0)) {
					$pc = 166
					continue
				}
				$stack[$fp+4]=$g[177].value
				$g[178].setPen($g[115])
				if (!($g[239]==0)) {
					$pc = 164
					continue
				}
				$stack[$fp+1]=$g[160]
				$g[228]=$g[150].value
				$pc = 165
				continue
			case 164:
				$g[239]=0
				$pc = 165
			case 165:
				$pc = 167
				continue
			case 166:
				$stack[$fp+4]=$g[228]
				$stack[$fp+1]=0
				$stack[$fp+3]=0
				$pc = 167
			case 167:
				$pc = 169
				continue
			case 168:
				$stack[$fp+1]=$g[160]
				$stack[$fp+4]=$g[150].value
				$pc = 169
			case 169:
				$pc = 170
			case 170:
				$pc = 171
			case 171:
				$pc = 172
			case 172:
				if (!(instrIsJumpAndLink($g[149].vIns))) {
					$pc = 173
					continue
				}
				$stack[$fp+2]=$g[161]
				$stack[$fp+5]=$g[151].value
				$pc = 204
				continue
			case 173:
				if (!(instrOpTypeRs2($g[149].vIns)==OP_TYPE_IMM)) {
					$pc = 182
					continue
				}
				if (!(instrIsBranch($g[149].vIns))) {
					$pc = 180
					continue
				}
				if (!($g[33]==ALU_FORWARDING)) {
					$pc = 178
					continue
				}
				if (!($g[174].tagMatches($g[149].vRdt))) {
					$pc = 174
					continue
				}
				$stack[$fp+2]=$g[165]
				$stack[$fp+5]=$g[174].value
				$pc = 177
				continue
			case 174:
				if (!($g[200].tagMatches($g[149].vRdt))) {
					$pc = 175
					continue
				}
				$stack[$fp+2]=$g[164]
				$stack[$fp+5]=$g[200].value
				$pc = 176
				continue
			case 175:
				$stack[$fp+2]=$g[161]
				$stack[$fp+5]=$g[151].value
				$pc = 176
			case 176:
				$pc = 177
			case 177:
				$pc = 179
				continue
			case 178:
				$stack[$fp+2]=$g[161]
				$stack[$fp+5]=$g[151].value
				$pc = 179
			case 179:
				$pc = 181
				continue
			case 180:
				$stack[$fp+2]=$g[162]
				$stack[$fp+5]=$g[149].vRs2
				$pc = 181
			case 181:
				$pc = 203
				continue
			case 182:
				if (!($g[33]==ALU_FORWARDING)) {
					$pc = 194
					continue
				}
				if (!(!(instrIsMulti($g[149].vIns) && $g[221]==0))) {
					$pc = 193
					continue
				}
				if (!($g[149].vIns==SC)) {
					$pc = 185
					continue
				}
				$stack[$fp+2]=0
				if (!($g[235]==0)) {
					$pc = 183
					continue
				}
				$stack[$fp+5]=0
				$g[119].setPen($g[115])
				$pc = 184
				continue
			case 183:
				$stack[$fp+5]=0
				$pc = 184
			case 184:
				$pc = 192
				continue
			case 185:
				if (!($g[149].vIns!=LR)) {
					$pc = 190
					continue
				}
				if (!($g[174].tagMatches($g[149].vRs2))) {
					$pc = 186
					continue
				}
				$stack[$fp+2]=$g[165]
				$stack[$fp+5]=$g[174].value
				$pc = 189
				continue
			case 186:
				if (!($g[200].tagMatches($g[149].vRs2))) {
					$pc = 187
					continue
				}
				$stack[$fp+2]=$g[164]
				$stack[$fp+5]=$g[200].value
				$pc = 188
				continue
			case 187:
				$stack[$fp+2]=$g[161]
				$stack[$fp+5]=$g[151].value
				$pc = 188
			case 188:
				$pc = 189
			case 189:
				$pc = 191
				continue
			case 190:
				$stack[$fp+2]=0
				$stack[$fp+5]=0
				$g[119].setPen($g[115])
				$pc = 191
			case 191:
				$pc = 192
			case 192:
				$pc = 193
			case 193:
				$pc = 202
				continue
			case 194:
				if (!(!(instrIsMulti($g[149].vIns) && $g[221]==0))) {
					$pc = 201
					continue
				}
				if (!($g[149].vIns==SC)) {
					$pc = 197
					continue
				}
				if (!($g[235]==0)) {
					$pc = 195
					continue
				}
				$stack[$fp+5]=0
				$g[119].setPen($g[115])
				$pc = 196
				continue
			case 195:
				$stack[$fp+5]=0
				$pc = 196
			case 196:
				$pc = 200
				continue
			case 197:
				if (!($g[149].vIns!=LR)) {
					$pc = 198
					continue
				}
				$stack[$fp+2]=$g[161]
				$stack[$fp+5]=$g[151].value
				$pc = 199
				continue
			case 198:
				$stack[$fp+2]=0
				$stack[$fp+5]=0
				$pc = 199
			case 199:
				$pc = 200
			case 200:
				$pc = 201
			case 201:
				$pc = 202
			case 202:
				$pc = 203
			case 203:
				$pc = 204
			case 204:
				$stack[$fp+6] = 0
				if (!(instrIsMulti($g[149].vIns))) {
					$pc = 233
					continue
				}
				if (!($g[149].vIns==MUL)) {
					$pc = 212
					continue
				}
				if (!($g[221]==1)) {
					$pc = 207
					continue
				}
				$g[234]=""
				if (!(($stack[$fp+4]>7) || ($stack[$fp+5]>7))) {
					$pc = 205
					continue
				}
				$g[232]=0
				$g[226]=8
				$pc = 206
				continue
			case 205:
				$g[232]=1
				$g[226]=4
				$pc = 206
			case 206:
				$g[118].setPen($g[115])
				$g[228]=$stack[$fp+4]
				$g[229]=0
				$g[230]=$stack[$fp+5]
				$g[227]=0
				$stack[$fp+6]=$stack[$fp+4]
				$pc = 211
				continue
			case 207:
				if (!($g[232]==1)) {
					$pc = 208
					continue
				}
				booth()
				$stack[$fp+6]=$g[228]
				$pc = 209
				continue
			case 208:
				booth8()
				$stack[$fp+6]=$g[228]
				$pc = 209
			case 209:
				$g[226]--
				if (!($g[226]<=0)) {
					$pc = 210
					continue
				}
				$g[224]=0
				$pc = 210
			case 210:
				$pc = 211
			case 211:
				$pc = 232
				continue
			case 212:
				if (!($g[221]==1)) {
					$pc = 215
					continue
				}
				if (!(($stack[$fp+4]>15))) {
					$pc = 213
					continue
				}
				$g[232]=0
				$g[226]=16
				$pc = 214
				continue
			case 213:
				$g[232]=1
				$g[226]=8
				$pc = 214
			case 214:
				$g[118].setPen($g[115])
				$g[228]=$stack[$fp+4]
				$g[230]=0
				$g[229]=$stack[$fp+5]
				$stack[$fp+6]=$stack[$fp+4]
				$g[224]=1
				$g[222]=EXEC
				$pc = 231
				continue
			case 215:
				if (!($g[225]==0)) {
					$pc = 227
					continue
				}
				if (!($g[226]<=1)) {
					$pc = 216
					continue
				}
				$g[225]=1
				$pc = 216
			case 216:
				if (!($g[222]==CHECK)) {
					$pc = 225
					continue
				}
				$g[118].setPen($g[115])
				$stack[$fp+7] = 0
				if (!($g[232]==1)) {
					$pc = 219
					continue
				}
				$stack[$fp+7]=$g[230]&16
				$stack[$fp+7]=$stack[$fp+7]>>4
				if (!($stack[$fp+7]==1)) {
					$pc = 217
					continue
				}
				$g[228]=$g[228]|0
				$pc = 218
				continue
			case 217:
				$g[228]=$g[228]|1
				$pc = 218
			case 218:
				$pc = 222
				continue
			case 219:
				$stack[$fp+7]=$g[230]&128
				$stack[$fp+7]=$stack[$fp+7]>>7
				if (!($stack[$fp+7]==1)) {
					$pc = 220
					continue
				}
				$g[228]=$g[228]|0
				$pc = 221
				continue
			case 220:
				$g[228]=$g[228]|1
				$pc = 221
			case 221:
				$pc = 222
			case 222:
				$stack[$fp+8] = $g[228]&1
				$stack[$fp+6]=instrExecute(SGT, $stack[$fp+8], 0)
				$g[234]="OR + SGT"
				if (!($stack[$fp+6]==0)) {
					$pc = 223
					continue
				}
				$stack[$fp+1]=$g[157]
				$g[230]=$g[174].value
				$g[233]=1
				$pc = 224
				continue
			case 223:
				$stack[$fp+1]=0
				$g[233]=0
				$pc = 224
			case 224:
				$g[222]=EXEC
				$g[226]--
				$pc = 226
				continue
			case 225:
				$g[234]="SLL + SUB"
				$stack[$fp+6]=restoreDiv()
				$g[222]=CHECK
				$g[226]--
				$g[233]=0
				$stack[$fp+1]=0
				$pc = 226
			case 226:
				$pc = 230
				continue
			case 227:
				if (!($g[149].vIns==DIV)) {
					$pc = 228
					continue
				}
				$stack[$fp+6]=$g[228]
				$pc = 229
				continue
			case 228:
				$stack[$fp+6]=$g[230]
				$pc = 229
			case 229:
				$g[234]=""
				$g[224]=0
				$pc = 230
			case 230:
				$pc = 231
			case 231:
				$pc = 232
			case 232:
				$pc = 240
				continue
			case 233:
				if (!($g[149].vIns==SC)) {
					$pc = 238
					continue
				}
				if (!($g[235]==0)) {
					$pc = 236
					continue
				}
				$stack[$fp+6]=instrExecute(SLE, $stack[$fp+4], $stack[$fp+5])
				if (!($stack[$fp+6]==0)) {
					$pc = 234
					continue
				}
				$g[235]=1
				$g[236]=1
				$g[237]=1
				$pc = 235
				continue
			case 234:
				$g[236]=0
				$g[237]=0
				$pc = 235
			case 235:
				$pc = 237
				continue
			case 236:
				$stack[$fp+6]=$stack[$fp+4]
				$g[235]=0
				$g[236]=1
				$g[237]=0
				$pc = 237
			case 237:
				$pc = 239
				continue
			case 238:
				$stack[$fp+6]=instrExecute($g[149].vIns, $stack[$fp+4], $stack[$fp+5])
				$pc = 239
			case 239:
				$pc = 240
			case 240:
				if (!(($g[149].vRdt==0)&(instrIsBranch($g[149].vIns)==0))) {
					$pc = 241
					continue
				}
				$stack[$fp+6]=0
				$pc = 241
			case 241:
				if (!(instrIsBranch($g[149].vIns)==0)) {
					$pc = 243
					continue
				}
				$g[174].setNewValue($stack[$fp+6])
				$g[219]=0
				if (!($g[149].vIns==LR)) {
					$pc = 242
					continue
				}
				$g[176].setNewValue($stack[$fp+6])
				$pc = 242
			case 242:
				$pc = 244
				continue
			case 243:
				$g[174].setNewValue($stack[$fp+6])
				$g[219]=$stack[$fp+6]
				$pc = 244
			case 244:
				if (!(instrIsLoadOrStore($g[149].vIns))) {
					$pc = 246
					continue
				}
				if (!(($g[149].vIns!=SC) && ($g[236]==0))) {
					$pc = 245
					continue
				}
				$g[174].setNewTag(-1)
				$pc = 245
			case 245:
				$pc = 255
				continue
			case 246:
				if (!(($g[149].vIns==DIV || $g[149].vIns==REM) && $g[221]==0)) {
					$pc = 251
					continue
				}
				if (!($g[222]==EXEC)) {
					$pc = 249
					continue
				}
				if (!($g[225]==0 && ($g[149].vIns==DIV || $g[149].vIns==REM))) {
					$pc = 247
					continue
				}
				$g[174].setNewTag(0)
				$pc = 248
				continue
			case 247:
				$g[174].setNewTag($g[149].vRdt)
				$pc = 248
			case 248:
				$pc = 250
				continue
			case 249:
				$g[174].setNewTag($g[149].vRdt)
				$pc = 250
			case 250:
				$pc = 254
				continue
			case 251:
				if (!(instrIsBranch($g[149].vIns))) {
					$pc = 252
					continue
				}
				$g[174].setNewTag(-1)
				$pc = 253
				continue
			case 252:
				$g[174].setNewTag($g[149].vRdt)
				$pc = 253
			case 253:
				$pc = 254
			case 254:
				$pc = 255
			case 255:
				$g[174].setInvalid(0)
				$pc = 258
				continue
			case 256:
				if (!($g[149].vIns==NOP)) {
					$pc = 257
					continue
				}
				$g[174].setInvalid(1)
				$g[174].updateLabel()
				$pc = 257
			case 257:
				$pc = 258
			case 258:
				if (!(($g[149].vIns==ST) || ($g[149].vIns==SC))) {
					$pc = 267
					continue
				}
				if (!(($g[149].vIns==SC) && ($g[235]==0) && ($g[237]==1))) {
					$pc = 259
					continue
				}
				$pc = 266
				continue
			case 259:
				if (!($g[34]==FORWARDING_TO_SMDR)) {
					$pc = 264
					continue
				}
				if (!($g[174].tagMatches($g[149].vRdt))) {
					$pc = 260
					continue
				}
				$stack[$fp+3]=$g[166]
				$g[175].setNewValue($g[174].value)
				$pc = 263
				continue
			case 260:
				if (!($g[200].tagMatches($g[149].vRdt))) {
					$pc = 261
					continue
				}
				$stack[$fp+3]=$g[167]
				$g[175].setNewValue($g[200].value)
				$pc = 262
				continue
			case 261:
				$stack[$fp+3]=$g[168]
				$g[175].setNewValue($g[151].value)
				$pc = 262
			case 262:
				$pc = 263
			case 263:
				$pc = 265
				continue
			case 264:
				$stack[$fp+3]=$g[168]
				$g[175].setNewValue($g[151].value)
				$pc = 265
			case 265:
				$pc = 266
			case 266:
				$pc = 267
			case 267:
				if (wait(8))
				return
				$pc = 268
			case 268:
				fork(42, $g[156], 64)
				if (!(($g[149].vIns==ST) || ($g[149].vIns==SC))) {
					$pc = 270
					continue
				}
				if (!($stack[$fp+3]!=0)) {
					$pc = 269
					continue
				}
				fork(42, $stack[$fp+3], 24)
				$pc = 269
			case 269:
				$pc = 270
			case 270:
				if (!(instrOpTypeRdt($g[149].vIns)==OP_TYPE_REG)) {
					$pc = 277
					continue
				}
				if (!($stack[$fp+1]!=0)) {
					$pc = 274
					continue
				}
				if (!(($g[149].vIns!=DIV) && ($g[149].vIns!=REM))) {
					$pc = 271
					continue
				}
				fork(42, $stack[$fp+1], 24)
				$pc = 273
				continue
			case 271:
				if (!($g[221]==1)) {
					$pc = 272
					continue
				}
				fork(42, $stack[$fp+1], 24)
				$pc = 272
			case 272:
				$pc = 273
			case 273:
				$pc = 274
			case 274:
				if (!($stack[$fp+2]==$g[162])) {
					$pc = 275
					continue
				}
				$g[163].setTxt("%02X", $stack[$fp+5])
				$g[163].setOpacity(1)
				$pc = 275
			case 275:
				if (!($stack[$fp+2]!=0)) {
					$pc = 276
					continue
				}
				fork(42, $stack[$fp+2], 24)
				$pc = 276
			case 276:
				$pc = 277
			case 277:
				if (wait(24))
				return
				$pc = 278
			case 278:
				if (!(($g[149].vIns==ST) || ($g[149].vIns==SC))) {
					$pc = 280
					continue
				}
				if (!($stack[$fp+3]!=0)) {
					$pc = 279
					continue
				}
				fork(42, $g[169], 40)
				$pc = 279
			case 279:
				$pc = 280
			case 280:
				if (!($g[149].vIns==LR)) {
					$pc = 282
					continue
				}
				callf(42, $g[179], 5)
				continue
			case 281:
				$g[177].setNewValue(1)
				fork(38, $g[177])
				$pc = 282
			case 282:
				if (!(instrOpTypeRdt($g[149].vIns)==OP_TYPE_REG)) {
					$pc = 316
					continue
				}
				if (!($g[149].vIns==MUL)) {
					$pc = 285
					continue
				}
				if (!($g[234]!="SRA" && $g[234]!="")) {
					$pc = 283
					continue
				}
				$g[155].expand()
				$pc = 283
			case 283:
				if (!($g[234]!="")) {
					$pc = 284
					continue
				}
				$g[155].setTxtOpStr($g[234])
				$g[155].txtOp.setOpacity(1)
				$pc = 284
			case 284:
				$pc = 292
				continue
			case 285:
				if (!($g[149].vIns==DIV|$g[149].vIns==REM)) {
					$pc = 287
					continue
				}
				if (!($g[234]!="")) {
					$pc = 286
					continue
				}
				$g[155].expand()
				$g[155].setTxtOpStr($g[234])
				$pc = 286
			case 286:
				$pc = 291
				continue
			case 287:
				if (!($g[149].vIns==SC)) {
					$pc = 289
					continue
				}
				if (!(($g[236]==1 && $g[235]==1) || ($g[236]==0 && $g[235]==0))) {
					$pc = 288
					continue
				}
				$g[155].setTxtOp(SLE)
				$pc = 288
			case 288:
				$pc = 290
				continue
			case 289:
				$g[155].setTxtOp($g[149].vIns)
				$pc = 290
			case 290:
				$pc = 291
			case 291:
				$pc = 292
			case 292:
				if (!($stack[$fp+1]!=0)) {
					$pc = 296
					continue
				}
				if (!(($g[149].vIns!=DIV) && ($g[149].vIns!=REM))) {
					$pc = 293
					continue
				}
				fork(42, $g[170], 10)
				$pc = 295
				continue
			case 293:
				if (!($g[221]==1)) {
					$pc = 294
					continue
				}
				fork(42, $g[170], 10)
				$pc = 294
			case 294:
				$pc = 295
			case 295:
				$pc = 296
			case 296:
				if (!($stack[$fp+2]!=0)) {
					$pc = 297
					continue
				}
				fork(42, $g[171], 10)
				$pc = 297
			case 297:
				if (!(instrIsBranch($g[149].vIns))) {
					$pc = 300
					continue
				}
				if (wait(5))
				return
				$pc = 298
			case 298:
				if (!($g[219]==1)) {
					$pc = 299
					continue
				}
				$g[121].setPen($g[115])
				$pc = 299
			case 299:
				$pc = 300
			case 300:
				if (!((($g[149].vIns==DIV) || ($g[149].vIns==REM)) && ($g[221]==1))) {
					$pc = 301
					continue
				}
				$pc = 301
			case 301:
				if (wait(15))
				return
				$pc = 302
			case 302:
				if (!((($g[149].vIns==DIV) || ($g[149].vIns==REM)) && ($g[221]==0))) {
					$pc = 308
					continue
				}
				if (!($stack[$fp+1]!=0)) {
					$pc = 305
					continue
				}
				callf(42, $g[172], 5)
				continue
			case 303:
				callf(42, $stack[$fp+1], 5)
				continue
			case 304:
				fork(42, $g[170], 5)
				$pc = 307
				continue
			case 305:
				callf(42, $g[172], 10)
				continue
			case 306:
				$pc = 307
			case 307:
				$pc = 310
				continue
			case 308:
				callf(42, $g[172], 10)
				continue
			case 309:
				$pc = 310
			case 310:
				if (!(instrIsMulti($g[149].vIns) && $g[221]==1)) {
					$pc = 311
					continue
				}
				$g[221]=0
				$pc = 311
			case 311:
				if (!($g[149].vIns==LR)) {
					$pc = 312
					continue
				}
				fork(42, $g[158], 10)
				$pc = 312
			case 312:
				if (wait(10))
				return
				$pc = 313
			case 313:
				if (!($g[149].vIns==LR)) {
					$pc = 315
					continue
				}
				callf(38, $g[176])
				continue
			case 314:
				$pc = 315
			case 315:
				$g[155].txtResult.setTxt("%02X", $stack[$fp+6])
				$g[155].txtResult.setOpacity(1, 20, 1, 0)
				$pc = 316
			case 316:
				if (!($g[37]==0)) {
					$pc = 325
					continue
				}
				if (!($g[149].vIns==JAL)) {
					$pc = 317
					continue
				}
				$stack[$fp+9] = $g[184].spAddr
				$g[184].currFrame++
				$g[184].frames[$g[184].currFrame-1].setStart($stack[$fp+9])
				$g[184].setSP($stack[$fp+9])
				$pc = 317
			case 317:
				if (!($g[149].vIns==JALR)) {
					$pc = 318
					continue
				}
				$g[184].clearFrame()
				$pc = 318
			case 318:
				if (!((instrOpTypeRdt($g[149].vIns)==OP_TYPE_REG) && (instrIsLoadOrStore($g[149].vIns)==0))) {
					$pc = 324
					continue
				}
				if (!(($g[149].vRdt==2 && $g[173].vRdt==8) && $g[173].vIns==LD)) {
					$pc = 319
					continue
				}
				$g[218]=1
				$pc = 323
				continue
			case 319:
				if (!($g[149].vRdt==2)) {
					$pc = 320
					continue
				}
				$g[184].setSP($stack[$fp+6])
				$pc = 322
				continue
			case 320:
				if (!($g[149].vRdt==8)) {
					$pc = 321
					continue
				}
				$g[184].setFP($stack[$fp+6])
				$pc = 321
			case 321:
				$pc = 322
			case 322:
				$pc = 323
			case 323:
				$pc = 324
			case 324:
				$pc = 325
			case 325:
				returnf(0)
				continue
			case 326:
				enterf(1);	// maExec
				fork(36, $g[173])
				if (!(instrOpTypeRdt($g[173].nIns)==OP_TYPE_REG)) {
					$pc = 327
					continue
				}
				fork(38, $g[174])
				$pc = 327
			case 327:
				if (!(($g[173].nIns==ST) || ($g[173].nIns==SC))) {
					$pc = 328
					continue
				}
				fork(38, $g[175])
				$pc = 328
			case 328:
				if (wait(8))
				return
				$pc = 329
			case 329:
				$g[199].setNewValue($g[173].vIns, $g[173].vRdt, $g[173].vRs1, $g[173].vRs2)
				if (!((instrOpTypeRdt($g[173].vIns)==OP_TYPE_REG) && ($g[173].vIns!=ST) && ($g[173].vIns!=SC))) {
					$pc = 333
					continue
				}
				if (!(($g[173].vIns==LD) || ($g[173].vIns==LR))) {
					$pc = 331
					continue
				}
				if (!($g[37]==0)) {
					$pc = 330
					continue
				}
				$g[200].setNewValue($g[184].getVal($g[174].value))
				$pc = 330
			case 330:
				$g[200].setNewTag($g[173].vRdt)
				$pc = 332
				continue
			case 331:
				$g[200].setNewValue($g[174].value)
				$g[200].setNewTag($g[174].tag)
				$pc = 332
			case 332:
				$g[200].setInvalid(0)
				$pc = 333
			case 333:
				if (wait(8))
				return
				$pc = 334
			case 334:
				fork(42, $g[192], 64)
				if (!(($g[173].vIns==ST) || ($g[173].vIns==SC))) {
					$pc = 352
					continue
				}
				if (!(($g[173].vIns==SC) && ($g[149].vIns==SC))) {
					$pc = 335
					continue
				}
				$pc = 338
				continue
			case 335:
				if (!(($g[236]==1 && $g[173].vIns==SC) || $g[173].vIns==ST)) {
					$pc = 337
					continue
				}
				fork(42, $g[196], 10)
				callf(42, $g[195], 10)
				continue
			case 336:
				$pc = 337
			case 337:
				$pc = 338
			case 338:
				if (!(($g[173].vIns==SC) && ($g[149].vIns==SC))) {
					$pc = 343
					continue
				}
				if (!($g[37]==1 && $g[236]==1)) {
					$pc = 339
					continue
				}
				pollBus($g[173].vIns, $g[174].value, $g[175].value)
				$pc = 342
				continue
			case 339:
				if (!($g[37]==0)) {
					$pc = 341
					continue
				}
				callf(514, $obj)
				continue
			case 340:
				$pc = 341
			case 341:
				$pc = 342
			case 342:
				$pc = 351
				continue
			case 343:
				if (!(($g[236]==1 && $g[173].vIns==SC) || $g[173].vIns==ST)) {
					$pc = 350
					continue
				}
				if (!($g[37]==0)) {
					$pc = 345
					continue
				}
				callf(40, $g[184], $g[174].value, $g[175].value)
				continue
			case 344:
				$pc = 349
				continue
			case 345:
				if (!($g[173].vIns==ST)) {
					$pc = 346
					continue
				}
				sendToMem($g[36].toString(), ", ", $g[173].vIns.toString(), ", ", $g[174].value.toString(), ", ", $g[175].value.toString())
				$pc = 348
				continue
			case 346:
				callf(511, $obj, $g[173].vIns, $g[174].value, $g[175].value)
				continue
			case 347:
				$pc = 348
			case 348:
				$pc = 349
			case 349:
				$pc = 350
			case 350:
				$pc = 351
			case 351:
				$pc = 370
				continue
			case 352:
				if (!(instrOpTypeRdt($g[173].vIns)==OP_TYPE_REG)) {
					$pc = 369
					continue
				}
				if (!(($g[173].vIns==LD) || ($g[173].vIns==LR))) {
					$pc = 360
					continue
				}
				callf(42, $g[195], 24)
				continue
			case 353:
				if (!($g[37]==0)) {
					$pc = 358
					continue
				}
				callf(42, $g[197], 24)
				continue
			case 354:
				$g[184].highlight($g[174].value%MEMORY_ADDRESSES)
				if (!($g[173].vRdt==8)) {
					$pc = 355
					continue
				}
				$g[184].setFP($g[184].getVal($g[174].value))
				$pc = 357
				continue
			case 355:
				if (!($g[173].vRdt==2)) {
					$pc = 356
					continue
				}
				$g[184].setSP($g[184].getVal($g[174].value))
				$pc = 356
			case 356:
				$pc = 357
			case 357:
				$pc = 359
				continue
			case 358:
				$stack[$fp+1] = $g[36].toString()
				sendToMem($stack[$fp+1], ", ", $g[173].vIns.toString(), ", ", $g[174].value.toString(), ", ", $g[175].value.toString())
				$pc = 359
			case 359:
				$pc = 367
				continue
			case 360:
				callf(42, $g[193], 48)
				continue
			case 361:
				if (!($g[37]==0)) {
					$pc = 366
					continue
				}
				if (!($g[218]==1)) {
					$pc = 365
					continue
				}
				if (!($g[173].vRdt==2)) {
					$pc = 362
					continue
				}
				$g[184].setSP($g[174].value)
				$pc = 364
				continue
			case 362:
				if (!($g[173].vRdt==8)) {
					$pc = 363
					continue
				}
				$g[184].setFP($g[174].value)
				$pc = 363
			case 363:
				$pc = 364
			case 364:
				$g[218]=0
				$pc = 365
			case 365:
				$pc = 366
			case 366:
				$pc = 367
			case 367:
				callf(42, $g[194], 16)
				continue
			case 368:
				$pc = 369
			case 369:
				$pc = 370
			case 370:
				returnf(0)
				continue
			case 371:
				enterf(0);	// wbExec
				fork(36, $g[199])
				if (!((instrOpTypeRdt($g[199].nIns)==OP_TYPE_REG) && ($g[199].nIns!=ST))) {
					$pc = 372
					continue
				}
				fork(38, $g[200])
				$pc = 372
			case 372:
				if (wait(8))
				return
				$pc = 373
			case 373:
				if (!((instrOpTypeRdt($g[199].vIns)==OP_TYPE_REG) && ($g[199].vIns!=ST))) {
					$pc = 379
					continue
				}
				if (!($g[200].tag!=0)) {
					$pc = 374
					continue
				}
				$g[104][$g[200].tag].setNewValue($g[200].value)
				$pc = 374
			case 374:
				if (wait(8))
				return
				$pc = 375
			case 375:
				callf(42, $g[201], 24)
				continue
			case 376:
				callf(38, $g[104][$g[200].tag])
				continue
			case 377:
				if (wait(19))
				return
				$pc = 378
			case 378:
				$pc = 381
				continue
			case 379:
				if (wait(67))
				return
				$pc = 380
			case 380:
				$pc = 381
			case 381:
				if (!($g[199].vIns!=STALL && $g[199].vIns!=EMPTY)) {
					$pc = 382
					continue
				}
				$g[39]++
				$g[77].setTxt("%4d", $g[39])
				$pc = 382
			case 382:
				$g[40]++
				$g[78].setTxt("%4d", $g[40])
				returnf(0)
				continue
			case 383:
				enterf(0);	// nonPipelinedBranch
				if (!(instrIsBranch($g[102].vIns))) {
					$pc = 390
					continue
				}
				callf(42, $g[99], 12)
				continue
			case 384:
				fork(42, $g[124], 16)
				fork(42, $g[126], 16)
				fork(42, $g[125], 16)
				fork(42, $g[127], 16)
				if (wait(12))
				return
				$pc = 385
			case 385:
				$g[128].setTxt("%02X", $g[102].vRs2)
				$g[128].setOpacity(1)
				if (wait(4))
				return
				$pc = 386
			case 386:
				fork(42, $g[129], 8)
				fork(42, $g[131], 8)
				if (wait(2))
				return
				$pc = 387
			case 387:
				fork(42, $g[135], 8)
				if (wait(4))
				return
				$pc = 388
			case 388:
				$g[138].setNewValue($g[103].value+$g[102].vRs2)
				callf(38, $g[138])
				continue
			case 389:
				$pc = 403
				continue
			case 390:
				fork(42, $g[126], 24)
				fork(42, $g[127], 24)
				callf(42, $g[99], 12)
				continue
			case 391:
				fork(42, $g[124], 12)
				fork(42, $g[125], 12)
				if (wait(12))
				return
				$pc = 392
			case 392:
				if (!(instrIsJumpR($g[102].vIns))) {
					$pc = 394
					continue
				}
				$g[82].setNewValue(($g[104][$g[102].vRs2].value)&127)
				callf(42, $g[94], 34)
				continue
			case 393:
				$pc = 402
				continue
			case 394:
				if (!(isJorJAL($g[102].vIns))) {
					$pc = 398
					continue
				}
				$g[82].setNewValue(($g[82].value+$g[102].vRs2)&127)
				callf(42, $g[131], 10)
				continue
			case 395:
				callf(42, $g[132], 10)
				continue
			case 396:
				callf(42, $g[92], 14)
				continue
			case 397:
				$pc = 401
				continue
			case 398:
				$g[82].setNewValue(($g[82].value+4)&127)
				callf(42, $g[129], 20)
				continue
			case 399:
				callf(42, $g[92], 14)
				continue
			case 400:
				$pc = 401
			case 401:
				$pc = 402
			case 402:
				$pc = 403
			case 403:
				callf(42, $g[96], 6)
				continue
			case 404:
				returnf(0)
				continue
			case 405:
				enterf(5);	// execNonPipelined
				callf(38, $g[82])
				continue
			case 406:
				$g[80].setActive($g[82].newValue)
				callf(42, $g[91], 24)
				continue
			case 407:
				callf(42, $g[89], 40)
				continue
			case 408:
				$g[102].setNewInstruction($g[80].instruction[$g[82].value/4])
				$g[90].setTxt($g[102].getNewInstrTxt())
				$g[90].translate(60/2+70, 0, 20, 1, 0)
				callf(36, $g[102])
				continue
			case 409:
				if (!((instrOpTypeRs2($g[102].vIns)==OP_TYPE_IMM) && (instrOpTypeRdt($g[102].vIns)==OP_TYPE_REG))) {
					$pc = 410
					continue
				}
				fork(42, $g[101], 64)
				$pc = 410
			case 410:
				fork(383, $obj)
				if (wait(24))
				return
				$pc = 411
			case 411:
				if (!(instrIsJumpAndLink($g[102].vIns))) {
					$pc = 414
					continue
				}
				callf(42, $g[123], 20)
				continue
			case 412:
				callf(42, $g[144], 20)
				continue
			case 413:
				$stack[$fp+1]=0
				$stack[$fp+2]=($g[82].value+4)&127
				$pc = 436
				continue
			case 414:
				if (!(instrIsBranch($g[102].vIns))) {
					$pc = 417
					continue
				}
				fork(42, $g[147], 40)
				callf(42, $g[145], 20)
				continue
			case 415:
				callf(42, $g[144], 20)
				continue
			case 416:
				$g[104][$g[102].vRs1].highlight($g[25])
				$stack[$fp+1]=$g[104][$g[102].vRs1].value
				$g[104][$g[102].vRdt].highlight($g[25])
				$stack[$fp+2]=$g[104][$g[102].vRdt].value
				$pc = 435
				continue
			case 417:
				if (!(instrOpTypeRdt($g[102].vIns)==OP_TYPE_REG)) {
					$pc = 432
					continue
				}
				if (!(instrIsAtomic($g[102].vIns))) {
					$pc = 418
					continue
				}
				$stack[$fp+1]=$g[104][$g[102].vRs2].value
				$g[148].setTxt("R%d:%02X", $g[102].vRs2, $g[104][$g[102].vRs2].value)
				$pc = 419
				continue
			case 418:
				$stack[$fp+1]=$g[104][$g[102].vRs1].value
				$g[148].setTxt("R%d:%02X", $g[102].vRs1, $g[104][$g[102].vRs1].value)
				$pc = 419
			case 419:
				$g[148].setOpacity(1)
				fork(42, $g[147], 40)
				if (!((instrOpTypeRs2($g[102].vIns)==OP_TYPE_REG) || ($g[102].vIns==ST))) {
					$pc = 429
					continue
				}
				if (!(instrOpTypeRs2($g[102].vIns)==OP_TYPE_IMM)) {
					$pc = 420
					continue
				}
				$stack[$fp+2]=$g[104][$g[102].vRdt].value
				$g[104][$g[102].vRdt].highlight($g[25])
				$pc = 425
				continue
			case 420:
				if (!($g[102].vIns==SC)) {
					$pc = 421
					continue
				}
				$stack[$fp+2]=$g[104][$g[102].vRs1].value
				$g[104][$g[102].vRs1].highlight($g[25])
				$g[146].setTxt("R%d:%02X", $g[102].vRs1, $g[104][$g[102].vRs1].value)
				$pc = 424
				continue
			case 421:
				if (!($g[102].vIns==LR)) {
					$pc = 422
					continue
				}
				$pc = 423
				continue
			case 422:
				$stack[$fp+2]=$g[104][$g[102].vRs2].value
				$g[104][$g[102].vRs2].highlight($g[25])
				$pc = 423
			case 423:
				$pc = 424
			case 424:
				$pc = 425
			case 425:
				if (!((!instrIsArRI($g[102].vIns)) && ($g[102].vIns!=LD) && ($g[102].vIns!=LR))) {
					$pc = 428
					continue
				}
				$stack[$fp+5] = ($g[102].vIns==ST) ? $g[102].vRdt : $g[102].vRs2
				$g[146].setTxt("R%d:%02X", $stack[$fp+5], $g[104][$stack[$fp+5]].value)
				$g[146].setOpacity(1)
				callf(42, $g[145], 20)
				continue
			case 426:
				callf(42, $g[144], 20)
				continue
			case 427:
				$pc = 428
			case 428:
				$pc = 431
				continue
			case 429:
				if (wait(40))
				return
				$pc = 430
			case 430:
				$pc = 431
			case 431:
				$pc = 434
				continue
			case 432:
				if (wait(40))
				return
				$pc = 433
			case 433:
				$pc = 434
			case 434:
				$pc = 435
			case 435:
				$pc = 436
			case 436:
				if (!(instrOpTypeRdt($g[102].vIns)==OP_TYPE_REG)) {
					$pc = 437
					continue
				}
				$g[155].setTxtOp($g[102].vIns)
				$pc = 437
			case 437:
				if (!($g[102].vIns==ST || $g[102].vIns==SC)) {
					$pc = 448
					continue
				}
				fork(42, $g[168], 40)
				fork(42, $g[160], 40)
				if (!($g[102].vIns==ST)) {
					$pc = 439
					continue
				}
				$g[163].setTxt("%02X", $g[102].vRs2)
				$g[163].setOpacity(1)
				callf(42, $g[162], 40)
				continue
			case 438:
				$pc = 443
				continue
			case 439:
				if (wait(40))
				return
				$pc = 440
			case 440:
				callf(42, $g[160], 10)
				continue
			case 441:
				if (wait(10))
				return
				$pc = 442
			case 442:
				$pc = 443
			case 443:
				fork(42, $g[169], 40)
				if (!($g[102].vIns==ST)) {
					$pc = 444
					continue
				}
				fork(42, $g[171], 10)
				$pc = 444
			case 444:
				callf(42, $g[170], 10)
				continue
			case 445:
				if (wait(20))
				return
				$pc = 446
			case 446:
				callf(42, $g[172], 10)
				continue
			case 447:
				$stack[$fp+4]=$stack[$fp+2]
				$stack[$fp+3]=instrExecute(ADD, $stack[$fp+1], 0)
				$pc = 481
				continue
			case 448:
				if (!(instrIsJumpAndLink($g[102].vIns))) {
					$pc = 453
					continue
				}
				callf(42, $g[161], 40)
				continue
			case 449:
				callf(42, $g[171], 10)
				continue
			case 450:
				$stack[$fp+3]=instrExecute($g[102].vIns, $stack[$fp+1], $stack[$fp+2])
				if (wait(20))
				return
				$pc = 451
			case 451:
				callf(42, $g[172], 10)
				continue
			case 452:
				$pc = 480
				continue
			case 453:
				if (!(instrOpTypeRdt($g[102].vIns)==OP_TYPE_REG)) {
					$pc = 477
					continue
				}
				if (!($g[102].vIns!=LR)) {
					$pc = 454
					continue
				}
				fork(42, $g[160], 40)
				$pc = 454
			case 454:
				if (!(instrIsBranch($g[102].vIns))) {
					$pc = 456
					continue
				}
				callf(42, $g[161], 40)
				continue
			case 455:
				$stack[$fp+3]=instrExecute($g[102].vIns, $stack[$fp+1], $stack[$fp+2])
				$pc = 466
				continue
			case 456:
				if (!(instrOpTypeRs2($g[102].vIns)==OP_TYPE_IMM)) {
					$pc = 458
					continue
				}
				$g[163].setTxt("%02X", $g[102].vRs2)
				$g[163].setOpacity(1)
				callf(42, $g[162], 40)
				continue
			case 457:
				$stack[$fp+3]=instrExecute($g[102].vIns, $stack[$fp+1], $g[102].vRs2)
				$pc = 465
				continue
			case 458:
				if (!($g[102].vIns!=LR)) {
					$pc = 460
					continue
				}
				callf(42, $g[161], 40)
				continue
			case 459:
				$pc = 460
			case 460:
				if (!($g[102].vIns==MUL)) {
					$pc = 461
					continue
				}
				$stack[$fp+3]=instrExecute(ADD, $stack[$fp+1], $stack[$fp+2])
				$pc = 464
				continue
			case 461:
				if (!($g[102].vIns==REM || $g[102]==DIV)) {
					$pc = 462
					continue
				}
				$stack[$fp+3]=instrExecute(SUB, $stack[$fp+1], $stack[$fp+2])
				$pc = 463
				continue
			case 462:
				$stack[$fp+3]=instrExecute($g[102].vIns, $stack[$fp+1], $stack[$fp+2])
				$pc = 463
			case 463:
				$pc = 464
			case 464:
				$pc = 465
			case 465:
				$pc = 466
			case 466:
				if (!(instrIsAtomic($g[102].vIns)==0)) {
					$pc = 467
					continue
				}
				fork(42, $g[171], 10)
				$pc = 471
				continue
			case 467:
				if (wait(40))
				return
				$pc = 468
			case 468:
				callf(42, $g[160], 10)
				continue
			case 469:
				if (wait(10))
				return
				$pc = 470
			case 470:
				$pc = 471
			case 471:
				callf(42, $g[170], 10)
				continue
			case 472:
				if (!(instrIsBranch($g[102].vIns) && $stack[$fp+3]==1)) {
					$pc = 474
					continue
				}
				if (wait(5))
				return
				$pc = 473
			case 473:
				$g[121].setPen($g[115])
				$pc = 474
			case 474:
				if (wait(20))
				return
				$pc = 475
			case 475:
				callf(42, $g[172], 10)
				continue
			case 476:
				$pc = 479
				continue
			case 477:
				if (wait(80))
				return
				$pc = 478
			case 478:
				$pc = 479
			case 479:
				$pc = 480
			case 480:
				$pc = 481
			case 481:
				if (!($g[102].vIns==LD || $g[102].vIns==LR)) {
					$pc = 485
					continue
				}
				callf(42, $g[195], 20)
				continue
			case 482:
				callf(42, $g[197], 20)
				continue
			case 483:
				callf(42, $g[194], 40)
				continue
			case 484:
				$stack[$fp+3]=$g[184].getVal($stack[$fp+3])
				$pc = 495
				continue
			case 485:
				if (!($g[102].vIns==ST || $g[102].vIns==SC)) {
					$pc = 488
					continue
				}
				fork(42, $g[196], 20)
				callf(42, $g[195], 20)
				continue
			case 486:
				callf(40, $g[184], $stack[$fp+3], $stack[$fp+4])
				continue
			case 487:
				$pc = 494
				continue
			case 488:
				if (!(instrOpTypeRdt($g[102].vIns)==OP_TYPE_REG)) {
					$pc = 491
					continue
				}
				callf(42, $g[193], 40)
				continue
			case 489:
				callf(42, $g[194], 40)
				continue
			case 490:
				$pc = 493
				continue
			case 491:
				if (wait(80))
				return
				$pc = 492
			case 492:
				$pc = 493
			case 493:
				$pc = 494
			case 494:
				$pc = 495
			case 495:
				$g[104][0].unHighlight()
				$g[104][1].unHighlight()
				$g[104][2].unHighlight()
				$g[104][3].unHighlight()
				if (!((instrOpTypeRdt($g[102].vIns)==OP_TYPE_REG) && ($g[102].vIns!=ST) && ($g[102].vIns!=SC))) {
					$pc = 499
					continue
				}
				callf(42, $g[201], 40)
				continue
			case 496:
				$g[104][$g[102].vRdt].setNewValue($stack[$fp+3])
				callf(38, $g[104][$g[102].vRdt])
				continue
			case 497:
				if (wait(19))
				return
				$pc = 498
			case 498:
				$pc = 501
				continue
			case 499:
				if (wait(75))
				return
				$pc = 500
			case 500:
				$pc = 501
			case 501:
				$g[40]+=5
				$g[39]++
				$g[77].setTxt("%4d", $g[39])
				$g[78].setTxt("%4d", $g[40])
				returnf(0)
				continue
			case 502:
				enterf(0);	// exec
				$g[104][0].unHighlight()
				$g[104][1].unHighlight()
				$g[104][2].unHighlight()
				$g[104][3].unHighlight()
				$g[84][0].unHighlight()
				$g[84][1].unHighlight()
				$g[85][0].unHighlight()
				$g[85][1].unHighlight()
				if (!($g[30]==PIPELINING_ENABLED)) {
					$pc = 503
					continue
				}
				fork(53, $obj)
				fork(74, $obj)
				fork(134, $obj)
				fork(326, $obj)
				fork(371, $obj)
				$pc = 504
				continue
			case 503:
				fork(405, $obj)
				$pc = 504
			case 504:
				if (wait(8))
				return
				$pc = 505
			case 505:
				resetWires()
				if (wait(($g[30]==PIPELINING_ENABLED) ? 72 : 392))
				return
				$pc = 506
			case 506:
				checkPoint()
				returnf(0)
				continue
			case 507:
				enterf(0);	// bus_active
				$g[187].setOpacity(1)
				callf(42, $g[189], 5)
				continue
			case 508:
				callf(42, $g[190], 5)
				continue
			case 509:
				if (wait(2))
				return
				$pc = 510
			case 510:
				$g[187].setOpacity(0)
				returnf(0)
				continue
			case 511:
				enterf(1);	// storeBus
				callf(42, $g[188], 5)
				continue
			case 512:
				callf(42, $g[190], 5)
				continue
			case 513:
				$stack[$fp+1] = $g[36].toString()
				sendToMem($stack[$fp+1], ", ", $stack[$fp-3].toString(), ", ", $stack[$fp-4].toString(), ", ", $stack[$fp-5].toString())
				returnf(3)
				continue
			case 514:
				enterf(0);	// clearLF
				$g[177].setNewValue(0)
				callf(38, $g[177])
				continue
			case 515:
				returnf(0)
				continue
			case 516:
				enterf(0);	// parLoad
				callf(42, $g[197], 10)
				continue
			case 517:
				$g[200].setNewValue($stack[$fp-3])
				callf(38, $g[200])
				continue
			case 518:
				returnf(1)
				continue
			case 519:
				enterf(0);	// checkLPAR
				fork(42, $g[198], 5)
				callf(42, $g[182], 5)
				continue
			case 520:
				if (wait(5))
				return
				$pc = 521
			case 521:
				fork(42, $g[183], 5)
				if (!($stack[$fp-3]==$g[176].value)) {
					$pc = 522
					continue
				}
				fork(514, $obj)
				$pc = 522
			case 522:
				returnf(1)
				continue
			case 523:
				enterf(0);	// run
				if (wait(1))
				return
				$pc = 524
			case 524:
				$g[38]=1
				setlocked()
				$pc = 525
			case 525:
				if (!(1)) {
					$pc = 530
					continue
				}
				fork(48, $g[81], ($g[30]==PIPELINING_ENABLED) ? 80 : 400)
				callf(502, $obj)
				continue
			case 526:
				if (!((($g[199].vIns==HALT) && ($g[30]==PIPELINING_ENABLED)) || (($g[102].vIns==HALT) && ($g[30]==PIPELINING_DISABLED)))) {
					$pc = 528
					continue
				}
				stop()
				if (!($g[205])) {
					$pc = 527
					continue
				}
				$pc = 530
				continue
				$pc = 527
			case 527:
				$pc = 528
			case 528:
				if (wait(1))
				return
				$pc = 529
			case 529:
				$pc = 525
				continue
			case 530:
				returnf(0)
				continue
			}
		}
	}

	this.getThread = function() { return $thread; };
	this.execute = execute;
	this.resumeThread = resumeThread;
	this.suspendThread = suspendThread;
	this.waitTracker = waitTracker;

}

// eof
