"use strict";(self.webpackChunkSudokuToy=self.webpackChunkSudokuToy||[]).push([[307],{307:(Y,f,u)=>{u.r(f),u.d(f,{PlaygroundModule:()=>D});var S=u(2271),b=u(2655),e=u(8256),C=u(6066),p=u(7579),r=u(2722),g=u(2047),a=u(6895),l=u(9489);function I(n,i){if(1&n){const t=e.EpF();e.TgZ(0,"li",5),e.NdJ("click",function(s){const m=e.CHM(t).index;return e.oxw().setInputMode(m),e.KtG(s.stopPropagation())}),e._uU(1),e.qZA()}if(2&n){const t=i.$implicit,o=i.index,s=e.oxw();e.ekj("active",s.curInputModeIndex===o),e.xp6(1),e.hij(" ",t.title," ")}}let M=(()=>{class n{constructor(t){this.sudokuService=t,this.inputModes=[],this.curInputMode=null,this.curInputModeIndex=0,this.$destroy=new p.x}ngOnInit(){this.inputModes=this.sudokuService.getInputModes(),this.sudokuService.$curInputModeIndex.pipe((0,r.R)(this.$destroy)).subscribe(t=>{this.curInputModeIndex=t}),this.sudokuService.$curInputMode.pipe((0,r.R)(this.$destroy)).subscribe(t=>{this.curInputMode=t})}setInputMode(t){this.sudokuService.setCurInputModeIndex(t)}ngOnDestroy(){this.$destroy.next(),this.$destroy.complete()}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(g.h))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-input-mode-selector"]],decls:7,vars:2,consts:[["ngbDropdown","",1,"d-inline-block"],["id","dropdown-mode","ngbDropdownToggle","","type","button",1,"btn","btn-sm","btn-light"],["aria-labelledby","dropdown-mode","ngbDropdownMenu","",1,"gap-1","p-2","rounded-3","mx-0","shadow"],[1,"dropdown-header","h6"],["class","rounded-2","ngbDropdownItem","","role","button",3,"active","click",4,"ngFor","ngForOf"],["ngbDropdownItem","","role","button",1,"rounded-2",3,"click"]],template:function(t,o){1&t&&(e.TgZ(0,"div",0)(1,"button",1),e._uU(2),e.qZA(),e.TgZ(3,"ul",2)(4,"li",3),e._uU(5,"Input modes"),e.qZA(),e.YNc(6,I,2,3,"li",4),e.qZA()()),2&t&&(e.xp6(2),e.hij(" ",(null==o.curInputMode?null:o.curInputMode.title)||"Select input mode"," "),e.xp6(4),e.Q6J("ngForOf",o.inputModes))},dependencies:[a.sg,l.jt,l.iD,l.Vi,l.TH]}),n})();var x=u(215),v=u(9957);let T=(()=>{class n{constructor(t,o){this.timerService=t,this.changeDetectorRef=o,this.isRunning=!1,this.isPaused=!1,this.isStopped=!1,this.curTime=0,this.$destroy=new p.x}ngOnInit(){this.timerService.$tick.pipe((0,r.R)(this.$destroy)).subscribe(t=>{this.curTime=t}),this.timerService.$isPaused.pipe((0,r.R)(this.$destroy)).subscribe(t=>{this.isPaused=t}),this.timerService.$isStopped.pipe((0,r.R)(this.$destroy)).subscribe(t=>{this.isStopped=t}),this.timerService.$isRunning.pipe((0,r.R)(this.$destroy)).subscribe(t=>{this.isRunning=t})}ngAfterViewChecked(){this.changeDetectorRef.detectChanges()}start(){this.timerService.startTimer()}pause(){this.timerService.pauseTimer()}stop(){this.timerService.stopTimer()}reset(){this.timerService.resetTimer()}ngOnDestroy(){this.$destroy.next(),this.$destroy.complete()}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(x.f),e.Y36(e.sBO))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-timer"]],decls:13,vars:6,consts:[[1,"d-flex","align-items-center","gap-2"],["role","group",1,"btn-group"],["role","button",1,"btn","btn-primary","btn-sm",3,"disabled","click"],["role","button",1,"btn","btn-light","btn-sm",3,"disabled","click"],["role","button",1,"btn","btn-light","btn-sm",3,"click"]],template:function(t,o){1&t&&(e.TgZ(0,"div",0)(1,"span"),e._uU(2),e.ALo(3,"seconds"),e.qZA(),e.TgZ(4,"div",1)(5,"button",2),e.NdJ("click",function(){return o.start()}),e._uU(6," Play "),e.qZA(),e.TgZ(7,"button",3),e.NdJ("click",function(){return o.pause()}),e._uU(8," Pause "),e.qZA(),e.TgZ(9,"button",3),e.NdJ("click",function(){return o.stop()}),e._uU(10," Stop "),e.qZA(),e.TgZ(11,"button",4),e.NdJ("click",function(){return o.reset()}),e._uU(12," Reset "),e.qZA()()()),2&t&&(e.xp6(2),e.Oqu(e.lcZ(3,4,o.curTime)),e.xp6(3),e.Q6J("disabled",o.isRunning||o.isStopped),e.xp6(2),e.Q6J("disabled",!o.isRunning),e.xp6(2),e.Q6J("disabled",o.isStopped))},dependencies:[v.Y]}),n})();var c=u(7340);const y={opacity:0,transform:"scale(.85)"},_="cubic-bezier(0.4, 0, .1, 1)",$=(0,c.X$)("lightAppear",[(0,c.SB)("void",(0,c.oB)(y)),(0,c.eR)(":enter",[(0,c.jt)(`150ms 0ms ${_}`)]),(0,c.eR)(":leave",[(0,c.jt)(`150ms ${_}`,(0,c.oB)(y))])]);function Z(n,i){if(1&n&&(e.ynx(0),e.TgZ(1,"div",4),e._uU(2),e.qZA(),e.BQk()),2&n){const t=e.oxw();e.xp6(1),e.ekj("text-primary",!t.readonly),e.Q6J("@lightAppear",void 0),e.xp6(1),e.hij(" ",t.inputModes[0].value[t.id]," ")}}function A(n,i){if(1&n&&(e.TgZ(0,"span"),e._uU(1),e.qZA()),2&n){const t=i.$implicit;e.xp6(1),e.hij(" ",t," ")}}function R(n,i){if(1&n&&(e.TgZ(0,"span"),e._uU(1),e.qZA()),2&n){const t=i.$implicit;e.xp6(1),e.hij(" ",t," ")}}function z(n,i){if(1&n&&(e.ynx(0),e.TgZ(1,"div",5),e.YNc(2,A,2,1,"span",6),e.qZA(),e.TgZ(3,"div",7),e.YNc(4,R,2,1,"span",6),e.qZA(),e.BQk()),2&n){const t=e.oxw();e.xp6(2),e.Q6J("ngForOf",t.inputModes[1].value[t.id]),e.xp6(2),e.Q6J("ngForOf",t.inputModes[2].value[t.id])}}let B=(()=>{class n{constructor(t){this.sudokuService=t,this.row=0,this.col=0,this.id=0,this.boxId=0,this.sudokuSize=0,this.selected=!1,this.highlighted=!1,this.readonly=!1,this.inputModes=[],this.curInputMode=null,this.curInputModeIndex=0,this.$destroy=new p.x}ngOnInit(){this.sudokuSize=this.sudokuService.getSize(),this.id=this.sudokuService.computeCellId(this.row,this.col),this.boxId=this.sudokuService.computeBoxId(this.row,this.col),this.sudokuService.$inputModes.pipe((0,r.R)(this.$destroy)).subscribe(t=>{this.inputModes=t}),this.sudokuService.$curInputMode.pipe((0,r.R)(this.$destroy)).subscribe(t=>{this.curInputMode=t}),this.sudokuService.$curInputModeIndex.pipe((0,r.R)(this.$destroy)).subscribe(t=>{this.curInputModeIndex=t}),this.sudokuService.$selectedCellIds.pipe((0,r.R)(this.$destroy)).subscribe(t=>{this.selected=t.includes(this.id)}),this.sudokuService.$highlightedCellIds.pipe((0,r.R)(this.$destroy)).subscribe(t=>{this.highlighted=t.includes(this.id)}),this.sudokuService.$clearCells.pipe((0,r.R)(this.$destroy)).subscribe(()=>{this.clearCell()}),this.sudokuService.$puzzle.pipe((0,r.R)(this.$destroy)).subscribe(t=>{const o=Number(t?.charAt(this.id))||null;o&&(this.sudokuService.writeToInputMode(0,this.id,o),this.readonly=Boolean(o))})}updateSelected(t){t.ctrlKey?(this.sudokuService.updateSelectedCellId(this.id),this.sudokuService.setHighlightedCellIds([])):(this.sudokuService.setSelectedCellIds([this.id]),this.sudokuService.setHighlightedCellIds(this.computeHighlightedCellIds()))}updateInput(t){this.selected&&!this.readonly&&(Number(t.key)&&this.sudokuService.writeToInputMode(this.curInputModeIndex,this.id,Number(t.key)),("Backspace"===t.key||"Delete"===t.key)&&this.sudokuService.writeToInputMode(this.curInputModeIndex,this.id,null))}computeHighlightedCellIds(){let t=new Set,o=0;for(;o<this.sudokuSize;)t.add(o*this.sudokuSize+this.col),o++;let s=0;for(;s<this.sudokuSize;)t.add(s+this.row*this.sudokuSize),s++;return Array.from(t)}clearCell(){for(const t of this.sudokuService.getInputModes())t.updateValue(this.id,null)}ngOnDestroy(){this.$destroy.next(),this.$destroy.complete()}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(g.h))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-sudoku-cell"]],hostBindings:function(t,o){1&t&&e.NdJ("mouseup",function(d){return o.updateSelected(d)})("keyup",function(d){return o.updateInput(d)},!1,e.Jf7)},inputs:{row:"row",col:"col"},decls:5,vars:6,consts:[["role","button",1,"cell","border","d-flex","align-items-center","justify-content-around","hover","no-select","position-relative"],[1,"position-absolute","top-0","start-0","w-100","h-100","bg-opacity-25","bg-primary"],[1,"position-absolute","top-0","start-0","w-100","h-100","bg-opacity-10","bg-primary"],[4,"ngIf"],[1,"d-flex","flex-column","align-items-center","justify-content-around","bg-transparent","p-0","m-0","h3","value"],[1,"position-absolute","top-0","start-0","w-100","h-100","d-flex","flex-row","flex-wrap","align-items-start","justify-content-start","bg-transparent","p-0","m-0","text-primary","corner"],[4,"ngFor","ngForOf"],[1,"position-absolute","top-0","start-0","w-100","h-100","d-flex","flex-row","align-items-center","justify-content-center","bg-transparent","p-0","m-0","text-primary","center",2,"font-size","0.8rem"]],template:function(t,o){1&t&&(e.TgZ(0,"div",0),e._UZ(1,"div",1)(2,"div",2),e.YNc(3,Z,3,4,"ng-container",3),e.YNc(4,z,5,2,"ng-container",3),e.qZA()),2&t&&(e.xp6(1),e.ekj("invisible",!o.selected),e.xp6(1),e.ekj("invisible",!o.highlighted),e.xp6(1),e.Q6J("ngIf",null!=o.inputModes[0].value[o.id]),e.xp6(1),e.Q6J("ngIf",null==o.inputModes[0].value[o.id]))},dependencies:[a.sg,a.O5],styles:[".cell[_ngcontent-%COMP%]{min-width:calc(1.45rem + 2.4vw);min-height:calc(1.45rem + 2.4vw);box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box}.hover[_ngcontent-%COMP%]:hover{background-color:#f5f5f5}.no-select[_ngcontent-%COMP%]{-webkit-touch-callout:none;-webkit-user-select:none;user-select:none}.value[_ngcontent-%COMP%]{font-size:calc(1.3rem + .6vw)}.corner[_ngcontent-%COMP%]{font-size:.65rem}.center[_ngcontent-%COMP%]{font-size:.8rem}"],data:{animation:[$]}}),n})();const O=["finishedModal"];function F(n,i){if(1&n&&(e.ynx(0),e._UZ(1,"app-sudoku-cell",6),e.BQk()),2&n){const t=i.index,o=e.oxw().index,s=e.oxw().index,d=e.oxw().index,m=e.oxw();e.xp6(1),e.Q6J("col",t+s*m.boxWidth)("row",o+d*m.boxHeight)}}const h=function(){return[]};function J(n,i){if(1&n&&(e.ynx(0),e.TgZ(1,"div",4),e.YNc(2,F,2,2,"ng-container",2),e.qZA(),e.BQk()),2&n){const t=e.oxw(3);e.xp6(2),e.Q6J("ngForOf",e.DdM(1,h).constructor(t.boxWidth))}}function P(n,i){if(1&n&&(e.ynx(0),e.TgZ(1,"div",5),e.YNc(2,J,3,2,"ng-container",2),e.qZA(),e.BQk()),2&n){const t=e.oxw(2);e.xp6(2),e.Q6J("ngForOf",e.DdM(1,h).constructor(t.boxHeight))}}function j(n,i){if(1&n&&(e.ynx(0),e.TgZ(1,"div",4),e.YNc(2,P,3,2,"ng-container",2),e.qZA(),e.BQk()),2&n){const t=e.oxw();e.xp6(2),e.Q6J("ngForOf",e.DdM(1,h).constructor(t.horizontalBoxCount))}}function H(n,i){if(1&n){const t=e.EpF();e.TgZ(0,"div",7)(1,"h2",8),e._uU(2,"Congratulations, you finished the puzzle!"),e.qZA()(),e.TgZ(3,"div",9)(4,"p"),e._uU(5," You finished this puzzle in "),e.TgZ(6,"b"),e._uU(7),e.ALo(8,"seconds"),e.qZA(),e._uU(9),e.qZA(),e.TgZ(10,"p",10),e._uU(11," Note, that the puzzle is not checked for its correctness. "),e.qZA(),e.TgZ(12,"button",11),e.NdJ("click",function(){const d=e.CHM(t).$implicit;return e.KtG(d.close("Close click"))}),e._uU(13," Great! "),e.qZA()()}if(2&n){const t=e.oxw();e.xp6(7),e.Oqu(e.lcZ(8,2,t.getFinishedTime())),e.xp6(2),e.hij(", only ",t.getFinishedTime()," seconds, wow! ")}}let N=(()=>{class n{constructor(t,o,s){this.sudokuService=t,this.timerService=o,this.modalService=s,this.finishedModal=null,this.size=0,this.boxWidth=0,this.boxHeight=0,this.verticalBoxCount=0,this.horizontalBoxCount=0,this.curInputMode=null,this.curInputModeIndex=0,this.$destroy=new p.x}ngOnInit(){this.sudokuService.$size.pipe((0,r.R)(this.$destroy)).subscribe(t=>this.size=t),this.sudokuService.$boxWidth.pipe((0,r.R)(this.$destroy)).subscribe(t=>this.boxWidth=t),this.sudokuService.$boxHeight.pipe((0,r.R)(this.$destroy)).subscribe(t=>this.boxHeight=t),this.sudokuService.$verticalBoxCount.pipe((0,r.R)(this.$destroy)).subscribe(t=>this.verticalBoxCount=t),this.sudokuService.$horizontalBoxCount.pipe((0,r.R)(this.$destroy)).subscribe(t=>this.horizontalBoxCount=t),this.sudokuService.$curInputModeIndex.pipe((0,r.R)(this.$destroy)).subscribe(t=>this.curInputModeIndex=t),this.sudokuService.$curInputMode.pipe((0,r.R)(this.$destroy)).subscribe(t=>this.curInputMode=t)}ngAfterViewInit(){this.sudokuService.$finished.pipe((0,r.R)(this.$destroy)).subscribe(()=>{this.openModal(this.finishedModal)})}clearSelection(t){"Escape"===t.key?(this.sudokuService.setSelectedCellIds([]),this.sudokuService.setHighlightedCellIds([])):("Tab"===t.key||" "===t.key)&&this.sudokuService.switchInput()}getFinishedTime(){return this.timerService.getCurrentTime()}openModal(t){!this.modalService.hasOpenModals()&&t&&this.modalService.open(t,{centered:!0,scrollable:!0,modalDialogClass:"modal-content-rounded"})}ngOnDestroy(){this.$destroy.next(),this.$destroy.complete()}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(g.h),e.Y36(x.f),e.Y36(l.FF))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-sudoku"]],viewQuery:function(t,o){if(1&t&&e.Gf(O,5),2&t){let s;e.iGM(s=e.CRH())&&(o.finishedModal=s.first)}},hostBindings:function(t,o){1&t&&e.NdJ("keyup",function(d){return o.clearSelection(d)},!1,e.Jf7)},decls:5,vars:2,consts:[[1,"d-flex","justify-content-center"],[1,"border","border-dark","border-3","d-inline-box","m-0","p-0"],[4,"ngFor","ngForOf"],["finishedModal",""],[1,"d-flex"],[1,"border","border-dark","border-1","d-inline-box","mb-0","p-0"],[3,"col","row"],[1,"modal-header","px-4","pt-4"],[1,"modal-title","fw-bold"],[1,"modal-body","px-4","pb-4"],[1,"fst-italic"],["type","button",1,"btn","btn-lg","btn-primary","mt-4","w-100",3,"click"]],template:function(t,o){1&t&&(e.TgZ(0,"div",0)(1,"div",1),e.YNc(2,j,3,2,"ng-container",2),e.qZA()(),e.YNc(3,H,14,4,"ng-template",null,3,e.W1O)),2&t&&(e.xp6(2),e.Q6J("ngForOf",e.DdM(1,h).constructor(o.verticalBoxCount)))},dependencies:[a.sg,B,v.Y]}),n})();const Q=[{path:"",component:(()=>{class n{constructor(){}}return n.\u0275fac=function(t){return new(t||n)},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-playground"]],decls:7,vars:0,consts:[[1,"d-flex","align-items-center","justify-content-around","flex-wrap"],[1,"d-flex","flex-column","align-items-center","gap-2","overflow-hidden"],[1,"d-flex","flex-row","justify-content-between","align-content-between","flex-wrap","w-100",2,"max-width","80vw","gap","0.5rem 4rem"]],template:function(t,o){1&t&&(e.TgZ(0,"app-page-layout")(1,"div",0)(2,"div",1)(3,"div",2),e._UZ(4,"app-input-mode-selector")(5,"app-timer"),e.qZA(),e._UZ(6,"app-sudoku"),e.qZA()()())},dependencies:[C.w,M,T,N]}),n})()}];let U=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[b.Bz.forChild(Q),b.Bz]}),n})(),D=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[S.m,U,l.XC]}),n})()}}]);