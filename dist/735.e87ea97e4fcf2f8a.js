"use strict";(self.webpackChunkcodepulse=self.webpackChunkcodepulse||[]).push([[735],{1735:(k,h,a)=>{a.r(h),a.d(h,{CategoryListModule:()=>L});var g=a(6814),c=a(6223),d=a(8145),_=a(7394),C=a(694),v=a(8346),t=a(5879),u=a(900),b=a(5248),m=a(6080),f=a(754);function S(i,l){if(1&i){const e=t.EpF();t.TgZ(0,"img",11),t.NdJ("click",function(){t.CHM(e);const n=t.oxw().$implicit,r=t.oxw();return t.KtG(r.openImage(n.categoryImage))}),t.qZA()}if(2&i){const e=t.oxw().$implicit;t.Q6J("src",e.categoryImage,t.LSH)}}const Z=function(i){return["/admin/categories",i]};function T(i,l){if(1&i){const e=t.EpF();t.TgZ(0,"tr")(1,"td"),t._uU(2),t.qZA(),t.TgZ(3,"td"),t._uU(4),t.qZA(),t.TgZ(5,"td"),t.YNc(6,S,1,1,"img",7),t.qZA(),t.TgZ(7,"td")(8,"div",8)(9,"a",9),t._uU(10,"Edit"),t.qZA(),t.TgZ(11,"a",10),t.NdJ("click",function(){const r=t.CHM(e).$implicit,s=t.oxw();return t.KtG(s.openBanModal(r.id))}),t._uU(12,"Delete"),t.qZA()()()()}if(2&i){const e=l.$implicit;t.xp6(2),t.Oqu(e.categoryName),t.xp6(2),t.Oqu(e.categoryDescription),t.xp6(2),t.Q6J("ngIf",e.categoryImage),t.xp6(3),t.Q6J("routerLink",t.VKq(4,Z,e.id))}}const x=function(){return["/admin/categories/add"]};let F=(()=>{class i{constructor(e,o,n,r,s,y){this.categoryServ=e,this.modalService=o,this.spinService=n,this.toastServ=r,this.location=s,this.spinServ=y,this.subscription=new _.w0}ngOnInit(){this.categoryServ.getAllCategoriesFromFirebase().subscribe({next:e=>{this.categories=e,console.log("this.categories",this.categories)}})}openBanModal(e){this.subscription.add(this.modalService.createModalConfirmSM("",C.b,{title:"Are you sure you want to delete this category?",subTitle:""},{nzClosable:!1,nzCancelText:"Cancel",nzOkText:"Yes, I Confirm",nzOnOk:()=>{this.onDelete(e)}},"confirm"))}onDelete(e){e&&this.categoryServ.deleteCategoryFromFirebase(e).then(()=>{this.toastServ.showToast("success","Category Successfully Deleted !!","top-left",!0)}).catch(o=>{this.spinServ.requestEnded(),console.error("Error when delete category: ",o)})}openImage(e){console.log("content",e),this.subscription.add(this.modalService.createModalMD("",v.B,{imageUrl:e},{nzClosable:!1,nzFooter:null,nzBodyStyle:{height:"max-content"}}).subscribe({next:o=>{}}))}static#t=this.\u0275fac=function(o){return new(o||i)(t.Y36(u.H),t.Y36(b.Z),t.Y36(m.V),t.Y36(f.k),t.Y36(g.Ye),t.Y36(m.V))};static#e=this.\u0275cmp=t.Xpm({type:i,selectors:[["app-category-list"]],decls:20,vars:3,consts:[[1,"container","mt-5","pt-3"],[1,"mt-3"],[1,"d-flex","justify-content-end","mt-3"],[1,"btn","btn-primary",3,"routerLink"],[1,"table-responsive"],[1,"table","table-bordered","mt-3"],[4,"ngFor","ngForOf"],["class","img-fluid","alt","Selected Image","width","50","height","50","style","cursor: pointer;",3,"src","click",4,"ngIf"],[1,"d-flex","m-1"],[1,"btn","btn-light",3,"routerLink"],[1,"btn","btn-danger","m-1",3,"click"],["alt","Selected Image","width","50","height","50",1,"img-fluid",2,"cursor","pointer",3,"src","click"]],template:function(o,n){1&o&&(t.TgZ(0,"div",0)(1,"h1",1),t._uU(2,"Category List"),t.qZA(),t.TgZ(3,"div",2)(4,"a",3),t._uU(5,"Add category"),t.qZA()(),t.ynx(6,4),t.TgZ(7,"table",5)(8,"thead")(9,"tr")(10,"th"),t._uU(11,"categoryName"),t.qZA(),t.TgZ(12,"th"),t._uU(13,"categoryDescription"),t.qZA(),t.TgZ(14,"th"),t._uU(15,"categoryImage"),t.qZA(),t.TgZ(16,"th"),t._uU(17,"Action"),t.qZA()()(),t.TgZ(18,"tbody"),t.YNc(19,T,13,6,"tr",6),t.qZA()(),t.BQk(),t.qZA()),2&o&&(t.xp6(4),t.Q6J("routerLink",t.DdM(2,x)),t.xp6(15),t.Q6J("ngForOf",n.categories))},dependencies:[d.rH,g.sg,g.O5],styles:["@media (max-width: 768px){.table-responsive[_ngcontent-%COMP%]{overflow-x:auto}}"]})}return i})();var p=a(1333);function A(i,l){if(1&i&&t._UZ(0,"img",12),2&i){const e=t.oxw();t.Q6J("src",e.imageFileUrl,t.LSH)}}let I=(()=>{class i{constructor(e,o,n,r){this.categoryServ=e,this.router=o,this.spinServ=n,this.location=r,this.model={categoryName:"",categoryImage:"",categoryDescription:""}}onFormSubmit(){console.log("clicked on form submit"),this.spinServ.requestStarted(),this.categoryServ.createCategoryToFirebase(this.model,this.imageFileEventData).then(()=>{this.spinServ.requestEnded(),this.location.back()}).catch(e=>{this.spinServ.requestEnded(),console.error("Error retrieving post: ",e)})}uploadImage(e){this.imageFileEventData=e;const o=e.target.files[0];if(o){const n=new FileReader;n.readAsDataURL(o),n.onload=()=>{this.imageFileUrl=n.result}}}ngOnDestroy(){this.addCategorySubscription?.unsubscribe()}static#t=this.\u0275fac=function(o){return new(o||i)(t.Y36(u.H),t.Y36(d.F0),t.Y36(m.V),t.Y36(g.Ye))};static#e=this.\u0275cmp=t.Xpm({type:i,selectors:[["app-add-category"]],decls:22,vars:3,consts:[[1,"container"],[1,"mt-3"],[3,"ngSubmit"],["form","ngForm"],[1,"mt-2"],[1,"form-label"],["type","text","id","categoryName","name","categoryName",1,"form-control",3,"ngModel","ngModelChange"],["type","text","id","categoryDescription","name","categoryDescription",1,"form-control",3,"ngModel","ngModelChange"],["for","imageFileUrl",1,"form-label"],["type","file","accept","image/*",3,"change"],["class","img-fluid","alt","Selected Image",3,"src",4,"ngIf"],[1,"btn","btn-primary"],["alt","Selected Image",1,"img-fluid",3,"src"]],template:function(o,n){1&o&&(t.TgZ(0,"div",0)(1,"h1",1),t._uU(2,"Add Category"),t.qZA(),t.TgZ(3,"form",2,3),t.NdJ("ngSubmit",function(){return n.onFormSubmit()}),t.TgZ(5,"div",4)(6,"div",1)(7,"label",5),t._uU(8,"Category Name"),t.qZA(),t.TgZ(9,"input",6),t.NdJ("ngModelChange",function(s){return n.model.categoryName=s}),t.qZA()(),t.TgZ(10,"div",1)(11,"label",5),t._uU(12,"Category Description"),t.qZA(),t.TgZ(13,"input",7),t.NdJ("ngModelChange",function(s){return n.model.categoryDescription=s}),t.qZA()(),t.TgZ(14,"div",1)(15,"label",8),t._uU(16,"Category Image Url "),t.TgZ(17,"input",9),t.NdJ("change",function(s){return n.uploadImage(s)}),t.qZA(),t.YNc(18,A,1,1,"img",10),t.qZA()(),t.TgZ(19,"div",1)(20,"button",11),t._uU(21,"Save"),t.qZA()()()()()),2&o&&(t.xp6(9),t.Q6J("ngModel",n.model.categoryName),t.xp6(4),t.Q6J("ngModel",n.model.categoryDescription),t.xp6(5),t.Q6J("ngIf",n.imageFileUrl))},dependencies:[g.O5,c._Y,c.Fj,c.JJ,c.JL,c.On,c.F]})}return i})();var M=a(4223);function U(i,l){if(1&i&&t._UZ(0,"img",17),2&i){const e=t.oxw(2);t.Q6J("src",e.imageFileUrl,t.LSH)}}function E(i,l){if(1&i){const e=t.EpF();t.TgZ(0,"img",18),t.NdJ("ngModelChange",function(n){t.CHM(e);const r=t.oxw(2);return t.KtG(r.category.categoryImage=n)}),t.qZA()}if(2&i){const e=t.oxw(2);t.Q6J("src",e.category.categoryImage,t.LSH)("ngModel",e.category.categoryImage)}}function N(i,l){if(1&i){const e=t.EpF();t.ynx(0),t.TgZ(1,"form",4,5),t.NdJ("ngSubmit",function(){t.CHM(e);const n=t.oxw();return t.KtG(n.onFormSubmit())}),t.TgZ(3,"div",6)(4,"div",1)(5,"label",7),t._uU(6,"Category Description"),t.qZA(),t.TgZ(7,"input",8),t.NdJ("ngModelChange",function(n){t.CHM(e);const r=t.oxw();return t.KtG(r.category.categoryDescription=n)}),t.qZA()(),t.TgZ(8,"div",1)(9,"label",9),t._uU(10,"Category Name"),t.qZA(),t.TgZ(11,"input",10),t.NdJ("ngModelChange",function(n){t.CHM(e);const r=t.oxw();return t.KtG(r.category.categoryName=n)}),t.qZA()(),t.TgZ(12,"div",1)(13,"label",11),t._uU(14,"Category Image Url "),t.TgZ(15,"input",12),t.NdJ("change",function(n){t.CHM(e);const r=t.oxw();return t.KtG(r.uploadImage(n))}),t.qZA()(),t.YNc(16,U,1,1,"img",13),t.YNc(17,E,1,2,"img",14),t.qZA(),t.TgZ(18,"div",1)(19,"button",15),t.NdJ("click",function(){t.CHM(e);const n=t.oxw();return t.KtG(n.onBack())}),t._uU(20,"Cancel"),t.qZA(),t.TgZ(21,"button",16),t._uU(22,"Save"),t.qZA()()()(),t.BQk()}if(2&i){const e=t.oxw();t.xp6(7),t.Q6J("ngModel",e.category.categoryDescription),t.xp6(4),t.Q6J("ngModel",e.category.categoryName),t.xp6(5),t.Q6J("ngIf",e.imageFileUrl),t.xp6(1),t.Q6J("ngIf",e.category.categoryImage&&!e.imageFileUrl)}}function J(i,l){1&i&&(t.TgZ(0,"div",19),t._uU(1," Category not found! "),t.qZA())}const q=[{path:"",data:{breadcrumb:"Category"},children:[{path:"",component:F,canActivate:[p.G]},{path:"add",component:I,canActivate:[p.G]},{path:":id",component:(()=>{class i{constructor(e,o,n,r,s,y,w){this.route=e,this.categoryServ=o,this.router=n,this.toastServ=r,this.blogPostServ=s,this.spinServ=y,this.location=w,this.id=null}ngOnInit(){this.paramsSubscription=this.route.paramMap.subscribe({next:e=>{this.id=e.get("id"),this.id&&this.categoryServ.getCategoryByIdFromFirebase(this.id).subscribe({next:o=>{this.category=o}})}})}onFormSubmit(){if(this.category&&this.id)if(console.log("(this.category && this.id)",this.category&&this.id),this.imageFileEventData)this.blogPostServ.deleteImageFromFirebase(this.category.categoryImage),this.blogPostServ.uploadImageToFireStore(this.imageFileEventData,this.id).then(o=>{if(this.spinServ.requestStarted(),this.category){var n={categoryDescription:this.category.categoryDescription,categoryImage:o,categoryName:this.category.categoryName};console.log("this.id",this.id),console.log("updateCategoryPost",n),this.categoryServ.updateCategoryToFirebase(this.id,n).then(()=>{this.location.back(),this.spinServ.requestEnded()}).catch(r=>{this.spinServ.requestEnded(),console.error("Error retrieving category: ",r)})}});else if(this.category){var e={categoryDescription:this.category.categoryDescription,categoryImage:this.category.categoryImage,categoryName:this.category.categoryName};console.log("this.id",this.id),console.log("updateCategoryPost",e),this.categoryServ.updateCategoryToFirebase(this.id,e).then(()=>{this.location.back(),this.spinServ.requestEnded()}).catch(o=>{this.spinServ.requestEnded(),console.error("Error retrieving category: ",o)})}}uploadImage(e){this.imageFileEventData=e;const o=e.target.files[0];if(o){const n=new FileReader;n.readAsDataURL(o),n.onload=()=>{this.imageFileUrl=n.result}}}onDelete(){this.id&&this.categoryServ.deleteCategoryFromFirebase(this.id).then(()=>{this.toastServ.showToast("success","Deletedddd !!","top-left",!0),this.location.back()}).catch(e=>{this.spinServ.requestEnded(),console.error("Error when delete category: ",e)})}onBack(){this.location.back()}ngOnDestroy(){this.paramsSubscription?.unsubscribe(),this.editCategorySubscription?.unsubscribe(),this.deleteCategorySubscription?.unsubscribe()}static#t=this.\u0275fac=function(o){return new(o||i)(t.Y36(d.gz),t.Y36(u.H),t.Y36(d.F0),t.Y36(f.k),t.Y36(M.u),t.Y36(m.V),t.Y36(g.Ye))};static#e=this.\u0275cmp=t.Xpm({type:i,selectors:[["app-edit-category"]],decls:6,vars:2,consts:[[1,"container","mt-5","pt-4"],[1,"mt-3"],[4,"ngIf","ngIfElse"],["notFound",""],[3,"ngSubmit"],["form","ngForm"],[1,"mt-2","pb-3"],["for","categoryDescription"],["type","text","id","categoryDescription","name","categoryDescription",1,"form-control",3,"ngModel","ngModelChange"],["for","categoryName"],["type","text","id","categoryName","name","categoryName",1,"form-control",3,"ngModel","ngModelChange"],["for","featuredImageUrl",1,"form-label"],["type","file","accept","image/*",3,"change"],["class","img-fluid","alt","Selected Image",3,"src",4,"ngIf"],["class","img-fluid","alt","Selected Image",3,"src","ngModel","ngModelChange",4,"ngIf"],["type","button",1,"btn","btn-light","ms-3",3,"click"],["type","submit",1,"btn","btn-primary"],["alt","Selected Image",1,"img-fluid",3,"src"],["alt","Selected Image",1,"img-fluid",3,"src","ngModel","ngModelChange"],["role","alert",1,"alert","alert-danger","mb-3"]],template:function(o,n){if(1&o&&(t.TgZ(0,"div",0)(1,"h1",1),t._uU(2,"Edit Category"),t.qZA(),t.YNc(3,N,23,4,"ng-container",2),t.YNc(4,J,2,0,"ng-template",null,3,t.W1O),t.qZA()),2&o){const r=t.MAs(5);t.xp6(3),t.Q6J("ngIf",null==n.category?null:n.category.categoryName)("ngIfElse",r)}},dependencies:[g.O5,c._Y,c.Fj,c.JJ,c.JL,c.On,c.F]})}return i})(),canActivate:[p.G]}]}];let Y=(()=>{class i{static#t=this.\u0275fac=function(o){return new(o||i)};static#e=this.\u0275mod=t.oAB({type:i});static#o=this.\u0275inj=t.cJS({imports:[d.Bz.forChild(q),d.Bz]})}return i})(),L=(()=>{class i{static#t=this.\u0275fac=function(o){return new(o||i)};static#e=this.\u0275mod=t.oAB({type:i});static#o=this.\u0275inj=t.cJS({imports:[Y,g.ez,c.u5,c.UX]})}return i})()}}]);