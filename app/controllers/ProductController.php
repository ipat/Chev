<?php

class ProductController extends BaseController {
/*
	public function __construct() {
		$this->beforeFilter('admin', array('only' => array(
      'show', 'store', 'update', 'destroy'
    )));
    
    $this->beforeFilter('csrf', array('only' => array(
      'store', 'update', 'destroy'
    )));
	}
*/
	public function index() {
		//return 1;
		$products =  Product::all();
		return Response::json($products->toArray());
	}

	public function show($product_id) {
		
	}

	public function store() {
		
	}

	public function update($product_id) {
		
	}

	public function destroy($product_id) {
		
	}
}
