(function(){
  var s = document.createElement('script');
  s.src = 'https://cdn.jsdelivr.net/gh/amosmarbun86-droid/amosmarbun86-droid.github.io@c8313e4f389890cab05d9f04d180d0fb2edeb492/apps-extra.js';
  s.onload = function(){
    if (!document.querySelector('link[href="sidebar-fix.css"]')) {
      var l = document.createElement('link');
      l.rel = 'stylesheet';
      l.href = 'sidebar-fix.css';
      document.head.appendChild(l);
    }
    if (!document.querySelector('link[href="win11-theme.css"]')) {
      var l2 = document.createElement('link');
      l2.rel = 'stylesheet';
      l2.href = 'win11-theme.css';
      document.head.appendChild(l2);
    }
    function ensureBackdrop() {
      var bd = document.getElementById('sidebarBackdrop');
      if (!bd) {
        bd = document.createElement('div');
        bd.id = 'sidebarBackdrop';
        bd.addEventListener('click', function(){
          var sb = document.getElementById('sidebar');
          if (sb) sb.classList.remove('active');
          bd.classList.remove('show');
        });
        document.body.appendChild(bd);
      }
      return bd;
    }
    var orig = window.toggleSidebar;
    window.toggleSidebar = function(){
      if (typeof orig === 'function') orig();
      else {
        var sb = document.getElementById('sidebar');
        if (sb) sb.classList.toggle('active');
      }
      var sb2 = document.getElementById('sidebar');
      var bd = ensureBackdrop();
      if (sb2 && sb2.classList.contains('active')) bd.classList.add('show');
      else bd.classList.remove('show');
    };
    ensureBackdrop();
  };
  document.head.appendChild(s);
})();
