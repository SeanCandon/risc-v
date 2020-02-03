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
	const MAX_INSTR = 35
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
	const BEQZ = 25
	const BNEZ = 26
	const BEQ = 27
	const BNE = 28
	const BLT = 29
	const BGE = 30
	const J = 31
	const JAL = 32
	const JR = 33
	const JALR = 34
	const HALT = 35
	const STALL = 36
	const EMPTY = 37
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

	function instrIsArRR(instr) {
		return (instr>=ADD && instr<=SGE) ? 1 : 0
	}

	function instrIsArRI(instr) {
		return ((instr>=ADDi) && (instr<=SGEi)) ? 1 : 0
	}

	function instrIsZeroBranch(instr) {
		return ((instr==BEQZ) || (instr==BNEZ)) ? 1 : 0
	}

	function instrIsNonZeroBranch(instr) {
		return ((instr>=BEQ) && (instr<=BGE)) ? 1 : 0
	}

	function instrIsBranch(instr) {
		return ((instrIsZeroBranch(instr)) || (instrIsNonZeroBranch(instr))) ? 1 : 0
	}

	function isJorJAL(instr) {
		return ((instr==J) || (instr==JAL)) ? 1 : 0
	}

	function instrIsJumpR(instr) {
		return ((instr==JR) || (instr==JALR)) ? 1 : 0
	}

	function instrIsBranchOrJump(instr) {
		return (instrIsZeroBranch(instr) || isJorJAL(instr) || instrIsJumpR(instr)) ? 1 : 0
	}

	function instrIsJumpAndLink(instr) {
		return ((instr==JAL) || (instr==JALR)) ? 1 : 0
	}

	function instrIsLoadOrStore(instr) {
		return ((instr==LD) || (instr==ST)) ? 1 : 0
	}

	function instrOpTypeRdt(instr) {
		if (instrIsArRR(instr) || instrIsArRI(instr) || instrIsJumpAndLink(instr) || instrIsLoadOrStore(instr) || instrIsNonZeroBranch(instr))
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
		if (instrIsZeroBranch(instr))
		return sprintf("%s x%d,%02X", $g[35][instr], rs1, rs2)
		else 
		if (instrIsNonZeroBranch(instr))
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
		return op1<op2 ? 1 : 0
		else 
		if (instr==BGE)
		return op1>=op2 ? 1 : 0
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
		this.w = 60
		this.h = 20
		this.length = MEMORY_ADDRESSES
		this.x = _x
		this.y = _y
		this.addr_size = 4
		this.maxdigits = 3
		this.off = 60
		this.outer_x = this.x-this.off/2
		this.outer_y = this.y-this.off/2
		this.outer_w = this.w+this.off+this.off/2
		this.outer_h = (this.h*this.length)+this.off
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
		$g[112].reset()
		$g[113].reset()
		$g[114].reset()
		$g[115].reset()
		$g[116].reset()
		$g[117].reset()
		$g[118].setOpacity(0)
		$g[119].reset()
		$g[120].setOpacity(0)
		$g[122].reset()
		$g[123].setOpacity(0)
		$g[124].reset()
		$g[121].reset()
		$g[128].reset()
		$g[129].setOpacity(0)
		$g[131].reset()
		$g[130].reset()
		$g[133].reset()
		$g[134].reset()
		$g[135].setOpacity(0)
		$g[136].reset()
		$g[137].setOpacity(0)
		$g[132].setOpacity(0)
		$g[145].reset()
		$g[146].reset()
		$g[147].reset()
		$g[148].reset()
		$g[149].reset()
		$g[150].reset()
		$g[151].setOpacity(0)
		$g[152].reset()
		$g[153].reset()
		$g[154].reset()
		$g[155].reset()
		$g[156].reset()
		$g[157].reset()
		$g[158].reset()
		$g[159].reset()
		$g[160].reset()
		$g[144].txtOp.setOpacity(0)
		$g[144].txtResult.setOpacity(0)
		$g[110].setPen($g[106])
		$g[167].reset()
		$g[168].reset()
		$g[169].reset()
		$g[170].reset()
		$g[171].reset()
		$g[172].reset()
		$g[175].reset()
	}

	function resetRegisters() {
		$g[74].reset()
		$g[74].setValue(124)
		$g[95].reset()
		$g[139].reset()
		$g[140].reset()
		$g[163].reset()
		$g[162].reset()
		$g[174].reset()
		$g[76][0].reset()
		$g[76][1].reset()
		$g[77][0].reset()
		$g[77][1].reset()
		$g[94].reset()
		$g[138].reset()
		$g[161].reset()
		$g[173].reset()
		$g[72].setActive(124)
		$g[162].setInvalid(1)
		$g[162].updateLabel()
		$g[174].setInvalid(1)
		$g[174].updateLabel()
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
		$g[112].setOpacity(opacity)
		$g[78].setOpacity(opacity)
		$g[92].setOpacity(opacity)
		$g[85].setOpacity(opacity)
		$g[128].setOpacity(opacity)
		$g[131].setOpacity(opacity)
		$g[104].setOpacity(opacity)
		$g[130].setOpacity(opacity)
	}

	function showALUForwarding(opacity) {
		if (opacity==0) {
			$g[148].setPoint(0, 390, 205)
			$g[148].setPoint(1, 451, 205)
			$g[149].setPoint(0, ($g[29]) ? 390 : 380, 250)
			$g[149].setPoint(1, 440, 250)
			$g[150].setPoint(2, 400, 260)
			$g[150].setPoint(3, 440, 260)
			$g[148].setHead(0)
		} else {
			$g[148].setPoint(0, 390, 220)
			$g[148].setPoint(1, 440, 220)
			$g[149].setPoint(0, 390, 240)
			$g[149].setPoint(1, 440, 240)
			$g[150].setPoint(2, 400, 250)
			$g[150].setPoint(3, 440, 250)
			$g[148].setHead(1)
		}
		$g[141].setOpacity(opacity)
		$g[146].setOpacity(opacity)
		$g[147].setOpacity(opacity)
		$g[153].setOpacity(opacity)
		$g[152].setOpacity(opacity)
	}

	function showSMDRForwarding(opacity) {
		if (opacity==0) {
			$g[156].setPoint(1, 380, 330)
			$g[156].setPoint(2, 450, 330)
			$g[156].setHead(0)
		} else {
			$g[156].setPoint(1, 380, 340)
			$g[156].setPoint(2, 440, 340)
			$g[156].setHead(1)
		}
		$g[143].setOpacity(opacity)
		$g[154].setOpacity(opacity)
		$g[155].setOpacity(opacity)
	}

	function showZeroForwarding(opacity) {
		if (opacity==0) {
		} else {
		}
	}

	function showPipeline(opacity) {
		if (opacity==0) {
			$g[91].setPoint(1, 230, 230)
			$g[91].setPoint(2, 230, 240)
			$g[114].setPoint(0, 230, 230)
			$g[115].setPoint(0, 230, 230)
			$g[93].setPoint(1, 360, 390)
			$g[136].setPoint(1, 340, 205)
			$g[136].setPoint(2, 390, 205)
			$g[133].setPoint(1, 390, 240)
			$g[156].setPoint(0, 380, 250)
			$g[160].setPoint(3, 580, 230)
			$g[157].setPoint(1, 560, 330)
			$g[169].setPoint(1, 680, 230)
			$g[93].setHead(0)
			$g[91].setHead(0)
			$g[136].setHead(0)
			$g[148].setHead(0)
			$g[133].setHead(0)
			$g[156].setHead(0)
			$g[157].setHead(0)
			$g[158].setHead(0)
			$g[159].setHead(0)
			$g[160].setHead(0)
			$g[169].setHead(0)
			showBTB(opacity)
			showALUForwarding(opacity)
			showSMDRForwarding(opacity)
			showZeroForwarding(opacity)
		} else {
			$g[91].setPoint(1, 210, 230)
			$g[91].setPoint(2, 220, 230)
			$g[114].setPoint(0, 230, 250)
			$g[115].setPoint(0, 230, 250)
			$g[93].setPoint(1, 370, 390)
			$g[136].setPoint(1, 340, 210)
			$g[136].setPoint(2, 370, 210)
			$g[133].setPoint(1, 370, 240)
			$g[156].setPoint(0, 380, 270)
			$g[160].setPoint(3, 560, 230)
			$g[157].setPoint(1, 550, 330)
			$g[169].setPoint(1, 660, 230)
			$g[93].setHead(1)
			$g[91].setHead(1)
			$g[136].setHead(1)
			$g[148].setHead(1)
			$g[133].setHead(1)
			$g[156].setHead(1)
			$g[157].setHead(1)
			$g[158].setHead(1)
			$g[159].setHead(1)
			$g[160].setHead(1)
			$g[169].setHead(1)
			showBTB($g[27]==BRANCH_PREDICTION ? 1 : 0)
			showALUForwarding($g[29]==ALU_FORWARDING ? 1 : 0)
			showSMDRForwarding($g[30]==FORWARDING_TO_SMDR ? 1 : 0)
			showZeroForwarding($g[31]==ZERO_FORWARDING ? 1 : 0)
		}
		$g[90].setOpacity(opacity)
		$g[80].setOpacity(opacity)
		$g[87].setOpacity(opacity)
		$g[95].setOpacity(opacity)
		$g[138].setOpacity(opacity)
		$g[161].setOpacity(opacity)
		$g[173].setOpacity(opacity)
		$g[145].setOpacity(opacity)
		$g[167].setOpacity(opacity)
		$g[139].setOpacity(opacity)
		$g[140].setOpacity(opacity)
		$g[162].setOpacity(opacity)
		$g[174].setOpacity(opacity)
		$g[163].setOpacity(opacity)
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
		if (instrIsNonZeroBranch($g[138].vIns)) {
			$g[181]=$g[122]
			$g[184]=$g[127].value&127
			$g[185]=$g[84]
		} else {
			if (instrIsZeroBranch($g[94].vIns)) {
				let pen = $g[107]
				if ($g[31]==ZERO_FORWARDING) {
					if (($g[138].vRdt==$g[94].vRs1) && (instrOpTypeRdt($g[138].vIns)==OP_TYPE_REG) && instrIsLoadOrStore($g[138].vIns)==0) {
						$g[183]=$g[162].newValue
					} else
					if ($g[162].tagMatches($g[94].vRs1)) {
						$g[183]=$g[162].value
					} else {
						$g[180]=$g[84]
						$g[183]=$g[96][$g[94].vRs1].value
						$g[137].setTxt("R%d:%02X", $g[94].vRs1, $g[183])
						$g[137].setOpacity(1)
						fork(40, $g[136], 24)
					}
				} else {
					$g[183]=$g[96][$g[94].vRs1].value
				}
				if (($g[94].vIns==BEQZ)==($g[183]==0)) {
					$g[181]=$g[121]
					$g[184]=($g[95].value+$g[94].vRs2)&127
				} else {
					$g[181]=$g[119]
					$g[184]=($g[95].value+4)&127
				}
				$g[185]=$g[84]
				$g[182]=$g[128]
			} else
			if (isJorJAL($g[94].vIns)) {
				$g[181]=$g[121]
				$g[182]=$g[128]
				$g[184]=($g[95].value+$g[94].vRs2)&127
				$g[185]=$g[84]
			} else
			if (instrIsJumpR($g[94].vIns)) {
				$g[184]=($g[96][$g[94].vRs2].value)&127
				$g[185]=$g[86]
				$g[182]=$g[131]
			}
		}
	}

	function updBTB() {
		if ($g[184]!=$g[74].value) {
			$g[74].setNewValue($g[184])
			$g[180]=$g[185]
			if ($g[27]==BRANCH_PREDICTION) {
				if ($g[184]==$g[95].value+4) {
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
					$g[77][$g[24]].setNewValue($g[184])
				}
			}
		}
	}

	function detectStall() {
		$g[23]=NO_STALL
		$g[25]=0
		if ($g[29]==ALU_INTERLOCK) {
			if (instrOpTypeRdt($g[138].vIns)==OP_TYPE_REG) {
				if ((instrOpTypeRs1($g[94].vIns)==OP_TYPE_REG) && ($g[94].vRs1==$g[138].vRdt))
				$g[23]=DATA_STALL
				if ((instrOpTypeRs2($g[94].vIns)==OP_TYPE_REG) && ($g[94].vRs2==$g[138].vRdt))
				$g[23]=DATA_STALL
			}
			if (instrOpTypeRdt($g[161].vIns)==OP_TYPE_REG) {
				if ((instrOpTypeRs1($g[94].vIns)==OP_TYPE_REG) && ($g[94].vRs1==$g[161].vRdt))
				$g[23]=DATA_STALL
				if ((instrOpTypeRs2($g[94].vIns)==OP_TYPE_REG) && ($g[94].vRs2==$g[161].vRdt))
				$g[23]=DATA_STALL
			}
		}
		if (($g[30]==STORE_INTERLOCK) && ($g[94].vIns==ST)) {
			if ((instrOpTypeRdt($g[138].vIns)==OP_TYPE_REG) && ($g[138].vRdt==$g[94].vRdt))
			$g[23]=DATA_STALL
			if ((instrOpTypeRdt($g[161].vIns)==OP_TYPE_REG) && ($g[161].vRdt==$g[94].vRdt))
			$g[23]=DATA_STALL
		}
		if (($g[31]==ZERO_INTERLOCK) && instrIsZeroBranch($g[94].vIns)) {
			if ((instrOpTypeRdt($g[138].vIns)==OP_TYPE_REG) && ($g[138].vRdt==$g[94].vRs1))
			$g[23]=DATA_STALL
			if ((instrOpTypeRdt($g[161].vIns)==OP_TYPE_REG) && ($g[161].vRdt==$g[94].vRs1))
			$g[23]=DATA_STALL
		}
		if (instrIsJumpR($g[94].vIns)) {
			if ((instrOpTypeRdt($g[138].vIns)==OP_TYPE_REG) && ($g[138].vRdt==$g[94].vRs2))
			$g[23]=DATA_STALL
			if ((instrOpTypeRdt($g[161].vIns)==OP_TYPE_REG) && ($g[161].vRdt==$g[94].vRs2))
			$g[23]=DATA_STALL
		}
		if (($g[28]==LOAD_INTERLOCK) && ($g[138].vIns==LD)) {
			if ((instrOpTypeRs1($g[94].vIns)==OP_TYPE_REG) && ($g[94].vRs1==$g[138].vRdt))
			$g[23]=DATA_STALL
			if ((instrOpTypeRs2($g[94].vIns)==OP_TYPE_REG) && ($g[94].vRs2==$g[138].vRdt))
			$g[23]=DATA_STALL
		}
		if (($g[23]==NO_STALL) && ($g[27]!=DELAYED_BRANCHES) && instrIsBranchOrJump($g[94].vIns) && ($g[184]!=$g[74].value)) {
			$g[25]=1
			$g[23]=CTRL_STALL
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
				reg=$g[164][lp1].value
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
				$g[35] = newArray(37)
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
				$g[35][BEQZ]="BEQZ"
				$g[35][BNEZ]="BNEZ"
				$g[35][BEQ]="BEQ"
				$g[35][BNE]="BNE"
				$g[35][BLT]="BLT"
				$g[35][BGE]="BGE"
				$g[35][J]="J"
				$g[35][JAL]="JAL"
				$g[35][JR]="JR"
				$g[35][JALR]="JALR"
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
				$g[52] = new Rectangle2($g[0], 0, HLEFT, 0, new SolidBrush(DARK_BLUE), -50, 10, 200, 30, $g[4], $g[51], sprintf(" RISC-V ANIMATION %s", $g[50]))
				$g[53] = new SolidPen(DASH, 1, DARK_BLUE, ROUND_START|ROUND_JOIN|ROUND_END)
				new Line2($g[0], 0, ABSOLUTE, $g[53], 80, 80, 700, 80)
				new Line2($g[0], 0, ABSOLUTE, $g[53], 80, 440, 700, 440)
				new Line2($g[0], 0, ABSOLUTE, $g[53], 80, 80, 80, 440)
				$g[54] = new Line2($g[0], 0, ABSOLUTE, $g[53], 210, 80, 210, 440)
				$g[55] = new Line2($g[0], 0, ABSOLUTE, $g[53], 360, 80, 360, 440)
				$g[56] = new Line2($g[0], 0, ABSOLUTE, $g[53], 540, 80, 540, 440)
				$g[57] = new Line2($g[0], 0, ABSOLUTE, $g[53], 650, 80, 650, 440)
				new Line2($g[0], 0, ABSOLUTE, $g[53], 700, 80, 700, 440)
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
				new Txt($g[0], 0, HLEFT|VTOP, -50, 46, $g[2], $g[15], "instructions executed:")
				$g[68] = new Txt($g[0], 0, HLEFT|VTOP, -50, 56, $g[2], $g[15], "ticks:")
				$g[69] = new Txt($g[0], 0, HLEFT|VTOP, 40, 46, $g[3], $g[15], "0")
				$g[70] = new Txt($g[0], 0, HLEFT|VTOP, 40, 56, $g[3], $g[15], "0")
				$g[71] = new Rectangle2($g[0], 0, 0, 0, 0, -50, 68, 100, 10, 0, $g[15], "Instruction Cache")
				$g[72] = new InstructionMemory(-50, 80, 100, 320)
				$g[73] = new AnimatedClock($g[0], -40, 410, 80, 30)
				$g[74] = new Register(170, 210, 20, 40, TOP, "PC")
				$g[75] = new Rectangle2($g[0], 0, 0, 0, 0, 120, 85, 80, 10, 0, $g[15], "Branch Target Buffer")
				$g[76] = newArray(2)
				$g[76][0]=new Register(120, 100, 40, 20, LEFT, "PC")
				$g[76][1]=new Register(120, 120, 40, 20, LEFT, "PC")
				$g[77] = newArray(2)
				$g[77][0]=new Register(160, 100, 40, 20, RIGHT, "PPC")
				$g[77][1]=new Register(160, 120, 40, 20, RIGHT, "PPC")
				$g[78] = new Component(170, 170, 30, 10, "mux 2")
				$g[79] = new Component(140, 205, 10, 50, "mux 1")
				$g[80] = new Component(130, 270, 20, 10, "+4")
				$g[81] = new AnimPipe()
				$g[81].addPoint(80, 390)
				$g[81].addPoint(220, 390)
				$g[82] = new Rectangle($g[0], $g[19], 0, 0, $g[11], 180, 390, -30, -6, 60, 12, $g[4], $g[15])
				$g[82].setRounded(2, 2)
				$g[83] = new AnimPipe()
				$g[83].addPoint(180, 250)
				$g[83].addPoint(180, 320)
				$g[83].addPoint(80, 320)
				$g[84] = new AnimPipe()
				$g[84].addPoint(270, 170)
				$g[84].addPoint(270, 160)
				$g[84].addPoint(120, 160)
				$g[84].addPoint(120, 215)
				$g[84].addPoint(140, 215)
				$g[85] = new AnimPipe()
				$g[85].addPoint(120, 120)
				$g[85].addPoint(110, 120)
				$g[85].addPoint(110, 225)
				$g[85].addPoint(140, 225)
				$g[86] = new AnimPipe()
				$g[86].addPoint(230, 50)
				$g[86].addPoint(100, 50)
				$g[86].addPoint(100, 235)
				$g[86].addPoint(140, 235)
				$g[87] = new AnimPipe()
				$g[87].addPoint(130, 275)
				$g[87].addPoint(90, 275)
				$g[87].addPoint(90, 245)
				$g[87].addPoint(140, 245)
				$g[88] = new AnimPipe()
				$g[88].addPoint(150, 230)
				$g[88].addPoint(170, 230)
				$g[89] = new AnimPipe()
				$g[89].addPoint(180, 210)
				$g[89].addPoint(180, 180)
				$g[90] = new AnimPipe()
				$g[90].addPoint(180, 250)
				$g[90].addPoint(180, 275)
				$g[90].addPoint(150, 275)
				$g[91] = new AnimPipe()
				$g[91].addPoint(190, 230)
				$g[91].addPoint(210, 230)
				$g[91].addPoint(220, 230)
				$g[92] = new AnimPipe()
				$g[92].addPoint(185, 170)
				$g[92].addPoint(185, 140)
				$g[93] = new AnimPipe()
				$g[93].addPoint(240, 390)
				$g[93].addPoint(370, 390)
				$g[94] = new InstructionRegister(220, 350, 20, 85, "ID")
				$g[95] = new Register(220, 210, 20, 40, TOP, "PC1")
				new Txt($g[0], 0, HLEFT|VTOP, 400, 40, 0, $g[15], "Register\nFile")
				$g[96] = newArray(NUM_REGS)
				$g[97] = 230
				$g[98] = 25
				$g[99] = TOP
				$g[176]=0
				$pc = 2
			case 2:
				if (!($g[176]<NUM_REGS)) {
					$pc = 5
					continue
				}
				if (!($g[176]==(NUM_REGS/2))) {
					$pc = 3
					continue
				}
				$g[99]=BOTTOM
				$g[97]=230
				$g[98]+=REG_HEIGHT
				$pc = 3
			case 3:
				$g[100] = "x"+$g[176].toString()
				$g[96][$g[176]]=new Register($g[97], $g[98], REG_WIDTH, REG_HEIGHT, $g[99], $g[100])
				$g[97]+=REG_WIDTH
				$pc = 4
			case 4:
				$g[176]++
				$pc = 2
				continue
			case 5:
				$g[101] = new Component(245, 170, 50, 10, "mux 3")
				$g[102] = new Component(240, 320, 30, 10, "ADD4")
				$g[103] = new Component(270, 320, 30, 10, "ADDi")
				$g[104] = new Component(220, 100, 10, 40, "mux 4")
				$g[105] = new Component(340, 220, 10, 30, "mux 5")
				new Rectangle2($g[0], 0, 0, 0, 0, 250, 365, 20, 10, 0, $g[15], "4")
				$g[106] = new SolidPen(SOLID, 0, PURPLE, ARROW60_END)
				$g[107] = new SolidPen(SOLID, 2, RED, ARROW60_END)
				$g[108] = new SolidPen(SOLID, MEDIUM, BLACK)
				$g[109] = new Line2($g[0], $g[17], ABSOLUTE, $g[106], 320, 390, 320, 305, 308, 305)
				$g[110] = new Line2($g[0], $g[17], ABSOLUTE, $g[106], 490, 390, 490, 260)
				$g[111] = new Line2($g[0], $g[17], ABSOLUTE, $g[106], 510, 220, 530, 220, 530, 150, 325, 150, 325, 175, 295, 175)
				$g[112] = new AnimPipe()
				$g[112].addPoint(230, 210)
				$g[112].addPoint(230, 200)
				$g[112].addPoint(190, 200)
				$g[112].addPoint(190, 180)
				$g[113] = new AnimPipe()
				$g[113].addPoint(255, 320)
				$g[113].addPoint(255, 240)
				$g[113].addPoint(340, 240)
				$g[114] = new AnimPipe()
				$g[114].addPoint(230, 250)
				$g[114].addPoint(230, 345)
				$g[114].addPoint(250, 345)
				$g[114].addPoint(250, 330)
				$g[115] = new AnimPipe()
				$g[115].addPoint(230, 250)
				$g[115].addPoint(230, 345)
				$g[115].addPoint(280, 346)
				$g[115].addPoint(280, 330)
				$g[116] = new AnimPipe()
				$g[116].addPoint(260, 360)
				$g[116].addPoint(260, 330)
				$g[117] = new AnimPipe()
				$g[117].addPoint(240, 390)
				$g[117].addPoint(290, 390)
				$g[117].addPoint(290, 330)
				$g[118] = new Rectangle($g[0], $g[19], 0, 0, $g[11], 320, 376, -12, -6, 24, 12, $g[4], $g[15])
				$g[118].setRounded(2, 2)
				$g[119] = new AnimPipe()
				$g[119].addPoint(255, 320)
				$g[119].addPoint(255, 180)
				$g[120] = new Rectangle($g[0], $g[19], 0, 0, $g[11], 285, 200, -12, -6, 24, 12, $g[4], $g[15])
				$g[120].setRounded(2, 2)
				$g[121] = new AnimPipe()
				$g[121].addPoint(285, 320)
				$g[121].addPoint(285, 310)
				$g[122] = new AnimPipe()
				$g[122].addPoint(277, 300)
				$g[122].addPoint(277, 180)
				$g[123] = new Rectangle($g[0], $g[19], 0, 0, $g[11], 315, 200, -12, -6, 24, 12, $g[4], $g[15])
				$g[123].setRounded(2, 2)
				$g[124] = new AnimPipe()
				$g[124].addPoint(295, 300)
				$g[124].addPoint(295, 280)
				$g[124].addPoint(315, 280)
				$g[125] = new AnimPipe()
				$g[125].addPoint(330, 270)
				$g[125].addPoint(330, 255)
				$g[125].addPoint(287, 255)
				$g[125].addPoint(287, 180)
				$g[126] = new Component(267, 300, 40, 10, "demux 1")
				$g[127] = new Register(315, 270, 30, 20, LEFT, "M")
				$g[127].rotateLabel(90)
				$g[128] = new AnimPipe()
				$g[128].addPoint(270, 170)
				$g[128].addPoint(270, 130)
				$g[128].addPoint(230, 130)
				$g[129] = new Rectangle($g[0], $g[19], 0, 0, $g[11], 300, 160, -12, -6, 24, 12, $g[4], $g[15])
				$g[129].setRounded(2, 2)
				$g[130] = new AnimPipe()
				$g[130].addPoint(220, 120)
				$g[130].addPoint(200, 120)
				$g[131] = new AnimPipe()
				$g[131].addPoint(230, 60)
				$g[131].addPoint(190, 60)
				$g[131].addPoint(190, 80)
				$g[131].addPoint(270, 80)
				$g[131].addPoint(270, 110)
				$g[131].addPoint(230, 110)
				$g[132] = new Rectangle($g[0], $g[19], 0, 0, $g[11], 300, 44, -12, 0, 24, 12, $g[4], $g[15])
				$g[133] = new AnimPipe()
				$g[133].addPoint(350, 240)
				$g[133].addPoint(370, 240)
				$g[134] = new AnimPipe()
				$g[134].addPoint(310, 75)
				$g[134].addPoint(310, 230)
				$g[134].addPoint(340, 230)
				$g[135] = new Rectangle($g[0], $g[19], 0, 0, $g[11], 340, 82, -12, 0, 24, 12, $g[4], $g[15], "R0:0")
				$g[135].setRounded(2, 2)
				$g[136] = new AnimPipe()
				$g[136].addPoint(340, 75)
				$g[136].addPoint(340, 210)
				$g[136].addPoint(370, 210)
				$g[137] = new Rectangle($g[0], $g[19], 0, 0, $g[11], 370, 82, -12, 0, 24, 12, $g[4], $g[15], "R0:0")
				$g[137].setRounded(2, 2)
				$g[138] = new InstructionRegister(370, 350, 20, 85, "EX")
				$g[139] = new Register(370, 190, 20, 40, TOP, "A")
				$g[140] = new Register(370, 230, 20, 40, BOTTOM, "B")
				$g[141] = new Component(440, 180, 10, 50, "mux 6")
				$g[142] = new Component(440, 230, 10, 50, "mux 7")
				$g[143] = new Component(440, 310, 10, 40, "mux 8")
				$g[144] = new ALU(470, 190, 40, 80)
				$g[145] = new AnimPipe()
				$g[145].addPoint(390, 390)
				$g[145].addPoint(560, 390)
				$g[146] = new AnimPipe()
				$g[146].addPoint(570, 210)
				$g[146].addPoint(570, 170)
				$g[146].addPoint(420, 170)
				$g[146].addPoint(420, 190)
				$g[146].addPoint(440, 190)
				$g[147] = new AnimPipe()
				$g[147].addPoint(670, 210)
				$g[147].addPoint(670, 160)
				$g[147].addPoint(410, 160)
				$g[147].addPoint(410, 200)
				$g[147].addPoint(440, 200)
				$g[148] = new AnimPipe()
				$g[148].addPoint(390, 220)
				$g[148].addPoint(440, 220)
				$g[149] = new AnimPipe()
				$g[149].addPoint(390, 240)
				$g[149].addPoint(440, 240)
				$g[150] = new AnimPipe()
				$g[150].addPoint(390, 390)
				$g[150].addPoint(400, 390)
				$g[150].addPoint(400, 250)
				$g[150].addPoint(440, 250)
				$g[151] = new Rectangle($g[0], $g[19], 0, 0, $g[11], 432, 370, -10, 0, 20, 12, $g[4], $g[15], "IMM")
				$g[151].setRounded(2, 2)
				$g[152] = new AnimPipe()
				$g[152].addPoint(670, 250)
				$g[152].addPoint(670, 300)
				$g[152].addPoint(410, 300)
				$g[152].addPoint(410, 260)
				$g[152].addPoint(440, 260)
				$g[153] = new AnimPipe()
				$g[153].addPoint(570, 250)
				$g[153].addPoint(570, 290)
				$g[153].addPoint(420, 290)
				$g[153].addPoint(420, 270)
				$g[153].addPoint(440, 270)
				$g[154] = new AnimPipe()
				$g[154].addPoint(570, 250)
				$g[154].addPoint(570, 290)
				$g[154].addPoint(420, 290)
				$g[154].addPoint(420, 320)
				$g[154].addPoint(440, 320)
				$g[155] = new AnimPipe()
				$g[155].addPoint(670, 250)
				$g[155].addPoint(670, 300)
				$g[155].addPoint(410, 300)
				$g[155].addPoint(410, 330)
				$g[155].addPoint(440, 330)
				$g[156] = new AnimPipe()
				$g[156].addPoint(380, 270)
				$g[156].addPoint(380, 340)
				$g[156].addPoint(440, 340)
				$g[157] = new AnimPipe()
				$g[157].addPoint(450, 330)
				$g[157].addPoint(550, 330)
				$g[158] = new AnimPipe()
				$g[158].addPoint(450, 205)
				$g[158].addPoint(470, 205)
				$g[159] = new AnimPipe()
				$g[159].addPoint(450, 255)
				$g[159].addPoint(470, 255)
				$g[160] = new AnimPipe()
				$g[160].addPoint(510, 240)
				$g[160].addPoint(560, 240)
				$g[161] = new InstructionRegister(560, 350, 20, 85, "MA")
				$g[162] = new Register(560, 210, 20, 40, TOP, "O0")
				$g[163] = new Register(550, 320, 40, 20, RIGHT, "SMR")
				new Txt($g[0], $g[17], HLEFT|VTOP, 553, 100, 0, $g[15], "memory\naddress")
				new Txt($g[0], $g[17], HLEFT|VTOP, 605, 320, 0, $g[15], "memory\ndata-in")
				new Txt($g[0], $g[17], HLEFT|VTOP, 615, 100, 0, $g[15], "memory\ndata-out")
				new Txt($g[0], 0, HLEFT|VTOP, 645, 35, 0, $g[15], "Data\nCache\n(memory)")
				$g[164] = newArray(4)
				$g[164][0]=new Register(560, 30, 40, 20, LEFT, "M0")
				$g[164][1]=new Register(560, 50, 40, 20, LEFT, "M1")
				$g[164][2]=new Register(600, 30, 40, 20, RIGHT, "M2")
				$g[164][3]=new Register(600, 50, 40, 20, RIGHT, "M3")
				$g[165] = new Stack(750, 80)
				$g[165].createFrame(2, 1)
				$g[166] = new Component(630, 210, 10, 40, "mux 9")
				$g[167] = new AnimPipe()
				$g[167].addPoint(580, 390)
				$g[167].addPoint(660, 390)
				$g[168] = new AnimPipe()
				$g[168].addPoint(580, 230)
				$g[168].addPoint(630, 230)
				$g[169] = new AnimPipe()
				$g[169].addPoint(640, 230)
				$g[169].addPoint(660, 230)
				$g[170] = new AnimPipe()
				$g[170].addPoint(580, 230)
				$g[170].addPoint(590, 230)
				$g[170].addPoint(590, 110)
				$g[170].addPoint(720, 110)
				$g[171] = new AnimPipe()
				$g[171].addPoint(590, 330)
				$g[171].addPoint(720, 330)
				$g[172] = new AnimPipe()
				$g[172].addPoint(720, 90)
				$g[172].addPoint(610, 90)
				$g[172].addPoint(610, 220)
				$g[172].addPoint(630, 220)
				$g[173] = new InstructionRegister(660, 350, 20, 85, "WB")
				$g[174] = new Register(660, 210, 20, 40, TOP, "O1")
				$g[175] = new AnimPipe()
				$g[175].addPoint(680, 230)
				$g[175].addPoint(690, 230)
				$g[175].addPoint(690, 10)
				$g[175].addPoint(390, 10)
				$g[175].addPoint(390, 25)
				$g[144].txtResult.moveToFront()
				resetCircuit()
				$g[178] = ""
				$g[176]=0
				$pc = 6
			case 6:
				if (!($g[176]<32)) {
					$pc = 8
					continue
				}
				$g[72].setOpcode(4*$g[176], 0)
				$pc = 7
			case 7:
				$g[176]++
				$pc = 6
				continue
			case 8:
				$g[176]=0
				$pc = 9
			case 9:
				if (!($g[176]<4)) {
					$pc = 11
					continue
				}
				$g[178]=sprintf("r%d", $g[176])
				$g[96][$g[176]].setValue(getArgAsNum($g[178], 0))
				$pc = 10
			case 10:
				$g[176]++
				$pc = 9
				continue
			case 11:
				$g[176]=0
				$pc = 12
			case 12:
				if (!($g[176]<4)) {
					$pc = 14
					continue
				}
				$g[178]=sprintf("m%d", $g[176])
				$g[164][$g[176]].setValue(getArgAsNum($g[178], 0))
				$pc = 13
			case 13:
				$g[176]++
				$pc = 12
				continue
			case 14:
				setTPS(20)
				$g[14]=getArgAsNum("example", 0)
				if (!($g[14]==0)) {
					$pc = 18
					continue
				}
				$g[176]=0
				$pc = 15
			case 15:
				if (!($g[176]<32)) {
					$pc = 17
					continue
				}
				$g[178]=sprintf("i%d", $g[176])
				$g[72].setOpcode(4*$g[176], getArgAsNum($g[178], 0))
				$pc = 16
			case 16:
				$g[176]++
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
				$g[72].setValue(4, BEQZ, 0, 2, 36)
				$g[72].setValue(8, ST, 2, 0, 0)
				$g[72].setValue(12, ANDi, 2, 2, 1)
				$g[72].setValue(16, BEQZ, 0, 2, 8)
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
				$g[72].setValue(0, ADDi, 1, 0, 3)
				$g[72].setValue(4, ADD, 0, 0, 0)
				$g[72].setValue(8, ADD, 0, 0, 0)
				$g[72].setValue(12, SUBi, 1, 1, 1)
				$g[72].setValue(16, BNEZ, 0, 1, -12&255)
				$g[72].setValue(20, HALT, 0, 0, 0)
				setTPS(50)
				$pc = 24
				continue
			case 22:
				if (!($g[14]==5)) {
					$pc = 23
					continue
				}
				$g[72].setValue(0, JR, 0, 0, 1)
				$g[72].setValue(32, ADD, 1, 1, 1)
				$g[72].setValue(36, HALT, 0, 0, 0)
				$g[96][1].setValue(32)
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
				$g[176]=0
				$pc = 29
			case 29:
				if (!($g[176]<32)) {
					$pc = 31
					continue
				}
				$g[178]=sprintf("i%d", $g[176])
				setArg($g[178], $g[72].getOpcode($g[176]*4).toString())
				$pc = 30
			case 30:
				$g[176]++
				$pc = 29
				continue
			case 31:
				$g[14]=($g[14]>maxexample) ? 0 : $g[14]
				$pc = 32
			case 32:
				$g[179] = getArgAsNum("haltOnHalt", 1)
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
				callf(296, $obj)
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
				$g[180]=$g[85]
				$pc = 55
				continue
			case 54:
				$g[74].setNewValue(($g[74].value+4)&127)
				$g[180]=$g[87]
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
				if (!(($g[27]==BRANCH_PREDICTION) && (instrIsBranchOrJump($g[94].vIns)))) {
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
				callf(40, $g[112], 12)
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
				callf(40, $g[180], 16)
				continue
			case 67:
				callf(40, $g[88], 8)
				continue
			case 68:
				returnf(0)
				continue
			case 69:
				enterf(0);	// sendBTBOperands
				callf(40, $g[182], 18)
				continue
			case 70:
				callf(40, $g[130], 6)
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
				if (!($g[25] && ($g[27]==BRANCH_PREDICTION))) {
					$pc = 74
					continue
				}
				fork(36, $g[76][$g[24]])
				fork(36, $g[77][$g[24]])
				$pc = 74
			case 74:
				if (wait(16))
				return
				$pc = 75
			case 75:
				fork(40, $g[93], 64)
				if (!(instrIsBranch($g[94].vIns))) {
					$pc = 82
					continue
				}
				fork(40, $g[114], 16)
				fork(40, $g[116], 16)
				fork(40, $g[115], 16)
				fork(40, $g[117], 16)
				fork(40, $g[136], 16)
				fork(40, $g[134], 16)
				if (wait(12))
				return
				$pc = 76
			case 76:
				$g[118].setTxt("%02X", $g[94].vRs2)
				$g[118].setOpacity(1)
				if (wait(4))
				return
				$pc = 77
			case 77:
				fork(40, $g[119], 8)
				fork(40, $g[121], 8)
				if (wait(4))
				return
				$pc = 78
			case 78:
				if (!(instrIsNonZeroBranch($g[94].vIns))) {
					$pc = 81
					continue
				}
				fork(40, $g[124], 8)
				$g[96][$g[94].vRs1].highlight($g[21])
				$g[139].setNewValue($g[96][$g[94].vRs1].value)
				$g[96][$g[94].vRdt].highlight($g[21])
				$g[140].setNewValue($g[96][$g[94].vRdt].value)
				fork(40, $g[133], 5)
				if (wait(4))
				return
				$pc = 79
			case 79:
				$g[127].setNewValue($g[95].value+$g[94].vRs2)
				callf(36, $g[127])
				continue
			case 80:
				$pc = 81
			case 81:
				$pc = 95
				continue
			case 82:
				if (!(isJorJAL($g[94].vIns))) {
					$pc = 89
					continue
				}
				if (!($g[94].vIns==JAL)) {
					$pc = 83
					continue
				}
				fork(40, $g[114], 16)
				fork(40, $g[116], 16)
				$pc = 83
			case 83:
				if (!($g[23]==NO_STALL)) {
					$pc = 86
					continue
				}
				fork(40, $g[115], 16)
				fork(40, $g[117], 16)
				if (wait(12))
				return
				$pc = 84
			case 84:
				$g[118].setTxt("%02X", $g[94].vRs2)
				$g[118].setOpacity(1)
				if (wait(4))
				return
				$pc = 85
			case 85:
				fork(40, $g[121], 8)
				$pc = 88
				continue
			case 86:
				if (wait(24))
				return
				$pc = 87
			case 87:
				$pc = 88
			case 88:
				$pc = 94
				continue
			case 89:
				if (!($g[94].vIns==JALR)) {
					$pc = 91
					continue
				}
				fork(40, $g[114], 32)
				fork(40, $g[116], 32)
				if (wait(24))
				return
				$pc = 90
			case 90:
				$pc = 93
				continue
			case 91:
				if (wait(24))
				return
				$pc = 92
			case 92:
				$pc = 93
			case 93:
				$pc = 94
			case 94:
				$pc = 95
			case 95:
				if (wait(9))
				return
				$pc = 96
			case 96:
				if (!(instrIsBranchOrJump($g[94].vIns) || instrIsNonZeroBranch($g[138].vIns))) {
					$pc = 97
					continue
				}
				calcNewPC()
				$pc = 97
			case 97:
				if (!(instrIsZeroBranch($g[94].vIns))) {
					$pc = 98
					continue
				}
				$pc = 98
			case 98:
				if (!(instrIsJumpR($g[94].vIns) && ($g[23]==NO_STALL))) {
					$pc = 99
					continue
				}
				$g[132].setTxt("%02X", $g[184])
				$g[132].setOpacity(1, 8, 1, 0)
				$pc = 99
			case 99:
				if (!(instrIsBranchOrJump($g[94].vIns))) {
					$pc = 100
					continue
				}
				fork(69, $obj)
				$pc = 100
			case 100:
				detectStall()
				if (!((instrIsBranchOrJump($g[94].vIns) || instrIsNonZeroBranch($g[138].vIns)) && ($g[23]!=DATA_STALL))) {
					$pc = 101
					continue
				}
				updBTB()
				$pc = 101
			case 101:
				if (!($g[23]==NO_STALL)) {
					$pc = 102
					continue
				}
				$g[138].setNewValue($g[94].vIns, $g[94].vRdt, $g[94].vRs1, $g[94].vRs2)
				$pc = 103
				continue
			case 102:
				$g[138].setNewValue(STALL, 0, 0, 0)
				$pc = 103
			case 103:
				if (wait(7))
				return
				$pc = 104
			case 104:
				if (!(instrIsNonZeroBranch($g[94].vIns)==0)) {
					$pc = 117
					continue
				}
				if (!(instrOpTypeRdt($g[94].vIns)==OP_TYPE_REG)) {
					$pc = 116
					continue
				}
				if (!(instrIsJumpAndLink($g[94].vIns))) {
					$pc = 107
					continue
				}
				$g[139].setNewValue(0)
				$g[140].setNewValue(($g[95].value+4)&127)
				callf(40, $g[113], 18)
				continue
			case 105:
				callf(40, $g[133], 6)
				continue
			case 106:
				$pc = 115
				continue
			case 107:
				$g[96][$g[94].vRs1].highlight($g[21])
				$g[139].setNewValue($g[96][$g[94].vRs1].value)
				if (!(instrOpTypeRs2($g[94].vIns)==OP_TYPE_REG)) {
					$pc = 108
					continue
				}
				$g[96][$g[94].vRs2].highlight($g[21])
				$g[140].setNewValue($g[96][$g[94].vRs2].value)
				$pc = 109
				continue
			case 108:
				$g[96][$g[94].vRdt].highlight($g[21])
				$g[140].setNewValue($g[96][$g[94].vRdt].value)
				$pc = 109
			case 109:
				$g[137].setTxt("R%d:%02X", $g[94].vRs1, $g[96][$g[94].vRs1].value)
				$g[137].setOpacity(1)
				fork(40, $g[136], 5)
				if (!(instrIsNonZeroBranch($g[94].vIns))) {
					$pc = 111
					continue
				}
				fork(40, $g[134], 5)
				callf(40, $g[133], 5)
				continue
			case 110:
				$pc = 111
			case 111:
				if (!((!instrIsArRI($g[94].vIns)) && ($g[94].vIns!=LD))) {
					$pc = 114
					continue
				}
				$stack[$fp+1] = ($g[94].vIns==ST) ? $g[94].vRdt : $g[94].vRs2
				$g[135].setTxt("R%d:%02X", $stack[$fp+1], $g[96][$stack[$fp+1]].value)
				$g[135].setOpacity(1)
				callf(40, $g[134], 18)
				continue
			case 112:
				callf(40, $g[133], 6)
				continue
			case 113:
				$pc = 114
			case 114:
				$pc = 115
			case 115:
				$pc = 116
			case 116:
				$pc = 117
			case 117:
				returnf(0)
				continue
			case 118:
				enterf(6);	// exExec
				fork(34, $g[138])
				if (!(!instrIsNop($g[138].nIns))) {
					$pc = 119
					continue
				}
				fork(36, $g[139])
				fork(36, $g[140])
				$pc = 119
			case 119:
				if (wait(8))
				return
				$pc = 120
			case 120:
				$g[161].setNewValue($g[138].vIns, $g[138].vRdt, $g[138].vRs1, $g[138].vRs2)
				if (!(instrOpTypeRdt($g[138].vIns)==OP_TYPE_REG)) {
					$pc = 144
					continue
				}
				if (!(instrIsJumpAndLink($g[138].vIns))) {
					$pc = 121
					continue
				}
				$stack[$fp+1]=0
				$stack[$fp+4]=0
				$pc = 128
				continue
			case 121:
				if (!($g[29]==ALU_FORWARDING)) {
					$pc = 126
					continue
				}
				if (!($g[162].tagMatches($g[138].vRs1))) {
					$pc = 122
					continue
				}
				$stack[$fp+1]=$g[146]
				$stack[$fp+4]=$g[162].value
				$pc = 125
				continue
			case 122:
				if (!($g[174].tagMatches($g[138].vRs1))) {
					$pc = 123
					continue
				}
				$stack[$fp+1]=$g[147]
				$stack[$fp+4]=$g[174].value
				$pc = 124
				continue
			case 123:
				$stack[$fp+1]=$g[148]
				$stack[$fp+4]=$g[139].value
				$pc = 124
			case 124:
				$pc = 125
			case 125:
				$pc = 127
				continue
			case 126:
				$stack[$fp+1]=$g[148]
				$stack[$fp+4]=$g[139].value
				$pc = 127
			case 127:
				$pc = 128
			case 128:
				if (!(instrIsJumpAndLink($g[138].vIns))) {
					$pc = 129
					continue
				}
				$stack[$fp+2]=$g[149]
				$stack[$fp+5]=$g[140].value
				$pc = 140
				continue
			case 129:
				if (!(instrOpTypeRs2($g[138].vIns)==OP_TYPE_IMM)) {
					$pc = 132
					continue
				}
				if (!(instrIsNonZeroBranch($g[138].vIns))) {
					$pc = 130
					continue
				}
				$stack[$fp+2]=$g[149]
				$stack[$fp+5]=$g[138].vRdt
				$pc = 131
				continue
			case 130:
				$stack[$fp+2]=$g[150]
				$stack[$fp+5]=$g[138].vRs2
				$pc = 131
			case 131:
				$pc = 139
				continue
			case 132:
				if (!($g[29]==ALU_FORWARDING)) {
					$pc = 137
					continue
				}
				if (!($g[162].tagMatches($g[138].vRs2))) {
					$pc = 133
					continue
				}
				$stack[$fp+2]=$g[153]
				$stack[$fp+5]=$g[162].value
				$pc = 136
				continue
			case 133:
				if (!($g[174].tagMatches($g[138].vRs2))) {
					$pc = 134
					continue
				}
				$stack[$fp+2]=$g[152]
				$stack[$fp+5]=$g[174].value
				$pc = 135
				continue
			case 134:
				$stack[$fp+2]=$g[149]
				$stack[$fp+5]=$g[140].value
				$pc = 135
			case 135:
				$pc = 136
			case 136:
				$pc = 138
				continue
			case 137:
				$stack[$fp+2]=$g[149]
				$stack[$fp+5]=$g[140].value
				$pc = 138
			case 138:
				$pc = 139
			case 139:
				$pc = 140
			case 140:
				$stack[$fp+6] = instrExecute($g[138].vIns, $stack[$fp+4], $stack[$fp+5])
				if (!($g[138].vRdt==0)) {
					$pc = 141
					continue
				}
				$stack[$fp+6]=0
				$pc = 141
			case 141:
				$g[162].setNewValue($stack[$fp+6])
				if (!(instrIsLoadOrStore($g[138].vIns))) {
					$pc = 142
					continue
				}
				$g[162].setNewTag(-1)
				$pc = 143
				continue
			case 142:
				$g[162].setNewTag($g[138].vRdt)
				$pc = 143
			case 143:
				$g[162].setInvalid(0)
				$pc = 146
				continue
			case 144:
				if (!($g[138].vIns==NOP)) {
					$pc = 145
					continue
				}
				$g[162].setInvalid(1)
				$g[162].updateLabel()
				$pc = 145
			case 145:
				$pc = 146
			case 146:
				if (!($g[138].vIns==ST)) {
					$pc = 153
					continue
				}
				if (!($g[30]==FORWARDING_TO_SMDR)) {
					$pc = 151
					continue
				}
				if (!($g[162].tagMatches($g[138].vRdt))) {
					$pc = 147
					continue
				}
				$stack[$fp+3]=$g[154]
				$g[163].setNewValue($g[162].value)
				$pc = 150
				continue
			case 147:
				if (!($g[174].tagMatches($g[138].vRdt))) {
					$pc = 148
					continue
				}
				$stack[$fp+3]=$g[155]
				$g[163].setNewValue($g[174].value)
				$pc = 149
				continue
			case 148:
				$stack[$fp+3]=$g[156]
				$g[163].setNewValue($g[140].value)
				$pc = 149
			case 149:
				$pc = 150
			case 150:
				$pc = 152
				continue
			case 151:
				$stack[$fp+3]=$g[156]
				$g[163].setNewValue($g[140].value)
				$pc = 152
			case 152:
				$pc = 153
			case 153:
				if (wait(8))
				return
				$pc = 154
			case 154:
				fork(40, $g[145], 64)
				if (!($g[138].vIns==ST)) {
					$pc = 155
					continue
				}
				fork(40, $stack[$fp+3], 24)
				$pc = 155
			case 155:
				if (!(instrOpTypeRdt($g[138].vIns)==OP_TYPE_REG)) {
					$pc = 158
					continue
				}
				if (!($stack[$fp+1]!=0)) {
					$pc = 156
					continue
				}
				fork(40, $stack[$fp+1], 24)
				$pc = 156
			case 156:
				if (!($stack[$fp+2]==$g[150])) {
					$pc = 157
					continue
				}
				$g[151].setTxt("%02X", $stack[$fp+5])
				$g[151].setOpacity(1)
				$pc = 157
			case 157:
				fork(40, $stack[$fp+2], 24)
				$pc = 158
			case 158:
				if (wait(24))
				return
				$pc = 159
			case 159:
				if (!($g[138].vIns==ST)) {
					$pc = 160
					continue
				}
				fork(40, $g[157], 40)
				$pc = 160
			case 160:
				if (!(instrOpTypeRdt($g[138].vIns)==OP_TYPE_REG)) {
					$pc = 168
					continue
				}
				$g[144].setTxtOp($g[138].vIns)
				if (!($stack[$fp+1]!=0)) {
					$pc = 161
					continue
				}
				fork(40, $g[158], 10)
				$pc = 161
			case 161:
				fork(40, $g[159], 10)
				if (!(instrIsNonZeroBranch)) {
					$pc = 163
					continue
				}
				if (wait(5))
				return
				$pc = 162
			case 162:
				$g[111].setPen($g[107])
				$pc = 167
				continue
			case 163:
				if (wait(20))
				return
				$pc = 164
			case 164:
				callf(40, $g[160], 10)
				continue
			case 165:
				if (wait(10))
				return
				$pc = 166
			case 166:
				$g[144].txtResult.setTxt("%02X", $stack[$fp+6])
				$g[144].txtResult.setOpacity(1, 20, 1, 0)
				$pc = 167
			case 167:
				$pc = 168
			case 168:
				returnf(0)
				continue
			case 169:
				enterf(0);	// maExec
				fork(34, $g[161])
				if (!(instrOpTypeRdt($g[161].nIns)==OP_TYPE_REG)) {
					$pc = 170
					continue
				}
				fork(36, $g[162])
				$pc = 170
			case 170:
				if (!($g[161].nIns==ST)) {
					$pc = 171
					continue
				}
				fork(36, $g[163])
				$pc = 171
			case 171:
				if (wait(8))
				return
				$pc = 172
			case 172:
				$g[173].setNewValue($g[161].vIns, $g[161].vRdt, $g[161].vRs1, $g[161].vRs2)
				if (!((instrOpTypeRdt($g[161].vIns)==OP_TYPE_REG) && ($g[161].vIns!=ST))) {
					$pc = 175
					continue
				}
				if (!($g[161].vIns==LD)) {
					$pc = 173
					continue
				}
				$g[174].setNewValue($g[165].getVal($g[162].value%MEMORY_ADDRESSES))
				$g[174].setNewTag($g[161].vRdt)
				$pc = 174
				continue
			case 173:
				$g[174].setNewValue($g[162].value)
				$g[174].setNewTag($g[162].tag)
				$pc = 174
			case 174:
				$g[174].setInvalid(0)
				$pc = 175
			case 175:
				if (wait(8))
				return
				$pc = 176
			case 176:
				fork(40, $g[167], 64)
				if (!($g[161].vIns==ST)) {
					$pc = 179
					continue
				}
				fork(40, $g[171], 24)
				callf(40, $g[170], 24)
				continue
			case 177:
				callf(38, $g[165], $g[162].value%MEMORY_ADDRESSES, $g[163].value)
				continue
			case 178:
				$pc = 187
				continue
			case 179:
				if (!(instrOpTypeRdt($g[161].vIns)==OP_TYPE_REG)) {
					$pc = 186
					continue
				}
				if (!($g[161].vIns==LD)) {
					$pc = 182
					continue
				}
				callf(40, $g[170], 24)
				continue
			case 180:
				$g[165].highlight($g[162].value%MEMORY_ADDRESSES)
				callf(40, $g[172], 24)
				continue
			case 181:
				$pc = 184
				continue
			case 182:
				callf(40, $g[168], 48)
				continue
			case 183:
				$pc = 184
			case 184:
				callf(40, $g[169], 16)
				continue
			case 185:
				$pc = 186
			case 186:
				$pc = 187
			case 187:
				returnf(0)
				continue
			case 188:
				enterf(0);	// wbExec
				fork(34, $g[173])
				if (!((instrOpTypeRdt($g[173].nIns)==OP_TYPE_REG) && ($g[173].nIns!=ST))) {
					$pc = 189
					continue
				}
				fork(36, $g[174])
				$pc = 189
			case 189:
				if (wait(8))
				return
				$pc = 190
			case 190:
				if (!((instrOpTypeRdt($g[173].vIns)==OP_TYPE_REG) && ($g[173].vIns!=ST))) {
					$pc = 195
					continue
				}
				$g[96][$g[174].tag].setNewValue($g[174].value)
				if (wait(8))
				return
				$pc = 191
			case 191:
				callf(40, $g[175], 24)
				continue
			case 192:
				callf(36, $g[96][$g[174].tag])
				continue
			case 193:
				if (wait(19))
				return
				$pc = 194
			case 194:
				$pc = 197
				continue
			case 195:
				if (wait(67))
				return
				$pc = 196
			case 196:
				$pc = 197
			case 197:
				if (!($g[173].vIns!=STALL && $g[173].vIns!=EMPTY)) {
					$pc = 198
					continue
				}
				$g[33]++
				$g[69].setTxt("%4d", $g[33])
				$pc = 198
			case 198:
				$g[34]++
				$g[70].setTxt("%4d", $g[34])
				returnf(0)
				continue
			case 199:
				enterf(0);	// nonPipelinedBranch
				fork(40, $g[116], 24)
				fork(40, $g[117], 24)
				callf(40, $g[91], 12)
				continue
			case 200:
				fork(40, $g[114], 12)
				fork(40, $g[115], 12)
				if (wait(12))
				return
				$pc = 201
			case 201:
				if (!(instrIsNonZeroBranch($g[138].vIns))) {
					$pc = 204
					continue
				}
				$g[74].setNewValue($g[127].value&127)
				callf(36, $g[74])
				continue
			case 202:
				callf(40, $g[84], 14)
				continue
			case 203:
				$pc = 221
				continue
			case 204:
				if (!(instrIsJumpR($g[94].vIns))) {
					$pc = 206
					continue
				}
				$g[74].setNewValue(($g[96][$g[94].vRs2].value)&127)
				callf(40, $g[86], 34)
				continue
			case 205:
				$pc = 220
				continue
			case 206:
				if (!(instrIsZeroBranch($g[94].vIns))) {
					$pc = 212
					continue
				}
				if (!(($g[96][$g[94].vRs1].value==0)==($g[94].vIns==BEQZ))) {
					$pc = 208
					continue
				}
				callf(40, $g[121], 20)
				continue
			case 207:
				$g[74].setNewValue(($g[74].value+$g[94].vRs2)&127)
				$pc = 210
				continue
			case 208:
				callf(40, $g[119], 20)
				continue
			case 209:
				$g[74].setNewValue(($g[74].value+4)&127)
				$pc = 210
			case 210:
				callf(40, $g[84], 14)
				continue
			case 211:
				$pc = 219
				continue
			case 212:
				if (!(isJorJAL($g[94].vIns))) {
					$pc = 215
					continue
				}
				$g[74].setNewValue(($g[74].value+$g[94].vRs2)&127)
				callf(40, $g[121], 20)
				continue
			case 213:
				callf(40, $g[84], 14)
				continue
			case 214:
				$pc = 218
				continue
			case 215:
				$g[74].setNewValue(($g[74].value+4)&127)
				callf(40, $g[119], 20)
				continue
			case 216:
				callf(40, $g[84], 14)
				continue
			case 217:
				$pc = 218
			case 218:
				$pc = 219
			case 219:
				$pc = 220
			case 220:
				$pc = 221
			case 221:
				callf(40, $g[88], 6)
				continue
			case 222:
				returnf(0)
				continue
			case 223:
				enterf(5);	// execNonPipelined
				callf(36, $g[74])
				continue
			case 224:
				$g[72].setActive($g[74].newValue)
				callf(40, $g[83], 24)
				continue
			case 225:
				callf(40, $g[81], 40)
				continue
			case 226:
				$g[94].setNewInstruction($g[72].instruction[$g[74].value/4])
				$g[82].setTxt($g[94].getNewInstrTxt())
				$g[82].translate(60/2+70, 0, 20, 1, 0)
				callf(34, $g[94])
				continue
			case 227:
				if (!((instrOpTypeRs2($g[94].vIns)==OP_TYPE_IMM) && (instrOpTypeRdt($g[94].vIns)==OP_TYPE_REG))) {
					$pc = 228
					continue
				}
				fork(40, $g[93], 64)
				$pc = 228
			case 228:
				fork(199, $obj)
				if (wait(24))
				return
				$pc = 229
			case 229:
				if (!(instrIsJumpAndLink($g[94].vIns))) {
					$pc = 232
					continue
				}
				callf(40, $g[113], 20)
				continue
			case 230:
				callf(40, $g[133], 20)
				continue
			case 231:
				$stack[$fp+1]=0
				$stack[$fp+2]=($g[74].value+4)&127
				$pc = 244
				continue
			case 232:
				if (!(instrOpTypeRdt($g[94].vIns)==OP_TYPE_REG)) {
					$pc = 241
					continue
				}
				$stack[$fp+1]=$g[96][$g[94].vRs1].value
				$g[96][$g[94].vRs1].highlight($g[21])
				$g[137].setTxt("R%d:%02X", $g[94].vRs1, $g[96][$g[94].vRs1].value)
				$g[137].setOpacity(1)
				fork(40, $g[136], 40)
				if (!((instrOpTypeRs2($g[94].vIns)==OP_TYPE_REG) || ($g[94].vIns==ST))) {
					$pc = 238
					continue
				}
				if (!(instrOpTypeRs2($g[94].vIns)==OP_TYPE_IMM)) {
					$pc = 233
					continue
				}
				$stack[$fp+2]=$g[96][$g[94].vRdt].value
				$g[96][$g[94].vRdt].highlight($g[21])
				$pc = 234
				continue
			case 233:
				$stack[$fp+2]=$g[96][$g[94].vRs2].value
				$g[96][$g[94].vRs2].highlight($g[21])
				$pc = 234
			case 234:
				if (!((!instrIsArRI($g[94].vIns)) && ($g[94].vIns!=LD))) {
					$pc = 237
					continue
				}
				$stack[$fp+5] = ($g[94].vIns==ST) ? $g[94].vRdt : $g[94].vRs2
				$g[135].setTxt("R%d:%02X", $stack[$fp+5], $g[96][$stack[$fp+5]].value)
				$g[135].setOpacity(1)
				callf(40, $g[134], 20)
				continue
			case 235:
				callf(40, $g[133], 20)
				continue
			case 236:
				$pc = 237
			case 237:
				$pc = 240
				continue
			case 238:
				if (wait(40))
				return
				$pc = 239
			case 239:
				$pc = 240
			case 240:
				$pc = 243
				continue
			case 241:
				if (wait(40))
				return
				$pc = 242
			case 242:
				$pc = 243
			case 243:
				$pc = 244
			case 244:
				if (!(instrOpTypeRdt($g[94].vIns)==OP_TYPE_REG)) {
					$pc = 245
					continue
				}
				$g[144].setTxtOp($g[94].vIns)
				$pc = 245
			case 245:
				if (!($g[94].vIns==ST)) {
					$pc = 250
					continue
				}
				fork(40, $g[156], 40)
				fork(40, $g[148], 40)
				$g[151].setTxt("%02X", $g[94].vRs2)
				$g[151].setOpacity(1)
				callf(40, $g[150], 40)
				continue
			case 246:
				fork(40, $g[157], 40)
				fork(40, $g[159], 10)
				callf(40, $g[158], 10)
				continue
			case 247:
				if (wait(20))
				return
				$pc = 248
			case 248:
				callf(40, $g[160], 10)
				continue
			case 249:
				$stack[$fp+4]=$stack[$fp+2]
				$stack[$fp+3]=instrExecute($g[94].vIns, $stack[$fp+1], $g[94].vRs2)
				$pc = 270
				continue
			case 250:
				if (!(instrIsJumpAndLink($g[94].vIns))) {
					$pc = 255
					continue
				}
				callf(40, $g[149], 40)
				continue
			case 251:
				callf(40, $g[159], 10)
				continue
			case 252:
				$stack[$fp+3]=instrExecute($g[94].vIns, $stack[$fp+1], $stack[$fp+2])
				if (wait(20))
				return
				$pc = 253
			case 253:
				callf(40, $g[160], 10)
				continue
			case 254:
				$pc = 269
				continue
			case 255:
				if (!(instrOpTypeRdt($g[94].vIns)==OP_TYPE_REG)) {
					$pc = 266
					continue
				}
				fork(40, $g[148], 40)
				if (!(instrOpTypeRs2($g[94].vIns)==OP_TYPE_IMM)) {
					$pc = 257
					continue
				}
				$g[151].setTxt("%02X", $g[94].vRs2)
				$g[151].setOpacity(1)
				callf(40, $g[150], 40)
				continue
			case 256:
				$stack[$fp+3]=instrExecute($g[94].vIns, $stack[$fp+1], $g[94].vRs2)
				$pc = 259
				continue
			case 257:
				callf(40, $g[149], 40)
				continue
			case 258:
				$stack[$fp+3]=instrExecute($g[94].vIns, $stack[$fp+1], $stack[$fp+2])
				$pc = 259
			case 259:
				fork(40, $g[159], 10)
				callf(40, $g[158], 10)
				continue
			case 260:
				if (!(instrIsNonZeroBranch($g[94].vIns))) {
					$pc = 262
					continue
				}
				if (wait(5))
				return
				$pc = 261
			case 261:
				$g[111].setPen($g[107])
				$pc = 265
				continue
			case 262:
				if (wait(20))
				return
				$pc = 263
			case 263:
				callf(40, $g[160], 10)
				continue
			case 264:
				$pc = 265
			case 265:
				$pc = 268
				continue
			case 266:
				if (wait(80))
				return
				$pc = 267
			case 267:
				$pc = 268
			case 268:
				$pc = 269
			case 269:
				$pc = 270
			case 270:
				if (!($g[94].vIns==LD)) {
					$pc = 274
					continue
				}
				callf(40, $g[170], 20)
				continue
			case 271:
				$g[164][($stack[$fp+3])%4].highlight($g[21])
				callf(40, $g[172], 20)
				continue
			case 272:
				callf(40, $g[169], 40)
				continue
			case 273:
				$stack[$fp+3]=$g[164][($stack[$fp+3])%4].value
				$pc = 284
				continue
			case 274:
				if (!($g[94].vIns==ST)) {
					$pc = 277
					continue
				}
				fork(40, $g[171], 20)
				callf(40, $g[170], 20)
				continue
			case 275:
				$g[164][($stack[$fp+3])%4].setNewValue($stack[$fp+4])
				callf(36, $g[164][($stack[$fp+3])%4])
				continue
			case 276:
				$pc = 283
				continue
			case 277:
				if (!(instrOpTypeRdt($g[94].vIns)==OP_TYPE_REG)) {
					$pc = 280
					continue
				}
				callf(40, $g[168], 40)
				continue
			case 278:
				callf(40, $g[169], 40)
				continue
			case 279:
				$pc = 282
				continue
			case 280:
				if (wait(80))
				return
				$pc = 281
			case 281:
				$pc = 282
			case 282:
				$pc = 283
			case 283:
				$pc = 284
			case 284:
				$g[96][0].unHighlight()
				$g[96][1].unHighlight()
				$g[96][2].unHighlight()
				$g[96][3].unHighlight()
				if (!((instrOpTypeRdt($g[94].vIns)==OP_TYPE_REG) && ($g[94].vIns!=ST))) {
					$pc = 288
					continue
				}
				callf(40, $g[175], 40)
				continue
			case 285:
				$g[96][$g[94].vRdt].setNewValue($stack[$fp+3])
				callf(36, $g[96][$g[94].vRdt])
				continue
			case 286:
				if (wait(19))
				return
				$pc = 287
			case 287:
				$pc = 290
				continue
			case 288:
				if (wait(75))
				return
				$pc = 289
			case 289:
				$pc = 290
			case 290:
				$g[34]+=5
				$g[33]++
				$g[69].setTxt("%4d", $g[33])
				$g[70].setTxt("%4d", $g[34])
				returnf(0)
				continue
			case 291:
				enterf(0);	// exec
				$g[96][0].unHighlight()
				$g[96][1].unHighlight()
				$g[96][2].unHighlight()
				$g[96][3].unHighlight()
				$g[164][0].unHighlight()
				$g[164][1].unHighlight()
				$g[164][2].unHighlight()
				$g[164][3].unHighlight()
				$g[76][0].unHighlight()
				$g[76][1].unHighlight()
				$g[77][0].unHighlight()
				$g[77][1].unHighlight()
				if (!($g[26]==PIPELINING_ENABLED)) {
					$pc = 292
					continue
				}
				fork(51, $obj)
				fork(72, $obj)
				fork(118, $obj)
				fork(169, $obj)
				fork(188, $obj)
				$pc = 293
				continue
			case 292:
				fork(223, $obj)
				$pc = 293
			case 293:
				if (wait(8))
				return
				$pc = 294
			case 294:
				resetWires()
				if (wait(($g[26]==PIPELINING_ENABLED) ? 72 : 392))
				return
				$pc = 295
			case 295:
				checkPoint()
				returnf(0)
				continue
			case 296:
				enterf(0);	// run
				if (wait(1))
				return
				$pc = 297
			case 297:
				$g[32]=1
				setlocked()
				$pc = 298
			case 298:
				if (!(1)) {
					$pc = 303
					continue
				}
				fork(46, $g[73], ($g[26]==PIPELINING_ENABLED) ? 80 : 400)
				callf(291, $obj)
				continue
			case 299:
				if (!((($g[173].vIns==HALT) && ($g[26]==PIPELINING_ENABLED)) || (($g[94].vIns==HALT) && ($g[26]==PIPELINING_DISABLED)))) {
					$pc = 301
					continue
				}
				stop()
				if (!($g[179])) {
					$pc = 300
					continue
				}
				$pc = 303
				continue
				$pc = 300
			case 300:
				$pc = 301
			case 301:
				if (wait(1))
				return
				$pc = 302
			case 302:
				$pc = 298
				continue
			case 303:
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
