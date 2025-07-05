/**
** 상품 분류설정
**/

$(function() {

	var $category = $('.m--setting-category');
	var $cateTitle = $category.children('h5');
	var $cateFoot = $category.find('.m--setting-category-foot');

	// 순서변경
	$cateFoot.find('.mm_btn').on('click', function(__e) {

		var $this = $(this);
		var $cateList = $category.find('.m--setting-category-list ul');
		var datas = $category.data('m.category') || { clones: null, sortables:[] };

		if ($this.hasClass('btn_sort-change')) {
			$category.addClass('__category-list-sortable');
			$cateTitle.html('<span>순서 변경<small>드래그로 손쉽게 변경하세요.</small></span>');

			$cateList.each(function(__i) {

				datas.sortables[__i] = Sortable.create($cateList[__i], { forceFallback: true });

			});

			datas.clone = $cateList.first().clone(true);// 취소용 복제
			$category.data('m.category', datas);
		}
		else {
			// 편집취소
			if ($this.hasClass('btn_sort-cancel')) {
				$cateList.first().replaceWith(datas.clone);
			}
			// 편집적용
			else if ($this.hasClass('btn_sort-apply')) {
				//
			}

			$cateTitle.html('<span>상품분류</span>');
			$category.removeClass('__category-list-sortable').removeData('m.category');

			$.each(datas.sortables, function(__index, __value) {

				__value.destroy();

			});

			datas.sortables = [];

		}

	});

	// 카테고리 토글
	$(document).on('click', '.m--setting-category-list .btn_toggle', function(__e) {

		var $this = $(this);
		var $li = $(this).closest('li');

		$li.toggleClass('__category-open');

		if ($li.hasClass('__category-open')) {
			$this.attr({ 'title': '접어놓기' })
			.children('.mco_category-open').toggleClass(['mco_category-open', 'mco_category-close']);
		}
		else {
			$this.attr({ 'title': '펼쳐보기' })
			.children('.mco_category-close').toggleClass(['mco_category-open', 'mco_category-close']);
		}

	});

	// 카테고리 선택
	$(document).on('click', '.m--setting-category-list .btn_item', function(__e) {

		__e.preventDefault();

		var $this = $(this);

		$('.m--setting-category-list .btn_item').removeClass('__category-on').removeAttr('title');
		$this.addClass('__category-on').attr({ 'title': '선택됨' });

	});

});
