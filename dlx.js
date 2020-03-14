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
		return sprintf("%s", $g[40][instr])
		else 
		if (instrIsArRR(instr))
		return sprintf("%s x%d,x%d,x%d", $g[40][instr], rdt, rs1, rs2)
		else 
		if (instrIsArRI(instr))
		return sprintf("%s x%d,x%d,%02X", $g[40][instr], rdt, rs1, rs2)
		else 
		if (instrIsLoadOrStore(instr))
		return sprintf("%s x%d,x%d+%02X", $g[40][instr], rdt, rs1, rs2)
		else 
		if (instrIsBranch(instr))
		return sprintf("%s x%d,x%d,%02X", $g[40][instr], rdt, rs1, rs2)
		else 
		if (instr==J)
		return sprintf("%s %02X", $g[40][instr], rs2)
		else 
		if (instr==JAL)
		return sprintf("%s x%d, %02X", $g[40][instr], rdt, rs2)
		else 
		if (instr==JR)
		return sprintf("%s x%d", $g[40][instr], rs2)
		else 
		if (instr==JALR)
		return sprintf("%s x%d, x%d", $g[40][instr], rdt, rs2)
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
		this.arrowDown = new Line($g[0], $g[19], 0, $g[44], 0, 0, this.x+this.w+2, this.y+this.h*0.5, 5, 0, 0, 0, 0, 0)
		this.arrowUp = new Line($g[0], $g[19], 0, $g[44], 0, 0, this.x-2, this.y+this.h*0.5, -5, 0, 0, 0, 0, 0)
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
		this.ins.setTxt("%c%s", 32, $g[40][this.vIns])
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
		this.r = new Rectangle2($g[0], 0, 0, $g[1], $g[41], x, y, w, h)
		this.r.setRounded(2, 2)
		new Rectangle2($g[0], 0, 0, $g[1], $g[42], x+2, y+2, w-4, h-4)
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
		this.r1 = new Rectangle2($g[0], 0, 0, $g[1], $g[45], x, y, w, h)
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
		this.bg = new Rectangle2($g[0], 0, 0, $g[1], $g[47], this.x, this.y, this.w, this.h)
		this.bg.setRounded(2, 2)
		this.label
		if (this.w>=this.h) {
			this.label=new Rectangle2($g[0], 0, 0, 0, 0, this.x, this.y, this.w, this.h, 0, $g[48], caption)
		} else {
			this.label=new Rectangle($g[0], 0, 0, 0, 0, this.x+this.w/2-1, this.y+this.h/2, -this.w/2, -this.h/2, this.w, this.h, 0, $g[48], caption)
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
		this.spText = new Rectangle2($g[0], 0, 0, $g[4], $g[49], 120, 120, 20, 8, $g[4], $g[48], sprintf(""))
		this.spAddr = -2
		this.prevSPAddr = -1
		this.apFP = new AnimPipe()
		this.fpText = new Rectangle2($g[0], 0, 0, $g[4], $g[49], 120, 120, 20, 8, $g[4], $g[48], sprintf(""))
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
		this.outer = new Rectangle2($g[0], 0, 0, $g[1], $g[49], this.outer_x, this.outer_y, this.outer_w, this.outer_h)
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
			this.fpText=new Rectangle2($g[0], 0, 0, $g[4], $g[49], (tax+taw+13), (tay+6), 20, 8, $g[3], $g[48], sprintf("FP"))
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
			this.spText=new Rectangle2($g[0], 0, 0, $g[4], $g[49], (ax+aw+20), (ay+6), 15, 8, $g[3], $g[48], sprintf("SP/FP"))
		} else {
			this.spText=new Rectangle2($g[0], 0, 0, $g[4], $g[49], (ax+aw+13), (ay+6), 20, 8, $g[3], $g[48], sprintf("SP"))
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
			this.fpText=new Rectangle2($g[0], 0, 0, $g[4], $g[49], (ax+aw+13), (ay+6), 20, 8, $g[3], $g[48], sprintf("FP"))
		} else {
			this.spText.setOpacity(0)
			this.fpText.setOpacity(0)
			this.spText=new Rectangle2($g[0], 0, 0, $g[4], $g[49], (ax+aw+20), (ay+6), 15, 8, $g[3], $g[48], sprintf("SP/FP"))
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

	function ALU(x, y, w, h) {
		VObj.call(this)
		this.alu = new Polygon($g[0], 0, ABSOLUTE, $g[1], $g[47], x, y, 0, 0, w, h/4, w, 3*h/4, 0, h, 0, 5*h/8, w/2, h/2, 0, 3*h/8)
		new Rectangle2($g[0], 0, 0, 0, 0, x, y-10, w, 10, 0, $g[48], "ALU")
		this.op = ""
		this.txtOp = new Rectangle($g[0], $g[19], 0, 0, $g[11], x, y+h/2, 0, -h/12, 2*w/3, h/6, $g[4], $g[48], this.op)
		this.txtOp.setOpacity(0)
		this.txtOp.setRounded(2, 2)
		this.txtResult = new Rectangle($g[0], $g[21], 0, $g[1], $g[13], x+3*w/4, y+h/2, 0, -h/12, w/2, h/6, $g[1], $g[48])
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
		this.prev_clock = new Line(this, $g[21], 0, $g[50], -this.chw+this.chw/5, 3+this.ch, 0, 0, 0, -this.ch, this.chw, 0, 0, this.ch, this.chw, 0)
		this.next_clock = new Line(this, $g[21], 0, $g[51], this.chw+this.chw/5, 3+this.ch, 0, 0, 0, -this.ch, this.chw, 0, 0, this.ch, this.chw, 0)
		this.dot = new Rectangle2(this, $g[21], 0, 0, $g[5], w/2-3, h-6, 6, 6)
		this.canUpdate
	}
	AnimatedClock.prototype = Object.create(Group.prototype)

	AnimatedClock.prototype.setStall = function(s, t) {
		this.stall=s
		this.type=t
		if (this.canUpdate)
		this.prev_clock.setPen(this.stall ? (this.type ? $g[52] : $g[50]) : $g[51])
	}

	function Button(x, y, w, h, caption, ID) {
		VObj.call(this)
		this.label = new Rectangle2($g[0], 0, 0, $g[1], $g[53], x, y, w, h, $g[1], $g[17], caption)
		this.label.addEventHandler("eventEE", this, this.$eh11)
	}
	Button.prototype = Object.create(VObj.prototype)

	Button.prototype.$eh11 = function(enter, x, y) {
		this.label.setBrush(enter ? $g[54] : $g[53])
		return 0
	}

	Button.prototype.setCaption = function(caption) {
		this.label.setTxt(caption)
	}

	Button.prototype.showLocked = function(locked) {
		this.label.setFont(locked ? $g[18] : $g[17])
	}

	function resetWires() {
		$g[89].reset()
		$g[87].reset()
		$g[88].setOpacity(0)
		$g[90].reset()
		$g[91].reset()
		$g[92].reset()
		$g[93].reset()
		$g[94].reset()
		$g[95].reset()
		$g[96].reset()
		$g[97].reset()
		$g[98].reset()
		$g[99].reset()
		$g[120].reset()
		$g[121].reset()
		$g[122].reset()
		$g[123].reset()
		$g[124].reset()
		$g[125].reset()
		$g[126].setOpacity(0)
		$g[127].reset()
		$g[128].setOpacity(0)
		$g[130].reset()
		$g[131].setOpacity(0)
		$g[132].reset()
		$g[133].reset()
		$g[129].reset()
		$g[137].reset()
		$g[138].setOpacity(0)
		$g[140].reset()
		$g[139].reset()
		$g[142].reset()
		$g[143].reset()
		$g[144].setOpacity(0)
		$g[145].reset()
		$g[146].setOpacity(0)
		$g[141].setOpacity(0)
		$g[117].setPen($g[112])
		$g[118].setPen($g[112])
		$g[119].setPen($g[112])
		$g[154].reset()
		$g[155].reset()
		$g[156].reset()
		$g[157].reset()
		$g[158].reset()
		$g[159].reset()
		$g[160].setOpacity(0)
		$g[161].reset()
		$g[162].reset()
		$g[163].reset()
		$g[164].reset()
		$g[165].reset()
		$g[166].reset()
		$g[167].reset()
		$g[168].reset()
		$g[169].reset()
		$g[153].txtOp.setOpacity(0)
		$g[153].txtResult.setOpacity(0)
		$g[117].setPen($g[112])
		$g[118].setPen($g[112])
		$g[176].reset()
		$g[177].reset()
		$g[178].reset()
		$g[179].reset()
		$g[180].reset()
		$g[181].reset()
		$g[184].reset()
	}

	function parallelMode() {
		if ($g[35]==1) {
			$g[174].setAll(0)
		} else {
			$g[174].setAll(1)
		}
	}

	function resetRegisters() {
		$g[80].reset()
		$g[80].setValue(124)
		$g[101].reset()
		$g[148].reset()
		$g[149].reset()
		$g[172].reset()
		$g[171].reset()
		$g[183].reset()
		$g[82][0].reset()
		$g[82][1].reset()
		$g[83][0].reset()
		$g[83][1].reset()
		$g[173][0].reset()
		$g[173][1].reset()
		$g[173][2].reset()
		$g[173][3].reset()
		$g[100].reset()
		$g[147].reset()
		$g[170].reset()
		$g[182].reset()
		$g[78].setActive(124)
		$g[171].setInvalid(1)
		$g[171].updateLabel()
		$g[183].setInvalid(1)
		$g[183].updateLabel()
		$g[82][0].setValue(-1)
		$g[82][0].setInvalid(1)
		$g[82][0].updateLabel()
		$g[82][1].setValue(-1)
		$g[82][1].setInvalid(1)
		$g[82][1].updateLabel()
		$g[37]=0
		$g[38]=0
		$g[75].setTxt("%4d", 0)
		$g[76].setTxt("%4d", 0)
	}

	function resetCircuit() {
		resetRegisters()
		resetWires()
	}

	function showBTB(opacity) {
		$g[81].setOpacity(opacity)
		$g[82][0].setOpacity(opacity)
		$g[82][1].setOpacity(opacity)
		$g[83][0].setOpacity(opacity)
		$g[83][1].setOpacity(opacity)
		$g[95].setOpacity(opacity)
		$g[120].setOpacity(opacity)
		$g[84].setOpacity(opacity)
		$g[98].setOpacity(opacity)
		$g[91].setOpacity(opacity)
		$g[137].setOpacity(opacity)
		$g[140].setOpacity(opacity)
		$g[110].setOpacity(opacity)
		$g[139].setOpacity(opacity)
	}

	function showALUForwarding(opacity) {
		if (opacity==0) {
			$g[157].setPoint(0, 440, 205)
			$g[157].setPoint(1, 501, 205)
			$g[158].setPoint(0, ($g[31]) ? 440 : 430, 250)
			$g[158].setPoint(1, 490, 250)
			$g[159].setPoint(2, 450, 260)
			$g[159].setPoint(3, 410, 260)
			$g[157].setHead(0)
		} else {
			$g[157].setPoint(0, 440, 220)
			$g[157].setPoint(1, 500, 220)
			$g[158].setPoint(0, 440, 240)
			$g[158].setPoint(1, 500, 240)
			$g[159].setPoint(2, 450, 250)
			$g[159].setPoint(3, 500, 250)
			$g[157].setHead(1)
		}
		$g[150].setOpacity(opacity)
		$g[155].setOpacity(opacity)
		$g[156].setOpacity(opacity)
		$g[162].setOpacity(opacity)
		$g[161].setOpacity(opacity)
	}

	function showSMDRForwarding(opacity) {
		if (opacity==0) {
			$g[165].setPoint(1, 435, 330)
			$g[165].setPoint(2, 500, 330)
			$g[165].setHead(0)
		} else {
			$g[165].setPoint(1, 435, 340)
			$g[165].setPoint(2, 500, 340)
			$g[165].setHead(1)
		}
		$g[152].setOpacity(opacity)
		$g[163].setOpacity(opacity)
		$g[164].setOpacity(opacity)
	}

	function showZeroForwarding(opacity) {
		if (opacity==0) {
		} else {
		}
	}

	function showPipeline(opacity) {
		if (opacity==0) {
			$g[97].setPoint(1, 180, 230)
			$g[97].setPoint(2, 180, 240)
			$g[122].setPoint(0, 260, 230)
			$g[123].setPoint(0, 260, 230)
			$g[99].setPoint(1, 380, 390)
			$g[145].setPoint(1, 375, 205)
			$g[145].setPoint(2, 440, 205)
			$g[142].setPoint(1, 440, 240)
			$g[165].setPoint(0, 435, 250)
			$g[169].setPoint(3, 600, 240)
			$g[166].setPoint(1, 530, 330)
			$g[178].setPoint(1, 640, 230)
			$g[99].setHead(0)
			$g[97].setHead(0)
			$g[145].setHead(0)
			$g[157].setHead(0)
			$g[142].setHead(0)
			$g[165].setHead(0)
			$g[166].setHead(0)
			$g[167].setHead(0)
			$g[168].setHead(0)
			$g[169].setHead(0)
			$g[178].setHead(0)
			showBTB(opacity)
			showALUForwarding(opacity)
			showSMDRForwarding(opacity)
			showZeroForwarding(opacity)
		} else {
			$g[97].setPoint(1, 240, 230)
			$g[97].setPoint(2, 250, 230)
			$g[122].setPoint(0, 260, 250)
			$g[123].setPoint(0, 260, 250)
			$g[99].setPoint(1, 390, 390)
			$g[145].setPoint(1, 375, 210)
			$g[145].setPoint(2, 420, 210)
			$g[142].setPoint(1, 420, 240)
			$g[165].setPoint(0, 435, 270)
			$g[169].setPoint(3, 600, 240)
			$g[166].setPoint(1, 600, 330)
			$g[178].setPoint(1, 700, 230)
			$g[99].setHead(1)
			$g[97].setHead(1)
			$g[145].setHead(1)
			$g[157].setHead(1)
			$g[142].setHead(1)
			$g[165].setHead(1)
			$g[166].setHead(1)
			$g[167].setHead(1)
			$g[168].setHead(1)
			$g[169].setHead(1)
			$g[178].setHead(1)
			showBTB($g[29]==BRANCH_PREDICTION ? 1 : 0)
			showALUForwarding($g[31]==ALU_FORWARDING ? 1 : 0)
			showSMDRForwarding($g[32]==FORWARDING_TO_SMDR ? 1 : 0)
			showZeroForwarding($g[33]==ZERO_FORWARDING ? 1 : 0)
		}
		$g[96].setOpacity(opacity)
		$g[86].setOpacity(opacity)
		$g[93].setOpacity(opacity)
		$g[101].setOpacity(opacity)
		$g[147].setOpacity(opacity)
		$g[170].setOpacity(opacity)
		$g[182].setOpacity(opacity)
		$g[154].setOpacity(opacity)
		$g[176].setOpacity(opacity)
		$g[148].setOpacity(opacity)
		$g[149].setOpacity(opacity)
		$g[171].setOpacity(opacity)
		$g[183].setOpacity(opacity)
		$g[172].setOpacity(opacity)
		$g[67].label.setOpacity(opacity)
		$g[68].label.setOpacity(opacity)
		$g[69].label.setOpacity(opacity)
		$g[70].label.setOpacity(opacity)
		$g[71].label.setOpacity(opacity)
	}

	function setPEMode(mode) {
		$g[28]=mode
		if ($g[28]==0) {
			$g[66].setCaption("Pipelining Enabled")
			showPipeline(1)
		} else
		if ($g[28]==1) {
			$g[66].setCaption("Pipelining Disabled")
			showPipeline(0)
		}
		setArg("peMode", $g[28].toString())
	}

	function setBPMode(mode) {
		$g[29]=mode
		if ($g[29]==0) {
			$g[67].setCaption("Branch Prediction")
			showBTB(1)
		} else
		if ($g[29]==1) {
			$g[67].setCaption("Branch Interlock")
			showBTB(0)
		} else
		if ($g[29]==2) {
			$g[67].setCaption("Delayed Branches")
			showBTB(0)
		}
		setArg("bpMode", $g[29].toString())
	}

	function setLIMode(mode) {
		$g[30]=mode
		if ($g[30]==0) {
			$g[68].setCaption("Load Interlock")
		} else
		if ($g[30]==1) {
			$g[68].setCaption("No Load Interlock")
		}
		setArg("liMode", $g[30].toString())
	}

	function setAFMode(mode) {
		$g[31]=mode
		if ($g[31]==0) {
			$g[69].setCaption("ALU Forwarding")
			showALUForwarding(1)
		} else
		if ($g[31]==1) {
			$g[69].setCaption("ALU Interlock")
			showALUForwarding(0)
		} else
		if ($g[31]==2) {
			$g[69].setCaption("No ALU Interlock")
			showALUForwarding(0)
		}
		setArg("afMode", $g[31].toString())
	}

	function setSFMode(mode) {
		$g[32]=mode
		if ($g[32]==0) {
			$g[70].setCaption("Store Operand\nForwarding")
			showSMDRForwarding(1)
		} else
		if ($g[32]==1) {
			$g[70].setCaption("Store Interlock")
			showSMDRForwarding(0)
		} else
		if ($g[32]==2) {
			$g[70].setCaption("No Store Interlock")
			showSMDRForwarding(0)
		}
		setArg("sfMode", $g[32].toString())
	}

	function setZFMode(mode) {
		$g[33]=mode
		if ($g[33]==0) {
			$g[71].setCaption("Zero Forwarding")
			showZeroForwarding(1)
		} else
		if ($g[33]==1) {
			$g[71].setCaption("Zero Interlock")
			showZeroForwarding(0)
		} else
		if ($g[33]==2) {
			$g[71].setCaption("No Zero Interlock")
			showZeroForwarding(0)
		}
		setArg("zfMode", $g[33].toString())
	}

	function btbIndex(pc) {
		for (let lp1 = 0; lp1<2; lp1++)
		if ($g[82][lp1].value==pc)
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
		if ($g[210]==0) {
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
		$g[204]=c
	}

	function booth8() {
		let b1 = $g[206]&1
		if (b1!=$g[205] && $g[209]!=2) {
			if (b1>$g[205]) {
				$g[207]=(se8($g[207])-se8($g[208]))&255
			} else {
				$g[207]=(se8($g[207])+se8($g[208]))&255
			}
			$g[209]=2
		} else {
			$g[209]=1
			let p21 = $g[207]&1
			p21=p21<<7
			let p2m = $g[207]&128
			$g[206]=($g[206]>>1)&255
			$g[206]=$g[206]|p21
			$g[207]=($g[207]>>1)&255
			$g[207]=$g[207]|p2m
			$g[205]=b1
		}
	}

	function booth() {
		let b1 = $g[206]&1
		if (b1!=$g[205] && $g[209]!=2) {
			let p3 = $g[206]&15
			let q = $g[206]&240
			q=q>>4
			if (b1>$g[205]) {
				q=(se8(q)-se8($g[208]))&255
			} else {
				q=(se8(q)+se8($g[208]))&255
			}
			q=q<<4
			q=q&240
			$g[206]=q|p3
			$g[209]=2
		} else {
			$g[209]=1
			let lb = $g[206]&128
			$g[206]=($g[206]>>1)&255
			$g[206]=$g[206]|lb
			$g[205]=b1
		}
	}

	function expandFrame() {
	}

	function calcNewPC() {
		if (instrIsBranch($g[147].vIns)) {
			if ($g[197]==1) {
				$g[190]=$g[130]
				$g[193]=$g[136].value&127
				$g[194]=$g[90]
			} else {
				$g[190]=$g[127]
				$g[193]=($g[101].value+4)&127
				$g[197]=0
			}
		} else {
			if (isJorJAL($g[100].vIns)) {
				$g[190]=$g[130]
				$g[191]=$g[137]
				$g[193]=($g[101].value+$g[100].vRs2)&127
				$g[194]=$g[90]
			} else
			if (instrIsJumpR($g[100].vIns)) {
				$g[193]=($g[102][$g[100].vRs2].value)&127
				$g[194]=$g[92]
				$g[191]=$g[140]
			}
		}
	}

	function updBTB() {
		if ($g[193]!=$g[80].value) {
			$g[80].setNewValue($g[193])
			$g[189]=$g[194]
			if ($g[29]==BRANCH_PREDICTION) {
				if ($g[193]==$g[101].value+4) {
					if (btbIndex($g[101].value)>=0)
					$g[82][btbIndex($g[101].value)].setInvalid(1)
				} else {
					if (btbIndex($g[101].value)>=0)
					$g[26]=btbIndex($g[101].value)
					else 
					$g[26]=($g[26]) ? 0 : 1
					$g[82][$g[26]].setNewValue($g[101].value)
					$g[82][$g[26]].setInvalid(0)
					$g[82][$g[26]].useTag=0
					$g[83][$g[26]].setNewValue($g[193])
				}
			}
		}
	}

	function detectStall() {
		$g[25]=NO_STALL
		$g[27]=0
		if ($g[31]==ALU_INTERLOCK) {
			if (instrOpTypeRdt($g[147].vIns)==OP_TYPE_REG) {
				if ((instrOpTypeRs1($g[100].vIns)==OP_TYPE_REG) && ($g[100].vRs1==$g[147].vRdt))
				$g[25]=DATA_STALL
				if ((instrOpTypeRs2($g[100].vIns)==OP_TYPE_REG) && ($g[100].vRs2==$g[147].vRdt))
				$g[25]=DATA_STALL
			}
			if (instrOpTypeRdt($g[170].vIns)==OP_TYPE_REG) {
				if ((instrOpTypeRs1($g[100].vIns)==OP_TYPE_REG) && ($g[100].vRs1==$g[170].vRdt))
				$g[25]=DATA_STALL
				if ((instrOpTypeRs2($g[100].vIns)==OP_TYPE_REG) && ($g[100].vRs2==$g[170].vRdt))
				$g[25]=DATA_STALL
			}
		}
		if (($g[32]==STORE_INTERLOCK) && ($g[100].vIns==ST)) {
			if ((instrOpTypeRdt($g[147].vIns)==OP_TYPE_REG) && ($g[147].vRdt==$g[100].vRdt))
			$g[25]=DATA_STALL
			if ((instrOpTypeRdt($g[170].vIns)==OP_TYPE_REG) && ($g[170].vRdt==$g[100].vRdt))
			$g[25]=DATA_STALL
		}
		if (instrIsJumpR($g[100].vIns) && (instrIsBranch($g[147].vIns)==0)) {
			if ((instrOpTypeRdt($g[147].vIns)==OP_TYPE_REG) && ($g[147].vRdt==$g[100].vRs2))
			$g[25]=DATA_STALL
			if ((instrOpTypeRdt($g[170].vIns)==OP_TYPE_REG) && ($g[170].vRdt==$g[100].vRs2))
			$g[25]=DATA_STALL
		}
		if (($g[30]==LOAD_INTERLOCK) && ($g[147].vIns==LD)) {
			if ((instrOpTypeRs1($g[100].vIns)==OP_TYPE_REG) && ($g[100].vRs1==$g[147].vRdt))
			$g[25]=DATA_STALL
			if ((instrOpTypeRs2($g[100].vIns)==OP_TYPE_REG) && ($g[100].vRs2==$g[147].vRdt))
			$g[25]=DATA_STALL
		}
		if (instrIsMulti($g[147].vIns) && ($g[202]==1)) {
			$g[25]=DATA_STALL
		}
		if (instrIsBranch($g[147].vIns)) {
			if (instrIsJump($g[100].vIns) && ($g[197]==0) && ($g[25]==NO_STALL)) {
				$g[27]=1
				$g[25]=CTRL_STALL
			} else
			if (instrIsJump($g[100].vIns) && ($g[197]==1) && ($g[25]==NO_STALL)) {
				$g[25]=NO_STALL
				$g[198]=1
			} else
			if ((instrIsBranch($g[100].vIns)==0) && ($g[197]==1) && ($g[25]==NO_STALL)) {
				$g[27]=1
				$g[25]=CTRL_STALL
			} else {
				$g[25]=NO_STALL
				$g[198]=0
			}
		} else {
			if (($g[25]==NO_STALL) && ($g[29]!=DELAYED_BRANCHES) && instrIsJump($g[100].vIns) && ($g[193]!=$g[80].value)) {
				$g[27]=1
				$g[25]=CTRL_STALL
			}
		}
		if ($g[25]==DATA_STALL) {
			$g[79].setStall(1, 0)
		} else
		if ($g[25]==CTRL_STALL) {
			$g[79].setStall(1, 1)
		}
	}

	function $eh12(m) {
		let v = stringToNum(m)
		$g[183].setNewValue(v)
	}

	function setlocked() {
		let b_locked = $g[36] || $g[24]
		$g[66].showLocked(b_locked)
		$g[67].showLocked(b_locked)
		$g[68].showLocked(b_locked)
		$g[69].showLocked(b_locked)
		$g[70].showLocked(b_locked)
		$g[71].showLocked(b_locked)
	}

	function $eh13(down, flags, x, y) {
		if (down && (flags&MB_LEFT) && (!$g[36]) && (!$g[24])) {
			setPEMode(($g[28]+1)%2)
			resetCircuit()
		}
		return 0
	}

	function $eh14(down, flags, x, y) {
		if (down && (flags&MB_LEFT) && (!$g[36]) && (!$g[24])) {
			setBPMode(($g[29]+1)%3)
			resetCircuit()
		}
		return 0
	}

	function $eh15(down, flags, x, y) {
		if (down && (flags&MB_LEFT) && (!$g[36]) && (!$g[24])) {
			setLIMode(($g[30]+1)%2)
			resetCircuit()
		}
		return 0
	}

	function $eh16(down, flags, x, y) {
		if (down && (flags&MB_LEFT) && (!$g[36]) && (!$g[24])) {
			setAFMode(($g[31]+1)%3)
			resetCircuit()
		}
		return 0
	}

	function $eh17(down, flags, $2, $3) {
		if (down && (flags&MB_LEFT) && (!$g[36]) && (!$g[24])) {
			setSFMode(($g[32]+1)%3)
			resetCircuit()
		}
		return 0
	}

	function $eh18(down, flags, $2, $3) {
		if (down && (flags&MB_LEFT) && (!$g[36]) && (!$g[24])) {
			setZFMode(($g[33]+1)%3)
			resetCircuit()
		}
		return 0
	}

	function $eh19(down, flags, x, y) {
		if (down && flags && MB_LEFT) {
			if ($g[35]==0) {
				$g[35]=1
				startParallel()
				$g[72].setCaption("Non-parallel")
			} else {
				$g[35]=0
				$g[72].setCaption("Parallel")
				endParallel()
			}
			parallelMode()
		}
	}

	function $eh20(down, flags, x, y) {
		if (down && (flags&MB_LEFT)) {
			let lp1, opcode, reg
			let instr
			let s = "saveanim.php?state="
			for (lp1=0; lp1<32; lp1++) {
				instr=$g[78].instruction[lp1]
				opcode=(instr.vIns<<24)|(instr.vRdt<<16)|(instr.vRs1<<8)|(instr.vRs2)
				s=sprintf("%si%d='0x%08X' ", s, lp1, opcode)
			}
			for (lp1=0; lp1<4; lp1++) {
				reg=$g[102][lp1].value
				s=sprintf("%sr%d='0x%02X' ", s, lp1, reg)
			}
			for (lp1=0; lp1<4; lp1++) {
				reg=$g[173][lp1].value
				s=sprintf("%sm%d='0x%02X' ", s, lp1, reg)
			}
			s=sprintf("%speMode='%d' bpMode='%d' liMode='%d' afMode='%d' sfMode='%d' zfMode='%d'", s, $g[28], $g[29], $g[30], $g[31], $g[32], $g[33])
			getURL(s)
		}
		return 0
	}

	function $eh21(down, flags, x, y) {
		if (down && (flags&MB_LEFT))
		getURL("https://www.scss.tcd.ie/Jeremy.Jones/VivioJS/vivio.htm")
		return 0
	}

	function $eh22(down, flags, $2, $3) {
		if (down && (flags&MB_LEFT))
		getURL("showanim.php")
	}

	function $eh23(enter, x, y) {
		$g[77].setBrush(enter ? $g[8] : $g[12])
		$g[77].setTxtPen(enter ? $g[3] : $g[1])
		return 0
	}

	function $eh24(down, flags, x, y) {
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
				$g[38] = 0
				$g[39] = getTitle()
				if (!($g[39]=="Hart 2")) {
					$pc = 1
					continue
				}
				$g[34]=HART_2
				isHart2()
				$g[35]=1
				$pc = 1
			case 1:
				getMessage()
				$g[40] = newArray(40)
				$g[40][NOP]="NOP"
				$g[40][ADD]="ADD"
				$g[40][SUB]="SUB"
				$g[40][AND]="AND"
				$g[40][OR]="OR"
				$g[40][XOR]="XOR"
				$g[40][SLL]="SLL"
				$g[40][SRL]="SRL"
				$g[40][SLT]="SLT"
				$g[40][SGT]="SGT"
				$g[40][SLE]="SLE"
				$g[40][SGE]="SGE"
				$g[40][ADDi]="ADDi"
				$g[40][SUBi]="SUBi"
				$g[40][ANDi]="ANDi"
				$g[40][ORi]="ORi"
				$g[40][XORi]="XORi"
				$g[40][SLLi]="SLLi"
				$g[40][SRLi]="SRLi"
				$g[40][SLTi]="SLTi"
				$g[40][SGTi]="SGTi"
				$g[40][SLEi]="SLEi"
				$g[40][SGEi]="SGEi"
				$g[40][LD]="LD"
				$g[40][ST]="ST"
				$g[40][BEQ]="BEQ"
				$g[40][BNE]="BNE"
				$g[40][BLT]="BLT"
				$g[40][BGE]="BGE"
				$g[40][J]="J"
				$g[40][JAL]="JAL"
				$g[40][JR]="JR"
				$g[40][JALR]="JALR"
				$g[40][MUL]="MUL"
				$g[40][DIV]="DIV"
				$g[40][REM]="REM"
				$g[40][LR]="LR"
				$g[40][SC]="SC"
				$g[40][HALT]="HALT"
				$g[40][STALL]="STALL"
				$g[40][EMPTY]="EMPTY"
				$g[41] = new SolidBrush(BORDEAU)
				$g[42] = new SolidBrush(WHITE)
				$g[43] = new SolidPen(DOT, 1, rgba(0.75, 0.75, 0.75))
				$g[44] = new SolidPen(SOLID, 1, RED, ARROW60_END)
				$g[45] = new SolidBrush(PURPLE)
				$g[46] = new SolidBrush(WHITE)
				$g[47] = new SolidBrush(LIGHT_BLUE)
				$g[48] = new Font("Calibri", 9)
				$g[49] = new SolidBrush(WHITE)
				$g[50] = new SolidPen(SOLID, 1, RED, ROUND_START|ROUND_JOIN|ROUND_END)
				$g[51] = new SolidPen(SOLID, 1, GREEN, ROUND_START|ROUND_JOIN|ROUND_END)
				$g[52] = new SolidPen(SOLID, 1, ORANGE, ROUND_START|ROUND_JOIN|ROUND_END)
				$g[53] = new SolidBrush(WHITE)
				$g[54] = new SolidBrush(GRAY224)
				$g[55] = getArg("name", "")
				if (!($g[55]!="")) {
					$pc = 2
					continue
				}
				$g[55]=sprintf(":  %s", $g[55])
				$pc = 2
			case 2:
				$g[56] = new Font("Calibri", 20, SMALLCAPS|ITALIC)
				$g[57] = new Rectangle2($g[0], 0, HLEFT, 0, new SolidBrush(DARK_BLUE), 0, 10, 200, 30, $g[4], $g[56], sprintf(" RISC-V ANIMATION %s", $g[55]))
				$g[58] = new SolidPen(DASH, 1, DARK_BLUE, ROUND_START|ROUND_JOIN|ROUND_END)
				new Line2($g[0], 0, ABSOLUTE, $g[58], 110, 80, 740, 80)
				new Line2($g[0], 0, ABSOLUTE, $g[58], 110, 440, 740, 440)
				new Line2($g[0], 0, ABSOLUTE, $g[58], 110, 80, 110, 440)
				$g[59] = new Line2($g[0], 0, ABSOLUTE, $g[58], 240, 80, 240, 440)
				$g[60] = new Line2($g[0], 0, ABSOLUTE, $g[58], 390, 80, 390, 440)
				$g[61] = new Line2($g[0], 0, ABSOLUTE, $g[58], 590, 80, 590, 440)
				$g[62] = new Line2($g[0], 0, ABSOLUTE, $g[58], 690, 80, 690, 440)
				new Line2($g[0], 0, ABSOLUTE, $g[58], 740, 80, 740, 440)
				$g[63] = new SolidPen(DOT, THIN, BLACK)
				new Line2($g[0], 0, ABSOLUTE, $g[63], 10, 450, 700, 450)
				$g[64] = new Font("Calibri", 10, BOLD)
				$g[65] = new Button(20, 460, 70, 20, "Save Configuration", BUTTON_SP)
				$g[66] = new Button(100, 460, 70, 20, "Pipelining Enabled", BUTTON_PE)
				$g[67] = new Button(180, 460, 70, 20, "Branch Prediction", BUTTON_BP)
				$g[68] = new Button(260, 460, 70, 20, "Load Interlock", BUTTON_LI)
				$g[69] = new Button(340, 460, 70, 20, "ALU Forwarding", BUTTON_AF)
				$g[70] = new Button(420, 460, 70, 20, "Store Operand\nForwarding", BUTTON_SF)
				$g[71] = new Button(500, 460, 70, 20, "Zero Forwarding", BUTTON_ZF)
				$g[72] = new Button(580, 460, 70, 20, "Parallel", BUTTON_PAR)
				$g[73] = new Image($g[0], 0, 0, 0, "vivio.png", 660, 460, 0, 0, LOGOW, LOGOH)
				new Txt($g[0], 0, HLEFT|VTOP, 0, 46, $g[2], $g[17], "instructions executed:")
				$g[74] = new Txt($g[0], 0, HLEFT|VTOP, 0, 56, $g[2], $g[17], "ticks:")
				$g[75] = new Txt($g[0], 0, HLEFT|VTOP, 80, 46, $g[3], $g[17], "0")
				$g[76] = new Txt($g[0], 0, HLEFT|VTOP, 80, 56, $g[3], $g[17], "0")
				$g[77] = new Rectangle2($g[0], 0, 0, 0, 0, 0, 68, 100, 10, 0, $g[17], "Instruction Cache")
				$g[78] = new InstructionMemory(0, 80, 100, 320)
				$g[79] = new AnimatedClock($g[0], 0, 410, 80, 30)
				$g[80] = new Register(200, 210, 20, 40, TOP, "PC")
				$g[81] = new Rectangle2($g[0], 0, 0, 0, 0, 150, 85, 80, 10, 0, $g[17], "Branch Target Buffer")
				$g[82] = newArray(2)
				$g[82][0]=new Register(150, 100, 40, 20, LEFT, "PC")
				$g[82][1]=new Register(150, 120, 40, 20, LEFT, "PC")
				$g[83] = newArray(2)
				$g[83][0]=new Register(190, 100, 40, 20, RIGHT, "PPC")
				$g[83][1]=new Register(190, 120, 40, 20, RIGHT, "PPC")
				$g[84] = new Component(200, 170, 30, 10, "mux 2")
				$g[85] = new Component(170, 205, 10, 50, "mux 1")
				$g[86] = new Component(160, 270, 20, 10, "+4")
				$g[87] = new AnimPipe()
				$g[87].addPoint(110, 390)
				$g[87].addPoint(250, 390)
				$g[88] = new Rectangle($g[0], $g[21], 0, 0, $g[11], 180, 390, -30, -6, 60, 12, $g[4], $g[17])
				$g[88].setRounded(2, 2)
				$g[89] = new AnimPipe()
				$g[89].addPoint(210, 250)
				$g[89].addPoint(210, 320)
				$g[89].addPoint(110, 320)
				$g[90] = new AnimPipe()
				$g[90].addPoint(300, 170)
				$g[90].addPoint(300, 160)
				$g[90].addPoint(150, 160)
				$g[90].addPoint(150, 215)
				$g[90].addPoint(170, 215)
				$g[91] = new AnimPipe()
				$g[91].addPoint(150, 120)
				$g[91].addPoint(140, 120)
				$g[91].addPoint(140, 225)
				$g[91].addPoint(170, 225)
				$g[92] = new AnimPipe()
				$g[92].addPoint(240, 50)
				$g[92].addPoint(130, 50)
				$g[92].addPoint(130, 235)
				$g[92].addPoint(170, 235)
				$g[93] = new AnimPipe()
				$g[93].addPoint(160, 275)
				$g[93].addPoint(120, 275)
				$g[93].addPoint(120, 245)
				$g[93].addPoint(170, 245)
				$g[94] = new AnimPipe()
				$g[94].addPoint(180, 230)
				$g[94].addPoint(200, 230)
				$g[95] = new AnimPipe()
				$g[95].addPoint(210, 210)
				$g[95].addPoint(210, 180)
				$g[96] = new AnimPipe()
				$g[96].addPoint(210, 250)
				$g[96].addPoint(210, 275)
				$g[96].addPoint(180, 275)
				$g[97] = new AnimPipe()
				$g[97].addPoint(220, 230)
				$g[97].addPoint(240, 230)
				$g[97].addPoint(240, 230)
				$g[98] = new AnimPipe()
				$g[98].addPoint(215, 170)
				$g[98].addPoint(215, 140)
				$g[99] = new AnimPipe()
				$g[99].addPoint(270, 390)
				$g[99].addPoint(390, 390)
				$g[100] = new InstructionRegister(250, 350, 20, 85, "ID")
				$g[101] = new Register(250, 210, 20, 40, TOP, "PC1")
				new Txt($g[0], 0, HLEFT|VTOP, 480, 40, 0, $g[17], "Register\nFile")
				$g[102] = newArray(NUM_REGS)
				$g[103] = 240
				$g[104] = 25
				$g[105] = TOP
				$g[185]=0
				$pc = 3
			case 3:
				if (!($g[185]<NUM_REGS)) {
					$pc = 6
					continue
				}
				if (!($g[185]==(NUM_REGS/2))) {
					$pc = 4
					continue
				}
				$g[105]=BOTTOM
				$g[103]=240
				$g[104]+=REG_HEIGHT
				$pc = 4
			case 4:
				$g[106] = "x"+$g[185].toString()
				$g[102][$g[185]]=new Register($g[103], $g[104], REG_WIDTH, REG_HEIGHT, $g[105], $g[106])
				$g[103]+=REG_WIDTH
				$pc = 5
			case 5:
				$g[185]++
				$pc = 3
				continue
			case 6:
				$g[107] = new Component(275, 170, 50, 10, "mux 3")
				$g[108] = new Component(270, 320, 30, 10, "ADD4")
				$g[109] = new Component(300, 320, 30, 10, "ADDi")
				$g[110] = new Component(250, 100, 10, 40, "mux 4")
				$g[111] = new Component(375, 220, 10, 30, "mux 5")
				new Rectangle2($g[0], 0, 0, 0, 0, 280, 365, 20, 10, 0, $g[17], "4")
				$g[112] = new SolidPen(SOLID, 0, PURPLE, ARROW60_END)
				$g[113] = new SolidPen(SOLID, 2, RED, ARROW60_END)
				$g[114] = new SolidPen(SOLID, MEDIUM, BLACK)
				$g[115] = new Line2($g[0], $g[19], ABSOLUTE, $g[114], 540, 100, 560, 100)
				$g[116] = new Txt($g[0], $g[19], HLEFT|VTOP, 542, 90, 0, $g[17], "zero")
				$g[117] = new Line2($g[0], $g[19], ABSOLUTE, $g[112], 550, 102, 550, 200)
				$g[118] = new Line2($g[0], $g[19], ABSOLUTE, $g[112], 550, 102, 550, 140, 405, 140, 405, 220, 420, 220)
				$g[119] = new Line2($g[0], $g[19], ABSOLUTE, $g[112], 570, 220, 580, 220, 580, 150, 385, 150, 385, 175, 325, 175)
				$g[120] = new AnimPipe()
				$g[120].addPoint(260, 210)
				$g[120].addPoint(260, 200)
				$g[120].addPoint(220, 200)
				$g[120].addPoint(220, 180)
				$g[121] = new AnimPipe()
				$g[121].addPoint(285, 320)
				$g[121].addPoint(285, 240)
				$g[121].addPoint(375, 240)
				$g[122] = new AnimPipe()
				$g[122].addPoint(260, 250)
				$g[122].addPoint(260, 345)
				$g[122].addPoint(290, 345)
				$g[122].addPoint(290, 330)
				$g[123] = new AnimPipe()
				$g[123].addPoint(260, 250)
				$g[123].addPoint(260, 345)
				$g[123].addPoint(310, 346)
				$g[123].addPoint(310, 330)
				$g[124] = new AnimPipe()
				$g[124].addPoint(290, 360)
				$g[124].addPoint(290, 330)
				$g[125] = new AnimPipe()
				$g[125].addPoint(270, 390)
				$g[125].addPoint(320, 390)
				$g[125].addPoint(320, 330)
				$g[126] = new Rectangle($g[0], $g[21], 0, 0, $g[11], 320, 376, -12, -6, 24, 12, $g[4], $g[17])
				$g[126].setRounded(2, 2)
				$g[127] = new AnimPipe()
				$g[127].addPoint(295, 320)
				$g[127].addPoint(295, 180)
				$g[128] = new Rectangle($g[0], $g[21], 0, 0, $g[11], 285, 200, -12, -6, 24, 12, $g[4], $g[17])
				$g[128].setRounded(2, 2)
				$g[129] = new AnimPipe()
				$g[129].addPoint(315, 320)
				$g[129].addPoint(315, 310)
				$g[130] = new AnimPipe()
				$g[130].addPoint(307, 300)
				$g[130].addPoint(307, 180)
				$g[131] = new Rectangle($g[0], $g[21], 0, 0, $g[11], 315, 200, -12, -6, 24, 12, $g[4], $g[17])
				$g[131].setRounded(2, 2)
				$g[132] = new AnimPipe()
				$g[132].addPoint(307, 300)
				$g[132].addPoint(307, 240)
				$g[132].addPoint(375, 240)
				$g[133] = new AnimPipe()
				$g[133].addPoint(315, 300)
				$g[133].addPoint(315, 280)
				$g[133].addPoint(345, 280)
				$g[134] = new AnimPipe()
				$g[134].addPoint(360, 270)
				$g[134].addPoint(360, 255)
				$g[134].addPoint(317, 255)
				$g[134].addPoint(317, 180)
				$g[135] = new Component(297, 300, 40, 10, "demux 1")
				$g[136] = new Register(345, 270, 30, 20, LEFT, "M")
				$g[136].rotateLabel(90)
				$g[137] = new AnimPipe()
				$g[137].addPoint(300, 170)
				$g[137].addPoint(300, 130)
				$g[137].addPoint(260, 130)
				$g[138] = new Rectangle($g[0], $g[21], 0, 0, $g[11], 300, 160, -12, -6, 24, 12, $g[4], $g[17])
				$g[138].setRounded(2, 2)
				$g[139] = new AnimPipe()
				$g[139].addPoint(250, 120)
				$g[139].addPoint(230, 120)
				$g[140] = new AnimPipe()
				$g[140].addPoint(240, 60)
				$g[140].addPoint(220, 60)
				$g[140].addPoint(220, 83)
				$g[140].addPoint(280, 83)
				$g[140].addPoint(280, 110)
				$g[140].addPoint(260, 110)
				$g[141] = new Rectangle($g[0], $g[21], 0, 0, $g[11], 300, 44, -12, 0, 24, 12, $g[4], $g[17])
				$g[142] = new AnimPipe()
				$g[142].addPoint(385, 240)
				$g[142].addPoint(420, 240)
				$g[143] = new AnimPipe()
				$g[143].addPoint(360, 75)
				$g[143].addPoint(360, 230)
				$g[143].addPoint(375, 230)
				$g[144] = new Rectangle($g[0], $g[21], 0, 0, $g[11], 340, 82, -12, 0, 24, 12, $g[4], $g[17], "R0:0")
				$g[144].setRounded(2, 2)
				$g[145] = new AnimPipe()
				$g[145].addPoint(375, 75)
				$g[145].addPoint(375, 210)
				$g[145].addPoint(420, 210)
				$g[146] = new Rectangle($g[0], $g[21], 0, 0, $g[11], 370, 82, -12, 0, 24, 12, $g[4], $g[17], "R0:0")
				$g[146].setRounded(2, 2)
				$g[147] = new InstructionRegister(390, 350, 20, 85, "EX")
				$g[148] = new Register(420, 190, 20, 40, TOP, "A")
				$g[149] = new Register(420, 230, 20, 40, BOTTOM, "B")
				$g[150] = new Component(500, 180, 10, 50, "mux 6")
				$g[151] = new Component(500, 230, 10, 50, "mux 7")
				$g[152] = new Component(500, 310, 10, 40, "mux 8")
				$g[153] = new ALU(530, 190, 40, 80)
				$g[154] = new AnimPipe()
				$g[154].addPoint(410, 390)
				$g[154].addPoint(610, 390)
				$g[155] = new AnimPipe()
				$g[155].addPoint(610, 210)
				$g[155].addPoint(610, 170)
				$g[155].addPoint(470, 170)
				$g[155].addPoint(470, 190)
				$g[155].addPoint(500, 190)
				$g[156] = new AnimPipe()
				$g[156].addPoint(710, 210)
				$g[156].addPoint(710, 160)
				$g[156].addPoint(460, 160)
				$g[156].addPoint(460, 200)
				$g[156].addPoint(500, 200)
				$g[157] = new AnimPipe()
				$g[157].addPoint(440, 220)
				$g[157].addPoint(500, 220)
				$g[158] = new AnimPipe()
				$g[158].addPoint(440, 240)
				$g[158].addPoint(500, 240)
				$g[159] = new AnimPipe()
				$g[159].addPoint(410, 390)
				$g[159].addPoint(450, 390)
				$g[159].addPoint(450, 250)
				$g[159].addPoint(500, 250)
				$g[160] = new Rectangle($g[0], $g[21], 0, 0, $g[11], 432, 370, -10, 0, 20, 12, $g[4], $g[17], "IMM")
				$g[160].setRounded(2, 2)
				$g[161] = new AnimPipe()
				$g[161].addPoint(710, 250)
				$g[161].addPoint(710, 300)
				$g[161].addPoint(460, 300)
				$g[161].addPoint(460, 260)
				$g[161].addPoint(500, 260)
				$g[162] = new AnimPipe()
				$g[162].addPoint(610, 250)
				$g[162].addPoint(610, 290)
				$g[162].addPoint(470, 290)
				$g[162].addPoint(470, 270)
				$g[162].addPoint(500, 270)
				$g[163] = new AnimPipe()
				$g[163].addPoint(610, 250)
				$g[163].addPoint(610, 290)
				$g[163].addPoint(470, 290)
				$g[163].addPoint(470, 320)
				$g[163].addPoint(500, 320)
				$g[164] = new AnimPipe()
				$g[164].addPoint(710, 250)
				$g[164].addPoint(710, 300)
				$g[164].addPoint(460, 300)
				$g[164].addPoint(460, 330)
				$g[164].addPoint(500, 330)
				$g[165] = new AnimPipe()
				$g[165].addPoint(435, 270)
				$g[165].addPoint(435, 340)
				$g[165].addPoint(500, 340)
				$g[166] = new AnimPipe()
				$g[166].addPoint(510, 330)
				$g[166].addPoint(600, 330)
				$g[167] = new AnimPipe()
				$g[167].addPoint(510, 205)
				$g[167].addPoint(530, 205)
				$g[168] = new AnimPipe()
				$g[168].addPoint(510, 255)
				$g[168].addPoint(530, 255)
				$g[169] = new AnimPipe()
				$g[169].addPoint(570, 240)
				$g[169].addPoint(600, 240)
				$g[170] = new InstructionRegister(610, 350, 20, 85, "MA")
				$g[171] = new Register(600, 210, 20, 40, TOP, "O0")
				$g[172] = new Register(600, 320, 40, 20, RIGHT, "SMR")
				new Txt($g[0], $g[19], HLEFT|VTOP, 633, 100, 0, $g[17], "memory\naddress")
				new Txt($g[0], $g[19], HLEFT|VTOP, 685, 320, 0, $g[17], "memory\ndata-in")
				new Txt($g[0], $g[19], HLEFT|VTOP, 695, 100, 0, $g[17], "memory\ndata-out")
				new Txt($g[0], 0, HLEFT|VTOP, 645, 35, 0, $g[17], "Data\nCache\n(memory)")
				$g[173] = newArray(4)
				$g[173][0]=new Register(560, 30, 40, 20, LEFT, "M0")
				$g[173][1]=new Register(560, 50, 40, 20, LEFT, "M1")
				$g[173][2]=new Register(600, 30, 40, 20, RIGHT, "M2")
				$g[173][3]=new Register(600, 50, 40, 20, RIGHT, "M3")
				$g[174] = new Stack(760, 60)
				if (!($g[35]==1)) {
					$pc = 7
					continue
				}
				$g[174].setAll(0)
				$pc = 7
			case 7:
				$g[175] = new Component(670, 210, 10, 40, "mux 9")
				$g[176] = new AnimPipe()
				$g[176].addPoint(630, 390)
				$g[176].addPoint(700, 390)
				$g[177] = new AnimPipe()
				$g[177].addPoint(620, 230)
				$g[177].addPoint(670, 230)
				$g[178] = new AnimPipe()
				$g[178].addPoint(680, 230)
				$g[178].addPoint(700, 230)
				$g[179] = new AnimPipe()
				$g[179].addPoint(620, 230)
				$g[179].addPoint(630, 230)
				$g[179].addPoint(630, 110)
				$g[179].addPoint(760, 110)
				$g[180] = new AnimPipe()
				$g[180].addPoint(640, 330)
				$g[180].addPoint(760, 330)
				$g[181] = new AnimPipe()
				$g[181].addPoint(760, 90)
				$g[181].addPoint(650, 90)
				$g[181].addPoint(650, 220)
				$g[181].addPoint(670, 220)
				$g[182] = new InstructionRegister(700, 350, 20, 85, "WB")
				$g[183] = new Register(700, 210, 20, 40, TOP, "O1")
				$g[184] = new AnimPipe()
				$g[184].addPoint(720, 230)
				$g[184].addPoint(730, 230)
				$g[184].addPoint(730, 10)
				$g[184].addPoint(470, 10)
				$g[184].addPoint(470, 25)
				$g[153].txtResult.moveToFront()
				resetCircuit()
				$g[187] = ""
				$g[185]=0
				$pc = 8
			case 8:
				if (!($g[185]<32)) {
					$pc = 10
					continue
				}
				$g[78].setOpcode(4*$g[185], 0)
				$pc = 9
			case 9:
				$g[185]++
				$pc = 8
				continue
			case 10:
				$g[185]=0
				$pc = 11
			case 11:
				if (!($g[185]<4)) {
					$pc = 13
					continue
				}
				$g[187]=sprintf("r%d", $g[185])
				$g[102][$g[185]].setValue(getArgAsNum($g[187], 0))
				$pc = 12
			case 12:
				$g[185]++
				$pc = 11
				continue
			case 13:
				$g[185]=0
				$pc = 14
			case 14:
				if (!($g[185]<4)) {
					$pc = 16
					continue
				}
				$g[187]=sprintf("m%d", $g[185])
				$g[173][$g[185]].setValue(getArgAsNum($g[187], 0))
				$pc = 15
			case 15:
				$g[185]++
				$pc = 14
				continue
			case 16:
				setTPS(20)
				$g[16]=getArgAsNum("example", 0)
				if (!($g[16]==0)) {
					$pc = 20
					continue
				}
				$g[185]=0
				$pc = 17
			case 17:
				if (!($g[185]<32)) {
					$pc = 19
					continue
				}
				$g[187]=sprintf("i%d", $g[185])
				$g[78].setOpcode(4*$g[185], getArgAsNum($g[187], 0))
				$pc = 18
			case 18:
				$g[185]++
				$pc = 17
				continue
			case 19:
				$pc = 30
				continue
			case 20:
				if (!($g[16]==1)) {
					$pc = 21
					continue
				}
				$g[78].setValue(0, ADDi, 12, 0, 4)
				$g[78].setValue(4, ADDi, 13, 0, 5)
				$g[78].setValue(8, ST, 12, 2, 0)
				$g[78].setValue(12, SUBi, 2, 2, 4)
				$g[78].setValue(16, JAL, 1, 0, 16)
				$g[78].setValue(20, XOR, 0, 0, 0)
				$g[78].setValue(24, HALT, 0, 0, 0)
				$g[78].setValue(32, ST, 1, 2, 0)
				$g[78].setValue(36, ADD, 8, 0, 2)
				$g[78].setValue(40, SUBi, 2, 2, 4)
				$g[78].setValue(44, SUB, 10, 12, 13)
				$g[78].setValue(48, SUBi, 2, 2, 4)
				$g[78].setValue(52, SUBi, 2, 2, 4)
				$g[78].setValue(56, JAL, 1, 0, 24)
				$g[78].setValue(60, LD, 1, 8, 0)
				$g[78].setValue(64, ADDi, 2, 2, 12)
				$g[78].setValue(68, JALR, 0, 0, 1)
				$g[78].setValue(80, ST, 1, 2, 0)
				$g[78].setValue(84, ADD, 9, 0, 2)
				$g[78].setValue(88, SUBi, 2, 2, 4)
				$g[78].setValue(92, ST, 8, 2, 0)
				$g[78].setValue(96, SUBi, 2, 2, 4)
				$g[78].setValue(100, ADD, 8, 0, 9)
				$g[78].setValue(104, LD, 1, 8, 0)
				$g[78].setValue(108, LD, 8, 8, -4)
				$g[78].setValue(112, ADDi, 2, 2, 8)
				$g[78].setValue(116, JALR, 0, 0, 1)
				$pc = 29
				continue
			case 21:
				if (!($g[16]==2)) {
					$pc = 22
					continue
				}
				$g[78].setValue(0, ADDi, 1, 0, 9)
				$g[78].setValue(4, SC, 1, 0, 28)
				$g[78].setValue(8, LR, 3, 0, 28)
				$pc = 28
				continue
			case 22:
				if (!($g[16]==3)) {
					$pc = 23
					continue
				}
				$g[78].setValue(0, ADDi, 1, 0, 3)
				$g[78].setValue(4, SC, 1, 0, 28)
				$g[78].setValue(8, LR, 4, 0, 28)
				$g[78].setValue(24, SC, 1, 0, 28)
				$pc = 27
				continue
			case 23:
				if (!($g[16]==4)) {
					$pc = 24
					continue
				}
				$g[78].setValue(0, ADDi, 1, 0, 13)
				$g[78].setValue(4, ADDi, 2, 0, 4)
				$g[78].setValue(8, DIV, 3, 1, 2)
				$pc = 26
				continue
			case 24:
				if (!($g[16]==5)) {
					$pc = 25
					continue
				}
				$g[78].setValue(0, ADDi, 1, 0, 3)
				$g[78].setValue(4, ADDi, 2, 0, 2)
				$g[78].setValue(8, MUL, 3, 1, 2)
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
				$pc = 30
			case 30:
				if (!($g[16]>0)) {
					$pc = 34
					continue
				}
				$g[185]=0
				$pc = 31
			case 31:
				if (!($g[185]<32)) {
					$pc = 33
					continue
				}
				$g[187]=sprintf("i%d", $g[185])
				setArg($g[187], $g[78].getOpcode($g[185]*4).toString())
				$pc = 32
			case 32:
				$g[185]++
				$pc = 31
				continue
			case 33:
				$g[16]=($g[16]>maxexample) ? 0 : $g[16]
				$pc = 34
			case 34:
				$g[188] = getArgAsNum("haltOnHalt", 1)
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
				$g[102][2].setValue(68)
				if (!($g[34]==HART_1)) {
					$pc = 35
					continue
				}
				$g[174].setSP(68)
				$pc = 35
			case 35:
				$g[195] = 1
				$g[196] = 0
				$g[197] = 0
				$g[198] = 0
				$g[199] = 1
				$g[200] = CHECK
				$g[202] = 0
				$g[203] = 0
				$g[209] = 1
				$g[211] = new Rectangle2($g[0], 0, 0, $g[4], $g[12], 20, 20, 1, 1, $g[1], $g[17], sprintf(""))
				$g[211].addEventHandler("eventMessage", this, $eh12)
				$g[66].label.addEventHandler("eventMB", this, $eh13)
				$g[67].label.addEventHandler("eventMB", this, $eh14)
				$g[68].label.addEventHandler("eventMB", this, $eh15)
				$g[69].label.addEventHandler("eventMB", this, $eh16)
				$g[70].label.addEventHandler("eventMB", this, $eh17)
				$g[71].label.addEventHandler("eventMB", this, $eh18)
				$g[72].label.addEventHandler("eventMB", this, $eh19)
				$g[65].label.addEventHandler("eventMB", this, $eh20)
				$g[73].addEventHandler("eventMB", this, $eh21)
				$g[57].addEventHandler("eventMB", this, $eh22)
				$g[77].addEventHandler("eventEE", this, $eh23)
				$g[77].addEventHandler("eventMB", this, $eh24)
				callf(377, $obj)
				continue
			case 36:
				returnf(0)
				continue
			case 37:
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
				$pc = 38
			case 38:
				$obj.r2.setBrush($g[12])
				returnf(0)
				continue
			case 39:
				enterf(0);	// update
				$obj.value=$obj.newValue
				$obj.tag=$obj.newTag
				$obj.updateLabel()
				$obj.bg1.setBrush($g[13])
				$obj.bg2.setBrush($g[13])
				if (wait(16))
				return
				$pc = 40
			case 40:
				$obj.bg1.setBrush($g[12])
				$obj.bg2.setBrush($g[12])
				returnf(0)
				continue
			case 41:
				enterf(1);	// store
				$stack[$fp+1] = floor(($stack[$fp-3]/4))%MEMORY_ADDRESSES
				$obj.stack[$stack[$fp+1]].setNewValue($stack[$fp-4])
				callf(39, $obj.stack[$stack[$fp+1]])
				continue
			case 42:
				returnf(2)
				continue
			case 43:
				enterf(5);	// animate
				$stack[$fp+1] = 0, $stack[$fp+3] = 0
				$stack[$fp+4] = 0
				$obj.calcLength()
				$obj.fgLine.setPt(0, $obj.px[0], $obj.py[0])
				$obj.fgLine.setPen($obj.fgPen0)
				$stack[$fp+5] = 1
				$pc = 44
			case 44:
				if (!($stack[$fp+5]<$obj.n)) {
					$pc = 47
					continue
				}
				$obj.fgLine.setPt($stack[$fp+5], $obj.px[$stack[$fp+5]-1], $obj.py[$stack[$fp+5]-1])
				$stack[$fp+1]+=$obj.ls[$stack[$fp+5]-1]
				$stack[$fp+2]=round($stack[$fp+1]*$stack[$fp-3]/$obj.ll)
				if ($obj.fgLine.setPt($stack[$fp+5], $obj.px[$stack[$fp+5]], $obj.py[$stack[$fp+5]], $stack[$fp+2]-$stack[$fp+3], 1, 1))
				return
				$pc = 45
			case 45:
				$stack[$fp+3]=$stack[$fp+2]
				$pc = 46
			case 46:
				$stack[$fp+5]++
				$pc = 44
				continue
			case 47:
				if (!($obj.head)) {
					$pc = 48
					continue
				}
				$obj.fgLine.setPen($obj.fgPen1)
				$pc = 48
			case 48:
				returnf(1)
				continue
			case 49:
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
				$pc = 50
			case 50:
				$obj.prev_clock.translate(-$obj.chw, 0, $stack[$fp+1], 1, 0)
				$obj.next_clock.translate(-$obj.chw, 0, $stack[$fp+1], 1, 0)
				$obj.dot.translate(0, $obj.ch, $stack[$fp+2], 1, 0)
				if (wait($stack[$fp+3]))
				return
				$pc = 51
			case 51:
				$obj.canUpdate=1
				$obj.prev_clock.translate(2*$obj.cw, 0)
				$obj.prev_clock.setPen($obj.stall ? ($obj.type ? $g[52] : $g[50]) : $g[51])
				if (wait($stack[$fp+2]*2))
				return
				$pc = 52
			case 52:
				$stack[$fp+4] = $obj.next_clock
				$obj.next_clock=$obj.prev_clock
				$obj.prev_clock=$stack[$fp+4]
				if (!($obj.stall)) {
					$pc = 53
					continue
				}
				$obj.stall--
				$pc = 53
			case 53:
				returnf(1)
				continue
			case 54:
				enterf(0);	// ifExec
				if (!(($g[25]==NO_STALL) || ($g[25]==CTRL_STALL))) {
					$pc = 55
					continue
				}
				fork(39, $g[80])
				$g[78].setActive($g[80].newValue)
				$pc = 55
			case 55:
				if (wait(8))
				return
				$pc = 56
			case 56:
				if (!(($g[29]==BRANCH_PREDICTION) && (btbIndex($g[80].value)!=-1))) {
					$pc = 57
					continue
				}
				$g[26]=btbIndex($g[80].value)
				$g[80].setNewValue($g[83][$g[26]].value)
				$g[189]=$g[91]
				$pc = 58
				continue
			case 57:
				$g[80].setNewValue(($g[80].value+4)&127)
				$g[189]=$g[93]
				$pc = 58
			case 58:
				$g[101].setNewValue($g[80].value)
				$g[100].setNewInstruction($g[78].instruction[$g[80].value/4])
				if (wait(8))
				return
				$pc = 59
			case 59:
				fork(43, $g[97], 64)
				fork(43, $g[89], 24)
				fork(43, $g[96], 24)
				if (!(($g[29]==BRANCH_PREDICTION) && (instrIsJump($g[100].vIns)))) {
					$pc = 65
					continue
				}
				if (!($g[25]==CTRL_STALL)) {
					$pc = 61
					continue
				}
				callf(43, $g[95], 12)
				continue
			case 60:
				$pc = 63
				continue
			case 61:
				callf(43, $g[120], 12)
				continue
			case 62:
				$pc = 63
			case 63:
				callf(43, $g[98], 12)
				continue
			case 64:
				$pc = 67
				continue
			case 65:
				if (wait(24))
				return
				$pc = 66
			case 66:
				$pc = 67
			case 67:
				fork(43, $g[87], 40)
				if (!(($g[29]==BRANCH_PREDICTION) && (btbIndex($g[80].value)!=-1))) {
					$pc = 68
					continue
				}
				$g[82][btbIndex($g[80].value)].highlight($g[23])
				$g[83][btbIndex($g[80].value)].highlight($g[23])
				$pc = 68
			case 68:
				$g[88].setTxt($g[100].getNewInstrTxt())
				if ($g[88].setOpacity(1, 16, 1, 1))
				return
				$pc = 69
			case 69:
				callf(43, $g[189], 16)
				continue
			case 70:
				callf(43, $g[94], 8)
				continue
			case 71:
				returnf(0)
				continue
			case 72:
				enterf(0);	// sendBTBOperands
				callf(43, $g[191], 18)
				continue
			case 73:
				callf(43, $g[139], 6)
				continue
			case 74:
				returnf(0)
				continue
			case 75:
				enterf(1);	// idExec
				if (!($g[25]==NO_STALL)) {
					$pc = 76
					continue
				}
				fork(39, $g[101])
				fork(37, $g[100])
				$pc = 76
			case 76:
				if (!($g[198]==1)) {
					$pc = 77
					continue
				}
				$g[100].setNewValue(STALL, 0, 0, 0)
				$g[198]=0
				$pc = 77
			case 77:
				if (!($g[27] && ($g[29]==BRANCH_PREDICTION))) {
					$pc = 78
					continue
				}
				fork(39, $g[82][$g[26]])
				fork(39, $g[83][$g[26]])
				$pc = 78
			case 78:
				if (wait(16))
				return
				$pc = 79
			case 79:
				fork(43, $g[99], 64)
				if (!(instrIsBranch($g[100].vIns))) {
					$pc = 85
					continue
				}
				fork(43, $g[122], 16)
				fork(43, $g[124], 16)
				fork(43, $g[123], 16)
				fork(43, $g[125], 16)
				fork(43, $g[145], 16)
				fork(43, $g[143], 16)
				if (wait(12))
				return
				$pc = 80
			case 80:
				$g[126].setTxt("%02X", $g[100].vRs2)
				$g[126].setOpacity(1)
				if (wait(4))
				return
				$pc = 81
			case 81:
				fork(43, $g[127], 8)
				fork(43, $g[129], 8)
				if (wait(2))
				return
				$pc = 82
			case 82:
				fork(43, $g[133], 8)
				$g[102][$g[100].vRs1].highlight($g[23])
				$g[148].setNewValue($g[102][$g[100].vRs1].value)
				$g[102][$g[100].vRdt].highlight($g[23])
				$g[149].setNewValue($g[102][$g[100].vRdt].value)
				fork(43, $g[142], 5)
				if (wait(4))
				return
				$pc = 83
			case 83:
				$g[136].setNewValue($g[101].value+$g[100].vRs2)
				callf(39, $g[136])
				continue
			case 84:
				$pc = 100
				continue
			case 85:
				if (!(isJorJAL($g[100].vIns))) {
					$pc = 94
					continue
				}
				if (!($g[100].vIns==JAL)) {
					$pc = 86
					continue
				}
				fork(43, $g[122], 16)
				fork(43, $g[124], 16)
				$pc = 86
			case 86:
				if (!($g[25]==NO_STALL)) {
					$pc = 91
					continue
				}
				fork(43, $g[123], 16)
				fork(43, $g[125], 16)
				if (wait(12))
				return
				$pc = 87
			case 87:
				$g[126].setTxt("%02X", $g[100].vRs2)
				$g[126].setOpacity(1)
				if (wait(4))
				return
				$pc = 88
			case 88:
				fork(43, $g[129], 8)
				if (wait(2))
				return
				$pc = 89
			case 89:
				callf(43, $g[130], 8)
				continue
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
				$pc = 99
				continue
			case 94:
				if (!($g[100].vIns==JALR)) {
					$pc = 96
					continue
				}
				fork(43, $g[122], 32)
				fork(43, $g[124], 32)
				if (wait(24))
				return
				$pc = 95
			case 95:
				$pc = 98
				continue
			case 96:
				if (wait(24))
				return
				$pc = 97
			case 97:
				$pc = 98
			case 98:
				$pc = 99
			case 99:
				$pc = 100
			case 100:
				if (wait(9))
				return
				$pc = 101
			case 101:
				if (!(instrIsJump($g[100].vIns) || instrIsBranch($g[147].vIns))) {
					$pc = 102
					continue
				}
				calcNewPC()
				$pc = 102
			case 102:
				if (!(instrIsJumpR($g[100].vIns) && ($g[25]==NO_STALL))) {
					$pc = 103
					continue
				}
				$g[141].setTxt("%02X", $g[193])
				$g[141].setOpacity(1, 8, 1, 0)
				$pc = 103
			case 103:
				if (!(instrIsBranchOrJump($g[100].vIns))) {
					$pc = 104
					continue
				}
				fork(72, $obj)
				$pc = 104
			case 104:
				detectStall()
				$g[197]=0
				if (!((instrIsJump($g[100].vIns) || instrIsBranch($g[147].vIns)) && ($g[25]!=DATA_STALL))) {
					$pc = 105
					continue
				}
				updBTB()
				$pc = 105
			case 105:
				if (!($g[25]==NO_STALL)) {
					$pc = 106
					continue
				}
				$g[147].setNewValue($g[100].vIns, $g[100].vRdt, $g[100].vRs1, $g[100].vRs2)
				$pc = 108
				continue
			case 106:
				if (!($g[198]==0 && $g[202]==0)) {
					$pc = 107
					continue
				}
				$g[147].setNewValue(STALL, 0, 0, 0)
				$pc = 107
			case 107:
				$pc = 108
			case 108:
				if (wait(7))
				return
				$pc = 109
			case 109:
				if (!(instrIsBranch($g[100].vIns)==0)) {
					$pc = 126
					continue
				}
				if (!(instrOpTypeRdt($g[100].vIns)==OP_TYPE_REG)) {
					$pc = 125
					continue
				}
				if (!(instrIsJumpAndLink($g[100].vIns))) {
					$pc = 116
					continue
				}
				if (!($g[25]==NO_STALL)) {
					$pc = 112
					continue
				}
				$g[148].setNewValue(0)
				$g[149].setNewValue(($g[101].value+4)&127)
				callf(43, $g[121], 18)
				continue
			case 110:
				callf(43, $g[142], 6)
				continue
			case 111:
				$pc = 115
				continue
			case 112:
				$g[148].setNewValue(0)
				$g[149].setNewValue(($g[101].value+$g[100].vRs2)&127)
				callf(43, $g[132], 18)
				continue
			case 113:
				callf(43, $g[142], 6)
				continue
			case 114:
				$pc = 115
			case 115:
				$pc = 124
				continue
			case 116:
				$g[102][$g[100].vRs1].highlight($g[23])
				$g[148].setNewValue($g[102][$g[100].vRs1].value)
				if (!(instrOpTypeRs2($g[100].vIns)==OP_TYPE_REG)) {
					$pc = 117
					continue
				}
				$g[102][$g[100].vRs2].highlight($g[23])
				$g[149].setNewValue($g[102][$g[100].vRs2].value)
				$pc = 118
				continue
			case 117:
				$g[102][$g[100].vRdt].highlight($g[23])
				$g[149].setNewValue($g[102][$g[100].vRdt].value)
				$pc = 118
			case 118:
				$g[146].setTxt("R%d:%02X", $g[100].vRs1, $g[102][$g[100].vRs1].value)
				$g[146].setOpacity(1)
				fork(43, $g[145], 5)
				if (!(instrIsBranch($g[100].vIns))) {
					$pc = 120
					continue
				}
				fork(43, $g[143], 5)
				callf(43, $g[142], 5)
				continue
			case 119:
				$pc = 120
			case 120:
				if (!((!instrIsArRI($g[100].vIns)) && ($g[100].vIns!=LD))) {
					$pc = 123
					continue
				}
				$stack[$fp+1] = ($g[100].vIns==ST) ? $g[100].vRdt : $g[100].vRs2
				$g[144].setTxt("R%d:%02X", $stack[$fp+1], $g[102][$stack[$fp+1]].value)
				$g[144].setOpacity(1)
				callf(43, $g[143], 18)
				continue
			case 121:
				callf(43, $g[142], 6)
				continue
			case 122:
				$pc = 123
			case 123:
				$pc = 124
			case 124:
				$pc = 125
			case 125:
				$pc = 126
			case 126:
				returnf(0)
				continue
			case 127:
				enterf(7);	// exExec
				fork(37, $g[147])
				if (!(!instrIsNop($g[147].nIns))) {
					$pc = 128
					continue
				}
				fork(39, $g[148])
				fork(39, $g[149])
				$pc = 128
			case 128:
				if (wait(8))
				return
				$pc = 129
			case 129:
				$g[170].setNewValue($g[147].vIns, $g[147].vRdt, $g[147].vRs1, $g[147].vRs2)
				if (!(instrOpTypeRdt($g[147].vIns)==OP_TYPE_REG)) {
					$pc = 201
					continue
				}
				if (!(instrIsMulti($g[147].vIns))) {
					$pc = 139
					continue
				}
				if (!($g[147].vIns==MUL)) {
					$pc = 131
					continue
				}
				$g[202]=1
				if (!($g[199]==0)) {
					$pc = 130
					continue
				}
				$stack[$fp+1]=0
				$pc = 130
			case 130:
				$pc = 138
				continue
			case 131:
				if (!($g[199]==0)) {
					$pc = 137
					continue
				}
				if (!($g[200]==CHECK)) {
					$pc = 132
					continue
				}
				$stack[$fp+1]=$g[155]
				$stack[$fp+4]=$g[171].value
				$pc = 136
				continue
			case 132:
				if (!($g[200]==EXEC)) {
					$pc = 135
					continue
				}
				if (!($g[203]==0)) {
					$pc = 133
					continue
				}
				$stack[$fp+1]=$g[156]
				$stack[$fp+4]=$g[183].value
				$pc = 134
				continue
			case 133:
				$stack[$fp+1]=0
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
				$pc = 139
			case 139:
				if (!(instrIsJumpAndLink($g[147].vIns))) {
					$pc = 140
					continue
				}
				$stack[$fp+1]=0
				$stack[$fp+4]=0
				$pc = 149
				continue
			case 140:
				if (!($g[31]==ALU_FORWARDING)) {
					$pc = 146
					continue
				}
				if (!(!(instrIsMulti($g[147].vIns) && $g[199]==0))) {
					$pc = 145
					continue
				}
				if (!($g[171].tagMatches($g[147].vRs1))) {
					$pc = 141
					continue
				}
				$stack[$fp+1]=$g[155]
				$stack[$fp+4]=$g[171].value
				$pc = 144
				continue
			case 141:
				if (!($g[183].tagMatches($g[147].vRs1))) {
					$pc = 142
					continue
				}
				$stack[$fp+1]=$g[156]
				$stack[$fp+4]=$g[183].value
				$pc = 143
				continue
			case 142:
				$stack[$fp+1]=$g[157]
				$stack[$fp+4]=$g[148].value
				$pc = 143
			case 143:
				$pc = 144
			case 144:
				$pc = 145
			case 145:
				$pc = 148
				continue
			case 146:
				if (!(!(instrIsMulti($g[147].vIns) && $g[199]==0))) {
					$pc = 147
					continue
				}
				$stack[$fp+1]=$g[157]
				$stack[$fp+4]=$g[148].value
				$pc = 147
			case 147:
				$pc = 148
			case 148:
				$pc = 149
			case 149:
				if (!(instrIsJumpAndLink($g[147].vIns))) {
					$pc = 150
					continue
				}
				$stack[$fp+2]=$g[158]
				$stack[$fp+5]=$g[149].value
				$pc = 169
				continue
			case 150:
				if (!(instrOpTypeRs2($g[147].vIns)==OP_TYPE_IMM)) {
					$pc = 159
					continue
				}
				if (!(instrIsBranch($g[147].vIns))) {
					$pc = 157
					continue
				}
				if (!($g[31]==ALU_FORWARDING)) {
					$pc = 155
					continue
				}
				if (!($g[171].tagMatches($g[147].vRdt))) {
					$pc = 151
					continue
				}
				$stack[$fp+2]=$g[162]
				$stack[$fp+5]=$g[171].value
				$pc = 154
				continue
			case 151:
				if (!($g[183].tagMatches($g[147].vRdt))) {
					$pc = 152
					continue
				}
				$stack[$fp+2]=$g[161]
				$stack[$fp+5]=$g[183].value
				$pc = 153
				continue
			case 152:
				$stack[$fp+2]=$g[158]
				$stack[$fp+5]=$g[149].value
				$pc = 153
			case 153:
				$pc = 154
			case 154:
				$pc = 156
				continue
			case 155:
				$stack[$fp+2]=$g[158]
				$stack[$fp+5]=$g[149].value
				$pc = 156
			case 156:
				$pc = 158
				continue
			case 157:
				$stack[$fp+2]=$g[159]
				$stack[$fp+5]=$g[147].vRs2
				$pc = 158
			case 158:
				$pc = 168
				continue
			case 159:
				if (!($g[31]==ALU_FORWARDING)) {
					$pc = 165
					continue
				}
				if (!(!(instrIsMulti($g[147].vIns) && $g[199]==0))) {
					$pc = 164
					continue
				}
				if (!($g[171].tagMatches($g[147].vRs2))) {
					$pc = 160
					continue
				}
				$stack[$fp+2]=$g[162]
				$stack[$fp+5]=$g[171].value
				$pc = 163
				continue
			case 160:
				if (!($g[183].tagMatches($g[147].vRs2))) {
					$pc = 161
					continue
				}
				$stack[$fp+2]=$g[161]
				$stack[$fp+5]=$g[183].value
				$pc = 162
				continue
			case 161:
				$stack[$fp+2]=$g[158]
				$stack[$fp+5]=$g[149].value
				$pc = 162
			case 162:
				$pc = 163
			case 163:
				$pc = 164
			case 164:
				$pc = 167
				continue
			case 165:
				if (!(!(instrIsMulti($g[147].vIns) && $g[199]==0))) {
					$pc = 166
					continue
				}
				$stack[$fp+2]=$g[158]
				$stack[$fp+5]=$g[149].value
				$pc = 166
			case 166:
				$pc = 167
			case 167:
				$pc = 168
			case 168:
				$pc = 169
			case 169:
				$stack[$fp+6] = 0
				if (!(instrIsMulti($g[147].vIns))) {
					$pc = 188
					continue
				}
				if (!($g[147].vIns==MUL)) {
					$pc = 177
					continue
				}
				if (!($g[199]==1)) {
					$pc = 172
					continue
				}
				if (!(($stack[$fp+4]>15) || ($stack[$fp+5]>15))) {
					$pc = 170
					continue
				}
				$g[210]=0
				$pc = 171
				continue
			case 170:
				$g[210]=1
				$pc = 171
			case 171:
				$g[117].setPen($g[113])
				$g[206]=$stack[$fp+4]
				$g[207]=0
				$g[208]=$stack[$fp+5]
				calcNoCycles($stack[$fp+4])
				$g[199]=0
				$g[205]=0
				$stack[$fp+6]=$stack[$fp+4]
				$pc = 176
				continue
			case 172:
				if (!($g[210]==1)) {
					$pc = 173
					continue
				}
				booth()
				$stack[$fp+6]=$g[206]
				$pc = 174
				continue
			case 173:
				booth8()
				$stack[$fp+6]=$g[206]
				$pc = 174
			case 174:
				$g[204]--
				if (!($g[204]<=0)) {
					$pc = 175
					continue
				}
				$g[202]=0
				$pc = 175
			case 175:
				$pc = 176
			case 176:
				$pc = 187
				continue
			case 177:
				if (!($g[199]==1)) {
					$pc = 178
					continue
				}
				$g[117].setPen($g[113])
				$g[206]=0
				$g[208]=$stack[$fp+5]
				$stack[$fp+6]=$stack[$fp+4]
				$g[199]=0
				$g[202]=1
				$g[200]=CHECK
				$pc = 186
				continue
			case 178:
				if (!($g[203]==0)) {
					$pc = 183
					continue
				}
				if (!($g[200]==CHECK)) {
					$pc = 181
					continue
				}
				$stack[$fp+6]=instrExecute(SLT, $stack[$fp+4], $g[208])
				if (!($stack[$fp+6]==1)) {
					$pc = 180
					continue
				}
				$g[203]=1
				if (!($g[147].vIns==REM)) {
					$pc = 179
					continue
				}
				$g[202]=0
				$pc = 179
			case 179:
				$pc = 180
			case 180:
				$g[200]=EXEC
				$pc = 182
				continue
			case 181:
				$stack[$fp+6]=instrExecute(SUB, $stack[$fp+4], $g[208])
				$g[200]=CHECK
				$g[206]+=1
				$pc = 182
			case 182:
				$pc = 185
				continue
			case 183:
				if (!($g[147].vIns==DIV)) {
					$pc = 184
					continue
				}
				$stack[$fp+6]=$g[206]
				$pc = 184
			case 184:
				$g[202]=0
				$pc = 185
			case 185:
				$pc = 186
			case 186:
				$pc = 187
			case 187:
				$pc = 189
				continue
			case 188:
				$stack[$fp+6]=instrExecute($g[147].vIns, $stack[$fp+4], $stack[$fp+5])
				$pc = 189
			case 189:
				if (!(($g[147].vRdt==0)&(instrIsBranch($g[147].vIns)==0))) {
					$pc = 190
					continue
				}
				$stack[$fp+6]=0
				$pc = 190
			case 190:
				if (!(instrIsBranch($g[147].vIns)==0)) {
					$pc = 191
					continue
				}
				$g[171].setNewValue($stack[$fp+6])
				$g[197]=0
				$pc = 192
				continue
			case 191:
				$g[197]=$stack[$fp+6]
				$pc = 192
			case 192:
				if (!(instrIsLoadOrStore($g[147].vIns))) {
					$pc = 193
					continue
				}
				$g[171].setNewTag(-1)
				$pc = 200
				continue
			case 193:
				if (!(($g[147].vIns==DIV || $g[147].vIns==REM) && $g[199]==0)) {
					$pc = 198
					continue
				}
				if (!($g[200]==EXEC)) {
					$pc = 196
					continue
				}
				if (!($g[203]==0)) {
					$pc = 194
					continue
				}
				$g[171].setNewTag(0)
				$pc = 195
				continue
			case 194:
				$g[171].setNewTag($g[147].vRdt)
				$pc = 195
			case 195:
				$pc = 197
				continue
			case 196:
				$g[171].setNewTag($g[147].vRdt)
				$pc = 197
			case 197:
				$pc = 199
				continue
			case 198:
				$g[171].setNewTag($g[147].vRdt)
				$pc = 199
			case 199:
				$pc = 200
			case 200:
				$g[171].setInvalid(0)
				$pc = 203
				continue
			case 201:
				if (!($g[147].vIns==NOP)) {
					$pc = 202
					continue
				}
				$g[171].setInvalid(1)
				$g[171].updateLabel()
				$pc = 202
			case 202:
				$pc = 203
			case 203:
				if (!(($g[147].vIns==ST) || ($g[147].vIns==SC))) {
					$pc = 210
					continue
				}
				if (!($g[32]==FORWARDING_TO_SMDR)) {
					$pc = 208
					continue
				}
				if (!($g[171].tagMatches($g[147].vRdt))) {
					$pc = 204
					continue
				}
				$stack[$fp+3]=$g[163]
				$g[172].setNewValue($g[171].value)
				$pc = 207
				continue
			case 204:
				if (!($g[183].tagMatches($g[147].vRdt))) {
					$pc = 205
					continue
				}
				$stack[$fp+3]=$g[164]
				$g[172].setNewValue($g[183].value)
				$pc = 206
				continue
			case 205:
				$stack[$fp+3]=$g[165]
				$g[172].setNewValue($g[149].value)
				$pc = 206
			case 206:
				$pc = 207
			case 207:
				$pc = 209
				continue
			case 208:
				$stack[$fp+3]=$g[165]
				$g[172].setNewValue($g[149].value)
				$pc = 209
			case 209:
				$pc = 210
			case 210:
				if (wait(8))
				return
				$pc = 211
			case 211:
				fork(43, $g[154], 64)
				if (!(($g[147].vIns==ST) || ($g[147].vIns==SC))) {
					$pc = 212
					continue
				}
				fork(43, $stack[$fp+3], 24)
				$pc = 212
			case 212:
				if (!(instrOpTypeRdt($g[147].vIns)==OP_TYPE_REG)) {
					$pc = 215
					continue
				}
				if (!($stack[$fp+1]!=0)) {
					$pc = 213
					continue
				}
				fork(43, $stack[$fp+1], 24)
				$pc = 213
			case 213:
				if (!($stack[$fp+2]==$g[159])) {
					$pc = 214
					continue
				}
				$g[160].setTxt("%02X", $stack[$fp+5])
				$g[160].setOpacity(1)
				$pc = 214
			case 214:
				fork(43, $stack[$fp+2], 24)
				$pc = 215
			case 215:
				if (wait(24))
				return
				$pc = 216
			case 216:
				if (!(($g[147].vIns==ST) || ($g[147].vIns==SC))) {
					$pc = 217
					continue
				}
				fork(43, $g[166], 40)
				$pc = 217
			case 217:
				if (!(instrOpTypeRdt($g[147].vIns)==OP_TYPE_REG)) {
					$pc = 233
					continue
				}
				if (!($g[147].vIns==MUL)) {
					$pc = 218
					continue
				}
				$g[153].txtOp.setTxt($g[204].toString())
				$g[153].txtOp.setOpacity(1)
				$pc = 219
				continue
			case 218:
				$g[153].setTxtOp($g[147].vIns)
				$pc = 219
			case 219:
				if (!($stack[$fp+1]!=0)) {
					$pc = 220
					continue
				}
				fork(43, $g[167], 10)
				$pc = 220
			case 220:
				if (!(instrIsMulti($g[147].vIns) && $g[199]==1)) {
					$pc = 222
					continue
				}
				if (!($g[147].vIns==MUL)) {
					$pc = 221
					continue
				}
				$g[199]=0
				$pc = 221
			case 221:
				$pc = 224
				continue
			case 222:
				if (!(!instrIsMulti($g[147].vIns))) {
					$pc = 223
					continue
				}
				fork(43, $g[168], 10)
				$pc = 223
			case 223:
				$pc = 224
			case 224:
				if (!(instrIsBranch($g[147].vIns))) {
					$pc = 227
					continue
				}
				if (wait(5))
				return
				$pc = 225
			case 225:
				if (!($g[197]==1)) {
					$pc = 226
					continue
				}
				$g[119].setPen($g[113])
				$pc = 226
			case 226:
				$pc = 232
				continue
			case 227:
				if (!((($g[147].vIns==DIV) || ($g[147].vIns==REM)) && ($g[199]==1))) {
					$pc = 228
					continue
				}
				$pc = 228
			case 228:
				if (wait(20))
				return
				$pc = 229
			case 229:
				callf(43, $g[169], 10)
				continue
			case 230:
				if (wait(10))
				return
				$pc = 231
			case 231:
				$g[153].txtResult.setTxt("%02X", $stack[$fp+6])
				$g[153].txtResult.setOpacity(1, 20, 1, 0)
				$pc = 232
			case 232:
				$pc = 233
			case 233:
				if (!($g[35]==0)) {
					$pc = 242
					continue
				}
				if (!($g[147].vIns==JAL)) {
					$pc = 234
					continue
				}
				$stack[$fp+7] = $g[174].spAddr
				$g[174].currFrame++
				$g[174].frames[$g[174].currFrame-1].setStart($stack[$fp+7])
				$g[174].setSP($stack[$fp+7])
				$pc = 234
			case 234:
				if (!($g[147].vIns==JALR)) {
					$pc = 235
					continue
				}
				$g[174].clearFrame()
				$pc = 235
			case 235:
				if (!((instrOpTypeRdt($g[147].vIns)==OP_TYPE_REG) && (instrIsLoadOrStore($g[147].vIns)==0))) {
					$pc = 241
					continue
				}
				if (!(($g[147].vRdt==2 && $g[170].vRdt==8) && $g[170].vIns==LD)) {
					$pc = 236
					continue
				}
				$g[196]=1
				$pc = 240
				continue
			case 236:
				if (!($g[147].vRdt==2)) {
					$pc = 237
					continue
				}
				$g[174].setSP($stack[$fp+6])
				$pc = 239
				continue
			case 237:
				if (!($g[147].vRdt==8)) {
					$pc = 238
					continue
				}
				$g[174].setFP($stack[$fp+6])
				$pc = 238
			case 238:
				$pc = 239
			case 239:
				$pc = 240
			case 240:
				$pc = 241
			case 241:
				$pc = 242
			case 242:
				returnf(0)
				continue
			case 243:
				enterf(1);	// maExec
				fork(37, $g[170])
				if (!(instrOpTypeRdt($g[170].nIns)==OP_TYPE_REG)) {
					$pc = 244
					continue
				}
				fork(39, $g[171])
				$pc = 244
			case 244:
				if (!(($g[170].nIns==ST) || ($g[170].nIns==SC))) {
					$pc = 245
					continue
				}
				fork(39, $g[172])
				$pc = 245
			case 245:
				if (wait(8))
				return
				$pc = 246
			case 246:
				$g[182].setNewValue($g[170].vIns, $g[170].vRdt, $g[170].vRs1, $g[170].vRs2)
				if (!((instrOpTypeRdt($g[170].vIns)==OP_TYPE_REG) && ($g[170].vIns!=ST) && ($g[170].vIns!=SC))) {
					$pc = 250
					continue
				}
				if (!(($g[170].vIns==LD) || ($g[170].vIns==LR))) {
					$pc = 248
					continue
				}
				if (!($g[35]==0)) {
					$pc = 247
					continue
				}
				$g[183].setNewValue($g[174].getVal($g[171].value))
				$pc = 247
			case 247:
				$g[183].setNewTag($g[170].vRdt)
				$pc = 249
				continue
			case 248:
				$g[183].setNewValue($g[171].value)
				$g[183].setNewTag($g[171].tag)
				$pc = 249
			case 249:
				$g[183].setInvalid(0)
				$pc = 250
			case 250:
				if (wait(8))
				return
				$pc = 251
			case 251:
				fork(43, $g[176], 64)
				if (!(($g[170].vIns==ST) || ($g[170].vIns==SC))) {
					$pc = 256
					continue
				}
				fork(43, $g[180], 24)
				callf(43, $g[179], 24)
				continue
			case 252:
				if (!($g[35]==0)) {
					$pc = 254
					continue
				}
				callf(41, $g[174], $g[171].value, $g[172].value)
				continue
			case 253:
				$pc = 255
				continue
			case 254:
				$stack[$fp+1] = $g[34].toString()
				sendToMem($stack[$fp+1], ", ", $g[170].vIns.toString(), ", ", $g[171].value.toString(), ", ", $g[172].value.toString())
				$pc = 255
			case 255:
				$pc = 274
				continue
			case 256:
				if (!(instrOpTypeRdt($g[170].vIns)==OP_TYPE_REG)) {
					$pc = 273
					continue
				}
				if (!(($g[170].vIns==LD) || ($g[170].vIns==LR))) {
					$pc = 264
					continue
				}
				callf(43, $g[179], 24)
				continue
			case 257:
				callf(43, $g[181], 24)
				continue
			case 258:
				if (!($g[35]==0)) {
					$pc = 262
					continue
				}
				$g[174].highlight($g[171].value%MEMORY_ADDRESSES)
				if (!($g[170].vRdt==8)) {
					$pc = 259
					continue
				}
				$g[174].setFP($g[174].getVal($g[171].value))
				$pc = 261
				continue
			case 259:
				if (!($g[170].vRdt==2)) {
					$pc = 260
					continue
				}
				$g[174].setSP($g[174].getVal($g[171].value))
				$pc = 260
			case 260:
				$pc = 261
			case 261:
				$pc = 263
				continue
			case 262:
				$stack[$fp+1]=$g[34].toString()
				sendToMem($stack[$fp+1], ", ", $g[170].vIns.toString(), ", ", $g[171].value.toString(), ", ", $g[172].value.toString())
				$pc = 263
			case 263:
				$pc = 271
				continue
			case 264:
				callf(43, $g[177], 48)
				continue
			case 265:
				if (!($g[35]==0)) {
					$pc = 270
					continue
				}
				if (!($g[196]==1)) {
					$pc = 269
					continue
				}
				if (!($g[170].vRdt==2)) {
					$pc = 266
					continue
				}
				$g[174].setSP($g[171].value)
				$pc = 268
				continue
			case 266:
				if (!($g[170].vRdt==8)) {
					$pc = 267
					continue
				}
				$g[174].setFP($g[171].value)
				$pc = 267
			case 267:
				$pc = 268
			case 268:
				$g[196]=0
				$pc = 269
			case 269:
				$pc = 270
			case 270:
				$pc = 271
			case 271:
				callf(43, $g[178], 16)
				continue
			case 272:
				$pc = 273
			case 273:
				$pc = 274
			case 274:
				returnf(0)
				continue
			case 275:
				enterf(0);	// wbExec
				fork(37, $g[182])
				if (!((instrOpTypeRdt($g[182].nIns)==OP_TYPE_REG) && ($g[182].nIns!=ST))) {
					$pc = 276
					continue
				}
				fork(39, $g[183])
				$pc = 276
			case 276:
				if (wait(8))
				return
				$pc = 277
			case 277:
				if (!((instrOpTypeRdt($g[182].vIns)==OP_TYPE_REG) && ($g[182].vIns!=ST))) {
					$pc = 283
					continue
				}
				if (!($g[183].tag!=0)) {
					$pc = 278
					continue
				}
				$g[102][$g[183].tag].setNewValue($g[183].value)
				$pc = 278
			case 278:
				if (wait(8))
				return
				$pc = 279
			case 279:
				callf(43, $g[184], 24)
				continue
			case 280:
				callf(39, $g[102][$g[183].tag])
				continue
			case 281:
				if (wait(19))
				return
				$pc = 282
			case 282:
				$pc = 285
				continue
			case 283:
				if (wait(67))
				return
				$pc = 284
			case 284:
				$pc = 285
			case 285:
				if (!($g[182].vIns!=STALL && $g[182].vIns!=EMPTY)) {
					$pc = 286
					continue
				}
				$g[37]++
				$g[75].setTxt("%4d", $g[37])
				$pc = 286
			case 286:
				$g[38]++
				$g[76].setTxt("%4d", $g[38])
				returnf(0)
				continue
			case 287:
				enterf(0);	// nonPipelinedBranch
				fork(43, $g[124], 24)
				fork(43, $g[125], 24)
				callf(43, $g[97], 12)
				continue
			case 288:
				fork(43, $g[122], 12)
				fork(43, $g[123], 12)
				if (wait(12))
				return
				$pc = 289
			case 289:
				if (!(instrIsBranch($g[147].vIns))) {
					$pc = 292
					continue
				}
				$g[80].setNewValue($g[136].value&127)
				callf(39, $g[80])
				continue
			case 290:
				callf(43, $g[90], 14)
				continue
			case 291:
				$pc = 302
				continue
			case 292:
				if (!(instrIsJumpR($g[100].vIns))) {
					$pc = 294
					continue
				}
				$g[80].setNewValue(($g[102][$g[100].vRs2].value)&127)
				callf(43, $g[92], 34)
				continue
			case 293:
				$pc = 301
				continue
			case 294:
				if (!(isJorJAL($g[100].vIns))) {
					$pc = 297
					continue
				}
				$g[80].setNewValue(($g[80].value+$g[100].vRs2)&127)
				callf(43, $g[129], 20)
				continue
			case 295:
				callf(43, $g[90], 14)
				continue
			case 296:
				$pc = 300
				continue
			case 297:
				$g[80].setNewValue(($g[80].value+4)&127)
				callf(43, $g[127], 20)
				continue
			case 298:
				callf(43, $g[90], 14)
				continue
			case 299:
				$pc = 300
			case 300:
				$pc = 301
			case 301:
				$pc = 302
			case 302:
				callf(43, $g[94], 6)
				continue
			case 303:
				returnf(0)
				continue
			case 304:
				enterf(5);	// execNonPipelined
				callf(39, $g[80])
				continue
			case 305:
				$g[78].setActive($g[80].newValue)
				callf(43, $g[89], 24)
				continue
			case 306:
				callf(43, $g[87], 40)
				continue
			case 307:
				$g[100].setNewInstruction($g[78].instruction[$g[80].value/4])
				$g[88].setTxt($g[100].getNewInstrTxt())
				$g[88].translate(60/2+70, 0, 20, 1, 0)
				callf(37, $g[100])
				continue
			case 308:
				if (!((instrOpTypeRs2($g[100].vIns)==OP_TYPE_IMM) && (instrOpTypeRdt($g[100].vIns)==OP_TYPE_REG))) {
					$pc = 309
					continue
				}
				fork(43, $g[99], 64)
				$pc = 309
			case 309:
				fork(287, $obj)
				if (wait(24))
				return
				$pc = 310
			case 310:
				if (!(instrIsJumpAndLink($g[100].vIns))) {
					$pc = 313
					continue
				}
				callf(43, $g[121], 20)
				continue
			case 311:
				callf(43, $g[142], 20)
				continue
			case 312:
				$stack[$fp+1]=0
				$stack[$fp+2]=($g[80].value+4)&127
				$pc = 325
				continue
			case 313:
				if (!(instrOpTypeRdt($g[100].vIns)==OP_TYPE_REG)) {
					$pc = 322
					continue
				}
				$stack[$fp+1]=$g[102][$g[100].vRs1].value
				$g[102][$g[100].vRs1].highlight($g[23])
				$g[146].setTxt("R%d:%02X", $g[100].vRs1, $g[102][$g[100].vRs1].value)
				$g[146].setOpacity(1)
				fork(43, $g[145], 40)
				if (!((instrOpTypeRs2($g[100].vIns)==OP_TYPE_REG) || ($g[100].vIns==ST))) {
					$pc = 319
					continue
				}
				if (!(instrOpTypeRs2($g[100].vIns)==OP_TYPE_IMM)) {
					$pc = 314
					continue
				}
				$stack[$fp+2]=$g[102][$g[100].vRdt].value
				$g[102][$g[100].vRdt].highlight($g[23])
				$pc = 315
				continue
			case 314:
				$stack[$fp+2]=$g[102][$g[100].vRs2].value
				$g[102][$g[100].vRs2].highlight($g[23])
				$pc = 315
			case 315:
				if (!((!instrIsArRI($g[100].vIns)) && ($g[100].vIns!=LD))) {
					$pc = 318
					continue
				}
				$stack[$fp+5] = ($g[100].vIns==ST) ? $g[100].vRdt : $g[100].vRs2
				$g[144].setTxt("R%d:%02X", $stack[$fp+5], $g[102][$stack[$fp+5]].value)
				$g[144].setOpacity(1)
				callf(43, $g[143], 20)
				continue
			case 316:
				callf(43, $g[142], 20)
				continue
			case 317:
				$pc = 318
			case 318:
				$pc = 321
				continue
			case 319:
				if (wait(40))
				return
				$pc = 320
			case 320:
				$pc = 321
			case 321:
				$pc = 324
				continue
			case 322:
				if (wait(40))
				return
				$pc = 323
			case 323:
				$pc = 324
			case 324:
				$pc = 325
			case 325:
				if (!(instrOpTypeRdt($g[100].vIns)==OP_TYPE_REG)) {
					$pc = 326
					continue
				}
				$g[153].setTxtOp($g[100].vIns)
				$pc = 326
			case 326:
				if (!($g[100].vIns==ST)) {
					$pc = 331
					continue
				}
				fork(43, $g[165], 40)
				fork(43, $g[157], 40)
				$g[160].setTxt("%02X", $g[100].vRs2)
				$g[160].setOpacity(1)
				callf(43, $g[159], 40)
				continue
			case 327:
				fork(43, $g[166], 40)
				fork(43, $g[168], 10)
				callf(43, $g[167], 10)
				continue
			case 328:
				if (wait(20))
				return
				$pc = 329
			case 329:
				callf(43, $g[169], 10)
				continue
			case 330:
				$stack[$fp+4]=$stack[$fp+2]
				$stack[$fp+3]=instrExecute($g[100].vIns, $stack[$fp+1], $g[100].vRs2)
				$pc = 351
				continue
			case 331:
				if (!(instrIsJumpAndLink($g[100].vIns))) {
					$pc = 336
					continue
				}
				callf(43, $g[158], 40)
				continue
			case 332:
				callf(43, $g[168], 10)
				continue
			case 333:
				$stack[$fp+3]=instrExecute($g[100].vIns, $stack[$fp+1], $stack[$fp+2])
				if (wait(20))
				return
				$pc = 334
			case 334:
				callf(43, $g[169], 10)
				continue
			case 335:
				$pc = 350
				continue
			case 336:
				if (!(instrOpTypeRdt($g[100].vIns)==OP_TYPE_REG)) {
					$pc = 347
					continue
				}
				fork(43, $g[157], 40)
				if (!(instrOpTypeRs2($g[100].vIns)==OP_TYPE_IMM)) {
					$pc = 338
					continue
				}
				$g[160].setTxt("%02X", $g[100].vRs2)
				$g[160].setOpacity(1)
				callf(43, $g[159], 40)
				continue
			case 337:
				$stack[$fp+3]=instrExecute($g[100].vIns, $stack[$fp+1], $g[100].vRs2)
				$pc = 340
				continue
			case 338:
				callf(43, $g[158], 40)
				continue
			case 339:
				$stack[$fp+3]=instrExecute($g[100].vIns, $stack[$fp+1], $stack[$fp+2])
				$pc = 340
			case 340:
				fork(43, $g[168], 10)
				callf(43, $g[167], 10)
				continue
			case 341:
				if (!(instrIsBranch($g[100].vIns))) {
					$pc = 343
					continue
				}
				if (wait(5))
				return
				$pc = 342
			case 342:
				$g[119].setPen($g[113])
				$pc = 346
				continue
			case 343:
				if (wait(20))
				return
				$pc = 344
			case 344:
				callf(43, $g[169], 10)
				continue
			case 345:
				$pc = 346
			case 346:
				$pc = 349
				continue
			case 347:
				if (wait(80))
				return
				$pc = 348
			case 348:
				$pc = 349
			case 349:
				$pc = 350
			case 350:
				$pc = 351
			case 351:
				if (!($g[100].vIns==LD)) {
					$pc = 355
					continue
				}
				callf(43, $g[179], 20)
				continue
			case 352:
				$g[173][($stack[$fp+3])%4].highlight($g[23])
				callf(43, $g[181], 20)
				continue
			case 353:
				callf(43, $g[178], 40)
				continue
			case 354:
				$stack[$fp+3]=$g[173][($stack[$fp+3])%4].value
				$pc = 365
				continue
			case 355:
				if (!($g[100].vIns==ST)) {
					$pc = 358
					continue
				}
				fork(43, $g[180], 20)
				callf(43, $g[179], 20)
				continue
			case 356:
				$g[173][($stack[$fp+3])%4].setNewValue($stack[$fp+4])
				callf(39, $g[173][($stack[$fp+3])%4])
				continue
			case 357:
				$pc = 364
				continue
			case 358:
				if (!(instrOpTypeRdt($g[100].vIns)==OP_TYPE_REG)) {
					$pc = 361
					continue
				}
				callf(43, $g[177], 40)
				continue
			case 359:
				callf(43, $g[178], 40)
				continue
			case 360:
				$pc = 363
				continue
			case 361:
				if (wait(80))
				return
				$pc = 362
			case 362:
				$pc = 363
			case 363:
				$pc = 364
			case 364:
				$pc = 365
			case 365:
				$g[102][0].unHighlight()
				$g[102][1].unHighlight()
				$g[102][2].unHighlight()
				$g[102][3].unHighlight()
				if (!((instrOpTypeRdt($g[100].vIns)==OP_TYPE_REG) && ($g[100].vIns!=ST))) {
					$pc = 369
					continue
				}
				callf(43, $g[184], 40)
				continue
			case 366:
				$g[102][$g[100].vRdt].setNewValue($stack[$fp+3])
				callf(39, $g[102][$g[100].vRdt])
				continue
			case 367:
				if (wait(19))
				return
				$pc = 368
			case 368:
				$pc = 371
				continue
			case 369:
				if (wait(75))
				return
				$pc = 370
			case 370:
				$pc = 371
			case 371:
				$g[38]+=5
				$g[37]++
				$g[75].setTxt("%4d", $g[37])
				$g[76].setTxt("%4d", $g[38])
				returnf(0)
				continue
			case 372:
				enterf(0);	// exec
				$g[102][0].unHighlight()
				$g[102][1].unHighlight()
				$g[102][2].unHighlight()
				$g[102][3].unHighlight()
				$g[173][0].unHighlight()
				$g[173][1].unHighlight()
				$g[173][2].unHighlight()
				$g[173][3].unHighlight()
				$g[82][0].unHighlight()
				$g[82][1].unHighlight()
				$g[83][0].unHighlight()
				$g[83][1].unHighlight()
				if (!($g[28]==PIPELINING_ENABLED)) {
					$pc = 373
					continue
				}
				fork(54, $obj)
				fork(75, $obj)
				fork(127, $obj)
				fork(243, $obj)
				fork(275, $obj)
				$pc = 374
				continue
			case 373:
				fork(304, $obj)
				$pc = 374
			case 374:
				if (wait(8))
				return
				$pc = 375
			case 375:
				resetWires()
				if (wait(($g[28]==PIPELINING_ENABLED) ? 72 : 392))
				return
				$pc = 376
			case 376:
				checkPoint()
				returnf(0)
				continue
			case 377:
				enterf(0);	// run
				if (wait(1))
				return
				$pc = 378
			case 378:
				$g[36]=1
				setlocked()
				$pc = 379
			case 379:
				if (!(1)) {
					$pc = 384
					continue
				}
				fork(49, $g[79], ($g[28]==PIPELINING_ENABLED) ? 80 : 400)
				callf(372, $obj)
				continue
			case 380:
				if (!((($g[182].vIns==HALT) && ($g[28]==PIPELINING_ENABLED)) || (($g[100].vIns==HALT) && ($g[28]==PIPELINING_DISABLED)))) {
					$pc = 382
					continue
				}
				stop()
				if (!($g[188])) {
					$pc = 381
					continue
				}
				$pc = 384
				continue
				$pc = 381
			case 381:
				$pc = 382
			case 382:
				if (wait(1))
				return
				$pc = 383
			case 383:
				$pc = 379
				continue
			case 384:
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
