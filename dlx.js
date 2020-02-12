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
		this.w = 90
		this.h = 20
		this.length = MEMORY_ADDRESSES
		this.x = _x
		this.y = _y
		this.addr_size = 4
		this.maxdigits = 3
		this.off = 40
		this.outer_x = this.x
		this.outer_y = this.y
		this.outer_w = this.w
		this.outer_h = (this.h*this.length+20)
		this.x=this.x+20
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
		for (this.j=0; this.j<(this.length); this.j++) {
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
		$g[123].reset()
		$g[130].reset()
		$g[131].setOpacity(0)
		$g[133].reset()
		$g[132].reset()
		$g[135].reset()
		$g[136].reset()
		$g[137].setOpacity(0)
		$g[138].reset()
		$g[139].setOpacity(0)
		$g[134].setOpacity(0)
		$g[111].setPen($g[106])
		$g[112].setPen($g[106])
		$g[113].setPen($g[106])
		$g[155].reset()
		$g[156].reset()
		$g[158].reset()
		$g[157].reset()
		$g[159].reset()
		$g[160].reset()
		$g[161].reset()
		$g[162].reset()
		$g[163].setOpacity(0)
		$g[164].reset()
		$g[166].reset()
		$g[168].reset()
		$g[169].reset()
		$g[170].reset()
		$g[145].reset()
		$g[147].reset()
		$g[149].reset()
		$g[146].reset()
		$g[148].reset()
		$g[150].reset()
		$g[171].reset()
		$g[172].reset()
		$g[173].reset()
		$g[174].reset()
		$g[165].reset()
		$g[167].reset()
		$g[154].txtOp.setOpacity(0)
		$g[154].txtResult.setOpacity(0)
		$g[111].setPen($g[106])
		$g[112].setPen($g[106])
		$g[181].reset()
		$g[182].reset()
		$g[183].reset()
		$g[184].reset()
		$g[185].reset()
		$g[186].reset()
		$g[189].reset()
	}

	function resetRegisters() {
		$g[74].reset()
		$g[74].setValue(124)
		$g[95].reset()
		$g[141].reset()
		$g[142].reset()
		$g[177].reset()
		$g[176].reset()
		$g[188].reset()
		$g[76][0].reset()
		$g[76][1].reset()
		$g[77][0].reset()
		$g[77][1].reset()
		$g[94].reset()
		$g[140].reset()
		$g[175].reset()
		$g[187].reset()
		$g[72].setActive(124)
		$g[176].setInvalid(1)
		$g[176].updateLabel()
		$g[188].setInvalid(1)
		$g[188].updateLabel()
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
		$g[130].setOpacity(opacity)
		$g[133].setOpacity(opacity)
		$g[104].setOpacity(opacity)
		$g[132].setOpacity(opacity)
	}

	function showALUForwarding(opacity) {
		if (opacity==0) {
			$g[160].setPoint(0, 360, 205)
			$g[160].setPoint(1, 421, 205)
			$g[161].setPoint(0, ($g[29]) ? 360 : 350, 250)
			$g[161].setPoint(1, 410, 250)
			$g[162].setPoint(2, 370, 260)
			$g[162].setPoint(3, 410, 260)
			$g[160].setHead(0)
		} else {
			$g[160].setPoint(0, 360, 220)
			$g[160].setPoint(1, 420, 220)
			$g[161].setPoint(0, 360, 240)
			$g[161].setPoint(1, 420, 240)
			$g[162].setPoint(2, 370, 250)
			$g[162].setPoint(3, 420, 250)
			$g[160].setHead(1)
		}
		$g[151].setOpacity(opacity)
		$g[156].setOpacity(opacity)
		$g[158].setOpacity(opacity)
		$g[166].setOpacity(opacity)
		$g[164].setOpacity(opacity)
	}

	function showSMDRForwarding(opacity) {
		if (opacity==0) {
			$g[170].setPoint(1, 355, 330)
			$g[170].setPoint(2, 420, 330)
			$g[170].setHead(0)
		} else {
			$g[170].setPoint(1, 355, 340)
			$g[170].setPoint(2, 420, 340)
			$g[170].setHead(1)
		}
		$g[153].setOpacity(opacity)
		$g[168].setOpacity(opacity)
		$g[169].setOpacity(opacity)
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
			$g[138].setPoint(1, 295, 205)
			$g[138].setPoint(2, 360, 205)
			$g[135].setPoint(1, 360, 240)
			$g[170].setPoint(0, 355, 250)
			$g[174].setPoint(3, 520, 240)
			$g[171].setPoint(1, 530, 330)
			$g[183].setPoint(1, 640, 230)
			$g[93].setHead(0)
			$g[91].setHead(0)
			$g[138].setHead(0)
			$g[160].setHead(0)
			$g[135].setHead(0)
			$g[170].setHead(0)
			$g[171].setHead(0)
			$g[172].setHead(0)
			$g[173].setHead(0)
			$g[174].setHead(0)
			$g[183].setHead(0)
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
			$g[138].setPoint(1, 295, 210)
			$g[138].setPoint(2, 340, 210)
			$g[135].setPoint(1, 340, 240)
			$g[170].setPoint(0, 355, 270)
			$g[174].setPoint(3, 520, 240)
			$g[171].setPoint(1, 520, 330)
			$g[183].setPoint(1, 620, 230)
			$g[93].setHead(1)
			$g[91].setHead(1)
			$g[138].setHead(1)
			$g[160].setHead(1)
			$g[135].setHead(1)
			$g[170].setHead(1)
			$g[171].setHead(1)
			$g[172].setHead(1)
			$g[173].setHead(1)
			$g[174].setHead(1)
			$g[183].setHead(1)
			showBTB($g[27]==BRANCH_PREDICTION ? 1 : 0)
			showALUForwarding($g[29]==ALU_FORWARDING ? 1 : 0)
			showSMDRForwarding($g[30]==FORWARDING_TO_SMDR ? 1 : 0)
			showZeroForwarding($g[31]==ZERO_FORWARDING ? 1 : 0)
		}
		$g[90].setOpacity(opacity)
		$g[80].setOpacity(opacity)
		$g[87].setOpacity(opacity)
		$g[95].setOpacity(opacity)
		$g[140].setOpacity(opacity)
		$g[175].setOpacity(opacity)
		$g[187].setOpacity(opacity)
		$g[155].setOpacity(opacity)
		$g[181].setOpacity(opacity)
		$g[141].setOpacity(opacity)
		$g[142].setOpacity(opacity)
		$g[176].setOpacity(opacity)
		$g[188].setOpacity(opacity)
		$g[177].setOpacity(opacity)
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

	function calcNewPC() {
		if (instrIsBranch($g[140].vIns)) {
			if ($g[200]==1) {
				$g[195]=$g[124]
				$g[198]=$g[129].value&127
				$g[199]=$g[84]
			} else {
				$g[195]=$g[121]
				$g[198]=($g[95].value+4)&127
				$g[200]=0
			}
		} else {
			if (isJorJAL($g[94].vIns)) {
				$g[195]=$g[124]
				$g[196]=$g[130]
				$g[198]=($g[95].value+$g[94].vRs2)&127
				$g[199]=$g[84]
			} else
			if (instrIsJumpR($g[94].vIns)) {
				$g[198]=($g[96][$g[94].vRs2].value)&127
				$g[199]=$g[86]
				$g[196]=$g[133]
			}
		}
	}

	function updBTB() {
		if ($g[198]!=$g[74].value) {
			$g[74].setNewValue($g[198])
			$g[194]=$g[199]
			if ($g[27]==BRANCH_PREDICTION) {
				if ($g[198]==$g[95].value+4) {
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
					$g[77][$g[24]].setNewValue($g[198])
				}
			}
		}
	}

	function detectStall() {
		$g[23]=NO_STALL
		$g[25]=0
		if ($g[29]==ALU_INTERLOCK) {
			if (instrOpTypeRdt($g[140].vIns)==OP_TYPE_REG) {
				if ((instrOpTypeRs1($g[94].vIns)==OP_TYPE_REG) && ($g[94].vRs1==$g[140].vRdt))
				$g[23]=DATA_STALL
				if ((instrOpTypeRs2($g[94].vIns)==OP_TYPE_REG) && ($g[94].vRs2==$g[140].vRdt))
				$g[23]=DATA_STALL
			}
			if (instrOpTypeRdt($g[175].vIns)==OP_TYPE_REG) {
				if ((instrOpTypeRs1($g[94].vIns)==OP_TYPE_REG) && ($g[94].vRs1==$g[175].vRdt))
				$g[23]=DATA_STALL
				if ((instrOpTypeRs2($g[94].vIns)==OP_TYPE_REG) && ($g[94].vRs2==$g[175].vRdt))
				$g[23]=DATA_STALL
			}
		}
		if (($g[30]==STORE_INTERLOCK) && ($g[94].vIns==ST)) {
			if ((instrOpTypeRdt($g[140].vIns)==OP_TYPE_REG) && ($g[140].vRdt==$g[94].vRdt))
			$g[23]=DATA_STALL
			if ((instrOpTypeRdt($g[175].vIns)==OP_TYPE_REG) && ($g[175].vRdt==$g[94].vRdt))
			$g[23]=DATA_STALL
		}
		if (instrIsJumpR($g[94].vIns) && (instrIsBranch($g[140].vIns)==0)) {
			if ((instrOpTypeRdt($g[140].vIns)==OP_TYPE_REG) && ($g[140].vRdt==$g[94].vRs2))
			$g[23]=DATA_STALL
			if ((instrOpTypeRdt($g[175].vIns)==OP_TYPE_REG) && ($g[175].vRdt==$g[94].vRs2))
			$g[23]=DATA_STALL
		}
		if (($g[28]==LOAD_INTERLOCK) && ($g[140].vIns==LD)) {
			if ((instrOpTypeRs1($g[94].vIns)==OP_TYPE_REG) && ($g[94].vRs1==$g[140].vRdt))
			$g[23]=DATA_STALL
			if ((instrOpTypeRs2($g[94].vIns)==OP_TYPE_REG) && ($g[94].vRs2==$g[140].vRdt))
			$g[23]=DATA_STALL
		}
		if (instrIsMulti($g[140].vIns) && ($g[205]==1)) {
			$g[23]=DATA_STALL
		}
		if (instrIsBranch($g[140].vIns)) {
			if (instrIsJump($g[94].vIns) && ($g[200]==0) && ($g[23]==NO_STALL)) {
				$g[25]=1
				$g[23]=CTRL_STALL
			} else
			if (instrIsJump($g[94].vIns) && ($g[200]==1) && ($g[23]==NO_STALL)) {
				$g[23]=NO_STALL
				$g[201]=1
			} else
			if ((instrIsBranch($g[94].vIns)==0) && ($g[200]==1) && ($g[23]==NO_STALL)) {
				$g[25]=1
				$g[23]=CTRL_STALL
			} else {
				$g[23]=NO_STALL
				$g[201]=0
			}
		} else {
			if (($g[23]==NO_STALL) && ($g[27]!=DELAYED_BRANCHES) && instrIsJump($g[94].vIns) && ($g[198]!=$g[74].value)) {
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
				reg=$g[178][lp1].value
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
				$g[190]=0
				$pc = 2
			case 2:
				if (!($g[190]<NUM_REGS)) {
					$pc = 5
					continue
				}
				if (!($g[190]==(NUM_REGS/2))) {
					$pc = 3
					continue
				}
				$g[99]=BOTTOM
				$g[97]=160
				$g[98]+=REG_HEIGHT
				$pc = 3
			case 3:
				$g[100] = "x"+$g[190].toString()
				$g[96][$g[190]]=new Register($g[97], $g[98], REG_WIDTH, REG_HEIGHT, $g[99], $g[100])
				$g[97]+=REG_WIDTH
				$pc = 4
			case 4:
				$g[190]++
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
				$g[126].addPoint(235, 300)
				$g[126].addPoint(235, 280)
				$g[126].addPoint(265, 280)
				$g[127] = new AnimPipe()
				$g[127].addPoint(280, 270)
				$g[127].addPoint(280, 255)
				$g[127].addPoint(237, 255)
				$g[127].addPoint(237, 180)
				$g[128] = new Component(217, 300, 40, 10, "demux 1")
				$g[129] = new Register(265, 270, 30, 20, LEFT, "M")
				$g[129].rotateLabel(90)
				$g[130] = new AnimPipe()
				$g[130].addPoint(220, 170)
				$g[130].addPoint(220, 130)
				$g[130].addPoint(180, 130)
				$g[131] = new Rectangle($g[0], $g[19], 0, 0, $g[11], 300, 160, -12, -6, 24, 12, $g[4], $g[15])
				$g[131].setRounded(2, 2)
				$g[132] = new AnimPipe()
				$g[132].addPoint(170, 120)
				$g[132].addPoint(150, 120)
				$g[133] = new AnimPipe()
				$g[133].addPoint(160, 60)
				$g[133].addPoint(140, 60)
				$g[133].addPoint(140, 83)
				$g[133].addPoint(200, 83)
				$g[133].addPoint(200, 110)
				$g[133].addPoint(180, 110)
				$g[134] = new Rectangle($g[0], $g[19], 0, 0, $g[11], 300, 44, -12, 0, 24, 12, $g[4], $g[15])
				$g[135] = new AnimPipe()
				$g[135].addPoint(305, 240)
				$g[135].addPoint(340, 240)
				$g[136] = new AnimPipe()
				$g[136].addPoint(280, 75)
				$g[136].addPoint(280, 230)
				$g[136].addPoint(295, 230)
				$g[137] = new Rectangle($g[0], $g[19], 0, 0, $g[11], 340, 82, -12, 0, 24, 12, $g[4], $g[15], "R0:0")
				$g[137].setRounded(2, 2)
				$g[138] = new AnimPipe()
				$g[138].addPoint(295, 75)
				$g[138].addPoint(295, 210)
				$g[138].addPoint(340, 210)
				$g[139] = new Rectangle($g[0], $g[19], 0, 0, $g[11], 370, 82, -12, 0, 24, 12, $g[4], $g[15], "R0:0")
				$g[139].setRounded(2, 2)
				$g[140] = new InstructionRegister(310, 350, 20, 85, "EX")
				$g[141] = new Register(340, 190, 20, 40, TOP, "A")
				$g[142] = new Register(340, 230, 20, 40, BOTTOM, "B")
				$g[143] = new Component(328, 290, 23, 10, "SUB")
				$g[144] = new Component(337, 120, 23, 10, "ADD")
				$g[145] = new AnimPipe()
				$g[145].addPoint(340, 260)
				$g[145].addPoint(315, 260)
				$g[145].addPoint(315, 295)
				$g[145].addPoint(328, 295)
				$g[146] = new AnimPipe()
				$g[146].addPoint(340, 200)
				$g[146].addPoint(315, 200)
				$g[146].addPoint(315, 125)
				$g[146].addPoint(337, 125)
				new Rectangle2($g[0], 0, 0, 0, 0, 320, 315, 20, 10, 0, $g[15], "-1")
				new Rectangle2($g[0], 0, 0, 0, 0, 320, 95, 20, 10, 0, $g[15], "+1")
				$g[147] = new AnimPipe()
				$g[147].addPoint(338, 320)
				$g[147].addPoint(345, 320)
				$g[147].addPoint(345, 300)
				$g[148] = new AnimPipe()
				$g[148].addPoint(338, 100)
				$g[148].addPoint(345, 100)
				$g[148].addPoint(345, 120)
				$g[149] = new AnimPipe()
				$g[149].addPoint(345, 290)
				$g[149].addPoint(345, 270)
				$g[150] = new AnimPipe()
				$g[150].addPoint(345, 130)
				$g[150].addPoint(345, 190)
				$g[151] = new Component(420, 180, 10, 50, "mux 6")
				$g[152] = new Component(420, 230, 10, 50, "mux 7")
				$g[153] = new Component(420, 310, 10, 40, "mux 8")
				$g[154] = new ALU(450, 190, 40, 80)
				$g[155] = new AnimPipe()
				$g[155].addPoint(330, 390)
				$g[155].addPoint(530, 390)
				$g[156] = new AnimPipe()
				$g[156].addPoint(530, 210)
				$g[156].addPoint(530, 170)
				$g[156].addPoint(390, 170)
				$g[156].addPoint(390, 190)
				$g[156].addPoint(420, 190)
				$g[157] = new AnimPipe()
				$g[157].addPoint(530, 210)
				$g[157].addPoint(530, 170)
				$g[157].addPoint(355, 170)
				$g[157].addPoint(355, 190)
				$g[158] = new AnimPipe()
				$g[158].addPoint(630, 210)
				$g[158].addPoint(630, 160)
				$g[158].addPoint(380, 160)
				$g[158].addPoint(380, 200)
				$g[158].addPoint(420, 200)
				$g[159] = new AnimPipe()
				$g[159].addPoint(630, 210)
				$g[159].addPoint(630, 160)
				$g[159].addPoint(355, 160)
				$g[159].addPoint(355, 190)
				$g[160] = new AnimPipe()
				$g[160].addPoint(360, 220)
				$g[160].addPoint(420, 220)
				$g[161] = new AnimPipe()
				$g[161].addPoint(360, 240)
				$g[161].addPoint(420, 240)
				$g[162] = new AnimPipe()
				$g[162].addPoint(330, 390)
				$g[162].addPoint(370, 390)
				$g[162].addPoint(370, 250)
				$g[162].addPoint(420, 250)
				$g[163] = new Rectangle($g[0], $g[19], 0, 0, $g[11], 432, 370, -10, 0, 20, 12, $g[4], $g[15], "IMM")
				$g[163].setRounded(2, 2)
				$g[164] = new AnimPipe()
				$g[164].addPoint(630, 250)
				$g[164].addPoint(630, 300)
				$g[164].addPoint(380, 300)
				$g[164].addPoint(380, 260)
				$g[164].addPoint(420, 260)
				$g[165] = new AnimPipe()
				$g[165].addPoint(630, 250)
				$g[165].addPoint(630, 300)
				$g[165].addPoint(355, 300)
				$g[165].addPoint(355, 270)
				$g[166] = new AnimPipe()
				$g[166].addPoint(530, 250)
				$g[166].addPoint(530, 290)
				$g[166].addPoint(390, 290)
				$g[166].addPoint(390, 270)
				$g[166].addPoint(420, 270)
				$g[167] = new AnimPipe()
				$g[167].addPoint(530, 250)
				$g[167].addPoint(530, 290)
				$g[167].addPoint(355, 290)
				$g[167].addPoint(355, 270)
				$g[168] = new AnimPipe()
				$g[168].addPoint(530, 250)
				$g[168].addPoint(530, 290)
				$g[168].addPoint(390, 290)
				$g[168].addPoint(390, 320)
				$g[168].addPoint(420, 320)
				$g[169] = new AnimPipe()
				$g[169].addPoint(630, 250)
				$g[169].addPoint(630, 300)
				$g[169].addPoint(380, 300)
				$g[169].addPoint(380, 330)
				$g[169].addPoint(420, 330)
				$g[170] = new AnimPipe()
				$g[170].addPoint(355, 270)
				$g[170].addPoint(355, 340)
				$g[170].addPoint(420, 340)
				$g[171] = new AnimPipe()
				$g[171].addPoint(430, 330)
				$g[171].addPoint(520, 330)
				$g[172] = new AnimPipe()
				$g[172].addPoint(430, 205)
				$g[172].addPoint(450, 205)
				$g[173] = new AnimPipe()
				$g[173].addPoint(430, 255)
				$g[173].addPoint(450, 255)
				$g[174] = new AnimPipe()
				$g[174].addPoint(490, 240)
				$g[174].addPoint(520, 240)
				$g[175] = new InstructionRegister(530, 350, 20, 85, "MA")
				$g[176] = new Register(520, 210, 20, 40, TOP, "O0")
				$g[177] = new Register(520, 320, 40, 20, RIGHT, "SMR")
				new Txt($g[0], $g[17], HLEFT|VTOP, 553, 100, 0, $g[15], "memory\naddress")
				new Txt($g[0], $g[17], HLEFT|VTOP, 605, 320, 0, $g[15], "memory\ndata-in")
				new Txt($g[0], $g[17], HLEFT|VTOP, 615, 100, 0, $g[15], "memory\ndata-out")
				new Txt($g[0], 0, HLEFT|VTOP, 645, 35, 0, $g[15], "Data\nCache\n(memory)")
				$g[178] = newArray(4)
				$g[178][0]=new Register(560, 30, 40, 20, LEFT, "M0")
				$g[178][1]=new Register(560, 50, 40, 20, LEFT, "M1")
				$g[178][2]=new Register(600, 30, 40, 20, RIGHT, "M2")
				$g[178][3]=new Register(600, 50, 40, 20, RIGHT, "M3")
				$g[179] = new Stack(680, 60)
				$g[180] = new Component(590, 210, 10, 40, "mux 9")
				$g[181] = new AnimPipe()
				$g[181].addPoint(550, 390)
				$g[181].addPoint(620, 390)
				$g[182] = new AnimPipe()
				$g[182].addPoint(540, 230)
				$g[182].addPoint(590, 230)
				$g[183] = new AnimPipe()
				$g[183].addPoint(600, 230)
				$g[183].addPoint(620, 230)
				$g[184] = new AnimPipe()
				$g[184].addPoint(540, 230)
				$g[184].addPoint(550, 230)
				$g[184].addPoint(550, 110)
				$g[184].addPoint(680, 110)
				$g[185] = new AnimPipe()
				$g[185].addPoint(560, 330)
				$g[185].addPoint(680, 330)
				$g[186] = new AnimPipe()
				$g[186].addPoint(680, 90)
				$g[186].addPoint(570, 90)
				$g[186].addPoint(570, 220)
				$g[186].addPoint(590, 220)
				$g[187] = new InstructionRegister(620, 350, 20, 85, "WB")
				$g[188] = new Register(620, 210, 20, 40, TOP, "O1")
				$g[189] = new AnimPipe()
				$g[189].addPoint(640, 230)
				$g[189].addPoint(650, 230)
				$g[189].addPoint(650, 10)
				$g[189].addPoint(390, 10)
				$g[189].addPoint(390, 25)
				$g[154].txtResult.moveToFront()
				resetCircuit()
				$g[192] = ""
				$g[190]=0
				$pc = 6
			case 6:
				if (!($g[190]<32)) {
					$pc = 8
					continue
				}
				$g[72].setOpcode(4*$g[190], 0)
				$pc = 7
			case 7:
				$g[190]++
				$pc = 6
				continue
			case 8:
				$g[190]=0
				$pc = 9
			case 9:
				if (!($g[190]<4)) {
					$pc = 11
					continue
				}
				$g[192]=sprintf("r%d", $g[190])
				$g[96][$g[190]].setValue(getArgAsNum($g[192], 0))
				$pc = 10
			case 10:
				$g[190]++
				$pc = 9
				continue
			case 11:
				$g[190]=0
				$pc = 12
			case 12:
				if (!($g[190]<4)) {
					$pc = 14
					continue
				}
				$g[192]=sprintf("m%d", $g[190])
				$g[178][$g[190]].setValue(getArgAsNum($g[192], 0))
				$pc = 13
			case 13:
				$g[190]++
				$pc = 12
				continue
			case 14:
				setTPS(20)
				$g[14]=getArgAsNum("example", 0)
				if (!($g[14]==0)) {
					$pc = 18
					continue
				}
				$g[190]=0
				$pc = 15
			case 15:
				if (!($g[190]<32)) {
					$pc = 17
					continue
				}
				$g[192]=sprintf("i%d", $g[190])
				$g[72].setOpcode(4*$g[190], getArgAsNum($g[192], 0))
				$pc = 16
			case 16:
				$g[190]++
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
				$g[72].setValue(0, XOR, 1, 1, 1)
				$g[72].setValue(4, BEQ, 0, 2, 36)
				$g[72].setValue(8, ST, 2, 0, 0)
				$g[72].setValue(12, ANDi, 2, 2, 1)
				$g[72].setValue(16, BNE, 0, 2, 8)
				$g[72].setValue(20, ADD, 1, 1, 3)
				$g[72].setValue(24, LD, 2, 0, 0)
				$g[72].setValue(28, SRLi, 2, 2, 1)
				$g[72].setValue(32, SLLi, 3, 3, 1)
				$g[72].setValue(36, J, 0, 0, 4-36)
				$g[72].setValue(40, ST, 1, 0, 0)
				$g[72].setValue(44, HALT, 0, 0, 0)
				$g[96][2].setValue(9)
				$g[96][3].setValue(8)
				setTPS(100)
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
				$g[190]=0
				$pc = 29
			case 29:
				if (!($g[190]<32)) {
					$pc = 31
					continue
				}
				$g[192]=sprintf("i%d", $g[190])
				setArg($g[192], $g[72].getOpcode($g[190]*4).toString())
				$pc = 30
			case 30:
				$g[190]++
				$pc = 29
				continue
			case 31:
				$g[14]=($g[14]>maxexample) ? 0 : $g[14]
				$pc = 32
			case 32:
				$g[193] = getArgAsNum("haltOnHalt", 1)
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
				$g[200] = 0
				$g[201] = 0
				$g[202] = 1
				$g[203] = CHECK
				$g[205] = 0
				$g[206] = 0
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
				callf(368, $obj)
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
				$g[194]=$g[85]
				$pc = 55
				continue
			case 54:
				$g[74].setNewValue(($g[74].value+4)&127)
				$g[194]=$g[87]
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
				callf(40, $g[194], 16)
				continue
			case 67:
				callf(40, $g[88], 8)
				continue
			case 68:
				returnf(0)
				continue
			case 69:
				enterf(0);	// sendBTBOperands
				callf(40, $g[196], 18)
				continue
			case 70:
				callf(40, $g[132], 6)
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
				if (!($g[201]==1)) {
					$pc = 74
					continue
				}
				$g[94].setNewValue(STALL, 0, 0, 0)
				$g[201]=0
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
				fork(40, $g[138], 16)
				fork(40, $g[136], 16)
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
				fork(40, $g[126], 8)
				$g[96][$g[94].vRs1].highlight($g[21])
				$g[141].setNewValue($g[96][$g[94].vRs1].value)
				$g[96][$g[94].vRdt].highlight($g[21])
				$g[142].setNewValue($g[96][$g[94].vRdt].value)
				fork(40, $g[135], 5)
				if (wait(4))
				return
				$pc = 80
			case 80:
				$g[129].setNewValue($g[95].value+$g[94].vRs2)
				callf(36, $g[129])
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
				if (!(instrIsJump($g[94].vIns) || instrIsBranch($g[140].vIns))) {
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
				$g[134].setTxt("%02X", $g[198])
				$g[134].setOpacity(1, 8, 1, 0)
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
				$g[200]=0
				if (!((instrIsJump($g[94].vIns) || instrIsBranch($g[140].vIns)) && ($g[23]!=DATA_STALL))) {
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
				$g[140].setNewValue($g[94].vIns, $g[94].vRdt, $g[94].vRs1, $g[94].vRs2)
				$pc = 105
				continue
			case 103:
				if (!($g[201]==0 && $g[205]==0)) {
					$pc = 104
					continue
				}
				$g[140].setNewValue(STALL, 0, 0, 0)
				$pc = 104
			case 104:
				$pc = 105
			case 105:
				if (wait(7))
				return
				$pc = 106
			case 106:
				if (!(instrIsBranch($g[94].vIns)==0)) {
					$pc = 119
					continue
				}
				if (!(instrOpTypeRdt($g[94].vIns)==OP_TYPE_REG)) {
					$pc = 118
					continue
				}
				if (!(instrIsJumpAndLink($g[94].vIns))) {
					$pc = 109
					continue
				}
				$g[141].setNewValue(0)
				$g[142].setNewValue(($g[95].value+4)&127)
				callf(40, $g[115], 18)
				continue
			case 107:
				callf(40, $g[135], 6)
				continue
			case 108:
				$pc = 117
				continue
			case 109:
				$g[96][$g[94].vRs1].highlight($g[21])
				$g[141].setNewValue($g[96][$g[94].vRs1].value)
				if (!(instrOpTypeRs2($g[94].vIns)==OP_TYPE_REG)) {
					$pc = 110
					continue
				}
				$g[96][$g[94].vRs2].highlight($g[21])
				$g[142].setNewValue($g[96][$g[94].vRs2].value)
				$pc = 111
				continue
			case 110:
				$g[96][$g[94].vRdt].highlight($g[21])
				$g[142].setNewValue($g[96][$g[94].vRdt].value)
				$pc = 111
			case 111:
				$g[139].setTxt("R%d:%02X", $g[94].vRs1, $g[96][$g[94].vRs1].value)
				$g[139].setOpacity(1)
				fork(40, $g[138], 5)
				if (!(instrIsBranch($g[94].vIns))) {
					$pc = 113
					continue
				}
				fork(40, $g[136], 5)
				callf(40, $g[135], 5)
				continue
			case 112:
				$pc = 113
			case 113:
				if (!((!instrIsArRI($g[94].vIns)) && ($g[94].vIns!=LD))) {
					$pc = 116
					continue
				}
				$stack[$fp+1] = ($g[94].vIns==ST) ? $g[94].vRdt : $g[94].vRs2
				$g[137].setTxt("R%d:%02X", $stack[$fp+1], $g[96][$stack[$fp+1]].value)
				$g[137].setOpacity(1)
				callf(40, $g[136], 18)
				continue
			case 114:
				callf(40, $g[135], 6)
				continue
			case 115:
				$pc = 116
			case 116:
				$pc = 117
			case 117:
				$pc = 118
			case 118:
				$pc = 119
			case 119:
				returnf(0)
				continue
			case 120:
				enterf(6);	// exExec
				fork(34, $g[140])
				if (!(!instrIsNop($g[140].nIns))) {
					$pc = 121
					continue
				}
				fork(36, $g[141])
				fork(36, $g[142])
				$pc = 121
			case 121:
				if (wait(8))
				return
				$pc = 122
			case 122:
				$g[175].setNewValue($g[140].vIns, $g[140].vRdt, $g[140].vRs1, $g[140].vRs2)
				if (!(instrOpTypeRdt($g[140].vIns)==OP_TYPE_REG)) {
					$pc = 215
					continue
				}
				if (!(instrIsMulti($g[140].vIns))) {
					$pc = 155
					continue
				}
				$g[205]=1
				if (!($g[202]==1)) {
					$pc = 138
					continue
				}
				if (!($g[140].vIns!=MUL)) {
					$pc = 123
					continue
				}
				$g[206]=0
				$pc = 123
			case 123:
				if (!($g[29]==ALU_FORWARDING)) {
					$pc = 136
					continue
				}
				if (!($g[176].tagMatches($g[140].vRs1))) {
					$pc = 125
					continue
				}
				$stack[$fp+4]=$g[176].value
				fork(40, $g[157], 20)
				$g[141].setNewValue($g[176].value)
				callf(36, $g[141])
				continue
			case 124:
				$pc = 129
				continue
			case 125:
				if (!($g[188].tagMatches($g[140].vRs1))) {
					$pc = 127
					continue
				}
				$stack[$fp+4]=$g[188].value
				fork(40, $g[159], 20)
				$g[141].setNewValue($g[188].value)
				callf(36, $g[141])
				continue
			case 126:
				$pc = 128
				continue
			case 127:
				$stack[$fp+4]=$g[141].value
				$pc = 128
			case 128:
				$pc = 129
			case 129:
				if (!($g[176].tagMatches($g[140].vRs2))) {
					$pc = 131
					continue
				}
				$stack[$fp+5]=$g[176].value
				fork(40, $g[167], 20)
				$g[142].setNewValue($g[176].value)
				callf(36, $g[142])
				continue
			case 130:
				$pc = 135
				continue
			case 131:
				if (!($g[188].tagMatches($g[140].vRs2))) {
					$pc = 133
					continue
				}
				$stack[$fp+5]=$g[188].value
				fork(40, $g[165], 20)
				$g[142].setNewValue($g[188].value)
				callf(36, $g[142])
				continue
			case 132:
				$pc = 134
				continue
			case 133:
				$stack[$fp+5]=$g[142].value
				$pc = 134
			case 134:
				$pc = 135
			case 135:
				$pc = 137
				continue
			case 136:
				$stack[$fp+4]=$g[141].value
				$stack[$fp+5]=$g[142].value
				$pc = 137
			case 137:
				$stack[$fp+1]=$g[160]
				$pc = 154
				continue
			case 138:
				if (!($g[203]==CHECK)) {
					$pc = 144
					continue
				}
				if (!($g[140].vIns==MUL)) {
					$pc = 142
					continue
				}
				fork(40, $g[145], 5)
				fork(40, $g[147], 5)
				$g[142].setNewValue($g[142].value-1)
				if (wait(2))
				return
				$pc = 139
			case 139:
				callf(36, $g[142])
				continue
			case 140:
				callf(40, $g[149], 5)
				continue
			case 141:
				$pc = 143
				continue
			case 142:
				$stack[$fp+1]=$g[156]
				$stack[$fp+4]=$g[176].value
				$pc = 143
			case 143:
				$stack[$fp+5]=$g[142].value
				$stack[$fp+2]=$g[161]
				$pc = 153
				continue
			case 144:
				if (!($g[203]==EXEC)) {
					$pc = 152
					continue
				}
				if (!($g[140].vIns==MUL)) {
					$pc = 145
					continue
				}
				$stack[$fp+1]=$g[160]
				$stack[$fp+4]=$g[141].value
				$stack[$fp+2]=$g[164]
				$stack[$fp+5]=$g[188].value
				$pc = 151
				continue
			case 145:
				if (!($g[206]==0)) {
					$pc = 149
					continue
				}
				$stack[$fp+1]=$g[158]
				$stack[$fp+4]=$g[188].value
				$stack[$fp+2]=$g[161]
				$stack[$fp+5]=$g[142].value
				fork(40, $g[146], 5)
				fork(40, $g[148], 5)
				$g[141].setNewValue($g[141].value+1)
				if (wait(2))
				return
				$pc = 146
			case 146:
				callf(36, $g[141])
				continue
			case 147:
				callf(40, $g[150], 5)
				continue
			case 148:
				$pc = 150
				continue
			case 149:
				$stack[$fp+1]=$g[160]
				$stack[$fp+4]=$g[141].value
				$pc = 150
			case 150:
				$pc = 151
			case 151:
				$pc = 152
			case 152:
				$pc = 153
			case 153:
				$pc = 154
			case 154:
				$pc = 155
			case 155:
				if (!(instrIsJumpAndLink($g[140].vIns))) {
					$pc = 156
					continue
				}
				$stack[$fp+1]=0
				$stack[$fp+4]=0
				$pc = 165
				continue
			case 156:
				if (!($g[29]==ALU_FORWARDING)) {
					$pc = 162
					continue
				}
				if (!(instrIsMulti($g[140].vIns)==0)) {
					$pc = 161
					continue
				}
				if (!($g[176].tagMatches($g[140].vRs1))) {
					$pc = 157
					continue
				}
				$stack[$fp+1]=$g[156]
				$stack[$fp+4]=$g[176].value
				$pc = 160
				continue
			case 157:
				if (!($g[188].tagMatches($g[140].vRs1))) {
					$pc = 158
					continue
				}
				$stack[$fp+1]=$g[158]
				$stack[$fp+4]=$g[188].value
				$pc = 159
				continue
			case 158:
				$stack[$fp+1]=$g[160]
				$stack[$fp+4]=$g[141].value
				$pc = 159
			case 159:
				$pc = 160
			case 160:
				$pc = 161
			case 161:
				$pc = 164
				continue
			case 162:
				if (!(instrIsMulti($g[140].vIns)==0)) {
					$pc = 163
					continue
				}
				$stack[$fp+1]=$g[160]
				$stack[$fp+4]=$g[141].value
				$pc = 163
			case 163:
				$pc = 164
			case 164:
				$pc = 165
			case 165:
				if (!(instrIsJumpAndLink($g[140].vIns))) {
					$pc = 166
					continue
				}
				$stack[$fp+2]=$g[161]
				$stack[$fp+5]=$g[142].value
				$pc = 185
				continue
			case 166:
				if (!(instrOpTypeRs2($g[140].vIns)==OP_TYPE_IMM)) {
					$pc = 175
					continue
				}
				if (!(instrIsBranch($g[140].vIns))) {
					$pc = 173
					continue
				}
				if (!($g[29]==ALU_FORWARDING)) {
					$pc = 171
					continue
				}
				if (!($g[176].tagMatches($g[140].vRdt))) {
					$pc = 167
					continue
				}
				$stack[$fp+2]=$g[166]
				$stack[$fp+5]=$g[176].value
				$pc = 170
				continue
			case 167:
				if (!($g[188].tagMatches($g[140].vRdt))) {
					$pc = 168
					continue
				}
				$stack[$fp+2]=$g[164]
				$stack[$fp+5]=$g[188].value
				$pc = 169
				continue
			case 168:
				$stack[$fp+2]=$g[161]
				$stack[$fp+5]=$g[142].value
				$pc = 169
			case 169:
				$pc = 170
			case 170:
				$pc = 172
				continue
			case 171:
				$stack[$fp+2]=$g[161]
				$stack[$fp+5]=$g[142].value
				$pc = 172
			case 172:
				$pc = 174
				continue
			case 173:
				$stack[$fp+2]=$g[162]
				$stack[$fp+5]=$g[140].vRs2
				$pc = 174
			case 174:
				$pc = 184
				continue
			case 175:
				if (!($g[29]==ALU_FORWARDING)) {
					$pc = 181
					continue
				}
				if (!(instrIsMulti($g[140].vIns)==0)) {
					$pc = 180
					continue
				}
				if (!($g[176].tagMatches($g[140].vRs2))) {
					$pc = 176
					continue
				}
				$stack[$fp+2]=$g[166]
				$stack[$fp+5]=$g[176].value
				$pc = 179
				continue
			case 176:
				if (!($g[188].tagMatches($g[140].vRs2))) {
					$pc = 177
					continue
				}
				$stack[$fp+2]=$g[164]
				$stack[$fp+5]=$g[188].value
				$pc = 178
				continue
			case 177:
				$stack[$fp+2]=$g[161]
				$stack[$fp+5]=$g[142].value
				$pc = 178
			case 178:
				$pc = 179
			case 179:
				$pc = 180
			case 180:
				$pc = 183
				continue
			case 181:
				if (!(instrIsMulti($g[140].vIns)==0)) {
					$pc = 182
					continue
				}
				$stack[$fp+2]=$g[161]
				$stack[$fp+5]=$g[142].value
				$pc = 182
			case 182:
				$pc = 183
			case 183:
				$pc = 184
			case 184:
				$pc = 185
			case 185:
				$stack[$fp+6] = 0
				if (!(instrIsMulti($g[140].vIns))) {
					$pc = 204
					continue
				}
				if (!($g[140].vIns==MUL)) {
					$pc = 193
					continue
				}
				if (!($g[202]==1)) {
					$pc = 186
					continue
				}
				$stack[$fp+6]=$stack[$fp+4]
				$pc = 192
				continue
			case 186:
				if (!($g[203]==CHECK)) {
					$pc = 189
					continue
				}
				$stack[$fp+6]=instrExecute(SLEi, $stack[$fp+5], 0)
				$g[111].setPen($g[107])
				if (!($stack[$fp+6]==1)) {
					$pc = 187
					continue
				}
				$g[205]=0
				$pc = 188
				continue
			case 187:
				$g[205]=1
				$pc = 188
			case 188:
				$pc = 191
				continue
			case 189:
				if (!($g[203]=EXEC)) {
					$pc = 190
					continue
				}
				$stack[$fp+6]=instrExecute(ADD, $stack[$fp+4], $stack[$fp+5])
				$pc = 190
			case 190:
				$pc = 191
			case 191:
				$pc = 192
			case 192:
				$pc = 203
				continue
			case 193:
				if (!($g[202]==1)) {
					$pc = 194
					continue
				}
				$stack[$fp+6]=$stack[$fp+4]
				$pc = 202
				continue
			case 194:
				if (!($g[206]==0)) {
					$pc = 199
					continue
				}
				if (!($g[203]==CHECK)) {
					$pc = 197
					continue
				}
				$stack[$fp+6]=instrExecute(SLT, $stack[$fp+4], $stack[$fp+5])
				if (!($stack[$fp+6]==1)) {
					$pc = 196
					continue
				}
				$g[206]=1
				if (!($g[140].vIns==REM)) {
					$pc = 195
					continue
				}
				$g[205]=0
				$pc = 195
			case 195:
				$pc = 196
			case 196:
				$pc = 198
				continue
			case 197:
				$stack[$fp+6]=instrExecute(SUB, $stack[$fp+4], $stack[$fp+5])
				$pc = 198
			case 198:
				$pc = 201
				continue
			case 199:
				if (!($g[140].vIns==DIV)) {
					$pc = 200
					continue
				}
				$stack[$fp+6]=$stack[$fp+4]
				$pc = 200
			case 200:
				$g[205]=0
				$pc = 201
			case 201:
				$pc = 202
			case 202:
				$pc = 203
			case 203:
				$pc = 205
				continue
			case 204:
				$stack[$fp+6]=instrExecute($g[140].vIns, $stack[$fp+4], $stack[$fp+5])
				$pc = 205
			case 205:
				if (!(($g[140].vRdt==0)&(instrIsBranch($g[140].vIns)==0))) {
					$pc = 206
					continue
				}
				$stack[$fp+6]=0
				$pc = 206
			case 206:
				if (!(instrIsBranch($g[140].vIns)==0)) {
					$pc = 207
					continue
				}
				$g[176].setNewValue($stack[$fp+6])
				$g[200]=0
				$pc = 208
				continue
			case 207:
				$g[200]=$stack[$fp+6]
				$pc = 208
			case 208:
				if (!(instrIsLoadOrStore($g[140].vIns))) {
					$pc = 209
					continue
				}
				$g[176].setNewTag(-1)
				$pc = 214
				continue
			case 209:
				if (!((instrIsMulti($g[140].vIns)==1) && $g[202]==0)) {
					$pc = 212
					continue
				}
				if (!($g[203]==CHECK)) {
					$pc = 210
					continue
				}
				$g[176].setNewTag(0)
				$g[203]=EXEC
				$pc = 211
				continue
			case 210:
				$g[176].setNewTag($g[140].vRdt)
				$g[203]=CHECK
				$pc = 211
			case 211:
				$pc = 213
				continue
			case 212:
				$g[176].setNewTag($g[140].vRdt)
				$pc = 213
			case 213:
				$pc = 214
			case 214:
				$g[176].setInvalid(0)
				$pc = 217
				continue
			case 215:
				if (!($g[140].vIns==NOP)) {
					$pc = 216
					continue
				}
				$g[176].setInvalid(1)
				$g[176].updateLabel()
				$pc = 216
			case 216:
				$pc = 217
			case 217:
				if (!($g[140].vIns==ST)) {
					$pc = 224
					continue
				}
				if (!($g[30]==FORWARDING_TO_SMDR)) {
					$pc = 222
					continue
				}
				if (!($g[176].tagMatches($g[140].vRdt))) {
					$pc = 218
					continue
				}
				$stack[$fp+3]=$g[168]
				$g[177].setNewValue($g[176].value)
				$pc = 221
				continue
			case 218:
				if (!($g[188].tagMatches($g[140].vRdt))) {
					$pc = 219
					continue
				}
				$stack[$fp+3]=$g[169]
				$g[177].setNewValue($g[188].value)
				$pc = 220
				continue
			case 219:
				$stack[$fp+3]=$g[170]
				$g[177].setNewValue($g[142].value)
				$pc = 220
			case 220:
				$pc = 221
			case 221:
				$pc = 223
				continue
			case 222:
				$stack[$fp+3]=$g[170]
				$g[177].setNewValue($g[142].value)
				$pc = 223
			case 223:
				$pc = 224
			case 224:
				if (wait(8))
				return
				$pc = 225
			case 225:
				fork(40, $g[155], 64)
				if (!($g[140].vIns==ST)) {
					$pc = 226
					continue
				}
				fork(40, $stack[$fp+3], 24)
				$pc = 226
			case 226:
				if (!(instrOpTypeRdt($g[140].vIns)==OP_TYPE_REG)) {
					$pc = 229
					continue
				}
				if (!($stack[$fp+1]!=0)) {
					$pc = 227
					continue
				}
				fork(40, $stack[$fp+1], 24)
				$pc = 227
			case 227:
				if (!($stack[$fp+2]==$g[162])) {
					$pc = 228
					continue
				}
				$g[163].setTxt("%02X", $stack[$fp+5])
				$g[163].setOpacity(1)
				$pc = 228
			case 228:
				fork(40, $stack[$fp+2], 24)
				$pc = 229
			case 229:
				if (wait(24))
				return
				$pc = 230
			case 230:
				if (!($g[140].vIns==ST)) {
					$pc = 231
					continue
				}
				fork(40, $g[171], 40)
				$pc = 231
			case 231:
				if (!(instrOpTypeRdt($g[140].vIns)==OP_TYPE_REG)) {
					$pc = 246
					continue
				}
				$g[154].setTxtOp($g[140].vIns)
				if (!($stack[$fp+1]!=0)) {
					$pc = 232
					continue
				}
				fork(40, $g[172], 10)
				$pc = 232
			case 232:
				if (!(instrIsMulti($g[140].vIns) && $g[202]==1)) {
					$pc = 234
					continue
				}
				if (!($g[140].vIns==MUL)) {
					$pc = 233
					continue
				}
				$g[202]=0
				$pc = 233
			case 233:
				$pc = 235
				continue
			case 234:
				fork(40, $g[173], 10)
				$pc = 235
			case 235:
				if (!(instrIsBranch($g[140].vIns))) {
					$pc = 238
					continue
				}
				if (wait(5))
				return
				$pc = 236
			case 236:
				if (!($g[200]==1)) {
					$pc = 237
					continue
				}
				$g[113].setPen($g[107])
				$pc = 237
			case 237:
				$pc = 245
				continue
			case 238:
				if (!((($g[140].vIns==DIV) || ($g[140].vIns==REM)) && ($g[202]==1))) {
					$pc = 241
					continue
				}
				$g[202]=0
				$g[112].setPen($g[107])
				$g[141].setNewValue(0)
				if (wait(5))
				return
				$pc = 239
			case 239:
				callf(36, $g[141])
				continue
			case 240:
				$pc = 241
			case 241:
				if (wait(20))
				return
				$pc = 242
			case 242:
				callf(40, $g[174], 10)
				continue
			case 243:
				if (wait(10))
				return
				$pc = 244
			case 244:
				$g[154].txtResult.setTxt("%02X", $stack[$fp+6])
				$g[154].txtResult.setOpacity(1, 20, 1, 0)
				$pc = 245
			case 245:
				$pc = 246
			case 246:
				returnf(0)
				continue
			case 247:
				enterf(0);	// maExec
				fork(34, $g[175])
				if (!(instrOpTypeRdt($g[175].nIns)==OP_TYPE_REG)) {
					$pc = 248
					continue
				}
				fork(36, $g[176])
				$pc = 248
			case 248:
				if (!($g[175].nIns==ST)) {
					$pc = 249
					continue
				}
				fork(36, $g[177])
				$pc = 249
			case 249:
				if (wait(8))
				return
				$pc = 250
			case 250:
				$g[187].setNewValue($g[175].vIns, $g[175].vRdt, $g[175].vRs1, $g[175].vRs2)
				if (!((instrOpTypeRdt($g[175].vIns)==OP_TYPE_REG) && ($g[175].vIns!=ST))) {
					$pc = 253
					continue
				}
				if (!($g[175].vIns==LD)) {
					$pc = 251
					continue
				}
				$g[188].setNewValue($g[179].getVal($g[176].value%MEMORY_ADDRESSES))
				$g[188].setNewTag($g[175].vRdt)
				$pc = 252
				continue
			case 251:
				$g[188].setNewValue($g[176].value)
				$g[188].setNewTag($g[176].tag)
				$pc = 252
			case 252:
				$g[188].setInvalid(0)
				$pc = 253
			case 253:
				if (wait(8))
				return
				$pc = 254
			case 254:
				fork(40, $g[181], 64)
				if (!($g[175].vIns==ST)) {
					$pc = 257
					continue
				}
				fork(40, $g[185], 24)
				callf(40, $g[184], 24)
				continue
			case 255:
				callf(38, $g[179], $g[176].value%MEMORY_ADDRESSES, $g[177].value)
				continue
			case 256:
				$pc = 265
				continue
			case 257:
				if (!(instrOpTypeRdt($g[175].vIns)==OP_TYPE_REG)) {
					$pc = 264
					continue
				}
				if (!($g[175].vIns==LD)) {
					$pc = 260
					continue
				}
				callf(40, $g[184], 24)
				continue
			case 258:
				$g[179].highlight($g[176].value%MEMORY_ADDRESSES)
				callf(40, $g[186], 24)
				continue
			case 259:
				$pc = 262
				continue
			case 260:
				callf(40, $g[182], 48)
				continue
			case 261:
				$pc = 262
			case 262:
				callf(40, $g[183], 16)
				continue
			case 263:
				$pc = 264
			case 264:
				$pc = 265
			case 265:
				returnf(0)
				continue
			case 266:
				enterf(0);	// wbExec
				fork(34, $g[187])
				if (!((instrOpTypeRdt($g[187].nIns)==OP_TYPE_REG) && ($g[187].nIns!=ST))) {
					$pc = 267
					continue
				}
				fork(36, $g[188])
				$pc = 267
			case 267:
				if (wait(8))
				return
				$pc = 268
			case 268:
				if (!((instrOpTypeRdt($g[187].vIns)==OP_TYPE_REG) && ($g[187].vIns!=ST))) {
					$pc = 274
					continue
				}
				if (!($g[188].tag!=0)) {
					$pc = 269
					continue
				}
				$g[96][$g[188].tag].setNewValue($g[188].value)
				$pc = 269
			case 269:
				if (wait(8))
				return
				$pc = 270
			case 270:
				callf(40, $g[189], 24)
				continue
			case 271:
				callf(36, $g[96][$g[188].tag])
				continue
			case 272:
				if (wait(19))
				return
				$pc = 273
			case 273:
				$pc = 276
				continue
			case 274:
				if (wait(67))
				return
				$pc = 275
			case 275:
				$pc = 276
			case 276:
				if (!($g[187].vIns!=STALL && $g[187].vIns!=EMPTY)) {
					$pc = 277
					continue
				}
				$g[33]++
				$g[69].setTxt("%4d", $g[33])
				$pc = 277
			case 277:
				$g[34]++
				$g[70].setTxt("%4d", $g[34])
				returnf(0)
				continue
			case 278:
				enterf(0);	// nonPipelinedBranch
				fork(40, $g[118], 24)
				fork(40, $g[119], 24)
				callf(40, $g[91], 12)
				continue
			case 279:
				fork(40, $g[116], 12)
				fork(40, $g[117], 12)
				if (wait(12))
				return
				$pc = 280
			case 280:
				if (!(instrIsBranch($g[140].vIns))) {
					$pc = 283
					continue
				}
				$g[74].setNewValue($g[129].value&127)
				callf(36, $g[74])
				continue
			case 281:
				callf(40, $g[84], 14)
				continue
			case 282:
				$pc = 293
				continue
			case 283:
				if (!(instrIsJumpR($g[94].vIns))) {
					$pc = 285
					continue
				}
				$g[74].setNewValue(($g[96][$g[94].vRs2].value)&127)
				callf(40, $g[86], 34)
				continue
			case 284:
				$pc = 292
				continue
			case 285:
				if (!(isJorJAL($g[94].vIns))) {
					$pc = 288
					continue
				}
				$g[74].setNewValue(($g[74].value+$g[94].vRs2)&127)
				callf(40, $g[123], 20)
				continue
			case 286:
				callf(40, $g[84], 14)
				continue
			case 287:
				$pc = 291
				continue
			case 288:
				$g[74].setNewValue(($g[74].value+4)&127)
				callf(40, $g[121], 20)
				continue
			case 289:
				callf(40, $g[84], 14)
				continue
			case 290:
				$pc = 291
			case 291:
				$pc = 292
			case 292:
				$pc = 293
			case 293:
				callf(40, $g[88], 6)
				continue
			case 294:
				returnf(0)
				continue
			case 295:
				enterf(5);	// execNonPipelined
				callf(36, $g[74])
				continue
			case 296:
				$g[72].setActive($g[74].newValue)
				callf(40, $g[83], 24)
				continue
			case 297:
				callf(40, $g[81], 40)
				continue
			case 298:
				$g[94].setNewInstruction($g[72].instruction[$g[74].value/4])
				$g[82].setTxt($g[94].getNewInstrTxt())
				$g[82].translate(60/2+70, 0, 20, 1, 0)
				callf(34, $g[94])
				continue
			case 299:
				if (!((instrOpTypeRs2($g[94].vIns)==OP_TYPE_IMM) && (instrOpTypeRdt($g[94].vIns)==OP_TYPE_REG))) {
					$pc = 300
					continue
				}
				fork(40, $g[93], 64)
				$pc = 300
			case 300:
				fork(278, $obj)
				if (wait(24))
				return
				$pc = 301
			case 301:
				if (!(instrIsJumpAndLink($g[94].vIns))) {
					$pc = 304
					continue
				}
				callf(40, $g[115], 20)
				continue
			case 302:
				callf(40, $g[135], 20)
				continue
			case 303:
				$stack[$fp+1]=0
				$stack[$fp+2]=($g[74].value+4)&127
				$pc = 316
				continue
			case 304:
				if (!(instrOpTypeRdt($g[94].vIns)==OP_TYPE_REG)) {
					$pc = 313
					continue
				}
				$stack[$fp+1]=$g[96][$g[94].vRs1].value
				$g[96][$g[94].vRs1].highlight($g[21])
				$g[139].setTxt("R%d:%02X", $g[94].vRs1, $g[96][$g[94].vRs1].value)
				$g[139].setOpacity(1)
				fork(40, $g[138], 40)
				if (!((instrOpTypeRs2($g[94].vIns)==OP_TYPE_REG) || ($g[94].vIns==ST))) {
					$pc = 310
					continue
				}
				if (!(instrOpTypeRs2($g[94].vIns)==OP_TYPE_IMM)) {
					$pc = 305
					continue
				}
				$stack[$fp+2]=$g[96][$g[94].vRdt].value
				$g[96][$g[94].vRdt].highlight($g[21])
				$pc = 306
				continue
			case 305:
				$stack[$fp+2]=$g[96][$g[94].vRs2].value
				$g[96][$g[94].vRs2].highlight($g[21])
				$pc = 306
			case 306:
				if (!((!instrIsArRI($g[94].vIns)) && ($g[94].vIns!=LD))) {
					$pc = 309
					continue
				}
				$stack[$fp+5] = ($g[94].vIns==ST) ? $g[94].vRdt : $g[94].vRs2
				$g[137].setTxt("R%d:%02X", $stack[$fp+5], $g[96][$stack[$fp+5]].value)
				$g[137].setOpacity(1)
				callf(40, $g[136], 20)
				continue
			case 307:
				callf(40, $g[135], 20)
				continue
			case 308:
				$pc = 309
			case 309:
				$pc = 312
				continue
			case 310:
				if (wait(40))
				return
				$pc = 311
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
				$pc = 316
			case 316:
				if (!(instrOpTypeRdt($g[94].vIns)==OP_TYPE_REG)) {
					$pc = 317
					continue
				}
				$g[154].setTxtOp($g[94].vIns)
				$pc = 317
			case 317:
				if (!($g[94].vIns==ST)) {
					$pc = 322
					continue
				}
				fork(40, $g[170], 40)
				fork(40, $g[160], 40)
				$g[163].setTxt("%02X", $g[94].vRs2)
				$g[163].setOpacity(1)
				callf(40, $g[162], 40)
				continue
			case 318:
				fork(40, $g[171], 40)
				fork(40, $g[173], 10)
				callf(40, $g[172], 10)
				continue
			case 319:
				if (wait(20))
				return
				$pc = 320
			case 320:
				callf(40, $g[174], 10)
				continue
			case 321:
				$stack[$fp+4]=$stack[$fp+2]
				$stack[$fp+3]=instrExecute($g[94].vIns, $stack[$fp+1], $g[94].vRs2)
				$pc = 342
				continue
			case 322:
				if (!(instrIsJumpAndLink($g[94].vIns))) {
					$pc = 327
					continue
				}
				callf(40, $g[161], 40)
				continue
			case 323:
				callf(40, $g[173], 10)
				continue
			case 324:
				$stack[$fp+3]=instrExecute($g[94].vIns, $stack[$fp+1], $stack[$fp+2])
				if (wait(20))
				return
				$pc = 325
			case 325:
				callf(40, $g[174], 10)
				continue
			case 326:
				$pc = 341
				continue
			case 327:
				if (!(instrOpTypeRdt($g[94].vIns)==OP_TYPE_REG)) {
					$pc = 338
					continue
				}
				fork(40, $g[160], 40)
				if (!(instrOpTypeRs2($g[94].vIns)==OP_TYPE_IMM)) {
					$pc = 329
					continue
				}
				$g[163].setTxt("%02X", $g[94].vRs2)
				$g[163].setOpacity(1)
				callf(40, $g[162], 40)
				continue
			case 328:
				$stack[$fp+3]=instrExecute($g[94].vIns, $stack[$fp+1], $g[94].vRs2)
				$pc = 331
				continue
			case 329:
				callf(40, $g[161], 40)
				continue
			case 330:
				$stack[$fp+3]=instrExecute($g[94].vIns, $stack[$fp+1], $stack[$fp+2])
				$pc = 331
			case 331:
				fork(40, $g[173], 10)
				callf(40, $g[172], 10)
				continue
			case 332:
				if (!(instrIsBranch($g[94].vIns))) {
					$pc = 334
					continue
				}
				if (wait(5))
				return
				$pc = 333
			case 333:
				$g[113].setPen($g[107])
				$pc = 337
				continue
			case 334:
				if (wait(20))
				return
				$pc = 335
			case 335:
				callf(40, $g[174], 10)
				continue
			case 336:
				$pc = 337
			case 337:
				$pc = 340
				continue
			case 338:
				if (wait(80))
				return
				$pc = 339
			case 339:
				$pc = 340
			case 340:
				$pc = 341
			case 341:
				$pc = 342
			case 342:
				if (!($g[94].vIns==LD)) {
					$pc = 346
					continue
				}
				callf(40, $g[184], 20)
				continue
			case 343:
				$g[178][($stack[$fp+3])%4].highlight($g[21])
				callf(40, $g[186], 20)
				continue
			case 344:
				callf(40, $g[183], 40)
				continue
			case 345:
				$stack[$fp+3]=$g[178][($stack[$fp+3])%4].value
				$pc = 356
				continue
			case 346:
				if (!($g[94].vIns==ST)) {
					$pc = 349
					continue
				}
				fork(40, $g[185], 20)
				callf(40, $g[184], 20)
				continue
			case 347:
				$g[178][($stack[$fp+3])%4].setNewValue($stack[$fp+4])
				callf(36, $g[178][($stack[$fp+3])%4])
				continue
			case 348:
				$pc = 355
				continue
			case 349:
				if (!(instrOpTypeRdt($g[94].vIns)==OP_TYPE_REG)) {
					$pc = 352
					continue
				}
				callf(40, $g[182], 40)
				continue
			case 350:
				callf(40, $g[183], 40)
				continue
			case 351:
				$pc = 354
				continue
			case 352:
				if (wait(80))
				return
				$pc = 353
			case 353:
				$pc = 354
			case 354:
				$pc = 355
			case 355:
				$pc = 356
			case 356:
				$g[96][0].unHighlight()
				$g[96][1].unHighlight()
				$g[96][2].unHighlight()
				$g[96][3].unHighlight()
				if (!((instrOpTypeRdt($g[94].vIns)==OP_TYPE_REG) && ($g[94].vIns!=ST))) {
					$pc = 360
					continue
				}
				callf(40, $g[189], 40)
				continue
			case 357:
				$g[96][$g[94].vRdt].setNewValue($stack[$fp+3])
				callf(36, $g[96][$g[94].vRdt])
				continue
			case 358:
				if (wait(19))
				return
				$pc = 359
			case 359:
				$pc = 362
				continue
			case 360:
				if (wait(75))
				return
				$pc = 361
			case 361:
				$pc = 362
			case 362:
				$g[34]+=5
				$g[33]++
				$g[69].setTxt("%4d", $g[33])
				$g[70].setTxt("%4d", $g[34])
				returnf(0)
				continue
			case 363:
				enterf(0);	// exec
				$g[96][0].unHighlight()
				$g[96][1].unHighlight()
				$g[96][2].unHighlight()
				$g[96][3].unHighlight()
				$g[178][0].unHighlight()
				$g[178][1].unHighlight()
				$g[178][2].unHighlight()
				$g[178][3].unHighlight()
				$g[76][0].unHighlight()
				$g[76][1].unHighlight()
				$g[77][0].unHighlight()
				$g[77][1].unHighlight()
				if (!($g[26]==PIPELINING_ENABLED)) {
					$pc = 364
					continue
				}
				fork(51, $obj)
				fork(72, $obj)
				fork(120, $obj)
				fork(247, $obj)
				fork(266, $obj)
				$pc = 365
				continue
			case 364:
				fork(295, $obj)
				$pc = 365
			case 365:
				if (wait(8))
				return
				$pc = 366
			case 366:
				resetWires()
				if (wait(($g[26]==PIPELINING_ENABLED) ? 72 : 392))
				return
				$pc = 367
			case 367:
				checkPoint()
				returnf(0)
				continue
			case 368:
				enterf(0);	// run
				if (wait(1))
				return
				$pc = 369
			case 369:
				$g[32]=1
				setlocked()
				$pc = 370
			case 370:
				if (!(1)) {
					$pc = 375
					continue
				}
				fork(46, $g[73], ($g[26]==PIPELINING_ENABLED) ? 80 : 400)
				callf(363, $obj)
				continue
			case 371:
				if (!((($g[187].vIns==HALT) && ($g[26]==PIPELINING_ENABLED)) || (($g[94].vIns==HALT) && ($g[26]==PIPELINING_DISABLED)))) {
					$pc = 373
					continue
				}
				stop()
				if (!($g[193])) {
					$pc = 372
					continue
				}
				$pc = 375
				continue
				$pc = 372
			case 372:
				$pc = 373
			case 373:
				if (wait(1))
				return
				$pc = 374
			case 374:
				$pc = 370
				continue
			case 375:
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
