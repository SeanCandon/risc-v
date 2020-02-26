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
		return sprintf("%s", $g[37][instr])
		else 
		if (instrIsArRR(instr))
		return sprintf("%s x%d,x%d,x%d", $g[37][instr], rdt, rs1, rs2)
		else 
		if (instrIsArRI(instr))
		return sprintf("%s x%d,x%d,%02X", $g[37][instr], rdt, rs1, rs2)
		else 
		if (instr==LD)
		return sprintf("LD x%d,x%d+%02X", rdt, rs1, rs2)
		else 
		if (instr==ST)
		return sprintf("ST x%d,x%d+%02X", rdt, rs1, rs2)
		else 
		if (instrIsBranch(instr))
		return sprintf("%s x%d,x%d,%02X", $g[37][instr], rdt, rs1, rs2)
		else 
		if (instr==J)
		return sprintf("%s %02X", $g[37][instr], rs2)
		else 
		if (instr==JAL)
		return sprintf("%s x%d, %02X", $g[37][instr], rdt, rs2)
		else 
		if (instr==JR)
		return sprintf("%s x%d", $g[37][instr], rs2)
		else 
		if (instr==JALR)
		return sprintf("%s x%d, x%d", $g[37][instr], rdt, rs2)
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
		this.adr = new Rectangle2($g[0], $g[19], 0, 0, this.brush, this.x, this.y, this.fw, this.h, 0, $g[17], "%02X", this.addr)
		this.ins = new Rectangle2($g[0], $g[19], HLEFT, 0, this.brush, this.x+this.fw, this.y, 2*this.fw, this.h, this.insPen, $g[17], " NOP")
		this.rdt = new Rectangle2($g[0], $g[19], 0, 0, this.brush, this.x+3*this.fw, this.y, this.fw, this.h, this.rdtPen, $g[17], "-")
		this.rs1 = new Rectangle2($g[0], $g[19], 0, 0, this.brush, this.x+4*this.fw, this.y, this.fw, this.h, this.rs1Pen, $g[17], "-")
		this.rs2 = new Rectangle2($g[0], $g[19], 0, 0, this.brush, this.x+5*this.fw, this.y, this.fw, this.h, this.rs2Pen, $g[17], "-")
		this.dot = new Rectangle2($g[0], $g[19], 0, 0, $g[11], this.x+this.fw*0.80000000000000004, this.y+2, this.h/2, this.h/2)
		this.dot.setOpacity(0)
		this.arrowDown = new Line($g[0], $g[19], 0, $g[41], 0, 0, this.x+this.w+2, this.y+this.h*0.5, 5, 0, 0, 0, 0, 0)
		this.arrowUp = new Line($g[0], $g[19], 0, $g[41], 0, 0, this.x-2, this.y+this.h*0.5, -5, 0, 0, 0, 0, 0)
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
		this.ins.setTxt("%c%s", 32, $g[37][this.vIns])
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
		this.r = new Rectangle2($g[0], 0, 0, $g[1], $g[38], x, y, w, h)
		this.r.setRounded(2, 2)
		new Rectangle2($g[0], 0, 0, $g[1], $g[39], x+2, y+2, w-4, h-4)
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
		this.r1 = new Rectangle2($g[0], 0, 0, $g[1], $g[42], x, y, w, h)
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
		this.bg = new Rectangle2($g[0], 0, 0, $g[1], $g[44], this.x, this.y, this.w, this.h)
		this.bg.setRounded(2, 2)
		this.label
		if (this.w>=this.h) {
			this.label=new Rectangle2($g[0], 0, 0, 0, 0, this.x, this.y, this.w, this.h, 0, $g[45], caption)
		} else {
			this.label=new Rectangle($g[0], 0, 0, 0, 0, this.x+this.w/2-1, this.y+this.h/2, -this.w/2, -this.h/2, this.w, this.h, 0, $g[45], caption)
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
		this.spText = new Rectangle2($g[0], 0, 0, $g[4], $g[46], 120, 120, 20, 8, $g[4], $g[45], sprintf(""))
		this.spAddr = -2
		this.prevSPAddr = -1
		this.apFP = new AnimPipe()
		this.fpText = new Rectangle2($g[0], 0, 0, $g[4], $g[46], 120, 120, 20, 8, $g[4], $g[45], sprintf(""))
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
		this.outer = new Rectangle2($g[0], 0, 0, $g[1], $g[46], this.outer_x, this.outer_y, this.outer_w, this.outer_h)
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
			this.fpText=new Rectangle2($g[0], 0, 0, $g[4], $g[46], (tax+taw+13), (tay+6), 20, 8, $g[3], $g[45], sprintf("FP"))
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
			this.spText=new Rectangle2($g[0], 0, 0, $g[4], $g[46], (ax+aw+20), (ay+6), 15, 8, $g[3], $g[45], sprintf("SP/FP"))
		} else {
			this.spText=new Rectangle2($g[0], 0, 0, $g[4], $g[46], (ax+aw+13), (ay+6), 20, 8, $g[3], $g[45], sprintf("SP"))
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
			this.fpText=new Rectangle2($g[0], 0, 0, $g[4], $g[46], (ax+aw+13), (ay+6), 20, 8, $g[3], $g[45], sprintf("FP"))
		} else {
			this.spText.setOpacity(0)
			this.fpText.setOpacity(0)
			this.spText=new Rectangle2($g[0], 0, 0, $g[4], $g[46], (ax+aw+20), (ay+6), 15, 8, $g[3], $g[45], sprintf("SP/FP"))
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
		this.alu = new Polygon($g[0], 0, ABSOLUTE, $g[1], $g[44], x, y, 0, 0, w, h/4, w, 3*h/4, 0, h, 0, 5*h/8, w/2, h/2, 0, 3*h/8)
		new Rectangle2($g[0], 0, 0, 0, 0, x, y-10, w, 10, 0, $g[45], "ALU")
		this.op = ""
		this.txtOp = new Rectangle($g[0], $g[19], 0, 0, $g[11], x, y+h/2, 0, -h/12, 2*w/3, h/6, $g[4], $g[45], this.op)
		this.txtOp.setOpacity(0)
		this.txtOp.setRounded(2, 2)
		this.txtResult = new Rectangle($g[0], $g[21], 0, $g[1], $g[13], x+3*w/4, y+h/2, 0, -h/12, w/2, h/6, $g[1], $g[45])
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
		this.prev_clock = new Line(this, $g[21], 0, $g[47], -this.chw+this.chw/5, 3+this.ch, 0, 0, 0, -this.ch, this.chw, 0, 0, this.ch, this.chw, 0)
		this.next_clock = new Line(this, $g[21], 0, $g[48], this.chw+this.chw/5, 3+this.ch, 0, 0, 0, -this.ch, this.chw, 0, 0, this.ch, this.chw, 0)
		this.dot = new Rectangle2(this, $g[21], 0, 0, $g[5], w/2-3, h-6, 6, 6)
		this.canUpdate
	}
	AnimatedClock.prototype = Object.create(Group.prototype)

	AnimatedClock.prototype.setStall = function(s, t) {
		this.stall=s
		this.type=t
		if (this.canUpdate)
		this.prev_clock.setPen(this.stall ? (this.type ? $g[49] : $g[47]) : $g[48])
	}

	function Button(x, y, w, h, caption, ID) {
		VObj.call(this)
		this.label = new Rectangle2($g[0], 0, 0, $g[1], $g[50], x, y, w, h, $g[1], $g[17], caption)
		this.label.addEventHandler("eventEE", this, this.$eh11)
	}
	Button.prototype = Object.create(VObj.prototype)

	Button.prototype.$eh11 = function(enter, x, y) {
		this.label.setBrush(enter ? $g[51] : $g[50])
		return 0
	}

	Button.prototype.setCaption = function(caption) {
		this.label.setTxt(caption)
	}

	Button.prototype.showLocked = function(locked) {
		this.label.setFont(locked ? $g[18] : $g[17])
	}

	function resetWires() {
		$g[85].reset()
		$g[83].reset()
		$g[84].setOpacity(0)
		$g[86].reset()
		$g[87].reset()
		$g[88].reset()
		$g[89].reset()
		$g[90].reset()
		$g[91].reset()
		$g[92].reset()
		$g[93].reset()
		$g[94].reset()
		$g[95].reset()
		$g[116].reset()
		$g[117].reset()
		$g[118].reset()
		$g[119].reset()
		$g[120].reset()
		$g[121].reset()
		$g[122].setOpacity(0)
		$g[123].reset()
		$g[124].setOpacity(0)
		$g[126].reset()
		$g[127].setOpacity(0)
		$g[128].reset()
		$g[129].reset()
		$g[125].reset()
		$g[133].reset()
		$g[134].setOpacity(0)
		$g[136].reset()
		$g[135].reset()
		$g[138].reset()
		$g[139].reset()
		$g[140].setOpacity(0)
		$g[141].reset()
		$g[142].setOpacity(0)
		$g[137].setOpacity(0)
		$g[113].setPen($g[108])
		$g[114].setPen($g[108])
		$g[115].setPen($g[108])
		$g[150].reset()
		$g[151].reset()
		$g[152].reset()
		$g[153].reset()
		$g[154].reset()
		$g[155].reset()
		$g[156].setOpacity(0)
		$g[157].reset()
		$g[158].reset()
		$g[159].reset()
		$g[160].reset()
		$g[161].reset()
		$g[162].reset()
		$g[163].reset()
		$g[164].reset()
		$g[165].reset()
		$g[149].txtOp.setOpacity(0)
		$g[149].txtResult.setOpacity(0)
		$g[113].setPen($g[108])
		$g[114].setPen($g[108])
		$g[172].reset()
		$g[173].reset()
		$g[174].reset()
		$g[175].reset()
		$g[176].reset()
		$g[177].reset()
		$g[180].reset()
	}

	function resetRegisters() {
		$g[76].reset()
		$g[76].setValue(124)
		$g[97].reset()
		$g[144].reset()
		$g[145].reset()
		$g[168].reset()
		$g[167].reset()
		$g[179].reset()
		$g[78][0].reset()
		$g[78][1].reset()
		$g[79][0].reset()
		$g[79][1].reset()
		$g[169][0].reset()
		$g[169][1].reset()
		$g[169][2].reset()
		$g[169][3].reset()
		$g[96].reset()
		$g[143].reset()
		$g[166].reset()
		$g[178].reset()
		$g[74].setActive(124)
		$g[167].setInvalid(1)
		$g[167].updateLabel()
		$g[179].setInvalid(1)
		$g[179].updateLabel()
		$g[78][0].setValue(-1)
		$g[78][0].setInvalid(1)
		$g[78][0].updateLabel()
		$g[78][1].setValue(-1)
		$g[78][1].setInvalid(1)
		$g[78][1].updateLabel()
		$g[35]=0
		$g[36]=0
		$g[71].setTxt("%4d", 0)
		$g[72].setTxt("%4d", 0)
	}

	function resetCircuit() {
		resetRegisters()
		resetWires()
	}

	function showBTB(opacity) {
		$g[77].setOpacity(opacity)
		$g[78][0].setOpacity(opacity)
		$g[78][1].setOpacity(opacity)
		$g[79][0].setOpacity(opacity)
		$g[79][1].setOpacity(opacity)
		$g[91].setOpacity(opacity)
		$g[116].setOpacity(opacity)
		$g[80].setOpacity(opacity)
		$g[94].setOpacity(opacity)
		$g[87].setOpacity(opacity)
		$g[133].setOpacity(opacity)
		$g[136].setOpacity(opacity)
		$g[106].setOpacity(opacity)
		$g[135].setOpacity(opacity)
	}

	function showALUForwarding(opacity) {
		if (opacity==0) {
			$g[153].setPoint(0, 440, 205)
			$g[153].setPoint(1, 501, 205)
			$g[154].setPoint(0, ($g[31]) ? 440 : 430, 250)
			$g[154].setPoint(1, 490, 250)
			$g[155].setPoint(2, 450, 260)
			$g[155].setPoint(3, 410, 260)
			$g[153].setHead(0)
		} else {
			$g[153].setPoint(0, 440, 220)
			$g[153].setPoint(1, 500, 220)
			$g[154].setPoint(0, 440, 240)
			$g[154].setPoint(1, 500, 240)
			$g[155].setPoint(2, 450, 250)
			$g[155].setPoint(3, 500, 250)
			$g[153].setHead(1)
		}
		$g[146].setOpacity(opacity)
		$g[151].setOpacity(opacity)
		$g[152].setOpacity(opacity)
		$g[158].setOpacity(opacity)
		$g[157].setOpacity(opacity)
	}

	function showSMDRForwarding(opacity) {
		if (opacity==0) {
			$g[161].setPoint(1, 435, 330)
			$g[161].setPoint(2, 500, 330)
			$g[161].setHead(0)
		} else {
			$g[161].setPoint(1, 435, 340)
			$g[161].setPoint(2, 500, 340)
			$g[161].setHead(1)
		}
		$g[148].setOpacity(opacity)
		$g[159].setOpacity(opacity)
		$g[160].setOpacity(opacity)
	}

	function showZeroForwarding(opacity) {
		if (opacity==0) {
		} else {
		}
	}

	function showPipeline(opacity) {
		if (opacity==0) {
			$g[93].setPoint(1, 180, 230)
			$g[93].setPoint(2, 180, 240)
			$g[118].setPoint(0, 260, 230)
			$g[119].setPoint(0, 260, 230)
			$g[95].setPoint(1, 380, 390)
			$g[141].setPoint(1, 375, 205)
			$g[141].setPoint(2, 440, 205)
			$g[138].setPoint(1, 440, 240)
			$g[161].setPoint(0, 435, 250)
			$g[165].setPoint(3, 600, 240)
			$g[162].setPoint(1, 530, 330)
			$g[174].setPoint(1, 640, 230)
			$g[95].setHead(0)
			$g[93].setHead(0)
			$g[141].setHead(0)
			$g[153].setHead(0)
			$g[138].setHead(0)
			$g[161].setHead(0)
			$g[162].setHead(0)
			$g[163].setHead(0)
			$g[164].setHead(0)
			$g[165].setHead(0)
			$g[174].setHead(0)
			showBTB(opacity)
			showALUForwarding(opacity)
			showSMDRForwarding(opacity)
			showZeroForwarding(opacity)
		} else {
			$g[93].setPoint(1, 240, 230)
			$g[93].setPoint(2, 250, 230)
			$g[118].setPoint(0, 260, 250)
			$g[119].setPoint(0, 260, 250)
			$g[95].setPoint(1, 390, 390)
			$g[141].setPoint(1, 375, 210)
			$g[141].setPoint(2, 420, 210)
			$g[138].setPoint(1, 420, 240)
			$g[161].setPoint(0, 435, 270)
			$g[165].setPoint(3, 600, 240)
			$g[162].setPoint(1, 600, 330)
			$g[174].setPoint(1, 700, 230)
			$g[95].setHead(1)
			$g[93].setHead(1)
			$g[141].setHead(1)
			$g[153].setHead(1)
			$g[138].setHead(1)
			$g[161].setHead(1)
			$g[162].setHead(1)
			$g[163].setHead(1)
			$g[164].setHead(1)
			$g[165].setHead(1)
			$g[174].setHead(1)
			showBTB($g[29]==BRANCH_PREDICTION ? 1 : 0)
			showALUForwarding($g[31]==ALU_FORWARDING ? 1 : 0)
			showSMDRForwarding($g[32]==FORWARDING_TO_SMDR ? 1 : 0)
			showZeroForwarding($g[33]==ZERO_FORWARDING ? 1 : 0)
		}
		$g[92].setOpacity(opacity)
		$g[82].setOpacity(opacity)
		$g[89].setOpacity(opacity)
		$g[97].setOpacity(opacity)
		$g[143].setOpacity(opacity)
		$g[166].setOpacity(opacity)
		$g[178].setOpacity(opacity)
		$g[150].setOpacity(opacity)
		$g[172].setOpacity(opacity)
		$g[144].setOpacity(opacity)
		$g[145].setOpacity(opacity)
		$g[167].setOpacity(opacity)
		$g[179].setOpacity(opacity)
		$g[168].setOpacity(opacity)
		$g[64].label.setOpacity(opacity)
		$g[65].label.setOpacity(opacity)
		$g[66].label.setOpacity(opacity)
		$g[67].label.setOpacity(opacity)
		$g[68].label.setOpacity(opacity)
	}

	function setPEMode(mode) {
		$g[28]=mode
		if ($g[28]==0) {
			$g[63].setCaption("Pipelining Enabled")
			showPipeline(1)
		} else
		if ($g[28]==1) {
			$g[63].setCaption("Pipelining Disabled")
			showPipeline(0)
		}
		setArg("peMode", $g[28].toString())
	}

	function setBPMode(mode) {
		$g[29]=mode
		if ($g[29]==0) {
			$g[64].setCaption("Branch Prediction")
			showBTB(1)
		} else
		if ($g[29]==1) {
			$g[64].setCaption("Branch Interlock")
			showBTB(0)
		} else
		if ($g[29]==2) {
			$g[64].setCaption("Delayed Branches")
			showBTB(0)
		}
		setArg("bpMode", $g[29].toString())
	}

	function setLIMode(mode) {
		$g[30]=mode
		if ($g[30]==0) {
			$g[65].setCaption("Load Interlock")
		} else
		if ($g[30]==1) {
			$g[65].setCaption("No Load Interlock")
		}
		setArg("liMode", $g[30].toString())
	}

	function setAFMode(mode) {
		$g[31]=mode
		if ($g[31]==0) {
			$g[66].setCaption("ALU Forwarding")
			showALUForwarding(1)
		} else
		if ($g[31]==1) {
			$g[66].setCaption("ALU Interlock")
			showALUForwarding(0)
		} else
		if ($g[31]==2) {
			$g[66].setCaption("No ALU Interlock")
			showALUForwarding(0)
		}
		setArg("afMode", $g[31].toString())
	}

	function setSFMode(mode) {
		$g[32]=mode
		if ($g[32]==0) {
			$g[67].setCaption("Store Operand\nForwarding")
			showSMDRForwarding(1)
		} else
		if ($g[32]==1) {
			$g[67].setCaption("Store Interlock")
			showSMDRForwarding(0)
		} else
		if ($g[32]==2) {
			$g[67].setCaption("No Store Interlock")
			showSMDRForwarding(0)
		}
		setArg("sfMode", $g[32].toString())
	}

	function setZFMode(mode) {
		$g[33]=mode
		if ($g[33]==0) {
			$g[68].setCaption("Zero Forwarding")
			showZeroForwarding(1)
		} else
		if ($g[33]==1) {
			$g[68].setCaption("Zero Interlock")
			showZeroForwarding(0)
		} else
		if ($g[33]==2) {
			$g[68].setCaption("No Zero Interlock")
			showZeroForwarding(0)
		}
		setArg("zfMode", $g[33].toString())
	}

	function btbIndex(pc) {
		for (let lp1 = 0; lp1<2; lp1++)
		if ($g[78][lp1].value==pc)
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
		if ($g[206]==0) {
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
		$g[200]=c
	}

	function booth8() {
		let b1 = $g[202]&1
		if (b1!=$g[201] && $g[205]!=2) {
			if (b1>$g[201]) {
				$g[203]=(se8($g[203])-se8($g[204]))&255
			} else {
				$g[203]=(se8($g[203])+se8($g[204]))&255
			}
			$g[205]=2
		} else {
			$g[205]=1
			let p21 = $g[203]&1
			p21=p21<<7
			let p2m = $g[203]&128
			$g[202]=($g[202]>>1)&255
			$g[202]=$g[202]|p21
			$g[203]=($g[203]>>1)&255
			$g[203]=$g[203]|p2m
			$g[201]=b1
		}
	}

	function booth() {
		let b1 = $g[202]&1
		if (b1!=$g[201] && $g[205]!=2) {
			let p3 = $g[202]&15
			let q = $g[202]&240
			q=q>>4
			if (b1>$g[201]) {
				q=(se8(q)-se8($g[204]))&255
			} else {
				q=(se8(q)+se8($g[204]))&255
			}
			q=q<<4
			q=q&240
			$g[202]=q|p3
			$g[205]=2
		} else {
			$g[205]=1
			let lb = $g[202]&128
			$g[202]=($g[202]>>1)&255
			$g[202]=$g[202]|lb
			$g[201]=b1
		}
	}

	function expandFrame() {
	}

	function calcNewPC() {
		if (instrIsBranch($g[143].vIns)) {
			if ($g[193]==1) {
				$g[186]=$g[126]
				$g[189]=$g[132].value&127
				$g[190]=$g[86]
			} else {
				$g[186]=$g[123]
				$g[189]=($g[97].value+4)&127
				$g[193]=0
			}
		} else {
			if (isJorJAL($g[96].vIns)) {
				$g[186]=$g[126]
				$g[187]=$g[133]
				$g[189]=($g[97].value+$g[96].vRs2)&127
				$g[190]=$g[86]
			} else
			if (instrIsJumpR($g[96].vIns)) {
				$g[189]=($g[98][$g[96].vRs2].value)&127
				$g[190]=$g[88]
				$g[187]=$g[136]
			}
		}
	}

	function updBTB() {
		if ($g[189]!=$g[76].value) {
			$g[76].setNewValue($g[189])
			$g[185]=$g[190]
			if ($g[29]==BRANCH_PREDICTION) {
				if ($g[189]==$g[97].value+4) {
					if (btbIndex($g[97].value)>=0)
					$g[78][btbIndex($g[97].value)].setInvalid(1)
				} else {
					if (btbIndex($g[97].value)>=0)
					$g[26]=btbIndex($g[97].value)
					else 
					$g[26]=($g[26]) ? 0 : 1
					$g[78][$g[26]].setNewValue($g[97].value)
					$g[78][$g[26]].setInvalid(0)
					$g[78][$g[26]].useTag=0
					$g[79][$g[26]].setNewValue($g[189])
				}
			}
		}
	}

	function detectStall() {
		$g[25]=NO_STALL
		$g[27]=0
		if ($g[31]==ALU_INTERLOCK) {
			if (instrOpTypeRdt($g[143].vIns)==OP_TYPE_REG) {
				if ((instrOpTypeRs1($g[96].vIns)==OP_TYPE_REG) && ($g[96].vRs1==$g[143].vRdt))
				$g[25]=DATA_STALL
				if ((instrOpTypeRs2($g[96].vIns)==OP_TYPE_REG) && ($g[96].vRs2==$g[143].vRdt))
				$g[25]=DATA_STALL
			}
			if (instrOpTypeRdt($g[166].vIns)==OP_TYPE_REG) {
				if ((instrOpTypeRs1($g[96].vIns)==OP_TYPE_REG) && ($g[96].vRs1==$g[166].vRdt))
				$g[25]=DATA_STALL
				if ((instrOpTypeRs2($g[96].vIns)==OP_TYPE_REG) && ($g[96].vRs2==$g[166].vRdt))
				$g[25]=DATA_STALL
			}
		}
		if (($g[32]==STORE_INTERLOCK) && ($g[96].vIns==ST)) {
			if ((instrOpTypeRdt($g[143].vIns)==OP_TYPE_REG) && ($g[143].vRdt==$g[96].vRdt))
			$g[25]=DATA_STALL
			if ((instrOpTypeRdt($g[166].vIns)==OP_TYPE_REG) && ($g[166].vRdt==$g[96].vRdt))
			$g[25]=DATA_STALL
		}
		if (instrIsJumpR($g[96].vIns) && (instrIsBranch($g[143].vIns)==0)) {
			if ((instrOpTypeRdt($g[143].vIns)==OP_TYPE_REG) && ($g[143].vRdt==$g[96].vRs2))
			$g[25]=DATA_STALL
			if ((instrOpTypeRdt($g[166].vIns)==OP_TYPE_REG) && ($g[166].vRdt==$g[96].vRs2))
			$g[25]=DATA_STALL
		}
		if (($g[30]==LOAD_INTERLOCK) && ($g[143].vIns==LD)) {
			if ((instrOpTypeRs1($g[96].vIns)==OP_TYPE_REG) && ($g[96].vRs1==$g[143].vRdt))
			$g[25]=DATA_STALL
			if ((instrOpTypeRs2($g[96].vIns)==OP_TYPE_REG) && ($g[96].vRs2==$g[143].vRdt))
			$g[25]=DATA_STALL
		}
		if (instrIsMulti($g[143].vIns) && ($g[198]==1)) {
			$g[25]=DATA_STALL
		}
		if (instrIsBranch($g[143].vIns)) {
			if (instrIsJump($g[96].vIns) && ($g[193]==0) && ($g[25]==NO_STALL)) {
				$g[27]=1
				$g[25]=CTRL_STALL
			} else
			if (instrIsJump($g[96].vIns) && ($g[193]==1) && ($g[25]==NO_STALL)) {
				$g[25]=NO_STALL
				$g[194]=1
			} else
			if ((instrIsBranch($g[96].vIns)==0) && ($g[193]==1) && ($g[25]==NO_STALL)) {
				$g[27]=1
				$g[25]=CTRL_STALL
			} else {
				$g[25]=NO_STALL
				$g[194]=0
			}
		} else {
			if (($g[25]==NO_STALL) && ($g[29]!=DELAYED_BRANCHES) && instrIsJump($g[96].vIns) && ($g[189]!=$g[76].value)) {
				$g[27]=1
				$g[25]=CTRL_STALL
			}
		}
		if ($g[25]==DATA_STALL) {
			$g[75].setStall(1, 0)
		} else
		if ($g[25]==CTRL_STALL) {
			$g[75].setStall(1, 1)
		}
	}

	function setlocked() {
		let b_locked = $g[34] || $g[24]
		$g[63].showLocked(b_locked)
		$g[64].showLocked(b_locked)
		$g[65].showLocked(b_locked)
		$g[66].showLocked(b_locked)
		$g[67].showLocked(b_locked)
		$g[68].showLocked(b_locked)
	}

	function $eh12(down, flags, x, y) {
		if (down && (flags&MB_LEFT) && (!$g[34]) && (!$g[24])) {
			setPEMode(($g[28]+1)%2)
			resetCircuit()
		}
		return 0
	}

	function $eh13(down, flags, x, y) {
		if (down && (flags&MB_LEFT) && (!$g[34]) && (!$g[24])) {
			setBPMode(($g[29]+1)%3)
			resetCircuit()
		}
		return 0
	}

	function $eh14(down, flags, x, y) {
		if (down && (flags&MB_LEFT) && (!$g[34]) && (!$g[24])) {
			setLIMode(($g[30]+1)%2)
			resetCircuit()
		}
		return 0
	}

	function $eh15(down, flags, x, y) {
		if (down && (flags&MB_LEFT) && (!$g[34]) && (!$g[24])) {
			setAFMode(($g[31]+1)%3)
			resetCircuit()
		}
		return 0
	}

	function $eh16(down, flags, $2, $3) {
		if (down && (flags&MB_LEFT) && (!$g[34]) && (!$g[24])) {
			setSFMode(($g[32]+1)%3)
			resetCircuit()
		}
		return 0
	}

	function $eh17(down, flags, $2, $3) {
		if (down && (flags&MB_LEFT) && (!$g[34]) && (!$g[24])) {
			setZFMode(($g[33]+1)%3)
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
				instr=$g[74].instruction[lp1]
				opcode=(instr.vIns<<24)|(instr.vRdt<<16)|(instr.vRs1<<8)|(instr.vRs2)
				s=sprintf("%si%d='0x%08X' ", s, lp1, opcode)
			}
			for (lp1=0; lp1<4; lp1++) {
				reg=$g[98][lp1].value
				s=sprintf("%sr%d='0x%02X' ", s, lp1, reg)
			}
			for (lp1=0; lp1<4; lp1++) {
				reg=$g[169][lp1].value
				s=sprintf("%sm%d='0x%02X' ", s, lp1, reg)
			}
			s=sprintf("%speMode='%d' bpMode='%d' liMode='%d' afMode='%d' sfMode='%d' zfMode='%d'", s, $g[28], $g[29], $g[30], $g[31], $g[32], $g[33])
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
		$g[73].setBrush(enter ? $g[8] : $g[12])
		$g[73].setTxtPen(enter ? $g[3] : $g[1])
		return 0
	}

	function $eh22(down, flags, x, y) {
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
				$g[34] = 0
				$g[35] = 0
				$g[36] = 0
				$g[37] = newArray(38)
				$g[37][NOP]="NOP"
				$g[37][ADD]="ADD"
				$g[37][SUB]="SUB"
				$g[37][AND]="AND"
				$g[37][OR]="OR"
				$g[37][XOR]="XOR"
				$g[37][SLL]="SLL"
				$g[37][SRL]="SRL"
				$g[37][SLT]="SLT"
				$g[37][SGT]="SGT"
				$g[37][SLE]="SLE"
				$g[37][SGE]="SGE"
				$g[37][ADDi]="ADDi"
				$g[37][SUBi]="SUBi"
				$g[37][ANDi]="ANDi"
				$g[37][ORi]="ORi"
				$g[37][XORi]="XORi"
				$g[37][SLLi]="SLLi"
				$g[37][SRLi]="SRLi"
				$g[37][SLTi]="SLTi"
				$g[37][SGTi]="SGTi"
				$g[37][SLEi]="SLEi"
				$g[37][SGEi]="SGEi"
				$g[37][LD]="LD"
				$g[37][ST]="ST"
				$g[37][BEQ]="BEQ"
				$g[37][BNE]="BNE"
				$g[37][BLT]="BLT"
				$g[37][BGE]="BGE"
				$g[37][J]="J"
				$g[37][JAL]="JAL"
				$g[37][JR]="JR"
				$g[37][JALR]="JALR"
				$g[37][MUL]="MUL"
				$g[37][DIV]="DIV"
				$g[37][REM]="REM"
				$g[37][HALT]="HALT"
				$g[37][STALL]="STALL"
				$g[37][EMPTY]="EMPTY"
				$g[38] = new SolidBrush(BORDEAU)
				$g[39] = new SolidBrush(WHITE)
				$g[40] = new SolidPen(DOT, 1, rgba(0.75, 0.75, 0.75))
				$g[41] = new SolidPen(SOLID, 1, RED, ARROW60_END)
				$g[42] = new SolidBrush(PURPLE)
				$g[43] = new SolidBrush(WHITE)
				$g[44] = new SolidBrush(LIGHT_BLUE)
				$g[45] = new Font("Calibri", 9)
				$g[46] = new SolidBrush(WHITE)
				$g[47] = new SolidPen(SOLID, 1, RED, ROUND_START|ROUND_JOIN|ROUND_END)
				$g[48] = new SolidPen(SOLID, 1, GREEN, ROUND_START|ROUND_JOIN|ROUND_END)
				$g[49] = new SolidPen(SOLID, 1, ORANGE, ROUND_START|ROUND_JOIN|ROUND_END)
				$g[50] = new SolidBrush(WHITE)
				$g[51] = new SolidBrush(GRAY224)
				$g[52] = getArg("name", "")
				if (!($g[52]!="")) {
					$pc = 1
					continue
				}
				$g[52]=sprintf(":  %s", $g[52])
				$pc = 1
			case 1:
				$g[53] = new Font("Calibri", 20, SMALLCAPS|ITALIC)
				$g[54] = new Rectangle2($g[0], 0, HLEFT, 0, new SolidBrush(DARK_BLUE), 0, 10, 200, 30, $g[4], $g[53], sprintf(" RISC-V ANIMATION %s", $g[52]))
				$g[55] = new SolidPen(DASH, 1, DARK_BLUE, ROUND_START|ROUND_JOIN|ROUND_END)
				new Line2($g[0], 0, ABSOLUTE, $g[55], 110, 80, 740, 80)
				new Line2($g[0], 0, ABSOLUTE, $g[55], 110, 440, 740, 440)
				new Line2($g[0], 0, ABSOLUTE, $g[55], 110, 80, 110, 440)
				$g[56] = new Line2($g[0], 0, ABSOLUTE, $g[55], 240, 80, 240, 440)
				$g[57] = new Line2($g[0], 0, ABSOLUTE, $g[55], 390, 80, 390, 440)
				$g[58] = new Line2($g[0], 0, ABSOLUTE, $g[55], 590, 80, 590, 440)
				$g[59] = new Line2($g[0], 0, ABSOLUTE, $g[55], 690, 80, 690, 440)
				new Line2($g[0], 0, ABSOLUTE, $g[55], 740, 80, 740, 440)
				$g[60] = new SolidPen(DOT, THIN, BLACK)
				new Line2($g[0], 0, ABSOLUTE, $g[60], 10, 450, 700, 450)
				$g[61] = new Font("Calibri", 10, BOLD)
				$g[62] = new Button(20, 460, 80, 20, "Save Configuration", BUTTON_SP)
				$g[63] = new Button(120, 460, 80, 20, "Pipelining Enabled", BUTTON_PE)
				$g[64] = new Button(210, 460, 80, 20, "Branch Prediction", BUTTON_BP)
				$g[65] = new Button(300, 460, 80, 20, "Load Interlock", BUTTON_LI)
				$g[66] = new Button(390, 460, 80, 20, "ALU Forwarding", BUTTON_AF)
				$g[67] = new Button(480, 460, 80, 20, "Store Operand\nForwarding", BUTTON_SF)
				$g[68] = new Button(570, 460, 80, 20, "Zero Forwarding", BUTTON_ZF)
				$g[69] = new Image($g[0], 0, 0, 0, "vivio.png", 660, 460, 0, 0, LOGOW, LOGOH)
				new Txt($g[0], 0, HLEFT|VTOP, 0, 46, $g[2], $g[17], "instructions executed:")
				$g[70] = new Txt($g[0], 0, HLEFT|VTOP, 0, 56, $g[2], $g[17], "ticks:")
				$g[71] = new Txt($g[0], 0, HLEFT|VTOP, 80, 46, $g[3], $g[17], "0")
				$g[72] = new Txt($g[0], 0, HLEFT|VTOP, 80, 56, $g[3], $g[17], "0")
				$g[73] = new Rectangle2($g[0], 0, 0, 0, 0, 0, 68, 100, 10, 0, $g[17], "Instruction Cache")
				$g[74] = new InstructionMemory(0, 80, 100, 320)
				$g[75] = new AnimatedClock($g[0], 0, 410, 80, 30)
				$g[76] = new Register(200, 210, 20, 40, TOP, "PC")
				$g[77] = new Rectangle2($g[0], 0, 0, 0, 0, 150, 85, 80, 10, 0, $g[17], "Branch Target Buffer")
				$g[78] = newArray(2)
				$g[78][0]=new Register(150, 100, 40, 20, LEFT, "PC")
				$g[78][1]=new Register(150, 120, 40, 20, LEFT, "PC")
				$g[79] = newArray(2)
				$g[79][0]=new Register(190, 100, 40, 20, RIGHT, "PPC")
				$g[79][1]=new Register(190, 120, 40, 20, RIGHT, "PPC")
				$g[80] = new Component(200, 170, 30, 10, "mux 2")
				$g[81] = new Component(170, 205, 10, 50, "mux 1")
				$g[82] = new Component(160, 270, 20, 10, "+4")
				$g[83] = new AnimPipe()
				$g[83].addPoint(110, 390)
				$g[83].addPoint(250, 390)
				$g[84] = new Rectangle($g[0], $g[21], 0, 0, $g[11], 180, 390, -30, -6, 60, 12, $g[4], $g[17])
				$g[84].setRounded(2, 2)
				$g[85] = new AnimPipe()
				$g[85].addPoint(210, 250)
				$g[85].addPoint(210, 320)
				$g[85].addPoint(110, 320)
				$g[86] = new AnimPipe()
				$g[86].addPoint(300, 170)
				$g[86].addPoint(300, 160)
				$g[86].addPoint(150, 160)
				$g[86].addPoint(150, 215)
				$g[86].addPoint(170, 215)
				$g[87] = new AnimPipe()
				$g[87].addPoint(150, 120)
				$g[87].addPoint(140, 120)
				$g[87].addPoint(140, 225)
				$g[87].addPoint(170, 225)
				$g[88] = new AnimPipe()
				$g[88].addPoint(240, 50)
				$g[88].addPoint(130, 50)
				$g[88].addPoint(130, 235)
				$g[88].addPoint(170, 235)
				$g[89] = new AnimPipe()
				$g[89].addPoint(160, 275)
				$g[89].addPoint(120, 275)
				$g[89].addPoint(120, 245)
				$g[89].addPoint(170, 245)
				$g[90] = new AnimPipe()
				$g[90].addPoint(180, 230)
				$g[90].addPoint(200, 230)
				$g[91] = new AnimPipe()
				$g[91].addPoint(210, 210)
				$g[91].addPoint(210, 180)
				$g[92] = new AnimPipe()
				$g[92].addPoint(210, 250)
				$g[92].addPoint(210, 275)
				$g[92].addPoint(180, 275)
				$g[93] = new AnimPipe()
				$g[93].addPoint(220, 230)
				$g[93].addPoint(240, 230)
				$g[93].addPoint(240, 230)
				$g[94] = new AnimPipe()
				$g[94].addPoint(215, 170)
				$g[94].addPoint(215, 140)
				$g[95] = new AnimPipe()
				$g[95].addPoint(270, 390)
				$g[95].addPoint(390, 390)
				$g[96] = new InstructionRegister(250, 350, 20, 85, "ID")
				$g[97] = new Register(250, 210, 20, 40, TOP, "PC1")
				new Txt($g[0], 0, HLEFT|VTOP, 480, 40, 0, $g[17], "Register\nFile")
				$g[98] = newArray(NUM_REGS)
				$g[99] = 240
				$g[100] = 25
				$g[101] = TOP
				$g[181]=0
				$pc = 2
			case 2:
				if (!($g[181]<NUM_REGS)) {
					$pc = 5
					continue
				}
				if (!($g[181]==(NUM_REGS/2))) {
					$pc = 3
					continue
				}
				$g[101]=BOTTOM
				$g[99]=240
				$g[100]+=REG_HEIGHT
				$pc = 3
			case 3:
				$g[102] = "x"+$g[181].toString()
				$g[98][$g[181]]=new Register($g[99], $g[100], REG_WIDTH, REG_HEIGHT, $g[101], $g[102])
				$g[99]+=REG_WIDTH
				$pc = 4
			case 4:
				$g[181]++
				$pc = 2
				continue
			case 5:
				$g[103] = new Component(275, 170, 50, 10, "mux 3")
				$g[104] = new Component(270, 320, 30, 10, "ADD4")
				$g[105] = new Component(300, 320, 30, 10, "ADDi")
				$g[106] = new Component(250, 100, 10, 40, "mux 4")
				$g[107] = new Component(375, 220, 10, 30, "mux 5")
				new Rectangle2($g[0], 0, 0, 0, 0, 280, 365, 20, 10, 0, $g[17], "4")
				$g[108] = new SolidPen(SOLID, 0, PURPLE, ARROW60_END)
				$g[109] = new SolidPen(SOLID, 2, RED, ARROW60_END)
				$g[110] = new SolidPen(SOLID, MEDIUM, BLACK)
				$g[111] = new Line2($g[0], $g[19], ABSOLUTE, $g[110], 540, 100, 560, 100)
				$g[112] = new Txt($g[0], $g[19], HLEFT|VTOP, 542, 90, 0, $g[17], "zero")
				$g[113] = new Line2($g[0], $g[19], ABSOLUTE, $g[108], 550, 102, 550, 200)
				$g[114] = new Line2($g[0], $g[19], ABSOLUTE, $g[108], 550, 102, 550, 140, 405, 140, 405, 220, 420, 220)
				$g[115] = new Line2($g[0], $g[19], ABSOLUTE, $g[108], 570, 220, 580, 220, 580, 150, 385, 150, 385, 175, 325, 175)
				$g[116] = new AnimPipe()
				$g[116].addPoint(260, 210)
				$g[116].addPoint(260, 200)
				$g[116].addPoint(220, 200)
				$g[116].addPoint(220, 180)
				$g[117] = new AnimPipe()
				$g[117].addPoint(285, 320)
				$g[117].addPoint(285, 240)
				$g[117].addPoint(375, 240)
				$g[118] = new AnimPipe()
				$g[118].addPoint(260, 250)
				$g[118].addPoint(260, 345)
				$g[118].addPoint(290, 345)
				$g[118].addPoint(290, 330)
				$g[119] = new AnimPipe()
				$g[119].addPoint(260, 250)
				$g[119].addPoint(260, 345)
				$g[119].addPoint(310, 346)
				$g[119].addPoint(310, 330)
				$g[120] = new AnimPipe()
				$g[120].addPoint(290, 360)
				$g[120].addPoint(290, 330)
				$g[121] = new AnimPipe()
				$g[121].addPoint(270, 390)
				$g[121].addPoint(320, 390)
				$g[121].addPoint(320, 330)
				$g[122] = new Rectangle($g[0], $g[21], 0, 0, $g[11], 320, 376, -12, -6, 24, 12, $g[4], $g[17])
				$g[122].setRounded(2, 2)
				$g[123] = new AnimPipe()
				$g[123].addPoint(295, 320)
				$g[123].addPoint(295, 180)
				$g[124] = new Rectangle($g[0], $g[21], 0, 0, $g[11], 285, 200, -12, -6, 24, 12, $g[4], $g[17])
				$g[124].setRounded(2, 2)
				$g[125] = new AnimPipe()
				$g[125].addPoint(315, 320)
				$g[125].addPoint(315, 310)
				$g[126] = new AnimPipe()
				$g[126].addPoint(307, 300)
				$g[126].addPoint(307, 180)
				$g[127] = new Rectangle($g[0], $g[21], 0, 0, $g[11], 315, 200, -12, -6, 24, 12, $g[4], $g[17])
				$g[127].setRounded(2, 2)
				$g[128] = new AnimPipe()
				$g[128].addPoint(307, 300)
				$g[128].addPoint(307, 240)
				$g[128].addPoint(375, 240)
				$g[129] = new AnimPipe()
				$g[129].addPoint(315, 300)
				$g[129].addPoint(315, 280)
				$g[129].addPoint(345, 280)
				$g[130] = new AnimPipe()
				$g[130].addPoint(360, 270)
				$g[130].addPoint(360, 255)
				$g[130].addPoint(317, 255)
				$g[130].addPoint(317, 180)
				$g[131] = new Component(297, 300, 40, 10, "demux 1")
				$g[132] = new Register(345, 270, 30, 20, LEFT, "M")
				$g[132].rotateLabel(90)
				$g[133] = new AnimPipe()
				$g[133].addPoint(300, 170)
				$g[133].addPoint(300, 130)
				$g[133].addPoint(260, 130)
				$g[134] = new Rectangle($g[0], $g[21], 0, 0, $g[11], 300, 160, -12, -6, 24, 12, $g[4], $g[17])
				$g[134].setRounded(2, 2)
				$g[135] = new AnimPipe()
				$g[135].addPoint(250, 120)
				$g[135].addPoint(230, 120)
				$g[136] = new AnimPipe()
				$g[136].addPoint(240, 60)
				$g[136].addPoint(220, 60)
				$g[136].addPoint(220, 83)
				$g[136].addPoint(280, 83)
				$g[136].addPoint(280, 110)
				$g[136].addPoint(260, 110)
				$g[137] = new Rectangle($g[0], $g[21], 0, 0, $g[11], 300, 44, -12, 0, 24, 12, $g[4], $g[17])
				$g[138] = new AnimPipe()
				$g[138].addPoint(385, 240)
				$g[138].addPoint(420, 240)
				$g[139] = new AnimPipe()
				$g[139].addPoint(360, 75)
				$g[139].addPoint(360, 230)
				$g[139].addPoint(375, 230)
				$g[140] = new Rectangle($g[0], $g[21], 0, 0, $g[11], 340, 82, -12, 0, 24, 12, $g[4], $g[17], "R0:0")
				$g[140].setRounded(2, 2)
				$g[141] = new AnimPipe()
				$g[141].addPoint(375, 75)
				$g[141].addPoint(375, 210)
				$g[141].addPoint(420, 210)
				$g[142] = new Rectangle($g[0], $g[21], 0, 0, $g[11], 370, 82, -12, 0, 24, 12, $g[4], $g[17], "R0:0")
				$g[142].setRounded(2, 2)
				$g[143] = new InstructionRegister(390, 350, 20, 85, "EX")
				$g[144] = new Register(420, 190, 20, 40, TOP, "A")
				$g[145] = new Register(420, 230, 20, 40, BOTTOM, "B")
				$g[146] = new Component(500, 180, 10, 50, "mux 6")
				$g[147] = new Component(500, 230, 10, 50, "mux 7")
				$g[148] = new Component(500, 310, 10, 40, "mux 8")
				$g[149] = new ALU(530, 190, 40, 80)
				$g[150] = new AnimPipe()
				$g[150].addPoint(410, 390)
				$g[150].addPoint(610, 390)
				$g[151] = new AnimPipe()
				$g[151].addPoint(610, 210)
				$g[151].addPoint(610, 170)
				$g[151].addPoint(470, 170)
				$g[151].addPoint(470, 190)
				$g[151].addPoint(500, 190)
				$g[152] = new AnimPipe()
				$g[152].addPoint(710, 210)
				$g[152].addPoint(710, 160)
				$g[152].addPoint(460, 160)
				$g[152].addPoint(460, 200)
				$g[152].addPoint(500, 200)
				$g[153] = new AnimPipe()
				$g[153].addPoint(440, 220)
				$g[153].addPoint(500, 220)
				$g[154] = new AnimPipe()
				$g[154].addPoint(440, 240)
				$g[154].addPoint(500, 240)
				$g[155] = new AnimPipe()
				$g[155].addPoint(410, 390)
				$g[155].addPoint(450, 390)
				$g[155].addPoint(450, 250)
				$g[155].addPoint(500, 250)
				$g[156] = new Rectangle($g[0], $g[21], 0, 0, $g[11], 432, 370, -10, 0, 20, 12, $g[4], $g[17], "IMM")
				$g[156].setRounded(2, 2)
				$g[157] = new AnimPipe()
				$g[157].addPoint(710, 250)
				$g[157].addPoint(710, 300)
				$g[157].addPoint(460, 300)
				$g[157].addPoint(460, 260)
				$g[157].addPoint(500, 260)
				$g[158] = new AnimPipe()
				$g[158].addPoint(610, 250)
				$g[158].addPoint(610, 290)
				$g[158].addPoint(470, 290)
				$g[158].addPoint(470, 270)
				$g[158].addPoint(500, 270)
				$g[159] = new AnimPipe()
				$g[159].addPoint(610, 250)
				$g[159].addPoint(610, 290)
				$g[159].addPoint(470, 290)
				$g[159].addPoint(470, 320)
				$g[159].addPoint(500, 320)
				$g[160] = new AnimPipe()
				$g[160].addPoint(710, 250)
				$g[160].addPoint(710, 300)
				$g[160].addPoint(460, 300)
				$g[160].addPoint(460, 330)
				$g[160].addPoint(500, 330)
				$g[161] = new AnimPipe()
				$g[161].addPoint(435, 270)
				$g[161].addPoint(435, 340)
				$g[161].addPoint(500, 340)
				$g[162] = new AnimPipe()
				$g[162].addPoint(510, 330)
				$g[162].addPoint(600, 330)
				$g[163] = new AnimPipe()
				$g[163].addPoint(510, 205)
				$g[163].addPoint(530, 205)
				$g[164] = new AnimPipe()
				$g[164].addPoint(510, 255)
				$g[164].addPoint(530, 255)
				$g[165] = new AnimPipe()
				$g[165].addPoint(570, 240)
				$g[165].addPoint(600, 240)
				$g[166] = new InstructionRegister(610, 350, 20, 85, "MA")
				$g[167] = new Register(600, 210, 20, 40, TOP, "O0")
				$g[168] = new Register(600, 320, 40, 20, RIGHT, "SMR")
				new Txt($g[0], $g[19], HLEFT|VTOP, 633, 100, 0, $g[17], "memory\naddress")
				new Txt($g[0], $g[19], HLEFT|VTOP, 685, 320, 0, $g[17], "memory\ndata-in")
				new Txt($g[0], $g[19], HLEFT|VTOP, 695, 100, 0, $g[17], "memory\ndata-out")
				new Txt($g[0], 0, HLEFT|VTOP, 645, 35, 0, $g[17], "Data\nCache\n(memory)")
				$g[169] = newArray(4)
				$g[169][0]=new Register(560, 30, 40, 20, LEFT, "M0")
				$g[169][1]=new Register(560, 50, 40, 20, LEFT, "M1")
				$g[169][2]=new Register(600, 30, 40, 20, RIGHT, "M2")
				$g[169][3]=new Register(600, 50, 40, 20, RIGHT, "M3")
				$g[170] = new Stack(760, 60)
				$g[171] = new Component(670, 210, 10, 40, "mux 9")
				$g[172] = new AnimPipe()
				$g[172].addPoint(630, 390)
				$g[172].addPoint(700, 390)
				$g[173] = new AnimPipe()
				$g[173].addPoint(620, 230)
				$g[173].addPoint(670, 230)
				$g[174] = new AnimPipe()
				$g[174].addPoint(680, 230)
				$g[174].addPoint(700, 230)
				$g[175] = new AnimPipe()
				$g[175].addPoint(620, 230)
				$g[175].addPoint(630, 230)
				$g[175].addPoint(630, 110)
				$g[175].addPoint(760, 110)
				$g[176] = new AnimPipe()
				$g[176].addPoint(640, 330)
				$g[176].addPoint(760, 330)
				$g[177] = new AnimPipe()
				$g[177].addPoint(760, 90)
				$g[177].addPoint(650, 90)
				$g[177].addPoint(650, 220)
				$g[177].addPoint(670, 220)
				$g[178] = new InstructionRegister(700, 350, 20, 85, "WB")
				$g[179] = new Register(700, 210, 20, 40, TOP, "O1")
				$g[180] = new AnimPipe()
				$g[180].addPoint(720, 230)
				$g[180].addPoint(730, 230)
				$g[180].addPoint(730, 10)
				$g[180].addPoint(470, 10)
				$g[180].addPoint(470, 25)
				$g[149].txtResult.moveToFront()
				resetCircuit()
				$g[183] = ""
				$g[181]=0
				$pc = 6
			case 6:
				if (!($g[181]<32)) {
					$pc = 8
					continue
				}
				$g[74].setOpcode(4*$g[181], 0)
				$pc = 7
			case 7:
				$g[181]++
				$pc = 6
				continue
			case 8:
				$g[181]=0
				$pc = 9
			case 9:
				if (!($g[181]<4)) {
					$pc = 11
					continue
				}
				$g[183]=sprintf("r%d", $g[181])
				$g[98][$g[181]].setValue(getArgAsNum($g[183], 0))
				$pc = 10
			case 10:
				$g[181]++
				$pc = 9
				continue
			case 11:
				$g[181]=0
				$pc = 12
			case 12:
				if (!($g[181]<4)) {
					$pc = 14
					continue
				}
				$g[183]=sprintf("m%d", $g[181])
				$g[169][$g[181]].setValue(getArgAsNum($g[183], 0))
				$pc = 13
			case 13:
				$g[181]++
				$pc = 12
				continue
			case 14:
				setTPS(20)
				$g[16]=getArgAsNum("example", 0)
				if (!($g[16]==0)) {
					$pc = 18
					continue
				}
				$g[181]=0
				$pc = 15
			case 15:
				if (!($g[181]<32)) {
					$pc = 17
					continue
				}
				$g[183]=sprintf("i%d", $g[181])
				$g[74].setOpcode(4*$g[181], getArgAsNum($g[183], 0))
				$pc = 16
			case 16:
				$g[181]++
				$pc = 15
				continue
			case 17:
				$pc = 28
				continue
			case 18:
				if (!($g[16]==1)) {
					$pc = 19
					continue
				}
				$g[74].setValue(0, ADDi, 12, 0, 4)
				$g[74].setValue(4, ADDi, 13, 0, 5)
				$g[74].setValue(8, ST, 12, 2, 0)
				$g[74].setValue(12, SUBi, 2, 2, 4)
				$g[74].setValue(16, JAL, 1, 0, 16)
				$g[74].setValue(20, XOR, 0, 0, 0)
				$g[74].setValue(24, HALT, 0, 0, 0)
				$g[74].setValue(32, ST, 1, 2, 0)
				$g[74].setValue(36, ADD, 8, 0, 2)
				$g[74].setValue(40, SUBi, 2, 2, 4)
				$g[74].setValue(44, SUB, 10, 12, 13)
				$g[74].setValue(48, SUBi, 2, 2, 4)
				$g[74].setValue(52, SUBi, 2, 2, 4)
				$g[74].setValue(56, JAL, 1, 0, 24)
				$g[74].setValue(60, LD, 1, 8, 0)
				$g[74].setValue(64, ADDi, 2, 2, 12)
				$g[74].setValue(68, JALR, 0, 0, 1)
				$g[74].setValue(80, ST, 1, 2, 0)
				$g[74].setValue(84, ADD, 9, 0, 2)
				$g[74].setValue(88, SUBi, 2, 2, 4)
				$g[74].setValue(92, ST, 8, 2, 0)
				$g[74].setValue(96, SUBi, 2, 2, 4)
				$g[74].setValue(100, ADD, 8, 0, 9)
				$g[74].setValue(104, LD, 1, 8, 0)
				$g[74].setValue(108, LD, 8, 8, -4)
				$g[74].setValue(112, ADDi, 2, 2, 8)
				$g[74].setValue(116, JALR, 0, 0, 1)
				$pc = 27
				continue
			case 19:
				if (!($g[16]==2)) {
					$pc = 20
					continue
				}
				$g[74].setValue(0, ADDi, 2, 0, 4)
				$pc = 26
				continue
			case 20:
				if (!($g[16]==3)) {
					$pc = 21
					continue
				}
				$g[74].setValue(0, ADD, 1, 1, 2)
				$g[74].setValue(4, ADD, 2, 1, 2)
				$g[74].setValue(8, ADD, 1, 1, 2)
				$g[74].setValue(12, ADD, 2, 1, 2)
				$g[74].setValue(16, ADD, 1, 1, 2)
				$g[74].setValue(20, HALT, 0, 0, 0)
				$g[98][1].setValue(1)
				$g[98][2].setValue(2)
				setTPS(50)
				$pc = 25
				continue
			case 21:
				if (!($g[16]==4)) {
					$pc = 22
					continue
				}
				$g[74].setValue(0, ADDi, 1, 0, 13)
				$g[74].setValue(4, ADDi, 2, 0, 4)
				$g[74].setValue(8, DIV, 3, 1, 2)
				$pc = 24
				continue
			case 22:
				if (!($g[16]==5)) {
					$pc = 23
					continue
				}
				$g[74].setValue(0, ADDi, 1, 0, 3)
				$g[74].setValue(4, ADDi, 2, 0, 2)
				$g[74].setValue(8, MUL, 3, 1, 2)
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
				if (!($g[16]>0)) {
					$pc = 32
					continue
				}
				$g[181]=0
				$pc = 29
			case 29:
				if (!($g[181]<32)) {
					$pc = 31
					continue
				}
				$g[183]=sprintf("i%d", $g[181])
				setArg($g[183], $g[74].getOpcode($g[181]*4).toString())
				$pc = 30
			case 30:
				$g[181]++
				$pc = 29
				continue
			case 31:
				$g[16]=($g[16]>maxexample) ? 0 : $g[16]
				$pc = 32
			case 32:
				$g[184] = getArgAsNum("haltOnHalt", 1)
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
				$g[98][2].setValue(68)
				$g[170].setSP(68)
				$g[191] = 1
				$g[192] = 0
				$g[193] = 0
				$g[194] = 0
				$g[195] = 1
				$g[196] = CHECK
				$g[198] = 0
				$g[199] = 0
				$g[205] = 1
				$g[63].label.addEventHandler("eventMB", this, $eh12)
				$g[64].label.addEventHandler("eventMB", this, $eh13)
				$g[65].label.addEventHandler("eventMB", this, $eh14)
				$g[66].label.addEventHandler("eventMB", this, $eh15)
				$g[67].label.addEventHandler("eventMB", this, $eh16)
				$g[68].label.addEventHandler("eventMB", this, $eh17)
				$g[62].label.addEventHandler("eventMB", this, $eh18)
				$g[69].addEventHandler("eventMB", this, $eh19)
				$g[54].addEventHandler("eventMB", this, $eh20)
				$g[73].addEventHandler("eventEE", this, $eh21)
				$g[73].addEventHandler("eventMB", this, $eh22)
				callf(367, $obj)
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
				enterf(1);	// store
				$stack[$fp+1] = floor(($stack[$fp-3]/4))%MEMORY_ADDRESSES
				$obj.stack[$stack[$fp+1]].setNewValue($stack[$fp-4])
				callf(36, $obj.stack[$stack[$fp+1]])
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
				$obj.prev_clock.setPen($obj.stall ? ($obj.type ? $g[49] : $g[47]) : $g[48])
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
				if (!(($g[25]==NO_STALL) || ($g[25]==CTRL_STALL))) {
					$pc = 52
					continue
				}
				fork(36, $g[76])
				$g[74].setActive($g[76].newValue)
				$pc = 52
			case 52:
				if (wait(8))
				return
				$pc = 53
			case 53:
				if (!(($g[29]==BRANCH_PREDICTION) && (btbIndex($g[76].value)!=-1))) {
					$pc = 54
					continue
				}
				$g[26]=btbIndex($g[76].value)
				$g[76].setNewValue($g[79][$g[26]].value)
				$g[185]=$g[87]
				$pc = 55
				continue
			case 54:
				$g[76].setNewValue(($g[76].value+4)&127)
				$g[185]=$g[89]
				$pc = 55
			case 55:
				$g[97].setNewValue($g[76].value)
				$g[96].setNewInstruction($g[74].instruction[$g[76].value/4])
				if (wait(8))
				return
				$pc = 56
			case 56:
				fork(40, $g[93], 64)
				fork(40, $g[85], 24)
				fork(40, $g[92], 24)
				if (!(($g[29]==BRANCH_PREDICTION) && (instrIsJump($g[96].vIns)))) {
					$pc = 62
					continue
				}
				if (!($g[25]==CTRL_STALL)) {
					$pc = 58
					continue
				}
				callf(40, $g[91], 12)
				continue
			case 57:
				$pc = 60
				continue
			case 58:
				callf(40, $g[116], 12)
				continue
			case 59:
				$pc = 60
			case 60:
				callf(40, $g[94], 12)
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
				fork(40, $g[83], 40)
				if (!(($g[29]==BRANCH_PREDICTION) && (btbIndex($g[76].value)!=-1))) {
					$pc = 65
					continue
				}
				$g[78][btbIndex($g[76].value)].highlight($g[23])
				$g[79][btbIndex($g[76].value)].highlight($g[23])
				$pc = 65
			case 65:
				$g[84].setTxt($g[96].getNewInstrTxt())
				if ($g[84].setOpacity(1, 16, 1, 1))
				return
				$pc = 66
			case 66:
				callf(40, $g[185], 16)
				continue
			case 67:
				callf(40, $g[90], 8)
				continue
			case 68:
				returnf(0)
				continue
			case 69:
				enterf(0);	// sendBTBOperands
				callf(40, $g[187], 18)
				continue
			case 70:
				callf(40, $g[135], 6)
				continue
			case 71:
				returnf(0)
				continue
			case 72:
				enterf(1);	// idExec
				if (!($g[25]==NO_STALL)) {
					$pc = 73
					continue
				}
				fork(36, $g[97])
				fork(34, $g[96])
				$pc = 73
			case 73:
				if (!($g[194]==1)) {
					$pc = 74
					continue
				}
				$g[96].setNewValue(STALL, 0, 0, 0)
				$g[194]=0
				$pc = 74
			case 74:
				if (!($g[27] && ($g[29]==BRANCH_PREDICTION))) {
					$pc = 75
					continue
				}
				fork(36, $g[78][$g[26]])
				fork(36, $g[79][$g[26]])
				$pc = 75
			case 75:
				if (wait(16))
				return
				$pc = 76
			case 76:
				fork(40, $g[95], 64)
				if (!(instrIsBranch($g[96].vIns))) {
					$pc = 82
					continue
				}
				fork(40, $g[118], 16)
				fork(40, $g[120], 16)
				fork(40, $g[119], 16)
				fork(40, $g[121], 16)
				fork(40, $g[141], 16)
				fork(40, $g[139], 16)
				if (wait(12))
				return
				$pc = 77
			case 77:
				$g[122].setTxt("%02X", $g[96].vRs2)
				$g[122].setOpacity(1)
				if (wait(4))
				return
				$pc = 78
			case 78:
				fork(40, $g[123], 8)
				fork(40, $g[125], 8)
				if (wait(2))
				return
				$pc = 79
			case 79:
				fork(40, $g[129], 8)
				$g[98][$g[96].vRs1].highlight($g[23])
				$g[144].setNewValue($g[98][$g[96].vRs1].value)
				$g[98][$g[96].vRdt].highlight($g[23])
				$g[145].setNewValue($g[98][$g[96].vRdt].value)
				fork(40, $g[138], 5)
				if (wait(4))
				return
				$pc = 80
			case 80:
				$g[132].setNewValue($g[97].value+$g[96].vRs2)
				callf(36, $g[132])
				continue
			case 81:
				$pc = 97
				continue
			case 82:
				if (!(isJorJAL($g[96].vIns))) {
					$pc = 91
					continue
				}
				if (!($g[96].vIns==JAL)) {
					$pc = 83
					continue
				}
				fork(40, $g[118], 16)
				fork(40, $g[120], 16)
				$pc = 83
			case 83:
				if (!($g[25]==NO_STALL)) {
					$pc = 88
					continue
				}
				fork(40, $g[119], 16)
				fork(40, $g[121], 16)
				if (wait(12))
				return
				$pc = 84
			case 84:
				$g[122].setTxt("%02X", $g[96].vRs2)
				$g[122].setOpacity(1)
				if (wait(4))
				return
				$pc = 85
			case 85:
				fork(40, $g[125], 8)
				if (wait(2))
				return
				$pc = 86
			case 86:
				callf(40, $g[126], 8)
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
				if (!($g[96].vIns==JALR)) {
					$pc = 93
					continue
				}
				fork(40, $g[118], 32)
				fork(40, $g[120], 32)
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
				if (!(instrIsJump($g[96].vIns) || instrIsBranch($g[143].vIns))) {
					$pc = 99
					continue
				}
				calcNewPC()
				$pc = 99
			case 99:
				if (!(instrIsJumpR($g[96].vIns) && ($g[25]==NO_STALL))) {
					$pc = 100
					continue
				}
				$g[137].setTxt("%02X", $g[189])
				$g[137].setOpacity(1, 8, 1, 0)
				$pc = 100
			case 100:
				if (!(instrIsBranchOrJump($g[96].vIns))) {
					$pc = 101
					continue
				}
				fork(69, $obj)
				$pc = 101
			case 101:
				detectStall()
				$g[193]=0
				if (!((instrIsJump($g[96].vIns) || instrIsBranch($g[143].vIns)) && ($g[25]!=DATA_STALL))) {
					$pc = 102
					continue
				}
				updBTB()
				$pc = 102
			case 102:
				if (!($g[25]==NO_STALL)) {
					$pc = 103
					continue
				}
				$g[143].setNewValue($g[96].vIns, $g[96].vRdt, $g[96].vRs1, $g[96].vRs2)
				$pc = 105
				continue
			case 103:
				if (!($g[194]==0 && $g[198]==0)) {
					$pc = 104
					continue
				}
				$g[143].setNewValue(STALL, 0, 0, 0)
				$pc = 104
			case 104:
				$pc = 105
			case 105:
				if (wait(7))
				return
				$pc = 106
			case 106:
				if (!(instrIsBranch($g[96].vIns)==0)) {
					$pc = 123
					continue
				}
				if (!(instrOpTypeRdt($g[96].vIns)==OP_TYPE_REG)) {
					$pc = 122
					continue
				}
				if (!(instrIsJumpAndLink($g[96].vIns))) {
					$pc = 113
					continue
				}
				if (!($g[25]==NO_STALL)) {
					$pc = 109
					continue
				}
				$g[144].setNewValue(0)
				$g[145].setNewValue(($g[97].value+4)&127)
				callf(40, $g[117], 18)
				continue
			case 107:
				callf(40, $g[138], 6)
				continue
			case 108:
				$pc = 112
				continue
			case 109:
				$g[144].setNewValue(0)
				$g[145].setNewValue(($g[97].value+$g[96].vRs2)&127)
				callf(40, $g[128], 18)
				continue
			case 110:
				callf(40, $g[138], 6)
				continue
			case 111:
				$pc = 112
			case 112:
				$pc = 121
				continue
			case 113:
				$g[98][$g[96].vRs1].highlight($g[23])
				$g[144].setNewValue($g[98][$g[96].vRs1].value)
				if (!(instrOpTypeRs2($g[96].vIns)==OP_TYPE_REG)) {
					$pc = 114
					continue
				}
				$g[98][$g[96].vRs2].highlight($g[23])
				$g[145].setNewValue($g[98][$g[96].vRs2].value)
				$pc = 115
				continue
			case 114:
				$g[98][$g[96].vRdt].highlight($g[23])
				$g[145].setNewValue($g[98][$g[96].vRdt].value)
				$pc = 115
			case 115:
				$g[142].setTxt("R%d:%02X", $g[96].vRs1, $g[98][$g[96].vRs1].value)
				$g[142].setOpacity(1)
				fork(40, $g[141], 5)
				if (!(instrIsBranch($g[96].vIns))) {
					$pc = 117
					continue
				}
				fork(40, $g[139], 5)
				callf(40, $g[138], 5)
				continue
			case 116:
				$pc = 117
			case 117:
				if (!((!instrIsArRI($g[96].vIns)) && ($g[96].vIns!=LD))) {
					$pc = 120
					continue
				}
				$stack[$fp+1] = ($g[96].vIns==ST) ? $g[96].vRdt : $g[96].vRs2
				$g[140].setTxt("R%d:%02X", $stack[$fp+1], $g[98][$stack[$fp+1]].value)
				$g[140].setOpacity(1)
				callf(40, $g[139], 18)
				continue
			case 118:
				callf(40, $g[138], 6)
				continue
			case 119:
				$pc = 120
			case 120:
				$pc = 121
			case 121:
				$pc = 122
			case 122:
				$pc = 123
			case 123:
				returnf(0)
				continue
			case 124:
				enterf(7);	// exExec
				fork(34, $g[143])
				if (!(!instrIsNop($g[143].nIns))) {
					$pc = 125
					continue
				}
				fork(36, $g[144])
				fork(36, $g[145])
				$pc = 125
			case 125:
				if (wait(8))
				return
				$pc = 126
			case 126:
				$g[166].setNewValue($g[143].vIns, $g[143].vRdt, $g[143].vRs1, $g[143].vRs2)
				if (!(instrOpTypeRdt($g[143].vIns)==OP_TYPE_REG)) {
					$pc = 198
					continue
				}
				if (!(instrIsMulti($g[143].vIns))) {
					$pc = 136
					continue
				}
				if (!($g[143].vIns==MUL)) {
					$pc = 128
					continue
				}
				$g[198]=1
				if (!($g[195]==0)) {
					$pc = 127
					continue
				}
				$stack[$fp+1]=0
				$pc = 127
			case 127:
				$pc = 135
				continue
			case 128:
				if (!($g[195]==0)) {
					$pc = 134
					continue
				}
				if (!($g[196]==CHECK)) {
					$pc = 129
					continue
				}
				$stack[$fp+1]=$g[151]
				$stack[$fp+4]=$g[167].value
				$pc = 133
				continue
			case 129:
				if (!($g[196]==EXEC)) {
					$pc = 132
					continue
				}
				if (!($g[199]==0)) {
					$pc = 130
					continue
				}
				$stack[$fp+1]=$g[152]
				$stack[$fp+4]=$g[179].value
				$pc = 131
				continue
			case 130:
				$stack[$fp+1]=0
				$pc = 131
			case 131:
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
				if (!(instrIsJumpAndLink($g[143].vIns))) {
					$pc = 137
					continue
				}
				$stack[$fp+1]=0
				$stack[$fp+4]=0
				$pc = 146
				continue
			case 137:
				if (!($g[31]==ALU_FORWARDING)) {
					$pc = 143
					continue
				}
				if (!(!(instrIsMulti($g[143].vIns) && $g[195]==0))) {
					$pc = 142
					continue
				}
				if (!($g[167].tagMatches($g[143].vRs1))) {
					$pc = 138
					continue
				}
				$stack[$fp+1]=$g[151]
				$stack[$fp+4]=$g[167].value
				$pc = 141
				continue
			case 138:
				if (!($g[179].tagMatches($g[143].vRs1))) {
					$pc = 139
					continue
				}
				$stack[$fp+1]=$g[152]
				$stack[$fp+4]=$g[179].value
				$pc = 140
				continue
			case 139:
				$stack[$fp+1]=$g[153]
				$stack[$fp+4]=$g[144].value
				$pc = 140
			case 140:
				$pc = 141
			case 141:
				$pc = 142
			case 142:
				$pc = 145
				continue
			case 143:
				if (!(!(instrIsMulti($g[143].vIns) && $g[195]==0))) {
					$pc = 144
					continue
				}
				$stack[$fp+1]=$g[153]
				$stack[$fp+4]=$g[144].value
				$pc = 144
			case 144:
				$pc = 145
			case 145:
				$pc = 146
			case 146:
				if (!(instrIsJumpAndLink($g[143].vIns))) {
					$pc = 147
					continue
				}
				$stack[$fp+2]=$g[154]
				$stack[$fp+5]=$g[145].value
				$pc = 166
				continue
			case 147:
				if (!(instrOpTypeRs2($g[143].vIns)==OP_TYPE_IMM)) {
					$pc = 156
					continue
				}
				if (!(instrIsBranch($g[143].vIns))) {
					$pc = 154
					continue
				}
				if (!($g[31]==ALU_FORWARDING)) {
					$pc = 152
					continue
				}
				if (!($g[167].tagMatches($g[143].vRdt))) {
					$pc = 148
					continue
				}
				$stack[$fp+2]=$g[158]
				$stack[$fp+5]=$g[167].value
				$pc = 151
				continue
			case 148:
				if (!($g[179].tagMatches($g[143].vRdt))) {
					$pc = 149
					continue
				}
				$stack[$fp+2]=$g[157]
				$stack[$fp+5]=$g[179].value
				$pc = 150
				continue
			case 149:
				$stack[$fp+2]=$g[154]
				$stack[$fp+5]=$g[145].value
				$pc = 150
			case 150:
				$pc = 151
			case 151:
				$pc = 153
				continue
			case 152:
				$stack[$fp+2]=$g[154]
				$stack[$fp+5]=$g[145].value
				$pc = 153
			case 153:
				$pc = 155
				continue
			case 154:
				$stack[$fp+2]=$g[155]
				$stack[$fp+5]=$g[143].vRs2
				$pc = 155
			case 155:
				$pc = 165
				continue
			case 156:
				if (!($g[31]==ALU_FORWARDING)) {
					$pc = 162
					continue
				}
				if (!(!(instrIsMulti($g[143].vIns) && $g[195]==0))) {
					$pc = 161
					continue
				}
				if (!($g[167].tagMatches($g[143].vRs2))) {
					$pc = 157
					continue
				}
				$stack[$fp+2]=$g[158]
				$stack[$fp+5]=$g[167].value
				$pc = 160
				continue
			case 157:
				if (!($g[179].tagMatches($g[143].vRs2))) {
					$pc = 158
					continue
				}
				$stack[$fp+2]=$g[157]
				$stack[$fp+5]=$g[179].value
				$pc = 159
				continue
			case 158:
				$stack[$fp+2]=$g[154]
				$stack[$fp+5]=$g[145].value
				$pc = 159
			case 159:
				$pc = 160
			case 160:
				$pc = 161
			case 161:
				$pc = 164
				continue
			case 162:
				if (!(!(instrIsMulti($g[143].vIns) && $g[195]==0))) {
					$pc = 163
					continue
				}
				$stack[$fp+2]=$g[154]
				$stack[$fp+5]=$g[145].value
				$pc = 163
			case 163:
				$pc = 164
			case 164:
				$pc = 165
			case 165:
				$pc = 166
			case 166:
				$stack[$fp+6] = 0
				if (!(instrIsMulti($g[143].vIns))) {
					$pc = 185
					continue
				}
				if (!($g[143].vIns==MUL)) {
					$pc = 174
					continue
				}
				if (!($g[195]==1)) {
					$pc = 169
					continue
				}
				if (!(($stack[$fp+4]>15) || ($stack[$fp+5]>15))) {
					$pc = 167
					continue
				}
				$g[206]=0
				$pc = 168
				continue
			case 167:
				$g[206]=1
				$pc = 168
			case 168:
				$g[113].setPen($g[109])
				$g[202]=$stack[$fp+4]
				$g[203]=0
				$g[204]=$stack[$fp+5]
				calcNoCycles($stack[$fp+4])
				$g[195]=0
				$g[201]=0
				$stack[$fp+6]=$stack[$fp+4]
				$pc = 173
				continue
			case 169:
				if (!($g[206]==1)) {
					$pc = 170
					continue
				}
				booth()
				$stack[$fp+6]=$g[202]
				$pc = 171
				continue
			case 170:
				booth8()
				$stack[$fp+6]=$g[202]
				$pc = 171
			case 171:
				$g[200]--
				if (!($g[200]<=0)) {
					$pc = 172
					continue
				}
				$g[198]=0
				$pc = 172
			case 172:
				$pc = 173
			case 173:
				$pc = 184
				continue
			case 174:
				if (!($g[195]==1)) {
					$pc = 175
					continue
				}
				$g[113].setPen($g[109])
				$g[202]=0
				$g[204]=$stack[$fp+5]
				$stack[$fp+6]=$stack[$fp+4]
				$g[195]=0
				$g[198]=1
				$g[196]=CHECK
				$pc = 183
				continue
			case 175:
				if (!($g[199]==0)) {
					$pc = 180
					continue
				}
				if (!($g[196]==CHECK)) {
					$pc = 178
					continue
				}
				$stack[$fp+6]=instrExecute(SLT, $stack[$fp+4], $g[204])
				if (!($stack[$fp+6]==1)) {
					$pc = 177
					continue
				}
				$g[199]=1
				if (!($g[143].vIns==REM)) {
					$pc = 176
					continue
				}
				$g[198]=0
				$pc = 176
			case 176:
				$pc = 177
			case 177:
				$g[196]=EXEC
				$pc = 179
				continue
			case 178:
				$stack[$fp+6]=instrExecute(SUB, $stack[$fp+4], $g[204])
				$g[196]=CHECK
				$g[202]+=1
				$pc = 179
			case 179:
				$pc = 182
				continue
			case 180:
				if (!($g[143].vIns==DIV)) {
					$pc = 181
					continue
				}
				$stack[$fp+6]=$g[202]
				$pc = 181
			case 181:
				$g[198]=0
				$pc = 182
			case 182:
				$pc = 183
			case 183:
				$pc = 184
			case 184:
				$pc = 186
				continue
			case 185:
				$stack[$fp+6]=instrExecute($g[143].vIns, $stack[$fp+4], $stack[$fp+5])
				$pc = 186
			case 186:
				if (!(($g[143].vRdt==0)&(instrIsBranch($g[143].vIns)==0))) {
					$pc = 187
					continue
				}
				$stack[$fp+6]=0
				$pc = 187
			case 187:
				if (!(instrIsBranch($g[143].vIns)==0)) {
					$pc = 188
					continue
				}
				$g[167].setNewValue($stack[$fp+6])
				$g[193]=0
				$pc = 189
				continue
			case 188:
				$g[193]=$stack[$fp+6]
				$pc = 189
			case 189:
				if (!(instrIsLoadOrStore($g[143].vIns))) {
					$pc = 190
					continue
				}
				$g[167].setNewTag(-1)
				$pc = 197
				continue
			case 190:
				if (!(($g[143].vIns==DIV || $g[143].vIns==REM) && $g[195]==0)) {
					$pc = 195
					continue
				}
				if (!($g[196]==EXEC)) {
					$pc = 193
					continue
				}
				if (!($g[199]==0)) {
					$pc = 191
					continue
				}
				$g[167].setNewTag(0)
				$pc = 192
				continue
			case 191:
				$g[167].setNewTag($g[143].vRdt)
				$pc = 192
			case 192:
				$pc = 194
				continue
			case 193:
				$g[167].setNewTag($g[143].vRdt)
				$pc = 194
			case 194:
				$pc = 196
				continue
			case 195:
				$g[167].setNewTag($g[143].vRdt)
				$pc = 196
			case 196:
				$pc = 197
			case 197:
				$g[167].setInvalid(0)
				$pc = 200
				continue
			case 198:
				if (!($g[143].vIns==NOP)) {
					$pc = 199
					continue
				}
				$g[167].setInvalid(1)
				$g[167].updateLabel()
				$pc = 199
			case 199:
				$pc = 200
			case 200:
				if (!($g[143].vIns==ST)) {
					$pc = 207
					continue
				}
				if (!($g[32]==FORWARDING_TO_SMDR)) {
					$pc = 205
					continue
				}
				if (!($g[167].tagMatches($g[143].vRdt))) {
					$pc = 201
					continue
				}
				$stack[$fp+3]=$g[159]
				$g[168].setNewValue($g[167].value)
				$pc = 204
				continue
			case 201:
				if (!($g[179].tagMatches($g[143].vRdt))) {
					$pc = 202
					continue
				}
				$stack[$fp+3]=$g[160]
				$g[168].setNewValue($g[179].value)
				$pc = 203
				continue
			case 202:
				$stack[$fp+3]=$g[161]
				$g[168].setNewValue($g[145].value)
				$pc = 203
			case 203:
				$pc = 204
			case 204:
				$pc = 206
				continue
			case 205:
				$stack[$fp+3]=$g[161]
				$g[168].setNewValue($g[145].value)
				$pc = 206
			case 206:
				$pc = 207
			case 207:
				if (wait(8))
				return
				$pc = 208
			case 208:
				fork(40, $g[150], 64)
				if (!($g[143].vIns==ST)) {
					$pc = 209
					continue
				}
				fork(40, $stack[$fp+3], 24)
				$pc = 209
			case 209:
				if (!(instrOpTypeRdt($g[143].vIns)==OP_TYPE_REG)) {
					$pc = 212
					continue
				}
				if (!($stack[$fp+1]!=0)) {
					$pc = 210
					continue
				}
				fork(40, $stack[$fp+1], 24)
				$pc = 210
			case 210:
				if (!($stack[$fp+2]==$g[155])) {
					$pc = 211
					continue
				}
				$g[156].setTxt("%02X", $stack[$fp+5])
				$g[156].setOpacity(1)
				$pc = 211
			case 211:
				fork(40, $stack[$fp+2], 24)
				$pc = 212
			case 212:
				if (wait(24))
				return
				$pc = 213
			case 213:
				if (!($g[143].vIns==ST)) {
					$pc = 214
					continue
				}
				fork(40, $g[162], 40)
				$pc = 214
			case 214:
				if (!(instrOpTypeRdt($g[143].vIns)==OP_TYPE_REG)) {
					$pc = 230
					continue
				}
				if (!($g[143].vIns==MUL)) {
					$pc = 215
					continue
				}
				$g[149].txtOp.setTxt($g[200].toString())
				$g[149].txtOp.setOpacity(1)
				$pc = 216
				continue
			case 215:
				$g[149].setTxtOp($g[143].vIns)
				$pc = 216
			case 216:
				if (!($stack[$fp+1]!=0)) {
					$pc = 217
					continue
				}
				fork(40, $g[163], 10)
				$pc = 217
			case 217:
				if (!(instrIsMulti($g[143].vIns) && $g[195]==1)) {
					$pc = 219
					continue
				}
				if (!($g[143].vIns==MUL)) {
					$pc = 218
					continue
				}
				$g[195]=0
				$pc = 218
			case 218:
				$pc = 221
				continue
			case 219:
				if (!(!instrIsMulti($g[143].vIns))) {
					$pc = 220
					continue
				}
				fork(40, $g[164], 10)
				$pc = 220
			case 220:
				$pc = 221
			case 221:
				if (!(instrIsBranch($g[143].vIns))) {
					$pc = 224
					continue
				}
				if (wait(5))
				return
				$pc = 222
			case 222:
				if (!($g[193]==1)) {
					$pc = 223
					continue
				}
				$g[115].setPen($g[109])
				$pc = 223
			case 223:
				$pc = 229
				continue
			case 224:
				if (!((($g[143].vIns==DIV) || ($g[143].vIns==REM)) && ($g[195]==1))) {
					$pc = 225
					continue
				}
				$pc = 225
			case 225:
				if (wait(20))
				return
				$pc = 226
			case 226:
				callf(40, $g[165], 10)
				continue
			case 227:
				if (wait(10))
				return
				$pc = 228
			case 228:
				$g[149].txtResult.setTxt("%02X", $stack[$fp+6])
				$g[149].txtResult.setOpacity(1, 20, 1, 0)
				$pc = 229
			case 229:
				$pc = 230
			case 230:
				if (!($g[143].vIns==JAL)) {
					$pc = 231
					continue
				}
				$stack[$fp+7] = $g[170].spAddr
				$g[170].currFrame++
				$g[170].frames[$g[170].currFrame-1].setStart($stack[$fp+7])
				$g[170].setSP($stack[$fp+7])
				$pc = 231
			case 231:
				if (!($g[143].vIns==JALR)) {
					$pc = 232
					continue
				}
				$g[170].clearFrame()
				$pc = 232
			case 232:
				if (!((instrOpTypeRdt($g[143].vIns)==OP_TYPE_REG) && ($g[143].vIns!=ST) && ($g[143].vIns!=LD))) {
					$pc = 238
					continue
				}
				if (!(($g[143].vRdt==2 && $g[166].vRdt==8) && $g[166].vIns==LD)) {
					$pc = 233
					continue
				}
				$g[192]=1
				$pc = 237
				continue
			case 233:
				if (!($g[143].vRdt==2)) {
					$pc = 234
					continue
				}
				$g[170].setSP($stack[$fp+6])
				$pc = 236
				continue
			case 234:
				if (!($g[143].vRdt==8)) {
					$pc = 235
					continue
				}
				$g[170].setFP($stack[$fp+6])
				$pc = 235
			case 235:
				$pc = 236
			case 236:
				$pc = 237
			case 237:
				$pc = 238
			case 238:
				returnf(0)
				continue
			case 239:
				enterf(0);	// maExec
				fork(34, $g[166])
				if (!(instrOpTypeRdt($g[166].nIns)==OP_TYPE_REG)) {
					$pc = 240
					continue
				}
				fork(36, $g[167])
				$pc = 240
			case 240:
				if (!($g[166].nIns==ST)) {
					$pc = 241
					continue
				}
				fork(36, $g[168])
				$pc = 241
			case 241:
				if (wait(8))
				return
				$pc = 242
			case 242:
				$g[178].setNewValue($g[166].vIns, $g[166].vRdt, $g[166].vRs1, $g[166].vRs2)
				if (!((instrOpTypeRdt($g[166].vIns)==OP_TYPE_REG) && ($g[166].vIns!=ST))) {
					$pc = 245
					continue
				}
				if (!($g[166].vIns==LD)) {
					$pc = 243
					continue
				}
				$g[179].setNewValue($g[170].getVal($g[167].value))
				$g[179].setNewTag($g[166].vRdt)
				$pc = 244
				continue
			case 243:
				$g[179].setNewValue($g[167].value)
				$g[179].setNewTag($g[167].tag)
				$pc = 244
			case 244:
				$g[179].setInvalid(0)
				$pc = 245
			case 245:
				if (wait(8))
				return
				$pc = 246
			case 246:
				fork(40, $g[172], 64)
				if (!($g[166].vIns==ST)) {
					$pc = 249
					continue
				}
				fork(40, $g[176], 24)
				callf(40, $g[175], 24)
				continue
			case 247:
				callf(38, $g[170], $g[167].value, $g[168].value)
				continue
			case 248:
				$pc = 264
				continue
			case 249:
				if (!(instrOpTypeRdt($g[166].vIns)==OP_TYPE_REG)) {
					$pc = 263
					continue
				}
				if (!($g[166].vIns==LD)) {
					$pc = 255
					continue
				}
				callf(40, $g[175], 24)
				continue
			case 250:
				$g[170].highlight($g[167].value%MEMORY_ADDRESSES)
				callf(40, $g[177], 24)
				continue
			case 251:
				if (!($g[166].vRdt==8)) {
					$pc = 252
					continue
				}
				$g[170].setFP($g[170].getVal($g[167].value))
				$pc = 254
				continue
			case 252:
				if (!($g[166].vRdt==2)) {
					$pc = 253
					continue
				}
				$g[170].setSP($g[170].getVal($g[167].value))
				$pc = 253
			case 253:
				$pc = 254
			case 254:
				$pc = 261
				continue
			case 255:
				callf(40, $g[173], 48)
				continue
			case 256:
				if (!($g[192]==1)) {
					$pc = 260
					continue
				}
				if (!($g[166].vRdt==2)) {
					$pc = 257
					continue
				}
				$g[170].setSP($g[167].value)
				$pc = 259
				continue
			case 257:
				if (!($g[166].vRdt==8)) {
					$pc = 258
					continue
				}
				$g[170].setFP($g[167].value)
				$pc = 258
			case 258:
				$pc = 259
			case 259:
				$g[192]=0
				$pc = 260
			case 260:
				$pc = 261
			case 261:
				callf(40, $g[174], 16)
				continue
			case 262:
				$pc = 263
			case 263:
				$pc = 264
			case 264:
				returnf(0)
				continue
			case 265:
				enterf(0);	// wbExec
				fork(34, $g[178])
				if (!((instrOpTypeRdt($g[178].nIns)==OP_TYPE_REG) && ($g[178].nIns!=ST))) {
					$pc = 266
					continue
				}
				fork(36, $g[179])
				$pc = 266
			case 266:
				if (wait(8))
				return
				$pc = 267
			case 267:
				if (!((instrOpTypeRdt($g[178].vIns)==OP_TYPE_REG) && ($g[178].vIns!=ST))) {
					$pc = 273
					continue
				}
				if (!($g[179].tag!=0)) {
					$pc = 268
					continue
				}
				$g[98][$g[179].tag].setNewValue($g[179].value)
				$pc = 268
			case 268:
				if (wait(8))
				return
				$pc = 269
			case 269:
				callf(40, $g[180], 24)
				continue
			case 270:
				callf(36, $g[98][$g[179].tag])
				continue
			case 271:
				if (wait(19))
				return
				$pc = 272
			case 272:
				$pc = 275
				continue
			case 273:
				if (wait(67))
				return
				$pc = 274
			case 274:
				$pc = 275
			case 275:
				if (!($g[178].vIns!=STALL && $g[178].vIns!=EMPTY)) {
					$pc = 276
					continue
				}
				$g[35]++
				$g[71].setTxt("%4d", $g[35])
				$pc = 276
			case 276:
				$g[36]++
				$g[72].setTxt("%4d", $g[36])
				returnf(0)
				continue
			case 277:
				enterf(0);	// nonPipelinedBranch
				fork(40, $g[120], 24)
				fork(40, $g[121], 24)
				callf(40, $g[93], 12)
				continue
			case 278:
				fork(40, $g[118], 12)
				fork(40, $g[119], 12)
				if (wait(12))
				return
				$pc = 279
			case 279:
				if (!(instrIsBranch($g[143].vIns))) {
					$pc = 282
					continue
				}
				$g[76].setNewValue($g[132].value&127)
				callf(36, $g[76])
				continue
			case 280:
				callf(40, $g[86], 14)
				continue
			case 281:
				$pc = 292
				continue
			case 282:
				if (!(instrIsJumpR($g[96].vIns))) {
					$pc = 284
					continue
				}
				$g[76].setNewValue(($g[98][$g[96].vRs2].value)&127)
				callf(40, $g[88], 34)
				continue
			case 283:
				$pc = 291
				continue
			case 284:
				if (!(isJorJAL($g[96].vIns))) {
					$pc = 287
					continue
				}
				$g[76].setNewValue(($g[76].value+$g[96].vRs2)&127)
				callf(40, $g[125], 20)
				continue
			case 285:
				callf(40, $g[86], 14)
				continue
			case 286:
				$pc = 290
				continue
			case 287:
				$g[76].setNewValue(($g[76].value+4)&127)
				callf(40, $g[123], 20)
				continue
			case 288:
				callf(40, $g[86], 14)
				continue
			case 289:
				$pc = 290
			case 290:
				$pc = 291
			case 291:
				$pc = 292
			case 292:
				callf(40, $g[90], 6)
				continue
			case 293:
				returnf(0)
				continue
			case 294:
				enterf(5);	// execNonPipelined
				callf(36, $g[76])
				continue
			case 295:
				$g[74].setActive($g[76].newValue)
				callf(40, $g[85], 24)
				continue
			case 296:
				callf(40, $g[83], 40)
				continue
			case 297:
				$g[96].setNewInstruction($g[74].instruction[$g[76].value/4])
				$g[84].setTxt($g[96].getNewInstrTxt())
				$g[84].translate(60/2+70, 0, 20, 1, 0)
				callf(34, $g[96])
				continue
			case 298:
				if (!((instrOpTypeRs2($g[96].vIns)==OP_TYPE_IMM) && (instrOpTypeRdt($g[96].vIns)==OP_TYPE_REG))) {
					$pc = 299
					continue
				}
				fork(40, $g[95], 64)
				$pc = 299
			case 299:
				fork(277, $obj)
				if (wait(24))
				return
				$pc = 300
			case 300:
				if (!(instrIsJumpAndLink($g[96].vIns))) {
					$pc = 303
					continue
				}
				callf(40, $g[117], 20)
				continue
			case 301:
				callf(40, $g[138], 20)
				continue
			case 302:
				$stack[$fp+1]=0
				$stack[$fp+2]=($g[76].value+4)&127
				$pc = 315
				continue
			case 303:
				if (!(instrOpTypeRdt($g[96].vIns)==OP_TYPE_REG)) {
					$pc = 312
					continue
				}
				$stack[$fp+1]=$g[98][$g[96].vRs1].value
				$g[98][$g[96].vRs1].highlight($g[23])
				$g[142].setTxt("R%d:%02X", $g[96].vRs1, $g[98][$g[96].vRs1].value)
				$g[142].setOpacity(1)
				fork(40, $g[141], 40)
				if (!((instrOpTypeRs2($g[96].vIns)==OP_TYPE_REG) || ($g[96].vIns==ST))) {
					$pc = 309
					continue
				}
				if (!(instrOpTypeRs2($g[96].vIns)==OP_TYPE_IMM)) {
					$pc = 304
					continue
				}
				$stack[$fp+2]=$g[98][$g[96].vRdt].value
				$g[98][$g[96].vRdt].highlight($g[23])
				$pc = 305
				continue
			case 304:
				$stack[$fp+2]=$g[98][$g[96].vRs2].value
				$g[98][$g[96].vRs2].highlight($g[23])
				$pc = 305
			case 305:
				if (!((!instrIsArRI($g[96].vIns)) && ($g[96].vIns!=LD))) {
					$pc = 308
					continue
				}
				$stack[$fp+5] = ($g[96].vIns==ST) ? $g[96].vRdt : $g[96].vRs2
				$g[140].setTxt("R%d:%02X", $stack[$fp+5], $g[98][$stack[$fp+5]].value)
				$g[140].setOpacity(1)
				callf(40, $g[139], 20)
				continue
			case 306:
				callf(40, $g[138], 20)
				continue
			case 307:
				$pc = 308
			case 308:
				$pc = 311
				continue
			case 309:
				if (wait(40))
				return
				$pc = 310
			case 310:
				$pc = 311
			case 311:
				$pc = 314
				continue
			case 312:
				if (wait(40))
				return
				$pc = 313
			case 313:
				$pc = 314
			case 314:
				$pc = 315
			case 315:
				if (!(instrOpTypeRdt($g[96].vIns)==OP_TYPE_REG)) {
					$pc = 316
					continue
				}
				$g[149].setTxtOp($g[96].vIns)
				$pc = 316
			case 316:
				if (!($g[96].vIns==ST)) {
					$pc = 321
					continue
				}
				fork(40, $g[161], 40)
				fork(40, $g[153], 40)
				$g[156].setTxt("%02X", $g[96].vRs2)
				$g[156].setOpacity(1)
				callf(40, $g[155], 40)
				continue
			case 317:
				fork(40, $g[162], 40)
				fork(40, $g[164], 10)
				callf(40, $g[163], 10)
				continue
			case 318:
				if (wait(20))
				return
				$pc = 319
			case 319:
				callf(40, $g[165], 10)
				continue
			case 320:
				$stack[$fp+4]=$stack[$fp+2]
				$stack[$fp+3]=instrExecute($g[96].vIns, $stack[$fp+1], $g[96].vRs2)
				$pc = 341
				continue
			case 321:
				if (!(instrIsJumpAndLink($g[96].vIns))) {
					$pc = 326
					continue
				}
				callf(40, $g[154], 40)
				continue
			case 322:
				callf(40, $g[164], 10)
				continue
			case 323:
				$stack[$fp+3]=instrExecute($g[96].vIns, $stack[$fp+1], $stack[$fp+2])
				if (wait(20))
				return
				$pc = 324
			case 324:
				callf(40, $g[165], 10)
				continue
			case 325:
				$pc = 340
				continue
			case 326:
				if (!(instrOpTypeRdt($g[96].vIns)==OP_TYPE_REG)) {
					$pc = 337
					continue
				}
				fork(40, $g[153], 40)
				if (!(instrOpTypeRs2($g[96].vIns)==OP_TYPE_IMM)) {
					$pc = 328
					continue
				}
				$g[156].setTxt("%02X", $g[96].vRs2)
				$g[156].setOpacity(1)
				callf(40, $g[155], 40)
				continue
			case 327:
				$stack[$fp+3]=instrExecute($g[96].vIns, $stack[$fp+1], $g[96].vRs2)
				$pc = 330
				continue
			case 328:
				callf(40, $g[154], 40)
				continue
			case 329:
				$stack[$fp+3]=instrExecute($g[96].vIns, $stack[$fp+1], $stack[$fp+2])
				$pc = 330
			case 330:
				fork(40, $g[164], 10)
				callf(40, $g[163], 10)
				continue
			case 331:
				if (!(instrIsBranch($g[96].vIns))) {
					$pc = 333
					continue
				}
				if (wait(5))
				return
				$pc = 332
			case 332:
				$g[115].setPen($g[109])
				$pc = 336
				continue
			case 333:
				if (wait(20))
				return
				$pc = 334
			case 334:
				callf(40, $g[165], 10)
				continue
			case 335:
				$pc = 336
			case 336:
				$pc = 339
				continue
			case 337:
				if (wait(80))
				return
				$pc = 338
			case 338:
				$pc = 339
			case 339:
				$pc = 340
			case 340:
				$pc = 341
			case 341:
				if (!($g[96].vIns==LD)) {
					$pc = 345
					continue
				}
				callf(40, $g[175], 20)
				continue
			case 342:
				$g[169][($stack[$fp+3])%4].highlight($g[23])
				callf(40, $g[177], 20)
				continue
			case 343:
				callf(40, $g[174], 40)
				continue
			case 344:
				$stack[$fp+3]=$g[169][($stack[$fp+3])%4].value
				$pc = 355
				continue
			case 345:
				if (!($g[96].vIns==ST)) {
					$pc = 348
					continue
				}
				fork(40, $g[176], 20)
				callf(40, $g[175], 20)
				continue
			case 346:
				$g[169][($stack[$fp+3])%4].setNewValue($stack[$fp+4])
				callf(36, $g[169][($stack[$fp+3])%4])
				continue
			case 347:
				$pc = 354
				continue
			case 348:
				if (!(instrOpTypeRdt($g[96].vIns)==OP_TYPE_REG)) {
					$pc = 351
					continue
				}
				callf(40, $g[173], 40)
				continue
			case 349:
				callf(40, $g[174], 40)
				continue
			case 350:
				$pc = 353
				continue
			case 351:
				if (wait(80))
				return
				$pc = 352
			case 352:
				$pc = 353
			case 353:
				$pc = 354
			case 354:
				$pc = 355
			case 355:
				$g[98][0].unHighlight()
				$g[98][1].unHighlight()
				$g[98][2].unHighlight()
				$g[98][3].unHighlight()
				if (!((instrOpTypeRdt($g[96].vIns)==OP_TYPE_REG) && ($g[96].vIns!=ST))) {
					$pc = 359
					continue
				}
				callf(40, $g[180], 40)
				continue
			case 356:
				$g[98][$g[96].vRdt].setNewValue($stack[$fp+3])
				callf(36, $g[98][$g[96].vRdt])
				continue
			case 357:
				if (wait(19))
				return
				$pc = 358
			case 358:
				$pc = 361
				continue
			case 359:
				if (wait(75))
				return
				$pc = 360
			case 360:
				$pc = 361
			case 361:
				$g[36]+=5
				$g[35]++
				$g[71].setTxt("%4d", $g[35])
				$g[72].setTxt("%4d", $g[36])
				returnf(0)
				continue
			case 362:
				enterf(0);	// exec
				$g[98][0].unHighlight()
				$g[98][1].unHighlight()
				$g[98][2].unHighlight()
				$g[98][3].unHighlight()
				$g[169][0].unHighlight()
				$g[169][1].unHighlight()
				$g[169][2].unHighlight()
				$g[169][3].unHighlight()
				$g[78][0].unHighlight()
				$g[78][1].unHighlight()
				$g[79][0].unHighlight()
				$g[79][1].unHighlight()
				if (!($g[28]==PIPELINING_ENABLED)) {
					$pc = 363
					continue
				}
				fork(51, $obj)
				fork(72, $obj)
				fork(124, $obj)
				fork(239, $obj)
				fork(265, $obj)
				$pc = 364
				continue
			case 363:
				fork(294, $obj)
				$pc = 364
			case 364:
				if (wait(8))
				return
				$pc = 365
			case 365:
				resetWires()
				if (wait(($g[28]==PIPELINING_ENABLED) ? 72 : 392))
				return
				$pc = 366
			case 366:
				checkPoint()
				returnf(0)
				continue
			case 367:
				enterf(0);	// run
				if (wait(1))
				return
				$pc = 368
			case 368:
				$g[34]=1
				setlocked()
				$pc = 369
			case 369:
				if (!(1)) {
					$pc = 374
					continue
				}
				fork(46, $g[75], ($g[28]==PIPELINING_ENABLED) ? 80 : 400)
				callf(362, $obj)
				continue
			case 370:
				if (!((($g[178].vIns==HALT) && ($g[28]==PIPELINING_ENABLED)) || (($g[96].vIns==HALT) && ($g[28]==PIPELINING_DISABLED)))) {
					$pc = 372
					continue
				}
				stop()
				if (!($g[184])) {
					$pc = 371
					continue
				}
				$pc = 374
				continue
				$pc = 371
			case 371:
				$pc = 372
			case 372:
				if (wait(1))
				return
				$pc = 373
			case 373:
				$pc = 369
				continue
			case 374:
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
