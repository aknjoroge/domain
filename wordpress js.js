let domain_search_btn = document.getElementById("domain_search_btn");
let domain_input_field = document.getElementById("domain_input_field");
let domain_success_message = document.getElementById("domain_success_message");
let domain_error_message = document.getElementById("domain_error_message");
if (domain_search_btn) {
  let domainsearchProcess = async function (e) {
    e.preventDefault();

    domain_search_btn.innerHTML = "Processing...";

    //AJAX request

    let domain = domain_input_field.value;

    try {
      let res = await axios({
        method: "post",
        url: `https://techkey-domain.herokuapp.com/verify`,
        data: { domain },
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      });
      if (res.data.status == "failed") {
        domain_success_message.classList.remove("domain-hidden");
      }
      if (res.data.status == "success") {
        domain_error_message.classList.remove("domain-hidden");
      }
    } catch (err) {
      domain_search_btn.innerHTML = "SEARCH";
    }

    //
    domain_search_btn.innerHTML = "SEARCH";
  };
  domain_search_btn.addEventListener("click", domainsearchProcess);
}
