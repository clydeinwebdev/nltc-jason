'use strict';

class App{
	constructor(){
         this.manager = [
		 {
			 "username":"manager",
			 "password":"manageraccount",
			 "profileimage":"http://enadcity.org/enadcity/wp-content/uploads/2017/02/profile-pictures.png"
		 }
		 ];
		 
		 this.categorylist = [
		 {
			 "categoryname":"School Supplies",
		 }
		 ];
		 
		 this.productlist = [
		 {
			 "productname":"HBW 2000 Ballpoint Pen",
			 "category":"School Supplies",
			 "numberofstocks":"70",
			 "price":"225.00"
		 }
		 ];
		 
		 this.customerlist = [
		 {
			 "quantity":"5",
			 "productname":"HBW 2000 Ballpoint Pen",
			 "category":"School Supplies",
			 "price":"225.00",
			 "total":"1125"
		 }
		 ];
		 
		 this.settings = {
			 "currentuser":{} 
		 };
	}
	render(html, component){
		component.innerHTML += html;
	}
  
    reRender(html,component){
        component.innerHTML = html;
    }

	initializeMaterialScripts(){
		$(function(){
			$('.button-collapse').sideNav({
				menuWidth: 300, 
				edge: 'left', 
				closeOnClick: true, 
				draggable: true 
			});

			$('ul.tabs').tabs();		
		});		
	}
	
    initializeSelect(){
		 $(document).ready(function() {
    $('select').material_select();
  });
	}
}

class Component extends App{
	constructor(){
		super();
	}
	
	
	landingPage(){
	
	let html = `
	<div>
	    <nav>
				<!--<a id="menu" href="#" data-activates="slide-out" class="button-collapse hide"><i class="material-icons">menu</i></a>-->
				<div class="nav-wrapper">
					<a href="#" class="brand-logo center" style="font-size: 1.0em;"><h4></h4></a>
				</div>
			</nav>
		
		  <div class="wrapper">
            <div class="form-signin">      
              <center><h5 class="form-signin-heading">LOGIN ACCOUNT HERE</h5></center>
                <input type="text" id="txtusername" class="form-control" name="username" placeholder="Enter Username" autofocus="" /></br>
                <input type="password" id="txtpassword" class="form-control" name="password" placeholder="Enter Password" />      
                <center><button class="waves-effect waves-light btn" onclick="component.verifyLogin()">Login Account</button></center>
            </div>
          </div>
	</div>
        
  	`;
    this.reRender(html,$('#app')[0]);
    }
	
	verifyLogin(){
        let txtusername = $('#txtusername').val();
		let txtpassword = $('#txtpassword').val();
		let msg = "Invalid Manager Account";
		let msg2 = "Invalid Supplier Account";
		let errFlag = true;
		let errFlag2 = true;
		for(let i=0;i<this.manager.length;i++){
			if(txtusername==this.manager[i].username){
				if(txtpassword==this.manager[i].password){
					errFlag = false;
					this.settings.currentuser = this.manager[i]
					break;
				}
				else{
					errFlag = true;
					msg = "Invalid Manager Password";
				}
			}
		}
		
		if(errFlag){
			Materialize.toast(msg, 4000);
		}
		else{
			component.managerPage();
		}
	}
	
	managerPage(){
		let html = `
		   <div id="mainManager"></div>
			<div id="sideManager"></div>
			
			<div class="row">
			  <div class="col s6">
			    </br><center><h5>Category listing</h5></center>
			     <table id="" class="table">
				    <thead>
					  <tr>
					    <th><center>Category name</center></th>
						<th><center>Action</center></th>
					  </tr>
					</thead>
					<tbody id="categorylistinginfo"></tbody>
				 </table>
			  </div>
			  <div class="col s6">
			    <div id="categoryinfo"></div>
			  </div>
			</div>
		`;
	    this.reRender(html,$('#app')[0]);
		this.mainManager();
		this.sideManager();
		this.categorylistinginfo();
		this.initializeMaterialScripts();
	}
	
	categoryListing(){
		let html = `
		    <div id="mainManager"></div>
			<div id="sideManager"></div>
			
			<div class="row">
			  <div class="col s6">
			    </br><center><h5>Category listing</h5></center>
			     <table id="" class="table">
				    <thead>
					  <tr>
					    <th><center>Category name</center></th>
						<th><center>Action</center></th>
					  </tr>
					</thead>
					<tbody id="categorylistinginfo"></tbody>
				 </table>
			  </div>
			  <div class="col s6">
			    <div id="categoryinfo"></div>
			  </div>
			</div>
		`;
		this.reRender(html,$('#app')[0]);
		this.mainManager();
		this.sideManager();
		this.initializeMaterialScripts();
		this.categorylistinginfo();
	}
	
	categorylistinginfo(){
		let html = ``;
		let c = this.categorylist;
		for(let i=0;i<c.length;i++){
			html+=`
			   <tr>
			     <td width="200"><center>${c[i].categoryname}</center></td>
				 <td width="200"><center><button class="waves-effect waves-light btn" onclick="component.categoryinfo(${i})">Category Info</button></center></td>
			   </tr>
			`;
		}
		this.reRender(html,document.getElementById('categorylistinginfo'));
	}
	
	categoryinfo(key){
		let html = "";
		for(let index=0;index<this.categorylist.length;index++){
			if(index==key){
				html += `
				    </br><h5>Category Info</h5></br>
					<div id="categoryinfodetails">
					Category name: ${this.categorylist[key].categoryname}</br></br>
					<button class="btn btn-success" onclick="component.categoryinfoUpdate(${key})">Update</button>
					<button class="btn btn-danger" onclick="component.categoryinfoDelete(${key})">Delete</button>
					</div>
				`;
			}
		}
		this.reRender(html,document.getElementById('categoryinfo'));
	}
	
	categoryinfoUpdate(key){
		let html = `
		    Category name: <input id="updatecategoryname" type="text" value="${this.categorylist[key].categoryname}"></br>
			<button class="btn btn-success" onclick="component.updatecategoryInfo(${key})">Update</button>
		`;
		this.reRender(html,document.getElementById('categoryinfodetails'));
	}
	
	updatecategoryInfo(key){
		let ucn = document.getElementById('updatecategoryname');
		let c = this.categorylist[key];
		let category = {"categoryname":ucn.value};
		this.categorylist[key] = category;
		let details = document.getElementById('categoryinfo');
		details.innerHTML = "";
		this.categorylistinginfo();
	}
	
	categoryinfoDelete(key){
		let table = document.getElementById('categorylistinginfo');
		table.deleteRow(key);
		this.categorylist.splice(key,1);
		let details = document.getElementById('categoryinfo');
		details.innerHTML = "";
		this.categorylistinginfo();
	}
	
	addCategory(){
		let html = `
		    <div id="mainManager"></div>
			<div id="sideManager"></div>
			
			<div class="row">
			  <div class="col s6">
                </br>
			     <h5>ADD CATEGORY FROM THE LIST</h5></br>
			     Category name: <input type="text" id="createcategoryname"></br>
			    <center><button class="waves-effect waves-light btn" onclick="component.createCategory()">Create Category List</button></center>
			  </div>
		`;
		this.reRender(html,$('#app')[0]);
		this.mainManager();
		this.sideManager();
		this.initializeMaterialScripts();
		this.initializeSelect();
	}
	
	addProducts(){
		let html = `
		    <div id="mainManager"></div>
			<div id="sideManager"></div> 
			
			<div class="row">
			  <div class="col s6">
			    </br>
			     <h5>ADD PRODUCT FROM THE LIST</h5></br>
				 Product name: <input type="text" id="createproductname">
				 Category: <select id="createproductcategory">
	             <option value="" disabled selected>Choose your option</option>
		`;
		let c = this.categorylist;
		for(let x=0;x<c.length;x++){
			html+=`
				<option value="${c[x].categoryname}">${c[x].categoryname}</option>
			`;
		}
		html+= `
		   </select>
	       Stock unit: <input type="text" id="createproductstockunit">
		   Product price: <input type="text" id="createproductprice">
		   <center><button class="waves-effect waves-light btn" onclick="component.createProducts()">Create Product List</button></center>
		`;
		
		this.reRender(html,$('#app')[0]);
		this.mainManager();
		this.sideManager();
		this.initializeMaterialScripts();
		this.initializeSelect();
	}
	
	createProducts(){
		let cpn = document.getElementById('createproductname');
		let cpc = document.getElementById('createproductcategory');
		let cpsu = document.getElementById('createproductstockunit');
		let cpp = document.getElementById('createproductprice');
		let product = {"productname":cpn.value,"category":cpc.value,"numberofstocks":cpsu.value,"price":cpp.value};
		this.productlist.push(product);
		cpn.value = cpc.value = cpsu.value = cpp.value = "";
		this.productlistinginfo();
	}
	
	productListing(){
		let html = `
		    <div id="mainManager"></div>
			<div id="sideManager"></div>
			
			<div class="row">
			  <div class="col s8">
			    </br><center><h5>Product listing</h5></center>
			     <table id="" class="table">
				    <thead>
					  <tr>
					    <th><center>Product name</center></th>
						<th><center>Category</center></th>
						<th><center>Number of stocks</center></th>
						<th><center>Price</center></th>
					  </tr>
					</thead>
					<tbody id="productlistinginfo"></tbody>
				 </table>
			  </div>
			  <div class="col s4">
			     <div id="productinfos"></div>
			  </div>
			</div>
		`;
		this.reRender(html,$('#app')[0]);
		this.mainManager();
		this.sideManager();
		this.initializeMaterialScripts();
		this.productlistinginfo();
		this.productinfos();
	}
	
	productlistinginfo(){
		let html = ``;
		let p = this.productlist;
		for(let i=0;i<p.length;i++){
			html+=`
			   <tr>
			     <td><center>${p[i].productname}</center></td>
				 <td><center>${p[i].category}</center></td>
				 <td><center>${p[i].numberofstocks}</center></td>
				 <td><center>${p[i].price}</center></td>
				 <td><center><button class="waves-effect waves-light btn" onclick="component.productinfos(${i})">Category Info</button></center></td>
			   </tr>
			`;
		}
		this.reRender(html,document.getElementById('productlistinginfo'));
	}
	
	productinfos(key){
		let html = ``;
		for(let index=0;index<this.productlist.length;index++){
			if(index==key){
				html+=`
				    </br><h5>Product Info</h5></br>
					<div id="productinfodetails">
					Product name: ${this.productlist[key].productname}</br>
					Category: ${this.productlist[key].category}</br>
					Stock unit: ${this.productlist[key].numberofstocks}</br>
					Product price: ${this.productlist[key].price}</br></br>
					<button class="btn btn-success" onclick="component.productinfoUpdate(${key})">Update</button>
					<button class="btn btn-danger" onclick="component.productinfoDelete(${key})">Delete</button>
					</div>
				`;
			}
		}
		this.reRender(html,document.getElementById('productinfos'));
	}
	
	productinfoUpdate(key){
		let html = `
		     Product name: <input type="text" id="updateproductname" value="${this.productlist[key].productname}">
			 Category: <select id="updateproductcategory">
			 <option value="" disabled selected>Choose an option</option>
		`;
		let c = this.categorylist;
		for(let x=0;x<c.length;x++){
			html+=`
			    <option value="${c[x].categoryname}">${c[x].categoryname}</option>
			`;
		}
		html+=`
		     </select>
			 Stock unit: <input type="text" id="updateproductstockunit" value="${this.productlist[key].numberofstocks}">
			 Product price: <input type="text" id="updateproductprice" value="${this.productlist[key].price}">
			 <button class="waves-effect waves-light btn" onclick="component.updateProduct(${key})">Update</button>
		`;
		this.reRender(html,document.getElementById('productinfodetails'));
	    this.initializeSelect();
	}
	
	updateProduct(key){
		let upn = document.getElementById('updateproductname');
		let upc = document.getElementById('updateproductcategory');
		let upsu = document.getElementById('updateproductstockunit');
		let upp = document.getElementById('updateproductprice');
		let p = this.productlist[key];
		let product = {"productname":upn.value,"category":upc.value,"numberofstocks":upsu.value,"price":upp.value};
		this.productlist[key] = product;
		let details = document.getElementById('productinfos');
		details.innerHTML = "";
		this.productlistinginfo();
	}
	
	productinfoDelete(key){
		let table = document.getElementById('productlistinginfo');
		table.deleteRow(key);
		this.productlist.splice(key,1);
		let details = document.getElementById('productinfos');
		details.innerHTML = "";
		this.productlistinginfo();
	}
	
	createCategory(){
		let cn = document.getElementById('createcategoryname');
		let category = {"categoryname":cn.value};
		this.categorylist.push(category);
		cn.value = "";
		this.categorylistinginfo();
	}
	
	
	
	manageProfiles(){
		let html = `
		   <div id="mainManager"></div>
		   <div id="sideManager"></div>
		   </br>
		   
		   <form class="blank">
              <fieldset>
                <legend><h5>Personal information:</h5></legend>
                <div class="row">
                  <div class="col s12">
				   <div id="detailsseen">
		`;
		let m = this.manager;
		for(let x=0;x<m.length;x++){
			html+=`
			    <b>Username:</b>
				${m[x].username}</br>
				<b>Password:</b>
				PASSWORD HIDDEN</br>
				<b>Profile image:</b></br>
				<img src="${m[x].profileimage}" width="200" height="200">
				<button class="waves-effect waves-light btn" onclick="component.editProfile(${x})">Update Profile</button>
			`;
		}
		html+=`
		    	</div>
               </div>
              </div>
                
				
             </fieldset>
           </form>
		`;
		this.reRender(html,$('#app')[0]);
		this.mainManager();
		this.sideManager();
		this.initializeMaterialScripts();
	}
	
	editProfile(key){
		let html = `
		    <div id="mainManager"></div>
			<div id="sideManager"></div>
			</br>
			 
			Username: <input type="text" id="updateusername" value="${this.manager[key].username}">
			Password: <input type="password" id="updatepassword" value="${this.manager[key].password}">
			Confirm Password: <input type="password" id="updaterepassword" value="${this.manager[key].password}">
			Profile Image: (Type Image URL) <input type="text" id="updateprofileimage" value="${this.manager[key].profileimage}">
			<center><button class="waves-effect waves-light btn" onclick="component.profileUpdate(${key})">Save Profile</button></center>
		`;
		this.reRender(html,document.getElementById('detailsseen'));
		this.mainManager();
		this.sideManager();
		this.initializeMaterialScripts();
	}
	
	profileUpdate(key){
        let u = document.getElementById('updateusername');
		let p = document.getElementById('updatepassword');
		let rp = document.getElementById('updaterepassword');
		let pi = document.getElementById('updateprofileimage');
		if(p.value!=rp.value){
			Materialize.toast("Password don't match",4000);
			this.manageProfiles();
		}
		else if(p.value==rp.value){
			let manager = {"username":u.value,"password":p.value,"profileimage":pi.value};
			this.manager[key] = manager;
			this.landingPage();
		}
	}
	
	sellProducts(){
		let html = `
		    <div id="mainManager"></div>
			<div id="sideManager"></div>
			
			<div class="row">
			  <div class="col s6"></br>
			    <center><h5>CUSTOMER ORDER LIST</h5></center>
			    <table id="" class="table">
				 <thead>
				  <tr>
				   <th><center>Quantity</center></th>
				   <th><center>Product name</center></th>
				   <th><center>Category</center></th>
				   <th><center>Price</center></th>
				   <th><center>Total</center></th>
				  </tr>
				 </thead>
				 <tbody id="customerlistinginfo"></tbody>
				</table>
				<div id="customerdeleteItem"></div>
	          </div>
			  <div class="col s1">
			  
			  </div>
			  <div class="col s5"></br>
			     <center><h5>PRODUCT LIST AVAILABLE</h5></center>
				 <table id="" class="table">
				   <thead>
				    <tr>
					  <th><center>Product name</center></th>
					  <th><center>Category</center></th>
					  <th><center># of stocks</center></th>
					  <th><center>Price</center></th>
					</tr>
				   </thead>
				   <tbody id="productsslistinginfo"></tbody>
				 </table>
				 <div id="quantityProducts"></div>
			  </div>
			</div>
		`;
		this.reRender(html,$('#app')[0]);
		this.mainManager();
		this.sideManager();
		this.initializeMaterialScripts();
		this.productsslistinginfo();
		this.quantityProducts();
		this.customerlistinginfo();
		this.customerdeleteItem();
	}
	
	customerlistinginfo(){
		let html = "";
		let c = this.customerlist;
		for(let z=0;z<c.length;z++){
			html+=`
			    <tr>
				  <td><center>${c[z].quantity}</center></td>
				  <td><center>${c[z].productname}</center></td>
				  <td><center>${c[z].category}</center></td>
				  <td><center>${c[z].price}</center></td>
				  <td><center>${c[z].total}</center></td>
				  <td><center><button class="waves-effect waves-light btn" onclick="component.customerdeleteItem(${z})">Info</button></td>
				</tr>
			`;
		}
		this.reRender(html,document.getElementById('customerlistinginfo'));
	}
	
	customerdeleteItem(key){
		let html = "";
		for(let index=0;index<this.productlist.length;index++){
			if(index==key){
				html+=`
				    <h5>Customer Order Review</h5>
					<b>Quantity:</b> ${this.customerlist[key].quantity}</br>
					<b>Product name:</b> ${this.customerlist[key].productname}</br>
					<b>Category:</b> ${this.customerlist[key].category}</br>
					<b>Price:</b> ${this.customerlist[key].price}</br>
					<b>Total:</B> ${this.customerlist[key].total}</br>
					<b>Number of stocks available:</b> ${this.productlist[key].numberofstocks}</br>
					<button class="btn btn danger" onclick="component.deleteitemcustomer(${key})">Delete</button>
				`;
			}
		}
		this.reRender(html,document.getElementById('customerdeleteItem'));
	}
	
	deleteitemcustomer(key){
		let product = {"productname":this.customerlist[key].productname,"category":this.customerlist[key].category,
	    "numberofstocks":+this.customerlist[key].quantity+ +this.productlist[key].numberofstocks,"price":this.customerlist[key].price};
		this.productlist[key] = product;
		let table = document.getElementById('customerlistinginfo');
		table.deleteRow(key);
		this.customerlist.splice(key,1);
		let details = document.getElementById('customerdeleteItem');
		customerdeleteItem.innerHTML = "";
		this.customerlistinginfo();
		this.productsslistinginfo();
	}
	
	productsslistinginfo(){
		let html = "";
		let p = this.productlist;
		for(let y=0;y<p.length;y++){
			html+=`
			   <tr>
			     <td><center>${p[y].productname}</center></td>
				 <td><center>${p[y].category}</center></td>
				 <td><center>${p[y].numberofstocks}</center></td>
				 <td><center>${p[y].price}</center></td>
				 <td><center><button class="waves-effect waves-light btn" onclick="component.quantityProducts(${y})">Edit</button></center></td>
			   </tr>
			`;
		}
		this.reRender(html,document.getElementById('productsslistinginfo'));
	}
	
	quantityProducts(key){
		console.log("key is " + key);
		let html = "";
		for(let index=0;index<this.productlist.length;index++){
			if(index==key){
			    html += `
				   </br>
				   Quantity Item: <input type="text" id="quantityitemproducts">
				   <button class="waves-effect waves-light btn" onclick="component.createcustomerlist(${key})">Order Item</button>
				`;
			}
		}
		this.reRender(html,document.getElementById('quantityProducts'));
	}
	
    createcustomerlist(key){
		 var qip = document.getElementById('quantityitemproducts').value;
         let customer = {"quantity":qip,"productname":this.productlist[key].productname,"category":this.productlist[key].category,
		 "numberofstocks":this.productlist[key].numberofstocks-qip,"price":this.productlist[key].price,"total":qip*this.productlist[key].price};
		 this.customerlist.push(customer);
		 let customers = {"productname":this.productlist[key].productname,"category":this.productlist[key].category,
		 "numberofstocks":this.productlist[key].numberofstocks-qip,"price":this.productlist[key].price};
		 this.productlist[key] = customers;
		 let details = document.getElementById('quantityProducts');
		 details.innerHTML = "";
		 this.customerlistinginfo();
		 this.productsslistinginfo();
	}
	
	
	managerprofile(){
		let html = "";
		let m = this.manager;
		for(let i=0;i<m.length;i++){
			html += `
			    <tr>
				  <td>${m[i].username}</td>
				  <td>${m[i].password}</td>
				</tr>
			`;
		}
		this.reRender(html,document.getElementById('managerprofile'));
	}
	
	
	mainManager(){
		let html = `
		    <nav>
				<!--<a id="menu" href="#" data-activates="slide-out" class="button-collapse hide"><i class="material-icons">menu</i></a>-->
				<div class="nav-wrapper">
					<a href="#" class="brand-logo center" style="font-size: 1.0em;"><h4></h4></a>
				</div>
			</nav>
				<a style="position:absolute;top:1px; left:15px;" id="menu" href="#" data-activates="slide-out" class="button-collapse"><p class="material-icons white-text small"><h4><font color="white">MENU</font></h4></p></a>
				
			
			
		`;
		this.reRender(html,$('#mainManager')[0]);
	}
	
	sideManager(){
		let html = `
		   <ul id="slide-out" class="side-nav">
		      <li><div class="userView">
			      <div class="background">
				     <img src="img/office.jpg">
				  </div>
				  <a href="#!user"><img class="circle" src="${this.settings.currentuser.profileimage}"></a>
					<a href="#!name"><span class="white-text name">Hello ${this.settings.currentuser.username}</a>
				</div></li>
				<li><a href="javascript:$('.button-collapse').sideNav('hide');component.categoryListing()">Category Listing</a></li>
				<li><a href="javascript:$('.button-collapse').sideNav('hide');component.productListing()">Product Listing</a></li>
				<li><a href="javascript:$('.button-collapse').sideNav('hide');component.addCategory()">Add Category</a></li>
				<li><a href="javascript:$('.button-collapse').sideNav('hide');component.addProducts()">Add Products</a></li>
				<li><a href="javascript:$('.button-collapse').sideNav('hide');component.sellProducts()">Sell Our Products</a></li>
				<li><a href="javascript:$('.button-collapse').sideNav('hide');component.manageProfiles()">Manage Profile</a></li>
				<li><a href="javascript:$('.button-collapse').sideNav('hide');component.landingPage()">Logout ${this.settings.currentuser.username}</a></li>
			</ul>
			
			`;
			this.reRender(html,$('#sideManager')[0]);
	}
}



let component = new Component();
component.landingPage();
component.categoryinfo();
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	