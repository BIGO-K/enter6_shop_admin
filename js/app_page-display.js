/**
** 전시관리
**/

$(function() {
	var _prodGroup = '.m-display-event-prodgroup';
	var selectedSortable;
	var selectedClone;

	/// 기획전등록 - 상품그룹 토글
	$(document).on('click', _prodGroup + ' .btn_group-open, ' + _prodGroup + ' .btn_group-toggle', function(_e) {

		_e.preventDefault();

		var $this = $(this);
		var $prodGroup = $(this).closest(_prodGroup);
		var $btnToggle = $prodGroup.find('.btn_group-toggle');
		var _classOff = '__group-off';
		var _isOpen = ($this.hasClass('btn_group-open')) ? true : ($prodGroup.hasClass(_classOff)) ? true : false;

		if (_isOpen) {
			$prodGroup.removeClass(_classOff);
			$btnToggle.find('.mm_ir-blind').text('접어놓기');
		}
		else {
			$prodGroup.addClass(_classOff);
			$btnToggle.find('.mm_ir-blind').text('펼쳐보기');
		}

	});

	/// 기획전등록 - 노출상품 순서 변경
	$(document).on('click', _prodGroup + ' .mm_list-foot .mm_box-lside .mm_btn', function(__e) {

		__e.preventDefault();

		var $this = $(this);
		var $prodList = $this.closest('.mm_list');
		var $sortable = $prodList.find('tbody');
		var _classSort = '__list-sortable';

		// 순서 변경하기
		if ($this.hasClass('btn_change')) {
			$prodList.addClass(_classSort)
			.data('datas', {
				sortable: Sortable.create($sortable[0], { forceFallback: true, handle: '.mco_sort' }),
				clone: $prodList.find('tbody').clone(true)
			});
		}
		else {
			// 순서변경 취소
			if ($this.hasClass('btn_change-cancel')) {
				$prodList.removeClass(_classSort);
				$prodList.find('tbody').replaceWith($prodList.data('datas').clone);
			}
			// 순서변경 완료
			else if ('btn_change-complete') {
				$prodList.removeClass(_classSort);
			}

			$prodList.data('datas').sortable.destroy();
		}

	});

	//메인페이지 전시목록 - 노출상품 순서 변경
	$(document).on('click', '.m-display-main-sortable .mm_list-foot .mm_box-lside .mm_btn', function(__e) {

		__e.preventDefault();

		var $this = $(this);
		var $selectedList = $this.closest('.m-display-main-sortable');
		var $sortable = $selectedList.find('thead').siblings('tbody');
		var _classSort = '__list-sortable';

		// 순서 변경하기
		if ($this.hasClass('btn_change')) {
			$selectedList.addClass(_classSort);

			var isForceFallback = (/msie|rv:11|edge/i.test(navigator.userAgent)) ? true : false;
			selectedSortable = Sortable.create($sortable[0], { forceFallback: isForceFallback, handle: '.btn_sort',
				onClone: function(__e) {

					if (isForceFallback) {
						var $radio = $(__e.clone).find(':radio');
						var checkedIndex = $radio.index($radio.filter(':checked'));
						$(__e.item).find(':radio').eq(checkedIndex).prop({ 'checked': true});
					}

				}
			});
			selectedClone = $sortable.clone(true);
		}
		else {
			$selectedList.removeClass(_classSort);

			// 순서변경 취소
			if ($this.hasClass('btn_change-cancel')) {
				$sortable.replaceWith(selectedClone);
			}
			// 순서변경 완료
			else if ('btn_change-complete') {
				//
			}

			selectedSortable.destroy();
		}

	});
});
