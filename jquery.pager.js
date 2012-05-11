/**
 * jquery.pager.js
 *
 * @version  0.1.0
 * @author   k.ishiwata
 * @url     http://www.webopixel.net/
 * @license  http://rewish.org/license/mit The MIT License
 *
 * Since:   2012-03-28
 *
 * jQuery 1.7
 */
var Pager = function(o) {
	//指定がないオプションはデフォルトオプションを使用
	var opts = $.extend({}, $.fn.pager.defaults, o);

	this.currentPage = opts.currentPage; 	//現在のページ
	this.totalRec = opts.totalRec;	//総レコード数
	this.pageRec   = opts.pageRec;	//１ページに表示するレコード
	this.totalPage = Math.ceil(this.totalRec / this.pageRec); //総ページ数
	this.showNav = opts.showNav;	//表示するナビゲーションの数
	this.path = opts.path;	//パーマリンク
	this.ele = opts.element;
	
	this.init();
}

Pager.prototype = {

	init: function() {
		//全てのページ数が表示するページ数より小さい場合、総ページを表示する数にする
		if (this.totalPage < this.showNav) {
			this.showNav = this.totalPage;
		}
		//トータルページ数が2以下または現在のページが総ページより大きい場合表示しない
		if (this.totalPage <= 1 || this.totalPage < this.currentPage ) return;
		this.makeNav(this.currentPage);
	},
	//ナビゲーションを生成
	makeNav: function(current) {

		//表示している要素を削除
		this.ele.empty();
		
		//総ページの半分
		var showNavh = Math.floor(this.showNav / 2);
		//現在のページをナビゲーションの中心にする
		var loopStart = current - showNavh;
		var loopEnd = current + showNavh;
		//現在のページが両端だったら端にくるようにする
		if (loopStart <= 0) {
			loopStart  = 1;
			loopEnd = this.showNav;
		}
		if (loopEnd > this.totalPage) {
			loopStart  = this.totalPage - this.showNav +1;
			loopEnd =  this.totalPage;
		}
		var outNav = '<ul>';
		//2ページ移行だったら「一番前へ」を表示
		if ( current > 2) outNav += '<li class="prev_page"><a href="'+ this.path +'1">&laquo;</a></li>';
		//最初のページ以外だったら「前へ」を表示
		if ( current > 1) outNav += '<li class="prev"><a href="'+ this.path + (current - 1)+'">&lsaquo;</a></li>';
		for (var i=loopStart; i<=loopEnd; i++) {
			if(i == current) {
				outNav += '<li class="page active">';
			} else {
				outNav += '<li class="page">';
			}
			outNav += '<a href="'+ this.path + i + '" rel="next">' + i + '</a></li>';
		}
		//最後のページ以外だったら「次へ」を表示
		if ( current < this.totalPage) outNav += '<li class="next_page"><a href="'+ this.path + (current+1)+'">&rsaquo;</a></li>';
		//最後から２ページ前だったら「一番最後へ」を表示
		if ( current < this.totalPage - 1) outNav += '<li class="last next"><a href="'+ this.path + this.totalPage +'">&raquo;</a></li>';
		outNav += '</ul>';
		this.ele.append(outNav);
	}
};

$.fn.pager = function(options) {
	if(options) options.element = $(this);
	new Pager(options);
}
$.fn.pager.defaults = {
	totalRec: 0,	//総レコード数
	currentPage: 1, 	//現在のページ
	pageRec: 10,	//１ページに表示するレコード
	showNav: 5,	//表示するナビゲーションの数
	path: ''	//パーマリンク
}