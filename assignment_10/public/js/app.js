// Submit the search form as soon as a genre is picked
document.querySelectorAll('[data-autosubmit]').forEach(function (el) {
  el.addEventListener('change', function () { el.form.submit(); });
});

// "Back" link: go back if there is history, otherwise go home
document.querySelectorAll('[data-back]').forEach(function (link) {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    if (document.referrer && document.referrer.indexOf(location.host) !== -1) history.back();
    else location.href = '/';
  });
});
