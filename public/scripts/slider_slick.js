$(document).ready(function () {

  $('.carousel').slick({
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      }
    ]
  });

  //turn image to active when mouseenter
  $(".item").each(function () {
    $(this).on("mouseenter", turnActive);
  });
});
const turnActive = function () {

  //TEST
  const itemId = $(this).attr('id');
  console.log("MOUSEOVER ITEM", itemId)

  $(".bottom-page").html(`
  <div class="description">
    <p class="food-name"></p>
    <p class="food-desc"></p>
    <p class="food-price"></p>
  </div>

  <div class="items-to-cart">
    <div class="qty-buttons">
      <button class="minus">-</button>
      <label class="qty">1</label>
      <button class="plus">+</button>
    </div>
    <div class="add-to-cart-button">
      <button class="add-to-cart"> add to cart</button>
    </div>
  </div>`);


  //GOOD CODE

  // $(".bottom-page").removeClass("active") //test might need to remove
  if ($(".active").length > 0) {
    $(".active").removeClass("active");
    // $("p").removeClass("active");
    $(this).siblings(".bottom-page").removeClass("active");
    $(this).siblings(".bottom-page").find("*").removeClass("active");
  }

  $(this).addClass("active");
  //display information about the current slide/dish
  // $("p").addClass("active");
  $(this).siblings(".bottom-page").addClass("active");
  $(this).siblings(".bottom-page").find("*").addClass("active");
  // $(".bottom-page").addClass("active") //test might need to remove

  $.ajax({
    url: `/api/product-info/${this.id}`,
    method: "GET",
    success: (dish) => {
      appendInfo(dish);
    },
    error: (err) => {
      console.log("error: ", err);
    },
  });

  const appendInfo = (dish) => {
    $(".food-name").empty();
    $(".food-desc").empty();
    $(".food-price").empty();
    $(".food-name").append(`<strong>${dish.item}</strong>`);
    $(".food-desc").append(dish.description);
    $(".food-price").append(`$${dish.price}`);
  }
};
