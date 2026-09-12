/**
 * TilBlog → Statsman auto events (3–7 meaningful signals).
 * Relies on window.statsman from tracker.js (loaded just before this file).
 */
(function () {
  function track(name, data) {
    try {
      if (window.statsman && typeof window.statsman.track === "function") {
        window.statsman.track(name, data);
      }
    } catch (e) {
      /* ignore */
    }
  }

  function whenReady(fn) {
    if (window.statsman) {
      fn();
      return;
    }
    var n = 0;
    var id = setInterval(function () {
      if (window.statsman || ++n > 60) {
        clearInterval(id);
        if (window.statsman) fn();
      }
    }, 50);
  }

  function attrData(el) {
    var out = {};
    var label = el.getAttribute("data-til-label");
    var trackName = el.getAttribute("data-til-track");
    var level = el.getAttribute("data-til-level");
    if (label) out.label = label;
    if (trackName) out.track = trackName;
    if (level) out.level = level;
    out.path = location.pathname;
    return out;
  }

  function init() {
    whenReady(function () {
      // 1) lesson_open — once per lesson page
      var lesson = document.querySelector("[data-til-lesson]");
      if (lesson) {
        track("lesson_open", {
          path: location.pathname,
          track: lesson.getAttribute("data-til-track") || null,
          level: lesson.getAttribute("data-til-level") || null,
          title: document.title.slice(0, 120),
        });
      }

      // 2–6) delegated clicks from data-til-event
      document.addEventListener(
        "click",
        function (e) {
          var node = e.target;
          if (!(node instanceof Element)) return;
          var el = node.closest("[data-til-event]");
          if (!el) return;
          var name = el.getAttribute("data-til-event");
          if (!name) return;
          track(name, attrData(el));
        },
        true,
      );

      // 7) code_copy — when readers copy from a code block
      document.addEventListener("copy", function () {
        var sel = window.getSelection && window.getSelection();
        if (!sel || sel.isCollapsed) return;
        var anchor = sel.anchorNode && sel.anchorNode.parentElement;
        if (!anchor) return;
        if (!anchor.closest("pre, code, .prose-til")) return;
        track("code_copy", { path: location.pathname });
      });
    });
  }

  // Expose for comments.js
  window.tilTrack = track;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
