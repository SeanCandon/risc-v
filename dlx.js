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
	const HART_1 = 0
	const HART_2 = 1
	const MAX_INSTR = 38
	const NOP = 0
	const ADD = 1
	const SUB = 2
	const AND = 3
	const OR = 4
	const XOR = 5
	const SLL = 6
	const SRL = 7
	const SLT = 8
	const SGT = 9
	const SLE = 10
	const SGE = 11
	const ADDi = 12
	const SUBi = 13
	const ANDi = 14
	const ORi = 15
	const XORi = 16
	const SLLi = 17
	const SRLi = 18
	const SLTi = 19
	const SGTi = 20
	const SLEi = 21
	const SGEi = 22
	const LD = 23
	const ST = 24
	const BEQ = 25
	const BNE = 26
	const BLT = 27
	const BGE = 28
	const J = 29
	const JAL = 30
	const JR = 31
	const JALR = 32
	const MUL = 33
	const DIV = 34
	const REM = 35
	const LR = 36
	const SC = 37
	const HALT = 38
	const STALL = 39
	const EMPTY = 40
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
		return ((instr>=ADD && instr<=SGE) || instrIsMulti(instr)) ? 1 : 0
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
		if (instrIsNop(instr) || instrIsJumpR(instr) || isJorJAL(instr))
		return OP_TYPE_UNUSED
		else 
		return OP_TYPE_REG
	}

	function instrOpTypeRs2(instr) {
		if (instrIsNop(instr))
		return OP_TYPE_UNUSED
		else 
		if (instrIsArRR(instr) || instrIsJumpR(instr))
		return OP_TYPE_REG
		else 
		return OP_TYPE_IMM
	}

	function instrText(instr, rdt, rs1, rs2) {
		if (instrIsNop(instr))
		return sprintf("%s", $g[39][instr])
		else 
		if (instrIsArRR(instr))
		return sprintf("%s x%d,x%d,x%d", $g[39][instr], rdt, rs1, rs2)
		else 
		if (instrIsArRI(instr))
		return sprintf("%s x%d,x%d,%02X", $g[39][instr], rdt, rs1, rs2)
		else 
		if (instrIsLoadOrStore(instr))
		return sprintf("%s x%d,x%d+%02X", $g[39][instr], rdt, rs1, rs2)
		else 
		if (instrIsBranch(instr))
		return sprintf("%s x%d,x%d,%02X", $g[39][instr], rdt, rs1, rs2)
		else 
		if (instr==J)
		return sprintf("%s %02X", $g[39][instr], rs2)
		else 
		if (instr==JAL)
		return sprintf("%s x%d, %02X", $g[39][instr], rdt, rs2)
		else 
		if (instr==JR)
		return sprintf("%s x%d", $g[39][instr], rs2)
		else 
		if (instr==JALR)
		return sprintf("%s x%d, x%d", $g[39][instr], rdt, rs2)
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
		return op2<op1 ? 1 : 0
		else 
		if (instr==BGE)
		return op2>=op1 ? 1 : 0
		else 
		if (instrIsLoadOrStore(instr))
		return (se8(op1)+se8(op2))&255
		else 
		if (instr==JAL || instr==JALR)
		return op2
		else 
		return 238
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
		this.adr = new Rectangle2($g[0], $g[19], 0, 0, this.brush, this.x, this.y, this.fw, this.h, 0, $g[17], "%02X", this.addr)
		this.ins = new Rectangle2($g[0], $g[19], HLEFT, 0, this.brush, this.x+this.fw, this.y, 2*this.fw, this.h, this.insPen, $g[17], " NOP")
		this.rdt = new Rectangle2($g[0], $g[19], 0, 0, this.brush, this.x+3*this.fw, this.y, this.fw, this.h, this.rdtPen, $g[17], "-")
		this.rs1 = new Rectangle2($g[0], $g[19], 0, 0, this.brush, this.x+4*this.fw, this.y, this.fw, this.h, this.rs1Pen, $g[17], "-")
		this.rs2 = new Rectangle2($g[0], $g[19], 0, 0, this.brush, this.x+5*this.fw, this.y, this.fw, this.h, this.rs2Pen, $g[17], "-")
		this.dot = new Rectangle2($g[0], $g[19], 0, 0, $g[11], this.x+this.fw*0.80000000000000004, this.y+2, this.h/2, this.h/2)
		this.dot.setOpacity(0)
		this.arrowDown = new Line($g[0], $g[19], 0, $g[43], 0, 0, this.x+this.w+2, this.y+this.h*0.5, 5, 0, 0, 0, 0, 0)
		this.arrowUp = new Line($g[0], $g[19], 0, $g[43], 0, 0, this.x-2, this.y+this.h*0.5, -5, 0, 0, 0, 0, 0)
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
		this.ins.setTxt("%c%s", 32, $g[39][this.vIns])
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
			$g[16]=0
			setArg("example", $g[16].toString())
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
		if (!$g[24]) {
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
		if (!$g[24] && down && this.opTypeRdt!=OP_TYPE_UNUSED) {
			if (flags&MB_LEFT) {
				this.vRdt=(this.vRdt==31) ? 0 : this.vRdt+1
			} else
			if (flags&MB_RIGHT)
			this.vRdt=(this.vRdt==0) ? 31 : this.vRdt-1
			this.initRegs(1)
		}
	}

	Instruction.prototype.$eh7 = function(down, flags, x, y) {
		if (!$g[24] && down && this.opTypeRdt!=OP_TYPE_UNUSED) {
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
		if (!$g[24] && down) {
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
		this.r = new Rectangle2($g[0], 0, 0, $g[1], $g[40], x, y, w, h)
		this.r.setRounded(2, 2)
		new Rectangle2($g[0], 0, 0, $g[1], $g[41], x+2, y+2, w-4, h-4)
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
		this.r2 = new Rectangle2($g[0], 0, 0, $g[1], $g[12], x+2, y+2, w-4, h-14)
		this.r2.setRounded(2, 2)
		this.r3 = new Rectangle2($g[0], 0, 0, 0, 0, x, y+h-10, w, 10, $g[4], $g[17], caption)
		this.label = new Txt($g[0], $g[19], 0, x+w/2, y+(h-14)/2, 0, $g[17], this.txt)
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
		this.regCol = $g[13]
		this.r1 = new Rectangle2($g[0], 0, 0, $g[1], $g[44], x, y, w, h)
		this.r1.setRounded(2, 2)
		this.bg1 = new Rectangle2($g[0], $g[19], 0, 0, $g[12], this.vx, this.vy, this.vw/2, this.vh)
		this.bg2 = new Rectangle2($g[0], $g[19], 0, 0, $g[12], this.vx+this.vw/2, this.vy, this.vw/2, this.vh)
		if (w>=h) {
			this.vy=y+2
			this.vw=w-14
			this.vh=h-4
			if (labelPos==LEFT) {
				this.r2=new Rectangle($g[0], 0, 0, 0, 0, x+7-1, y+h/2, -7, -h/2, 14, h, 0, $g[17], caption)
				this.r2.rotate(-90)
				this.vx=x+12
			} else
			if (labelPos==RIGHT) {
				this.r2=new Rectangle($g[0], 0, 0, 0, 0, x+w-7, y+h/2, -7, -h/2, 14, h, 0, $g[17], caption)
				this.r2.rotate(-90)
				this.vx=x+2
			}
		} else {
			this.vx=x+2
			this.vw=w-4
			this.vh=h-14
			if (labelPos==TOP) {
				this.r2=new Rectangle2($g[0], 0, 0, 0, 0, x, y, w, 14, 0, $g[17], caption)
				this.vy=y+12
			} else
			if (labelPos==BOTTOM) {
				this.r2=new Rectangle2($g[0], 0, 0, 0, 0, x, y+h-10, w, 10, 0, $g[17], caption)
				this.vy=y+2
			}
		}
		if (w>=h) {
			this.label=new Rectangle2($g[0], $g[19], 0, 0, $g[13], this.vx, this.vy, this.vw, this.vh, 0, $g[17], "%02X", this.value)
		} else {
			this.label=new Rectangle($g[0], $g[19], 0, 0, $g[13], this.vx+this.vw/2, this.vy+this.vh/2, -this.vw/2, -this.vh/2, this.vw, this.vh, 0, $g[17], "%02X", this.value)
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
		this.label.setBrush(enter ? $g[12] : this.regCol)
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
		this.bg1.setBrush($g[12])
		this.bg2.setBrush($g[12])
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
		this.bg = new Rectangle2($g[0], 0, 0, $g[1], $g[46], this.x, this.y, this.w, this.h)
		this.bg.setRounded(2, 2)
		this.label
		if (this.w>=this.h) {
			this.label=new Rectangle2($g[0], 0, 0, 0, 0, this.x, this.y, this.w, this.h, 0, $g[47], caption)
		} else {
			this.label=new Rectangle($g[0], 0, 0, 0, 0, this.x+this.w/2-1, this.y+this.h/2, -this.w/2, -this.h/2, this.w, this.h, 0, $g[47], caption)
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
		this.spText = new Rectangle2($g[0], 0, 0, $g[4], $g[48], 120, 120, 20, 8, $g[4], $g[47], sprintf(""))
		this.spAddr = -2
		this.prevSPAddr = -1
		this.apFP = new AnimPipe()
		this.fpText = new Rectangle2($g[0], 0, 0, $g[4], $g[48], 120, 120, 20, 8, $g[4], $g[47], sprintf(""))
		this.fpAddr = -3
		this.currFrame = 0
		this.frameColours = newArray(3)
		this.frameColours[0]=$g[11]
		this.frameColours[1]=$g[14]
		this.frameColours[2]=$g[15]
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
		this.outer = new Rectangle2($g[0], 0, 0, $g[1], $g[48], this.outer_x, this.outer_y, this.outer_w, this.outer_h)
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
		this.stack[addr].highlight($g[23])
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
					fpR.setColour($g[13])
				}
			} else {
				for (let i = 0; i<=n; i++) {
					let r = this.stack[s-i]
					if (i==0 && this.currFrame>=2) {
						r.setColour(this.frameColours[this.currFrame-2])
					} else {
						r.setColour($g[13])
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
			this.fpText=new Rectangle2($g[0], 0, 0, $g[4], $g[48], (tax+taw+13), (tay+6), 20, 8, $g[3], $g[47], sprintf("FP"))
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
			this.spText=new Rectangle2($g[0], 0, 0, $g[4], $g[48], (ax+aw+20), (ay+6), 15, 8, $g[3], $g[47], sprintf("SP/FP"))
		} else {
			this.spText=new Rectangle2($g[0], 0, 0, $g[4], $g[48], (ax+aw+13), (ay+6), 20, 8, $g[3], $g[47], sprintf("SP"))
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
						r1.setColour($g[13])
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
			this.fpText=new Rectangle2($g[0], 0, 0, $g[4], $g[48], (ax+aw+13), (ay+6), 20, 8, $g[3], $g[47], sprintf("FP"))
		} else {
			this.spText.setOpacity(0)
			this.fpText.setOpacity(0)
			this.spText=new Rectangle2($g[0], 0, 0, $g[4], $g[48], (ax+aw+20), (ay+6), 15, 8, $g[3], $g[47], sprintf("SP/FP"))
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

	function ALU(x, y, w, h) {
		VObj.call(this)
		this.alu = new Polygon($g[0], 0, ABSOLUTE, $g[1], $g[46], x, y, 0, 0, w, h/4, w, 3*h/4, 0, h, 0, 5*h/8, w/2, h/2, 0, 3*h/8)
		new Rectangle2($g[0], 0, 0, 0, 0, x, y-10, w, 10, 0, $g[47], "ALU")
		this.op = ""
		this.txtOp = new Rectangle($g[0], $g[19], 0, 0, $g[11], x, y+h/2, 0, -h/12, 2*w/3, h/6, $g[4], $g[47], this.op)
		this.txtOp.setOpacity(0)
		this.txtOp.setRounded(2, 2)
		this.txtResult = new Rectangle($g[0], $g[21], 0, $g[1], $g[13], x+3*w/4, y+h/2, 0, -h/12, w/2, h/6, $g[1], $g[47])
		this.txtResult.setOpacity(0)
		this.txtResult.setRounded(2, 2)
	}
	ALU.prototype = Object.create(VObj.prototype)

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
		if (vIns==SLT || vIns==SLTi)
		this.op="LT"
		else 
		if (vIns==SGT || vIns==SGTi)
		this.op="GT"
		else 
		if (vIns==SLE || vIns==SLEi)
		this.op="LE"
		else 
		if (vIns==SGE || vIns==SGEi)
		this.op="GE"
		else 
		if (vIns==LD || vIns==ST)
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
		this.bgLine = new Line($g[0], $g[20], 0, this.bgPen1, 0, 0)
		this.fgLine = new Line($g[0], $g[21], 0, this.fgPen0, 0, 0)
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
		this.clkDisplay = new Rectangle2(this, 0, 0, $g[1], $g[12], 0, 0, w, h)
		this.clkDisplay.setRounded(2, 2)
		this.prev_clock = new Line(this, $g[21], 0, $g[49], -this.chw+this.chw/5, 3+this.ch, 0, 0, 0, -this.ch, this.chw, 0, 0, this.ch, this.chw, 0)
		this.next_clock = new Line(this, $g[21], 0, $g[50], this.chw+this.chw/5, 3+this.ch, 0, 0, 0, -this.ch, this.chw, 0, 0, this.ch, this.chw, 0)
		this.dot = new Rectangle2(this, $g[21], 0, 0, $g[5], w/2-3, h-6, 6, 6)
		this.canUpdate
	}
	AnimatedClock.prototype = Object.create(Group.prototype)

	AnimatedClock.prototype.setStall = function(s, t) {
		this.stall=s
		this.type=t
		if (this.canUpdate)
		this.prev_clock.setPen(this.stall ? (this.type ? $g[51] : $g[49]) : $g[50])
	}

	function Button(x, y, w, h, caption, ID) {
		VObj.call(this)
		this.label = new Rectangle2($g[0], 0, 0, $g[1], $g[52], x, y, w, h, $g[1], $g[17], caption)
		this.label.addEventHandler("eventEE", this, this.$eh11)
	}
	Button.prototype = Object.create(VObj.prototype)

	Button.prototype.$eh11 = function(enter, x, y) {
		this.label.setBrush(enter ? $g[53] : $g[52])
		return 0
	}

	Button.prototype.setCaption = function(caption) {
		this.label.setTxt(caption)
	}

	Button.prototype.showLocked = function(locked) {
		this.label.setFont(locked ? $g[18] : $g[17])
	}

	function resetWires() {
		$g[88].reset()
		$g[86].reset()
		$g[87].setOpacity(0)
		$g[89].reset()
		$g[90].reset()
		$g[91].reset()
		$g[92].reset()
		$g[93].reset()
		$g[94].reset()
		$g[95].reset()
		$g[96].reset()
		$g[97].reset()
		$g[98].reset()
		$g[119].reset()
		$g[120].reset()
		$g[121].reset()
		$g[122].reset()
		$g[123].reset()
		$g[124].reset()
		$g[125].setOpacity(0)
		$g[126].reset()
		$g[127].setOpacity(0)
		$g[129].reset()
		$g[130].setOpacity(0)
		$g[131].reset()
		$g[132].reset()
		$g[128].reset()
		$g[136].reset()
		$g[137].setOpacity(0)
		$g[139].reset()
		$g[138].reset()
		$g[141].reset()
		$g[142].reset()
		$g[143].setOpacity(0)
		$g[144].reset()
		$g[145].setOpacity(0)
		$g[140].setOpacity(0)
		$g[116].setPen($g[111])
		$g[117].setPen($g[111])
		$g[118].setPen($g[111])
		$g[153].reset()
		$g[154].reset()
		$g[155].reset()
		$g[156].reset()
		$g[157].reset()
		$g[158].reset()
		$g[159].setOpacity(0)
		$g[160].reset()
		$g[161].reset()
		$g[162].reset()
		$g[163].reset()
		$g[164].reset()
		$g[165].reset()
		$g[166].reset()
		$g[167].reset()
		$g[168].reset()
		$g[152].txtOp.setOpacity(0)
		$g[152].txtResult.setOpacity(0)
		$g[116].setPen($g[111])
		$g[117].setPen($g[111])
		$g[175].reset()
		$g[176].reset()
		$g[177].reset()
		$g[178].reset()
		$g[179].reset()
		$g[180].reset()
		$g[183].reset()
	}

	function resetRegisters() {
		$g[79].reset()
		$g[79].setValue(124)
		$g[100].reset()
		$g[147].reset()
		$g[148].reset()
		$g[171].reset()
		$g[170].reset()
		$g[182].reset()
		$g[81][0].reset()
		$g[81][1].reset()
		$g[82][0].reset()
		$g[82][1].reset()
		$g[172][0].reset()
		$g[172][1].reset()
		$g[172][2].reset()
		$g[172][3].reset()
		$g[99].reset()
		$g[146].reset()
		$g[169].reset()
		$g[181].reset()
		$g[77].setActive(124)
		$g[170].setInvalid(1)
		$g[170].updateLabel()
		$g[182].setInvalid(1)
		$g[182].updateLabel()
		$g[81][0].setValue(-1)
		$g[81][0].setInvalid(1)
		$g[81][0].updateLabel()
		$g[81][1].setValue(-1)
		$g[81][1].setInvalid(1)
		$g[81][1].updateLabel()
		$g[36]=0
		$g[37]=0
		$g[74].setTxt("%4d", 0)
		$g[75].setTxt("%4d", 0)
	}

	function resetCircuit() {
		resetRegisters()
		resetWires()
	}

	function showBTB(opacity) {
		$g[80].setOpacity(opacity)
		$g[81][0].setOpacity(opacity)
		$g[81][1].setOpacity(opacity)
		$g[82][0].setOpacity(opacity)
		$g[82][1].setOpacity(opacity)
		$g[94].setOpacity(opacity)
		$g[119].setOpacity(opacity)
		$g[83].setOpacity(opacity)
		$g[97].setOpacity(opacity)
		$g[90].setOpacity(opacity)
		$g[136].setOpacity(opacity)
		$g[139].setOpacity(opacity)
		$g[109].setOpacity(opacity)
		$g[138].setOpacity(opacity)
	}

	function showALUForwarding(opacity) {
		if (opacity==0) {
			$g[156].setPoint(0, 440, 205)
			$g[156].setPoint(1, 501, 205)
			$g[157].setPoint(0, ($g[31]) ? 440 : 430, 250)
			$g[157].setPoint(1, 490, 250)
			$g[158].setPoint(2, 450, 260)
			$g[158].setPoint(3, 410, 260)
			$g[156].setHead(0)
		} else {
			$g[156].setPoint(0, 440, 220)
			$g[156].setPoint(1, 500, 220)
			$g[157].setPoint(0, 440, 240)
			$g[157].setPoint(1, 500, 240)
			$g[158].setPoint(2, 450, 250)
			$g[158].setPoint(3, 500, 250)
			$g[156].setHead(1)
		}
		$g[149].setOpacity(opacity)
		$g[154].setOpacity(opacity)
		$g[155].setOpacity(opacity)
		$g[161].setOpacity(opacity)
		$g[160].setOpacity(opacity)
	}

	function showSMDRForwarding(opacity) {
		if (opacity==0) {
			$g[164].setPoint(1, 435, 330)
			$g[164].setPoint(2, 500, 330)
			$g[164].setHead(0)
		} else {
			$g[164].setPoint(1, 435, 340)
			$g[164].setPoint(2, 500, 340)
			$g[164].setHead(1)
		}
		$g[151].setOpacity(opacity)
		$g[162].setOpacity(opacity)
		$g[163].setOpacity(opacity)
	}

	function showZeroForwarding(opacity) {
		if (opacity==0) {
		} else {
		}
	}

	function showPipeline(opacity) {
		if (opacity==0) {
			$g[96].setPoint(1, 180, 230)
			$g[96].setPoint(2, 180, 240)
			$g[121].setPoint(0, 260, 230)
			$g[122].setPoint(0, 260, 230)
			$g[98].setPoint(1, 380, 390)
			$g[144].setPoint(1, 375, 205)
			$g[144].setPoint(2, 440, 205)
			$g[141].setPoint(1, 440, 240)
			$g[164].setPoint(0, 435, 250)
			$g[168].setPoint(3, 600, 240)
			$g[165].setPoint(1, 530, 330)
			$g[177].setPoint(1, 640, 230)
			$g[98].setHead(0)
			$g[96].setHead(0)
			$g[144].setHead(0)
			$g[156].setHead(0)
			$g[141].setHead(0)
			$g[164].setHead(0)
			$g[165].setHead(0)
			$g[166].setHead(0)
			$g[167].setHead(0)
			$g[168].setHead(0)
			$g[177].setHead(0)
			showBTB(opacity)
			showALUForwarding(opacity)
			showSMDRForwarding(opacity)
			showZeroForwarding(opacity)
		} else {
			$g[96].setPoint(1, 240, 230)
			$g[96].setPoint(2, 250, 230)
			$g[121].setPoint(0, 260, 250)
			$g[122].setPoint(0, 260, 250)
			$g[98].setPoint(1, 390, 390)
			$g[144].setPoint(1, 375, 210)
			$g[144].setPoint(2, 420, 210)
			$g[141].setPoint(1, 420, 240)
			$g[164].setPoint(0, 435, 270)
			$g[168].setPoint(3, 600, 240)
			$g[165].setPoint(1, 600, 330)
			$g[177].setPoint(1, 700, 230)
			$g[98].setHead(1)
			$g[96].setHead(1)
			$g[144].setHead(1)
			$g[156].setHead(1)
			$g[141].setHead(1)
			$g[164].setHead(1)
			$g[165].setHead(1)
			$g[166].setHead(1)
			$g[167].setHead(1)
			$g[168].setHead(1)
			$g[177].setHead(1)
			showBTB($g[29]==BRANCH_PREDICTION ? 1 : 0)
			showALUForwarding($g[31]==ALU_FORWARDING ? 1 : 0)
			showSMDRForwarding($g[32]==FORWARDING_TO_SMDR ? 1 : 0)
			showZeroForwarding($g[33]==ZERO_FORWARDING ? 1 : 0)
		}
		$g[95].setOpacity(opacity)
		$g[85].setOpacity(opacity)
		$g[92].setOpacity(opacity)
		$g[100].setOpacity(opacity)
		$g[146].setOpacity(opacity)
		$g[169].setOpacity(opacity)
		$g[181].setOpacity(opacity)
		$g[153].setOpacity(opacity)
		$g[175].setOpacity(opacity)
		$g[147].setOpacity(opacity)
		$g[148].setOpacity(opacity)
		$g[170].setOpacity(opacity)
		$g[182].setOpacity(opacity)
		$g[171].setOpacity(opacity)
		$g[66].label.setOpacity(opacity)
		$g[67].label.setOpacity(opacity)
		$g[68].label.setOpacity(opacity)
		$g[69].label.setOpacity(opacity)
		$g[70].label.setOpacity(opacity)
	}

	function setPEMode(mode) {
		$g[28]=mode
		if ($g[28]==0) {
			$g[65].setCaption("Pipelining Enabled")
			showPipeline(1)
		} else
		if ($g[28]==1) {
			$g[65].setCaption("Pipelining Disabled")
			showPipeline(0)
		}
		setArg("peMode", $g[28].toString())
	}

	function setBPMode(mode) {
		$g[29]=mode
		if ($g[29]==0) {
			$g[66].setCaption("Branch Prediction")
			showBTB(1)
		} else
		if ($g[29]==1) {
			$g[66].setCaption("Branch Interlock")
			showBTB(0)
		} else
		if ($g[29]==2) {
			$g[66].setCaption("Delayed Branches")
			showBTB(0)
		}
		setArg("bpMode", $g[29].toString())
	}

	function setLIMode(mode) {
		$g[30]=mode
		if ($g[30]==0) {
			$g[67].setCaption("Load Interlock")
		} else
		if ($g[30]==1) {
			$g[67].setCaption("No Load Interlock")
		}
		setArg("liMode", $g[30].toString())
	}

	function setAFMode(mode) {
		$g[31]=mode
		if ($g[31]==0) {
			$g[68].setCaption("ALU Forwarding")
			showALUForwarding(1)
		} else
		if ($g[31]==1) {
			$g[68].setCaption("ALU Interlock")
			showALUForwarding(0)
		} else
		if ($g[31]==2) {
			$g[68].setCaption("No ALU Interlock")
			showALUForwarding(0)
		}
		setArg("afMode", $g[31].toString())
	}

	function setSFMode(mode) {
		$g[32]=mode
		if ($g[32]==0) {
			$g[69].setCaption("Store Operand\nForwarding")
			showSMDRForwarding(1)
		} else
		if ($g[32]==1) {
			$g[69].setCaption("Store Interlock")
			showSMDRForwarding(0)
		} else
		if ($g[32]==2) {
			$g[69].setCaption("No Store Interlock")
			showSMDRForwarding(0)
		}
		setArg("sfMode", $g[32].toString())
	}

	function setZFMode(mode) {
		$g[33]=mode
		if ($g[33]==0) {
			$g[70].setCaption("Zero Forwarding")
			showZeroForwarding(1)
		} else
		if ($g[33]==1) {
			$g[70].setCaption("Zero Interlock")
			showZeroForwarding(0)
		} else
		if ($g[33]==2) {
			$g[70].setCaption("No Zero Interlock")
			showZeroForwarding(0)
		}
		setArg("zfMode", $g[33].toString())
	}

	function btbIndex(pc) {
		for (let lp1 = 0; lp1<2; lp1++)
		if ($g[81][lp1].value==pc)
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
		if ($g[209]==0) {
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
		$g[203]=c
	}

	function booth8() {
		let b1 = $g[205]&1
		if (b1!=$g[204] && $g[208]!=2) {
			if (b1>$g[204]) {
				$g[206]=(se8($g[206])-se8($g[207]))&255
			} else {
				$g[206]=(se8($g[206])+se8($g[207]))&255
			}
			$g[208]=2
		} else {
			$g[208]=1
			let p21 = $g[206]&1
			p21=p21<<7
			let p2m = $g[206]&128
			$g[205]=($g[205]>>1)&255
			$g[205]=$g[205]|p21
			$g[206]=($g[206]>>1)&255
			$g[206]=$g[206]|p2m
			$g[204]=b1
		}
	}

	function booth() {
		let b1 = $g[205]&1
		if (b1!=$g[204] && $g[208]!=2) {
			let p3 = $g[205]&15
			let q = $g[205]&240
			q=q>>4
			if (b1>$g[204]) {
				q=(se8(q)-se8($g[207]))&255
			} else {
				q=(se8(q)+se8($g[207]))&255
			}
			q=q<<4
			q=q&240
			$g[205]=q|p3
			$g[208]=2
		} else {
			$g[208]=1
			let lb = $g[205]&128
			$g[205]=($g[205]>>1)&255
			$g[205]=$g[205]|lb
			$g[204]=b1
		}
	}

	function expandFrame() {
	}

	function calcNewPC() {
		if (instrIsBranch($g[146].vIns)) {
			if ($g[196]==1) {
				$g[189]=$g[129]
				$g[192]=$g[135].value&127
				$g[193]=$g[89]
			} else {
				$g[189]=$g[126]
				$g[192]=($g[100].value+4)&127
				$g[196]=0
			}
		} else {
			if (isJorJAL($g[99].vIns)) {
				$g[189]=$g[129]
				$g[190]=$g[136]
				$g[192]=($g[100].value+$g[99].vRs2)&127
				$g[193]=$g[89]
			} else
			if (instrIsJumpR($g[99].vIns)) {
				$g[192]=($g[101][$g[99].vRs2].value)&127
				$g[193]=$g[91]
				$g[190]=$g[139]
			}
		}
	}

	function updBTB() {
		if ($g[192]!=$g[79].value) {
			$g[79].setNewValue($g[192])
			$g[188]=$g[193]
			if ($g[29]==BRANCH_PREDICTION) {
				if ($g[192]==$g[100].value+4) {
					if (btbIndex($g[100].value)>=0)
					$g[81][btbIndex($g[100].value)].setInvalid(1)
				} else {
					if (btbIndex($g[100].value)>=0)
					$g[26]=btbIndex($g[100].value)
					else 
					$g[26]=($g[26]) ? 0 : 1
					$g[81][$g[26]].setNewValue($g[100].value)
					$g[81][$g[26]].setInvalid(0)
					$g[81][$g[26]].useTag=0
					$g[82][$g[26]].setNewValue($g[192])
				}
			}
		}
	}

	function detectStall() {
		$g[25]=NO_STALL
		$g[27]=0
		if ($g[31]==ALU_INTERLOCK) {
			if (instrOpTypeRdt($g[146].vIns)==OP_TYPE_REG) {
				if ((instrOpTypeRs1($g[99].vIns)==OP_TYPE_REG) && ($g[99].vRs1==$g[146].vRdt))
				$g[25]=DATA_STALL
				if ((instrOpTypeRs2($g[99].vIns)==OP_TYPE_REG) && ($g[99].vRs2==$g[146].vRdt))
				$g[25]=DATA_STALL
			}
			if (instrOpTypeRdt($g[169].vIns)==OP_TYPE_REG) {
				if ((instrOpTypeRs1($g[99].vIns)==OP_TYPE_REG) && ($g[99].vRs1==$g[169].vRdt))
				$g[25]=DATA_STALL
				if ((instrOpTypeRs2($g[99].vIns)==OP_TYPE_REG) && ($g[99].vRs2==$g[169].vRdt))
				$g[25]=DATA_STALL
			}
		}
		if (($g[32]==STORE_INTERLOCK) && ($g[99].vIns==ST)) {
			if ((instrOpTypeRdt($g[146].vIns)==OP_TYPE_REG) && ($g[146].vRdt==$g[99].vRdt))
			$g[25]=DATA_STALL
			if ((instrOpTypeRdt($g[169].vIns)==OP_TYPE_REG) && ($g[169].vRdt==$g[99].vRdt))
			$g[25]=DATA_STALL
		}
		if (instrIsJumpR($g[99].vIns) && (instrIsBranch($g[146].vIns)==0)) {
			if ((instrOpTypeRdt($g[146].vIns)==OP_TYPE_REG) && ($g[146].vRdt==$g[99].vRs2))
			$g[25]=DATA_STALL
			if ((instrOpTypeRdt($g[169].vIns)==OP_TYPE_REG) && ($g[169].vRdt==$g[99].vRs2))
			$g[25]=DATA_STALL
		}
		if (($g[30]==LOAD_INTERLOCK) && ($g[146].vIns==LD)) {
			if ((instrOpTypeRs1($g[99].vIns)==OP_TYPE_REG) && ($g[99].vRs1==$g[146].vRdt))
			$g[25]=DATA_STALL
			if ((instrOpTypeRs2($g[99].vIns)==OP_TYPE_REG) && ($g[99].vRs2==$g[146].vRdt))
			$g[25]=DATA_STALL
		}
		if (instrIsMulti($g[146].vIns) && ($g[201]==1)) {
			$g[25]=DATA_STALL
		}
		if (instrIsBranch($g[146].vIns)) {
			if (instrIsJump($g[99].vIns) && ($g[196]==0) && ($g[25]==NO_STALL)) {
				$g[27]=1
				$g[25]=CTRL_STALL
			} else
			if (instrIsJump($g[99].vIns) && ($g[196]==1) && ($g[25]==NO_STALL)) {
				$g[25]=NO_STALL
				$g[197]=1
			} else
			if ((instrIsBranch($g[99].vIns)==0) && ($g[196]==1) && ($g[25]==NO_STALL)) {
				$g[27]=1
				$g[25]=CTRL_STALL
			} else {
				$g[25]=NO_STALL
				$g[197]=0
			}
		} else {
			if (($g[25]==NO_STALL) && ($g[29]!=DELAYED_BRANCHES) && instrIsJump($g[99].vIns) && ($g[192]!=$g[79].value)) {
				$g[27]=1
				$g[25]=CTRL_STALL
			}
		}
		if ($g[25]==DATA_STALL) {
			$g[78].setStall(1, 0)
		} else
		if ($g[25]==CTRL_STALL) {
			$g[78].setStall(1, 1)
		}
	}

	function setlocked() {
		let b_locked = $g[35] || $g[24]
		$g[65].showLocked(b_locked)
		$g[66].showLocked(b_locked)
		$g[67].showLocked(b_locked)
		$g[68].showLocked(b_locked)
		$g[69].showLocked(b_locked)
		$g[70].showLocked(b_locked)
	}

	function $eh12(down, flags, x, y) {
		if (down && (flags&MB_LEFT) && (!$g[35]) && (!$g[24])) {
			setPEMode(($g[28]+1)%2)
			resetCircuit()
		}
		return 0
	}

	function $eh13(down, flags, x, y) {
		if (down && (flags&MB_LEFT) && (!$g[35]) && (!$g[24])) {
			setBPMode(($g[29]+1)%3)
			resetCircuit()
		}
		return 0
	}

	function $eh14(down, flags, x, y) {
		if (down && (flags&MB_LEFT) && (!$g[35]) && (!$g[24])) {
			setLIMode(($g[30]+1)%2)
			resetCircuit()
		}
		return 0
	}

	function $eh15(down, flags, x, y) {
		if (down && (flags&MB_LEFT) && (!$g[35]) && (!$g[24])) {
			setAFMode(($g[31]+1)%3)
			resetCircuit()
		}
		return 0
	}

	function $eh16(down, flags, $2, $3) {
		if (down && (flags&MB_LEFT) && (!$g[35]) && (!$g[24])) {
			setSFMode(($g[32]+1)%3)
			resetCircuit()
		}
		return 0
	}

	function $eh17(down, flags, $2, $3) {
		if (down && (flags&MB_LEFT) && (!$g[35]) && (!$g[24])) {
			setZFMode(($g[33]+1)%3)
			resetCircuit()
		}
		return 0
	}

	function $eh18(down, flags, x, y) {
		if (down && flags && MB_LEFT) {
			startParallel()
		}
	}

	function $eh19(down, flags, x, y) {
		if (down && (flags&MB_LEFT)) {
			let lp1, opcode, reg
			let instr
			let s = "saveanim.php?state="
			for (lp1=0; lp1<32; lp1++) {
				instr=$g[77].instruction[lp1]
				opcode=(instr.vIns<<24)|(instr.vRdt<<16)|(instr.vRs1<<8)|(instr.vRs2)
				s=sprintf("%si%d='0x%08X' ", s, lp1, opcode)
			}
			for (lp1=0; lp1<4; lp1++) {
				reg=$g[101][lp1].value
				s=sprintf("%sr%d='0x%02X' ", s, lp1, reg)
			}
			for (lp1=0; lp1<4; lp1++) {
				reg=$g[172][lp1].value
				s=sprintf("%sm%d='0x%02X' ", s, lp1, reg)
			}
			s=sprintf("%speMode='%d' bpMode='%d' liMode='%d' afMode='%d' sfMode='%d' zfMode='%d'", s, $g[28], $g[29], $g[30], $g[31], $g[32], $g[33])
			getURL(s)
		}
		return 0
	}

	function $eh20(down, flags, x, y) {
		return 0
	}

	function $eh21(down, flags, $2, $3) {
		if (down && (flags&MB_LEFT))
		getURL("showanim.php")
	}

	function $eh22(enter, x, y) {
		$g[76].setBrush(enter ? $g[8] : $g[12])
		$g[76].setTxtPen(enter ? $g[3] : $g[1])
		return 0
	}

	function $eh23(down, flags, x, y) {
		if (down && (flags&MB_LEFT)) {
			$g[16]=($g[16]==maxexample) ? 0 : $g[16]+1
			setArg("example", $g[16].toString())
			reset()
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
				$g[8] = new SolidBrush(GRAY192)
				$g[9] = new SolidBrush(GRAY224)
				$g[10] = new SolidBrush(MARINE)
				$g[11] = new SolidBrush(RED)
				$g[12] = new SolidBrush(WHITE)
				$g[13] = new SolidBrush(YELLOW)
				$g[14] = new SolidBrush(BLUE)
				$g[15] = new SolidBrush(GREEN)
				$g[16] = 0
				setViewport(0, 0, WIDTH, HEIGHT, 1)
				setBgBrush($g[12])
				$g[17] = new Font("Calibri", 8)
				$g[18] = new Font("Calibri", 8, STRIKETHROUGH)
				$g[19] = new Layer(1, 3)
				$g[20] = new Layer(2, 3)
				$g[21] = new Layer(3, 0)
				$g[22] = new Layer(5, 0)
				$g[23] = new SolidBrush(RED)
				$g[24] = 0
				$g[25] = NO_STALL
				$g[26] = 1
				$g[27] = 0
				$g[28] = 0
				$g[29] = 0
				$g[30] = 0
				$g[31] = 0
				$g[32] = 0
				$g[33] = 0
				$g[34] = HART_1
				$g[35] = 0
				$g[36] = 0
				$g[37] = 0
				$g[38] = getTitle()
				if (!($g[38]=="Hart 2")) {
					$pc = 1
					continue
				}
				$g[34]=HART_2
				isHart2()
				$pc = 1
			case 1:
				getMessage()
				$g[39] = newArray(40)
				$g[39][NOP]="NOP"
				$g[39][ADD]="ADD"
				$g[39][SUB]="SUB"
				$g[39][AND]="AND"
				$g[39][OR]="OR"
				$g[39][XOR]="XOR"
				$g[39][SLL]="SLL"
				$g[39][SRL]="SRL"
				$g[39][SLT]="SLT"
				$g[39][SGT]="SGT"
				$g[39][SLE]="SLE"
				$g[39][SGE]="SGE"
				$g[39][ADDi]="ADDi"
				$g[39][SUBi]="SUBi"
				$g[39][ANDi]="ANDi"
				$g[39][ORi]="ORi"
				$g[39][XORi]="XORi"
				$g[39][SLLi]="SLLi"
				$g[39][SRLi]="SRLi"
				$g[39][SLTi]="SLTi"
				$g[39][SGTi]="SGTi"
				$g[39][SLEi]="SLEi"
				$g[39][SGEi]="SGEi"
				$g[39][LD]="LD"
				$g[39][ST]="ST"
				$g[39][BEQ]="BEQ"
				$g[39][BNE]="BNE"
				$g[39][BLT]="BLT"
				$g[39][BGE]="BGE"
				$g[39][J]="J"
				$g[39][JAL]="JAL"
				$g[39][JR]="JR"
				$g[39][JALR]="JALR"
				$g[39][MUL]="MUL"
				$g[39][DIV]="DIV"
				$g[39][REM]="REM"
				$g[39][LR]="LR"
				$g[39][SC]="SC"
				$g[39][HALT]="HALT"
				$g[39][STALL]="STALL"
				$g[39][EMPTY]="EMPTY"
				$g[40] = new SolidBrush(BORDEAU)
				$g[41] = new SolidBrush(WHITE)
				$g[42] = new SolidPen(DOT, 1, rgba(0.75, 0.75, 0.75))
				$g[43] = new SolidPen(SOLID, 1, RED, ARROW60_END)
				$g[44] = new SolidBrush(PURPLE)
				$g[45] = new SolidBrush(WHITE)
				$g[46] = new SolidBrush(LIGHT_BLUE)
				$g[47] = new Font("Calibri", 9)
				$g[48] = new SolidBrush(WHITE)
				$g[49] = new SolidPen(SOLID, 1, RED, ROUND_START|ROUND_JOIN|ROUND_END)
				$g[50] = new SolidPen(SOLID, 1, GREEN, ROUND_START|ROUND_JOIN|ROUND_END)
				$g[51] = new SolidPen(SOLID, 1, ORANGE, ROUND_START|ROUND_JOIN|ROUND_END)
				$g[52] = new SolidBrush(WHITE)
				$g[53] = new SolidBrush(GRAY224)
				$g[54] = getArg("name", "")
				if (!($g[54]!="")) {
					$pc = 2
					continue
				}
				$g[54]=sprintf(":  %s", $g[54])
				$pc = 2
			case 2:
				$g[55] = new Font("Calibri", 20, SMALLCAPS|ITALIC)
				$g[56] = new Rectangle2($g[0], 0, HLEFT, 0, new SolidBrush(DARK_BLUE), 0, 10, 200, 30, $g[4], $g[55], sprintf(" RISC-V ANIMATION %s", $g[54]))
				$g[57] = new SolidPen(DASH, 1, DARK_BLUE, ROUND_START|ROUND_JOIN|ROUND_END)
				new Line2($g[0], 0, ABSOLUTE, $g[57], 110, 80, 740, 80)
				new Line2($g[0], 0, ABSOLUTE, $g[57], 110, 440, 740, 440)
				new Line2($g[0], 0, ABSOLUTE, $g[57], 110, 80, 110, 440)
				$g[58] = new Line2($g[0], 0, ABSOLUTE, $g[57], 240, 80, 240, 440)
				$g[59] = new Line2($g[0], 0, ABSOLUTE, $g[57], 390, 80, 390, 440)
				$g[60] = new Line2($g[0], 0, ABSOLUTE, $g[57], 590, 80, 590, 440)
				$g[61] = new Line2($g[0], 0, ABSOLUTE, $g[57], 690, 80, 690, 440)
				new Line2($g[0], 0, ABSOLUTE, $g[57], 740, 80, 740, 440)
				$g[62] = new SolidPen(DOT, THIN, BLACK)
				new Line2($g[0], 0, ABSOLUTE, $g[62], 10, 450, 700, 450)
				$g[63] = new Font("Calibri", 10, BOLD)
				$g[64] = new Button(20, 460, 70, 20, "Save Configuration", BUTTON_SP)
				$g[65] = new Button(100, 460, 70, 20, "Pipelining Enabled", BUTTON_PE)
				$g[66] = new Button(180, 460, 70, 20, "Branch Prediction", BUTTON_BP)
				$g[67] = new Button(260, 460, 70, 20, "Load Interlock", BUTTON_LI)
				$g[68] = new Button(340, 460, 70, 20, "ALU Forwarding", BUTTON_AF)
				$g[69] = new Button(420, 460, 70, 20, "Store Operand\nForwarding", BUTTON_SF)
				$g[70] = new Button(500, 460, 70, 20, "Zero Forwarding", BUTTON_ZF)
				$g[71] = new Button(580, 460, 70, 20, "Parallel", BUTTON_PAR)
				$g[72] = new Image($g[0], 0, 0, 0, "vivio.png", 660, 460, 0, 0, LOGOW, LOGOH)
				new Txt($g[0], 0, HLEFT|VTOP, 0, 46, $g[2], $g[17], "instructions executed:")
				$g[73] = new Txt($g[0], 0, HLEFT|VTOP, 0, 56, $g[2], $g[17], "ticks:")
				$g[74] = new Txt($g[0], 0, HLEFT|VTOP, 80, 46, $g[3], $g[17], "0")
				$g[75] = new Txt($g[0], 0, HLEFT|VTOP, 80, 56, $g[3], $g[17], "0")
				$g[76] = new Rectangle2($g[0], 0, 0, 0, 0, 0, 68, 100, 10, 0, $g[17], "Instruction Cache")
				$g[77] = new InstructionMemory(0, 80, 100, 320)
				$g[78] = new AnimatedClock($g[0], 0, 410, 80, 30)
				$g[79] = new Register(200, 210, 20, 40, TOP, "PC")
				$g[80] = new Rectangle2($g[0], 0, 0, 0, 0, 150, 85, 80, 10, 0, $g[17], "Branch Target Buffer")
				$g[81] = newArray(2)
				$g[81][0]=new Register(150, 100, 40, 20, LEFT, "PC")
				$g[81][1]=new Register(150, 120, 40, 20, LEFT, "PC")
				$g[82] = newArray(2)
				$g[82][0]=new Register(190, 100, 40, 20, RIGHT, "PPC")
				$g[82][1]=new Register(190, 120, 40, 20, RIGHT, "PPC")
				$g[83] = new Component(200, 170, 30, 10, "mux 2")
				$g[84] = new Component(170, 205, 10, 50, "mux 1")
				$g[85] = new Component(160, 270, 20, 10, "+4")
				$g[86] = new AnimPipe()
				$g[86].addPoint(110, 390)
				$g[86].addPoint(250, 390)
				$g[87] = new Rectangle($g[0], $g[21], 0, 0, $g[11], 180, 390, -30, -6, 60, 12, $g[4], $g[17])
				$g[87].setRounded(2, 2)
				$g[88] = new AnimPipe()
				$g[88].addPoint(210, 250)
				$g[88].addPoint(210, 320)
				$g[88].addPoint(110, 320)
				$g[89] = new AnimPipe()
				$g[89].addPoint(300, 170)
				$g[89].addPoint(300, 160)
				$g[89].addPoint(150, 160)
				$g[89].addPoint(150, 215)
				$g[89].addPoint(170, 215)
				$g[90] = new AnimPipe()
				$g[90].addPoint(150, 120)
				$g[90].addPoint(140, 120)
				$g[90].addPoint(140, 225)
				$g[90].addPoint(170, 225)
				$g[91] = new AnimPipe()
				$g[91].addPoint(240, 50)
				$g[91].addPoint(130, 50)
				$g[91].addPoint(130, 235)
				$g[91].addPoint(170, 235)
				$g[92] = new AnimPipe()
				$g[92].addPoint(160, 275)
				$g[92].addPoint(120, 275)
				$g[92].addPoint(120, 245)
				$g[92].addPoint(170, 245)
				$g[93] = new AnimPipe()
				$g[93].addPoint(180, 230)
				$g[93].addPoint(200, 230)
				$g[94] = new AnimPipe()
				$g[94].addPoint(210, 210)
				$g[94].addPoint(210, 180)
				$g[95] = new AnimPipe()
				$g[95].addPoint(210, 250)
				$g[95].addPoint(210, 275)
				$g[95].addPoint(180, 275)
				$g[96] = new AnimPipe()
				$g[96].addPoint(220, 230)
				$g[96].addPoint(240, 230)
				$g[96].addPoint(240, 230)
				$g[97] = new AnimPipe()
				$g[97].addPoint(215, 170)
				$g[97].addPoint(215, 140)
				$g[98] = new AnimPipe()
				$g[98].addPoint(270, 390)
				$g[98].addPoint(390, 390)
				$g[99] = new InstructionRegister(250, 350, 20, 85, "ID")
				$g[100] = new Register(250, 210, 20, 40, TOP, "PC1")
				new Txt($g[0], 0, HLEFT|VTOP, 480, 40, 0, $g[17], "Register\nFile")
				$g[101] = newArray(NUM_REGS)
				$g[102] = 240
				$g[103] = 25
				$g[104] = TOP
				$g[184]=0
				$pc = 3
			case 3:
				if (!($g[184]<NUM_REGS)) {
					$pc = 6
					continue
				}
				if (!($g[184]==(NUM_REGS/2))) {
					$pc = 4
					continue
				}
				$g[104]=BOTTOM
				$g[102]=240
				$g[103]+=REG_HEIGHT
				$pc = 4
			case 4:
				$g[105] = "x"+$g[184].toString()
				$g[101][$g[184]]=new Register($g[102], $g[103], REG_WIDTH, REG_HEIGHT, $g[104], $g[105])
				$g[102]+=REG_WIDTH
				$pc = 5
			case 5:
				$g[184]++
				$pc = 3
				continue
			case 6:
				$g[106] = new Component(275, 170, 50, 10, "mux 3")
				$g[107] = new Component(270, 320, 30, 10, "ADD4")
				$g[108] = new Component(300, 320, 30, 10, "ADDi")
				$g[109] = new Component(250, 100, 10, 40, "mux 4")
				$g[110] = new Component(375, 220, 10, 30, "mux 5")
				new Rectangle2($g[0], 0, 0, 0, 0, 280, 365, 20, 10, 0, $g[17], "4")
				$g[111] = new SolidPen(SOLID, 0, PURPLE, ARROW60_END)
				$g[112] = new SolidPen(SOLID, 2, RED, ARROW60_END)
				$g[113] = new SolidPen(SOLID, MEDIUM, BLACK)
				$g[114] = new Line2($g[0], $g[19], ABSOLUTE, $g[113], 540, 100, 560, 100)
				$g[115] = new Txt($g[0], $g[19], HLEFT|VTOP, 542, 90, 0, $g[17], "zero")
				$g[116] = new Line2($g[0], $g[19], ABSOLUTE, $g[111], 550, 102, 550, 200)
				$g[117] = new Line2($g[0], $g[19], ABSOLUTE, $g[111], 550, 102, 550, 140, 405, 140, 405, 220, 420, 220)
				$g[118] = new Line2($g[0], $g[19], ABSOLUTE, $g[111], 570, 220, 580, 220, 580, 150, 385, 150, 385, 175, 325, 175)
				$g[119] = new AnimPipe()
				$g[119].addPoint(260, 210)
				$g[119].addPoint(260, 200)
				$g[119].addPoint(220, 200)
				$g[119].addPoint(220, 180)
				$g[120] = new AnimPipe()
				$g[120].addPoint(285, 320)
				$g[120].addPoint(285, 240)
				$g[120].addPoint(375, 240)
				$g[121] = new AnimPipe()
				$g[121].addPoint(260, 250)
				$g[121].addPoint(260, 345)
				$g[121].addPoint(290, 345)
				$g[121].addPoint(290, 330)
				$g[122] = new AnimPipe()
				$g[122].addPoint(260, 250)
				$g[122].addPoint(260, 345)
				$g[122].addPoint(310, 346)
				$g[122].addPoint(310, 330)
				$g[123] = new AnimPipe()
				$g[123].addPoint(290, 360)
				$g[123].addPoint(290, 330)
				$g[124] = new AnimPipe()
				$g[124].addPoint(270, 390)
				$g[124].addPoint(320, 390)
				$g[124].addPoint(320, 330)
				$g[125] = new Rectangle($g[0], $g[21], 0, 0, $g[11], 320, 376, -12, -6, 24, 12, $g[4], $g[17])
				$g[125].setRounded(2, 2)
				$g[126] = new AnimPipe()
				$g[126].addPoint(295, 320)
				$g[126].addPoint(295, 180)
				$g[127] = new Rectangle($g[0], $g[21], 0, 0, $g[11], 285, 200, -12, -6, 24, 12, $g[4], $g[17])
				$g[127].setRounded(2, 2)
				$g[128] = new AnimPipe()
				$g[128].addPoint(315, 320)
				$g[128].addPoint(315, 310)
				$g[129] = new AnimPipe()
				$g[129].addPoint(307, 300)
				$g[129].addPoint(307, 180)
				$g[130] = new Rectangle($g[0], $g[21], 0, 0, $g[11], 315, 200, -12, -6, 24, 12, $g[4], $g[17])
				$g[130].setRounded(2, 2)
				$g[131] = new AnimPipe()
				$g[131].addPoint(307, 300)
				$g[131].addPoint(307, 240)
				$g[131].addPoint(375, 240)
				$g[132] = new AnimPipe()
				$g[132].addPoint(315, 300)
				$g[132].addPoint(315, 280)
				$g[132].addPoint(345, 280)
				$g[133] = new AnimPipe()
				$g[133].addPoint(360, 270)
				$g[133].addPoint(360, 255)
				$g[133].addPoint(317, 255)
				$g[133].addPoint(317, 180)
				$g[134] = new Component(297, 300, 40, 10, "demux 1")
				$g[135] = new Register(345, 270, 30, 20, LEFT, "M")
				$g[135].rotateLabel(90)
				$g[136] = new AnimPipe()
				$g[136].addPoint(300, 170)
				$g[136].addPoint(300, 130)
				$g[136].addPoint(260, 130)
				$g[137] = new Rectangle($g[0], $g[21], 0, 0, $g[11], 300, 160, -12, -6, 24, 12, $g[4], $g[17])
				$g[137].setRounded(2, 2)
				$g[138] = new AnimPipe()
				$g[138].addPoint(250, 120)
				$g[138].addPoint(230, 120)
				$g[139] = new AnimPipe()
				$g[139].addPoint(240, 60)
				$g[139].addPoint(220, 60)
				$g[139].addPoint(220, 83)
				$g[139].addPoint(280, 83)
				$g[139].addPoint(280, 110)
				$g[139].addPoint(260, 110)
				$g[140] = new Rectangle($g[0], $g[21], 0, 0, $g[11], 300, 44, -12, 0, 24, 12, $g[4], $g[17])
				$g[141] = new AnimPipe()
				$g[141].addPoint(385, 240)
				$g[141].addPoint(420, 240)
				$g[142] = new AnimPipe()
				$g[142].addPoint(360, 75)
				$g[142].addPoint(360, 230)
				$g[142].addPoint(375, 230)
				$g[143] = new Rectangle($g[0], $g[21], 0, 0, $g[11], 340, 82, -12, 0, 24, 12, $g[4], $g[17], "R0:0")
				$g[143].setRounded(2, 2)
				$g[144] = new AnimPipe()
				$g[144].addPoint(375, 75)
				$g[144].addPoint(375, 210)
				$g[144].addPoint(420, 210)
				$g[145] = new Rectangle($g[0], $g[21], 0, 0, $g[11], 370, 82, -12, 0, 24, 12, $g[4], $g[17], "R0:0")
				$g[145].setRounded(2, 2)
				$g[146] = new InstructionRegister(390, 350, 20, 85, "EX")
				$g[147] = new Register(420, 190, 20, 40, TOP, "A")
				$g[148] = new Register(420, 230, 20, 40, BOTTOM, "B")
				$g[149] = new Component(500, 180, 10, 50, "mux 6")
				$g[150] = new Component(500, 230, 10, 50, "mux 7")
				$g[151] = new Component(500, 310, 10, 40, "mux 8")
				$g[152] = new ALU(530, 190, 40, 80)
				$g[153] = new AnimPipe()
				$g[153].addPoint(410, 390)
				$g[153].addPoint(610, 390)
				$g[154] = new AnimPipe()
				$g[154].addPoint(610, 210)
				$g[154].addPoint(610, 170)
				$g[154].addPoint(470, 170)
				$g[154].addPoint(470, 190)
				$g[154].addPoint(500, 190)
				$g[155] = new AnimPipe()
				$g[155].addPoint(710, 210)
				$g[155].addPoint(710, 160)
				$g[155].addPoint(460, 160)
				$g[155].addPoint(460, 200)
				$g[155].addPoint(500, 200)
				$g[156] = new AnimPipe()
				$g[156].addPoint(440, 220)
				$g[156].addPoint(500, 220)
				$g[157] = new AnimPipe()
				$g[157].addPoint(440, 240)
				$g[157].addPoint(500, 240)
				$g[158] = new AnimPipe()
				$g[158].addPoint(410, 390)
				$g[158].addPoint(450, 390)
				$g[158].addPoint(450, 250)
				$g[158].addPoint(500, 250)
				$g[159] = new Rectangle($g[0], $g[21], 0, 0, $g[11], 432, 370, -10, 0, 20, 12, $g[4], $g[17], "IMM")
				$g[159].setRounded(2, 2)
				$g[160] = new AnimPipe()
				$g[160].addPoint(710, 250)
				$g[160].addPoint(710, 300)
				$g[160].addPoint(460, 300)
				$g[160].addPoint(460, 260)
				$g[160].addPoint(500, 260)
				$g[161] = new AnimPipe()
				$g[161].addPoint(610, 250)
				$g[161].addPoint(610, 290)
				$g[161].addPoint(470, 290)
				$g[161].addPoint(470, 270)
				$g[161].addPoint(500, 270)
				$g[162] = new AnimPipe()
				$g[162].addPoint(610, 250)
				$g[162].addPoint(610, 290)
				$g[162].addPoint(470, 290)
				$g[162].addPoint(470, 320)
				$g[162].addPoint(500, 320)
				$g[163] = new AnimPipe()
				$g[163].addPoint(710, 250)
				$g[163].addPoint(710, 300)
				$g[163].addPoint(460, 300)
				$g[163].addPoint(460, 330)
				$g[163].addPoint(500, 330)
				$g[164] = new AnimPipe()
				$g[164].addPoint(435, 270)
				$g[164].addPoint(435, 340)
				$g[164].addPoint(500, 340)
				$g[165] = new AnimPipe()
				$g[165].addPoint(510, 330)
				$g[165].addPoint(600, 330)
				$g[166] = new AnimPipe()
				$g[166].addPoint(510, 205)
				$g[166].addPoint(530, 205)
				$g[167] = new AnimPipe()
				$g[167].addPoint(510, 255)
				$g[167].addPoint(530, 255)
				$g[168] = new AnimPipe()
				$g[168].addPoint(570, 240)
				$g[168].addPoint(600, 240)
				$g[169] = new InstructionRegister(610, 350, 20, 85, "MA")
				$g[170] = new Register(600, 210, 20, 40, TOP, "O0")
				$g[171] = new Register(600, 320, 40, 20, RIGHT, "SMR")
				new Txt($g[0], $g[19], HLEFT|VTOP, 633, 100, 0, $g[17], "memory\naddress")
				new Txt($g[0], $g[19], HLEFT|VTOP, 685, 320, 0, $g[17], "memory\ndata-in")
				new Txt($g[0], $g[19], HLEFT|VTOP, 695, 100, 0, $g[17], "memory\ndata-out")
				new Txt($g[0], 0, HLEFT|VTOP, 645, 35, 0, $g[17], "Data\nCache\n(memory)")
				$g[172] = newArray(4)
				$g[172][0]=new Register(560, 30, 40, 20, LEFT, "M0")
				$g[172][1]=new Register(560, 50, 40, 20, LEFT, "M1")
				$g[172][2]=new Register(600, 30, 40, 20, RIGHT, "M2")
				$g[172][3]=new Register(600, 50, 40, 20, RIGHT, "M3")
				$g[173] = new Stack(760, 60)
				$g[174] = new Component(670, 210, 10, 40, "mux 9")
				$g[175] = new AnimPipe()
				$g[175].addPoint(630, 390)
				$g[175].addPoint(700, 390)
				$g[176] = new AnimPipe()
				$g[176].addPoint(620, 230)
				$g[176].addPoint(670, 230)
				$g[177] = new AnimPipe()
				$g[177].addPoint(680, 230)
				$g[177].addPoint(700, 230)
				$g[178] = new AnimPipe()
				$g[178].addPoint(620, 230)
				$g[178].addPoint(630, 230)
				$g[178].addPoint(630, 110)
				$g[178].addPoint(760, 110)
				$g[179] = new AnimPipe()
				$g[179].addPoint(640, 330)
				$g[179].addPoint(760, 330)
				$g[180] = new AnimPipe()
				$g[180].addPoint(760, 90)
				$g[180].addPoint(650, 90)
				$g[180].addPoint(650, 220)
				$g[180].addPoint(670, 220)
				$g[181] = new InstructionRegister(700, 350, 20, 85, "WB")
				$g[182] = new Register(700, 210, 20, 40, TOP, "O1")
				$g[183] = new AnimPipe()
				$g[183].addPoint(720, 230)
				$g[183].addPoint(730, 230)
				$g[183].addPoint(730, 10)
				$g[183].addPoint(470, 10)
				$g[183].addPoint(470, 25)
				$g[152].txtResult.moveToFront()
				resetCircuit()
				$g[186] = ""
				$g[184]=0
				$pc = 7
			case 7:
				if (!($g[184]<32)) {
					$pc = 9
					continue
				}
				$g[77].setOpcode(4*$g[184], 0)
				$pc = 8
			case 8:
				$g[184]++
				$pc = 7
				continue
			case 9:
				$g[184]=0
				$pc = 10
			case 10:
				if (!($g[184]<4)) {
					$pc = 12
					continue
				}
				$g[186]=sprintf("r%d", $g[184])
				$g[101][$g[184]].setValue(getArgAsNum($g[186], 0))
				$pc = 11
			case 11:
				$g[184]++
				$pc = 10
				continue
			case 12:
				$g[184]=0
				$pc = 13
			case 13:
				if (!($g[184]<4)) {
					$pc = 15
					continue
				}
				$g[186]=sprintf("m%d", $g[184])
				$g[172][$g[184]].setValue(getArgAsNum($g[186], 0))
				$pc = 14
			case 14:
				$g[184]++
				$pc = 13
				continue
			case 15:
				setTPS(20)
				$g[16]=getArgAsNum("example", 0)
				if (!($g[16]==0)) {
					$pc = 19
					continue
				}
				$g[184]=0
				$pc = 16
			case 16:
				if (!($g[184]<32)) {
					$pc = 18
					continue
				}
				$g[186]=sprintf("i%d", $g[184])
				$g[77].setOpcode(4*$g[184], getArgAsNum($g[186], 0))
				$pc = 17
			case 17:
				$g[184]++
				$pc = 16
				continue
			case 18:
				$pc = 29
				continue
			case 19:
				if (!($g[16]==1)) {
					$pc = 20
					continue
				}
				$g[77].setValue(0, ADDi, 12, 0, 4)
				$g[77].setValue(4, ADDi, 13, 0, 5)
				$g[77].setValue(8, ST, 12, 2, 0)
				$g[77].setValue(12, SUBi, 2, 2, 4)
				$g[77].setValue(16, JAL, 1, 0, 16)
				$g[77].setValue(20, XOR, 0, 0, 0)
				$g[77].setValue(24, HALT, 0, 0, 0)
				$g[77].setValue(32, ST, 1, 2, 0)
				$g[77].setValue(36, ADD, 8, 0, 2)
				$g[77].setValue(40, SUBi, 2, 2, 4)
				$g[77].setValue(44, SUB, 10, 12, 13)
				$g[77].setValue(48, SUBi, 2, 2, 4)
				$g[77].setValue(52, SUBi, 2, 2, 4)
				$g[77].setValue(56, JAL, 1, 0, 24)
				$g[77].setValue(60, LD, 1, 8, 0)
				$g[77].setValue(64, ADDi, 2, 2, 12)
				$g[77].setValue(68, JALR, 0, 0, 1)
				$g[77].setValue(80, ST, 1, 2, 0)
				$g[77].setValue(84, ADD, 9, 0, 2)
				$g[77].setValue(88, SUBi, 2, 2, 4)
				$g[77].setValue(92, ST, 8, 2, 0)
				$g[77].setValue(96, SUBi, 2, 2, 4)
				$g[77].setValue(100, ADD, 8, 0, 9)
				$g[77].setValue(104, LD, 1, 8, 0)
				$g[77].setValue(108, LD, 8, 8, -4)
				$g[77].setValue(112, ADDi, 2, 2, 8)
				$g[77].setValue(116, JALR, 0, 0, 1)
				$pc = 28
				continue
			case 20:
				if (!($g[16]==2)) {
					$pc = 21
					continue
				}
				$g[77].setValue(0, ADDi, 2, 0, 4)
				$pc = 27
				continue
			case 21:
				if (!($g[16]==3)) {
					$pc = 22
					continue
				}
				$g[77].setValue(0, ADD, 1, 1, 2)
				$g[77].setValue(4, ADD, 2, 1, 2)
				$g[77].setValue(8, ADD, 1, 1, 2)
				$g[77].setValue(12, ADD, 2, 1, 2)
				$g[77].setValue(16, ADD, 1, 1, 2)
				$g[77].setValue(20, HALT, 0, 0, 0)
				$g[101][1].setValue(1)
				$g[101][2].setValue(2)
				setTPS(50)
				$pc = 26
				continue
			case 22:
				if (!($g[16]==4)) {
					$pc = 23
					continue
				}
				$g[77].setValue(0, ADDi, 1, 0, 13)
				$g[77].setValue(4, ADDi, 2, 0, 4)
				$g[77].setValue(8, DIV, 3, 1, 2)
				$pc = 25
				continue
			case 23:
				if (!($g[16]==5)) {
					$pc = 24
					continue
				}
				$g[77].setValue(0, ADDi, 1, 0, 3)
				$g[77].setValue(4, ADDi, 2, 0, 2)
				$g[77].setValue(8, MUL, 3, 1, 2)
				$pc = 24
			case 24:
				$pc = 25
			case 25:
				$pc = 26
			case 26:
				$pc = 27
			case 27:
				$pc = 28
			case 28:
				$pc = 29
			case 29:
				if (!($g[16]>0)) {
					$pc = 33
					continue
				}
				$g[184]=0
				$pc = 30
			case 30:
				if (!($g[184]<32)) {
					$pc = 32
					continue
				}
				$g[186]=sprintf("i%d", $g[184])
				setArg($g[186], $g[77].getOpcode($g[184]*4).toString())
				$pc = 31
			case 31:
				$g[184]++
				$pc = 30
				continue
			case 32:
				$g[16]=($g[16]>maxexample) ? 0 : $g[16]
				$pc = 33
			case 33:
				$g[187] = getArgAsNum("haltOnHalt", 1)
				$g[29]=getArgAsNum("bpMode", 0)
				setBPMode($g[29])
				$g[30]=getArgAsNum("liMode", 0)
				setLIMode($g[30])
				$g[31]=getArgAsNum("afMode", 0)
				setAFMode($g[31])
				$g[32]=getArgAsNum("sfMode", 0)
				setSFMode($g[32])
				$g[33]=getArgAsNum("zfMode", 0)
				setZFMode($g[33])
				$g[28]=getArgAsNum("peMode", 0)
				setPEMode($g[28])
				$g[24]=getArgAsNum("locked", 0)
				$g[101][2].setValue(68)
				$g[173].setSP(68)
				$g[194] = 1
				$g[195] = 0
				$g[196] = 0
				$g[197] = 0
				$g[198] = 1
				$g[199] = CHECK
				$g[201] = 0
				$g[202] = 0
				$g[208] = 1
				$g[65].label.addEventHandler("eventMB", this, $eh12)
				$g[66].label.addEventHandler("eventMB", this, $eh13)
				$g[67].label.addEventHandler("eventMB", this, $eh14)
				$g[68].label.addEventHandler("eventMB", this, $eh15)
				$g[69].label.addEventHandler("eventMB", this, $eh16)
				$g[70].label.addEventHandler("eventMB", this, $eh17)
				$g[71].label.addEventHandler("eventMB", this, $eh18)
				$g[64].label.addEventHandler("eventMB", this, $eh19)
				$g[72].addEventHandler("eventMB", this, $eh20)
				$g[56].addEventHandler("eventMB", this, $eh21)
				$g[76].addEventHandler("eventEE", this, $eh22)
				$g[76].addEventHandler("eventMB", this, $eh23)
				callf(371, $obj)
				continue
			case 34:
				returnf(0)
				continue
			case 35:
				enterf(0);	// update
				$obj.vIns=$obj.nIns
				$obj.vRdt=$obj.nRdt
				$obj.vRs1=$obj.nRs1
				$obj.vRs2=$obj.nRs2
				$obj.txt=instrText($obj.vIns, $obj.vRdt, $obj.vRs1, $obj.vRs2)
				$obj.label.setTxt($obj.txt)
				$obj.r2.setBrush($g[13])
				if (wait(16))
				return
				$pc = 36
			case 36:
				$obj.r2.setBrush($g[12])
				returnf(0)
				continue
			case 37:
				enterf(0);	// update
				$obj.value=$obj.newValue
				$obj.tag=$obj.newTag
				$obj.updateLabel()
				$obj.bg1.setBrush($g[13])
				$obj.bg2.setBrush($g[13])
				if (wait(16))
				return
				$pc = 38
			case 38:
				$obj.bg1.setBrush($g[12])
				$obj.bg2.setBrush($g[12])
				returnf(0)
				continue
			case 39:
				enterf(1);	// store
				$stack[$fp+1] = floor(($stack[$fp-3]/4))%MEMORY_ADDRESSES
				$obj.stack[$stack[$fp+1]].setNewValue($stack[$fp-4])
				callf(37, $obj.stack[$stack[$fp+1]])
				continue
			case 40:
				returnf(2)
				continue
			case 41:
				enterf(5);	// animate
				$stack[$fp+1] = 0, $stack[$fp+3] = 0
				$stack[$fp+4] = 0
				$obj.calcLength()
				$obj.fgLine.setPt(0, $obj.px[0], $obj.py[0])
				$obj.fgLine.setPen($obj.fgPen0)
				$stack[$fp+5] = 1
				$pc = 42
			case 42:
				if (!($stack[$fp+5]<$obj.n)) {
					$pc = 45
					continue
				}
				$obj.fgLine.setPt($stack[$fp+5], $obj.px[$stack[$fp+5]-1], $obj.py[$stack[$fp+5]-1])
				$stack[$fp+1]+=$obj.ls[$stack[$fp+5]-1]
				$stack[$fp+2]=round($stack[$fp+1]*$stack[$fp-3]/$obj.ll)
				if ($obj.fgLine.setPt($stack[$fp+5], $obj.px[$stack[$fp+5]], $obj.py[$stack[$fp+5]], $stack[$fp+2]-$stack[$fp+3], 1, 1))
				return
				$pc = 43
			case 43:
				$stack[$fp+3]=$stack[$fp+2]
				$pc = 44
			case 44:
				$stack[$fp+5]++
				$pc = 42
				continue
			case 45:
				if (!($obj.head)) {
					$pc = 46
					continue
				}
				$obj.fgLine.setPen($obj.fgPen1)
				$pc = 46
			case 46:
				returnf(1)
				continue
			case 47:
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
				$pc = 48
			case 48:
				$obj.prev_clock.translate(-$obj.chw, 0, $stack[$fp+1], 1, 0)
				$obj.next_clock.translate(-$obj.chw, 0, $stack[$fp+1], 1, 0)
				$obj.dot.translate(0, $obj.ch, $stack[$fp+2], 1, 0)
				if (wait($stack[$fp+3]))
				return
				$pc = 49
			case 49:
				$obj.canUpdate=1
				$obj.prev_clock.translate(2*$obj.cw, 0)
				$obj.prev_clock.setPen($obj.stall ? ($obj.type ? $g[51] : $g[49]) : $g[50])
				if (wait($stack[$fp+2]*2))
				return
				$pc = 50
			case 50:
				$stack[$fp+4] = $obj.next_clock
				$obj.next_clock=$obj.prev_clock
				$obj.prev_clock=$stack[$fp+4]
				if (!($obj.stall)) {
					$pc = 51
					continue
				}
				$obj.stall--
				$pc = 51
			case 51:
				returnf(1)
				continue
			case 52:
				enterf(0);	// ifExec
				if (!(($g[25]==NO_STALL) || ($g[25]==CTRL_STALL))) {
					$pc = 53
					continue
				}
				fork(37, $g[79])
				$g[77].setActive($g[79].newValue)
				$pc = 53
			case 53:
				if (wait(8))
				return
				$pc = 54
			case 54:
				if (!(($g[29]==BRANCH_PREDICTION) && (btbIndex($g[79].value)!=-1))) {
					$pc = 55
					continue
				}
				$g[26]=btbIndex($g[79].value)
				$g[79].setNewValue($g[82][$g[26]].value)
				$g[188]=$g[90]
				$pc = 56
				continue
			case 55:
				$g[79].setNewValue(($g[79].value+4)&127)
				$g[188]=$g[92]
				$pc = 56
			case 56:
				$g[100].setNewValue($g[79].value)
				$g[99].setNewInstruction($g[77].instruction[$g[79].value/4])
				if (wait(8))
				return
				$pc = 57
			case 57:
				fork(41, $g[96], 64)
				fork(41, $g[88], 24)
				fork(41, $g[95], 24)
				if (!(($g[29]==BRANCH_PREDICTION) && (instrIsJump($g[99].vIns)))) {
					$pc = 63
					continue
				}
				if (!($g[25]==CTRL_STALL)) {
					$pc = 59
					continue
				}
				callf(41, $g[94], 12)
				continue
			case 58:
				$pc = 61
				continue
			case 59:
				callf(41, $g[119], 12)
				continue
			case 60:
				$pc = 61
			case 61:
				callf(41, $g[97], 12)
				continue
			case 62:
				$pc = 65
				continue
			case 63:
				if (wait(24))
				return
				$pc = 64
			case 64:
				$pc = 65
			case 65:
				fork(41, $g[86], 40)
				if (!(($g[29]==BRANCH_PREDICTION) && (btbIndex($g[79].value)!=-1))) {
					$pc = 66
					continue
				}
				$g[81][btbIndex($g[79].value)].highlight($g[23])
				$g[82][btbIndex($g[79].value)].highlight($g[23])
				$pc = 66
			case 66:
				$g[87].setTxt($g[99].getNewInstrTxt())
				if ($g[87].setOpacity(1, 16, 1, 1))
				return
				$pc = 67
			case 67:
				callf(41, $g[188], 16)
				continue
			case 68:
				callf(41, $g[93], 8)
				continue
			case 69:
				returnf(0)
				continue
			case 70:
				enterf(0);	// sendBTBOperands
				callf(41, $g[190], 18)
				continue
			case 71:
				callf(41, $g[138], 6)
				continue
			case 72:
				returnf(0)
				continue
			case 73:
				enterf(1);	// idExec
				if (!($g[25]==NO_STALL)) {
					$pc = 74
					continue
				}
				fork(37, $g[100])
				fork(35, $g[99])
				$pc = 74
			case 74:
				if (!($g[197]==1)) {
					$pc = 75
					continue
				}
				$g[99].setNewValue(STALL, 0, 0, 0)
				$g[197]=0
				$pc = 75
			case 75:
				if (!($g[27] && ($g[29]==BRANCH_PREDICTION))) {
					$pc = 76
					continue
				}
				fork(37, $g[81][$g[26]])
				fork(37, $g[82][$g[26]])
				$pc = 76
			case 76:
				if (wait(16))
				return
				$pc = 77
			case 77:
				fork(41, $g[98], 64)
				if (!(instrIsBranch($g[99].vIns))) {
					$pc = 83
					continue
				}
				fork(41, $g[121], 16)
				fork(41, $g[123], 16)
				fork(41, $g[122], 16)
				fork(41, $g[124], 16)
				fork(41, $g[144], 16)
				fork(41, $g[142], 16)
				if (wait(12))
				return
				$pc = 78
			case 78:
				$g[125].setTxt("%02X", $g[99].vRs2)
				$g[125].setOpacity(1)
				if (wait(4))
				return
				$pc = 79
			case 79:
				fork(41, $g[126], 8)
				fork(41, $g[128], 8)
				if (wait(2))
				return
				$pc = 80
			case 80:
				fork(41, $g[132], 8)
				$g[101][$g[99].vRs1].highlight($g[23])
				$g[147].setNewValue($g[101][$g[99].vRs1].value)
				$g[101][$g[99].vRdt].highlight($g[23])
				$g[148].setNewValue($g[101][$g[99].vRdt].value)
				fork(41, $g[141], 5)
				if (wait(4))
				return
				$pc = 81
			case 81:
				$g[135].setNewValue($g[100].value+$g[99].vRs2)
				callf(37, $g[135])
				continue
			case 82:
				$pc = 98
				continue
			case 83:
				if (!(isJorJAL($g[99].vIns))) {
					$pc = 92
					continue
				}
				if (!($g[99].vIns==JAL)) {
					$pc = 84
					continue
				}
				fork(41, $g[121], 16)
				fork(41, $g[123], 16)
				$pc = 84
			case 84:
				if (!($g[25]==NO_STALL)) {
					$pc = 89
					continue
				}
				fork(41, $g[122], 16)
				fork(41, $g[124], 16)
				if (wait(12))
				return
				$pc = 85
			case 85:
				$g[125].setTxt("%02X", $g[99].vRs2)
				$g[125].setOpacity(1)
				if (wait(4))
				return
				$pc = 86
			case 86:
				fork(41, $g[128], 8)
				if (wait(2))
				return
				$pc = 87
			case 87:
				callf(41, $g[129], 8)
				continue
			case 88:
				$pc = 91
				continue
			case 89:
				if (wait(24))
				return
				$pc = 90
			case 90:
				$pc = 91
			case 91:
				$pc = 97
				continue
			case 92:
				if (!($g[99].vIns==JALR)) {
					$pc = 94
					continue
				}
				fork(41, $g[121], 32)
				fork(41, $g[123], 32)
				if (wait(24))
				return
				$pc = 93
			case 93:
				$pc = 96
				continue
			case 94:
				if (wait(24))
				return
				$pc = 95
			case 95:
				$pc = 96
			case 96:
				$pc = 97
			case 97:
				$pc = 98
			case 98:
				if (wait(9))
				return
				$pc = 99
			case 99:
				if (!(instrIsJump($g[99].vIns) || instrIsBranch($g[146].vIns))) {
					$pc = 100
					continue
				}
				calcNewPC()
				$pc = 100
			case 100:
				if (!(instrIsJumpR($g[99].vIns) && ($g[25]==NO_STALL))) {
					$pc = 101
					continue
				}
				$g[140].setTxt("%02X", $g[192])
				$g[140].setOpacity(1, 8, 1, 0)
				$pc = 101
			case 101:
				if (!(instrIsBranchOrJump($g[99].vIns))) {
					$pc = 102
					continue
				}
				fork(70, $obj)
				$pc = 102
			case 102:
				detectStall()
				$g[196]=0
				if (!((instrIsJump($g[99].vIns) || instrIsBranch($g[146].vIns)) && ($g[25]!=DATA_STALL))) {
					$pc = 103
					continue
				}
				updBTB()
				$pc = 103
			case 103:
				if (!($g[25]==NO_STALL)) {
					$pc = 104
					continue
				}
				$g[146].setNewValue($g[99].vIns, $g[99].vRdt, $g[99].vRs1, $g[99].vRs2)
				$pc = 106
				continue
			case 104:
				if (!($g[197]==0 && $g[201]==0)) {
					$pc = 105
					continue
				}
				$g[146].setNewValue(STALL, 0, 0, 0)
				$pc = 105
			case 105:
				$pc = 106
			case 106:
				if (wait(7))
				return
				$pc = 107
			case 107:
				if (!(instrIsBranch($g[99].vIns)==0)) {
					$pc = 124
					continue
				}
				if (!(instrOpTypeRdt($g[99].vIns)==OP_TYPE_REG)) {
					$pc = 123
					continue
				}
				if (!(instrIsJumpAndLink($g[99].vIns))) {
					$pc = 114
					continue
				}
				if (!($g[25]==NO_STALL)) {
					$pc = 110
					continue
				}
				$g[147].setNewValue(0)
				$g[148].setNewValue(($g[100].value+4)&127)
				callf(41, $g[120], 18)
				continue
			case 108:
				callf(41, $g[141], 6)
				continue
			case 109:
				$pc = 113
				continue
			case 110:
				$g[147].setNewValue(0)
				$g[148].setNewValue(($g[100].value+$g[99].vRs2)&127)
				callf(41, $g[131], 18)
				continue
			case 111:
				callf(41, $g[141], 6)
				continue
			case 112:
				$pc = 113
			case 113:
				$pc = 122
				continue
			case 114:
				$g[101][$g[99].vRs1].highlight($g[23])
				$g[147].setNewValue($g[101][$g[99].vRs1].value)
				if (!(instrOpTypeRs2($g[99].vIns)==OP_TYPE_REG)) {
					$pc = 115
					continue
				}
				$g[101][$g[99].vRs2].highlight($g[23])
				$g[148].setNewValue($g[101][$g[99].vRs2].value)
				$pc = 116
				continue
			case 115:
				$g[101][$g[99].vRdt].highlight($g[23])
				$g[148].setNewValue($g[101][$g[99].vRdt].value)
				$pc = 116
			case 116:
				$g[145].setTxt("R%d:%02X", $g[99].vRs1, $g[101][$g[99].vRs1].value)
				$g[145].setOpacity(1)
				fork(41, $g[144], 5)
				if (!(instrIsBranch($g[99].vIns))) {
					$pc = 118
					continue
				}
				fork(41, $g[142], 5)
				callf(41, $g[141], 5)
				continue
			case 117:
				$pc = 118
			case 118:
				if (!((!instrIsArRI($g[99].vIns)) && ($g[99].vIns!=LD))) {
					$pc = 121
					continue
				}
				$stack[$fp+1] = ($g[99].vIns==ST) ? $g[99].vRdt : $g[99].vRs2
				$g[143].setTxt("R%d:%02X", $stack[$fp+1], $g[101][$stack[$fp+1]].value)
				$g[143].setOpacity(1)
				callf(41, $g[142], 18)
				continue
			case 119:
				callf(41, $g[141], 6)
				continue
			case 120:
				$pc = 121
			case 121:
				$pc = 122
			case 122:
				$pc = 123
			case 123:
				$pc = 124
			case 124:
				returnf(0)
				continue
			case 125:
				enterf(7);	// exExec
				fork(35, $g[146])
				if (!(!instrIsNop($g[146].nIns))) {
					$pc = 126
					continue
				}
				fork(37, $g[147])
				fork(37, $g[148])
				$pc = 126
			case 126:
				if (wait(8))
				return
				$pc = 127
			case 127:
				$g[169].setNewValue($g[146].vIns, $g[146].vRdt, $g[146].vRs1, $g[146].vRs2)
				if (!(instrOpTypeRdt($g[146].vIns)==OP_TYPE_REG)) {
					$pc = 199
					continue
				}
				if (!(instrIsMulti($g[146].vIns))) {
					$pc = 137
					continue
				}
				if (!($g[146].vIns==MUL)) {
					$pc = 129
					continue
				}
				$g[201]=1
				if (!($g[198]==0)) {
					$pc = 128
					continue
				}
				$stack[$fp+1]=0
				$pc = 128
			case 128:
				$pc = 136
				continue
			case 129:
				if (!($g[198]==0)) {
					$pc = 135
					continue
				}
				if (!($g[199]==CHECK)) {
					$pc = 130
					continue
				}
				$stack[$fp+1]=$g[154]
				$stack[$fp+4]=$g[170].value
				$pc = 134
				continue
			case 130:
				if (!($g[199]==EXEC)) {
					$pc = 133
					continue
				}
				if (!($g[202]==0)) {
					$pc = 131
					continue
				}
				$stack[$fp+1]=$g[155]
				$stack[$fp+4]=$g[182].value
				$pc = 132
				continue
			case 131:
				$stack[$fp+1]=0
				$pc = 132
			case 132:
				$pc = 133
			case 133:
				$pc = 134
			case 134:
				$pc = 135
			case 135:
				$pc = 136
			case 136:
				$pc = 137
			case 137:
				if (!(instrIsJumpAndLink($g[146].vIns))) {
					$pc = 138
					continue
				}
				$stack[$fp+1]=0
				$stack[$fp+4]=0
				$pc = 147
				continue
			case 138:
				if (!($g[31]==ALU_FORWARDING)) {
					$pc = 144
					continue
				}
				if (!(!(instrIsMulti($g[146].vIns) && $g[198]==0))) {
					$pc = 143
					continue
				}
				if (!($g[170].tagMatches($g[146].vRs1))) {
					$pc = 139
					continue
				}
				$stack[$fp+1]=$g[154]
				$stack[$fp+4]=$g[170].value
				$pc = 142
				continue
			case 139:
				if (!($g[182].tagMatches($g[146].vRs1))) {
					$pc = 140
					continue
				}
				$stack[$fp+1]=$g[155]
				$stack[$fp+4]=$g[182].value
				$pc = 141
				continue
			case 140:
				$stack[$fp+1]=$g[156]
				$stack[$fp+4]=$g[147].value
				$pc = 141
			case 141:
				$pc = 142
			case 142:
				$pc = 143
			case 143:
				$pc = 146
				continue
			case 144:
				if (!(!(instrIsMulti($g[146].vIns) && $g[198]==0))) {
					$pc = 145
					continue
				}
				$stack[$fp+1]=$g[156]
				$stack[$fp+4]=$g[147].value
				$pc = 145
			case 145:
				$pc = 146
			case 146:
				$pc = 147
			case 147:
				if (!(instrIsJumpAndLink($g[146].vIns))) {
					$pc = 148
					continue
				}
				$stack[$fp+2]=$g[157]
				$stack[$fp+5]=$g[148].value
				$pc = 167
				continue
			case 148:
				if (!(instrOpTypeRs2($g[146].vIns)==OP_TYPE_IMM)) {
					$pc = 157
					continue
				}
				if (!(instrIsBranch($g[146].vIns))) {
					$pc = 155
					continue
				}
				if (!($g[31]==ALU_FORWARDING)) {
					$pc = 153
					continue
				}
				if (!($g[170].tagMatches($g[146].vRdt))) {
					$pc = 149
					continue
				}
				$stack[$fp+2]=$g[161]
				$stack[$fp+5]=$g[170].value
				$pc = 152
				continue
			case 149:
				if (!($g[182].tagMatches($g[146].vRdt))) {
					$pc = 150
					continue
				}
				$stack[$fp+2]=$g[160]
				$stack[$fp+5]=$g[182].value
				$pc = 151
				continue
			case 150:
				$stack[$fp+2]=$g[157]
				$stack[$fp+5]=$g[148].value
				$pc = 151
			case 151:
				$pc = 152
			case 152:
				$pc = 154
				continue
			case 153:
				$stack[$fp+2]=$g[157]
				$stack[$fp+5]=$g[148].value
				$pc = 154
			case 154:
				$pc = 156
				continue
			case 155:
				$stack[$fp+2]=$g[158]
				$stack[$fp+5]=$g[146].vRs2
				$pc = 156
			case 156:
				$pc = 166
				continue
			case 157:
				if (!($g[31]==ALU_FORWARDING)) {
					$pc = 163
					continue
				}
				if (!(!(instrIsMulti($g[146].vIns) && $g[198]==0))) {
					$pc = 162
					continue
				}
				if (!($g[170].tagMatches($g[146].vRs2))) {
					$pc = 158
					continue
				}
				$stack[$fp+2]=$g[161]
				$stack[$fp+5]=$g[170].value
				$pc = 161
				continue
			case 158:
				if (!($g[182].tagMatches($g[146].vRs2))) {
					$pc = 159
					continue
				}
				$stack[$fp+2]=$g[160]
				$stack[$fp+5]=$g[182].value
				$pc = 160
				continue
			case 159:
				$stack[$fp+2]=$g[157]
				$stack[$fp+5]=$g[148].value
				$pc = 160
			case 160:
				$pc = 161
			case 161:
				$pc = 162
			case 162:
				$pc = 165
				continue
			case 163:
				if (!(!(instrIsMulti($g[146].vIns) && $g[198]==0))) {
					$pc = 164
					continue
				}
				$stack[$fp+2]=$g[157]
				$stack[$fp+5]=$g[148].value
				$pc = 164
			case 164:
				$pc = 165
			case 165:
				$pc = 166
			case 166:
				$pc = 167
			case 167:
				$stack[$fp+6] = 0
				if (!(instrIsMulti($g[146].vIns))) {
					$pc = 186
					continue
				}
				if (!($g[146].vIns==MUL)) {
					$pc = 175
					continue
				}
				if (!($g[198]==1)) {
					$pc = 170
					continue
				}
				if (!(($stack[$fp+4]>15) || ($stack[$fp+5]>15))) {
					$pc = 168
					continue
				}
				$g[209]=0
				$pc = 169
				continue
			case 168:
				$g[209]=1
				$pc = 169
			case 169:
				$g[116].setPen($g[112])
				$g[205]=$stack[$fp+4]
				$g[206]=0
				$g[207]=$stack[$fp+5]
				calcNoCycles($stack[$fp+4])
				$g[198]=0
				$g[204]=0
				$stack[$fp+6]=$stack[$fp+4]
				$pc = 174
				continue
			case 170:
				if (!($g[209]==1)) {
					$pc = 171
					continue
				}
				booth()
				$stack[$fp+6]=$g[205]
				$pc = 172
				continue
			case 171:
				booth8()
				$stack[$fp+6]=$g[205]
				$pc = 172
			case 172:
				$g[203]--
				if (!($g[203]<=0)) {
					$pc = 173
					continue
				}
				$g[201]=0
				$pc = 173
			case 173:
				$pc = 174
			case 174:
				$pc = 185
				continue
			case 175:
				if (!($g[198]==1)) {
					$pc = 176
					continue
				}
				$g[116].setPen($g[112])
				$g[205]=0
				$g[207]=$stack[$fp+5]
				$stack[$fp+6]=$stack[$fp+4]
				$g[198]=0
				$g[201]=1
				$g[199]=CHECK
				$pc = 184
				continue
			case 176:
				if (!($g[202]==0)) {
					$pc = 181
					continue
				}
				if (!($g[199]==CHECK)) {
					$pc = 179
					continue
				}
				$stack[$fp+6]=instrExecute(SLT, $stack[$fp+4], $g[207])
				if (!($stack[$fp+6]==1)) {
					$pc = 178
					continue
				}
				$g[202]=1
				if (!($g[146].vIns==REM)) {
					$pc = 177
					continue
				}
				$g[201]=0
				$pc = 177
			case 177:
				$pc = 178
			case 178:
				$g[199]=EXEC
				$pc = 180
				continue
			case 179:
				$stack[$fp+6]=instrExecute(SUB, $stack[$fp+4], $g[207])
				$g[199]=CHECK
				$g[205]+=1
				$pc = 180
			case 180:
				$pc = 183
				continue
			case 181:
				if (!($g[146].vIns==DIV)) {
					$pc = 182
					continue
				}
				$stack[$fp+6]=$g[205]
				$pc = 182
			case 182:
				$g[201]=0
				$pc = 183
			case 183:
				$pc = 184
			case 184:
				$pc = 185
			case 185:
				$pc = 187
				continue
			case 186:
				$stack[$fp+6]=instrExecute($g[146].vIns, $stack[$fp+4], $stack[$fp+5])
				$pc = 187
			case 187:
				if (!(($g[146].vRdt==0)&(instrIsBranch($g[146].vIns)==0))) {
					$pc = 188
					continue
				}
				$stack[$fp+6]=0
				$pc = 188
			case 188:
				if (!(instrIsBranch($g[146].vIns)==0)) {
					$pc = 189
					continue
				}
				$g[170].setNewValue($stack[$fp+6])
				$g[196]=0
				$pc = 190
				continue
			case 189:
				$g[196]=$stack[$fp+6]
				$pc = 190
			case 190:
				if (!(instrIsLoadOrStore($g[146].vIns))) {
					$pc = 191
					continue
				}
				$g[170].setNewTag(-1)
				$pc = 198
				continue
			case 191:
				if (!(($g[146].vIns==DIV || $g[146].vIns==REM) && $g[198]==0)) {
					$pc = 196
					continue
				}
				if (!($g[199]==EXEC)) {
					$pc = 194
					continue
				}
				if (!($g[202]==0)) {
					$pc = 192
					continue
				}
				$g[170].setNewTag(0)
				$pc = 193
				continue
			case 192:
				$g[170].setNewTag($g[146].vRdt)
				$pc = 193
			case 193:
				$pc = 195
				continue
			case 194:
				$g[170].setNewTag($g[146].vRdt)
				$pc = 195
			case 195:
				$pc = 197
				continue
			case 196:
				$g[170].setNewTag($g[146].vRdt)
				$pc = 197
			case 197:
				$pc = 198
			case 198:
				$g[170].setInvalid(0)
				$pc = 201
				continue
			case 199:
				if (!($g[146].vIns==NOP)) {
					$pc = 200
					continue
				}
				$g[170].setInvalid(1)
				$g[170].updateLabel()
				$pc = 200
			case 200:
				$pc = 201
			case 201:
				if (!($g[146].vIns==ST)) {
					$pc = 208
					continue
				}
				if (!($g[32]==FORWARDING_TO_SMDR)) {
					$pc = 206
					continue
				}
				if (!($g[170].tagMatches($g[146].vRdt))) {
					$pc = 202
					continue
				}
				$stack[$fp+3]=$g[162]
				$g[171].setNewValue($g[170].value)
				$pc = 205
				continue
			case 202:
				if (!($g[182].tagMatches($g[146].vRdt))) {
					$pc = 203
					continue
				}
				$stack[$fp+3]=$g[163]
				$g[171].setNewValue($g[182].value)
				$pc = 204
				continue
			case 203:
				$stack[$fp+3]=$g[164]
				$g[171].setNewValue($g[148].value)
				$pc = 204
			case 204:
				$pc = 205
			case 205:
				$pc = 207
				continue
			case 206:
				$stack[$fp+3]=$g[164]
				$g[171].setNewValue($g[148].value)
				$pc = 207
			case 207:
				$pc = 208
			case 208:
				if (wait(8))
				return
				$pc = 209
			case 209:
				fork(41, $g[153], 64)
				if (!($g[146].vIns==ST)) {
					$pc = 210
					continue
				}
				fork(41, $stack[$fp+3], 24)
				$pc = 210
			case 210:
				if (!(instrOpTypeRdt($g[146].vIns)==OP_TYPE_REG)) {
					$pc = 213
					continue
				}
				if (!($stack[$fp+1]!=0)) {
					$pc = 211
					continue
				}
				fork(41, $stack[$fp+1], 24)
				$pc = 211
			case 211:
				if (!($stack[$fp+2]==$g[158])) {
					$pc = 212
					continue
				}
				$g[159].setTxt("%02X", $stack[$fp+5])
				$g[159].setOpacity(1)
				$pc = 212
			case 212:
				fork(41, $stack[$fp+2], 24)
				$pc = 213
			case 213:
				if (wait(24))
				return
				$pc = 214
			case 214:
				if (!($g[146].vIns==ST)) {
					$pc = 215
					continue
				}
				fork(41, $g[165], 40)
				$pc = 215
			case 215:
				if (!(instrOpTypeRdt($g[146].vIns)==OP_TYPE_REG)) {
					$pc = 231
					continue
				}
				if (!($g[146].vIns==MUL)) {
					$pc = 216
					continue
				}
				$g[152].txtOp.setTxt($g[203].toString())
				$g[152].txtOp.setOpacity(1)
				$pc = 217
				continue
			case 216:
				$g[152].setTxtOp($g[146].vIns)
				$pc = 217
			case 217:
				if (!($stack[$fp+1]!=0)) {
					$pc = 218
					continue
				}
				fork(41, $g[166], 10)
				$pc = 218
			case 218:
				if (!(instrIsMulti($g[146].vIns) && $g[198]==1)) {
					$pc = 220
					continue
				}
				if (!($g[146].vIns==MUL)) {
					$pc = 219
					continue
				}
				$g[198]=0
				$pc = 219
			case 219:
				$pc = 222
				continue
			case 220:
				if (!(!instrIsMulti($g[146].vIns))) {
					$pc = 221
					continue
				}
				fork(41, $g[167], 10)
				$pc = 221
			case 221:
				$pc = 222
			case 222:
				if (!(instrIsBranch($g[146].vIns))) {
					$pc = 225
					continue
				}
				if (wait(5))
				return
				$pc = 223
			case 223:
				if (!($g[196]==1)) {
					$pc = 224
					continue
				}
				$g[118].setPen($g[112])
				$pc = 224
			case 224:
				$pc = 230
				continue
			case 225:
				if (!((($g[146].vIns==DIV) || ($g[146].vIns==REM)) && ($g[198]==1))) {
					$pc = 226
					continue
				}
				$pc = 226
			case 226:
				if (wait(20))
				return
				$pc = 227
			case 227:
				callf(41, $g[168], 10)
				continue
			case 228:
				if (wait(10))
				return
				$pc = 229
			case 229:
				$g[152].txtResult.setTxt("%02X", $stack[$fp+6])
				$g[152].txtResult.setOpacity(1, 20, 1, 0)
				$pc = 230
			case 230:
				$pc = 231
			case 231:
				if (!($g[146].vIns==JAL)) {
					$pc = 232
					continue
				}
				$stack[$fp+7] = $g[173].spAddr
				$g[173].currFrame++
				$g[173].frames[$g[173].currFrame-1].setStart($stack[$fp+7])
				$g[173].setSP($stack[$fp+7])
				$pc = 232
			case 232:
				if (!($g[146].vIns==JALR)) {
					$pc = 233
					continue
				}
				$g[173].clearFrame()
				$pc = 233
			case 233:
				if (!((instrOpTypeRdt($g[146].vIns)==OP_TYPE_REG) && ($g[146].vIns!=ST) && ($g[146].vIns!=LD))) {
					$pc = 239
					continue
				}
				if (!(($g[146].vRdt==2 && $g[169].vRdt==8) && $g[169].vIns==LD)) {
					$pc = 234
					continue
				}
				$g[195]=1
				$pc = 238
				continue
			case 234:
				if (!($g[146].vRdt==2)) {
					$pc = 235
					continue
				}
				$g[173].setSP($stack[$fp+6])
				$pc = 237
				continue
			case 235:
				if (!($g[146].vRdt==8)) {
					$pc = 236
					continue
				}
				$g[173].setFP($stack[$fp+6])
				$pc = 236
			case 236:
				$pc = 237
			case 237:
				$pc = 238
			case 238:
				$pc = 239
			case 239:
				returnf(0)
				continue
			case 240:
				enterf(1);	// maExec
				fork(35, $g[169])
				if (!(instrOpTypeRdt($g[169].nIns)==OP_TYPE_REG)) {
					$pc = 241
					continue
				}
				fork(37, $g[170])
				$pc = 241
			case 241:
				if (!($g[169].nIns==ST)) {
					$pc = 242
					continue
				}
				fork(37, $g[171])
				$pc = 242
			case 242:
				if (wait(8))
				return
				$pc = 243
			case 243:
				$g[181].setNewValue($g[169].vIns, $g[169].vRdt, $g[169].vRs1, $g[169].vRs2)
				if (!((instrOpTypeRdt($g[169].vIns)==OP_TYPE_REG) && ($g[169].vIns!=ST))) {
					$pc = 248
					continue
				}
				if (!(instrIsAtomic($g[169].vIns)==0)) {
					$pc = 246
					continue
				}
				if (!($g[169].vIns==LD)) {
					$pc = 244
					continue
				}
				$g[182].setNewValue($g[173].getVal($g[170].value))
				$g[182].setNewTag($g[169].vRdt)
				$pc = 245
				continue
			case 244:
				$g[182].setNewValue($g[170].value)
				$g[182].setNewTag($g[170].tag)
				$pc = 245
			case 245:
				$g[182].setInvalid(0)
				$pc = 247
				continue
			case 246:
				$stack[$fp+1] = $g[34].toString()
				sendToMem($stack[$fp+1], ", ", $g[169].vIns.toString(), ", ", $g[170].value.toString(), ", ", $g[171].value.toString())
				$pc = 247
			case 247:
				$pc = 248
			case 248:
				if (wait(8))
				return
				$pc = 249
			case 249:
				fork(41, $g[175], 64)
				if (!($g[169].vIns==ST)) {
					$pc = 252
					continue
				}
				fork(41, $g[179], 24)
				callf(41, $g[178], 24)
				continue
			case 250:
				callf(39, $g[173], $g[170].value, $g[171].value)
				continue
			case 251:
				$pc = 268
				continue
			case 252:
				if (!(instrOpTypeRdt($g[169].vIns)==OP_TYPE_REG)) {
					$pc = 267
					continue
				}
				if (!(instrIsAtomic($g[169].vIns))) {
					$pc = 266
					continue
				}
				if (!($g[169].vIns==LD)) {
					$pc = 258
					continue
				}
				callf(41, $g[178], 24)
				continue
			case 253:
				$g[173].highlight($g[170].value%MEMORY_ADDRESSES)
				callf(41, $g[180], 24)
				continue
			case 254:
				if (!($g[169].vRdt==8)) {
					$pc = 255
					continue
				}
				$g[173].setFP($g[173].getVal($g[170].value))
				$pc = 257
				continue
			case 255:
				if (!($g[169].vRdt==2)) {
					$pc = 256
					continue
				}
				$g[173].setSP($g[173].getVal($g[170].value))
				$pc = 256
			case 256:
				$pc = 257
			case 257:
				$pc = 264
				continue
			case 258:
				callf(41, $g[176], 48)
				continue
			case 259:
				if (!($g[195]==1)) {
					$pc = 263
					continue
				}
				if (!($g[169].vRdt==2)) {
					$pc = 260
					continue
				}
				$g[173].setSP($g[170].value)
				$pc = 262
				continue
			case 260:
				if (!($g[169].vRdt==8)) {
					$pc = 261
					continue
				}
				$g[173].setFP($g[170].value)
				$pc = 261
			case 261:
				$pc = 262
			case 262:
				$g[195]=0
				$pc = 263
			case 263:
				$pc = 264
			case 264:
				callf(41, $g[177], 16)
				continue
			case 265:
				$pc = 266
			case 266:
				$pc = 267
			case 267:
				$pc = 268
			case 268:
				returnf(0)
				continue
			case 269:
				enterf(0);	// wbExec
				fork(35, $g[181])
				if (!((instrOpTypeRdt($g[181].nIns)==OP_TYPE_REG) && ($g[181].nIns!=ST))) {
					$pc = 270
					continue
				}
				fork(37, $g[182])
				$pc = 270
			case 270:
				if (wait(8))
				return
				$pc = 271
			case 271:
				if (!((instrOpTypeRdt($g[181].vIns)==OP_TYPE_REG) && ($g[181].vIns!=ST))) {
					$pc = 277
					continue
				}
				if (!($g[182].tag!=0)) {
					$pc = 272
					continue
				}
				$g[101][$g[182].tag].setNewValue($g[182].value)
				$pc = 272
			case 272:
				if (wait(8))
				return
				$pc = 273
			case 273:
				callf(41, $g[183], 24)
				continue
			case 274:
				callf(37, $g[101][$g[182].tag])
				continue
			case 275:
				if (wait(19))
				return
				$pc = 276
			case 276:
				$pc = 279
				continue
			case 277:
				if (wait(67))
				return
				$pc = 278
			case 278:
				$pc = 279
			case 279:
				if (!($g[181].vIns!=STALL && $g[181].vIns!=EMPTY)) {
					$pc = 280
					continue
				}
				$g[36]++
				$g[74].setTxt("%4d", $g[36])
				$pc = 280
			case 280:
				$g[37]++
				$g[75].setTxt("%4d", $g[37])
				returnf(0)
				continue
			case 281:
				enterf(0);	// nonPipelinedBranch
				fork(41, $g[123], 24)
				fork(41, $g[124], 24)
				callf(41, $g[96], 12)
				continue
			case 282:
				fork(41, $g[121], 12)
				fork(41, $g[122], 12)
				if (wait(12))
				return
				$pc = 283
			case 283:
				if (!(instrIsBranch($g[146].vIns))) {
					$pc = 286
					continue
				}
				$g[79].setNewValue($g[135].value&127)
				callf(37, $g[79])
				continue
			case 284:
				callf(41, $g[89], 14)
				continue
			case 285:
				$pc = 296
				continue
			case 286:
				if (!(instrIsJumpR($g[99].vIns))) {
					$pc = 288
					continue
				}
				$g[79].setNewValue(($g[101][$g[99].vRs2].value)&127)
				callf(41, $g[91], 34)
				continue
			case 287:
				$pc = 295
				continue
			case 288:
				if (!(isJorJAL($g[99].vIns))) {
					$pc = 291
					continue
				}
				$g[79].setNewValue(($g[79].value+$g[99].vRs2)&127)
				callf(41, $g[128], 20)
				continue
			case 289:
				callf(41, $g[89], 14)
				continue
			case 290:
				$pc = 294
				continue
			case 291:
				$g[79].setNewValue(($g[79].value+4)&127)
				callf(41, $g[126], 20)
				continue
			case 292:
				callf(41, $g[89], 14)
				continue
			case 293:
				$pc = 294
			case 294:
				$pc = 295
			case 295:
				$pc = 296
			case 296:
				callf(41, $g[93], 6)
				continue
			case 297:
				returnf(0)
				continue
			case 298:
				enterf(5);	// execNonPipelined
				callf(37, $g[79])
				continue
			case 299:
				$g[77].setActive($g[79].newValue)
				callf(41, $g[88], 24)
				continue
			case 300:
				callf(41, $g[86], 40)
				continue
			case 301:
				$g[99].setNewInstruction($g[77].instruction[$g[79].value/4])
				$g[87].setTxt($g[99].getNewInstrTxt())
				$g[87].translate(60/2+70, 0, 20, 1, 0)
				callf(35, $g[99])
				continue
			case 302:
				if (!((instrOpTypeRs2($g[99].vIns)==OP_TYPE_IMM) && (instrOpTypeRdt($g[99].vIns)==OP_TYPE_REG))) {
					$pc = 303
					continue
				}
				fork(41, $g[98], 64)
				$pc = 303
			case 303:
				fork(281, $obj)
				if (wait(24))
				return
				$pc = 304
			case 304:
				if (!(instrIsJumpAndLink($g[99].vIns))) {
					$pc = 307
					continue
				}
				callf(41, $g[120], 20)
				continue
			case 305:
				callf(41, $g[141], 20)
				continue
			case 306:
				$stack[$fp+1]=0
				$stack[$fp+2]=($g[79].value+4)&127
				$pc = 319
				continue
			case 307:
				if (!(instrOpTypeRdt($g[99].vIns)==OP_TYPE_REG)) {
					$pc = 316
					continue
				}
				$stack[$fp+1]=$g[101][$g[99].vRs1].value
				$g[101][$g[99].vRs1].highlight($g[23])
				$g[145].setTxt("R%d:%02X", $g[99].vRs1, $g[101][$g[99].vRs1].value)
				$g[145].setOpacity(1)
				fork(41, $g[144], 40)
				if (!((instrOpTypeRs2($g[99].vIns)==OP_TYPE_REG) || ($g[99].vIns==ST))) {
					$pc = 313
					continue
				}
				if (!(instrOpTypeRs2($g[99].vIns)==OP_TYPE_IMM)) {
					$pc = 308
					continue
				}
				$stack[$fp+2]=$g[101][$g[99].vRdt].value
				$g[101][$g[99].vRdt].highlight($g[23])
				$pc = 309
				continue
			case 308:
				$stack[$fp+2]=$g[101][$g[99].vRs2].value
				$g[101][$g[99].vRs2].highlight($g[23])
				$pc = 309
			case 309:
				if (!((!instrIsArRI($g[99].vIns)) && ($g[99].vIns!=LD))) {
					$pc = 312
					continue
				}
				$stack[$fp+5] = ($g[99].vIns==ST) ? $g[99].vRdt : $g[99].vRs2
				$g[143].setTxt("R%d:%02X", $stack[$fp+5], $g[101][$stack[$fp+5]].value)
				$g[143].setOpacity(1)
				callf(41, $g[142], 20)
				continue
			case 310:
				callf(41, $g[141], 20)
				continue
			case 311:
				$pc = 312
			case 312:
				$pc = 315
				continue
			case 313:
				if (wait(40))
				return
				$pc = 314
			case 314:
				$pc = 315
			case 315:
				$pc = 318
				continue
			case 316:
				if (wait(40))
				return
				$pc = 317
			case 317:
				$pc = 318
			case 318:
				$pc = 319
			case 319:
				if (!(instrOpTypeRdt($g[99].vIns)==OP_TYPE_REG)) {
					$pc = 320
					continue
				}
				$g[152].setTxtOp($g[99].vIns)
				$pc = 320
			case 320:
				if (!($g[99].vIns==ST)) {
					$pc = 325
					continue
				}
				fork(41, $g[164], 40)
				fork(41, $g[156], 40)
				$g[159].setTxt("%02X", $g[99].vRs2)
				$g[159].setOpacity(1)
				callf(41, $g[158], 40)
				continue
			case 321:
				fork(41, $g[165], 40)
				fork(41, $g[167], 10)
				callf(41, $g[166], 10)
				continue
			case 322:
				if (wait(20))
				return
				$pc = 323
			case 323:
				callf(41, $g[168], 10)
				continue
			case 324:
				$stack[$fp+4]=$stack[$fp+2]
				$stack[$fp+3]=instrExecute($g[99].vIns, $stack[$fp+1], $g[99].vRs2)
				$pc = 345
				continue
			case 325:
				if (!(instrIsJumpAndLink($g[99].vIns))) {
					$pc = 330
					continue
				}
				callf(41, $g[157], 40)
				continue
			case 326:
				callf(41, $g[167], 10)
				continue
			case 327:
				$stack[$fp+3]=instrExecute($g[99].vIns, $stack[$fp+1], $stack[$fp+2])
				if (wait(20))
				return
				$pc = 328
			case 328:
				callf(41, $g[168], 10)
				continue
			case 329:
				$pc = 344
				continue
			case 330:
				if (!(instrOpTypeRdt($g[99].vIns)==OP_TYPE_REG)) {
					$pc = 341
					continue
				}
				fork(41, $g[156], 40)
				if (!(instrOpTypeRs2($g[99].vIns)==OP_TYPE_IMM)) {
					$pc = 332
					continue
				}
				$g[159].setTxt("%02X", $g[99].vRs2)
				$g[159].setOpacity(1)
				callf(41, $g[158], 40)
				continue
			case 331:
				$stack[$fp+3]=instrExecute($g[99].vIns, $stack[$fp+1], $g[99].vRs2)
				$pc = 334
				continue
			case 332:
				callf(41, $g[157], 40)
				continue
			case 333:
				$stack[$fp+3]=instrExecute($g[99].vIns, $stack[$fp+1], $stack[$fp+2])
				$pc = 334
			case 334:
				fork(41, $g[167], 10)
				callf(41, $g[166], 10)
				continue
			case 335:
				if (!(instrIsBranch($g[99].vIns))) {
					$pc = 337
					continue
				}
				if (wait(5))
				return
				$pc = 336
			case 336:
				$g[118].setPen($g[112])
				$pc = 340
				continue
			case 337:
				if (wait(20))
				return
				$pc = 338
			case 338:
				callf(41, $g[168], 10)
				continue
			case 339:
				$pc = 340
			case 340:
				$pc = 343
				continue
			case 341:
				if (wait(80))
				return
				$pc = 342
			case 342:
				$pc = 343
			case 343:
				$pc = 344
			case 344:
				$pc = 345
			case 345:
				if (!($g[99].vIns==LD)) {
					$pc = 349
					continue
				}
				callf(41, $g[178], 20)
				continue
			case 346:
				$g[172][($stack[$fp+3])%4].highlight($g[23])
				callf(41, $g[180], 20)
				continue
			case 347:
				callf(41, $g[177], 40)
				continue
			case 348:
				$stack[$fp+3]=$g[172][($stack[$fp+3])%4].value
				$pc = 359
				continue
			case 349:
				if (!($g[99].vIns==ST)) {
					$pc = 352
					continue
				}
				fork(41, $g[179], 20)
				callf(41, $g[178], 20)
				continue
			case 350:
				$g[172][($stack[$fp+3])%4].setNewValue($stack[$fp+4])
				callf(37, $g[172][($stack[$fp+3])%4])
				continue
			case 351:
				$pc = 358
				continue
			case 352:
				if (!(instrOpTypeRdt($g[99].vIns)==OP_TYPE_REG)) {
					$pc = 355
					continue
				}
				callf(41, $g[176], 40)
				continue
			case 353:
				callf(41, $g[177], 40)
				continue
			case 354:
				$pc = 357
				continue
			case 355:
				if (wait(80))
				return
				$pc = 356
			case 356:
				$pc = 357
			case 357:
				$pc = 358
			case 358:
				$pc = 359
			case 359:
				$g[101][0].unHighlight()
				$g[101][1].unHighlight()
				$g[101][2].unHighlight()
				$g[101][3].unHighlight()
				if (!((instrOpTypeRdt($g[99].vIns)==OP_TYPE_REG) && ($g[99].vIns!=ST))) {
					$pc = 363
					continue
				}
				callf(41, $g[183], 40)
				continue
			case 360:
				$g[101][$g[99].vRdt].setNewValue($stack[$fp+3])
				callf(37, $g[101][$g[99].vRdt])
				continue
			case 361:
				if (wait(19))
				return
				$pc = 362
			case 362:
				$pc = 365
				continue
			case 363:
				if (wait(75))
				return
				$pc = 364
			case 364:
				$pc = 365
			case 365:
				$g[37]+=5
				$g[36]++
				$g[74].setTxt("%4d", $g[36])
				$g[75].setTxt("%4d", $g[37])
				returnf(0)
				continue
			case 366:
				enterf(0);	// exec
				$g[101][0].unHighlight()
				$g[101][1].unHighlight()
				$g[101][2].unHighlight()
				$g[101][3].unHighlight()
				$g[172][0].unHighlight()
				$g[172][1].unHighlight()
				$g[172][2].unHighlight()
				$g[172][3].unHighlight()
				$g[81][0].unHighlight()
				$g[81][1].unHighlight()
				$g[82][0].unHighlight()
				$g[82][1].unHighlight()
				if (!($g[28]==PIPELINING_ENABLED)) {
					$pc = 367
					continue
				}
				fork(52, $obj)
				fork(73, $obj)
				fork(125, $obj)
				fork(240, $obj)
				fork(269, $obj)
				$pc = 368
				continue
			case 367:
				fork(298, $obj)
				$pc = 368
			case 368:
				if (wait(8))
				return
				$pc = 369
			case 369:
				resetWires()
				if (wait(($g[28]==PIPELINING_ENABLED) ? 72 : 392))
				return
				$pc = 370
			case 370:
				checkPoint()
				returnf(0)
				continue
			case 371:
				enterf(0);	// run
				if (wait(1))
				return
				$pc = 372
			case 372:
				$g[35]=1
				setlocked()
				$pc = 373
			case 373:
				if (!(1)) {
					$pc = 378
					continue
				}
				fork(47, $g[78], ($g[28]==PIPELINING_ENABLED) ? 80 : 400)
				callf(366, $obj)
				continue
			case 374:
				if (!((($g[181].vIns==HALT) && ($g[28]==PIPELINING_ENABLED)) || (($g[99].vIns==HALT) && ($g[28]==PIPELINING_DISABLED)))) {
					$pc = 376
					continue
				}
				stop()
				if (!($g[187])) {
					$pc = 375
					continue
				}
				$pc = 378
				continue
				$pc = 375
			case 375:
				$pc = 376
			case 376:
				if (wait(1))
				return
				$pc = 377
			case 377:
				$pc = 373
				continue
			case 378:
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
