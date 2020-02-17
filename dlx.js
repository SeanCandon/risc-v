"use strict"

function dlx(vplayer) {

	const ABSOLUTE = vplayer.ABSOLUTE
	const ARROW60_END = vplayer.ARROW60_END
	const BEVEL_JOIN = vplayer.BEVEL_JOIN
	const BLACK = vplayer.BLACK
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
	var Font = vplayer.Font
	var fork = vplayer.fork
	var getArg = vplayer.getArg
	var getArgAsNum = vplayer.getArgAsNum
	var getURL = vplayer.getURL
	var Group = vplayer.Group
	var Image = vplayer.Image
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
	var setArg = vplayer.setArg
	var setBgBrush = vplayer.setBgBrush
	var setTPS = vplayer.setTPS
	var setViewport = vplayer.setViewport
	var SolidBrush = vplayer.SolidBrush
	var SolidPen = vplayer.SolidPen
	var sprintf = vplayer.sprintf
	var sqrt = vplayer.sqrt
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
	const WIDTH = 710
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
	const MAX_INSTR = 36
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
	const HALT = 36
	const STALL = 37
	const EMPTY = 38
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

	function instrIsLoadOrStore(instr) {
		return ((instr==LD) || (instr==ST)) ? 1 : 0
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
		return sprintf("%s", $g[35][instr])
		else 
		if (instrIsArRR(instr))
		return sprintf("%s x%d,x%d,x%d", $g[35][instr], rdt, rs1, rs2)
		else 
		if (instrIsArRI(instr))
		return sprintf("%s x%d,x%d,%02X", $g[35][instr], rdt, rs1, rs2)
		else 
		if (instr==LD)
		return sprintf("LD x%d,x%d+%02X", rdt, rs1, rs2)
		else 
		if (instr==ST)
		return sprintf("ST x%d,x%d+%02X", rdt, rs1, rs2)
		else 
		if (instrIsBranch(instr))
		return sprintf("%s x%d,x%d,%02X", $g[35][instr], rdt, rs1, rs2)
		else 
		if (instr==J)
		return sprintf("%s %02X", $g[35][instr], rs2)
		else 
		if (instr==JAL)
		return sprintf("%s x%d, %02X", $g[35][instr], rdt, rs2)
		else 
		if (instr==JR)
		return sprintf("%s x%d", $g[35][instr], rs2)
		else 
		if (instr==JALR)
		return sprintf("%s x%d, x%d", $g[35][instr], rdt, rs2)
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
		if (instr==LD || instr==ST)
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
		this.adr = new Rectangle2($g[0], $g[17], 0, 0, this.brush, this.x, this.y, this.fw, this.h, 0, $g[15], "%02X", this.addr)
		this.ins = new Rectangle2($g[0], $g[17], HLEFT, 0, this.brush, this.x+this.fw, this.y, 2*this.fw, this.h, this.insPen, $g[15], " NOP")
		this.rdt = new Rectangle2($g[0], $g[17], 0, 0, this.brush, this.x+3*this.fw, this.y, this.fw, this.h, this.rdtPen, $g[15], "-")
		this.rs1 = new Rectangle2($g[0], $g[17], 0, 0, this.brush, this.x+4*this.fw, this.y, this.fw, this.h, this.rs1Pen, $g[15], "-")
		this.rs2 = new Rectangle2($g[0], $g[17], 0, 0, this.brush, this.x+5*this.fw, this.y, this.fw, this.h, this.rs2Pen, $g[15], "-")
		this.dot = new Rectangle2($g[0], $g[17], 0, 0, $g[11], this.x+this.fw*0.80000000000000004, this.y+2, this.h/2, this.h/2)
		this.dot.setOpacity(0)
		this.arrowDown = new Line($g[0], $g[17], 0, $g[39], 0, 0, this.x+this.w+2, this.y+this.h*0.5, 5, 0, 0, 0, 0, 0)
		this.arrowUp = new Line($g[0], $g[17], 0, $g[39], 0, 0, this.x-2, this.y+this.h*0.5, -5, 0, 0, 0, 0, 0)
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
		this.ins.setTxt("%c%s", 32, $g[35][this.vIns])
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
			$g[14]=0
			setArg("example", $g[14].toString())
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
		if (!$g[22]) {
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
		if (!$g[22] && down && this.opTypeRdt!=OP_TYPE_UNUSED) {
			if (flags&MB_LEFT) {
				this.vRdt=(this.vRdt==31) ? 0 : this.vRdt+1
			} else
			if (flags&MB_RIGHT)
			this.vRdt=(this.vRdt==0) ? 31 : this.vRdt-1
			this.initRegs(1)
		}
	}

	Instruction.prototype.$eh7 = function(down, flags, x, y) {
		if (!$g[22] && down && this.opTypeRdt!=OP_TYPE_UNUSED) {
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
		if (!$g[22] && down) {
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
		this.r = new Rectangle2($g[0], 0, 0, $g[1], $g[36], x, y, w, h)
		this.r.setRounded(2, 2)
		new Rectangle2($g[0], 0, 0, $g[1], $g[37], x+2, y+2, w-4, h-4)
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
		this.r3 = new Rectangle2($g[0], 0, 0, 0, 0, x, y+h-10, w, 10, $g[4], $g[15], caption)
		this.label = new Txt($g[0], $g[17], 0, x+w/2, y+(h-14)/2, 0, $g[15], this.txt)
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
		this.r1 = new Rectangle2($g[0], 0, 0, $g[1], $g[40], x, y, w, h)
		this.r1.setRounded(2, 2)
		this.bg1 = new Rectangle2($g[0], $g[17], 0, 0, $g[12], this.vx, this.vy, this.vw/2, this.vh)
		this.bg2 = new Rectangle2($g[0], $g[17], 0, 0, $g[12], this.vx+this.vw/2, this.vy, this.vw/2, this.vh)
		if (w>=h) {
			this.vy=y+2
			this.vw=w-14
			this.vh=h-4
			if (labelPos==LEFT) {
				this.r2=new Rectangle($g[0], 0, 0, 0, 0, x+7-1, y+h/2, -7, -h/2, 14, h, 0, $g[15], caption)
				this.r2.rotate(-90)
				this.vx=x+12
			} else
			if (labelPos==RIGHT) {
				this.r2=new Rectangle($g[0], 0, 0, 0, 0, x+w-7, y+h/2, -7, -h/2, 14, h, 0, $g[15], caption)
				this.r2.rotate(-90)
				this.vx=x+2
			}
		} else {
			this.vx=x+2
			this.vw=w-4
			this.vh=h-14
			if (labelPos==TOP) {
				this.r2=new Rectangle2($g[0], 0, 0, 0, 0, x, y, w, 14, 0, $g[15], caption)
				this.vy=y+12
			} else
			if (labelPos==BOTTOM) {
				this.r2=new Rectangle2($g[0], 0, 0, 0, 0, x, y+h-10, w, 10, 0, $g[15], caption)
				this.vy=y+2
			}
		}
		if (w>=h) {
			this.label=new Rectangle2($g[0], $g[17], 0, 0, $g[13], this.vx, this.vy, this.vw, this.vh, 0, $g[15], "%02X", this.value)
		} else {
			this.label=new Rectangle($g[0], $g[17], 0, 0, $g[13], this.vx+this.vw/2, this.vy+this.vh/2, -this.vw/2, -this.vh/2, this.vw, this.vh, 0, $g[15], "%02X", this.value)
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
		this.label.setBrush(enter ? $g[12] : $g[13])
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
		this.bg = new Rectangle2($g[0], 0, 0, $g[1], $g[42], this.x, this.y, this.w, this.h)
		this.bg.setRounded(2, 2)
		this.label
		if (this.w>=this.h) {
			this.label=new Rectangle2($g[0], 0, 0, 0, 0, this.x, this.y, this.w, this.h, 0, $g[43], caption)
		} else {
			this.label=new Rectangle($g[0], 0, 0, 0, 0, this.x+this.w/2-1, this.y+this.h/2, -this.w/2, -this.h/2, this.w, this.h, 0, $g[43], caption)
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
		this.spText
		this.spAddr
		this.apFP = new AnimPipe()
		this.fpText
		this.fpAddr
		this.outer_x = this.x
		this.outer_y = this.y
		this.outer_w = this.w
		this.outer_h = (this.h*this.length+20)
		this.x=this.x+10
		this.y=this.y+10
		this.w=this.w/2
		this.outer = new Rectangle2($g[0], 0, 0, $g[1], $g[44], this.outer_x, this.outer_y, this.outer_w, this.outer_h)
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
		return this.stack[addr].value
	}

	Stack.prototype.highlight = function(addr) {
		this.stack[addr].highlight($g[21])
	}

	Stack.prototype.createFrame = function(addr, frame) {
		let a = this.stack[addr]
		let ax = a._x
		let ay = a._y
		let aw = a._w
		let ah = a._h
		let offset = 6*ah
		let arrowDown = new Line($g[0], $g[17], 0, $g[39], 0, 0, ax+aw+2, ay, 5, 0, 0, 0, 0, 0)
		arrowDown.setPt(2, ax+aw+7, ay+offset)
		arrowDown.setPt(3, ax+aw+2, ay+offset)
		arrowDown.setOpacity(1)
		let outer = new Rectangle2($g[0], 0, 0, $g[4], $g[44], (ax+aw+25), (ay+(offset/2)), 20, 10, $g[3], $g[43], sprintf("subroutine %d", frame))
	}

	Stack.prototype.setSP = function(addr) {
		let a = this.stack[addr]
		this.spAddr=addr
		let ax = a._x
		let ay = a._y
		let aw = a._w
		let ah = a._h
		this.spText=new Rectangle2($g[0], 0, 0, $g[4], $g[44], (ax+aw+13), (ay+6), 20, 8, $g[3], $g[43], sprintf("SP"))
		this.apSP.setOpacity(0)
		this.apSP.reset()
		this.apSP.addPoint(ax+aw+15, ay+10)
		this.apSP.addPoint(ax+aw+2, ay+10)
		this.apSP.setOpacity(1)
	}

	Stack.prototype.setFP = function(addr) {
		let a = this.stack[addr]
		this.fpAddr=addr
		let ax = a._x
		let ay = a._y
		let aw = a._w
		let ah = a._h
		if (this.spAddr!=this.fpAddr) {
			this.fpText=new Rectangle2($g[0], 0, 0, $g[4], $g[44], (ax+aw+13), (ay+6), 20, 8, $g[3], $g[43], sprintf("FP"))
		} else {
			this.spText=new Rectangle2($g[0], 0, 0, $g[4], $g[44], (ax+aw+20), (ay+6), 15, 8, $g[3], $g[43], sprintf("SP/FP"))
		}
		this.apSP.setOpacity(0)
		this.apSP.reset()
		this.apSP.addPoint(ax+aw+15, ay+10)
		this.apSP.addPoint(ax+aw+2, ay+10)
		this.apSP.setOpacity(1)
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
		this.alu = new Polygon($g[0], 0, ABSOLUTE, $g[1], $g[42], x, y, 0, 0, w, h/4, w, 3*h/4, 0, h, 0, 5*h/8, w/2, h/2, 0, 3*h/8)
		new Rectangle2($g[0], 0, 0, 0, 0, x, y-10, w, 10, 0, $g[43], "ALU")
		this.op = ""
		this.txtOp = new Rectangle($g[0], $g[17], 0, 0, $g[11], x, y+h/2, 0, -h/12, 2*w/3, h/6, $g[4], $g[43], this.op)
		this.txtOp.setOpacity(0)
		this.txtOp.setRounded(2, 2)
		this.txtResult = new Rectangle($g[0], $g[19], 0, $g[1], $g[13], x+3*w/4, y+h/2, 0, -h/12, w/2, h/6, $g[1], $g[43])
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
		this.bgLine = new Line($g[0], $g[18], 0, this.bgPen1, 0, 0)
		this.fgLine = new Line($g[0], $g[19], 0, this.fgPen0, 0, 0)
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
		this.prev_clock = new Line(this, $g[19], 0, $g[45], -this.chw+this.chw/5, 3+this.ch, 0, 0, 0, -this.ch, this.chw, 0, 0, this.ch, this.chw, 0)
		this.next_clock = new Line(this, $g[19], 0, $g[46], this.chw+this.chw/5, 3+this.ch, 0, 0, 0, -this.ch, this.chw, 0, 0, this.ch, this.chw, 0)
		this.dot = new Rectangle2(this, $g[19], 0, 0, $g[5], w/2-3, h-6, 6, 6)
		this.canUpdate
	}
	AnimatedClock.prototype = Object.create(Group.prototype)

	AnimatedClock.prototype.setStall = function(s, t) {
		this.stall=s
		this.type=t
		if (this.canUpdate)
		this.prev_clock.setPen(this.stall ? (this.type ? $g[47] : $g[45]) : $g[46])
	}

	function Button(x, y, w, h, caption, ID) {
		VObj.call(this)
		this.label = new Rectangle2($g[0], 0, 0, $g[1], $g[48], x, y, w, h, $g[1], $g[15], caption)
		this.label.addEventHandler("eventEE", this, this.$eh11)
	}
	Button.prototype = Object.create(VObj.prototype)

	Button.prototype.$eh11 = function(enter, x, y) {
		this.label.setBrush(enter ? $g[49] : $g[48])
		return 0
	}

	Button.prototype.setCaption = function(caption) {
		this.label.setTxt(caption)
	}

	Button.prototype.showLocked = function(locked) {
		this.label.setFont(locked ? $g[16] : $g[15])
	}

	function resetWires() {
		$g[83].reset()
		$g[81].reset()
		$g[82].setOpacity(0)
		$g[84].reset()
		$g[85].reset()
		$g[86].reset()
		$g[87].reset()
		$g[88].reset()
		$g[89].reset()
		$g[90].reset()
		$g[91].reset()
		$g[92].reset()
		$g[93].reset()
		$g[114].reset()
		$g[115].reset()
		$g[116].reset()
		$g[117].reset()
		$g[118].reset()
		$g[119].reset()
		$g[120].setOpacity(0)
		$g[121].reset()
		$g[122].setOpacity(0)
		$g[124].reset()
		$g[125].setOpacity(0)
		$g[126].reset()
		$g[127].reset()
		$g[123].reset()
		$g[131].reset()
		$g[132].setOpacity(0)
		$g[134].reset()
		$g[133].reset()
		$g[136].reset()
		$g[137].reset()
		$g[138].setOpacity(0)
		$g[139].reset()
		$g[140].setOpacity(0)
		$g[135].setOpacity(0)
		$g[111].setPen($g[106])
		$g[112].setPen($g[106])
		$g[113].setPen($g[106])
		$g[148].reset()
		$g[149].reset()
		$g[150].reset()
		$g[151].reset()
		$g[152].reset()
		$g[153].reset()
		$g[154].setOpacity(0)
		$g[155].reset()
		$g[156].reset()
		$g[157].reset()
		$g[158].reset()
		$g[159].reset()
		$g[160].reset()
		$g[161].reset()
		$g[162].reset()
		$g[163].reset()
		$g[147].txtOp.setOpacity(0)
		$g[147].txtResult.setOpacity(0)
		$g[111].setPen($g[106])
		$g[112].setPen($g[106])
		$g[170].reset()
		$g[171].reset()
		$g[172].reset()
		$g[173].reset()
		$g[174].reset()
		$g[175].reset()
		$g[178].reset()
	}

	function resetRegisters() {
		$g[74].reset()
		$g[74].setValue(124)
		$g[95].reset()
		$g[142].reset()
		$g[143].reset()
		$g[166].reset()
		$g[165].reset()
		$g[177].reset()
		$g[76][0].reset()
		$g[76][1].reset()
		$g[77][0].reset()
		$g[77][1].reset()
		$g[94].reset()
		$g[141].reset()
		$g[164].reset()
		$g[176].reset()
		$g[72].setActive(124)
		$g[165].setInvalid(1)
		$g[165].updateLabel()
		$g[177].setInvalid(1)
		$g[177].updateLabel()
		$g[76][0].setValue(-1)
		$g[76][0].setInvalid(1)
		$g[76][0].updateLabel()
		$g[76][1].setValue(-1)
		$g[76][1].setInvalid(1)
		$g[76][1].updateLabel()
		$g[33]=0
		$g[34]=0
		$g[69].setTxt("%4d", 0)
		$g[70].setTxt("%4d", 0)
	}

	function resetCircuit() {
		resetRegisters()
		resetWires()
	}

	function showBTB(opacity) {
		$g[75].setOpacity(opacity)
		$g[76][0].setOpacity(opacity)
		$g[76][1].setOpacity(opacity)
		$g[77][0].setOpacity(opacity)
		$g[77][1].setOpacity(opacity)
		$g[89].setOpacity(opacity)
		$g[114].setOpacity(opacity)
		$g[78].setOpacity(opacity)
		$g[92].setOpacity(opacity)
		$g[85].setOpacity(opacity)
		$g[131].setOpacity(opacity)
		$g[134].setOpacity(opacity)
		$g[104].setOpacity(opacity)
		$g[133].setOpacity(opacity)
	}

	function showALUForwarding(opacity) {
		if (opacity==0) {
			$g[151].setPoint(0, 360, 205)
			$g[151].setPoint(1, 421, 205)
			$g[152].setPoint(0, ($g[29]) ? 360 : 350, 250)
			$g[152].setPoint(1, 410, 250)
			$g[153].setPoint(2, 370, 260)
			$g[153].setPoint(3, 410, 260)
			$g[151].setHead(0)
		} else {
			$g[151].setPoint(0, 360, 220)
			$g[151].setPoint(1, 420, 220)
			$g[152].setPoint(0, 360, 240)
			$g[152].setPoint(1, 420, 240)
			$g[153].setPoint(2, 370, 250)
			$g[153].setPoint(3, 420, 250)
			$g[151].setHead(1)
		}
		$g[144].setOpacity(opacity)
		$g[149].setOpacity(opacity)
		$g[150].setOpacity(opacity)
		$g[156].setOpacity(opacity)
		$g[155].setOpacity(opacity)
	}

	function showSMDRForwarding(opacity) {
		if (opacity==0) {
			$g[159].setPoint(1, 355, 330)
			$g[159].setPoint(2, 420, 330)
			$g[159].setHead(0)
		} else {
			$g[159].setPoint(1, 355, 340)
			$g[159].setPoint(2, 420, 340)
			$g[159].setHead(1)
		}
		$g[146].setOpacity(opacity)
		$g[157].setOpacity(opacity)
		$g[158].setOpacity(opacity)
	}

	function showZeroForwarding(opacity) {
		if (opacity==0) {
		} else {
		}
	}

	function showPipeline(opacity) {
		if (opacity==0) {
			$g[91].setPoint(1, 180, 230)
			$g[91].setPoint(2, 180, 240)
			$g[116].setPoint(0, 180, 230)
			$g[117].setPoint(0, 180, 230)
			$g[93].setPoint(1, 300, 390)
			$g[139].setPoint(1, 295, 205)
			$g[139].setPoint(2, 360, 205)
			$g[136].setPoint(1, 360, 240)
			$g[159].setPoint(0, 355, 250)
			$g[163].setPoint(3, 520, 240)
			$g[160].setPoint(1, 530, 330)
			$g[172].setPoint(1, 640, 230)
			$g[93].setHead(0)
			$g[91].setHead(0)
			$g[139].setHead(0)
			$g[151].setHead(0)
			$g[136].setHead(0)
			$g[159].setHead(0)
			$g[160].setHead(0)
			$g[161].setHead(0)
			$g[162].setHead(0)
			$g[163].setHead(0)
			$g[172].setHead(0)
			showBTB(opacity)
			showALUForwarding(opacity)
			showSMDRForwarding(opacity)
			showZeroForwarding(opacity)
		} else {
			$g[91].setPoint(1, 160, 230)
			$g[91].setPoint(2, 170, 230)
			$g[116].setPoint(0, 180, 250)
			$g[117].setPoint(0, 180, 250)
			$g[93].setPoint(1, 310, 390)
			$g[139].setPoint(1, 295, 210)
			$g[139].setPoint(2, 340, 210)
			$g[136].setPoint(1, 340, 240)
			$g[159].setPoint(0, 355, 270)
			$g[163].setPoint(3, 520, 240)
			$g[160].setPoint(1, 520, 330)
			$g[172].setPoint(1, 620, 230)
			$g[93].setHead(1)
			$g[91].setHead(1)
			$g[139].setHead(1)
			$g[151].setHead(1)
			$g[136].setHead(1)
			$g[159].setHead(1)
			$g[160].setHead(1)
			$g[161].setHead(1)
			$g[162].setHead(1)
			$g[163].setHead(1)
			$g[172].setHead(1)
			showBTB($g[27]==BRANCH_PREDICTION ? 1 : 0)
			showALUForwarding($g[29]==ALU_FORWARDING ? 1 : 0)
			showSMDRForwarding($g[30]==FORWARDING_TO_SMDR ? 1 : 0)
			showZeroForwarding($g[31]==ZERO_FORWARDING ? 1 : 0)
		}
		$g[90].setOpacity(opacity)
		$g[80].setOpacity(opacity)
		$g[87].setOpacity(opacity)
		$g[95].setOpacity(opacity)
		$g[141].setOpacity(opacity)
		$g[164].setOpacity(opacity)
		$g[176].setOpacity(opacity)
		$g[148].setOpacity(opacity)
		$g[170].setOpacity(opacity)
		$g[142].setOpacity(opacity)
		$g[143].setOpacity(opacity)
		$g[165].setOpacity(opacity)
		$g[177].setOpacity(opacity)
		$g[166].setOpacity(opacity)
		$g[62].label.setOpacity(opacity)
		$g[63].label.setOpacity(opacity)
		$g[64].label.setOpacity(opacity)
		$g[65].label.setOpacity(opacity)
		$g[66].label.setOpacity(opacity)
	}

	function setPEMode(mode) {
		$g[26]=mode
		if ($g[26]==0) {
			$g[61].setCaption("Pipelining Enabled")
			showPipeline(1)
		} else
		if ($g[26]==1) {
			$g[61].setCaption("Pipelining Disabled")
			showPipeline(0)
		}
		setArg("peMode", $g[26].toString())
	}

	function setBPMode(mode) {
		$g[27]=mode
		if ($g[27]==0) {
			$g[62].setCaption("Branch Prediction")
			showBTB(1)
		} else
		if ($g[27]==1) {
			$g[62].setCaption("Branch Interlock")
			showBTB(0)
		} else
		if ($g[27]==2) {
			$g[62].setCaption("Delayed Branches")
			showBTB(0)
		}
		setArg("bpMode", $g[27].toString())
	}

	function setLIMode(mode) {
		$g[28]=mode
		if ($g[28]==0) {
			$g[63].setCaption("Load Interlock")
		} else
		if ($g[28]==1) {
			$g[63].setCaption("No Load Interlock")
		}
		setArg("liMode", $g[28].toString())
	}

	function setAFMode(mode) {
		$g[29]=mode
		if ($g[29]==0) {
			$g[64].setCaption("ALU Forwarding")
			showALUForwarding(1)
		} else
		if ($g[29]==1) {
			$g[64].setCaption("ALU Interlock")
			showALUForwarding(0)
		} else
		if ($g[29]==2) {
			$g[64].setCaption("No ALU Interlock")
			showALUForwarding(0)
		}
		setArg("afMode", $g[29].toString())
	}

	function setSFMode(mode) {
		$g[30]=mode
		if ($g[30]==0) {
			$g[65].setCaption("Store Operand\nForwarding")
			showSMDRForwarding(1)
		} else
		if ($g[30]==1) {
			$g[65].setCaption("Store Interlock")
			showSMDRForwarding(0)
		} else
		if ($g[30]==2) {
			$g[65].setCaption("No Store Interlock")
			showSMDRForwarding(0)
		}
		setArg("sfMode", $g[30].toString())
	}

	function setZFMode(mode) {
		$g[31]=mode
		if ($g[31]==0) {
			$g[66].setCaption("Zero Forwarding")
			showZeroForwarding(1)
		} else
		if ($g[31]==1) {
			$g[66].setCaption("Zero Interlock")
			showZeroForwarding(0)
		} else
		if ($g[31]==2) {
			$g[66].setCaption("No Zero Interlock")
			showZeroForwarding(0)
		}
		setArg("zfMode", $g[31].toString())
	}

	function btbIndex(pc) {
		for (let lp1 = 0; lp1<2; lp1++)
		if ($g[76][lp1].value==pc)
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
		if ($g[202]==0) {
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
		$g[196]=c
	}

	function booth8() {
		let b1 = $g[198]&1
		if (b1!=$g[197] && $g[201]!=2) {
			if (b1>$g[197]) {
				$g[199]=(se8($g[199])-se8($g[200]))&255
			} else {
				$g[199]=(se8($g[199])+se8($g[200]))&255
			}
			$g[201]=2
		} else {
			$g[201]=1
			let p21 = $g[199]&1
			p21=p21<<7
			let p2m = $g[199]&128
			$g[198]=($g[198]>>1)&255
			$g[198]=$g[198]|p21
			$g[199]=($g[199]>>1)&255
			$g[199]=$g[199]|p2m
			$g[197]=b1
		}
	}

	function booth() {
		let b1 = $g[198]&1
		if (b1!=$g[197] && $g[201]!=2) {
			let p3 = $g[198]&15
			let q = $g[198]&240
			q=q>>4
			if (b1>$g[197]) {
				q=(se8(q)-se8($g[200]))&255
			} else {
				q=(se8(q)+se8($g[200]))&255
			}
			q=q<<4
			q=q&240
			$g[198]=q|p3
			$g[201]=2
		} else {
			$g[201]=1
			let lb = $g[198]&128
			$g[198]=($g[198]>>1)&255
			$g[198]=$g[198]|lb
			$g[197]=b1
		}
	}

	function calcNewPC() {
		if (instrIsBranch($g[141].vIns)) {
			if ($g[189]==1) {
				$g[184]=$g[124]
				$g[187]=$g[130].value&127
				$g[188]=$g[84]
			} else {
				$g[184]=$g[121]
				$g[187]=($g[95].value+4)&127
				$g[189]=0
			}
		} else {
			if (isJorJAL($g[94].vIns)) {
				$g[184]=$g[124]
				$g[185]=$g[131]
				$g[187]=($g[95].value+$g[94].vRs2)&127
				$g[188]=$g[84]
			} else
			if (instrIsJumpR($g[94].vIns)) {
				$g[187]=($g[96][$g[94].vRs2].value)&127
				$g[188]=$g[86]
				$g[185]=$g[134]
			}
		}
	}

	function updBTB() {
		if ($g[187]!=$g[74].value) {
			$g[74].setNewValue($g[187])
			$g[183]=$g[188]
			if ($g[27]==BRANCH_PREDICTION) {
				if ($g[187]==$g[95].value+4) {
					if (btbIndex($g[95].value)>=0)
					$g[76][btbIndex($g[95].value)].setInvalid(1)
				} else {
					if (btbIndex($g[95].value)>=0)
					$g[24]=btbIndex($g[95].value)
					else 
					$g[24]=($g[24]) ? 0 : 1
					$g[76][$g[24]].setNewValue($g[95].value)
					$g[76][$g[24]].setInvalid(0)
					$g[76][$g[24]].useTag=0
					$g[77][$g[24]].setNewValue($g[187])
				}
			}
		}
	}

	function detectStall() {
		$g[23]=NO_STALL
		$g[25]=0
		if ($g[29]==ALU_INTERLOCK) {
			if (instrOpTypeRdt($g[141].vIns)==OP_TYPE_REG) {
				if ((instrOpTypeRs1($g[94].vIns)==OP_TYPE_REG) && ($g[94].vRs1==$g[141].vRdt))
				$g[23]=DATA_STALL
				if ((instrOpTypeRs2($g[94].vIns)==OP_TYPE_REG) && ($g[94].vRs2==$g[141].vRdt))
				$g[23]=DATA_STALL
			}
			if (instrOpTypeRdt($g[164].vIns)==OP_TYPE_REG) {
				if ((instrOpTypeRs1($g[94].vIns)==OP_TYPE_REG) && ($g[94].vRs1==$g[164].vRdt))
				$g[23]=DATA_STALL
				if ((instrOpTypeRs2($g[94].vIns)==OP_TYPE_REG) && ($g[94].vRs2==$g[164].vRdt))
				$g[23]=DATA_STALL
			}
		}
		if (($g[30]==STORE_INTERLOCK) && ($g[94].vIns==ST)) {
			if ((instrOpTypeRdt($g[141].vIns)==OP_TYPE_REG) && ($g[141].vRdt==$g[94].vRdt))
			$g[23]=DATA_STALL
			if ((instrOpTypeRdt($g[164].vIns)==OP_TYPE_REG) && ($g[164].vRdt==$g[94].vRdt))
			$g[23]=DATA_STALL
		}
		if (instrIsJumpR($g[94].vIns) && (instrIsBranch($g[141].vIns)==0)) {
			if ((instrOpTypeRdt($g[141].vIns)==OP_TYPE_REG) && ($g[141].vRdt==$g[94].vRs2))
			$g[23]=DATA_STALL
			if ((instrOpTypeRdt($g[164].vIns)==OP_TYPE_REG) && ($g[164].vRdt==$g[94].vRs2))
			$g[23]=DATA_STALL
		}
		if (($g[28]==LOAD_INTERLOCK) && ($g[141].vIns==LD)) {
			if ((instrOpTypeRs1($g[94].vIns)==OP_TYPE_REG) && ($g[94].vRs1==$g[141].vRdt))
			$g[23]=DATA_STALL
			if ((instrOpTypeRs2($g[94].vIns)==OP_TYPE_REG) && ($g[94].vRs2==$g[141].vRdt))
			$g[23]=DATA_STALL
		}
		if (instrIsMulti($g[141].vIns) && ($g[194]==1)) {
			$g[23]=DATA_STALL
		}
		if (instrIsBranch($g[141].vIns)) {
			if (instrIsJump($g[94].vIns) && ($g[189]==0) && ($g[23]==NO_STALL)) {
				$g[25]=1
				$g[23]=CTRL_STALL
			} else
			if (instrIsJump($g[94].vIns) && ($g[189]==1) && ($g[23]==NO_STALL)) {
				$g[23]=NO_STALL
				$g[190]=1
			} else
			if ((instrIsBranch($g[94].vIns)==0) && ($g[189]==1) && ($g[23]==NO_STALL)) {
				$g[25]=1
				$g[23]=CTRL_STALL
			} else {
				$g[23]=NO_STALL
				$g[190]=0
			}
		} else {
			if (($g[23]==NO_STALL) && ($g[27]!=DELAYED_BRANCHES) && instrIsJump($g[94].vIns) && ($g[187]!=$g[74].value)) {
				$g[25]=1
				$g[23]=CTRL_STALL
			}
		}
		if ($g[23]==DATA_STALL) {
			$g[73].setStall(1, 0)
		} else
		if ($g[23]==CTRL_STALL) {
			$g[73].setStall(1, 1)
		}
	}

	function setlocked() {
		let b_locked = $g[32] || $g[22]
		$g[61].showLocked(b_locked)
		$g[62].showLocked(b_locked)
		$g[63].showLocked(b_locked)
		$g[64].showLocked(b_locked)
		$g[65].showLocked(b_locked)
		$g[66].showLocked(b_locked)
	}

	function $eh12(down, flags, x, y) {
		if (down && (flags&MB_LEFT) && (!$g[32]) && (!$g[22])) {
			setPEMode(($g[26]+1)%2)
			resetCircuit()
		}
		return 0
	}

	function $eh13(down, flags, x, y) {
		if (down && (flags&MB_LEFT) && (!$g[32]) && (!$g[22])) {
			setBPMode(($g[27]+1)%3)
			resetCircuit()
		}
		return 0
	}

	function $eh14(down, flags, x, y) {
		if (down && (flags&MB_LEFT) && (!$g[32]) && (!$g[22])) {
			setLIMode(($g[28]+1)%2)
			resetCircuit()
		}
		return 0
	}

	function $eh15(down, flags, x, y) {
		if (down && (flags&MB_LEFT) && (!$g[32]) && (!$g[22])) {
			setAFMode(($g[29]+1)%3)
			resetCircuit()
		}
		return 0
	}

	function $eh16(down, flags, $2, $3) {
		if (down && (flags&MB_LEFT) && (!$g[32]) && (!$g[22])) {
			setSFMode(($g[30]+1)%3)
			resetCircuit()
		}
		return 0
	}

	function $eh17(down, flags, $2, $3) {
		if (down && (flags&MB_LEFT) && (!$g[32]) && (!$g[22])) {
			setZFMode(($g[31]+1)%3)
			resetCircuit()
		}
		return 0
	}

	function $eh18(down, flags, x, y) {
		if (down && (flags&MB_LEFT)) {
			let lp1, opcode, reg
			let instr
			let s = "saveanim.php?state="
			for (lp1=0; lp1<32; lp1++) {
				instr=$g[72].instruction[lp1]
				opcode=(instr.vIns<<24)|(instr.vRdt<<16)|(instr.vRs1<<8)|(instr.vRs2)
				s=sprintf("%si%d='0x%08X' ", s, lp1, opcode)
			}
			for (lp1=0; lp1<4; lp1++) {
				reg=$g[96][lp1].value
				s=sprintf("%sr%d='0x%02X' ", s, lp1, reg)
			}
			for (lp1=0; lp1<4; lp1++) {
				reg=$g[167][lp1].value
				s=sprintf("%sm%d='0x%02X' ", s, lp1, reg)
			}
			s=sprintf("%speMode='%d' bpMode='%d' liMode='%d' afMode='%d' sfMode='%d' zfMode='%d'", s, $g[26], $g[27], $g[28], $g[29], $g[30], $g[31])
			getURL(s)
		}
		return 0
	}

	function $eh19(down, flags, x, y) {
		if (down && (flags&MB_LEFT))
		getURL("https://www.scss.tcd.ie/Jeremy.Jones/VivioJS/vivio.htm")
		return 0
	}

	function $eh20(down, flags, $2, $3) {
		if (down && (flags&MB_LEFT))
		getURL("showanim.php")
	}

	function $eh21(enter, x, y) {
		$g[71].setBrush(enter ? $g[8] : $g[12])
		$g[71].setTxtPen(enter ? $g[3] : $g[1])
		return 0
	}

	function $eh22(down, flags, x, y) {
		if (down && (flags&MB_LEFT)) {
			$g[14]=($g[14]==maxexample) ? 0 : $g[14]+1
			setArg("example", $g[14].toString())
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
				$g[14] = 0
				setViewport(0, 0, WIDTH, HEIGHT, 1)
				setBgBrush($g[12])
				$g[15] = new Font("Calibri", 8)
				$g[16] = new Font("Calibri", 8, STRIKETHROUGH)
				$g[17] = new Layer(1, 3)
				$g[18] = new Layer(2, 3)
				$g[19] = new Layer(3, 0)
				$g[20] = new Layer(5, 0)
				$g[21] = new SolidBrush(RED)
				$g[22] = 0
				$g[23] = NO_STALL
				$g[24] = 1
				$g[25] = 0
				$g[26] = 0
				$g[27] = 0
				$g[28] = 0
				$g[29] = 0
				$g[30] = 0
				$g[31] = 0
				$g[32] = 0
				$g[33] = 0
				$g[34] = 0
				$g[35] = newArray(38)
				$g[35][NOP]="NOP"
				$g[35][ADD]="ADD"
				$g[35][SUB]="SUB"
				$g[35][AND]="AND"
				$g[35][OR]="OR"
				$g[35][XOR]="XOR"
				$g[35][SLL]="SLL"
				$g[35][SRL]="SRL"
				$g[35][SLT]="SLT"
				$g[35][SGT]="SGT"
				$g[35][SLE]="SLE"
				$g[35][SGE]="SGE"
				$g[35][ADDi]="ADDi"
				$g[35][SUBi]="SUBi"
				$g[35][ANDi]="ANDi"
				$g[35][ORi]="ORi"
				$g[35][XORi]="XORi"
				$g[35][SLLi]="SLLi"
				$g[35][SRLi]="SRLi"
				$g[35][SLTi]="SLTi"
				$g[35][SGTi]="SGTi"
				$g[35][SLEi]="SLEi"
				$g[35][SGEi]="SGEi"
				$g[35][LD]="LD"
				$g[35][ST]="ST"
				$g[35][BEQ]="BEQ"
				$g[35][BNE]="BNE"
				$g[35][BLT]="BLT"
				$g[35][BGE]="BGE"
				$g[35][J]="J"
				$g[35][JAL]="JAL"
				$g[35][JR]="JR"
				$g[35][JALR]="JALR"
				$g[35][MUL]="MUL"
				$g[35][DIV]="DIV"
				$g[35][REM]="REM"
				$g[35][HALT]="HALT"
				$g[35][STALL]="STALL"
				$g[35][EMPTY]="EMPTY"
				$g[36] = new SolidBrush(BORDEAU)
				$g[37] = new SolidBrush(WHITE)
				$g[38] = new SolidPen(DOT, 1, rgba(0.75, 0.75, 0.75))
				$g[39] = new SolidPen(SOLID, 1, RED, ARROW60_END)
				$g[40] = new SolidBrush(PURPLE)
				$g[41] = new SolidBrush(WHITE)
				$g[42] = new SolidBrush(LIGHT_BLUE)
				$g[43] = new Font("Calibri", 9)
				$g[44] = new SolidBrush(WHITE)
				$g[45] = new SolidPen(SOLID, 1, RED, ROUND_START|ROUND_JOIN|ROUND_END)
				$g[46] = new SolidPen(SOLID, 1, GREEN, ROUND_START|ROUND_JOIN|ROUND_END)
				$g[47] = new SolidPen(SOLID, 1, ORANGE, ROUND_START|ROUND_JOIN|ROUND_END)
				$g[48] = new SolidBrush(WHITE)
				$g[49] = new SolidBrush(GRAY224)
				$g[50] = getArg("name", "")
				if (!($g[50]!="")) {
					$pc = 1
					continue
				}
				$g[50]=sprintf(":  %s", $g[50])
				$pc = 1
			case 1:
				$g[51] = new Font("Calibri", 20, SMALLCAPS|ITALIC)
				$g[52] = new Rectangle2($g[0], 0, HLEFT, 0, new SolidBrush(DARK_BLUE), -80, 10, 200, 30, $g[4], $g[51], sprintf(" RISC-V ANIMATION %s", $g[50]))
				$g[53] = new SolidPen(DASH, 1, DARK_BLUE, ROUND_START|ROUND_JOIN|ROUND_END)
				new Line2($g[0], 0, ABSOLUTE, $g[53], 30, 80, 660, 80)
				new Line2($g[0], 0, ABSOLUTE, $g[53], 30, 440, 660, 440)
				new Line2($g[0], 0, ABSOLUTE, $g[53], 30, 80, 30, 440)
				$g[54] = new Line2($g[0], 0, ABSOLUTE, $g[53], 160, 80, 160, 440)
				$g[55] = new Line2($g[0], 0, ABSOLUTE, $g[53], 310, 80, 310, 440)
				$g[56] = new Line2($g[0], 0, ABSOLUTE, $g[53], 510, 80, 510, 440)
				$g[57] = new Line2($g[0], 0, ABSOLUTE, $g[53], 610, 80, 610, 440)
				new Line2($g[0], 0, ABSOLUTE, $g[53], 660, 80, 660, 440)
				$g[58] = new SolidPen(DOT, THIN, BLACK)
				new Line2($g[0], 0, ABSOLUTE, $g[58], 10, 450, 700, 450)
				$g[59] = new Font("Calibri", 10, BOLD)
				$g[60] = new Button(20, 460, 80, 20, "Save Configuration", BUTTON_SP)
				$g[61] = new Button(120, 460, 80, 20, "Pipelining Enabled", BUTTON_PE)
				$g[62] = new Button(210, 460, 80, 20, "Branch Prediction", BUTTON_BP)
				$g[63] = new Button(300, 460, 80, 20, "Load Interlock", BUTTON_LI)
				$g[64] = new Button(390, 460, 80, 20, "ALU Forwarding", BUTTON_AF)
				$g[65] = new Button(480, 460, 80, 20, "Store Operand\nForwarding", BUTTON_SF)
				$g[66] = new Button(570, 460, 80, 20, "Zero Forwarding", BUTTON_ZF)
				$g[67] = new Image($g[0], 0, 0, 0, "vivio.png", 660, 460, 0, 0, LOGOW, LOGOH)
				new Txt($g[0], 0, HLEFT|VTOP, -80, 46, $g[2], $g[15], "instructions executed:")
				$g[68] = new Txt($g[0], 0, HLEFT|VTOP, -80, 56, $g[2], $g[15], "ticks:")
				$g[69] = new Txt($g[0], 0, HLEFT|VTOP, 0, 46, $g[3], $g[15], "0")
				$g[70] = new Txt($g[0], 0, HLEFT|VTOP, 0, 56, $g[3], $g[15], "0")
				$g[71] = new Rectangle2($g[0], 0, 0, 0, 0, -80, 68, 100, 10, 0, $g[15], "Instruction Cache")
				$g[72] = new InstructionMemory(-80, 80, 100, 320)
				$g[73] = new AnimatedClock($g[0], -70, 410, 80, 30)
				$g[74] = new Register(120, 210, 20, 40, TOP, "PC")
				$g[75] = new Rectangle2($g[0], 0, 0, 0, 0, 70, 85, 80, 10, 0, $g[15], "Branch Target Buffer")
				$g[76] = newArray(2)
				$g[76][0]=new Register(70, 100, 40, 20, LEFT, "PC")
				$g[76][1]=new Register(70, 120, 40, 20, LEFT, "PC")
				$g[77] = newArray(2)
				$g[77][0]=new Register(110, 100, 40, 20, RIGHT, "PPC")
				$g[77][1]=new Register(110, 120, 40, 20, RIGHT, "PPC")
				$g[78] = new Component(120, 170, 30, 10, "mux 2")
				$g[79] = new Component(90, 205, 10, 50, "mux 1")
				$g[80] = new Component(80, 270, 20, 10, "+4")
				$g[81] = new AnimPipe()
				$g[81].addPoint(30, 390)
				$g[81].addPoint(170, 390)
				$g[82] = new Rectangle($g[0], $g[19], 0, 0, $g[11], 180, 390, -30, -6, 60, 12, $g[4], $g[15])
				$g[82].setRounded(2, 2)
				$g[83] = new AnimPipe()
				$g[83].addPoint(130, 250)
				$g[83].addPoint(130, 320)
				$g[83].addPoint(30, 320)
				$g[84] = new AnimPipe()
				$g[84].addPoint(220, 170)
				$g[84].addPoint(220, 160)
				$g[84].addPoint(70, 160)
				$g[84].addPoint(70, 215)
				$g[84].addPoint(90, 215)
				$g[85] = new AnimPipe()
				$g[85].addPoint(70, 120)
				$g[85].addPoint(60, 120)
				$g[85].addPoint(60, 225)
				$g[85].addPoint(90, 225)
				$g[86] = new AnimPipe()
				$g[86].addPoint(160, 50)
				$g[86].addPoint(50, 50)
				$g[86].addPoint(50, 235)
				$g[86].addPoint(90, 235)
				$g[87] = new AnimPipe()
				$g[87].addPoint(80, 275)
				$g[87].addPoint(40, 275)
				$g[87].addPoint(40, 245)
				$g[87].addPoint(90, 245)
				$g[88] = new AnimPipe()
				$g[88].addPoint(100, 230)
				$g[88].addPoint(120, 230)
				$g[89] = new AnimPipe()
				$g[89].addPoint(130, 210)
				$g[89].addPoint(130, 180)
				$g[90] = new AnimPipe()
				$g[90].addPoint(130, 250)
				$g[90].addPoint(130, 275)
				$g[90].addPoint(100, 275)
				$g[91] = new AnimPipe()
				$g[91].addPoint(140, 230)
				$g[91].addPoint(160, 230)
				$g[91].addPoint(160, 230)
				$g[92] = new AnimPipe()
				$g[92].addPoint(135, 170)
				$g[92].addPoint(135, 140)
				$g[93] = new AnimPipe()
				$g[93].addPoint(190, 390)
				$g[93].addPoint(310, 390)
				$g[94] = new InstructionRegister(170, 350, 20, 85, "ID")
				$g[95] = new Register(170, 210, 20, 40, TOP, "PC1")
				new Txt($g[0], 0, HLEFT|VTOP, 400, 40, 0, $g[15], "Register\nFile")
				$g[96] = newArray(NUM_REGS)
				$g[97] = 160
				$g[98] = 25
				$g[99] = TOP
				$g[179]=0
				$pc = 2
			case 2:
				if (!($g[179]<NUM_REGS)) {
					$pc = 5
					continue
				}
				if (!($g[179]==(NUM_REGS/2))) {
					$pc = 3
					continue
				}
				$g[99]=BOTTOM
				$g[97]=160
				$g[98]+=REG_HEIGHT
				$pc = 3
			case 3:
				$g[100] = "x"+$g[179].toString()
				$g[96][$g[179]]=new Register($g[97], $g[98], REG_WIDTH, REG_HEIGHT, $g[99], $g[100])
				$g[97]+=REG_WIDTH
				$pc = 4
			case 4:
				$g[179]++
				$pc = 2
				continue
			case 5:
				$g[101] = new Component(195, 170, 50, 10, "mux 3")
				$g[102] = new Component(190, 320, 30, 10, "ADD4")
				$g[103] = new Component(220, 320, 30, 10, "ADDi")
				$g[104] = new Component(170, 100, 10, 40, "mux 4")
				$g[105] = new Component(295, 220, 10, 30, "mux 5")
				new Rectangle2($g[0], 0, 0, 0, 0, 200, 365, 20, 10, 0, $g[15], "4")
				$g[106] = new SolidPen(SOLID, 0, PURPLE, ARROW60_END)
				$g[107] = new SolidPen(SOLID, 2, RED, ARROW60_END)
				$g[108] = new SolidPen(SOLID, MEDIUM, BLACK)
				$g[109] = new Line2($g[0], $g[17], ABSOLUTE, $g[108], 460, 100, 480, 100)
				$g[110] = new Txt($g[0], $g[17], HLEFT|VTOP, 462, 90, 0, $g[15], "zero")
				$g[111] = new Line2($g[0], $g[17], ABSOLUTE, $g[106], 470, 102, 470, 200)
				$g[112] = new Line2($g[0], $g[17], ABSOLUTE, $g[106], 470, 102, 470, 140, 325, 140, 325, 220, 340, 220)
				$g[113] = new Line2($g[0], $g[17], ABSOLUTE, $g[106], 490, 220, 500, 220, 500, 150, 305, 150, 305, 175, 245, 175)
				$g[114] = new AnimPipe()
				$g[114].addPoint(180, 210)
				$g[114].addPoint(180, 200)
				$g[114].addPoint(140, 200)
				$g[114].addPoint(140, 180)
				$g[115] = new AnimPipe()
				$g[115].addPoint(205, 320)
				$g[115].addPoint(205, 240)
				$g[115].addPoint(295, 240)
				$g[116] = new AnimPipe()
				$g[116].addPoint(180, 250)
				$g[116].addPoint(180, 345)
				$g[116].addPoint(210, 345)
				$g[116].addPoint(210, 330)
				$g[117] = new AnimPipe()
				$g[117].addPoint(180, 250)
				$g[117].addPoint(180, 345)
				$g[117].addPoint(230, 346)
				$g[117].addPoint(230, 330)
				$g[118] = new AnimPipe()
				$g[118].addPoint(210, 360)
				$g[118].addPoint(210, 330)
				$g[119] = new AnimPipe()
				$g[119].addPoint(190, 390)
				$g[119].addPoint(240, 390)
				$g[119].addPoint(240, 330)
				$g[120] = new Rectangle($g[0], $g[19], 0, 0, $g[11], 320, 376, -12, -6, 24, 12, $g[4], $g[15])
				$g[120].setRounded(2, 2)
				$g[121] = new AnimPipe()
				$g[121].addPoint(205, 320)
				$g[121].addPoint(205, 180)
				$g[122] = new Rectangle($g[0], $g[19], 0, 0, $g[11], 285, 200, -12, -6, 24, 12, $g[4], $g[15])
				$g[122].setRounded(2, 2)
				$g[123] = new AnimPipe()
				$g[123].addPoint(235, 320)
				$g[123].addPoint(235, 310)
				$g[124] = new AnimPipe()
				$g[124].addPoint(227, 300)
				$g[124].addPoint(227, 180)
				$g[125] = new Rectangle($g[0], $g[19], 0, 0, $g[11], 315, 200, -12, -6, 24, 12, $g[4], $g[15])
				$g[125].setRounded(2, 2)
				$g[126] = new AnimPipe()
				$g[126].addPoint(227, 300)
				$g[126].addPoint(227, 240)
				$g[126].addPoint(295, 240)
				$g[127] = new AnimPipe()
				$g[127].addPoint(235, 300)
				$g[127].addPoint(235, 280)
				$g[127].addPoint(265, 280)
				$g[128] = new AnimPipe()
				$g[128].addPoint(280, 270)
				$g[128].addPoint(280, 255)
				$g[128].addPoint(237, 255)
				$g[128].addPoint(237, 180)
				$g[129] = new Component(217, 300, 40, 10, "demux 1")
				$g[130] = new Register(265, 270, 30, 20, LEFT, "M")
				$g[130].rotateLabel(90)
				$g[131] = new AnimPipe()
				$g[131].addPoint(220, 170)
				$g[131].addPoint(220, 130)
				$g[131].addPoint(180, 130)
				$g[132] = new Rectangle($g[0], $g[19], 0, 0, $g[11], 300, 160, -12, -6, 24, 12, $g[4], $g[15])
				$g[132].setRounded(2, 2)
				$g[133] = new AnimPipe()
				$g[133].addPoint(170, 120)
				$g[133].addPoint(150, 120)
				$g[134] = new AnimPipe()
				$g[134].addPoint(160, 60)
				$g[134].addPoint(140, 60)
				$g[134].addPoint(140, 83)
				$g[134].addPoint(200, 83)
				$g[134].addPoint(200, 110)
				$g[134].addPoint(180, 110)
				$g[135] = new Rectangle($g[0], $g[19], 0, 0, $g[11], 300, 44, -12, 0, 24, 12, $g[4], $g[15])
				$g[136] = new AnimPipe()
				$g[136].addPoint(305, 240)
				$g[136].addPoint(340, 240)
				$g[137] = new AnimPipe()
				$g[137].addPoint(280, 75)
				$g[137].addPoint(280, 230)
				$g[137].addPoint(295, 230)
				$g[138] = new Rectangle($g[0], $g[19], 0, 0, $g[11], 340, 82, -12, 0, 24, 12, $g[4], $g[15], "R0:0")
				$g[138].setRounded(2, 2)
				$g[139] = new AnimPipe()
				$g[139].addPoint(295, 75)
				$g[139].addPoint(295, 210)
				$g[139].addPoint(340, 210)
				$g[140] = new Rectangle($g[0], $g[19], 0, 0, $g[11], 370, 82, -12, 0, 24, 12, $g[4], $g[15], "R0:0")
				$g[140].setRounded(2, 2)
				$g[141] = new InstructionRegister(310, 350, 20, 85, "EX")
				$g[142] = new Register(340, 190, 20, 40, TOP, "A")
				$g[143] = new Register(340, 230, 20, 40, BOTTOM, "B")
				$g[144] = new Component(420, 180, 10, 50, "mux 6")
				$g[145] = new Component(420, 230, 10, 50, "mux 7")
				$g[146] = new Component(420, 310, 10, 40, "mux 8")
				$g[147] = new ALU(450, 190, 40, 80)
				$g[148] = new AnimPipe()
				$g[148].addPoint(330, 390)
				$g[148].addPoint(530, 390)
				$g[149] = new AnimPipe()
				$g[149].addPoint(530, 210)
				$g[149].addPoint(530, 170)
				$g[149].addPoint(390, 170)
				$g[149].addPoint(390, 190)
				$g[149].addPoint(420, 190)
				$g[150] = new AnimPipe()
				$g[150].addPoint(630, 210)
				$g[150].addPoint(630, 160)
				$g[150].addPoint(380, 160)
				$g[150].addPoint(380, 200)
				$g[150].addPoint(420, 200)
				$g[151] = new AnimPipe()
				$g[151].addPoint(360, 220)
				$g[151].addPoint(420, 220)
				$g[152] = new AnimPipe()
				$g[152].addPoint(360, 240)
				$g[152].addPoint(420, 240)
				$g[153] = new AnimPipe()
				$g[153].addPoint(330, 390)
				$g[153].addPoint(370, 390)
				$g[153].addPoint(370, 250)
				$g[153].addPoint(420, 250)
				$g[154] = new Rectangle($g[0], $g[19], 0, 0, $g[11], 432, 370, -10, 0, 20, 12, $g[4], $g[15], "IMM")
				$g[154].setRounded(2, 2)
				$g[155] = new AnimPipe()
				$g[155].addPoint(630, 250)
				$g[155].addPoint(630, 300)
				$g[155].addPoint(380, 300)
				$g[155].addPoint(380, 260)
				$g[155].addPoint(420, 260)
				$g[156] = new AnimPipe()
				$g[156].addPoint(530, 250)
				$g[156].addPoint(530, 290)
				$g[156].addPoint(390, 290)
				$g[156].addPoint(390, 270)
				$g[156].addPoint(420, 270)
				$g[157] = new AnimPipe()
				$g[157].addPoint(530, 250)
				$g[157].addPoint(530, 290)
				$g[157].addPoint(390, 290)
				$g[157].addPoint(390, 320)
				$g[157].addPoint(420, 320)
				$g[158] = new AnimPipe()
				$g[158].addPoint(630, 250)
				$g[158].addPoint(630, 300)
				$g[158].addPoint(380, 300)
				$g[158].addPoint(380, 330)
				$g[158].addPoint(420, 330)
				$g[159] = new AnimPipe()
				$g[159].addPoint(355, 270)
				$g[159].addPoint(355, 340)
				$g[159].addPoint(420, 340)
				$g[160] = new AnimPipe()
				$g[160].addPoint(430, 330)
				$g[160].addPoint(520, 330)
				$g[161] = new AnimPipe()
				$g[161].addPoint(430, 205)
				$g[161].addPoint(450, 205)
				$g[162] = new AnimPipe()
				$g[162].addPoint(430, 255)
				$g[162].addPoint(450, 255)
				$g[163] = new AnimPipe()
				$g[163].addPoint(490, 240)
				$g[163].addPoint(520, 240)
				$g[164] = new InstructionRegister(530, 350, 20, 85, "MA")
				$g[165] = new Register(520, 210, 20, 40, TOP, "O0")
				$g[166] = new Register(520, 320, 40, 20, RIGHT, "SMR")
				new Txt($g[0], $g[17], HLEFT|VTOP, 553, 100, 0, $g[15], "memory\naddress")
				new Txt($g[0], $g[17], HLEFT|VTOP, 605, 320, 0, $g[15], "memory\ndata-in")
				new Txt($g[0], $g[17], HLEFT|VTOP, 615, 100, 0, $g[15], "memory\ndata-out")
				new Txt($g[0], 0, HLEFT|VTOP, 645, 35, 0, $g[15], "Data\nCache\n(memory)")
				$g[167] = newArray(4)
				$g[167][0]=new Register(560, 30, 40, 20, LEFT, "M0")
				$g[167][1]=new Register(560, 50, 40, 20, LEFT, "M1")
				$g[167][2]=new Register(600, 30, 40, 20, RIGHT, "M2")
				$g[167][3]=new Register(600, 50, 40, 20, RIGHT, "M3")
				$g[168] = new Stack(680, 60)
				$g[169] = new Component(590, 210, 10, 40, "mux 9")
				$g[170] = new AnimPipe()
				$g[170].addPoint(550, 390)
				$g[170].addPoint(620, 390)
				$g[171] = new AnimPipe()
				$g[171].addPoint(540, 230)
				$g[171].addPoint(590, 230)
				$g[172] = new AnimPipe()
				$g[172].addPoint(600, 230)
				$g[172].addPoint(620, 230)
				$g[173] = new AnimPipe()
				$g[173].addPoint(540, 230)
				$g[173].addPoint(550, 230)
				$g[173].addPoint(550, 110)
				$g[173].addPoint(680, 110)
				$g[174] = new AnimPipe()
				$g[174].addPoint(560, 330)
				$g[174].addPoint(680, 330)
				$g[175] = new AnimPipe()
				$g[175].addPoint(680, 90)
				$g[175].addPoint(570, 90)
				$g[175].addPoint(570, 220)
				$g[175].addPoint(590, 220)
				$g[176] = new InstructionRegister(620, 350, 20, 85, "WB")
				$g[177] = new Register(620, 210, 20, 40, TOP, "O1")
				$g[178] = new AnimPipe()
				$g[178].addPoint(640, 230)
				$g[178].addPoint(650, 230)
				$g[178].addPoint(650, 10)
				$g[178].addPoint(390, 10)
				$g[178].addPoint(390, 25)
				$g[147].txtResult.moveToFront()
				resetCircuit()
				$g[181] = ""
				$g[179]=0
				$pc = 6
			case 6:
				if (!($g[179]<32)) {
					$pc = 8
					continue
				}
				$g[72].setOpcode(4*$g[179], 0)
				$pc = 7
			case 7:
				$g[179]++
				$pc = 6
				continue
			case 8:
				$g[179]=0
				$pc = 9
			case 9:
				if (!($g[179]<4)) {
					$pc = 11
					continue
				}
				$g[181]=sprintf("r%d", $g[179])
				$g[96][$g[179]].setValue(getArgAsNum($g[181], 0))
				$pc = 10
			case 10:
				$g[179]++
				$pc = 9
				continue
			case 11:
				$g[179]=0
				$pc = 12
			case 12:
				if (!($g[179]<4)) {
					$pc = 14
					continue
				}
				$g[181]=sprintf("m%d", $g[179])
				$g[167][$g[179]].setValue(getArgAsNum($g[181], 0))
				$pc = 13
			case 13:
				$g[179]++
				$pc = 12
				continue
			case 14:
				setTPS(20)
				$g[14]=getArgAsNum("example", 0)
				if (!($g[14]==0)) {
					$pc = 18
					continue
				}
				$g[179]=0
				$pc = 15
			case 15:
				if (!($g[179]<32)) {
					$pc = 17
					continue
				}
				$g[181]=sprintf("i%d", $g[179])
				$g[72].setOpcode(4*$g[179], getArgAsNum($g[181], 0))
				$pc = 16
			case 16:
				$g[179]++
				$pc = 15
				continue
			case 17:
				$pc = 28
				continue
			case 18:
				if (!($g[14]==1)) {
					$pc = 19
					continue
				}
				$g[72].setValue(0, ADDi, 18, 0, 4)
				$g[72].setValue(4, ADDi, 19, 0, 5)
				$g[72].setValue(8, JAL, 1, 0, 20)
				$g[72].setValue(12, XOR, 0, 0, 0)
				$g[72].setValue(28, SUB, 20, 19, 18)
				$g[72].setValue(32, NOP, 0, 0, 0)
				$g[72].setValue(36, NOP, 0, 0, 0)
				$g[72].setValue(40, JALR, 0, 0, 1)
				$g[72].setValue(44, HALT, 0, 0, 0)
				$g[96][2].setValue(9)
				$g[96][3].setValue(8)
				$pc = 27
				continue
			case 19:
				if (!($g[14]==2)) {
					$pc = 20
					continue
				}
				$g[72].setValue(0, ADD, 1, 2, 3)
				$g[72].setValue(4, SUB, 3, 1, 2)
				$g[72].setValue(8, AND, 2, 1, 3)
				$g[72].setValue(12, XOR, 2, 1, 3)
				$g[72].setValue(16, ADD, 2, 1, 0)
				$g[72].setValue(20, HALT, 0, 0, 0)
				$g[96][1].setValue(1)
				$g[96][2].setValue(2)
				setTPS(50)
				$pc = 26
				continue
			case 20:
				if (!($g[14]==3)) {
					$pc = 21
					continue
				}
				$g[72].setValue(0, ADD, 1, 1, 2)
				$g[72].setValue(4, ADD, 2, 1, 2)
				$g[72].setValue(8, ADD, 1, 1, 2)
				$g[72].setValue(12, ADD, 2, 1, 2)
				$g[72].setValue(16, ADD, 1, 1, 2)
				$g[72].setValue(20, HALT, 0, 0, 0)
				$g[96][1].setValue(1)
				$g[96][2].setValue(2)
				setTPS(50)
				$pc = 25
				continue
			case 21:
				if (!($g[14]==4)) {
					$pc = 22
					continue
				}
				$g[72].setValue(0, ADDi, 1, 0, 13)
				$g[72].setValue(4, ADDi, 2, 0, 4)
				$g[72].setValue(8, DIV, 3, 1, 2)
				$pc = 24
				continue
			case 22:
				if (!($g[14]==5)) {
					$pc = 23
					continue
				}
				$g[72].setValue(0, ADDi, 1, 0, 3)
				$g[72].setValue(4, ADDi, 2, 0, 2)
				$g[72].setValue(8, MUL, 3, 1, 2)
				$pc = 23
			case 23:
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
				if (!($g[14]>0)) {
					$pc = 32
					continue
				}
				$g[179]=0
				$pc = 29
			case 29:
				if (!($g[179]<32)) {
					$pc = 31
					continue
				}
				$g[181]=sprintf("i%d", $g[179])
				setArg($g[181], $g[72].getOpcode($g[179]*4).toString())
				$pc = 30
			case 30:
				$g[179]++
				$pc = 29
				continue
			case 31:
				$g[14]=($g[14]>maxexample) ? 0 : $g[14]
				$pc = 32
			case 32:
				$g[182] = getArgAsNum("haltOnHalt", 1)
				$g[27]=getArgAsNum("bpMode", 0)
				setBPMode($g[27])
				$g[28]=getArgAsNum("liMode", 0)
				setLIMode($g[28])
				$g[29]=getArgAsNum("afMode", 0)
				setAFMode($g[29])
				$g[30]=getArgAsNum("sfMode", 0)
				setSFMode($g[30])
				$g[31]=getArgAsNum("zfMode", 0)
				setZFMode($g[31])
				$g[26]=getArgAsNum("peMode", 0)
				setPEMode($g[26])
				$g[22]=getArgAsNum("locked", 0)
				$g[96][2].setValue(68)
				$g[168].setSP(17)
				$g[189] = 0
				$g[190] = 0
				$g[191] = 1
				$g[192] = CHECK
				$g[194] = 0
				$g[195] = 0
				$g[201] = 1
				$g[61].label.addEventHandler("eventMB", this, $eh12)
				$g[62].label.addEventHandler("eventMB", this, $eh13)
				$g[63].label.addEventHandler("eventMB", this, $eh14)
				$g[64].label.addEventHandler("eventMB", this, $eh15)
				$g[65].label.addEventHandler("eventMB", this, $eh16)
				$g[66].label.addEventHandler("eventMB", this, $eh17)
				$g[60].label.addEventHandler("eventMB", this, $eh18)
				$g[67].addEventHandler("eventMB", this, $eh19)
				$g[52].addEventHandler("eventMB", this, $eh20)
				$g[71].addEventHandler("eventEE", this, $eh21)
				$g[71].addEventHandler("eventMB", this, $eh22)
				callf(358, $obj)
				continue
			case 33:
				returnf(0)
				continue
			case 34:
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
				$pc = 35
			case 35:
				$obj.r2.setBrush($g[12])
				returnf(0)
				continue
			case 36:
				enterf(0);	// update
				$obj.value=$obj.newValue
				$obj.tag=$obj.newTag
				$obj.updateLabel()
				$obj.bg1.setBrush($g[13])
				$obj.bg2.setBrush($g[13])
				if (wait(16))
				return
				$pc = 37
			case 37:
				$obj.bg1.setBrush($g[12])
				$obj.bg2.setBrush($g[12])
				returnf(0)
				continue
			case 38:
				enterf(0);	// store
				$obj.stack[$stack[$fp-3]].setNewValue($stack[$fp-4])
				callf(36, $obj.stack[$stack[$fp-3]])
				continue
			case 39:
				returnf(2)
				continue
			case 40:
				enterf(5);	// animate
				$stack[$fp+1] = 0, $stack[$fp+3] = 0
				$stack[$fp+4] = 0
				$obj.calcLength()
				$obj.fgLine.setPt(0, $obj.px[0], $obj.py[0])
				$obj.fgLine.setPen($obj.fgPen0)
				$stack[$fp+5] = 1
				$pc = 41
			case 41:
				if (!($stack[$fp+5]<$obj.n)) {
					$pc = 44
					continue
				}
				$obj.fgLine.setPt($stack[$fp+5], $obj.px[$stack[$fp+5]-1], $obj.py[$stack[$fp+5]-1])
				$stack[$fp+1]+=$obj.ls[$stack[$fp+5]-1]
				$stack[$fp+2]=round($stack[$fp+1]*$stack[$fp-3]/$obj.ll)
				if ($obj.fgLine.setPt($stack[$fp+5], $obj.px[$stack[$fp+5]], $obj.py[$stack[$fp+5]], $stack[$fp+2]-$stack[$fp+3], 1, 1))
				return
				$pc = 42
			case 42:
				$stack[$fp+3]=$stack[$fp+2]
				$pc = 43
			case 43:
				$stack[$fp+5]++
				$pc = 41
				continue
			case 44:
				if (!($obj.head)) {
					$pc = 45
					continue
				}
				$obj.fgLine.setPen($obj.fgPen1)
				$pc = 45
			case 45:
				returnf(1)
				continue
			case 46:
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
				$pc = 47
			case 47:
				$obj.prev_clock.translate(-$obj.chw, 0, $stack[$fp+1], 1, 0)
				$obj.next_clock.translate(-$obj.chw, 0, $stack[$fp+1], 1, 0)
				$obj.dot.translate(0, $obj.ch, $stack[$fp+2], 1, 0)
				if (wait($stack[$fp+3]))
				return
				$pc = 48
			case 48:
				$obj.canUpdate=1
				$obj.prev_clock.translate(2*$obj.cw, 0)
				$obj.prev_clock.setPen($obj.stall ? ($obj.type ? $g[47] : $g[45]) : $g[46])
				if (wait($stack[$fp+2]*2))
				return
				$pc = 49
			case 49:
				$stack[$fp+4] = $obj.next_clock
				$obj.next_clock=$obj.prev_clock
				$obj.prev_clock=$stack[$fp+4]
				if (!($obj.stall)) {
					$pc = 50
					continue
				}
				$obj.stall--
				$pc = 50
			case 50:
				returnf(1)
				continue
			case 51:
				enterf(0);	// ifExec
				if (!(($g[23]==NO_STALL) || ($g[23]==CTRL_STALL))) {
					$pc = 52
					continue
				}
				fork(36, $g[74])
				$g[72].setActive($g[74].newValue)
				$pc = 52
			case 52:
				if (wait(8))
				return
				$pc = 53
			case 53:
				if (!(($g[27]==BRANCH_PREDICTION) && (btbIndex($g[74].value)!=-1))) {
					$pc = 54
					continue
				}
				$g[24]=btbIndex($g[74].value)
				$g[74].setNewValue($g[77][$g[24]].value)
				$g[183]=$g[85]
				$pc = 55
				continue
			case 54:
				$g[74].setNewValue(($g[74].value+4)&127)
				$g[183]=$g[87]
				$pc = 55
			case 55:
				$g[95].setNewValue($g[74].value)
				$g[94].setNewInstruction($g[72].instruction[$g[74].value/4])
				if (wait(8))
				return
				$pc = 56
			case 56:
				fork(40, $g[91], 64)
				fork(40, $g[83], 24)
				fork(40, $g[90], 24)
				if (!(($g[27]==BRANCH_PREDICTION) && (instrIsJump($g[94].vIns)))) {
					$pc = 62
					continue
				}
				if (!($g[23]==CTRL_STALL)) {
					$pc = 58
					continue
				}
				callf(40, $g[89], 12)
				continue
			case 57:
				$pc = 60
				continue
			case 58:
				callf(40, $g[114], 12)
				continue
			case 59:
				$pc = 60
			case 60:
				callf(40, $g[92], 12)
				continue
			case 61:
				$pc = 64
				continue
			case 62:
				if (wait(24))
				return
				$pc = 63
			case 63:
				$pc = 64
			case 64:
				fork(40, $g[81], 40)
				if (!(($g[27]==BRANCH_PREDICTION) && (btbIndex($g[74].value)!=-1))) {
					$pc = 65
					continue
				}
				$g[76][btbIndex($g[74].value)].highlight($g[21])
				$g[77][btbIndex($g[74].value)].highlight($g[21])
				$pc = 65
			case 65:
				$g[82].setTxt($g[94].getNewInstrTxt())
				if ($g[82].setOpacity(1, 16, 1, 1))
				return
				$pc = 66
			case 66:
				callf(40, $g[183], 16)
				continue
			case 67:
				callf(40, $g[88], 8)
				continue
			case 68:
				returnf(0)
				continue
			case 69:
				enterf(0);	// sendBTBOperands
				callf(40, $g[185], 18)
				continue
			case 70:
				callf(40, $g[133], 6)
				continue
			case 71:
				returnf(0)
				continue
			case 72:
				enterf(1);	// idExec
				if (!($g[23]==NO_STALL)) {
					$pc = 73
					continue
				}
				fork(36, $g[95])
				fork(34, $g[94])
				$pc = 73
			case 73:
				if (!($g[190]==1)) {
					$pc = 74
					continue
				}
				$g[94].setNewValue(STALL, 0, 0, 0)
				$g[190]=0
				$pc = 74
			case 74:
				if (!($g[25] && ($g[27]==BRANCH_PREDICTION))) {
					$pc = 75
					continue
				}
				fork(36, $g[76][$g[24]])
				fork(36, $g[77][$g[24]])
				$pc = 75
			case 75:
				if (wait(16))
				return
				$pc = 76
			case 76:
				fork(40, $g[93], 64)
				if (!(instrIsBranch($g[94].vIns))) {
					$pc = 82
					continue
				}
				fork(40, $g[116], 16)
				fork(40, $g[118], 16)
				fork(40, $g[117], 16)
				fork(40, $g[119], 16)
				fork(40, $g[139], 16)
				fork(40, $g[137], 16)
				if (wait(12))
				return
				$pc = 77
			case 77:
				$g[120].setTxt("%02X", $g[94].vRs2)
				$g[120].setOpacity(1)
				if (wait(4))
				return
				$pc = 78
			case 78:
				fork(40, $g[121], 8)
				fork(40, $g[123], 8)
				if (wait(2))
				return
				$pc = 79
			case 79:
				fork(40, $g[127], 8)
				$g[96][$g[94].vRs1].highlight($g[21])
				$g[142].setNewValue($g[96][$g[94].vRs1].value)
				$g[96][$g[94].vRdt].highlight($g[21])
				$g[143].setNewValue($g[96][$g[94].vRdt].value)
				fork(40, $g[136], 5)
				if (wait(4))
				return
				$pc = 80
			case 80:
				$g[130].setNewValue($g[95].value+$g[94].vRs2)
				callf(36, $g[130])
				continue
			case 81:
				$pc = 97
				continue
			case 82:
				if (!(isJorJAL($g[94].vIns))) {
					$pc = 91
					continue
				}
				if (!($g[94].vIns==JAL)) {
					$pc = 83
					continue
				}
				fork(40, $g[116], 16)
				fork(40, $g[118], 16)
				$pc = 83
			case 83:
				if (!($g[23]==NO_STALL)) {
					$pc = 88
					continue
				}
				fork(40, $g[117], 16)
				fork(40, $g[119], 16)
				if (wait(12))
				return
				$pc = 84
			case 84:
				$g[120].setTxt("%02X", $g[94].vRs2)
				$g[120].setOpacity(1)
				if (wait(4))
				return
				$pc = 85
			case 85:
				fork(40, $g[123], 8)
				if (wait(2))
				return
				$pc = 86
			case 86:
				callf(40, $g[124], 8)
				continue
			case 87:
				$pc = 90
				continue
			case 88:
				if (wait(24))
				return
				$pc = 89
			case 89:
				$pc = 90
			case 90:
				$pc = 96
				continue
			case 91:
				if (!($g[94].vIns==JALR)) {
					$pc = 93
					continue
				}
				fork(40, $g[116], 32)
				fork(40, $g[118], 32)
				if (wait(24))
				return
				$pc = 92
			case 92:
				$pc = 95
				continue
			case 93:
				if (wait(24))
				return
				$pc = 94
			case 94:
				$pc = 95
			case 95:
				$pc = 96
			case 96:
				$pc = 97
			case 97:
				if (wait(9))
				return
				$pc = 98
			case 98:
				if (!(instrIsJump($g[94].vIns) || instrIsBranch($g[141].vIns))) {
					$pc = 99
					continue
				}
				calcNewPC()
				$pc = 99
			case 99:
				if (!(instrIsJumpR($g[94].vIns) && ($g[23]==NO_STALL))) {
					$pc = 100
					continue
				}
				$g[135].setTxt("%02X", $g[187])
				$g[135].setOpacity(1, 8, 1, 0)
				$pc = 100
			case 100:
				if (!(instrIsBranchOrJump($g[94].vIns))) {
					$pc = 101
					continue
				}
				fork(69, $obj)
				$pc = 101
			case 101:
				detectStall()
				$g[189]=0
				if (!((instrIsJump($g[94].vIns) || instrIsBranch($g[141].vIns)) && ($g[23]!=DATA_STALL))) {
					$pc = 102
					continue
				}
				updBTB()
				$pc = 102
			case 102:
				if (!($g[23]==NO_STALL)) {
					$pc = 103
					continue
				}
				$g[141].setNewValue($g[94].vIns, $g[94].vRdt, $g[94].vRs1, $g[94].vRs2)
				$pc = 107
				continue
			case 103:
				if (!($g[190]==0 && $g[194]==0)) {
					$pc = 106
					continue
				}
				if (!($g[94].vIns==JAL)) {
					$pc = 104
					continue
				}
				$g[141].setNewValue($g[94].vIns, $g[94].vRdt, $g[94].vRs1, $g[94].vRs2)
				$pc = 105
				continue
			case 104:
				$g[141].setNewValue(STALL, 0, 0, 0)
				$pc = 105
			case 105:
				$pc = 106
			case 106:
				$pc = 107
			case 107:
				if (wait(7))
				return
				$pc = 108
			case 108:
				if (!(instrIsBranch($g[94].vIns)==0)) {
					$pc = 125
					continue
				}
				if (!(instrOpTypeRdt($g[94].vIns)==OP_TYPE_REG)) {
					$pc = 124
					continue
				}
				if (!(instrIsJumpAndLink($g[94].vIns))) {
					$pc = 115
					continue
				}
				if (!($g[23]==NO_STALL)) {
					$pc = 111
					continue
				}
				$g[142].setNewValue(0)
				$g[143].setNewValue(($g[95].value+4)&127)
				callf(40, $g[115], 18)
				continue
			case 109:
				callf(40, $g[136], 6)
				continue
			case 110:
				$pc = 114
				continue
			case 111:
				$g[142].setNewValue(0)
				$g[143].setNewValue(($g[95].value+$g[94].vRs2)&127)
				callf(40, $g[126], 18)
				continue
			case 112:
				callf(40, $g[136], 6)
				continue
			case 113:
				$pc = 114
			case 114:
				$pc = 123
				continue
			case 115:
				$g[96][$g[94].vRs1].highlight($g[21])
				$g[142].setNewValue($g[96][$g[94].vRs1].value)
				if (!(instrOpTypeRs2($g[94].vIns)==OP_TYPE_REG)) {
					$pc = 116
					continue
				}
				$g[96][$g[94].vRs2].highlight($g[21])
				$g[143].setNewValue($g[96][$g[94].vRs2].value)
				$pc = 117
				continue
			case 116:
				$g[96][$g[94].vRdt].highlight($g[21])
				$g[143].setNewValue($g[96][$g[94].vRdt].value)
				$pc = 117
			case 117:
				$g[140].setTxt("R%d:%02X", $g[94].vRs1, $g[96][$g[94].vRs1].value)
				$g[140].setOpacity(1)
				fork(40, $g[139], 5)
				if (!(instrIsBranch($g[94].vIns))) {
					$pc = 119
					continue
				}
				fork(40, $g[137], 5)
				callf(40, $g[136], 5)
				continue
			case 118:
				$pc = 119
			case 119:
				if (!((!instrIsArRI($g[94].vIns)) && ($g[94].vIns!=LD))) {
					$pc = 122
					continue
				}
				$stack[$fp+1] = ($g[94].vIns==ST) ? $g[94].vRdt : $g[94].vRs2
				$g[138].setTxt("R%d:%02X", $stack[$fp+1], $g[96][$stack[$fp+1]].value)
				$g[138].setOpacity(1)
				callf(40, $g[137], 18)
				continue
			case 120:
				callf(40, $g[136], 6)
				continue
			case 121:
				$pc = 122
			case 122:
				$pc = 123
			case 123:
				$pc = 124
			case 124:
				$pc = 125
			case 125:
				returnf(0)
				continue
			case 126:
				enterf(7);	// exExec
				fork(34, $g[141])
				if (!(!instrIsNop($g[141].nIns))) {
					$pc = 127
					continue
				}
				fork(36, $g[142])
				fork(36, $g[143])
				$pc = 127
			case 127:
				if (wait(8))
				return
				$pc = 128
			case 128:
				$g[164].setNewValue($g[141].vIns, $g[141].vRdt, $g[141].vRs1, $g[141].vRs2)
				if (!(instrOpTypeRdt($g[141].vIns)==OP_TYPE_REG)) {
					$pc = 202
					continue
				}
				if (!(instrIsMulti($g[141].vIns))) {
					$pc = 138
					continue
				}
				if (!($g[141].vIns==MUL)) {
					$pc = 130
					continue
				}
				$g[194]=1
				if (!($g[191]==0)) {
					$pc = 129
					continue
				}
				$stack[$fp+1]=0
				$pc = 129
			case 129:
				$pc = 137
				continue
			case 130:
				if (!($g[191]==0)) {
					$pc = 136
					continue
				}
				if (!($g[192]==CHECK)) {
					$pc = 131
					continue
				}
				$stack[$fp+1]=$g[149]
				$stack[$fp+4]=$g[165].value
				$pc = 135
				continue
			case 131:
				if (!($g[192]==EXEC)) {
					$pc = 134
					continue
				}
				if (!($g[195]==0)) {
					$pc = 132
					continue
				}
				$stack[$fp+1]=$g[150]
				$stack[$fp+4]=$g[177].value
				$pc = 133
				continue
			case 132:
				$stack[$fp+1]=0
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
				$pc = 138
			case 138:
				if (!(instrIsJumpAndLink($g[141].vIns))) {
					$pc = 139
					continue
				}
				$stack[$fp+1]=0
				$stack[$fp+4]=0
				$pc = 148
				continue
			case 139:
				if (!($g[29]==ALU_FORWARDING)) {
					$pc = 145
					continue
				}
				if (!(!(instrIsMulti($g[141].vIns) && $g[191]==0))) {
					$pc = 144
					continue
				}
				if (!($g[165].tagMatches($g[141].vRs1))) {
					$pc = 140
					continue
				}
				$stack[$fp+1]=$g[149]
				$stack[$fp+4]=$g[165].value
				$pc = 143
				continue
			case 140:
				if (!($g[177].tagMatches($g[141].vRs1))) {
					$pc = 141
					continue
				}
				$stack[$fp+1]=$g[150]
				$stack[$fp+4]=$g[177].value
				$pc = 142
				continue
			case 141:
				$stack[$fp+1]=$g[151]
				$stack[$fp+4]=$g[142].value
				$pc = 142
			case 142:
				$pc = 143
			case 143:
				$pc = 144
			case 144:
				$pc = 147
				continue
			case 145:
				if (!(!(instrIsMulti($g[141].vIns) && $g[191]==0))) {
					$pc = 146
					continue
				}
				$stack[$fp+1]=$g[151]
				$stack[$fp+4]=$g[142].value
				$pc = 146
			case 146:
				$pc = 147
			case 147:
				$pc = 148
			case 148:
				if (!(instrIsJumpAndLink($g[141].vIns))) {
					$pc = 149
					continue
				}
				$stack[$fp+2]=$g[152]
				$stack[$fp+5]=$g[143].value
				$pc = 168
				continue
			case 149:
				if (!(instrOpTypeRs2($g[141].vIns)==OP_TYPE_IMM)) {
					$pc = 158
					continue
				}
				if (!(instrIsBranch($g[141].vIns))) {
					$pc = 156
					continue
				}
				if (!($g[29]==ALU_FORWARDING)) {
					$pc = 154
					continue
				}
				if (!($g[165].tagMatches($g[141].vRdt))) {
					$pc = 150
					continue
				}
				$stack[$fp+2]=$g[156]
				$stack[$fp+5]=$g[165].value
				$pc = 153
				continue
			case 150:
				if (!($g[177].tagMatches($g[141].vRdt))) {
					$pc = 151
					continue
				}
				$stack[$fp+2]=$g[155]
				$stack[$fp+5]=$g[177].value
				$pc = 152
				continue
			case 151:
				$stack[$fp+2]=$g[152]
				$stack[$fp+5]=$g[143].value
				$pc = 152
			case 152:
				$pc = 153
			case 153:
				$pc = 155
				continue
			case 154:
				$stack[$fp+2]=$g[152]
				$stack[$fp+5]=$g[143].value
				$pc = 155
			case 155:
				$pc = 157
				continue
			case 156:
				$stack[$fp+2]=$g[153]
				$stack[$fp+5]=$g[141].vRs2
				$pc = 157
			case 157:
				$pc = 167
				continue
			case 158:
				if (!($g[29]==ALU_FORWARDING)) {
					$pc = 164
					continue
				}
				if (!(!(instrIsMulti($g[141].vIns) && $g[191]==0))) {
					$pc = 163
					continue
				}
				if (!($g[165].tagMatches($g[141].vRs2))) {
					$pc = 159
					continue
				}
				$stack[$fp+2]=$g[156]
				$stack[$fp+5]=$g[165].value
				$pc = 162
				continue
			case 159:
				if (!($g[177].tagMatches($g[141].vRs2))) {
					$pc = 160
					continue
				}
				$stack[$fp+2]=$g[155]
				$stack[$fp+5]=$g[177].value
				$pc = 161
				continue
			case 160:
				$stack[$fp+2]=$g[152]
				$stack[$fp+5]=$g[143].value
				$pc = 161
			case 161:
				$pc = 162
			case 162:
				$pc = 163
			case 163:
				$pc = 166
				continue
			case 164:
				if (!(!(instrIsMulti($g[141].vIns) && $g[191]==0))) {
					$pc = 165
					continue
				}
				$stack[$fp+2]=$g[152]
				$stack[$fp+5]=$g[143].value
				$pc = 165
			case 165:
				$pc = 166
			case 166:
				$pc = 167
			case 167:
				$pc = 168
			case 168:
				$stack[$fp+6] = 0
				if (!(instrIsMulti($g[141].vIns))) {
					$pc = 187
					continue
				}
				if (!($g[141].vIns==MUL)) {
					$pc = 176
					continue
				}
				if (!($g[191]==1)) {
					$pc = 171
					continue
				}
				if (!(($stack[$fp+4]>15) || ($stack[$fp+5]>15))) {
					$pc = 169
					continue
				}
				$g[202]=0
				$pc = 170
				continue
			case 169:
				$g[202]=1
				$pc = 170
			case 170:
				$g[111].setPen($g[107])
				$g[198]=$stack[$fp+4]
				$g[199]=0
				$g[200]=$stack[$fp+5]
				calcNoCycles($stack[$fp+4])
				$g[191]=0
				$g[197]=0
				$stack[$fp+6]=$stack[$fp+4]
				$pc = 175
				continue
			case 171:
				if (!($g[202]==1)) {
					$pc = 172
					continue
				}
				booth()
				$stack[$fp+6]=$g[198]
				$pc = 173
				continue
			case 172:
				booth8()
				$stack[$fp+6]=$g[198]
				$pc = 173
			case 173:
				$g[196]--
				if (!($g[196]<=0)) {
					$pc = 174
					continue
				}
				$g[194]=0
				$pc = 174
			case 174:
				$pc = 175
			case 175:
				$pc = 186
				continue
			case 176:
				if (!($g[191]==1)) {
					$pc = 177
					continue
				}
				$g[111].setPen($g[107])
				$g[198]=0
				$g[200]=$stack[$fp+5]
				$stack[$fp+6]=$stack[$fp+4]
				$g[191]=0
				$g[194]=1
				$g[192]=CHECK
				$pc = 185
				continue
			case 177:
				if (!($g[195]==0)) {
					$pc = 182
					continue
				}
				if (!($g[192]==CHECK)) {
					$pc = 180
					continue
				}
				$stack[$fp+6]=instrExecute(SLT, $stack[$fp+4], $g[200])
				if (!($stack[$fp+6]==1)) {
					$pc = 179
					continue
				}
				$g[195]=1
				if (!($g[141].vIns==REM)) {
					$pc = 178
					continue
				}
				$g[194]=0
				$pc = 178
			case 178:
				$pc = 179
			case 179:
				$g[192]=EXEC
				$pc = 181
				continue
			case 180:
				$stack[$fp+6]=instrExecute(SUB, $stack[$fp+4], $g[200])
				$g[192]=CHECK
				$g[198]+=1
				$pc = 181
			case 181:
				$pc = 184
				continue
			case 182:
				if (!($g[141].vIns==DIV)) {
					$pc = 183
					continue
				}
				$stack[$fp+6]=$g[198]
				$pc = 183
			case 183:
				$g[194]=0
				$pc = 184
			case 184:
				$pc = 185
			case 185:
				$pc = 186
			case 186:
				$pc = 188
				continue
			case 187:
				$stack[$fp+6]=instrExecute($g[141].vIns, $stack[$fp+4], $stack[$fp+5])
				$pc = 188
			case 188:
				if (!(($g[141].vRdt==0)&(instrIsBranch($g[141].vIns)==0))) {
					$pc = 189
					continue
				}
				$stack[$fp+6]=0
				$pc = 189
			case 189:
				if (!(instrIsBranch($g[141].vIns)==0)) {
					$pc = 190
					continue
				}
				$g[165].setNewValue($stack[$fp+6])
				$g[189]=0
				$pc = 191
				continue
			case 190:
				$g[189]=$stack[$fp+6]
				$pc = 191
			case 191:
				if (!(instrIsLoadOrStore($g[141].vIns))) {
					$pc = 192
					continue
				}
				$g[165].setNewTag(-1)
				$pc = 201
				continue
			case 192:
				if (!(($g[141].vIns==DIV || $g[141].vIns==REM) && $g[191]==0)) {
					$pc = 197
					continue
				}
				if (!($g[192]==EXEC)) {
					$pc = 195
					continue
				}
				if (!($g[195]==0)) {
					$pc = 193
					continue
				}
				$g[165].setNewTag(0)
				$pc = 194
				continue
			case 193:
				$g[165].setNewTag($g[141].vRdt)
				$pc = 194
			case 194:
				$pc = 196
				continue
			case 195:
				$g[165].setNewTag($g[141].vRdt)
				$pc = 196
			case 196:
				$pc = 200
				continue
			case 197:
				if (!(($g[141].vIns==JAL) && ($g[23]==CTRL_STALL))) {
					$pc = 198
					continue
				}
				$g[165].setNewTag(8)
				$pc = 199
				continue
			case 198:
				$g[165].setNewTag($g[141].vRdt)
				$pc = 199
			case 199:
				$pc = 200
			case 200:
				$pc = 201
			case 201:
				$g[165].setInvalid(0)
				$pc = 204
				continue
			case 202:
				if (!($g[141].vIns==NOP)) {
					$pc = 203
					continue
				}
				$g[165].setInvalid(1)
				$g[165].updateLabel()
				$pc = 203
			case 203:
				$pc = 204
			case 204:
				if (!($g[141].vIns==JAL)) {
					$pc = 206
					continue
				}
				if (!($g[23]=CTRL_STALL)) {
					$pc = 205
					continue
				}
				$stack[$fp+7] = $g[168].spAddr
				$g[168].setFP($stack[$fp+7])
				$pc = 205
			case 205:
				$pc = 206
			case 206:
				if (!($g[141].vIns==ST)) {
					$pc = 213
					continue
				}
				if (!($g[30]==FORWARDING_TO_SMDR)) {
					$pc = 211
					continue
				}
				if (!($g[165].tagMatches($g[141].vRdt))) {
					$pc = 207
					continue
				}
				$stack[$fp+3]=$g[157]
				$g[166].setNewValue($g[165].value)
				$pc = 210
				continue
			case 207:
				if (!($g[177].tagMatches($g[141].vRdt))) {
					$pc = 208
					continue
				}
				$stack[$fp+3]=$g[158]
				$g[166].setNewValue($g[177].value)
				$pc = 209
				continue
			case 208:
				$stack[$fp+3]=$g[159]
				$g[166].setNewValue($g[143].value)
				$pc = 209
			case 209:
				$pc = 210
			case 210:
				$pc = 212
				continue
			case 211:
				$stack[$fp+3]=$g[159]
				$g[166].setNewValue($g[143].value)
				$pc = 212
			case 212:
				$pc = 213
			case 213:
				if (wait(8))
				return
				$pc = 214
			case 214:
				fork(40, $g[148], 64)
				if (!($g[141].vIns==ST)) {
					$pc = 215
					continue
				}
				fork(40, $stack[$fp+3], 24)
				$pc = 215
			case 215:
				if (!(instrOpTypeRdt($g[141].vIns)==OP_TYPE_REG)) {
					$pc = 218
					continue
				}
				if (!($stack[$fp+1]!=0)) {
					$pc = 216
					continue
				}
				fork(40, $stack[$fp+1], 24)
				$pc = 216
			case 216:
				if (!($stack[$fp+2]==$g[153])) {
					$pc = 217
					continue
				}
				$g[154].setTxt("%02X", $stack[$fp+5])
				$g[154].setOpacity(1)
				$pc = 217
			case 217:
				fork(40, $stack[$fp+2], 24)
				$pc = 218
			case 218:
				if (wait(24))
				return
				$pc = 219
			case 219:
				if (!($g[141].vIns==ST)) {
					$pc = 220
					continue
				}
				fork(40, $g[160], 40)
				$pc = 220
			case 220:
				if (!(instrOpTypeRdt($g[141].vIns)==OP_TYPE_REG)) {
					$pc = 236
					continue
				}
				if (!($g[141].vIns==MUL)) {
					$pc = 221
					continue
				}
				$g[147].txtOp.setTxt($g[196].toString())
				$g[147].txtOp.setOpacity(1)
				$pc = 222
				continue
			case 221:
				$g[147].setTxtOp($g[141].vIns)
				$pc = 222
			case 222:
				if (!($stack[$fp+1]!=0)) {
					$pc = 223
					continue
				}
				fork(40, $g[161], 10)
				$pc = 223
			case 223:
				if (!(instrIsMulti($g[141].vIns) && $g[191]==1)) {
					$pc = 225
					continue
				}
				if (!($g[141].vIns==MUL)) {
					$pc = 224
					continue
				}
				$g[191]=0
				$pc = 224
			case 224:
				$pc = 227
				continue
			case 225:
				if (!(!instrIsMulti($g[141].vIns))) {
					$pc = 226
					continue
				}
				fork(40, $g[162], 10)
				$pc = 226
			case 226:
				$pc = 227
			case 227:
				if (!(instrIsBranch($g[141].vIns))) {
					$pc = 230
					continue
				}
				if (wait(5))
				return
				$pc = 228
			case 228:
				if (!($g[189]==1)) {
					$pc = 229
					continue
				}
				$g[113].setPen($g[107])
				$pc = 229
			case 229:
				$pc = 235
				continue
			case 230:
				if (!((($g[141].vIns==DIV) || ($g[141].vIns==REM)) && ($g[191]==1))) {
					$pc = 231
					continue
				}
				$pc = 231
			case 231:
				if (wait(20))
				return
				$pc = 232
			case 232:
				callf(40, $g[163], 10)
				continue
			case 233:
				if (wait(10))
				return
				$pc = 234
			case 234:
				$g[147].txtResult.setTxt("%02X", $stack[$fp+6])
				$g[147].txtResult.setOpacity(1, 20, 1, 0)
				$pc = 235
			case 235:
				$pc = 236
			case 236:
				returnf(0)
				continue
			case 237:
				enterf(0);	// maExec
				fork(34, $g[164])
				if (!(instrOpTypeRdt($g[164].nIns)==OP_TYPE_REG)) {
					$pc = 238
					continue
				}
				fork(36, $g[165])
				$pc = 238
			case 238:
				if (!($g[164].nIns==ST)) {
					$pc = 239
					continue
				}
				fork(36, $g[166])
				$pc = 239
			case 239:
				if (wait(8))
				return
				$pc = 240
			case 240:
				$g[176].setNewValue($g[164].vIns, $g[164].vRdt, $g[164].vRs1, $g[164].vRs2)
				if (!((instrOpTypeRdt($g[164].vIns)==OP_TYPE_REG) && ($g[164].vIns!=ST))) {
					$pc = 243
					continue
				}
				if (!($g[164].vIns==LD)) {
					$pc = 241
					continue
				}
				$g[177].setNewValue($g[168].getVal($g[165].value%MEMORY_ADDRESSES))
				$g[177].setNewTag($g[164].vRdt)
				$pc = 242
				continue
			case 241:
				$g[177].setNewValue($g[165].value)
				$g[177].setNewTag($g[165].tag)
				$pc = 242
			case 242:
				$g[177].setInvalid(0)
				$pc = 243
			case 243:
				if (wait(8))
				return
				$pc = 244
			case 244:
				fork(40, $g[170], 64)
				if (!($g[164].vIns==ST)) {
					$pc = 247
					continue
				}
				fork(40, $g[174], 24)
				callf(40, $g[173], 24)
				continue
			case 245:
				callf(38, $g[168], $g[165].value%MEMORY_ADDRESSES, $g[166].value)
				continue
			case 246:
				$pc = 255
				continue
			case 247:
				if (!(instrOpTypeRdt($g[164].vIns)==OP_TYPE_REG)) {
					$pc = 254
					continue
				}
				if (!($g[164].vIns==LD)) {
					$pc = 250
					continue
				}
				callf(40, $g[173], 24)
				continue
			case 248:
				$g[168].highlight($g[165].value%MEMORY_ADDRESSES)
				callf(40, $g[175], 24)
				continue
			case 249:
				$pc = 252
				continue
			case 250:
				callf(40, $g[171], 48)
				continue
			case 251:
				$pc = 252
			case 252:
				callf(40, $g[172], 16)
				continue
			case 253:
				$pc = 254
			case 254:
				$pc = 255
			case 255:
				returnf(0)
				continue
			case 256:
				enterf(0);	// wbExec
				fork(34, $g[176])
				if (!((instrOpTypeRdt($g[176].nIns)==OP_TYPE_REG) && ($g[176].nIns!=ST))) {
					$pc = 257
					continue
				}
				fork(36, $g[177])
				$pc = 257
			case 257:
				if (wait(8))
				return
				$pc = 258
			case 258:
				if (!((instrOpTypeRdt($g[176].vIns)==OP_TYPE_REG) && ($g[176].vIns!=ST))) {
					$pc = 264
					continue
				}
				if (!($g[177].tag!=0)) {
					$pc = 259
					continue
				}
				$g[96][$g[177].tag].setNewValue($g[177].value)
				$pc = 259
			case 259:
				if (wait(8))
				return
				$pc = 260
			case 260:
				callf(40, $g[178], 24)
				continue
			case 261:
				callf(36, $g[96][$g[177].tag])
				continue
			case 262:
				if (wait(19))
				return
				$pc = 263
			case 263:
				$pc = 266
				continue
			case 264:
				if (wait(67))
				return
				$pc = 265
			case 265:
				$pc = 266
			case 266:
				if (!($g[176].vIns!=STALL && $g[176].vIns!=EMPTY)) {
					$pc = 267
					continue
				}
				$g[33]++
				$g[69].setTxt("%4d", $g[33])
				$pc = 267
			case 267:
				$g[34]++
				$g[70].setTxt("%4d", $g[34])
				returnf(0)
				continue
			case 268:
				enterf(0);	// nonPipelinedBranch
				fork(40, $g[118], 24)
				fork(40, $g[119], 24)
				callf(40, $g[91], 12)
				continue
			case 269:
				fork(40, $g[116], 12)
				fork(40, $g[117], 12)
				if (wait(12))
				return
				$pc = 270
			case 270:
				if (!(instrIsBranch($g[141].vIns))) {
					$pc = 273
					continue
				}
				$g[74].setNewValue($g[130].value&127)
				callf(36, $g[74])
				continue
			case 271:
				callf(40, $g[84], 14)
				continue
			case 272:
				$pc = 283
				continue
			case 273:
				if (!(instrIsJumpR($g[94].vIns))) {
					$pc = 275
					continue
				}
				$g[74].setNewValue(($g[96][$g[94].vRs2].value)&127)
				callf(40, $g[86], 34)
				continue
			case 274:
				$pc = 282
				continue
			case 275:
				if (!(isJorJAL($g[94].vIns))) {
					$pc = 278
					continue
				}
				$g[74].setNewValue(($g[74].value+$g[94].vRs2)&127)
				callf(40, $g[123], 20)
				continue
			case 276:
				callf(40, $g[84], 14)
				continue
			case 277:
				$pc = 281
				continue
			case 278:
				$g[74].setNewValue(($g[74].value+4)&127)
				callf(40, $g[121], 20)
				continue
			case 279:
				callf(40, $g[84], 14)
				continue
			case 280:
				$pc = 281
			case 281:
				$pc = 282
			case 282:
				$pc = 283
			case 283:
				callf(40, $g[88], 6)
				continue
			case 284:
				returnf(0)
				continue
			case 285:
				enterf(5);	// execNonPipelined
				callf(36, $g[74])
				continue
			case 286:
				$g[72].setActive($g[74].newValue)
				callf(40, $g[83], 24)
				continue
			case 287:
				callf(40, $g[81], 40)
				continue
			case 288:
				$g[94].setNewInstruction($g[72].instruction[$g[74].value/4])
				$g[82].setTxt($g[94].getNewInstrTxt())
				$g[82].translate(60/2+70, 0, 20, 1, 0)
				callf(34, $g[94])
				continue
			case 289:
				if (!((instrOpTypeRs2($g[94].vIns)==OP_TYPE_IMM) && (instrOpTypeRdt($g[94].vIns)==OP_TYPE_REG))) {
					$pc = 290
					continue
				}
				fork(40, $g[93], 64)
				$pc = 290
			case 290:
				fork(268, $obj)
				if (wait(24))
				return
				$pc = 291
			case 291:
				if (!(instrIsJumpAndLink($g[94].vIns))) {
					$pc = 294
					continue
				}
				callf(40, $g[115], 20)
				continue
			case 292:
				callf(40, $g[136], 20)
				continue
			case 293:
				$stack[$fp+1]=0
				$stack[$fp+2]=($g[74].value+4)&127
				$pc = 306
				continue
			case 294:
				if (!(instrOpTypeRdt($g[94].vIns)==OP_TYPE_REG)) {
					$pc = 303
					continue
				}
				$stack[$fp+1]=$g[96][$g[94].vRs1].value
				$g[96][$g[94].vRs1].highlight($g[21])
				$g[140].setTxt("R%d:%02X", $g[94].vRs1, $g[96][$g[94].vRs1].value)
				$g[140].setOpacity(1)
				fork(40, $g[139], 40)
				if (!((instrOpTypeRs2($g[94].vIns)==OP_TYPE_REG) || ($g[94].vIns==ST))) {
					$pc = 300
					continue
				}
				if (!(instrOpTypeRs2($g[94].vIns)==OP_TYPE_IMM)) {
					$pc = 295
					continue
				}
				$stack[$fp+2]=$g[96][$g[94].vRdt].value
				$g[96][$g[94].vRdt].highlight($g[21])
				$pc = 296
				continue
			case 295:
				$stack[$fp+2]=$g[96][$g[94].vRs2].value
				$g[96][$g[94].vRs2].highlight($g[21])
				$pc = 296
			case 296:
				if (!((!instrIsArRI($g[94].vIns)) && ($g[94].vIns!=LD))) {
					$pc = 299
					continue
				}
				$stack[$fp+5] = ($g[94].vIns==ST) ? $g[94].vRdt : $g[94].vRs2
				$g[138].setTxt("R%d:%02X", $stack[$fp+5], $g[96][$stack[$fp+5]].value)
				$g[138].setOpacity(1)
				callf(40, $g[137], 20)
				continue
			case 297:
				callf(40, $g[136], 20)
				continue
			case 298:
				$pc = 299
			case 299:
				$pc = 302
				continue
			case 300:
				if (wait(40))
				return
				$pc = 301
			case 301:
				$pc = 302
			case 302:
				$pc = 305
				continue
			case 303:
				if (wait(40))
				return
				$pc = 304
			case 304:
				$pc = 305
			case 305:
				$pc = 306
			case 306:
				if (!(instrOpTypeRdt($g[94].vIns)==OP_TYPE_REG)) {
					$pc = 307
					continue
				}
				$g[147].setTxtOp($g[94].vIns)
				$pc = 307
			case 307:
				if (!($g[94].vIns==ST)) {
					$pc = 312
					continue
				}
				fork(40, $g[159], 40)
				fork(40, $g[151], 40)
				$g[154].setTxt("%02X", $g[94].vRs2)
				$g[154].setOpacity(1)
				callf(40, $g[153], 40)
				continue
			case 308:
				fork(40, $g[160], 40)
				fork(40, $g[162], 10)
				callf(40, $g[161], 10)
				continue
			case 309:
				if (wait(20))
				return
				$pc = 310
			case 310:
				callf(40, $g[163], 10)
				continue
			case 311:
				$stack[$fp+4]=$stack[$fp+2]
				$stack[$fp+3]=instrExecute($g[94].vIns, $stack[$fp+1], $g[94].vRs2)
				$pc = 332
				continue
			case 312:
				if (!(instrIsJumpAndLink($g[94].vIns))) {
					$pc = 317
					continue
				}
				callf(40, $g[152], 40)
				continue
			case 313:
				callf(40, $g[162], 10)
				continue
			case 314:
				$stack[$fp+3]=instrExecute($g[94].vIns, $stack[$fp+1], $stack[$fp+2])
				if (wait(20))
				return
				$pc = 315
			case 315:
				callf(40, $g[163], 10)
				continue
			case 316:
				$pc = 331
				continue
			case 317:
				if (!(instrOpTypeRdt($g[94].vIns)==OP_TYPE_REG)) {
					$pc = 328
					continue
				}
				fork(40, $g[151], 40)
				if (!(instrOpTypeRs2($g[94].vIns)==OP_TYPE_IMM)) {
					$pc = 319
					continue
				}
				$g[154].setTxt("%02X", $g[94].vRs2)
				$g[154].setOpacity(1)
				callf(40, $g[153], 40)
				continue
			case 318:
				$stack[$fp+3]=instrExecute($g[94].vIns, $stack[$fp+1], $g[94].vRs2)
				$pc = 321
				continue
			case 319:
				callf(40, $g[152], 40)
				continue
			case 320:
				$stack[$fp+3]=instrExecute($g[94].vIns, $stack[$fp+1], $stack[$fp+2])
				$pc = 321
			case 321:
				fork(40, $g[162], 10)
				callf(40, $g[161], 10)
				continue
			case 322:
				if (!(instrIsBranch($g[94].vIns))) {
					$pc = 324
					continue
				}
				if (wait(5))
				return
				$pc = 323
			case 323:
				$g[113].setPen($g[107])
				$pc = 327
				continue
			case 324:
				if (wait(20))
				return
				$pc = 325
			case 325:
				callf(40, $g[163], 10)
				continue
			case 326:
				$pc = 327
			case 327:
				$pc = 330
				continue
			case 328:
				if (wait(80))
				return
				$pc = 329
			case 329:
				$pc = 330
			case 330:
				$pc = 331
			case 331:
				$pc = 332
			case 332:
				if (!($g[94].vIns==LD)) {
					$pc = 336
					continue
				}
				callf(40, $g[173], 20)
				continue
			case 333:
				$g[167][($stack[$fp+3])%4].highlight($g[21])
				callf(40, $g[175], 20)
				continue
			case 334:
				callf(40, $g[172], 40)
				continue
			case 335:
				$stack[$fp+3]=$g[167][($stack[$fp+3])%4].value
				$pc = 346
				continue
			case 336:
				if (!($g[94].vIns==ST)) {
					$pc = 339
					continue
				}
				fork(40, $g[174], 20)
				callf(40, $g[173], 20)
				continue
			case 337:
				$g[167][($stack[$fp+3])%4].setNewValue($stack[$fp+4])
				callf(36, $g[167][($stack[$fp+3])%4])
				continue
			case 338:
				$pc = 345
				continue
			case 339:
				if (!(instrOpTypeRdt($g[94].vIns)==OP_TYPE_REG)) {
					$pc = 342
					continue
				}
				callf(40, $g[171], 40)
				continue
			case 340:
				callf(40, $g[172], 40)
				continue
			case 341:
				$pc = 344
				continue
			case 342:
				if (wait(80))
				return
				$pc = 343
			case 343:
				$pc = 344
			case 344:
				$pc = 345
			case 345:
				$pc = 346
			case 346:
				$g[96][0].unHighlight()
				$g[96][1].unHighlight()
				$g[96][2].unHighlight()
				$g[96][3].unHighlight()
				if (!((instrOpTypeRdt($g[94].vIns)==OP_TYPE_REG) && ($g[94].vIns!=ST))) {
					$pc = 350
					continue
				}
				callf(40, $g[178], 40)
				continue
			case 347:
				$g[96][$g[94].vRdt].setNewValue($stack[$fp+3])
				callf(36, $g[96][$g[94].vRdt])
				continue
			case 348:
				if (wait(19))
				return
				$pc = 349
			case 349:
				$pc = 352
				continue
			case 350:
				if (wait(75))
				return
				$pc = 351
			case 351:
				$pc = 352
			case 352:
				$g[34]+=5
				$g[33]++
				$g[69].setTxt("%4d", $g[33])
				$g[70].setTxt("%4d", $g[34])
				returnf(0)
				continue
			case 353:
				enterf(0);	// exec
				$g[96][0].unHighlight()
				$g[96][1].unHighlight()
				$g[96][2].unHighlight()
				$g[96][3].unHighlight()
				$g[167][0].unHighlight()
				$g[167][1].unHighlight()
				$g[167][2].unHighlight()
				$g[167][3].unHighlight()
				$g[76][0].unHighlight()
				$g[76][1].unHighlight()
				$g[77][0].unHighlight()
				$g[77][1].unHighlight()
				if (!($g[26]==PIPELINING_ENABLED)) {
					$pc = 354
					continue
				}
				fork(51, $obj)
				fork(72, $obj)
				fork(126, $obj)
				fork(237, $obj)
				fork(256, $obj)
				$pc = 355
				continue
			case 354:
				fork(285, $obj)
				$pc = 355
			case 355:
				if (wait(8))
				return
				$pc = 356
			case 356:
				resetWires()
				if (wait(($g[26]==PIPELINING_ENABLED) ? 72 : 392))
				return
				$pc = 357
			case 357:
				checkPoint()
				returnf(0)
				continue
			case 358:
				enterf(0);	// run
				if (wait(1))
				return
				$pc = 359
			case 359:
				$g[32]=1
				setlocked()
				$pc = 360
			case 360:
				if (!(1)) {
					$pc = 365
					continue
				}
				fork(46, $g[73], ($g[26]==PIPELINING_ENABLED) ? 80 : 400)
				callf(353, $obj)
				continue
			case 361:
				if (!((($g[176].vIns==HALT) && ($g[26]==PIPELINING_ENABLED)) || (($g[94].vIns==HALT) && ($g[26]==PIPELINING_DISABLED)))) {
					$pc = 363
					continue
				}
				stop()
				if (!($g[182])) {
					$pc = 362
					continue
				}
				$pc = 365
				continue
				$pc = 362
			case 362:
				$pc = 363
			case 363:
				if (wait(1))
				return
				$pc = 364
			case 364:
				$pc = 360
				continue
			case 365:
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
