var Mh = Object.defineProperty;
var Oh = (J, de, ge) =>
  de in J
    ? Mh(J, de, { enumerable: !0, configurable: !0, writable: !0, value: ge })
    : (J[de] = ge);
var De = (J, de, ge) => (Oh(J, typeof de != "symbol" ? de + "" : de, ge), ge),
  zh = (J, de, ge) => {
    if (!de.has(J)) throw TypeError("Cannot " + ge);
  };
var $r = (J, de, ge) => {
  if (de.has(J))
    throw TypeError("Cannot add the same private member more than once");
  de instanceof WeakSet ? de.add(J) : de.set(J, ge);
};
var xi = (J, de, ge) => (zh(J, de, "access private method"), ge);
(function (J, de) {
  typeof exports == "object" && typeof module < "u"
    ? de(exports)
    : typeof define == "function" && define.amd
      ? define(["exports"], de)
      : ((J = typeof globalThis < "u" ? globalThis : J || self),
        de((J.Waline = {})));
})(this, function (J) {
  "use strict";
  var En, Er, ki, yo;
  const de = { "Content-Type": "application/json" },
    ge = (e) => `${e.replace(/\/?$/, "/")}api/`,
    yt = (e, t = "") => {
      if (typeof e == "object" && e.errno)
        throw new TypeError(`${t} failed with ${e.errno}: ${e.errmsg}`);
      return e;
    },
    _i = ({ serverURL: e, lang: t, paths: n, type: i, signal: r }) =>
      fetch(
        `${ge(e)}article?path=${encodeURIComponent(n.join(","))}&type=${encodeURIComponent(i.join(","))}&lang=${t}`,
        { signal: r },
      )
        .then((s) => s.json())
        .then((s) => yt(s, "Get counter").data),
    An = ({ serverURL: e, lang: t, path: n, type: i, action: r }) =>
      fetch(`${ge(e)}article?lang=${t}`, {
        method: "POST",
        headers: de,
        body: JSON.stringify({ path: n, type: i, action: r }),
      })
        .then((s) => s.json())
        .then((s) => yt(s, "Update counter").data),
    Tr = ({
      serverURL: e,
      lang: t,
      path: n,
      page: i,
      pageSize: r,
      sortBy: s,
      signal: l,
      token: o,
    }) => {
      const a = {};
      return (
        o && (a.Authorization = `Bearer ${o}`),
        fetch(
          `${ge(e)}comment?path=${encodeURIComponent(n)}&pageSize=${r}&page=${i}&lang=${t}&sortBy=${s}`,
          { signal: l, headers: a },
        )
          .then((c) => c.json())
          .then((c) => yt(c, "Get comment data").data)
      );
    },
    Rr = ({ serverURL: e, lang: t, token: n, comment: i }) => {
      const r = { "Content-Type": "application/json" };
      return (
        n && (r.Authorization = `Bearer ${n}`),
        fetch(`${ge(e)}comment?lang=${t}`, {
          method: "POST",
          headers: r,
          body: JSON.stringify(i),
        }).then((s) => s.json())
      );
    },
    Sr = ({ serverURL: e, lang: t, token: n, objectId: i }) =>
      fetch(`${ge(e)}comment/${i}?lang=${t}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${n}` },
      })
        .then((r) => r.json())
        .then((r) => yt(r, "Delete comment")),
    Kt = ({ serverURL: e, lang: t, token: n, objectId: i, comment: r }) =>
      fetch(`${ge(e)}comment/${i}?lang=${t}`, {
        method: "PUT",
        headers: { ...de, Authorization: `Bearer ${n}` },
        body: JSON.stringify(r),
      })
        .then((s) => s.json())
        .then((s) => yt(s, "Update comment")),
    Ar = ({ serverURL: e, lang: t, paths: n, signal: i }) =>
      fetch(
        `${ge(e)}comment?type=count&url=${encodeURIComponent(n.join(","))}&lang=${t}`,
        { signal: i },
      )
        .then((r) => r.json())
        .then((r) => yt(r, "Get comment count").data),
    Ir = ({ lang: e, serverURL: t }) => {
      const n = (window.innerWidth - 450) / 2,
        i = (window.innerHeight - 450) / 2,
        r = window.open(
          `${t.replace(/\/$/, "")}/ui/login?lng=${encodeURIComponent(e)}`,
          "_blank",
          `width=450,height=450,left=${n},top=${i},scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no`,
        );
      return (
        r == null || r.postMessage({ type: "TOKEN", data: null }, "*"),
        new Promise((s) => {
          const l = ({ data: o }) => {
            !o ||
              typeof o != "object" ||
              o.type !== "userInfo" ||
              (o.data.token &&
                (r == null || r.close(),
                window.removeEventListener("message", l),
                s(o.data)));
          };
          window.addEventListener("message", l);
        })
      );
    },
    Lr = ({ serverURL: e, lang: t, paths: n, signal: i }) =>
      _i({ serverURL: e, lang: t, paths: n, type: ["time"], signal: i }),
    Mr = (e) => An({ ...e, type: "time", action: "inc" }),
    Or = ({ serverURL: e, lang: t, count: n, signal: i, token: r }) => {
      const s = {};
      return (
        r && (s.Authorization = `Bearer ${r}`),
        fetch(`${ge(e)}comment?type=recent&count=${n}&lang=${t}`, {
          signal: i,
          headers: s,
        }).then((l) => l.json())
      );
    },
    zr = ({ serverURL: e, signal: t, pageSize: n, lang: i }) =>
      fetch(`${ge(e)}user?pageSize=${n}&lang=${i}`, { signal: t })
        .then((r) => r.json())
        .then((r) => yt(r, "user list"))
        .then((r) => r.data),
    wo = ["nick", "mail", "link"],
    jr = (e) => e.filter((t) => wo.includes(t)),
    Pr = ["//unpkg.com/@waline/emojis@1.1.0/weibo"],
    bo = [
      "//unpkg.com/@waline/emojis/tieba/tieba_agree.png",
      "//unpkg.com/@waline/emojis/tieba/tieba_look_down.png",
      "//unpkg.com/@waline/emojis/tieba/tieba_sunglasses.png",
      "//unpkg.com/@waline/emojis/tieba/tieba_pick_nose.png",
      "//unpkg.com/@waline/emojis/tieba/tieba_awkward.png",
      "//unpkg.com/@waline/emojis/tieba/tieba_sleep.png",
    ],
    ko = (e) =>
      new Promise((t, n) => {
        if (e.size > 128 * 1e3)
          return n(new Error("File too large! File size limit 128KB"));
        const i = new FileReader();
        i.readAsDataURL(e),
          (i.onload = () => {
            var r;
            return t(((r = i.result) == null ? void 0 : r.toString()) || "");
          }),
          (i.onerror = n);
      }),
    xo = (e) =>
      e === !0
        ? '<p class="wl-tex">TeX is not available in preview</p>'
        : '<span class="wl-tex">TeX is not available in preview</span>',
    _o = (e) => {
      const t = async (n, i = {}) =>
        fetch(
          `https://api.giphy.com/v1/gifs/${n}?${new URLSearchParams({ lang: e, limit: "20", rating: "g", api_key: "6CIMLkNMMOhRcXPoMCPkFy4Ybk2XUiMp", ...i }).toString()}`,
        )
          .then((r) => r.json())
          .then(({ data: r }) =>
            r.map((s) => ({
              title: s.title,
              src: s.images.downsized_medium.url,
            })),
          );
      return {
        search: (n) => t("search", { q: n, offset: "0" }),
        default: () => t("trending", {}),
        more: (n, i = 0) => t("search", { q: n, offset: i.toString() }),
      };
    },
    Co =
      /[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af\u0400-\u04FF]+|\w+/,
    $o = /</,
    Eo = /(?:^|\s)\/\/(.+?)$/gm,
    To = /\/\*([\S\s]*?)\*\//gm,
    Ro = new RegExp(
      `(${Co.source}|${$o.source})|((?:${Eo.source})|(?:${To.source}))`,
      "gmi",
    ),
    Ur = [
      "23AC69",
      "91C132",
      "F19726",
      "E8552D",
      "1AAB8E",
      "E1147F",
      "2980C1",
      "1BA1E6",
      "9FA0A0",
      "F19726",
      "E30B20",
      "E30B20",
      "A3338B",
    ],
    Ci = {},
    So = (e) => {
      let t = 0;
      return e.replace(Ro, (n, i, r) => {
        if (r) return `<span style="color: slategray">${r}</span>`;
        if (i === "<") return "&lt;";
        let s;
        Ci[i] ? (s = Ci[i]) : ((s = Ur[t]), (Ci[i] = s));
        const l = `<span style="color: #${s}">${i}</span>`;
        return (t = ++t % Ur.length), l;
      });
    },
    Ao = [
      "nick",
      "nickError",
      "mail",
      "mailError",
      "link",
      "optional",
      "placeholder",
      "sofa",
      "submit",
      "like",
      "cancelLike",
      "reply",
      "cancelReply",
      "comment",
      "refresh",
      "more",
      "preview",
      "emoji",
      "uploadImage",
      "seconds",
      "minutes",
      "hours",
      "days",
      "now",
      "uploading",
      "login",
      "logout",
      "admin",
      "sticky",
      "word",
      "wordHint",
      "anonymous",
      "level0",
      "level1",
      "level2",
      "level3",
      "level4",
      "level5",
      "gif",
      "gifSearchPlaceholder",
      "profile",
      "approved",
      "waiting",
      "spam",
      "unsticky",
      "oldest",
      "latest",
      "hottest",
      "reactionTitle",
    ],
    lt = (e) => Object.fromEntries(e.map((t, n) => [Ao[n], t]));
  var Fr = lt([
      "NickName",
      "NickName cannot be less than 3 bytes.",
      "E-Mail",
      "Please confirm your email address.",
      "Website",
      "Optional",
      "Comment here...",
      "No comment yet.",
      "Submit",
      "Like",
      "Cancel like",
      "Reply",
      "Cancel reply",
      "Comments",
      "Refresh",
      "Load More...",
      "Preview",
      "Emoji",
      "Upload Image",
      "seconds ago",
      "minutes ago",
      "hours ago",
      "days ago",
      "just now",
      "Uploading",
      "Login",
      "logout",
      "Admin",
      "Sticky",
      "Words",
      `Please input comments between $0 and $1 words!
 Current word number: $2`,
      "Anonymous",
      "Dwarves",
      "Hobbits",
      "Ents",
      "Wizards",
      "Elves",
      "Maiar",
      "GIF",
      "Search GIF",
      "Profile",
      "Approved",
      "Waiting",
      "Spam",
      "Unsticky",
      "Oldest",
      "Latest",
      "Hottest",
      "What do you think?",
    ]),
    Nr = lt([
      "Pseudo",
      "Le pseudo ne peut pas faire moins de 3 octets.",
      "E-mail",
      "Veuillez confirmer votre adresse e-mail.",
      "Site Web",
      "Optionnel",
      "Commentez ici...",
      "Aucun commentaire pour l'instant.",
      "Envoyer",
      "J'aime",
      "Annuler le j'aime",
      "Répondre",
      "Annuler la réponse",
      "Commentaires",
      "Actualiser",
      "Charger plus...",
      "Aperçu",
      "Emoji",
      "Télécharger une image",
      "Il y a quelques secondes",
      "Il y a quelques minutes",
      "Il y a quelques heures",
      "Il y a quelques jours",
      "À l'instant",
      "Téléchargement en cours",
      "Connexion",
      "Déconnexion",
      "Admin",
      "Épinglé",
      "Mots",
      `Veuillez saisir des commentaires entre $0 et $1 mots !
 Nombre actuel de mots : $2`,
      "Anonyme",
      "Nains",
      "Hobbits",
      "Ents",
      "Mages",
      "Elfes",
      "Maïar",
      "GIF",
      "Rechercher un GIF",
      "Profil",
      "Approuvé",
      "En attente",
      "Indésirable",
      "Détacher",
      "Le plus ancien",
      "Dernier",
      "Le plus populaire",
      "Qu'en pensez-vous ?",
    ]),
    Hr = lt([
      "ニックネーム",
      "3バイト以上のニックネームをご入力ください.",
      "メールアドレス",
      "メールアドレスをご確認ください.",
      "サイト",
      "オプション",
      "ここにコメント",
      "コメントしましょう~",
      "提出する",
      "Like",
      "Cancel like",
      "返信する",
      "キャンセル",
      "コメント",
      "更新",
      "さらに読み込む",
      "プレビュー",
      "絵文字",
      "画像をアップロード",
      "秒前",
      "分前",
      "時間前",
      "日前",
      "たっだ今",
      "アップロード",
      "ログインする",
      "ログアウト",
      "管理者",
      "トップに置く",
      "ワード",
      `コメントは $0 から $1 ワードの間でなければなりません!
 現在の単語番号: $2`,
      "匿名",
      "うえにん",
      "なかにん",
      "しもおし",
      "特にしもおし",
      "かげ",
      "なぬし",
      "GIF",
      "探す GIF",
      "個人情報",
      "承認済み",
      "待っている",
      "スパム",
      "べたつかない",
      "逆順",
      "正順",
      "人気順",
      "どう思いますか？",
    ]),
    Io = lt([
      "Apelido",
      "Apelido não pode ser menor que 3 bytes.",
      "E-Mail",
      "Por favor, confirme seu endereço de e-mail.",
      "Website",
      "Opcional",
      "Comente aqui...",
      "Nenhum comentário, ainda.",
      "Enviar",
      "Like",
      "Cancel like",
      "Responder",
      "Cancelar resposta",
      "Comentários",
      "Refrescar",
      "Carregar Mais...",
      "Visualizar",
      "Emoji",
      "Enviar Imagem",
      "segundos atrás",
      "minutos atrás",
      "horas atrás",
      "dias atrás",
      "agora mesmo",
      "Enviando",
      "Entrar",
      "Sair",
      "Admin",
      "Sticky",
      "Palavras",
      `Favor enviar comentário com $0 a $1 palavras!
 Número de palavras atuais: $2`,
      "Anônimo",
      "Dwarves",
      "Hobbits",
      "Ents",
      "Wizards",
      "Elves",
      "Maiar",
      "GIF",
      "Pesquisar GIF",
      "informação pessoal",
      "Aprovado",
      "Espera",
      "Spam",
      "Unsticky",
      "Mais velho",
      "Mais recentes",
      "Mais quente",
      "O que você acha?",
    ]),
    Dr = lt([
      "Псевдоним",
      "Никнейм не может быть меньше 3 байт.",
      "Эл. адрес",
      "Пожалуйста, подтвердите адрес вашей электронной почты.",
      "Веб-сайт",
      "Необязательный",
      "Комментарий здесь...",
      "Пока нет комментариев.",
      "Отправить",
      "Like",
      "Cancel like",
      "Отвечать",
      "Отменить ответ",
      "Комментарии",
      "Обновить",
      "Загрузи больше...",
      "Превью",
      "эмодзи",
      "Загрузить изображение",
      "секунд назад",
      "несколько минут назад",
      "несколько часов назад",
      "дней назад",
      "прямо сейчас",
      "Загрузка",
      "Авторизоваться",
      "Выход из системы",
      "Админ",
      "Липкий",
      "Слова",
      `Пожалуйста, введите комментарии от $0 до $1 слов!
Номер текущего слова: $2`,
      "Анонимный",
      "Dwarves",
      "Hobbits",
      "Ents",
      "Wizards",
      "Elves",
      "Maiar",
      "GIF",
      "Поиск GIF",
      "Персональные данные",
      "Одобренный",
      "Ожидающий",
      "Спам",
      "Нелипкий",
      "самый старый",
      "последний",
      "самый горячий",
      "Что вы думаете?",
    ]),
    Vr = lt([
      "Tên",
      "Tên không được nhỏ hơn 3 ký tự.",
      "E-Mail",
      "Vui lòng xác nhập địa chỉ email của bạn.",
      "Website",
      "Tùy chọn",
      "Hãy bình luận có văn hoá!",
      "Chưa có bình luận",
      "Gửi",
      "Thích",
      "Bỏ thích",
      "Trả lời",
      "Hủy bỏ",
      "bình luận",
      "Làm mới",
      "Tải thêm...",
      "Xem trước",
      "Emoji",
      "Tải lên hình ảnh",
      "giây trước",
      "phút trước",
      "giờ trước",
      "ngày trước",
      "Vừa xong",
      "Đang tải lên",
      "Đăng nhập",
      "đăng xuất",
      "Quản trị viên",
      "Dính",
      "từ",
      `Bình luận phải có độ dài giữa $0 và $1 từ!
 Số từ hiện tại: $2`,
      "Vô danh",
      "Người lùn",
      "Người tí hon",
      "Thần rừng",
      "Pháp sư",
      "Tiên tộc",
      "Maiar",
      "Ảnh GIF",
      "Tìm kiếm ảnh GIF",
      "thông tin cá nhân",
      "Đã được phê duyệt",
      "Đang chờ đợi",
      "Thư rác",
      "Không dính",
      "lâu đời nhất",
      "muộn nhất",
      "nóng nhất",
      "What do you think?",
    ]),
    Br = lt([
      "昵称",
      "昵称不能少于3个字符",
      "邮箱",
      "请填写正确的邮件地址",
      "网址",
      "可选",
      "欢迎评论",
      "来发评论吧~",
      "提交",
      "喜欢",
      "取消喜欢",
      "回复",
      "取消回复",
      "评论",
      "刷新",
      "加载更多...",
      "预览",
      "表情",
      "上传图片",
      "秒前",
      "分钟前",
      "小时前",
      "天前",
      "刚刚",
      "正在上传",
      "登录",
      "退出",
      "博主",
      "置顶",
      "字",
      `评论字数应在 $0 到 $1 字之间！
当前字数：$2`,
      "匿名",
      "潜水",
      "冒泡",
      "吐槽",
      "活跃",
      "话痨",
      "传说",
      "表情包",
      "搜索表情包",
      "个人资料",
      "通过",
      "待审核",
      "垃圾",
      "取消置顶",
      "按倒序",
      "按正序",
      "按热度",
      "你认为这篇文章怎么样？",
    ]),
    Lo = lt([
      "暱稱",
      "暱稱不能少於3個字元",
      "郵箱",
      "請填寫正確的郵件地址",
      "網址",
      "可選",
      "歡迎留言",
      "來發留言吧~",
      "送出",
      "喜歡",
      "取消喜歡",
      "回覆",
      "取消回覆",
      "留言",
      "重整",
      "載入更多...",
      "預覽",
      "表情",
      "上傳圖片",
      "秒前",
      "分鐘前",
      "小時前",
      "天前",
      "剛剛",
      "正在上傳",
      "登入",
      "登出",
      "管理者",
      "置頂",
      "字",
      `留言字數應在 $0 到 $1 字之間！
目前字數：$2`,
      "匿名",
      "潛水",
      "冒泡",
      "吐槽",
      "活躍",
      "多話",
      "傳說",
      "表情包",
      "搜尋表情包",
      "個人資料",
      "通過",
      "待審核",
      "垃圾",
      "取消置頂",
      "最早",
      "最新",
      "熱門",
      "你認為這篇文章怎麼樣？",
    ]);
  const Wr = "en-US",
    In = {
      zh: Br,
      "zh-cn": Br,
      "zh-tw": Lo,
      en: Fr,
      "en-us": Fr,
      fr: Nr,
      "fr-fr": Nr,
      jp: Hr,
      "jp-jp": Hr,
      "pt-br": Io,
      ru: Dr,
      "ru-ru": Dr,
      vi: Vr,
      "vi-vn": Vr,
    },
    qr = (e) => In[e.toLowerCase()] || In[Wr],
    Mo = (e) => (Object.keys(In).includes(e.toLowerCase()) ? e : Wr),
    Kr = (e) => {
      try {
        e = decodeURI(e);
      } catch {}
      return e;
    },
    Zr = (e = "") => e.replace(/\/$/u, ""),
    Gr = (e) => /^(https?:)?\/\//.test(e),
    Ln = (e) => {
      const t = Zr(e);
      return Gr(t) ? t : `https://${t}`;
    },
    Oo = (e) => (Array.isArray(e) ? e : e ? [0, e] : !1),
    $i = (e, t) => (typeof e == "function" ? e : e === !1 ? !1 : t),
    zo = ({
      serverURL: e,
      path: t = location.pathname,
      lang: n = typeof navigator > "u" ? "en-US" : navigator.language,
      locale: i,
      emoji: r = Pr,
      meta: s = ["nick", "mail", "link"],
      requiredMeta: l = [],
      dark: o = !1,
      pageSize: a = 10,
      wordLimit: c,
      imageUploader: f,
      highlighter: p,
      texRenderer: h,
      copyright: m = !0,
      login: S = "enable",
      search: x,
      reaction: C,
      recaptchaV3Key: w = "",
      turnstileKey: T = "",
      commentSorting: P = "latest",
      ...N
    }) => ({
      serverURL: Ln(e),
      path: Kr(t),
      lang: Mo(n),
      locale: { ...qr(n), ...(typeof i == "object" ? i : {}) },
      wordLimit: Oo(c),
      meta: jr(s),
      requiredMeta: jr(l),
      imageUploader: $i(f, ko),
      highlighter: $i(p, So),
      texRenderer: $i(h, xo),
      dark: o,
      emoji: typeof r == "boolean" ? (r ? Pr : []) : r,
      pageSize: a,
      login: S,
      copyright: m,
      search: x === !1 ? !1 : typeof x == "object" ? x : _o(n),
      recaptchaV3Key: w,
      turnstileKey: T,
      reaction: Array.isArray(C) ? C : C === !0 ? bo : [],
      commentSorting: P,
      ...N,
    }),
    It = (e) => typeof e == "string",
    Ei =
      "{--waline-white:#000;--waline-light-grey:#666;--waline-dark-grey:#999;--waline-color:#888;--waline-bg-color:#1e1e1e;--waline-bg-color-light:#272727;--waline-bg-color-hover: #444;--waline-border-color:#333;--waline-disable-bg-color:#444;--waline-disable-color:#272727;--waline-bq-color:#272727;--waline-info-bg-color:#272727;--waline-info-color:#666}",
    jo = (e) =>
      It(e)
        ? e === "auto"
          ? `@media(prefers-color-scheme:dark){body${Ei}}`
          : `${e}${Ei}`
        : e === !0
          ? `:root${Ei}`
          : "",
    Ti = (e, t) => {
      let n = e.toString();
      for (; n.length < t; ) n = "0" + n;
      return n;
    },
    Po = (e) => {
      const t = Ti(e.getDate(), 2),
        n = Ti(e.getMonth() + 1, 2);
      return `${Ti(e.getFullYear(), 2)}-${n}-${t}`;
    },
    Uo = (e, t, n) => {
      if (!e) return "";
      const i = It(e)
          ? new Date(e.indexOf(" ") !== -1 ? e.replace(/-/g, "/") : e)
          : e,
        r = t.getTime() - i.getTime(),
        s = Math.floor(r / (24 * 3600 * 1e3));
      if (s === 0) {
        const l = r % 864e5,
          o = Math.floor(l / (3600 * 1e3));
        if (o === 0) {
          const a = l % 36e5,
            c = Math.floor(a / (60 * 1e3));
          if (c === 0) {
            const f = a % 6e4;
            return `${Math.round(f / 1e3)} ${n.seconds}`;
          }
          return `${c} ${n.minutes}`;
        }
        return `${o} ${n.hours}`;
      }
      return s < 0 ? n.now : s < 8 ? `${s} ${n.days}` : Po(i);
    },
    Fo =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    No = (e) => Fo.test(e);
  /**
   * @vue/shared v3.4.19
   * (c) 2018-present Yuxi (Evan) You and Vue contributors
   * @license MIT
   **/ function Ri(e, t) {
    const n = new Set(e.split(","));
    return t ? (i) => n.has(i.toLowerCase()) : (i) => n.has(i);
  }
  const ce = {},
    Lt = [],
    Je = () => {},
    Ho = () => !1,
    Mn = (e) =>
      e.charCodeAt(0) === 111 &&
      e.charCodeAt(1) === 110 &&
      (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97),
    Si = (e) => e.startsWith("onUpdate:"),
    Ee = Object.assign,
    Qr = (e, t) => {
      const n = e.indexOf(t);
      n > -1 && e.splice(n, 1);
    },
    Do = Object.prototype.hasOwnProperty,
    Y = (e, t) => Do.call(e, t),
    D = Array.isArray,
    Mt = (e) => Zt(e) === "[object Map]",
    Ot = (e) => Zt(e) === "[object Set]",
    Jr = (e) => Zt(e) === "[object Date]",
    ne = (e) => typeof e == "function",
    be = (e) => typeof e == "string",
    ot = (e) => typeof e == "symbol",
    he = (e) => e !== null && typeof e == "object",
    Yr = (e) => (he(e) || ne(e)) && ne(e.then) && ne(e.catch),
    Xr = Object.prototype.toString,
    Zt = (e) => Xr.call(e),
    Vo = (e) => Zt(e).slice(8, -1),
    es = (e) => Zt(e) === "[object Object]",
    Ai = (e) =>
      be(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
    Gt = Ri(
      ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted",
    ),
    On = (e) => {
      const t = Object.create(null);
      return (n) => t[n] || (t[n] = e(n));
    },
    Bo = /-(\w)/g,
    We = On((e) => e.replace(Bo, (t, n) => (n ? n.toUpperCase() : ""))),
    Wo = /\B([A-Z])/g,
    zt = On((e) => e.replace(Wo, "-$1").toLowerCase()),
    zn = On((e) => e.charAt(0).toUpperCase() + e.slice(1)),
    Ii = On((e) => (e ? `on${zn(e)}` : "")),
    at = (e, t) => !Object.is(e, t),
    jn = (e, t) => {
      for (let n = 0; n < e.length; n++) e[n](t);
    },
    Pn = (e, t, n) => {
      Object.defineProperty(e, t, {
        configurable: !0,
        enumerable: !1,
        value: n,
      });
    },
    Qt = (e) => {
      const t = parseFloat(e);
      return isNaN(t) ? e : t;
    };
  let ts;
  const Li = () =>
    ts ||
    (ts =
      typeof globalThis < "u"
        ? globalThis
        : typeof self < "u"
          ? self
          : typeof window < "u"
            ? window
            : typeof global < "u"
              ? global
              : {});
  function Jt(e) {
    if (D(e)) {
      const t = {};
      for (let n = 0; n < e.length; n++) {
        const i = e[n],
          r = be(i) ? Go(i) : Jt(i);
        if (r) for (const s in r) t[s] = r[s];
      }
      return t;
    } else if (be(e) || he(e)) return e;
  }
  const qo = /;(?![^(]*\))/g,
    Ko = /:([^]+)/,
    Zo = /\/\*[^]*?\*\//g;
  function Go(e) {
    const t = {};
    return (
      e
        .replace(Zo, "")
        .split(qo)
        .forEach((n) => {
          if (n) {
            const i = n.split(Ko);
            i.length > 1 && (t[i[0].trim()] = i[1].trim());
          }
        }),
      t
    );
  }
  function ve(e) {
    let t = "";
    if (be(e)) t = e;
    else if (D(e))
      for (let n = 0; n < e.length; n++) {
        const i = ve(e[n]);
        i && (t += i + " ");
      }
    else if (he(e)) for (const n in e) e[n] && (t += n + " ");
    return t.trim();
  }
  const Qo = Ri(
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  );
  function ns(e) {
    return !!e || e === "";
  }
  function Jo(e, t) {
    if (e.length !== t.length) return !1;
    let n = !0;
    for (let i = 0; n && i < e.length; i++) n = wt(e[i], t[i]);
    return n;
  }
  function wt(e, t) {
    if (e === t) return !0;
    let n = Jr(e),
      i = Jr(t);
    if (n || i) return n && i ? e.getTime() === t.getTime() : !1;
    if (((n = ot(e)), (i = ot(t)), n || i)) return e === t;
    if (((n = D(e)), (i = D(t)), n || i)) return n && i ? Jo(e, t) : !1;
    if (((n = he(e)), (i = he(t)), n || i)) {
      if (!n || !i) return !1;
      const r = Object.keys(e).length,
        s = Object.keys(t).length;
      if (r !== s) return !1;
      for (const l in e) {
        const o = e.hasOwnProperty(l),
          a = t.hasOwnProperty(l);
        if ((o && !a) || (!o && a) || !wt(e[l], t[l])) return !1;
      }
    }
    return String(e) === String(t);
  }
  function Mi(e, t) {
    return e.findIndex((n) => wt(n, t));
  }
  const ie = (e) =>
      be(e)
        ? e
        : e == null
          ? ""
          : D(e) || (he(e) && (e.toString === Xr || !ne(e.toString)))
            ? JSON.stringify(e, is, 2)
            : String(e),
    is = (e, t) =>
      t && t.__v_isRef
        ? is(e, t.value)
        : Mt(t)
          ? {
              [`Map(${t.size})`]: [...t.entries()].reduce(
                (n, [i, r], s) => ((n[Oi(i, s) + " =>"] = r), n),
                {},
              ),
            }
          : Ot(t)
            ? { [`Set(${t.size})`]: [...t.values()].map((n) => Oi(n)) }
            : ot(t)
              ? Oi(t)
              : he(t) && !D(t) && !es(t)
                ? String(t)
                : t,
    Oi = (e, t = "") => {
      var n;
      return ot(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e;
    };
  /**
   * @vue/reactivity v3.4.19
   * (c) 2018-present Yuxi (Evan) You and Vue contributors
   * @license MIT
   **/ let Oe;
  class Yo {
    constructor(t = !1) {
      (this.detached = t),
        (this._active = !0),
        (this.effects = []),
        (this.cleanups = []),
        (this.parent = Oe),
        !t &&
          Oe &&
          (this.index = (Oe.scopes || (Oe.scopes = [])).push(this) - 1);
    }
    get active() {
      return this._active;
    }
    run(t) {
      if (this._active) {
        const n = Oe;
        try {
          return (Oe = this), t();
        } finally {
          Oe = n;
        }
      }
    }
    on() {
      Oe = this;
    }
    off() {
      Oe = this.parent;
    }
    stop(t) {
      if (this._active) {
        let n, i;
        for (n = 0, i = this.effects.length; n < i; n++) this.effects[n].stop();
        for (n = 0, i = this.cleanups.length; n < i; n++) this.cleanups[n]();
        if (this.scopes)
          for (n = 0, i = this.scopes.length; n < i; n++)
            this.scopes[n].stop(!0);
        if (!this.detached && this.parent && !t) {
          const r = this.parent.scopes.pop();
          r &&
            r !== this &&
            ((this.parent.scopes[this.index] = r), (r.index = this.index));
        }
        (this.parent = void 0), (this._active = !1);
      }
    }
  }
  function Xo(e, t = Oe) {
    t && t.active && t.effects.push(e);
  }
  function rs() {
    return Oe;
  }
  function ea(e) {
    Oe && Oe.cleanups.push(e);
  }
  let bt;
  class zi {
    constructor(t, n, i, r) {
      (this.fn = t),
        (this.trigger = n),
        (this.scheduler = i),
        (this.active = !0),
        (this.deps = []),
        (this._dirtyLevel = 4),
        (this._trackId = 0),
        (this._runnings = 0),
        (this._shouldSchedule = !1),
        (this._depsLength = 0),
        Xo(this, r);
    }
    get dirty() {
      return (
        (this._dirtyLevel === 2 || this._dirtyLevel === 3) &&
          ((this._dirtyLevel = 1),
          jt(),
          this._dirtyLevel === 1 && (this._dirtyLevel = 0),
          Pt()),
        this._dirtyLevel >= 4
      );
    }
    set dirty(t) {
      this._dirtyLevel = t ? 4 : 0;
    }
    run() {
      if (((this._dirtyLevel = 0), !this.active)) return this.fn();
      let t = ct,
        n = bt;
      try {
        return (ct = !0), (bt = this), this._runnings++, ss(this), this.fn();
      } finally {
        ls(this), this._runnings--, (bt = n), (ct = t);
      }
    }
    stop() {
      var t;
      this.active &&
        (ss(this),
        ls(this),
        (t = this.onStop) == null || t.call(this),
        (this.active = !1));
    }
  }
  function ss(e) {
    e._trackId++, (e._depsLength = 0);
  }
  function ls(e) {
    if (e.deps.length > e._depsLength) {
      for (let t = e._depsLength; t < e.deps.length; t++) os(e.deps[t], e);
      e.deps.length = e._depsLength;
    }
  }
  function os(e, t) {
    const n = e.get(t);
    n !== void 0 &&
      t._trackId !== n &&
      (e.delete(t), e.size === 0 && e.cleanup());
  }
  let ct = !0,
    ji = 0;
  const as = [];
  function jt() {
    as.push(ct), (ct = !1);
  }
  function Pt() {
    const e = as.pop();
    ct = e === void 0 ? !0 : e;
  }
  function Pi() {
    ji++;
  }
  function Ui() {
    for (ji--; !ji && Fi.length; ) Fi.shift()();
  }
  function cs(e, t, n) {
    if (t.get(e) !== e._trackId) {
      t.set(e, e._trackId);
      const i = e.deps[e._depsLength];
      i !== t
        ? (i && os(i, e), (e.deps[e._depsLength++] = t))
        : e._depsLength++;
    }
  }
  const Fi = [];
  function us(e, t, n) {
    Pi();
    for (const i of e.keys()) {
      let r;
      i._dirtyLevel < t &&
        (r ?? (r = e.get(i) === i._trackId)) &&
        (i._shouldSchedule || (i._shouldSchedule = i._dirtyLevel === 0),
        (i._dirtyLevel = t)),
        i._shouldSchedule &&
          (r ?? (r = e.get(i) === i._trackId)) &&
          (i.trigger(),
          (!i._runnings || i.allowRecurse) &&
            i._dirtyLevel !== 2 &&
            ((i._shouldSchedule = !1), i.scheduler && Fi.push(i.scheduler)));
    }
    Ui();
  }
  const fs = (e, t) => {
      const n = new Map();
      return (n.cleanup = e), (n.computed = t), n;
    },
    Ni = new WeakMap(),
    kt = Symbol(""),
    Hi = Symbol("");
  function Le(e, t, n) {
    if (ct && bt) {
      let i = Ni.get(e);
      i || Ni.set(e, (i = new Map()));
      let r = i.get(n);
      r || i.set(n, (r = fs(() => i.delete(n)))), cs(bt, r);
    }
  }
  function Ye(e, t, n, i, r, s) {
    const l = Ni.get(e);
    if (!l) return;
    let o = [];
    if (t === "clear") o = [...l.values()];
    else if (n === "length" && D(e)) {
      const a = Number(i);
      l.forEach((c, f) => {
        (f === "length" || (!ot(f) && f >= a)) && o.push(c);
      });
    } else
      switch ((n !== void 0 && o.push(l.get(n)), t)) {
        case "add":
          D(e)
            ? Ai(n) && o.push(l.get("length"))
            : (o.push(l.get(kt)), Mt(e) && o.push(l.get(Hi)));
          break;
        case "delete":
          D(e) || (o.push(l.get(kt)), Mt(e) && o.push(l.get(Hi)));
          break;
        case "set":
          Mt(e) && o.push(l.get(kt));
          break;
      }
    Pi();
    for (const a of o) a && us(a, 4);
    Ui();
  }
  const ta = Ri("__proto__,__v_isRef,__isVue"),
    ds = new Set(
      Object.getOwnPropertyNames(Symbol)
        .filter((e) => e !== "arguments" && e !== "caller")
        .map((e) => Symbol[e])
        .filter(ot),
    ),
    hs = na();
  function na() {
    const e = {};
    return (
      ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
        e[t] = function (...n) {
          const i = ee(this);
          for (let s = 0, l = this.length; s < l; s++) Le(i, "get", s + "");
          const r = i[t](...n);
          return r === -1 || r === !1 ? i[t](...n.map(ee)) : r;
        };
      }),
      ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
        e[t] = function (...n) {
          jt(), Pi();
          const i = ee(this)[t].apply(this, n);
          return Ui(), Pt(), i;
        };
      }),
      e
    );
  }
  function ia(e) {
    const t = ee(this);
    return Le(t, "has", e), t.hasOwnProperty(e);
  }
  class ps {
    constructor(t = !1, n = !1) {
      (this._isReadonly = t), (this._shallow = n);
    }
    get(t, n, i) {
      const r = this._isReadonly,
        s = this._shallow;
      if (n === "__v_isReactive") return !r;
      if (n === "__v_isReadonly") return r;
      if (n === "__v_isShallow") return s;
      if (n === "__v_raw")
        return i === (r ? (s ? ma : xs) : s ? ks : bs).get(t) ||
          Object.getPrototypeOf(t) === Object.getPrototypeOf(i)
          ? t
          : void 0;
      const l = D(t);
      if (!r) {
        if (l && Y(hs, n)) return Reflect.get(hs, n, i);
        if (n === "hasOwnProperty") return ia;
      }
      const o = Reflect.get(t, n, i);
      return (ot(n) ? ds.has(n) : ta(n)) || (r || Le(t, "get", n), s)
        ? o
        : Te(o)
          ? l && Ai(n)
            ? o
            : o.value
          : he(o)
            ? r
              ? Xt(o)
              : Yt(o)
            : o;
    }
  }
  class gs extends ps {
    constructor(t = !1) {
      super(!1, t);
    }
    set(t, n, i, r) {
      let s = t[n];
      if (!this._shallow) {
        const a = Ft(s);
        if (
          (!Bn(i) && !Ft(i) && ((s = ee(s)), (i = ee(i))),
          !D(t) && Te(s) && !Te(i))
        )
          return a ? !1 : ((s.value = i), !0);
      }
      const l = D(t) && Ai(n) ? Number(n) < t.length : Y(t, n),
        o = Reflect.set(t, n, i, r);
      return (
        t === ee(r) &&
          (l ? at(i, s) && Ye(t, "set", n, i) : Ye(t, "add", n, i)),
        o
      );
    }
    deleteProperty(t, n) {
      const i = Y(t, n),
        r = Reflect.deleteProperty(t, n);
      return r && i && Ye(t, "delete", n, void 0), r;
    }
    has(t, n) {
      const i = Reflect.has(t, n);
      return (!ot(n) || !ds.has(n)) && Le(t, "has", n), i;
    }
    ownKeys(t) {
      return Le(t, "iterate", D(t) ? "length" : kt), Reflect.ownKeys(t);
    }
  }
  class ra extends ps {
    constructor(t = !1) {
      super(!0, t);
    }
    set(t, n) {
      return !0;
    }
    deleteProperty(t, n) {
      return !0;
    }
  }
  const sa = new gs(),
    la = new ra(),
    oa = new gs(!0),
    Di = (e) => e,
    Un = (e) => Reflect.getPrototypeOf(e);
  function Fn(e, t, n = !1, i = !1) {
    e = e.__v_raw;
    const r = ee(e),
      s = ee(t);
    n || (at(t, s) && Le(r, "get", t), Le(r, "get", s));
    const { has: l } = Un(r),
      o = i ? Di : n ? Wi : en;
    if (l.call(r, t)) return o(e.get(t));
    if (l.call(r, s)) return o(e.get(s));
    e !== r && e.get(t);
  }
  function Nn(e, t = !1) {
    const n = this.__v_raw,
      i = ee(n),
      r = ee(e);
    return (
      t || (at(e, r) && Le(i, "has", e), Le(i, "has", r)),
      e === r ? n.has(e) : n.has(e) || n.has(r)
    );
  }
  function Hn(e, t = !1) {
    return (
      (e = e.__v_raw), !t && Le(ee(e), "iterate", kt), Reflect.get(e, "size", e)
    );
  }
  function ms(e) {
    e = ee(e);
    const t = ee(this);
    return Un(t).has.call(t, e) || (t.add(e), Ye(t, "add", e, e)), this;
  }
  function vs(e, t) {
    t = ee(t);
    const n = ee(this),
      { has: i, get: r } = Un(n);
    let s = i.call(n, e);
    s || ((e = ee(e)), (s = i.call(n, e)));
    const l = r.call(n, e);
    return (
      n.set(e, t), s ? at(t, l) && Ye(n, "set", e, t) : Ye(n, "add", e, t), this
    );
  }
  function ys(e) {
    const t = ee(this),
      { has: n, get: i } = Un(t);
    let r = n.call(t, e);
    r || ((e = ee(e)), (r = n.call(t, e))), i && i.call(t, e);
    const s = t.delete(e);
    return r && Ye(t, "delete", e, void 0), s;
  }
  function ws() {
    const e = ee(this),
      t = e.size !== 0,
      n = e.clear();
    return t && Ye(e, "clear", void 0, void 0), n;
  }
  function Dn(e, t) {
    return function (i, r) {
      const s = this,
        l = s.__v_raw,
        o = ee(l),
        a = t ? Di : e ? Wi : en;
      return (
        !e && Le(o, "iterate", kt),
        l.forEach((c, f) => i.call(r, a(c), a(f), s))
      );
    };
  }
  function Vn(e, t, n) {
    return function (...i) {
      const r = this.__v_raw,
        s = ee(r),
        l = Mt(s),
        o = e === "entries" || (e === Symbol.iterator && l),
        a = e === "keys" && l,
        c = r[e](...i),
        f = n ? Di : t ? Wi : en;
      return (
        !t && Le(s, "iterate", a ? Hi : kt),
        {
          next() {
            const { value: p, done: h } = c.next();
            return h
              ? { value: p, done: h }
              : { value: o ? [f(p[0]), f(p[1])] : f(p), done: h };
          },
          [Symbol.iterator]() {
            return this;
          },
        }
      );
    };
  }
  function ut(e) {
    return function (...t) {
      return e === "delete" ? !1 : e === "clear" ? void 0 : this;
    };
  }
  function aa() {
    const e = {
        get(s) {
          return Fn(this, s);
        },
        get size() {
          return Hn(this);
        },
        has: Nn,
        add: ms,
        set: vs,
        delete: ys,
        clear: ws,
        forEach: Dn(!1, !1),
      },
      t = {
        get(s) {
          return Fn(this, s, !1, !0);
        },
        get size() {
          return Hn(this);
        },
        has: Nn,
        add: ms,
        set: vs,
        delete: ys,
        clear: ws,
        forEach: Dn(!1, !0),
      },
      n = {
        get(s) {
          return Fn(this, s, !0);
        },
        get size() {
          return Hn(this, !0);
        },
        has(s) {
          return Nn.call(this, s, !0);
        },
        add: ut("add"),
        set: ut("set"),
        delete: ut("delete"),
        clear: ut("clear"),
        forEach: Dn(!0, !1),
      },
      i = {
        get(s) {
          return Fn(this, s, !0, !0);
        },
        get size() {
          return Hn(this, !0);
        },
        has(s) {
          return Nn.call(this, s, !0);
        },
        add: ut("add"),
        set: ut("set"),
        delete: ut("delete"),
        clear: ut("clear"),
        forEach: Dn(!0, !0),
      };
    return (
      ["keys", "values", "entries", Symbol.iterator].forEach((s) => {
        (e[s] = Vn(s, !1, !1)),
          (n[s] = Vn(s, !0, !1)),
          (t[s] = Vn(s, !1, !0)),
          (i[s] = Vn(s, !0, !0));
      }),
      [e, n, t, i]
    );
  }
  const [ca, ua, fa, da] = aa();
  function Vi(e, t) {
    const n = t ? (e ? da : fa) : e ? ua : ca;
    return (i, r, s) =>
      r === "__v_isReactive"
        ? !e
        : r === "__v_isReadonly"
          ? e
          : r === "__v_raw"
            ? i
            : Reflect.get(Y(n, r) && r in i ? n : i, r, s);
  }
  const ha = { get: Vi(!1, !1) },
    pa = { get: Vi(!1, !0) },
    ga = { get: Vi(!0, !1) },
    bs = new WeakMap(),
    ks = new WeakMap(),
    xs = new WeakMap(),
    ma = new WeakMap();
  function va(e) {
    switch (e) {
      case "Object":
      case "Array":
        return 1;
      case "Map":
      case "Set":
      case "WeakMap":
      case "WeakSet":
        return 2;
      default:
        return 0;
    }
  }
  function ya(e) {
    return e.__v_skip || !Object.isExtensible(e) ? 0 : va(Vo(e));
  }
  function Yt(e) {
    return Ft(e) ? e : Bi(e, !1, sa, ha, bs);
  }
  function wa(e) {
    return Bi(e, !1, oa, pa, ks);
  }
  function Xt(e) {
    return Bi(e, !0, la, ga, xs);
  }
  function Bi(e, t, n, i, r) {
    if (!he(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
    const s = r.get(e);
    if (s) return s;
    const l = ya(e);
    if (l === 0) return e;
    const o = new Proxy(e, l === 2 ? i : n);
    return r.set(e, o), o;
  }
  function Ut(e) {
    return Ft(e) ? Ut(e.__v_raw) : !!(e && e.__v_isReactive);
  }
  function Ft(e) {
    return !!(e && e.__v_isReadonly);
  }
  function Bn(e) {
    return !!(e && e.__v_isShallow);
  }
  function _s(e) {
    return Ut(e) || Ft(e);
  }
  function ee(e) {
    const t = e && e.__v_raw;
    return t ? ee(t) : e;
  }
  function Cs(e) {
    return Object.isExtensible(e) && Pn(e, "__v_skip", !0), e;
  }
  const en = (e) => (he(e) ? Yt(e) : e),
    Wi = (e) => (he(e) ? Xt(e) : e);
  class $s {
    constructor(t, n, i, r) {
      (this._setter = n),
        (this.dep = void 0),
        (this.__v_isRef = !0),
        (this.__v_isReadonly = !1),
        (this.effect = new zi(
          () => t(this._value),
          () => Wn(this, this.effect._dirtyLevel === 2 ? 2 : 3),
        )),
        (this.effect.computed = this),
        (this.effect.active = this._cacheable = !r),
        (this.__v_isReadonly = i);
    }
    get value() {
      const t = ee(this);
      return (
        (!t._cacheable || t.effect.dirty) &&
          at(t._value, (t._value = t.effect.run())) &&
          Wn(t, 4),
        Es(t),
        t.effect._dirtyLevel >= 2 && Wn(t, 2),
        t._value
      );
    }
    set value(t) {
      this._setter(t);
    }
    get _dirty() {
      return this.effect.dirty;
    }
    set _dirty(t) {
      this.effect.dirty = t;
    }
  }
  function ba(e, t, n = !1) {
    let i, r;
    const s = ne(e);
    return (
      s ? ((i = e), (r = Je)) : ((i = e.get), (r = e.set)),
      new $s(i, r, s || !r, n)
    );
  }
  function Es(e) {
    var t;
    ct &&
      bt &&
      ((e = ee(e)),
      cs(
        bt,
        (t = e.dep) != null
          ? t
          : (e.dep = fs(() => (e.dep = void 0), e instanceof $s ? e : void 0)),
      ));
  }
  function Wn(e, t = 4, n) {
    e = ee(e);
    const i = e.dep;
    i && us(i, t);
  }
  function Te(e) {
    return !!(e && e.__v_isRef === !0);
  }
  function q(e) {
    return Ts(e, !1);
  }
  function ka(e) {
    return Ts(e, !0);
  }
  function Ts(e, t) {
    return Te(e) ? e : new xa(e, t);
  }
  class xa {
    constructor(t, n) {
      (this.__v_isShallow = n),
        (this.dep = void 0),
        (this.__v_isRef = !0),
        (this._rawValue = n ? t : ee(t)),
        (this._value = n ? t : en(t));
    }
    get value() {
      return Es(this), this._value;
    }
    set value(t) {
      const n = this.__v_isShallow || Bn(t) || Ft(t);
      (t = n ? t : ee(t)),
        at(t, this._rawValue) &&
          ((this._rawValue = t), (this._value = n ? t : en(t)), Wn(this, 4));
    }
  }
  function G(e) {
    return Te(e) ? e.value : e;
  }
  const _a = {
    get: (e, t, n) => G(Reflect.get(e, t, n)),
    set: (e, t, n, i) => {
      const r = e[t];
      return Te(r) && !Te(n) ? ((r.value = n), !0) : Reflect.set(e, t, n, i);
    },
  };
  function Rs(e) {
    return Ut(e) ? e : new Proxy(e, _a);
  }
  /**
   * @vue/runtime-core v3.4.19
   * (c) 2018-present Yuxi (Evan) You and Vue contributors
   * @license MIT
   **/ function ft(e, t, n, i) {
    try {
      return i ? e(...i) : e();
    } catch (r) {
      qn(r, t, n);
    }
  }
  function qe(e, t, n, i) {
    if (ne(e)) {
      const s = ft(e, t, n, i);
      return (
        s &&
          Yr(s) &&
          s.catch((l) => {
            qn(l, t, n);
          }),
        s
      );
    }
    const r = [];
    for (let s = 0; s < e.length; s++) r.push(qe(e[s], t, n, i));
    return r;
  }
  function qn(e, t, n, i = !0) {
    const r = t ? t.vnode : null;
    if (t) {
      let s = t.parent;
      const l = t.proxy,
        o = `https://vuejs.org/error-reference/#runtime-${n}`;
      for (; s; ) {
        const c = s.ec;
        if (c) {
          for (let f = 0; f < c.length; f++) if (c[f](e, l, o) === !1) return;
        }
        s = s.parent;
      }
      const a = t.appContext.config.errorHandler;
      if (a) {
        ft(a, null, 10, [e, l, o]);
        return;
      }
    }
    Ca(e, n, r, i);
  }
  function Ca(e, t, n, i = !0) {
    console.error(e);
  }
  let tn = !1,
    qi = !1;
  const Ce = [];
  let Ke = 0;
  const Nt = [];
  let dt = null,
    xt = 0;
  const Ss = Promise.resolve();
  let Ki = null;
  function nn(e) {
    const t = Ki || Ss;
    return e ? t.then(this ? e.bind(this) : e) : t;
  }
  function $a(e) {
    let t = Ke + 1,
      n = Ce.length;
    for (; t < n; ) {
      const i = (t + n) >>> 1,
        r = Ce[i],
        s = rn(r);
      s < e || (s === e && r.pre) ? (t = i + 1) : (n = i);
    }
    return t;
  }
  function Zi(e) {
    (!Ce.length || !Ce.includes(e, tn && e.allowRecurse ? Ke + 1 : Ke)) &&
      (e.id == null ? Ce.push(e) : Ce.splice($a(e.id), 0, e), As());
  }
  function As() {
    !tn && !qi && ((qi = !0), (Ki = Ss.then(Ms)));
  }
  function Ea(e) {
    const t = Ce.indexOf(e);
    t > Ke && Ce.splice(t, 1);
  }
  function Ta(e) {
    D(e)
      ? Nt.push(...e)
      : (!dt || !dt.includes(e, e.allowRecurse ? xt + 1 : xt)) && Nt.push(e),
      As();
  }
  function Is(e, t, n = tn ? Ke + 1 : 0) {
    for (; n < Ce.length; n++) {
      const i = Ce[n];
      if (i && i.pre) {
        if (e && i.id !== e.uid) continue;
        Ce.splice(n, 1), n--, i();
      }
    }
  }
  function Ls(e) {
    if (Nt.length) {
      const t = [...new Set(Nt)].sort((n, i) => rn(n) - rn(i));
      if (((Nt.length = 0), dt)) {
        dt.push(...t);
        return;
      }
      for (dt = t, xt = 0; xt < dt.length; xt++) dt[xt]();
      (dt = null), (xt = 0);
    }
  }
  const rn = (e) => (e.id == null ? 1 / 0 : e.id),
    Ra = (e, t) => {
      const n = rn(e) - rn(t);
      if (n === 0) {
        if (e.pre && !t.pre) return -1;
        if (t.pre && !e.pre) return 1;
      }
      return n;
    };
  function Ms(e) {
    (qi = !1), (tn = !0), Ce.sort(Ra);
    try {
      for (Ke = 0; Ke < Ce.length; Ke++) {
        const t = Ce[Ke];
        t && t.active !== !1 && ft(t, null, 14);
      }
    } finally {
      (Ke = 0),
        (Ce.length = 0),
        Ls(),
        (tn = !1),
        (Ki = null),
        (Ce.length || Nt.length) && Ms();
    }
  }
  function Sa(e, t, ...n) {
    if (e.isUnmounted) return;
    const i = e.vnode.props || ce;
    let r = n;
    const s = t.startsWith("update:"),
      l = s && t.slice(7);
    if (l && l in i) {
      const f = `${l === "modelValue" ? "model" : l}Modifiers`,
        { number: p, trim: h } = i[f] || ce;
      h && (r = n.map((m) => (be(m) ? m.trim() : m))), p && (r = n.map(Qt));
    }
    let o,
      a = i[(o = Ii(t))] || i[(o = Ii(We(t)))];
    !a && s && (a = i[(o = Ii(zt(t)))]), a && qe(a, e, 6, r);
    const c = i[o + "Once"];
    if (c) {
      if (!e.emitted) e.emitted = {};
      else if (e.emitted[o]) return;
      (e.emitted[o] = !0), qe(c, e, 6, r);
    }
  }
  function Aa(e, t, n = !1) {
    const i = t.emitsCache,
      r = i.get(e);
    if (r !== void 0) return r;
    const s = e.emits;
    let l = {};
    return !s && !!1
      ? (he(e) && i.set(e, null), null)
      : (D(s) ? s.forEach((a) => (l[a] = null)) : Ee(l, s),
        he(e) && i.set(e, l),
        l);
  }
  function Kn(e, t) {
    return !e || !Mn(t)
      ? !1
      : ((t = t.slice(2).replace(/Once$/, "")),
        Y(e, t[0].toLowerCase() + t.slice(1)) || Y(e, zt(t)) || Y(e, t));
  }
  let Re = null,
    Os = null;
  function Zn(e) {
    const t = Re;
    return (Re = e), (Os = (e && e.type.__scopeId) || null), t;
  }
  function Ia(e, t = Re, n) {
    if (!t || e._n) return e;
    const i = (...r) => {
      i._d && tl(-1);
      const s = Zn(t);
      let l;
      try {
        l = e(...r);
      } finally {
        Zn(s), i._d && tl(1);
      }
      return l;
    };
    return (i._n = !0), (i._c = !0), (i._d = !0), i;
  }
  function Gi(e) {
    const {
      type: t,
      vnode: n,
      proxy: i,
      withProxy: r,
      props: s,
      propsOptions: [l],
      slots: o,
      attrs: a,
      emit: c,
      render: f,
      renderCache: p,
      data: h,
      setupState: m,
      ctx: S,
      inheritAttrs: x,
    } = e;
    let C, w;
    const T = Zn(e);
    try {
      if (n.shapeFlag & 4) {
        const N = r || i,
          U = N;
        (C = Ze(f.call(U, N, p, s, m, h, S))), (w = a);
      } else {
        const N = t;
        (C = Ze(
          N.length > 1 ? N(s, { attrs: a, slots: o, emit: c }) : N(s, null),
        )),
          (w = t.props ? a : La(a));
      }
    } catch (N) {
      (un.length = 0), qn(N, e, 1), (C = re(Et));
    }
    let P = C;
    if (w && x !== !1) {
      const N = Object.keys(w),
        { shapeFlag: U } = P;
      N.length && U & 7 && (l && N.some(Si) && (w = Ma(w, l)), (P = Ht(P, w)));
    }
    return (
      n.dirs &&
        ((P = Ht(P)), (P.dirs = P.dirs ? P.dirs.concat(n.dirs) : n.dirs)),
      n.transition && (P.transition = n.transition),
      (C = P),
      Zn(T),
      C
    );
  }
  const La = (e) => {
      let t;
      for (const n in e)
        (n === "class" || n === "style" || Mn(n)) &&
          ((t || (t = {}))[n] = e[n]);
      return t;
    },
    Ma = (e, t) => {
      const n = {};
      for (const i in e) (!Si(i) || !(i.slice(9) in t)) && (n[i] = e[i]);
      return n;
    };
  function Oa(e, t, n) {
    const { props: i, children: r, component: s } = e,
      { props: l, children: o, patchFlag: a } = t,
      c = s.emitsOptions;
    if (t.dirs || t.transition) return !0;
    if (n && a >= 0) {
      if (a & 1024) return !0;
      if (a & 16) return i ? zs(i, l, c) : !!l;
      if (a & 8) {
        const f = t.dynamicProps;
        for (let p = 0; p < f.length; p++) {
          const h = f[p];
          if (l[h] !== i[h] && !Kn(c, h)) return !0;
        }
      }
    } else
      return (r || o) && (!o || !o.$stable)
        ? !0
        : i === l
          ? !1
          : i
            ? l
              ? zs(i, l, c)
              : !0
            : !!l;
    return !1;
  }
  function zs(e, t, n) {
    const i = Object.keys(t);
    if (i.length !== Object.keys(e).length) return !0;
    for (let r = 0; r < i.length; r++) {
      const s = i[r];
      if (t[s] !== e[s] && !Kn(n, s)) return !0;
    }
    return !1;
  }
  function za({ vnode: e, parent: t }, n) {
    for (; t; ) {
      const i = t.subTree;
      if (
        (i.suspense && i.suspense.activeBranch === e && (i.el = e.el), i === e)
      )
        ((e = t.vnode).el = n), (t = t.parent);
      else break;
    }
  }
  const js = "components";
  function ja(e, t) {
    return Ua(js, e, !0, t) || e;
  }
  const Pa = Symbol.for("v-ndc");
  function Ua(e, t, n = !0, i = !1) {
    const r = Re || Ae;
    if (r) {
      const s = r.type;
      if (e === js) {
        const o = Cc(s, !1);
        if (o && (o === t || o === We(t) || o === zn(We(t)))) return s;
      }
      const l = Ps(r[e] || s[e], t) || Ps(r.appContext[e], t);
      return !l && i ? s : l;
    }
  }
  function Ps(e, t) {
    return e && (e[t] || e[We(t)] || e[zn(We(t))]);
  }
  const Fa = (e) => e.__isSuspense;
  function Na(e, t) {
    t && t.pendingBranch
      ? D(e)
        ? t.effects.push(...e)
        : t.effects.push(e)
      : Ta(e);
  }
  const Ha = Symbol.for("v-scx"),
    Da = () => ei(Ha);
  function Us(e, t) {
    return Fs(e, null, t);
  }
  const Gn = {};
  function Pe(e, t, n) {
    return Fs(e, t, n);
  }
  function Fs(
    e,
    t,
    { immediate: n, deep: i, flush: r, once: s, onTrack: l, onTrigger: o } = ce,
  ) {
    if (t && s) {
      const z = t;
      t = (...W) => {
        z(...W), U();
      };
    }
    const a = Ae,
      c = (z) => (i === !0 ? z : _t(z, i === !1 ? 1 : void 0));
    let f,
      p = !1,
      h = !1;
    if (
      (Te(e)
        ? ((f = () => e.value), (p = Bn(e)))
        : Ut(e)
          ? ((f = () => c(e)), (p = !0))
          : D(e)
            ? ((h = !0),
              (p = e.some((z) => Ut(z) || Bn(z))),
              (f = () =>
                e.map((z) => {
                  if (Te(z)) return z.value;
                  if (Ut(z)) return c(z);
                  if (ne(z)) return ft(z, a, 2);
                })))
            : ne(e)
              ? t
                ? (f = () => ft(e, a, 2))
                : (f = () => (m && m(), qe(e, a, 3, [S])))
              : (f = Je),
      t && i)
    ) {
      const z = f;
      f = () => _t(z());
    }
    let m,
      S = (z) => {
        m = P.onStop = () => {
          ft(z, a, 4), (m = P.onStop = void 0);
        };
      },
      x;
    if (si)
      if (
        ((S = Je),
        t ? n && qe(t, a, 3, [f(), h ? [] : void 0, S]) : f(),
        r === "sync")
      ) {
        const z = Da();
        x = z.__watcherHandles || (z.__watcherHandles = []);
      } else return Je;
    let C = h ? new Array(e.length).fill(Gn) : Gn;
    const w = () => {
      if (!(!P.active || !P.dirty))
        if (t) {
          const z = P.run();
          (i || p || (h ? z.some((W, B) => at(W, C[B])) : at(z, C))) &&
            (m && m(),
            qe(t, a, 3, [z, C === Gn ? void 0 : h && C[0] === Gn ? [] : C, S]),
            (C = z));
        } else P.run();
    };
    w.allowRecurse = !!t;
    let T;
    r === "sync"
      ? (T = w)
      : r === "post"
        ? (T = () => Me(w, a && a.suspense))
        : ((w.pre = !0), a && (w.id = a.uid), (T = () => Zi(w)));
    const P = new zi(f, Je, T),
      N = rs(),
      U = () => {
        P.stop(), N && Qr(N.effects, P);
      };
    return (
      t
        ? n
          ? w()
          : (C = P.run())
        : r === "post"
          ? Me(P.run.bind(P), a && a.suspense)
          : P.run(),
      x && x.push(U),
      U
    );
  }
  function _t(e, t, n = 0, i) {
    if (!he(e) || e.__v_skip) return e;
    if (t && t > 0) {
      if (n >= t) return e;
      n++;
    }
    if (((i = i || new Set()), i.has(e))) return e;
    if ((i.add(e), Te(e))) _t(e.value, t, n, i);
    else if (D(e)) for (let r = 0; r < e.length; r++) _t(e[r], t, n, i);
    else if (Ot(e) || Mt(e))
      e.forEach((r) => {
        _t(r, t, n, i);
      });
    else if (es(e)) for (const r in e) _t(e[r], t, n, i);
    return e;
  }
  function Qn(e, t) {
    if (Re === null) return e;
    const n = li(Re) || Re.proxy,
      i = e.dirs || (e.dirs = []);
    for (let r = 0; r < t.length; r++) {
      let [s, l, o, a = ce] = t[r];
      s &&
        (ne(s) && (s = { mounted: s, updated: s }),
        s.deep && _t(l),
        i.push({
          dir: s,
          instance: n,
          value: l,
          oldValue: void 0,
          arg: o,
          modifiers: a,
        }));
    }
    return e;
  }
  function Ct(e, t, n, i) {
    const r = e.dirs,
      s = t && t.dirs;
    for (let l = 0; l < r.length; l++) {
      const o = r[l];
      s && (o.oldValue = s[l].value);
      let a = o.dir[i];
      a && (jt(), qe(a, n, 8, [e.el, o, e, t]), Pt());
    }
  }
  /*! #__NO_SIDE_EFFECTS__ */ function sn(e, t) {
    return ne(e) ? Ee({ name: e.name }, t, { setup: e }) : e;
  }
  const Jn = (e) => !!e.type.__asyncLoader,
    Va = (e) => e.type.__isKeepAlive;
  function Ba(e, t, n = Ae, i = !1) {
    if (n) {
      const r = n[e] || (n[e] = []),
        s =
          t.__weh ||
          (t.__weh = (...l) => {
            if (n.isUnmounted) return;
            jt();
            const o = or(n),
              a = qe(t, n, e, l);
            return o(), Pt(), a;
          });
      return i ? r.unshift(s) : r.push(s), s;
    }
  }
  const Qi =
      (e) =>
      (t, n = Ae) =>
        (!si || e === "sp") && Ba(e, (...i) => t(...i), n),
    ln = Qi("m"),
    Wa = Qi("bum"),
    Yn = Qi("um");
  function Ue(e, t, n, i) {
    let r;
    const s = n && n[i];
    if (D(e) || be(e)) {
      r = new Array(e.length);
      for (let l = 0, o = e.length; l < o; l++)
        r[l] = t(e[l], l, void 0, s && s[l]);
    } else if (typeof e == "number") {
      r = new Array(e);
      for (let l = 0; l < e; l++) r[l] = t(l + 1, l, void 0, s && s[l]);
    } else if (he(e))
      if (e[Symbol.iterator])
        r = Array.from(e, (l, o) => t(l, o, void 0, s && s[o]));
      else {
        const l = Object.keys(e);
        r = new Array(l.length);
        for (let o = 0, a = l.length; o < a; o++) {
          const c = l[o];
          r[o] = t(e[c], c, o, s && s[o]);
        }
      }
    else r = [];
    return n && (n[i] = r), r;
  }
  const Ji = (e) => (e ? (sl(e) ? li(e) || e.proxy : Ji(e.parent)) : null),
    on = Ee(Object.create(null), {
      $: (e) => e,
      $el: (e) => e.vnode.el,
      $data: (e) => e.data,
      $props: (e) => e.props,
      $attrs: (e) => e.attrs,
      $slots: (e) => e.slots,
      $refs: (e) => e.refs,
      $parent: (e) => Ji(e.parent),
      $root: (e) => Ji(e.root),
      $emit: (e) => e.emit,
      $options: (e) => e.type,
      $forceUpdate: (e) =>
        e.f ||
        (e.f = () => {
          (e.effect.dirty = !0), Zi(e.update);
        }),
      $nextTick: (e) => e.n || (e.n = nn.bind(e.proxy)),
      $watch: (e) => Je,
    }),
    Yi = (e, t) => e !== ce && !e.__isScriptSetup && Y(e, t),
    qa = {
      get({ _: e }, t) {
        const {
          ctx: n,
          setupState: i,
          data: r,
          props: s,
          accessCache: l,
          type: o,
          appContext: a,
        } = e;
        let c;
        if (t[0] !== "$") {
          const m = l[t];
          if (m !== void 0)
            switch (m) {
              case 1:
                return i[t];
              case 2:
                return r[t];
              case 4:
                return n[t];
              case 3:
                return s[t];
            }
          else {
            if (Yi(i, t)) return (l[t] = 1), i[t];
            if (r !== ce && Y(r, t)) return (l[t] = 2), r[t];
            if ((c = e.propsOptions[0]) && Y(c, t)) return (l[t] = 3), s[t];
            if (n !== ce && Y(n, t)) return (l[t] = 4), n[t];
            l[t] = 0;
          }
        }
        const f = on[t];
        let p, h;
        if (f) return t === "$attrs" && Le(e, "get", t), f(e);
        if ((p = o.__cssModules) && (p = p[t])) return p;
        if (n !== ce && Y(n, t)) return (l[t] = 4), n[t];
        if (((h = a.config.globalProperties), Y(h, t))) return h[t];
      },
      set({ _: e }, t, n) {
        const { data: i, setupState: r, ctx: s } = e;
        return Yi(r, t)
          ? ((r[t] = n), !0)
          : i !== ce && Y(i, t)
            ? ((i[t] = n), !0)
            : Y(e.props, t) || (t[0] === "$" && t.slice(1) in e)
              ? !1
              : ((s[t] = n), !0);
      },
      has(
        {
          _: {
            data: e,
            setupState: t,
            accessCache: n,
            ctx: i,
            appContext: r,
            propsOptions: s,
          },
        },
        l,
      ) {
        let o;
        return (
          !!n[l] ||
          (e !== ce && Y(e, l)) ||
          Yi(t, l) ||
          ((o = s[0]) && Y(o, l)) ||
          Y(i, l) ||
          Y(on, l) ||
          Y(r.config.globalProperties, l)
        );
      },
      defineProperty(e, t, n) {
        return (
          n.get != null
            ? (e._.accessCache[t] = 0)
            : Y(n, "value") && this.set(e, t, n.value, null),
          Reflect.defineProperty(e, t, n)
        );
      },
    };
  function Ns(e) {
    return D(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e;
  }
  function Ka(e) {
    const t = e.type,
      { mixins: n, extends: i } = t,
      {
        mixins: r,
        optionsCache: s,
        config: { optionMergeStrategies: l },
      } = e.appContext,
      o = s.get(t);
    let a;
    return (
      o
        ? (a = o)
        : !r.length && !n && !i
          ? (a = t)
          : ((a = {}),
            r.length && r.forEach((c) => Xn(a, c, l, !0)),
            Xn(a, t, l)),
      he(t) && s.set(t, a),
      a
    );
  }
  function Xn(e, t, n, i = !1) {
    const { mixins: r, extends: s } = t;
    s && Xn(e, s, n, !0), r && r.forEach((l) => Xn(e, l, n, !0));
    for (const l in t)
      if (!(i && l === "expose")) {
        const o = Za[l] || (n && n[l]);
        e[l] = o ? o(e[l], t[l]) : t[l];
      }
    return e;
  }
  const Za = {
    data: Hs,
    props: Vs,
    emits: Vs,
    methods: an,
    computed: an,
    beforeCreate: Se,
    created: Se,
    beforeMount: Se,
    mounted: Se,
    beforeUpdate: Se,
    updated: Se,
    beforeDestroy: Se,
    beforeUnmount: Se,
    destroyed: Se,
    unmounted: Se,
    activated: Se,
    deactivated: Se,
    errorCaptured: Se,
    serverPrefetch: Se,
    components: an,
    directives: an,
    watch: Qa,
    provide: Hs,
    inject: Ga,
  };
  function Hs(e, t) {
    return t
      ? e
        ? function () {
            return Ee(
              ne(e) ? e.call(this, this) : e,
              ne(t) ? t.call(this, this) : t,
            );
          }
        : t
      : e;
  }
  function Ga(e, t) {
    return an(Ds(e), Ds(t));
  }
  function Ds(e) {
    if (D(e)) {
      const t = {};
      for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
      return t;
    }
    return e;
  }
  function Se(e, t) {
    return e ? [...new Set([].concat(e, t))] : t;
  }
  function an(e, t) {
    return e ? Ee(Object.create(null), e, t) : t;
  }
  function Vs(e, t) {
    return e
      ? D(e) && D(t)
        ? [...new Set([...e, ...t])]
        : Ee(Object.create(null), Ns(e), Ns(t ?? {}))
      : t;
  }
  function Qa(e, t) {
    if (!e) return t;
    if (!t) return e;
    const n = Ee(Object.create(null), e);
    for (const i in t) n[i] = Se(e[i], t[i]);
    return n;
  }
  function Bs() {
    return {
      app: null,
      config: {
        isNativeTag: Ho,
        performance: !1,
        globalProperties: {},
        optionMergeStrategies: {},
        errorHandler: void 0,
        warnHandler: void 0,
        compilerOptions: {},
      },
      mixins: [],
      components: {},
      directives: {},
      provides: Object.create(null),
      optionsCache: new WeakMap(),
      propsCache: new WeakMap(),
      emitsCache: new WeakMap(),
    };
  }
  let Ja = 0;
  function Ya(e, t) {
    return function (i, r = null) {
      ne(i) || (i = Ee({}, i)), r != null && !he(r) && (r = null);
      const s = Bs(),
        l = new WeakSet();
      let o = !1;
      const a = (s.app = {
        _uid: Ja++,
        _component: i,
        _props: r,
        _container: null,
        _context: s,
        _instance: null,
        version: Ec,
        get config() {
          return s.config;
        },
        set config(c) {},
        use(c, ...f) {
          return (
            l.has(c) ||
              (c && ne(c.install)
                ? (l.add(c), c.install(a, ...f))
                : ne(c) && (l.add(c), c(a, ...f))),
            a
          );
        },
        mixin(c) {
          return a;
        },
        component(c, f) {
          return f ? ((s.components[c] = f), a) : s.components[c];
        },
        directive(c, f) {
          return f ? ((s.directives[c] = f), a) : s.directives[c];
        },
        mount(c, f, p) {
          if (!o) {
            const h = re(i, r);
            return (
              (h.appContext = s),
              p === !0 ? (p = "svg") : p === !1 && (p = void 0),
              f && t ? t(h, c) : e(h, c, p),
              (o = !0),
              (a._container = c),
              (c.__vue_app__ = a),
              li(h.component) || h.component.proxy
            );
          }
        },
        unmount() {
          o && (e(null, a._container), delete a._container.__vue_app__);
        },
        provide(c, f) {
          return (s.provides[c] = f), a;
        },
        runWithContext(c) {
          const f = cn;
          cn = a;
          try {
            return c();
          } finally {
            cn = f;
          }
        },
      });
      return a;
    };
  }
  let cn = null;
  function Xa(e, t) {
    if (Ae) {
      let n = Ae.provides;
      const i = Ae.parent && Ae.parent.provides;
      i === n && (n = Ae.provides = Object.create(i)), (n[e] = t);
    }
  }
  function ei(e, t, n = !1) {
    const i = Ae || Re;
    if (i || cn) {
      const r = i
        ? i.parent == null
          ? i.vnode.appContext && i.vnode.appContext.provides
          : i.parent.provides
        : cn._context.provides;
      if (r && e in r) return r[e];
      if (arguments.length > 1) return n && ne(t) ? t.call(i && i.proxy) : t;
    }
  }
  function ec(e, t, n, i = !1) {
    const r = {},
      s = {};
    Pn(s, ni, 1), (e.propsDefaults = Object.create(null)), Ws(e, t, r, s);
    for (const l in e.propsOptions[0]) l in r || (r[l] = void 0);
    n
      ? (e.props = i ? r : wa(r))
      : e.type.props
        ? (e.props = r)
        : (e.props = s),
      (e.attrs = s);
  }
  function tc(e, t, n, i) {
    const {
        props: r,
        attrs: s,
        vnode: { patchFlag: l },
      } = e,
      o = ee(r),
      [a] = e.propsOptions;
    let c = !1;
    if ((i || l > 0) && !(l & 16)) {
      if (l & 8) {
        const f = e.vnode.dynamicProps;
        for (let p = 0; p < f.length; p++) {
          let h = f[p];
          if (Kn(e.emitsOptions, h)) continue;
          const m = t[h];
          if (a)
            if (Y(s, h)) m !== s[h] && ((s[h] = m), (c = !0));
            else {
              const S = We(h);
              r[S] = Xi(a, o, S, m, e, !1);
            }
          else m !== s[h] && ((s[h] = m), (c = !0));
        }
      }
    } else {
      Ws(e, t, r, s) && (c = !0);
      let f;
      for (const p in o)
        (!t || (!Y(t, p) && ((f = zt(p)) === p || !Y(t, f)))) &&
          (a
            ? n &&
              (n[p] !== void 0 || n[f] !== void 0) &&
              (r[p] = Xi(a, o, p, void 0, e, !0))
            : delete r[p]);
      if (s !== o)
        for (const p in s) (!t || !Y(t, p)) && (delete s[p], (c = !0));
    }
    c && Ye(e, "set", "$attrs");
  }
  function Ws(e, t, n, i) {
    const [r, s] = e.propsOptions;
    let l = !1,
      o;
    if (t)
      for (let a in t) {
        if (Gt(a)) continue;
        const c = t[a];
        let f;
        r && Y(r, (f = We(a)))
          ? !s || !s.includes(f)
            ? (n[f] = c)
            : ((o || (o = {}))[f] = c)
          : Kn(e.emitsOptions, a) ||
            ((!(a in i) || c !== i[a]) && ((i[a] = c), (l = !0)));
      }
    if (s) {
      const a = ee(n),
        c = o || ce;
      for (let f = 0; f < s.length; f++) {
        const p = s[f];
        n[p] = Xi(r, a, p, c[p], e, !Y(c, p));
      }
    }
    return l;
  }
  function Xi(e, t, n, i, r, s) {
    const l = e[n];
    if (l != null) {
      const o = Y(l, "default");
      if (o && i === void 0) {
        const a = l.default;
        if (l.type !== Function && !l.skipFactory && ne(a)) {
          const { propsDefaults: c } = r;
          if (n in c) i = c[n];
          else {
            const f = or(r);
            (i = c[n] = a.call(null, t)), f();
          }
        } else i = a;
      }
      l[0] &&
        (s && !o ? (i = !1) : l[1] && (i === "" || i === zt(n)) && (i = !0));
    }
    return i;
  }
  function nc(e, t, n = !1) {
    const i = t.propsCache,
      r = i.get(e);
    if (r) return r;
    const s = e.props,
      l = {},
      o = [];
    if (!s && !!1) return he(e) && i.set(e, Lt), Lt;
    if (D(s))
      for (let f = 0; f < s.length; f++) {
        const p = We(s[f]);
        qs(p) && (l[p] = ce);
      }
    else if (s)
      for (const f in s) {
        const p = We(f);
        if (qs(p)) {
          const h = s[f],
            m = (l[p] = D(h) || ne(h) ? { type: h } : Ee({}, h));
          if (m) {
            const S = Gs(Boolean, m.type),
              x = Gs(String, m.type);
            (m[0] = S > -1),
              (m[1] = x < 0 || S < x),
              (S > -1 || Y(m, "default")) && o.push(p);
          }
        }
      }
    const c = [l, o];
    return he(e) && i.set(e, c), c;
  }
  function qs(e) {
    return e[0] !== "$" && !Gt(e);
  }
  function Ks(e) {
    return e === null
      ? "null"
      : typeof e == "function"
        ? e.name || ""
        : (typeof e == "object" && e.constructor && e.constructor.name) || "";
  }
  function Zs(e, t) {
    return Ks(e) === Ks(t);
  }
  function Gs(e, t) {
    return D(t) ? t.findIndex((n) => Zs(n, e)) : ne(t) && Zs(t, e) ? 0 : -1;
  }
  const Qs = (e) => e[0] === "_" || e === "$stable",
    er = (e) => (D(e) ? e.map(Ze) : [Ze(e)]),
    ic = (e, t, n) => {
      if (t._n) return t;
      const i = Ia((...r) => er(t(...r)), n);
      return (i._c = !1), i;
    },
    Js = (e, t, n) => {
      const i = e._ctx;
      for (const r in e) {
        if (Qs(r)) continue;
        const s = e[r];
        if (ne(s)) t[r] = ic(r, s, i);
        else if (s != null) {
          const l = er(s);
          t[r] = () => l;
        }
      }
    },
    Ys = (e, t) => {
      const n = er(t);
      e.slots.default = () => n;
    },
    rc = (e, t) => {
      if (e.vnode.shapeFlag & 32) {
        const n = t._;
        n ? ((e.slots = ee(t)), Pn(t, "_", n)) : Js(t, (e.slots = {}));
      } else (e.slots = {}), t && Ys(e, t);
      Pn(e.slots, ni, 1);
    },
    sc = (e, t, n) => {
      const { vnode: i, slots: r } = e;
      let s = !0,
        l = ce;
      if (i.shapeFlag & 32) {
        const o = t._;
        o
          ? n && o === 1
            ? (s = !1)
            : (Ee(r, t), !n && o === 1 && delete r._)
          : ((s = !t.$stable), Js(t, r)),
          (l = t);
      } else t && (Ys(e, t), (l = { default: 1 }));
      if (s) for (const o in r) !Qs(o) && l[o] == null && delete r[o];
    };
  function tr(e, t, n, i, r = !1) {
    if (D(e)) {
      e.forEach((h, m) => tr(h, t && (D(t) ? t[m] : t), n, i, r));
      return;
    }
    if (Jn(i) && !r) return;
    const s = i.shapeFlag & 4 ? li(i.component) || i.component.proxy : i.el,
      l = r ? null : s,
      { i: o, r: a } = e,
      c = t && t.r,
      f = o.refs === ce ? (o.refs = {}) : o.refs,
      p = o.setupState;
    if (
      (c != null &&
        c !== a &&
        (be(c)
          ? ((f[c] = null), Y(p, c) && (p[c] = null))
          : Te(c) && (c.value = null)),
      ne(a))
    )
      ft(a, o, 12, [l, f]);
    else {
      const h = be(a),
        m = Te(a);
      if (h || m) {
        const S = () => {
          if (e.f) {
            const x = h ? (Y(p, a) ? p[a] : f[a]) : a.value;
            r
              ? D(x) && Qr(x, s)
              : D(x)
                ? x.includes(s) || x.push(s)
                : h
                  ? ((f[a] = [s]), Y(p, a) && (p[a] = f[a]))
                  : ((a.value = [s]), e.k && (f[e.k] = a.value));
          } else
            h
              ? ((f[a] = l), Y(p, a) && (p[a] = l))
              : m && ((a.value = l), e.k && (f[e.k] = l));
        };
        l ? ((S.id = -1), Me(S, n)) : S();
      }
    }
  }
  function lc() {
    typeof __VUE_PROD_HYDRATION_MISMATCH_DETAILS__ != "boolean" &&
      (Li().__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = !1);
  }
  const Me = Na;
  function oc(e) {
    return ac(e);
  }
  function ac(e, t) {
    lc();
    const n = Li();
    n.__VUE__ = !0;
    const {
        insert: i,
        remove: r,
        patchProp: s,
        createElement: l,
        createText: o,
        createComment: a,
        setText: c,
        setElementText: f,
        parentNode: p,
        nextSibling: h,
        setScopeId: m = Je,
        insertStaticContent: S,
      } = e,
      x = (
        u,
        d,
        g,
        v = null,
        y = null,
        k = null,
        E = void 0,
        _ = null,
        $ = !!d.dynamicChildren,
      ) => {
        if (u === d) return;
        u && !dn(u, d) && ((v = At(u)), Ne(u, y, k, !0), (u = null)),
          d.patchFlag === -2 && (($ = !1), (d.dynamicChildren = null));
        const { type: b, ref: L, shapeFlag: F } = d;
        switch (b) {
          case ti:
            C(u, d, g, v);
            break;
          case Et:
            w(u, d, g, v);
            break;
          case ir:
            u == null && T(d, g, v, E);
            break;
          case ae:
            xe(u, d, g, v, y, k, E, _, $);
            break;
          default:
            F & 1
              ? U(u, d, g, v, y, k, E, _, $)
              : F & 6
                ? K(u, d, g, v, y, k, E, _, $)
                : (F & 64 || F & 128) &&
                  b.process(u, d, g, v, y, k, E, _, $, st);
        }
        L != null && y && tr(L, u && u.ref, k, d || u, !d);
      },
      C = (u, d, g, v) => {
        if (u == null) i((d.el = o(d.children)), g, v);
        else {
          const y = (d.el = u.el);
          d.children !== u.children && c(y, d.children);
        }
      },
      w = (u, d, g, v) => {
        u == null ? i((d.el = a(d.children || "")), g, v) : (d.el = u.el);
      },
      T = (u, d, g, v) => {
        [u.el, u.anchor] = S(u.children, d, g, v, u.el, u.anchor);
      },
      P = ({ el: u, anchor: d }, g, v) => {
        let y;
        for (; u && u !== d; ) (y = h(u)), i(u, g, v), (u = y);
        i(d, g, v);
      },
      N = ({ el: u, anchor: d }) => {
        let g;
        for (; u && u !== d; ) (g = h(u)), r(u), (u = g);
        r(d);
      },
      U = (u, d, g, v, y, k, E, _, $) => {
        d.type === "svg" ? (E = "svg") : d.type === "math" && (E = "mathml"),
          u == null ? z(d, g, v, y, k, E, _, $) : Q(u, d, y, k, E, _, $);
      },
      z = (u, d, g, v, y, k, E, _) => {
        let $, b;
        const { props: L, shapeFlag: F, transition: R, dirs: H } = u;
        if (
          (($ = u.el = l(u.type, k, L && L.is, L)),
          F & 8
            ? f($, u.children)
            : F & 16 && B(u.children, $, null, v, y, nr(u, k), E, _),
          H && Ct(u, null, v, "created"),
          W($, u, u.scopeId, E, v),
          L)
        ) {
          for (const oe in L)
            oe !== "value" &&
              !Gt(oe) &&
              s($, oe, null, L[oe], k, u.children, v, y, He);
          "value" in L && s($, "value", null, L.value, k),
            (b = L.onVnodeBeforeMount) && Ge(b, v, u);
        }
        H && Ct(u, null, v, "beforeMount");
        const Z = cc(y, R);
        Z && R.beforeEnter($),
          i($, d, g),
          ((b = L && L.onVnodeMounted) || Z || H) &&
            Me(() => {
              b && Ge(b, v, u), Z && R.enter($), H && Ct(u, null, v, "mounted");
            }, y);
      },
      W = (u, d, g, v, y) => {
        if ((g && m(u, g), v)) for (let k = 0; k < v.length; k++) m(u, v[k]);
        if (y) {
          let k = y.subTree;
          if (d === k) {
            const E = y.vnode;
            W(u, E, E.scopeId, E.slotScopeIds, y.parent);
          }
        }
      },
      B = (u, d, g, v, y, k, E, _, $ = 0) => {
        for (let b = $; b < u.length; b++) {
          const L = (u[b] = _ ? ht(u[b]) : Ze(u[b]));
          x(null, L, d, g, v, y, k, E, _);
        }
      },
      Q = (u, d, g, v, y, k, E) => {
        const _ = (d.el = u.el);
        let { patchFlag: $, dynamicChildren: b, dirs: L } = d;
        $ |= u.patchFlag & 16;
        const F = u.props || ce,
          R = d.props || ce;
        let H;
        if (
          (g && $t(g, !1),
          (H = R.onVnodeBeforeUpdate) && Ge(H, g, d, u),
          L && Ct(d, u, g, "beforeUpdate"),
          g && $t(g, !0),
          b
            ? ue(u.dynamicChildren, b, _, g, v, nr(d, y), k)
            : E || $e(u, d, _, null, g, v, nr(d, y), k, !1),
          $ > 0)
        ) {
          if ($ & 16) Ie(_, d, F, R, g, v, y);
          else if (
            ($ & 2 && F.class !== R.class && s(_, "class", null, R.class, y),
            $ & 4 && s(_, "style", F.style, R.style, y),
            $ & 8)
          ) {
            const Z = d.dynamicProps;
            for (let oe = 0; oe < Z.length; oe++) {
              const fe = Z[oe],
                we = F[fe],
                Be = R[fe];
              (Be !== we || fe === "value") &&
                s(_, fe, we, Be, y, u.children, g, v, He);
            }
          }
          $ & 1 && u.children !== d.children && f(_, d.children);
        } else !E && b == null && Ie(_, d, F, R, g, v, y);
        ((H = R.onVnodeUpdated) || L) &&
          Me(() => {
            H && Ge(H, g, d, u), L && Ct(d, u, g, "updated");
          }, v);
      },
      ue = (u, d, g, v, y, k, E) => {
        for (let _ = 0; _ < d.length; _++) {
          const $ = u[_],
            b = d[_],
            L =
              $.el && ($.type === ae || !dn($, b) || $.shapeFlag & 70)
                ? p($.el)
                : g;
          x($, b, L, null, v, y, k, E, !0);
        }
      },
      Ie = (u, d, g, v, y, k, E) => {
        if (g !== v) {
          if (g !== ce)
            for (const _ in g)
              !Gt(_) &&
                !(_ in v) &&
                s(u, _, g[_], null, E, d.children, y, k, He);
          for (const _ in v) {
            if (Gt(_)) continue;
            const $ = v[_],
              b = g[_];
            $ !== b && _ !== "value" && s(u, _, b, $, E, d.children, y, k, He);
          }
          "value" in v && s(u, "value", g.value, v.value, E);
        }
      },
      xe = (u, d, g, v, y, k, E, _, $) => {
        const b = (d.el = u ? u.el : o("")),
          L = (d.anchor = u ? u.anchor : o(""));
        let { patchFlag: F, dynamicChildren: R, slotScopeIds: H } = d;
        H && (_ = _ ? _.concat(H) : H),
          u == null
            ? (i(b, g, v), i(L, g, v), B(d.children || [], g, L, y, k, E, _, $))
            : F > 0 && F & 64 && R && u.dynamicChildren
              ? (ue(u.dynamicChildren, R, g, y, k, E, _),
                (d.key != null || (y && d === y.subTree)) && Xs(u, d, !0))
              : $e(u, d, g, L, y, k, E, _, $);
      },
      K = (u, d, g, v, y, k, E, _, $) => {
        (d.slotScopeIds = _),
          u == null
            ? d.shapeFlag & 512
              ? y.ctx.activate(d, g, v, E, $)
              : V(d, g, v, y, k, E, $)
            : le(u, d, $);
      },
      V = (u, d, g, v, y, k, E) => {
        const _ = (u.component = yc(u, v, y));
        if ((Va(u) && (_.ctx.renderer = st), bc(_), _.asyncDep)) {
          if ((y && y.registerDep(_, ye), !u.el)) {
            const $ = (_.subTree = re(Et));
            w(null, $, d, g);
          }
        } else ye(_, u, d, g, y, k, E);
      },
      le = (u, d, g) => {
        const v = (d.component = u.component);
        if (Oa(u, d, g))
          if (v.asyncDep && !v.asyncResolved) {
            me(v, d, g);
            return;
          } else (v.next = d), Ea(v.update), (v.effect.dirty = !0), v.update();
        else (d.el = u.el), (v.vnode = d);
      },
      ye = (u, d, g, v, y, k, E) => {
        const _ = () => {
            if (u.isMounted) {
              let { next: L, bu: F, u: R, parent: H, vnode: Z } = u;
              {
                const qt = el(u);
                if (qt) {
                  L && ((L.el = Z.el), me(u, L, E)),
                    qt.asyncDep.then(() => {
                      u.isUnmounted || _();
                    });
                  return;
                }
              }
              let oe = L,
                fe;
              $t(u, !1),
                L ? ((L.el = Z.el), me(u, L, E)) : (L = Z),
                F && jn(F),
                (fe = L.props && L.props.onVnodeBeforeUpdate) &&
                  Ge(fe, H, L, Z),
                $t(u, !0);
              const we = Gi(u),
                Be = u.subTree;
              (u.subTree = we),
                x(Be, we, p(Be.el), At(Be), u, y, k),
                (L.el = we.el),
                oe === null && za(u, we.el),
                R && Me(R, y),
                (fe = L.props && L.props.onVnodeUpdated) &&
                  Me(() => Ge(fe, H, L, Z), y);
            } else {
              let L;
              const { el: F, props: R } = d,
                { bm: H, m: Z, parent: oe } = u,
                fe = Jn(d);
              if (
                ($t(u, !1),
                H && jn(H),
                !fe && (L = R && R.onVnodeBeforeMount) && Ge(L, oe, d),
                $t(u, !0),
                F && A)
              ) {
                const we = () => {
                  (u.subTree = Gi(u)), A(F, u.subTree, u, y, null);
                };
                fe
                  ? d.type.__asyncLoader().then(() => !u.isUnmounted && we())
                  : we();
              } else {
                const we = (u.subTree = Gi(u));
                x(null, we, g, v, u, y, k), (d.el = we.el);
              }
              if ((Z && Me(Z, y), !fe && (L = R && R.onVnodeMounted))) {
                const we = d;
                Me(() => Ge(L, oe, we), y);
              }
              (d.shapeFlag & 256 ||
                (oe && Jn(oe.vnode) && oe.vnode.shapeFlag & 256)) &&
                u.a &&
                Me(u.a, y),
                (u.isMounted = !0),
                (d = g = v = null);
            }
          },
          $ = (u.effect = new zi(_, Je, () => Zi(b), u.scope)),
          b = (u.update = () => {
            $.dirty && $.run();
          });
        (b.id = u.uid), $t(u, !0), b();
      },
      me = (u, d, g) => {
        d.component = u;
        const v = u.vnode.props;
        (u.vnode = d),
          (u.next = null),
          tc(u, d.props, v, g),
          sc(u, d.children, g),
          jt(),
          Is(u),
          Pt();
      },
      $e = (u, d, g, v, y, k, E, _, $ = !1) => {
        const b = u && u.children,
          L = u ? u.shapeFlag : 0,
          F = d.children,
          { patchFlag: R, shapeFlag: H } = d;
        if (R > 0) {
          if (R & 128) {
            vt(b, F, g, v, y, k, E, _, $);
            return;
          } else if (R & 256) {
            _e(b, F, g, v, y, k, E, _, $);
            return;
          }
        }
        H & 8
          ? (L & 16 && He(b, y, k), F !== b && f(g, F))
          : L & 16
            ? H & 16
              ? vt(b, F, g, v, y, k, E, _, $)
              : He(b, y, k, !0)
            : (L & 8 && f(g, ""), H & 16 && B(F, g, v, y, k, E, _, $));
      },
      _e = (u, d, g, v, y, k, E, _, $) => {
        (u = u || Lt), (d = d || Lt);
        const b = u.length,
          L = d.length,
          F = Math.min(b, L);
        let R;
        for (R = 0; R < F; R++) {
          const H = (d[R] = $ ? ht(d[R]) : Ze(d[R]));
          x(u[R], H, g, null, y, k, E, _, $);
        }
        b > L ? He(u, y, k, !0, !1, F) : B(d, g, v, y, k, E, _, $, F);
      },
      vt = (u, d, g, v, y, k, E, _, $) => {
        let b = 0;
        const L = d.length;
        let F = u.length - 1,
          R = L - 1;
        for (; b <= F && b <= R; ) {
          const H = u[b],
            Z = (d[b] = $ ? ht(d[b]) : Ze(d[b]));
          if (dn(H, Z)) x(H, Z, g, null, y, k, E, _, $);
          else break;
          b++;
        }
        for (; b <= F && b <= R; ) {
          const H = u[F],
            Z = (d[R] = $ ? ht(d[R]) : Ze(d[R]));
          if (dn(H, Z)) x(H, Z, g, null, y, k, E, _, $);
          else break;
          F--, R--;
        }
        if (b > F) {
          if (b <= R) {
            const H = R + 1,
              Z = H < L ? d[H].el : v;
            for (; b <= R; )
              x(null, (d[b] = $ ? ht(d[b]) : Ze(d[b])), g, Z, y, k, E, _, $),
                b++;
          }
        } else if (b > R) for (; b <= F; ) Ne(u[b], y, k, !0), b++;
        else {
          const H = b,
            Z = b,
            oe = new Map();
          for (b = Z; b <= R; b++) {
            const je = (d[b] = $ ? ht(d[b]) : Ze(d[b]));
            je.key != null && oe.set(je.key, b);
          }
          let fe,
            we = 0;
          const Be = R - Z + 1;
          let qt = !1,
            go = 0;
          const Sn = new Array(Be);
          for (b = 0; b < Be; b++) Sn[b] = 0;
          for (b = H; b <= F; b++) {
            const je = u[b];
            if (we >= Be) {
              Ne(je, y, k, !0);
              continue;
            }
            let Qe;
            if (je.key != null) Qe = oe.get(je.key);
            else
              for (fe = Z; fe <= R; fe++)
                if (Sn[fe - Z] === 0 && dn(je, d[fe])) {
                  Qe = fe;
                  break;
                }
            Qe === void 0
              ? Ne(je, y, k, !0)
              : ((Sn[Qe - Z] = b + 1),
                Qe >= go ? (go = Qe) : (qt = !0),
                x(je, d[Qe], g, null, y, k, E, _, $),
                we++);
          }
          const mo = qt ? uc(Sn) : Lt;
          for (fe = mo.length - 1, b = Be - 1; b >= 0; b--) {
            const je = Z + b,
              Qe = d[je],
              vo = je + 1 < L ? d[je + 1].el : v;
            Sn[b] === 0
              ? x(null, Qe, g, vo, y, k, E, _, $)
              : qt && (fe < 0 || b !== mo[fe] ? St(Qe, g, vo, 2) : fe--);
          }
        }
      },
      St = (u, d, g, v, y = null) => {
        const { el: k, type: E, transition: _, children: $, shapeFlag: b } = u;
        if (b & 6) {
          St(u.component.subTree, d, g, v);
          return;
        }
        if (b & 128) {
          u.suspense.move(d, g, v);
          return;
        }
        if (b & 64) {
          E.move(u, d, g, st);
          return;
        }
        if (E === ae) {
          i(k, d, g);
          for (let F = 0; F < $.length; F++) St($[F], d, g, v);
          i(u.anchor, d, g);
          return;
        }
        if (E === ir) {
          P(u, d, g);
          return;
        }
        if (v !== 2 && b & 1 && _)
          if (v === 0) _.beforeEnter(k), i(k, d, g), Me(() => _.enter(k), y);
          else {
            const { leave: F, delayLeave: R, afterLeave: H } = _,
              Z = () => i(k, d, g),
              oe = () => {
                F(k, () => {
                  Z(), H && H();
                });
              };
            R ? R(k, Z, oe) : oe();
          }
        else i(k, d, g);
      },
      Ne = (u, d, g, v = !1, y = !1) => {
        const {
          type: k,
          props: E,
          ref: _,
          children: $,
          dynamicChildren: b,
          shapeFlag: L,
          patchFlag: F,
          dirs: R,
        } = u;
        if ((_ != null && tr(_, null, g, u, !0), L & 256)) {
          d.ctx.deactivate(u);
          return;
        }
        const H = L & 1 && R,
          Z = !Jn(u);
        let oe;
        if ((Z && (oe = E && E.onVnodeBeforeUnmount) && Ge(oe, d, u), L & 6))
          Cr(u.component, g, v);
        else {
          if (L & 128) {
            u.suspense.unmount(g, v);
            return;
          }
          H && Ct(u, null, d, "beforeUnmount"),
            L & 64
              ? u.type.remove(u, d, g, y, st, v)
              : b && (k !== ae || (F > 0 && F & 64))
                ? He(b, d, g, !1, !0)
                : ((k === ae && F & 384) || (!y && L & 16)) && He($, d, g),
            v && Tn(u);
        }
        ((Z && (oe = E && E.onVnodeUnmounted)) || H) &&
          Me(() => {
            oe && Ge(oe, d, u), H && Ct(u, null, d, "unmounted");
          }, g);
      },
      Tn = (u) => {
        const { type: d, el: g, anchor: v, transition: y } = u;
        if (d === ae) {
          _r(g, v);
          return;
        }
        if (d === ir) {
          N(u);
          return;
        }
        const k = () => {
          r(g), y && !y.persisted && y.afterLeave && y.afterLeave();
        };
        if (u.shapeFlag & 1 && y && !y.persisted) {
          const { leave: E, delayLeave: _ } = y,
            $ = () => E(g, k);
          _ ? _(u.el, k, $) : $();
        } else k();
      },
      _r = (u, d) => {
        let g;
        for (; u !== d; ) (g = h(u)), r(u), (u = g);
        r(d);
      },
      Cr = (u, d, g) => {
        const { bum: v, scope: y, update: k, subTree: E, um: _ } = u;
        v && jn(v),
          y.stop(),
          k && ((k.active = !1), Ne(E, u, d, g)),
          _ && Me(_, d),
          Me(() => {
            u.isUnmounted = !0;
          }, d),
          d &&
            d.pendingBranch &&
            !d.isUnmounted &&
            u.asyncDep &&
            !u.asyncResolved &&
            u.suspenseId === d.pendingId &&
            (d.deps--, d.deps === 0 && d.resolve());
      },
      He = (u, d, g, v = !1, y = !1, k = 0) => {
        for (let E = k; E < u.length; E++) Ne(u[E], d, g, v, y);
      },
      At = (u) =>
        u.shapeFlag & 6
          ? At(u.component.subTree)
          : u.shapeFlag & 128
            ? u.suspense.next()
            : h(u.anchor || u.el);
    let Wt = !1;
    const Rn = (u, d, g) => {
        u == null
          ? d._vnode && Ne(d._vnode, null, null, !0)
          : x(d._vnode || null, u, d, null, null, null, g),
          Wt || ((Wt = !0), Is(), Ls(), (Wt = !1)),
          (d._vnode = u);
      },
      st = {
        p: x,
        um: Ne,
        m: St,
        r: Tn,
        mt: V,
        mc: B,
        pc: $e,
        pbc: ue,
        n: At,
        o: e,
      };
    let M, A;
    return (
      t && ([M, A] = t(st)), { render: Rn, hydrate: M, createApp: Ya(Rn, M) }
    );
  }
  function nr({ type: e, props: t }, n) {
    return (n === "svg" && e === "foreignObject") ||
      (n === "mathml" &&
        e === "annotation-xml" &&
        t &&
        t.encoding &&
        t.encoding.includes("html"))
      ? void 0
      : n;
  }
  function $t({ effect: e, update: t }, n) {
    e.allowRecurse = t.allowRecurse = n;
  }
  function cc(e, t) {
    return (!e || (e && !e.pendingBranch)) && t && !t.persisted;
  }
  function Xs(e, t, n = !1) {
    const i = e.children,
      r = t.children;
    if (D(i) && D(r))
      for (let s = 0; s < i.length; s++) {
        const l = i[s];
        let o = r[s];
        o.shapeFlag & 1 &&
          !o.dynamicChildren &&
          ((o.patchFlag <= 0 || o.patchFlag === 32) &&
            ((o = r[s] = ht(r[s])), (o.el = l.el)),
          n || Xs(l, o)),
          o.type === ti && (o.el = l.el);
      }
  }
  function uc(e) {
    const t = e.slice(),
      n = [0];
    let i, r, s, l, o;
    const a = e.length;
    for (i = 0; i < a; i++) {
      const c = e[i];
      if (c !== 0) {
        if (((r = n[n.length - 1]), e[r] < c)) {
          (t[i] = r), n.push(i);
          continue;
        }
        for (s = 0, l = n.length - 1; s < l; )
          (o = (s + l) >> 1), e[n[o]] < c ? (s = o + 1) : (l = o);
        c < e[n[s]] && (s > 0 && (t[i] = n[s - 1]), (n[s] = i));
      }
    }
    for (s = n.length, l = n[s - 1]; s-- > 0; ) (n[s] = l), (l = t[l]);
    return n;
  }
  function el(e) {
    const t = e.subTree.component;
    if (t) return t.asyncDep && !t.asyncResolved ? t : el(t);
  }
  const fc = (e) => e.__isTeleport,
    ae = Symbol.for("v-fgt"),
    ti = Symbol.for("v-txt"),
    Et = Symbol.for("v-cmt"),
    ir = Symbol.for("v-stc"),
    un = [];
  let Ve = null;
  function I(e = !1) {
    un.push((Ve = e ? null : []));
  }
  function dc() {
    un.pop(), (Ve = un[un.length - 1] || null);
  }
  let fn = 1;
  function tl(e) {
    fn += e;
  }
  function nl(e) {
    return (
      (e.dynamicChildren = fn > 0 ? Ve || Lt : null),
      dc(),
      fn > 0 && Ve && Ve.push(e),
      e
    );
  }
  function O(e, t, n, i, r, s) {
    return nl(j(e, t, n, i, r, s, !0));
  }
  function Xe(e, t, n, i, r) {
    return nl(re(e, t, n, i, r, !0));
  }
  function rr(e) {
    return e ? e.__v_isVNode === !0 : !1;
  }
  function dn(e, t) {
    return e.type === t.type && e.key === t.key;
  }
  const ni = "__vInternal",
    il = ({ key: e }) => e ?? null,
    ii = ({ ref: e, ref_key: t, ref_for: n }) => (
      typeof e == "number" && (e = "" + e),
      e != null
        ? be(e) || Te(e) || ne(e)
          ? { i: Re, r: e, k: t, f: !!n }
          : e
        : null
    );
  function j(
    e,
    t = null,
    n = null,
    i = 0,
    r = null,
    s = e === ae ? 0 : 1,
    l = !1,
    o = !1,
  ) {
    const a = {
      __v_isVNode: !0,
      __v_skip: !0,
      type: e,
      props: t,
      key: t && il(t),
      ref: t && ii(t),
      scopeId: Os,
      slotScopeIds: null,
      children: n,
      component: null,
      suspense: null,
      ssContent: null,
      ssFallback: null,
      dirs: null,
      transition: null,
      el: null,
      anchor: null,
      target: null,
      targetAnchor: null,
      staticCount: 0,
      shapeFlag: s,
      patchFlag: i,
      dynamicProps: r,
      dynamicChildren: null,
      appContext: null,
      ctx: Re,
    };
    return (
      o
        ? (sr(a, n), s & 128 && e.normalize(a))
        : n && (a.shapeFlag |= be(n) ? 8 : 16),
      fn > 0 &&
        !l &&
        Ve &&
        (a.patchFlag > 0 || s & 6) &&
        a.patchFlag !== 32 &&
        Ve.push(a),
      a
    );
  }
  const re = hc;
  function hc(e, t = null, n = null, i = 0, r = null, s = !1) {
    if (((!e || e === Pa) && (e = Et), rr(e))) {
      const o = Ht(e, t, !0);
      return (
        n && sr(o, n),
        fn > 0 &&
          !s &&
          Ve &&
          (o.shapeFlag & 6 ? (Ve[Ve.indexOf(e)] = o) : Ve.push(o)),
        (o.patchFlag |= -2),
        o
      );
    }
    if (($c(e) && (e = e.__vccOpts), t)) {
      t = pc(t);
      let { class: o, style: a } = t;
      o && !be(o) && (t.class = ve(o)),
        he(a) && (_s(a) && !D(a) && (a = Ee({}, a)), (t.style = Jt(a)));
    }
    const l = be(e) ? 1 : Fa(e) ? 128 : fc(e) ? 64 : he(e) ? 4 : ne(e) ? 2 : 0;
    return j(e, t, n, i, r, l, s, !0);
  }
  function pc(e) {
    return e ? (_s(e) || ni in e ? Ee({}, e) : e) : null;
  }
  function Ht(e, t, n = !1) {
    const { props: i, ref: r, patchFlag: s, children: l } = e,
      o = t ? gc(i || {}, t) : i;
    return {
      __v_isVNode: !0,
      __v_skip: !0,
      type: e.type,
      props: o,
      key: o && il(o),
      ref:
        t && t.ref
          ? n && r
            ? D(r)
              ? r.concat(ii(t))
              : [r, ii(t)]
            : ii(t)
          : r,
      scopeId: e.scopeId,
      slotScopeIds: e.slotScopeIds,
      children: l,
      target: e.target,
      targetAnchor: e.targetAnchor,
      staticCount: e.staticCount,
      shapeFlag: e.shapeFlag,
      patchFlag: t && e.type !== ae ? (s === -1 ? 16 : s | 16) : s,
      dynamicProps: e.dynamicProps,
      dynamicChildren: e.dynamicChildren,
      appContext: e.appContext,
      dirs: e.dirs,
      transition: e.transition,
      component: e.component,
      suspense: e.suspense,
      ssContent: e.ssContent && Ht(e.ssContent),
      ssFallback: e.ssFallback && Ht(e.ssFallback),
      el: e.el,
      anchor: e.anchor,
      ctx: e.ctx,
      ce: e.ce,
    };
  }
  function et(e = " ", t = 0) {
    return re(ti, null, e, t);
  }
  function X(e = "", t = !1) {
    return t ? (I(), Xe(Et, null, e)) : re(Et, null, e);
  }
  function Ze(e) {
    return e == null || typeof e == "boolean"
      ? re(Et)
      : D(e)
        ? re(ae, null, e.slice())
        : typeof e == "object"
          ? ht(e)
          : re(ti, null, String(e));
  }
  function ht(e) {
    return (e.el === null && e.patchFlag !== -1) || e.memo ? e : Ht(e);
  }
  function sr(e, t) {
    let n = 0;
    const { shapeFlag: i } = e;
    if (t == null) t = null;
    else if (D(t)) n = 16;
    else if (typeof t == "object")
      if (i & 65) {
        const r = t.default;
        r && (r._c && (r._d = !1), sr(e, r()), r._c && (r._d = !0));
        return;
      } else {
        n = 32;
        const r = t._;
        !r && !(ni in t)
          ? (t._ctx = Re)
          : r === 3 &&
            Re &&
            (Re.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
      }
    else
      ne(t)
        ? ((t = { default: t, _ctx: Re }), (n = 32))
        : ((t = String(t)), i & 64 ? ((n = 16), (t = [et(t)])) : (n = 8));
    (e.children = t), (e.shapeFlag |= n);
  }
  function gc(...e) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const i = e[n];
      for (const r in i)
        if (r === "class")
          t.class !== i.class && (t.class = ve([t.class, i.class]));
        else if (r === "style") t.style = Jt([t.style, i.style]);
        else if (Mn(r)) {
          const s = t[r],
            l = i[r];
          l &&
            s !== l &&
            !(D(s) && s.includes(l)) &&
            (t[r] = s ? [].concat(s, l) : l);
        } else r !== "" && (t[r] = i[r]);
    }
    return t;
  }
  function Ge(e, t, n, i = null) {
    qe(e, t, 7, [n, i]);
  }
  const mc = Bs();
  let vc = 0;
  function yc(e, t, n) {
    const i = e.type,
      r = (t ? t.appContext : e.appContext) || mc,
      s = {
        uid: vc++,
        vnode: e,
        type: i,
        parent: t,
        appContext: r,
        root: null,
        next: null,
        subTree: null,
        effect: null,
        update: null,
        scope: new Yo(!0),
        render: null,
        proxy: null,
        exposed: null,
        exposeProxy: null,
        withProxy: null,
        provides: t ? t.provides : Object.create(r.provides),
        accessCache: null,
        renderCache: [],
        components: null,
        directives: null,
        propsOptions: nc(i, r),
        emitsOptions: Aa(i, r),
        emit: null,
        emitted: null,
        propsDefaults: ce,
        inheritAttrs: i.inheritAttrs,
        ctx: ce,
        data: ce,
        props: ce,
        attrs: ce,
        slots: ce,
        refs: ce,
        setupState: ce,
        setupContext: null,
        attrsProxy: null,
        slotsProxy: null,
        suspense: n,
        suspenseId: n ? n.pendingId : 0,
        asyncDep: null,
        asyncResolved: !1,
        isMounted: !1,
        isUnmounted: !1,
        isDeactivated: !1,
        bc: null,
        c: null,
        bm: null,
        m: null,
        bu: null,
        u: null,
        um: null,
        bum: null,
        da: null,
        a: null,
        rtg: null,
        rtc: null,
        ec: null,
        sp: null,
      };
    return (
      (s.ctx = { _: s }),
      (s.root = t ? t.root : s),
      (s.emit = Sa.bind(null, s)),
      e.ce && e.ce(s),
      s
    );
  }
  let Ae = null;
  const wc = () => Ae || Re;
  let ri, lr;
  {
    const e = Li(),
      t = (n, i) => {
        let r;
        return (
          (r = e[n]) || (r = e[n] = []),
          r.push(i),
          (s) => {
            r.length > 1 ? r.forEach((l) => l(s)) : r[0](s);
          }
        );
      };
    (ri = t("__VUE_INSTANCE_SETTERS__", (n) => (Ae = n))),
      (lr = t("__VUE_SSR_SETTERS__", (n) => (si = n)));
  }
  const or = (e) => {
      const t = Ae;
      return (
        ri(e),
        e.scope.on(),
        () => {
          e.scope.off(), ri(t);
        }
      );
    },
    rl = () => {
      Ae && Ae.scope.off(), ri(null);
    };
  function sl(e) {
    return e.vnode.shapeFlag & 4;
  }
  let si = !1;
  function bc(e, t = !1) {
    t && lr(t);
    const { props: n, children: i } = e.vnode,
      r = sl(e);
    ec(e, n, r, t), rc(e, i);
    const s = r ? kc(e, t) : void 0;
    return t && lr(!1), s;
  }
  function kc(e, t) {
    const n = e.type;
    (e.accessCache = Object.create(null)), (e.proxy = Cs(new Proxy(e.ctx, qa)));
    const { setup: i } = n;
    if (i) {
      const r = (e.setupContext = i.length > 1 ? _c(e) : null),
        s = or(e);
      jt();
      const l = ft(i, e, 0, [e.props, r]);
      if ((Pt(), s(), Yr(l))) {
        if ((l.then(rl, rl), t))
          return l
            .then((o) => {
              ll(e, o, t);
            })
            .catch((o) => {
              qn(o, e, 0);
            });
        e.asyncDep = l;
      } else ll(e, l, t);
    } else al(e, t);
  }
  function ll(e, t, n) {
    ne(t)
      ? e.type.__ssrInlineRender
        ? (e.ssrRender = t)
        : (e.render = t)
      : he(t) && (e.setupState = Rs(t)),
      al(e, n);
  }
  let ol;
  function al(e, t, n) {
    const i = e.type;
    if (!e.render) {
      if (!t && ol && !i.render) {
        const r = i.template || Ka(e).template;
        if (r) {
          const { isCustomElement: s, compilerOptions: l } =
              e.appContext.config,
            { delimiters: o, compilerOptions: a } = i,
            c = Ee(Ee({ isCustomElement: s, delimiters: o }, l), a);
          i.render = ol(r, c);
        }
      }
      e.render = i.render || Je;
    }
  }
  function xc(e) {
    return (
      e.attrsProxy ||
      (e.attrsProxy = new Proxy(e.attrs, {
        get(t, n) {
          return Le(e, "get", "$attrs"), t[n];
        },
      }))
    );
  }
  function _c(e) {
    const t = (n) => {
      e.exposed = n || {};
    };
    return {
      get attrs() {
        return xc(e);
      },
      slots: e.slots,
      emit: e.emit,
      expose: t,
    };
  }
  function li(e) {
    if (e.exposed)
      return (
        e.exposeProxy ||
        (e.exposeProxy = new Proxy(Rs(Cs(e.exposed)), {
          get(t, n) {
            if (n in t) return t[n];
            if (n in on) return on[n](e);
          },
          has(t, n) {
            return n in t || n in on;
          },
        }))
      );
  }
  function Cc(e, t = !0) {
    return ne(e) ? e.displayName || e.name : e.name || (t && e.__name);
  }
  function $c(e) {
    return ne(e) && "__vccOpts" in e;
  }
  const ke = (e, t) => ba(e, t, si);
  function te(e, t, n) {
    const i = arguments.length;
    return i === 2
      ? he(t) && !D(t)
        ? rr(t)
          ? re(e, null, [t])
          : re(e, t)
        : re(e, null, t)
      : (i > 3
          ? (n = Array.prototype.slice.call(arguments, 2))
          : i === 3 && rr(n) && (n = [n]),
        re(e, t, n));
  }
  const Ec = "3.4.19";
  /**
   * @vue/runtime-dom v3.4.19
   * (c) 2018-present Yuxi (Evan) You and Vue contributors
   * @license MIT
   **/ const Tc = "http://www.w3.org/2000/svg",
    Rc = "http://www.w3.org/1998/Math/MathML",
    pt = typeof document < "u" ? document : null,
    cl = pt && pt.createElement("template"),
    Sc = {
      insert: (e, t, n) => {
        t.insertBefore(e, n || null);
      },
      remove: (e) => {
        const t = e.parentNode;
        t && t.removeChild(e);
      },
      createElement: (e, t, n, i) => {
        const r =
          t === "svg"
            ? pt.createElementNS(Tc, e)
            : t === "mathml"
              ? pt.createElementNS(Rc, e)
              : pt.createElement(e, n ? { is: n } : void 0);
        return (
          e === "select" &&
            i &&
            i.multiple != null &&
            r.setAttribute("multiple", i.multiple),
          r
        );
      },
      createText: (e) => pt.createTextNode(e),
      createComment: (e) => pt.createComment(e),
      setText: (e, t) => {
        e.nodeValue = t;
      },
      setElementText: (e, t) => {
        e.textContent = t;
      },
      parentNode: (e) => e.parentNode,
      nextSibling: (e) => e.nextSibling,
      querySelector: (e) => pt.querySelector(e),
      setScopeId(e, t) {
        e.setAttribute(t, "");
      },
      insertStaticContent(e, t, n, i, r, s) {
        const l = n ? n.previousSibling : t.lastChild;
        if (r && (r === s || r.nextSibling))
          for (
            ;
            t.insertBefore(r.cloneNode(!0), n),
              !(r === s || !(r = r.nextSibling));

          );
        else {
          cl.innerHTML =
            i === "svg"
              ? `<svg>${e}</svg>`
              : i === "mathml"
                ? `<math>${e}</math>`
                : e;
          const o = cl.content;
          if (i === "svg" || i === "mathml") {
            const a = o.firstChild;
            for (; a.firstChild; ) o.appendChild(a.firstChild);
            o.removeChild(a);
          }
          t.insertBefore(o, n);
        }
        return [
          l ? l.nextSibling : t.firstChild,
          n ? n.previousSibling : t.lastChild,
        ];
      },
    },
    Ac = Symbol("_vtc");
  function Ic(e, t, n) {
    const i = e[Ac];
    i && (t = (t ? [t, ...i] : [...i]).join(" ")),
      t == null
        ? e.removeAttribute("class")
        : n
          ? e.setAttribute("class", t)
          : (e.className = t);
  }
  const hn = Symbol("_vod"),
    ul = {
      beforeMount(e, { value: t }, { transition: n }) {
        (e[hn] = e.style.display === "none" ? "" : e.style.display),
          n && t ? n.beforeEnter(e) : pn(e, t);
      },
      mounted(e, { value: t }, { transition: n }) {
        n && t && n.enter(e);
      },
      updated(e, { value: t, oldValue: n }, { transition: i }) {
        (!t == !n && (e.style.display === e[hn] || !t)) ||
          (i
            ? t
              ? (i.beforeEnter(e), pn(e, !0), i.enter(e))
              : i.leave(e, () => {
                  pn(e, !1);
                })
            : pn(e, t));
      },
      beforeUnmount(e, { value: t }) {
        pn(e, t);
      },
    };
  function pn(e, t) {
    e.style.display = t ? e[hn] : "none";
  }
  const Lc = Symbol(""),
    Mc = /(^|;)\s*display\s*:/;
  function Oc(e, t, n) {
    const i = e.style,
      r = be(n),
      s = i.display;
    let l = !1;
    if (n && !r) {
      if (t && !be(t)) for (const o in t) n[o] == null && ar(i, o, "");
      for (const o in n) o === "display" && (l = !0), ar(i, o, n[o]);
    } else if (r) {
      if (t !== n) {
        const o = i[Lc];
        o && (n += ";" + o), (i.cssText = n), (l = Mc.test(n));
      }
    } else t && e.removeAttribute("style");
    hn in e && ((e[hn] = l ? i.display : ""), (i.display = s));
  }
  const fl = /\s*!important$/;
  function ar(e, t, n) {
    if (D(n)) n.forEach((i) => ar(e, t, i));
    else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n);
    else {
      const i = zc(e, t);
      fl.test(n)
        ? e.setProperty(zt(i), n.replace(fl, ""), "important")
        : (e[i] = n);
    }
  }
  const dl = ["Webkit", "Moz", "ms"],
    cr = {};
  function zc(e, t) {
    const n = cr[t];
    if (n) return n;
    let i = We(t);
    if (i !== "filter" && i in e) return (cr[t] = i);
    i = zn(i);
    for (let r = 0; r < dl.length; r++) {
      const s = dl[r] + i;
      if (s in e) return (cr[t] = s);
    }
    return t;
  }
  const hl = "http://www.w3.org/1999/xlink";
  function jc(e, t, n, i, r) {
    if (i && t.startsWith("xlink:"))
      n == null
        ? e.removeAttributeNS(hl, t.slice(6, t.length))
        : e.setAttributeNS(hl, t, n);
    else {
      const s = Qo(t);
      n == null || (s && !ns(n))
        ? e.removeAttribute(t)
        : e.setAttribute(t, s ? "" : n);
    }
  }
  function Pc(e, t, n, i, r, s, l) {
    if (t === "innerHTML" || t === "textContent") {
      i && l(i, r, s), (e[t] = n ?? "");
      return;
    }
    const o = e.tagName;
    if (t === "value" && o !== "PROGRESS" && !o.includes("-")) {
      e._value = n;
      const c = o === "OPTION" ? e.getAttribute("value") : e.value,
        f = n ?? "";
      c !== f && (e.value = f), n == null && e.removeAttribute(t);
      return;
    }
    let a = !1;
    if (n === "" || n == null) {
      const c = typeof e[t];
      c === "boolean"
        ? (n = ns(n))
        : n == null && c === "string"
          ? ((n = ""), (a = !0))
          : c === "number" && ((n = 0), (a = !0));
    }
    try {
      e[t] = n;
    } catch {}
    a && e.removeAttribute(t);
  }
  function tt(e, t, n, i) {
    e.addEventListener(t, n, i);
  }
  function Uc(e, t, n, i) {
    e.removeEventListener(t, n, i);
  }
  const pl = Symbol("_vei");
  function Fc(e, t, n, i, r = null) {
    const s = e[pl] || (e[pl] = {}),
      l = s[t];
    if (i && l) l.value = i;
    else {
      const [o, a] = Nc(t);
      if (i) {
        const c = (s[t] = Vc(i, r));
        tt(e, o, c, a);
      } else l && (Uc(e, o, l, a), (s[t] = void 0));
    }
  }
  const gl = /(?:Once|Passive|Capture)$/;
  function Nc(e) {
    let t;
    if (gl.test(e)) {
      t = {};
      let i;
      for (; (i = e.match(gl)); )
        (e = e.slice(0, e.length - i[0].length)), (t[i[0].toLowerCase()] = !0);
    }
    return [e[2] === ":" ? e.slice(3) : zt(e.slice(2)), t];
  }
  let ur = 0;
  const Hc = Promise.resolve(),
    Dc = () => ur || (Hc.then(() => (ur = 0)), (ur = Date.now()));
  function Vc(e, t) {
    const n = (i) => {
      if (!i._vts) i._vts = Date.now();
      else if (i._vts <= n.attached) return;
      qe(Bc(i, n.value), t, 5, [i]);
    };
    return (n.value = e), (n.attached = Dc()), n;
  }
  function Bc(e, t) {
    if (D(t)) {
      const n = e.stopImmediatePropagation;
      return (
        (e.stopImmediatePropagation = () => {
          n.call(e), (e._stopped = !0);
        }),
        t.map((i) => (r) => !r._stopped && i && i(r))
      );
    } else return t;
  }
  const ml = (e) =>
      e.charCodeAt(0) === 111 &&
      e.charCodeAt(1) === 110 &&
      e.charCodeAt(2) > 96 &&
      e.charCodeAt(2) < 123,
    Wc = (e, t, n, i, r, s, l, o, a) => {
      const c = r === "svg";
      t === "class"
        ? Ic(e, i, c)
        : t === "style"
          ? Oc(e, n, i)
          : Mn(t)
            ? Si(t) || Fc(e, t, n, i, l)
            : (
                  t[0] === "."
                    ? ((t = t.slice(1)), !0)
                    : t[0] === "^"
                      ? ((t = t.slice(1)), !1)
                      : qc(e, t, i, c)
                )
              ? Pc(e, t, i, s, l, o, a)
              : (t === "true-value"
                  ? (e._trueValue = i)
                  : t === "false-value" && (e._falseValue = i),
                jc(e, t, i, c));
    };
  function qc(e, t, n, i) {
    if (i)
      return !!(
        t === "innerHTML" ||
        t === "textContent" ||
        (t in e && ml(t) && ne(n))
      );
    if (
      t === "spellcheck" ||
      t === "draggable" ||
      t === "translate" ||
      t === "form" ||
      (t === "list" && e.tagName === "INPUT") ||
      (t === "type" && e.tagName === "TEXTAREA")
    )
      return !1;
    if (t === "width" || t === "height") {
      const r = e.tagName;
      if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE")
        return !1;
    }
    return ml(t) && be(n) ? !1 : t in e;
  }
  const gt = (e) => {
    const t = e.props["onUpdate:modelValue"] || !1;
    return D(t) ? (n) => jn(t, n) : t;
  };
  function Kc(e) {
    e.target.composing = !0;
  }
  function vl(e) {
    const t = e.target;
    t.composing && ((t.composing = !1), t.dispatchEvent(new Event("input")));
  }
  const Fe = Symbol("_assign"),
    fr = {
      created(e, { modifiers: { lazy: t, trim: n, number: i } }, r) {
        e[Fe] = gt(r);
        const s = i || (r.props && r.props.type === "number");
        tt(e, t ? "change" : "input", (l) => {
          if (l.target.composing) return;
          let o = e.value;
          n && (o = o.trim()), s && (o = Qt(o)), e[Fe](o);
        }),
          n &&
            tt(e, "change", () => {
              e.value = e.value.trim();
            }),
          t ||
            (tt(e, "compositionstart", Kc),
            tt(e, "compositionend", vl),
            tt(e, "change", vl));
      },
      mounted(e, { value: t }) {
        e.value = t ?? "";
      },
      beforeUpdate(
        e,
        { value: t, modifiers: { lazy: n, trim: i, number: r } },
        s,
      ) {
        if (((e[Fe] = gt(s)), e.composing)) return;
        const l = r || e.type === "number" ? Qt(e.value) : e.value,
          o = t ?? "";
        l !== o &&
          ((document.activeElement === e &&
            e.type !== "range" &&
            (n || (i && e.value.trim() === o))) ||
            (e.value = o));
      },
    },
    Zc = {
      deep: !0,
      created(e, t, n) {
        (e[Fe] = gt(n)),
          tt(e, "change", () => {
            const i = e._modelValue,
              r = Dt(e),
              s = e.checked,
              l = e[Fe];
            if (D(i)) {
              const o = Mi(i, r),
                a = o !== -1;
              if (s && !a) l(i.concat(r));
              else if (!s && a) {
                const c = [...i];
                c.splice(o, 1), l(c);
              }
            } else if (Ot(i)) {
              const o = new Set(i);
              s ? o.add(r) : o.delete(r), l(o);
            } else l(bl(e, s));
          });
      },
      mounted: yl,
      beforeUpdate(e, t, n) {
        (e[Fe] = gt(n)), yl(e, t, n);
      },
    };
  function yl(e, { value: t, oldValue: n }, i) {
    (e._modelValue = t),
      D(t)
        ? (e.checked = Mi(t, i.props.value) > -1)
        : Ot(t)
          ? (e.checked = t.has(i.props.value))
          : t !== n && (e.checked = wt(t, bl(e, !0)));
  }
  const Gc = {
      created(e, { value: t }, n) {
        (e.checked = wt(t, n.props.value)),
          (e[Fe] = gt(n)),
          tt(e, "change", () => {
            e[Fe](Dt(e));
          });
      },
      beforeUpdate(e, { value: t, oldValue: n }, i) {
        (e[Fe] = gt(i)), t !== n && (e.checked = wt(t, i.props.value));
      },
    },
    Qc = {
      deep: !0,
      created(e, { value: t, modifiers: { number: n } }, i) {
        const r = Ot(t);
        tt(e, "change", () => {
          const s = Array.prototype.filter
            .call(e.options, (l) => l.selected)
            .map((l) => (n ? Qt(Dt(l)) : Dt(l)));
          e[Fe](e.multiple ? (r ? new Set(s) : s) : s[0]),
            (e._assigning = !0),
            nn(() => {
              e._assigning = !1;
            });
        }),
          (e[Fe] = gt(i));
      },
      mounted(e, { value: t, oldValue: n, modifiers: { number: i } }) {
        wl(e, t, n, i);
      },
      beforeUpdate(e, t, n) {
        e[Fe] = gt(n);
      },
      updated(e, { value: t, oldValue: n, modifiers: { number: i } }) {
        e._assigning || wl(e, t, n, i);
      },
    };
  function wl(e, t, n, i) {
    const r = e.multiple,
      s = D(t);
    if (!(r && !s && !Ot(t))) {
      for (let l = 0, o = e.options.length; l < o; l++) {
        const a = e.options[l],
          c = Dt(a);
        if (r)
          if (s) {
            const f = typeof c;
            f === "string" || f === "number"
              ? (a.selected = t.includes(i ? Qt(c) : c))
              : (a.selected = Mi(t, c) > -1);
          } else a.selected = t.has(c);
        else if (wt(Dt(a), t)) {
          e.selectedIndex !== l && (e.selectedIndex = l);
          return;
        }
      }
      !r && e.selectedIndex !== -1 && (e.selectedIndex = -1);
    }
  }
  function Dt(e) {
    return "_value" in e ? e._value : e.value;
  }
  function bl(e, t) {
    const n = t ? "_trueValue" : "_falseValue";
    return n in e ? e[n] : t;
  }
  const Jc = {
    created(e, t, n) {
      oi(e, t, n, null, "created");
    },
    mounted(e, t, n) {
      oi(e, t, n, null, "mounted");
    },
    beforeUpdate(e, t, n, i) {
      oi(e, t, n, i, "beforeUpdate");
    },
    updated(e, t, n, i) {
      oi(e, t, n, i, "updated");
    },
  };
  function Yc(e, t) {
    switch (e) {
      case "SELECT":
        return Qc;
      case "TEXTAREA":
        return fr;
      default:
        switch (t) {
          case "checkbox":
            return Zc;
          case "radio":
            return Gc;
          default:
            return fr;
        }
    }
  }
  function oi(e, t, n, i, r) {
    const l = Yc(e.tagName, n.props && n.props.type)[r];
    l && l(e, t, n, i);
  }
  const Xc = Ee({ patchProp: Wc }, Sc);
  let kl;
  function eu() {
    return kl || (kl = oc(Xc));
  }
  const tu = (...e) => {
    const t = eu().createApp(...e),
      { mount: n } = t;
    return (
      (t.mount = (i) => {
        const r = iu(i);
        if (!r) return;
        const s = t._component;
        !ne(s) && !s.render && !s.template && (s.template = r.innerHTML),
          (r.innerHTML = "");
        const l = n(r, !1, nu(r));
        return (
          r instanceof Element &&
            (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")),
          l
        );
      }),
      t
    );
  };
  function nu(e) {
    if (e instanceof SVGElement) return "svg";
    if (typeof MathMLElement == "function" && e instanceof MathMLElement)
      return "mathml";
  }
  function iu(e) {
    return be(e) ? document.querySelector(e) : e;
  }
  function gn(e) {
    return rs() ? (ea(e), !0) : !1;
  }
  function nt(e) {
    return typeof e == "function" ? e() : G(e);
  }
  const ai = typeof window < "u" && typeof document < "u",
    ru = Object.prototype.toString,
    su = (e) => ru.call(e) === "[object Object]",
    ci = () => {};
  function xl(e, t) {
    function n(...i) {
      return new Promise((r, s) => {
        Promise.resolve(
          e(() => t.apply(this, i), { fn: t, thisArg: this, args: i }),
        )
          .then(r)
          .catch(s);
      });
    }
    return n;
  }
  const _l = (e) => e();
  function lu(e, t = {}) {
    let n,
      i,
      r = ci;
    const s = (o) => {
      clearTimeout(o), r(), (r = ci);
    };
    return (o) => {
      const a = nt(e),
        c = nt(t.maxWait);
      return (
        n && s(n),
        a <= 0 || (c !== void 0 && c <= 0)
          ? (i && (s(i), (i = null)), Promise.resolve(o()))
          : new Promise((f, p) => {
              (r = t.rejectOnCancel ? p : f),
                c &&
                  !i &&
                  (i = setTimeout(() => {
                    n && s(n), (i = null), f(o());
                  }, c)),
                (n = setTimeout(() => {
                  i && s(i), (i = null), f(o());
                }, a));
            })
      );
    };
  }
  function ou(e = _l) {
    const t = q(!0);
    function n() {
      t.value = !1;
    }
    function i() {
      t.value = !0;
    }
    const r = (...s) => {
      t.value && e(...s);
    };
    return { isActive: Xt(t), pause: n, resume: i, eventFilter: r };
  }
  function Cl(e) {
    return e || wc();
  }
  function au(e, t = 200, n = {}) {
    return xl(lu(t, n), e);
  }
  function cu(e, t, n = {}) {
    const { eventFilter: i = _l, ...r } = n;
    return Pe(e, xl(i, t), r);
  }
  function uu(e, t, n = {}) {
    const { eventFilter: i, ...r } = n,
      { eventFilter: s, pause: l, resume: o, isActive: a } = ou(i);
    return {
      stop: cu(e, t, { ...r, eventFilter: s }),
      pause: l,
      resume: o,
      isActive: a,
    };
  }
  function dr(e, t = !0, n) {
    Cl() ? ln(e, n) : t ? e() : nn(e);
  }
  function fu(e, t) {
    Cl(t) && Yn(e, t);
  }
  function du(e, t = 1e3, n = {}) {
    const { immediate: i = !0, immediateCallback: r = !1 } = n;
    let s = null;
    const l = q(!1);
    function o() {
      s && (clearInterval(s), (s = null));
    }
    function a() {
      (l.value = !1), o();
    }
    function c() {
      const f = nt(t);
      f <= 0 || ((l.value = !0), r && e(), o(), (s = setInterval(e, f)));
    }
    if ((i && ai && c(), Te(t) || typeof t == "function")) {
      const f = Pe(t, () => {
        l.value && ai && c();
      });
      gn(f);
    }
    return gn(a), { isActive: l, pause: a, resume: c };
  }
  function hu(e) {
    var t;
    const n = nt(e);
    return (t = n == null ? void 0 : n.$el) != null ? t : n;
  }
  const ui = ai ? window : void 0,
    $l = ai ? window.document : void 0;
  function El(...e) {
    let t, n, i, r;
    if (
      (typeof e[0] == "string" || Array.isArray(e[0])
        ? (([n, i, r] = e), (t = ui))
        : ([t, n, i, r] = e),
      !t)
    )
      return ci;
    Array.isArray(n) || (n = [n]), Array.isArray(i) || (i = [i]);
    const s = [],
      l = () => {
        s.forEach((f) => f()), (s.length = 0);
      },
      o = (f, p, h, m) => (
        f.addEventListener(p, h, m), () => f.removeEventListener(p, h, m)
      ),
      a = Pe(
        () => [hu(t), nt(r)],
        ([f, p]) => {
          if ((l(), !f)) return;
          const h = su(p) ? { ...p } : p;
          s.push(...n.flatMap((m) => i.map((S) => o(f, m, S, h))));
        },
        { immediate: !0, flush: "post" },
      ),
      c = () => {
        a(), l();
      };
    return gn(c), c;
  }
  function pu(e, t = {}) {
    const { immediate: n = !0, fpsLimit: i = void 0, window: r = ui } = t,
      s = q(!1),
      l = i ? 1e3 / i : null;
    let o = 0,
      a = null;
    function c(h) {
      if (!s.value || !r) return;
      o || (o = h);
      const m = h - o;
      if (l && m < l) {
        a = r.requestAnimationFrame(c);
        return;
      }
      (o = h), e({ delta: m, timestamp: h }), (a = r.requestAnimationFrame(c));
    }
    function f() {
      !s.value &&
        r &&
        ((s.value = !0), (o = 0), (a = r.requestAnimationFrame(c)));
    }
    function p() {
      (s.value = !1), a != null && r && (r.cancelAnimationFrame(a), (a = null));
    }
    return n && f(), gn(p), { isActive: Xt(s), pause: p, resume: f };
  }
  const fi =
      typeof globalThis < "u"
        ? globalThis
        : typeof window < "u"
          ? window
          : typeof global < "u"
            ? global
            : typeof self < "u"
              ? self
              : {},
    di = "__vueuse_ssr_handlers__",
    gu = mu();
  function mu() {
    return di in fi || (fi[di] = fi[di] || {}), fi[di];
  }
  function vu(e, t) {
    return gu[e] || t;
  }
  function yu(e) {
    return e == null
      ? "any"
      : e instanceof Set
        ? "set"
        : e instanceof Map
          ? "map"
          : e instanceof Date
            ? "date"
            : typeof e == "boolean"
              ? "boolean"
              : typeof e == "string"
                ? "string"
                : typeof e == "object"
                  ? "object"
                  : Number.isNaN(e)
                    ? "any"
                    : "number";
  }
  const wu = {
      boolean: { read: (e) => e === "true", write: (e) => String(e) },
      object: { read: (e) => JSON.parse(e), write: (e) => JSON.stringify(e) },
      number: { read: (e) => Number.parseFloat(e), write: (e) => String(e) },
      any: { read: (e) => e, write: (e) => String(e) },
      string: { read: (e) => e, write: (e) => String(e) },
      map: {
        read: (e) => new Map(JSON.parse(e)),
        write: (e) => JSON.stringify(Array.from(e.entries())),
      },
      set: {
        read: (e) => new Set(JSON.parse(e)),
        write: (e) => JSON.stringify(Array.from(e)),
      },
      date: { read: (e) => new Date(e), write: (e) => e.toISOString() },
    },
    Tl = "vueuse-storage";
  function Vt(e, t, n, i = {}) {
    var r;
    const {
        flush: s = "pre",
        deep: l = !0,
        listenToStorageChanges: o = !0,
        writeDefaults: a = !0,
        mergeDefaults: c = !1,
        shallow: f,
        window: p = ui,
        eventFilter: h,
        onError: m = (Q) => {
          console.error(Q);
        },
        initOnMounted: S,
      } = i,
      x = (f ? ka : q)(typeof t == "function" ? t() : t);
    if (!n)
      try {
        n = vu("getDefaultStorage", () => {
          var Q;
          return (Q = ui) == null ? void 0 : Q.localStorage;
        })();
      } catch (Q) {
        m(Q);
      }
    if (!n) return x;
    const C = nt(t),
      w = yu(C),
      T = (r = i.serializer) != null ? r : wu[w],
      { pause: P, resume: N } = uu(x, () => U(x.value), {
        flush: s,
        deep: l,
        eventFilter: h,
      });
    return (
      p &&
        o &&
        dr(() => {
          El(p, "storage", B), El(p, Tl, W), S && B();
        }),
      S || B(),
      x
    );
    function U(Q) {
      try {
        const ue = n.getItem(e),
          Ie = (xe) => {
            p &&
              p.dispatchEvent(
                new CustomEvent(Tl, {
                  detail: {
                    key: e,
                    oldValue: ue,
                    newValue: xe,
                    storageArea: n,
                  },
                }),
              );
          };
        if (Q == null) Ie(null), n.removeItem(e);
        else {
          const xe = T.write(Q);
          ue !== xe && (n.setItem(e, xe), Ie(xe));
        }
      } catch (ue) {
        m(ue);
      }
    }
    function z(Q) {
      const ue = Q ? Q.newValue : n.getItem(e);
      if (ue == null) return a && C != null && n.setItem(e, T.write(C)), C;
      if (!Q && c) {
        const Ie = T.read(ue);
        return typeof c == "function"
          ? c(Ie, C)
          : w === "object" && !Array.isArray(Ie)
            ? { ...C, ...Ie }
            : Ie;
      } else return typeof ue != "string" ? ue : T.read(ue);
    }
    function W(Q) {
      B(Q.detail);
    }
    function B(Q) {
      if (!(Q && Q.storageArea !== n)) {
        if (Q && Q.key == null) {
          x.value = C;
          return;
        }
        if (!(Q && Q.key !== e)) {
          P();
          try {
            (Q == null ? void 0 : Q.newValue) !== T.write(x.value) &&
              (x.value = z(Q));
          } catch (ue) {
            m(ue);
          } finally {
            Q ? nn(N) : N();
          }
        }
      }
    }
  }
  function bu(e = {}) {
    const { controls: t = !1, interval: n = "requestAnimationFrame" } = e,
      i = q(new Date()),
      r = () => (i.value = new Date()),
      s =
        n === "requestAnimationFrame"
          ? pu(r, { immediate: !0 })
          : du(r, n, { immediate: !0 });
    return t ? { now: i, ...s } : i;
  }
  function ku(e, t = ci, n = {}) {
    const {
        immediate: i = !0,
        manual: r = !1,
        type: s = "text/javascript",
        async: l = !0,
        crossOrigin: o,
        referrerPolicy: a,
        noModule: c,
        defer: f,
        document: p = $l,
        attrs: h = {},
      } = n,
      m = q(null);
    let S = null;
    const x = (T) =>
        new Promise((P, N) => {
          const U = (B) => ((m.value = B), P(B), B);
          if (!p) {
            P(!1);
            return;
          }
          let z = !1,
            W = p.querySelector(`script[src="${nt(e)}"]`);
          W
            ? W.hasAttribute("data-loaded") && U(W)
            : ((W = p.createElement("script")),
              (W.type = s),
              (W.async = l),
              (W.src = nt(e)),
              f && (W.defer = f),
              o && (W.crossOrigin = o),
              c && (W.noModule = c),
              a && (W.referrerPolicy = a),
              Object.entries(h).forEach(([B, Q]) =>
                W == null ? void 0 : W.setAttribute(B, Q),
              ),
              (z = !0)),
            W.addEventListener("error", (B) => N(B)),
            W.addEventListener("abort", (B) => N(B)),
            W.addEventListener("load", () => {
              W.setAttribute("data-loaded", "true"), t(W), U(W);
            }),
            z && (W = p.head.appendChild(W)),
            T || U(W);
        }),
      C = (T = !0) => (S || (S = x(T)), S),
      w = () => {
        if (!p) return;
        (S = null), m.value && (m.value = null);
        const T = p.querySelector(`script[src="${nt(e)}"]`);
        T && p.head.removeChild(T);
      };
    return i && !r && dr(C), r || fu(w), { scriptTag: m, load: C, unload: w };
  }
  let xu = 0;
  function _u(e, t = {}) {
    const n = q(!1),
      {
        document: i = $l,
        immediate: r = !0,
        manual: s = !1,
        id: l = `vueuse_styletag_${++xu}`,
      } = t,
      o = q(e);
    let a = () => {};
    const c = () => {
        if (!i) return;
        const p = i.getElementById(l) || i.createElement("style");
        p.isConnected ||
          ((p.id = l), t.media && (p.media = t.media), i.head.appendChild(p)),
          !n.value &&
            ((a = Pe(
              o,
              (h) => {
                p.textContent = h;
              },
              { immediate: !0 },
            )),
            (n.value = !0));
      },
      f = () => {
        !i ||
          !n.value ||
          (a(), i.head.removeChild(i.getElementById(l)), (n.value = !1));
      };
    return (
      r && !s && dr(c),
      s || gn(f),
      { id: l, css: o, unload: f, load: c, isLoaded: Xt(n) }
    );
  }
  const Cu = (e) => !!/@[0-9]+\.[0-9]+\.[0-9]+/.test(e),
    $u = (e) => {
      const t = Vt("WALINE_EMOJI", {}),
        n = Cu(e);
      if (n) {
        const i = t.value[e];
        if (i) return Promise.resolve(i);
      }
      return fetch(`${e}/info.json`)
        .then((i) => i.json())
        .then((i) => {
          const r = { folder: e, ...i };
          return n && (t.value[e] = r), r;
        });
    },
    Rl = (e, t = "", n = "", i = "") =>
      `${t ? `${t}/` : ""}${n}${e}${i ? `.${i}` : ""}`,
    Eu = (e) =>
      Promise.all(e.map((t) => (It(t) ? $u(Zr(t)) : Promise.resolve(t)))).then(
        (t) => {
          const n = { tabs: [], map: {} };
          return (
            t.forEach((i) => {
              const {
                name: r,
                folder: s,
                icon: l,
                prefix: o,
                type: a,
                items: c,
              } = i;
              n.tabs.push({
                name: r,
                icon: Rl(l, s, o, a),
                items: c.map((f) => {
                  const p = `${o || ""}${f}`;
                  return (n.map[p] = Rl(f, s, o, a)), p;
                }),
              });
            }),
            n
          );
        },
      ),
    Sl = (e) => {
      e.name !== "AbortError" && console.error(e.message);
    },
    hr = (e) =>
      e instanceof HTMLElement ? e : It(e) ? document.querySelector(e) : null,
    Tu = (e) => e.type.includes("image"),
    Al = (e) => {
      const t = Array.from(e).find(Tu);
      return t ? t.getAsFile() : null;
    };
  function pr() {
    return {
      async: !1,
      breaks: !1,
      extensions: null,
      gfm: !0,
      hooks: null,
      pedantic: !1,
      renderer: null,
      silent: !1,
      tokenizer: null,
      walkTokens: null,
    };
  }
  let Tt = pr();
  function Il(e) {
    Tt = e;
  }
  const Ll = /[&<>"']/,
    Ru = new RegExp(Ll.source, "g"),
    Ml = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
    Su = new RegExp(Ml.source, "g"),
    Au = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    },
    Ol = (e) => Au[e];
  function ze(e, t) {
    if (t) {
      if (Ll.test(e)) return e.replace(Ru, Ol);
    } else if (Ml.test(e)) return e.replace(Su, Ol);
    return e;
  }
  const Iu = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi;
  function Lu(e) {
    return e.replace(
      Iu,
      (t, n) => (
        (n = n.toLowerCase()),
        n === "colon"
          ? ":"
          : n.charAt(0) === "#"
            ? n.charAt(1) === "x"
              ? String.fromCharCode(parseInt(n.substring(2), 16))
              : String.fromCharCode(+n.substring(1))
            : ""
      ),
    );
  }
  const Mu = /(^|[^\[])\^/g;
  function se(e, t) {
    let n = typeof e == "string" ? e : e.source;
    t = t || "";
    const i = {
      replace: (r, s) => {
        let l = typeof s == "string" ? s : s.source;
        return (l = l.replace(Mu, "$1")), (n = n.replace(r, l)), i;
      },
      getRegex: () => new RegExp(n, t),
    };
    return i;
  }
  function zl(e) {
    try {
      e = encodeURI(e).replace(/%25/g, "%");
    } catch {
      return null;
    }
    return e;
  }
  const mn = { exec: () => null };
  function jl(e, t) {
    const n = e.replace(/\|/g, (s, l, o) => {
        let a = !1,
          c = l;
        for (; --c >= 0 && o[c] === "\\"; ) a = !a;
        return a ? "|" : " |";
      }),
      i = n.split(/ \|/);
    let r = 0;
    if (
      (i[0].trim() || i.shift(),
      i.length > 0 && !i[i.length - 1].trim() && i.pop(),
      t)
    )
      if (i.length > t) i.splice(t);
      else for (; i.length < t; ) i.push("");
    for (; r < i.length; r++) i[r] = i[r].trim().replace(/\\\|/g, "|");
    return i;
  }
  function hi(e, t, n) {
    const i = e.length;
    if (i === 0) return "";
    let r = 0;
    for (; r < i; ) {
      const s = e.charAt(i - r - 1);
      if (s === t && !n) r++;
      else if (s !== t && n) r++;
      else break;
    }
    return e.slice(0, i - r);
  }
  function Ou(e, t) {
    if (e.indexOf(t[1]) === -1) return -1;
    let n = 0;
    for (let i = 0; i < e.length; i++)
      if (e[i] === "\\") i++;
      else if (e[i] === t[0]) n++;
      else if (e[i] === t[1] && (n--, n < 0)) return i;
    return -1;
  }
  function Pl(e, t, n, i) {
    const r = t.href,
      s = t.title ? ze(t.title) : null,
      l = e[1].replace(/\\([\[\]])/g, "$1");
    if (e[0].charAt(0) !== "!") {
      i.state.inLink = !0;
      const o = {
        type: "link",
        raw: n,
        href: r,
        title: s,
        text: l,
        tokens: i.inlineTokens(l),
      };
      return (i.state.inLink = !1), o;
    }
    return { type: "image", raw: n, href: r, title: s, text: ze(l) };
  }
  function zu(e, t) {
    const n = e.match(/^(\s+)(?:```)/);
    if (n === null) return t;
    const i = n[1];
    return t
      .split(
        `
`,
      )
      .map((r) => {
        const s = r.match(/^\s+/);
        if (s === null) return r;
        const [l] = s;
        return l.length >= i.length ? r.slice(i.length) : r;
      }).join(`
`);
  }
  class pi {
    options;
    rules;
    lexer;
    constructor(t) {
      this.options = t || Tt;
    }
    space(t) {
      const n = this.rules.block.newline.exec(t);
      if (n && n[0].length > 0) return { type: "space", raw: n[0] };
    }
    code(t) {
      const n = this.rules.block.code.exec(t);
      if (n) {
        const i = n[0].replace(/^ {1,4}/gm, "");
        return {
          type: "code",
          raw: n[0],
          codeBlockStyle: "indented",
          text: this.options.pedantic
            ? i
            : hi(
                i,
                `
`,
              ),
        };
      }
    }
    fences(t) {
      const n = this.rules.block.fences.exec(t);
      if (n) {
        const i = n[0],
          r = zu(i, n[3] || "");
        return {
          type: "code",
          raw: i,
          lang: n[2]
            ? n[2].trim().replace(this.rules.inline.anyPunctuation, "$1")
            : n[2],
          text: r,
        };
      }
    }
    heading(t) {
      const n = this.rules.block.heading.exec(t);
      if (n) {
        let i = n[2].trim();
        if (/#$/.test(i)) {
          const r = hi(i, "#");
          (this.options.pedantic || !r || / $/.test(r)) && (i = r.trim());
        }
        return {
          type: "heading",
          raw: n[0],
          depth: n[1].length,
          text: i,
          tokens: this.lexer.inline(i),
        };
      }
    }
    hr(t) {
      const n = this.rules.block.hr.exec(t);
      if (n) return { type: "hr", raw: n[0] };
    }
    blockquote(t) {
      const n = this.rules.block.blockquote.exec(t);
      if (n) {
        const i = hi(
            n[0].replace(/^ *>[ \t]?/gm, ""),
            `
`,
          ),
          r = this.lexer.state.top;
        this.lexer.state.top = !0;
        const s = this.lexer.blockTokens(i);
        return (
          (this.lexer.state.top = r),
          { type: "blockquote", raw: n[0], tokens: s, text: i }
        );
      }
    }
    list(t) {
      let n = this.rules.block.list.exec(t);
      if (n) {
        let i = n[1].trim();
        const r = i.length > 1,
          s = {
            type: "list",
            raw: "",
            ordered: r,
            start: r ? +i.slice(0, -1) : "",
            loose: !1,
            items: [],
          };
        (i = r ? `\\d{1,9}\\${i.slice(-1)}` : `\\${i}`),
          this.options.pedantic && (i = r ? i : "[*+-]");
        const l = new RegExp(`^( {0,3}${i})((?:[	 ][^\\n]*)?(?:\\n|$))`);
        let o = "",
          a = "",
          c = !1;
        for (; t; ) {
          let f = !1;
          if (!(n = l.exec(t)) || this.rules.block.hr.test(t)) break;
          (o = n[0]), (t = t.substring(o.length));
          let p = n[2]
              .split(
                `
`,
                1,
              )[0]
              .replace(/^\t+/, (w) => " ".repeat(3 * w.length)),
            h = t.split(
              `
`,
              1,
            )[0],
            m = 0;
          this.options.pedantic
            ? ((m = 2), (a = p.trimStart()))
            : ((m = n[2].search(/[^ ]/)),
              (m = m > 4 ? 1 : m),
              (a = p.slice(m)),
              (m += n[1].length));
          let S = !1;
          if (
            (!p &&
              /^ *$/.test(h) &&
              ((o +=
                h +
                `
`),
              (t = t.substring(h.length + 1)),
              (f = !0)),
            !f)
          ) {
            const w = new RegExp(
                `^ {0,${Math.min(3, m - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`,
              ),
              T = new RegExp(
                `^ {0,${Math.min(3, m - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`,
              ),
              P = new RegExp(`^ {0,${Math.min(3, m - 1)}}(?:\`\`\`|~~~)`),
              N = new RegExp(`^ {0,${Math.min(3, m - 1)}}#`);
            for (; t; ) {
              const U = t.split(
                `
`,
                1,
              )[0];
              if (
                ((h = U),
                this.options.pedantic &&
                  (h = h.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ")),
                P.test(h) || N.test(h) || w.test(h) || T.test(t))
              )
                break;
              if (h.search(/[^ ]/) >= m || !h.trim())
                a +=
                  `
` + h.slice(m);
              else {
                if (
                  S ||
                  p.search(/[^ ]/) >= 4 ||
                  P.test(p) ||
                  N.test(p) ||
                  T.test(p)
                )
                  break;
                a +=
                  `
` + h;
              }
              !S && !h.trim() && (S = !0),
                (o +=
                  U +
                  `
`),
                (t = t.substring(U.length + 1)),
                (p = h.slice(m));
            }
          }
          s.loose || (c ? (s.loose = !0) : /\n *\n *$/.test(o) && (c = !0));
          let x = null,
            C;
          this.options.gfm &&
            ((x = /^\[[ xX]\] /.exec(a)),
            x && ((C = x[0] !== "[ ] "), (a = a.replace(/^\[[ xX]\] +/, "")))),
            s.items.push({
              type: "list_item",
              raw: o,
              task: !!x,
              checked: C,
              loose: !1,
              text: a,
              tokens: [],
            }),
            (s.raw += o);
        }
        (s.items[s.items.length - 1].raw = o.trimEnd()),
          (s.items[s.items.length - 1].text = a.trimEnd()),
          (s.raw = s.raw.trimEnd());
        for (let f = 0; f < s.items.length; f++)
          if (
            ((this.lexer.state.top = !1),
            (s.items[f].tokens = this.lexer.blockTokens(s.items[f].text, [])),
            !s.loose)
          ) {
            const p = s.items[f].tokens.filter((m) => m.type === "space"),
              h = p.length > 0 && p.some((m) => /\n.*\n/.test(m.raw));
            s.loose = h;
          }
        if (s.loose)
          for (let f = 0; f < s.items.length; f++) s.items[f].loose = !0;
        return s;
      }
    }
    html(t) {
      const n = this.rules.block.html.exec(t);
      if (n)
        return {
          type: "html",
          block: !0,
          raw: n[0],
          pre: n[1] === "pre" || n[1] === "script" || n[1] === "style",
          text: n[0],
        };
    }
    def(t) {
      const n = this.rules.block.def.exec(t);
      if (n) {
        const i = n[1].toLowerCase().replace(/\s+/g, " "),
          r = n[2]
            ? n[2]
                .replace(/^<(.*)>$/, "$1")
                .replace(this.rules.inline.anyPunctuation, "$1")
            : "",
          s = n[3]
            ? n[3]
                .substring(1, n[3].length - 1)
                .replace(this.rules.inline.anyPunctuation, "$1")
            : n[3];
        return { type: "def", tag: i, raw: n[0], href: r, title: s };
      }
    }
    table(t) {
      const n = this.rules.block.table.exec(t);
      if (!n || !/[:|]/.test(n[2])) return;
      const i = jl(n[1]),
        r = n[2].replace(/^\||\| *$/g, "").split("|"),
        s =
          n[3] && n[3].trim()
            ? n[3].replace(/\n[ \t]*$/, "").split(`
`)
            : [],
        l = { type: "table", raw: n[0], header: [], align: [], rows: [] };
      if (i.length === r.length) {
        for (const o of r)
          /^ *-+: *$/.test(o)
            ? l.align.push("right")
            : /^ *:-+: *$/.test(o)
              ? l.align.push("center")
              : /^ *:-+ *$/.test(o)
                ? l.align.push("left")
                : l.align.push(null);
        for (const o of i)
          l.header.push({ text: o, tokens: this.lexer.inline(o) });
        for (const o of s)
          l.rows.push(
            jl(o, l.header.length).map((a) => ({
              text: a,
              tokens: this.lexer.inline(a),
            })),
          );
        return l;
      }
    }
    lheading(t) {
      const n = this.rules.block.lheading.exec(t);
      if (n)
        return {
          type: "heading",
          raw: n[0],
          depth: n[2].charAt(0) === "=" ? 1 : 2,
          text: n[1],
          tokens: this.lexer.inline(n[1]),
        };
    }
    paragraph(t) {
      const n = this.rules.block.paragraph.exec(t);
      if (n) {
        const i =
          n[1].charAt(n[1].length - 1) ===
          `
`
            ? n[1].slice(0, -1)
            : n[1];
        return {
          type: "paragraph",
          raw: n[0],
          text: i,
          tokens: this.lexer.inline(i),
        };
      }
    }
    text(t) {
      const n = this.rules.block.text.exec(t);
      if (n)
        return {
          type: "text",
          raw: n[0],
          text: n[0],
          tokens: this.lexer.inline(n[0]),
        };
    }
    escape(t) {
      const n = this.rules.inline.escape.exec(t);
      if (n) return { type: "escape", raw: n[0], text: ze(n[1]) };
    }
    tag(t) {
      const n = this.rules.inline.tag.exec(t);
      if (n)
        return (
          !this.lexer.state.inLink && /^<a /i.test(n[0])
            ? (this.lexer.state.inLink = !0)
            : this.lexer.state.inLink &&
              /^<\/a>/i.test(n[0]) &&
              (this.lexer.state.inLink = !1),
          !this.lexer.state.inRawBlock &&
          /^<(pre|code|kbd|script)(\s|>)/i.test(n[0])
            ? (this.lexer.state.inRawBlock = !0)
            : this.lexer.state.inRawBlock &&
              /^<\/(pre|code|kbd|script)(\s|>)/i.test(n[0]) &&
              (this.lexer.state.inRawBlock = !1),
          {
            type: "html",
            raw: n[0],
            inLink: this.lexer.state.inLink,
            inRawBlock: this.lexer.state.inRawBlock,
            block: !1,
            text: n[0],
          }
        );
    }
    link(t) {
      const n = this.rules.inline.link.exec(t);
      if (n) {
        const i = n[2].trim();
        if (!this.options.pedantic && /^</.test(i)) {
          if (!/>$/.test(i)) return;
          const l = hi(i.slice(0, -1), "\\");
          if ((i.length - l.length) % 2 === 0) return;
        } else {
          const l = Ou(n[2], "()");
          if (l > -1) {
            const a = (n[0].indexOf("!") === 0 ? 5 : 4) + n[1].length + l;
            (n[2] = n[2].substring(0, l)),
              (n[0] = n[0].substring(0, a).trim()),
              (n[3] = "");
          }
        }
        let r = n[2],
          s = "";
        if (this.options.pedantic) {
          const l = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(r);
          l && ((r = l[1]), (s = l[3]));
        } else s = n[3] ? n[3].slice(1, -1) : "";
        return (
          (r = r.trim()),
          /^</.test(r) &&
            (this.options.pedantic && !/>$/.test(i)
              ? (r = r.slice(1))
              : (r = r.slice(1, -1))),
          Pl(
            n,
            {
              href: r && r.replace(this.rules.inline.anyPunctuation, "$1"),
              title: s && s.replace(this.rules.inline.anyPunctuation, "$1"),
            },
            n[0],
            this.lexer,
          )
        );
      }
    }
    reflink(t, n) {
      let i;
      if (
        (i = this.rules.inline.reflink.exec(t)) ||
        (i = this.rules.inline.nolink.exec(t))
      ) {
        const r = (i[2] || i[1]).replace(/\s+/g, " "),
          s = n[r.toLowerCase()];
        if (!s) {
          const l = i[0].charAt(0);
          return { type: "text", raw: l, text: l };
        }
        return Pl(i, s, i[0], this.lexer);
      }
    }
    emStrong(t, n, i = "") {
      let r = this.rules.inline.emStrongLDelim.exec(t);
      if (!r || (r[3] && i.match(/[\p{L}\p{N}]/u))) return;
      if (
        !(r[1] || r[2] || "") ||
        !i ||
        this.rules.inline.punctuation.exec(i)
      ) {
        const l = [...r[0]].length - 1;
        let o,
          a,
          c = l,
          f = 0;
        const p =
          r[0][0] === "*"
            ? this.rules.inline.emStrongRDelimAst
            : this.rules.inline.emStrongRDelimUnd;
        for (
          p.lastIndex = 0, n = n.slice(-1 * t.length + l);
          (r = p.exec(n)) != null;

        ) {
          if (((o = r[1] || r[2] || r[3] || r[4] || r[5] || r[6]), !o))
            continue;
          if (((a = [...o].length), r[3] || r[4])) {
            c += a;
            continue;
          } else if ((r[5] || r[6]) && l % 3 && !((l + a) % 3)) {
            f += a;
            continue;
          }
          if (((c -= a), c > 0)) continue;
          a = Math.min(a, a + c + f);
          const h = [...r[0]][0].length,
            m = t.slice(0, l + r.index + h + a);
          if (Math.min(l, a) % 2) {
            const x = m.slice(1, -1);
            return {
              type: "em",
              raw: m,
              text: x,
              tokens: this.lexer.inlineTokens(x),
            };
          }
          const S = m.slice(2, -2);
          return {
            type: "strong",
            raw: m,
            text: S,
            tokens: this.lexer.inlineTokens(S),
          };
        }
      }
    }
    codespan(t) {
      const n = this.rules.inline.code.exec(t);
      if (n) {
        let i = n[2].replace(/\n/g, " ");
        const r = /[^ ]/.test(i),
          s = /^ /.test(i) && / $/.test(i);
        return (
          r && s && (i = i.substring(1, i.length - 1)),
          (i = ze(i, !0)),
          { type: "codespan", raw: n[0], text: i }
        );
      }
    }
    br(t) {
      const n = this.rules.inline.br.exec(t);
      if (n) return { type: "br", raw: n[0] };
    }
    del(t) {
      const n = this.rules.inline.del.exec(t);
      if (n)
        return {
          type: "del",
          raw: n[0],
          text: n[2],
          tokens: this.lexer.inlineTokens(n[2]),
        };
    }
    autolink(t) {
      const n = this.rules.inline.autolink.exec(t);
      if (n) {
        let i, r;
        return (
          n[2] === "@"
            ? ((i = ze(n[1])), (r = "mailto:" + i))
            : ((i = ze(n[1])), (r = i)),
          {
            type: "link",
            raw: n[0],
            text: i,
            href: r,
            tokens: [{ type: "text", raw: i, text: i }],
          }
        );
      }
    }
    url(t) {
      var i;
      let n;
      if ((n = this.rules.inline.url.exec(t))) {
        let r, s;
        if (n[2] === "@") (r = ze(n[0])), (s = "mailto:" + r);
        else {
          let l;
          do
            (l = n[0]),
              (n[0] =
                ((i = this.rules.inline._backpedal.exec(n[0])) == null
                  ? void 0
                  : i[0]) ?? "");
          while (l !== n[0]);
          (r = ze(n[0])), n[1] === "www." ? (s = "http://" + n[0]) : (s = n[0]);
        }
        return {
          type: "link",
          raw: n[0],
          text: r,
          href: s,
          tokens: [{ type: "text", raw: r, text: r }],
        };
      }
    }
    inlineText(t) {
      const n = this.rules.inline.text.exec(t);
      if (n) {
        let i;
        return (
          this.lexer.state.inRawBlock ? (i = n[0]) : (i = ze(n[0])),
          { type: "text", raw: n[0], text: i }
        );
      }
    }
  }
  const ju = /^(?: *(?:\n|$))+/,
    Pu = /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
    Uu =
      /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
    vn = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,
    Fu = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
    Ul = /(?:[*+-]|\d{1,9}[.)])/,
    Fl = se(/^(?!bull )((?:.|\n(?!\s*?\n|bull ))+?)\n {0,3}(=+|-+) *(?:\n+|$)/)
      .replace(/bull/g, Ul)
      .getRegex(),
    gr =
      /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
    Nu = /^[^\n]+/,
    mr = /(?!\s*\])(?:\\.|[^\[\]\\])+/,
    Hu = se(
      /^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,
    )
      .replace("label", mr)
      .replace(
        "title",
        /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/,
      )
      .getRegex(),
    Du = se(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/)
      .replace(/bull/g, Ul)
      .getRegex(),
    gi =
      "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",
    vr = /<!--(?:-?>|[\s\S]*?(?:-->|$))/,
    Vu = se(
      "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",
      "i",
    )
      .replace("comment", vr)
      .replace("tag", gi)
      .replace(
        "attribute",
        / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/,
      )
      .getRegex(),
    Nl = se(gr)
      .replace("hr", vn)
      .replace("heading", " {0,3}#{1,6}(?:\\s|$)")
      .replace("|lheading", "")
      .replace("|table", "")
      .replace("blockquote", " {0,3}>")
      .replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n")
      .replace("list", " {0,3}(?:[*+-]|1[.)]) ")
      .replace(
        "html",
        "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)",
      )
      .replace("tag", gi)
      .getRegex(),
    yr = {
      blockquote: se(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/)
        .replace("paragraph", Nl)
        .getRegex(),
      code: Pu,
      def: Hu,
      fences: Uu,
      heading: Fu,
      hr: vn,
      html: Vu,
      lheading: Fl,
      list: Du,
      newline: ju,
      paragraph: Nl,
      table: mn,
      text: Nu,
    },
    Hl = se(
      "^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)",
    )
      .replace("hr", vn)
      .replace("heading", " {0,3}#{1,6}(?:\\s|$)")
      .replace("blockquote", " {0,3}>")
      .replace("code", " {4}[^\\n]")
      .replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n")
      .replace("list", " {0,3}(?:[*+-]|1[.)]) ")
      .replace(
        "html",
        "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)",
      )
      .replace("tag", gi)
      .getRegex(),
    Bu = {
      ...yr,
      table: Hl,
      paragraph: se(gr)
        .replace("hr", vn)
        .replace("heading", " {0,3}#{1,6}(?:\\s|$)")
        .replace("|lheading", "")
        .replace("table", Hl)
        .replace("blockquote", " {0,3}>")
        .replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n")
        .replace("list", " {0,3}(?:[*+-]|1[.)]) ")
        .replace(
          "html",
          "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)",
        )
        .replace("tag", gi)
        .getRegex(),
    },
    Wu = {
      ...yr,
      html: se(
        `^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`,
      )
        .replace("comment", vr)
        .replace(
          /tag/g,
          "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b",
        )
        .getRegex(),
      def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
      heading: /^(#{1,6})(.*)(?:\n+|$)/,
      fences: mn,
      lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
      paragraph: se(gr)
        .replace("hr", vn)
        .replace(
          "heading",
          ` *#{1,6} *[^
]`,
        )
        .replace("lheading", Fl)
        .replace("|table", "")
        .replace("blockquote", " {0,3}>")
        .replace("|fences", "")
        .replace("|list", "")
        .replace("|html", "")
        .replace("|tag", "")
        .getRegex(),
    },
    Dl = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
    qu = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
    Vl = /^( {2,}|\\)\n(?!\s*$)/,
    Ku =
      /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
    yn = "\\p{P}\\p{S}",
    Zu = se(/^((?![*_])[\spunctuation])/, "u")
      .replace(/punctuation/g, yn)
      .getRegex(),
    Gu = /\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g,
    Qu = se(
      /^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/,
      "u",
    )
      .replace(/punct/g, yn)
      .getRegex(),
    Ju = se(
      "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)[punct](\\*+)(?=[\\s]|$)|[^punct\\s](\\*+)(?!\\*)(?=[punct\\s]|$)|(?!\\*)[punct\\s](\\*+)(?=[^punct\\s])|[\\s](\\*+)(?!\\*)(?=[punct])|(?!\\*)[punct](\\*+)(?!\\*)(?=[punct])|[^punct\\s](\\*+)(?=[^punct\\s])",
      "gu",
    )
      .replace(/punct/g, yn)
      .getRegex(),
    Yu = se(
      "^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\\s]|$)|[^punct\\s](_+)(?!_)(?=[punct\\s]|$)|(?!_)[punct\\s](_+)(?=[^punct\\s])|[\\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])",
      "gu",
    )
      .replace(/punct/g, yn)
      .getRegex(),
    Xu = se(/\\([punct])/, "gu")
      .replace(/punct/g, yn)
      .getRegex(),
    ef = se(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/)
      .replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/)
      .replace(
        "email",
        /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/,
      )
      .getRegex(),
    tf = se(vr).replace("(?:-->|$)", "-->").getRegex(),
    nf = se(
      "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
    )
      .replace("comment", tf)
      .replace(
        "attribute",
        /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/,
      )
      .getRegex(),
    mi = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,
    rf = se(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/)
      .replace("label", mi)
      .replace("href", /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/)
      .replace(
        "title",
        /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/,
      )
      .getRegex(),
    Bl = se(/^!?\[(label)\]\[(ref)\]/)
      .replace("label", mi)
      .replace("ref", mr)
      .getRegex(),
    Wl = se(/^!?\[(ref)\](?:\[\])?/)
      .replace("ref", mr)
      .getRegex(),
    sf = se("reflink|nolink(?!\\()", "g")
      .replace("reflink", Bl)
      .replace("nolink", Wl)
      .getRegex(),
    wr = {
      _backpedal: mn,
      anyPunctuation: Xu,
      autolink: ef,
      blockSkip: Gu,
      br: Vl,
      code: qu,
      del: mn,
      emStrongLDelim: Qu,
      emStrongRDelimAst: Ju,
      emStrongRDelimUnd: Yu,
      escape: Dl,
      link: rf,
      nolink: Wl,
      punctuation: Zu,
      reflink: Bl,
      reflinkSearch: sf,
      tag: nf,
      text: Ku,
      url: mn,
    },
    lf = {
      ...wr,
      link: se(/^!?\[(label)\]\((.*?)\)/)
        .replace("label", mi)
        .getRegex(),
      reflink: se(/^!?\[(label)\]\s*\[([^\]]*)\]/)
        .replace("label", mi)
        .getRegex(),
    },
    br = {
      ...wr,
      escape: se(Dl).replace("])", "~|])").getRegex(),
      url: se(
        /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
        "i",
      )
        .replace(
          "email",
          /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
        )
        .getRegex(),
      _backpedal:
        /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
      del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
      text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/,
    },
    of = {
      ...br,
      br: se(Vl).replace("{2,}", "*").getRegex(),
      text: se(br.text)
        .replace("\\b_", "\\b_| {2,}\\n")
        .replace(/\{2,\}/g, "*")
        .getRegex(),
    },
    vi = { normal: yr, gfm: Bu, pedantic: Wu },
    wn = { normal: wr, gfm: br, breaks: of, pedantic: lf };
  class it {
    tokens;
    options;
    state;
    tokenizer;
    inlineQueue;
    constructor(t) {
      (this.tokens = []),
        (this.tokens.links = Object.create(null)),
        (this.options = t || Tt),
        (this.options.tokenizer = this.options.tokenizer || new pi()),
        (this.tokenizer = this.options.tokenizer),
        (this.tokenizer.options = this.options),
        (this.tokenizer.lexer = this),
        (this.inlineQueue = []),
        (this.state = { inLink: !1, inRawBlock: !1, top: !0 });
      const n = { block: vi.normal, inline: wn.normal };
      this.options.pedantic
        ? ((n.block = vi.pedantic), (n.inline = wn.pedantic))
        : this.options.gfm &&
          ((n.block = vi.gfm),
          this.options.breaks ? (n.inline = wn.breaks) : (n.inline = wn.gfm)),
        (this.tokenizer.rules = n);
    }
    static get rules() {
      return { block: vi, inline: wn };
    }
    static lex(t, n) {
      return new it(n).lex(t);
    }
    static lexInline(t, n) {
      return new it(n).inlineTokens(t);
    }
    lex(t) {
      (t = t.replace(
        /\r\n|\r/g,
        `
`,
      )),
        this.blockTokens(t, this.tokens);
      for (let n = 0; n < this.inlineQueue.length; n++) {
        const i = this.inlineQueue[n];
        this.inlineTokens(i.src, i.tokens);
      }
      return (this.inlineQueue = []), this.tokens;
    }
    blockTokens(t, n = []) {
      this.options.pedantic
        ? (t = t.replace(/\t/g, "    ").replace(/^ +$/gm, ""))
        : (t = t.replace(
            /^( *)(\t+)/gm,
            (o, a, c) => a + "    ".repeat(c.length),
          ));
      let i, r, s, l;
      for (; t; )
        if (
          !(
            this.options.extensions &&
            this.options.extensions.block &&
            this.options.extensions.block.some((o) =>
              (i = o.call({ lexer: this }, t, n))
                ? ((t = t.substring(i.raw.length)), n.push(i), !0)
                : !1,
            )
          )
        ) {
          if ((i = this.tokenizer.space(t))) {
            (t = t.substring(i.raw.length)),
              i.raw.length === 1 && n.length > 0
                ? (n[n.length - 1].raw += `
`)
                : n.push(i);
            continue;
          }
          if ((i = this.tokenizer.code(t))) {
            (t = t.substring(i.raw.length)),
              (r = n[n.length - 1]),
              r && (r.type === "paragraph" || r.type === "text")
                ? ((r.raw +=
                    `
` + i.raw),
                  (r.text +=
                    `
` + i.text),
                  (this.inlineQueue[this.inlineQueue.length - 1].src = r.text))
                : n.push(i);
            continue;
          }
          if ((i = this.tokenizer.fences(t))) {
            (t = t.substring(i.raw.length)), n.push(i);
            continue;
          }
          if ((i = this.tokenizer.heading(t))) {
            (t = t.substring(i.raw.length)), n.push(i);
            continue;
          }
          if ((i = this.tokenizer.hr(t))) {
            (t = t.substring(i.raw.length)), n.push(i);
            continue;
          }
          if ((i = this.tokenizer.blockquote(t))) {
            (t = t.substring(i.raw.length)), n.push(i);
            continue;
          }
          if ((i = this.tokenizer.list(t))) {
            (t = t.substring(i.raw.length)), n.push(i);
            continue;
          }
          if ((i = this.tokenizer.html(t))) {
            (t = t.substring(i.raw.length)), n.push(i);
            continue;
          }
          if ((i = this.tokenizer.def(t))) {
            (t = t.substring(i.raw.length)),
              (r = n[n.length - 1]),
              r && (r.type === "paragraph" || r.type === "text")
                ? ((r.raw +=
                    `
` + i.raw),
                  (r.text +=
                    `
` + i.raw),
                  (this.inlineQueue[this.inlineQueue.length - 1].src = r.text))
                : this.tokens.links[i.tag] ||
                  (this.tokens.links[i.tag] = { href: i.href, title: i.title });
            continue;
          }
          if ((i = this.tokenizer.table(t))) {
            (t = t.substring(i.raw.length)), n.push(i);
            continue;
          }
          if ((i = this.tokenizer.lheading(t))) {
            (t = t.substring(i.raw.length)), n.push(i);
            continue;
          }
          if (
            ((s = t),
            this.options.extensions && this.options.extensions.startBlock)
          ) {
            let o = 1 / 0;
            const a = t.slice(1);
            let c;
            this.options.extensions.startBlock.forEach((f) => {
              (c = f.call({ lexer: this }, a)),
                typeof c == "number" && c >= 0 && (o = Math.min(o, c));
            }),
              o < 1 / 0 && o >= 0 && (s = t.substring(0, o + 1));
          }
          if (this.state.top && (i = this.tokenizer.paragraph(s))) {
            (r = n[n.length - 1]),
              l && r.type === "paragraph"
                ? ((r.raw +=
                    `
` + i.raw),
                  (r.text +=
                    `
` + i.text),
                  this.inlineQueue.pop(),
                  (this.inlineQueue[this.inlineQueue.length - 1].src = r.text))
                : n.push(i),
              (l = s.length !== t.length),
              (t = t.substring(i.raw.length));
            continue;
          }
          if ((i = this.tokenizer.text(t))) {
            (t = t.substring(i.raw.length)),
              (r = n[n.length - 1]),
              r && r.type === "text"
                ? ((r.raw +=
                    `
` + i.raw),
                  (r.text +=
                    `
` + i.text),
                  this.inlineQueue.pop(),
                  (this.inlineQueue[this.inlineQueue.length - 1].src = r.text))
                : n.push(i);
            continue;
          }
          if (t) {
            const o = "Infinite loop on byte: " + t.charCodeAt(0);
            if (this.options.silent) {
              console.error(o);
              break;
            } else throw new Error(o);
          }
        }
      return (this.state.top = !0), n;
    }
    inline(t, n = []) {
      return this.inlineQueue.push({ src: t, tokens: n }), n;
    }
    inlineTokens(t, n = []) {
      let i,
        r,
        s,
        l = t,
        o,
        a,
        c;
      if (this.tokens.links) {
        const f = Object.keys(this.tokens.links);
        if (f.length > 0)
          for (
            ;
            (o = this.tokenizer.rules.inline.reflinkSearch.exec(l)) != null;

          )
            f.includes(o[0].slice(o[0].lastIndexOf("[") + 1, -1)) &&
              (l =
                l.slice(0, o.index) +
                "[" +
                "a".repeat(o[0].length - 2) +
                "]" +
                l.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
      }
      for (; (o = this.tokenizer.rules.inline.blockSkip.exec(l)) != null; )
        l =
          l.slice(0, o.index) +
          "[" +
          "a".repeat(o[0].length - 2) +
          "]" +
          l.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
      for (; (o = this.tokenizer.rules.inline.anyPunctuation.exec(l)) != null; )
        l =
          l.slice(0, o.index) +
          "++" +
          l.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
      for (; t; )
        if (
          (a || (c = ""),
          (a = !1),
          !(
            this.options.extensions &&
            this.options.extensions.inline &&
            this.options.extensions.inline.some((f) =>
              (i = f.call({ lexer: this }, t, n))
                ? ((t = t.substring(i.raw.length)), n.push(i), !0)
                : !1,
            )
          ))
        ) {
          if ((i = this.tokenizer.escape(t))) {
            (t = t.substring(i.raw.length)), n.push(i);
            continue;
          }
          if ((i = this.tokenizer.tag(t))) {
            (t = t.substring(i.raw.length)),
              (r = n[n.length - 1]),
              r && i.type === "text" && r.type === "text"
                ? ((r.raw += i.raw), (r.text += i.text))
                : n.push(i);
            continue;
          }
          if ((i = this.tokenizer.link(t))) {
            (t = t.substring(i.raw.length)), n.push(i);
            continue;
          }
          if ((i = this.tokenizer.reflink(t, this.tokens.links))) {
            (t = t.substring(i.raw.length)),
              (r = n[n.length - 1]),
              r && i.type === "text" && r.type === "text"
                ? ((r.raw += i.raw), (r.text += i.text))
                : n.push(i);
            continue;
          }
          if ((i = this.tokenizer.emStrong(t, l, c))) {
            (t = t.substring(i.raw.length)), n.push(i);
            continue;
          }
          if ((i = this.tokenizer.codespan(t))) {
            (t = t.substring(i.raw.length)), n.push(i);
            continue;
          }
          if ((i = this.tokenizer.br(t))) {
            (t = t.substring(i.raw.length)), n.push(i);
            continue;
          }
          if ((i = this.tokenizer.del(t))) {
            (t = t.substring(i.raw.length)), n.push(i);
            continue;
          }
          if ((i = this.tokenizer.autolink(t))) {
            (t = t.substring(i.raw.length)), n.push(i);
            continue;
          }
          if (!this.state.inLink && (i = this.tokenizer.url(t))) {
            (t = t.substring(i.raw.length)), n.push(i);
            continue;
          }
          if (
            ((s = t),
            this.options.extensions && this.options.extensions.startInline)
          ) {
            let f = 1 / 0;
            const p = t.slice(1);
            let h;
            this.options.extensions.startInline.forEach((m) => {
              (h = m.call({ lexer: this }, p)),
                typeof h == "number" && h >= 0 && (f = Math.min(f, h));
            }),
              f < 1 / 0 && f >= 0 && (s = t.substring(0, f + 1));
          }
          if ((i = this.tokenizer.inlineText(s))) {
            (t = t.substring(i.raw.length)),
              i.raw.slice(-1) !== "_" && (c = i.raw.slice(-1)),
              (a = !0),
              (r = n[n.length - 1]),
              r && r.type === "text"
                ? ((r.raw += i.raw), (r.text += i.text))
                : n.push(i);
            continue;
          }
          if (t) {
            const f = "Infinite loop on byte: " + t.charCodeAt(0);
            if (this.options.silent) {
              console.error(f);
              break;
            } else throw new Error(f);
          }
        }
      return n;
    }
  }
  class yi {
    options;
    constructor(t) {
      this.options = t || Tt;
    }
    code(t, n, i) {
      var s;
      const r = (s = (n || "").match(/^\S*/)) == null ? void 0 : s[0];
      return (
        (t =
          t.replace(/\n$/, "") +
          `
`),
        r
          ? '<pre><code class="language-' +
            ze(r) +
            '">' +
            (i ? t : ze(t, !0)) +
            `</code></pre>
`
          : "<pre><code>" +
            (i ? t : ze(t, !0)) +
            `</code></pre>
`
      );
    }
    blockquote(t) {
      return `<blockquote>
${t}</blockquote>
`;
    }
    html(t, n) {
      return t;
    }
    heading(t, n, i) {
      return `<h${n}>${t}</h${n}>
`;
    }
    hr() {
      return `<hr>
`;
    }
    list(t, n, i) {
      const r = n ? "ol" : "ul",
        s = n && i !== 1 ? ' start="' + i + '"' : "";
      return (
        "<" +
        r +
        s +
        `>
` +
        t +
        "</" +
        r +
        `>
`
      );
    }
    listitem(t, n, i) {
      return `<li>${t}</li>
`;
    }
    checkbox(t) {
      return (
        "<input " + (t ? 'checked="" ' : "") + 'disabled="" type="checkbox">'
      );
    }
    paragraph(t) {
      return `<p>${t}</p>
`;
    }
    table(t, n) {
      return (
        n && (n = `<tbody>${n}</tbody>`),
        `<table>
<thead>
` +
          t +
          `</thead>
` +
          n +
          `</table>
`
      );
    }
    tablerow(t) {
      return `<tr>
${t}</tr>
`;
    }
    tablecell(t, n) {
      const i = n.header ? "th" : "td";
      return (
        (n.align ? `<${i} align="${n.align}">` : `<${i}>`) +
        t +
        `</${i}>
`
      );
    }
    strong(t) {
      return `<strong>${t}</strong>`;
    }
    em(t) {
      return `<em>${t}</em>`;
    }
    codespan(t) {
      return `<code>${t}</code>`;
    }
    br() {
      return "<br>";
    }
    del(t) {
      return `<del>${t}</del>`;
    }
    link(t, n, i) {
      const r = zl(t);
      if (r === null) return i;
      t = r;
      let s = '<a href="' + t + '"';
      return n && (s += ' title="' + n + '"'), (s += ">" + i + "</a>"), s;
    }
    image(t, n, i) {
      const r = zl(t);
      if (r === null) return i;
      t = r;
      let s = `<img src="${t}" alt="${i}"`;
      return n && (s += ` title="${n}"`), (s += ">"), s;
    }
    text(t) {
      return t;
    }
  }
  class kr {
    strong(t) {
      return t;
    }
    em(t) {
      return t;
    }
    codespan(t) {
      return t;
    }
    del(t) {
      return t;
    }
    html(t) {
      return t;
    }
    text(t) {
      return t;
    }
    link(t, n, i) {
      return "" + i;
    }
    image(t, n, i) {
      return "" + i;
    }
    br() {
      return "";
    }
  }
  class rt {
    options;
    renderer;
    textRenderer;
    constructor(t) {
      (this.options = t || Tt),
        (this.options.renderer = this.options.renderer || new yi()),
        (this.renderer = this.options.renderer),
        (this.renderer.options = this.options),
        (this.textRenderer = new kr());
    }
    static parse(t, n) {
      return new rt(n).parse(t);
    }
    static parseInline(t, n) {
      return new rt(n).parseInline(t);
    }
    parse(t, n = !0) {
      let i = "";
      for (let r = 0; r < t.length; r++) {
        const s = t[r];
        if (
          this.options.extensions &&
          this.options.extensions.renderers &&
          this.options.extensions.renderers[s.type]
        ) {
          const l = s,
            o = this.options.extensions.renderers[l.type].call(
              { parser: this },
              l,
            );
          if (
            o !== !1 ||
            ![
              "space",
              "hr",
              "heading",
              "code",
              "table",
              "blockquote",
              "list",
              "html",
              "paragraph",
              "text",
            ].includes(l.type)
          ) {
            i += o || "";
            continue;
          }
        }
        switch (s.type) {
          case "space":
            continue;
          case "hr": {
            i += this.renderer.hr();
            continue;
          }
          case "heading": {
            const l = s;
            i += this.renderer.heading(
              this.parseInline(l.tokens),
              l.depth,
              Lu(this.parseInline(l.tokens, this.textRenderer)),
            );
            continue;
          }
          case "code": {
            const l = s;
            i += this.renderer.code(l.text, l.lang, !!l.escaped);
            continue;
          }
          case "table": {
            const l = s;
            let o = "",
              a = "";
            for (let f = 0; f < l.header.length; f++)
              a += this.renderer.tablecell(
                this.parseInline(l.header[f].tokens),
                { header: !0, align: l.align[f] },
              );
            o += this.renderer.tablerow(a);
            let c = "";
            for (let f = 0; f < l.rows.length; f++) {
              const p = l.rows[f];
              a = "";
              for (let h = 0; h < p.length; h++)
                a += this.renderer.tablecell(this.parseInline(p[h].tokens), {
                  header: !1,
                  align: l.align[h],
                });
              c += this.renderer.tablerow(a);
            }
            i += this.renderer.table(o, c);
            continue;
          }
          case "blockquote": {
            const l = s,
              o = this.parse(l.tokens);
            i += this.renderer.blockquote(o);
            continue;
          }
          case "list": {
            const l = s,
              o = l.ordered,
              a = l.start,
              c = l.loose;
            let f = "";
            for (let p = 0; p < l.items.length; p++) {
              const h = l.items[p],
                m = h.checked,
                S = h.task;
              let x = "";
              if (h.task) {
                const C = this.renderer.checkbox(!!m);
                c
                  ? h.tokens.length > 0 && h.tokens[0].type === "paragraph"
                    ? ((h.tokens[0].text = C + " " + h.tokens[0].text),
                      h.tokens[0].tokens &&
                        h.tokens[0].tokens.length > 0 &&
                        h.tokens[0].tokens[0].type === "text" &&
                        (h.tokens[0].tokens[0].text =
                          C + " " + h.tokens[0].tokens[0].text))
                    : h.tokens.unshift({ type: "text", text: C + " " })
                  : (x += C + " ");
              }
              (x += this.parse(h.tokens, c)),
                (f += this.renderer.listitem(x, S, !!m));
            }
            i += this.renderer.list(f, o, a);
            continue;
          }
          case "html": {
            const l = s;
            i += this.renderer.html(l.text, l.block);
            continue;
          }
          case "paragraph": {
            const l = s;
            i += this.renderer.paragraph(this.parseInline(l.tokens));
            continue;
          }
          case "text": {
            let l = s,
              o = l.tokens ? this.parseInline(l.tokens) : l.text;
            for (; r + 1 < t.length && t[r + 1].type === "text"; )
              (l = t[++r]),
                (o +=
                  `
` + (l.tokens ? this.parseInline(l.tokens) : l.text));
            i += n ? this.renderer.paragraph(o) : o;
            continue;
          }
          default: {
            const l = 'Token with "' + s.type + '" type was not found.';
            if (this.options.silent) return console.error(l), "";
            throw new Error(l);
          }
        }
      }
      return i;
    }
    parseInline(t, n) {
      n = n || this.renderer;
      let i = "";
      for (let r = 0; r < t.length; r++) {
        const s = t[r];
        if (
          this.options.extensions &&
          this.options.extensions.renderers &&
          this.options.extensions.renderers[s.type]
        ) {
          const l = this.options.extensions.renderers[s.type].call(
            { parser: this },
            s,
          );
          if (
            l !== !1 ||
            ![
              "escape",
              "html",
              "link",
              "image",
              "strong",
              "em",
              "codespan",
              "br",
              "del",
              "text",
            ].includes(s.type)
          ) {
            i += l || "";
            continue;
          }
        }
        switch (s.type) {
          case "escape": {
            const l = s;
            i += n.text(l.text);
            break;
          }
          case "html": {
            const l = s;
            i += n.html(l.text);
            break;
          }
          case "link": {
            const l = s;
            i += n.link(l.href, l.title, this.parseInline(l.tokens, n));
            break;
          }
          case "image": {
            const l = s;
            i += n.image(l.href, l.title, l.text);
            break;
          }
          case "strong": {
            const l = s;
            i += n.strong(this.parseInline(l.tokens, n));
            break;
          }
          case "em": {
            const l = s;
            i += n.em(this.parseInline(l.tokens, n));
            break;
          }
          case "codespan": {
            const l = s;
            i += n.codespan(l.text);
            break;
          }
          case "br": {
            i += n.br();
            break;
          }
          case "del": {
            const l = s;
            i += n.del(this.parseInline(l.tokens, n));
            break;
          }
          case "text": {
            const l = s;
            i += n.text(l.text);
            break;
          }
          default: {
            const l = 'Token with "' + s.type + '" type was not found.';
            if (this.options.silent) return console.error(l), "";
            throw new Error(l);
          }
        }
      }
      return i;
    }
  }
  class bn {
    options;
    constructor(t) {
      this.options = t || Tt;
    }
    preprocess(t) {
      return t;
    }
    postprocess(t) {
      return t;
    }
    processAllTokens(t) {
      return t;
    }
  }
  De(
    bn,
    "passThroughHooks",
    new Set(["preprocess", "postprocess", "processAllTokens"]),
  );
  class ql {
    constructor(...t) {
      $r(this, En);
      $r(this, ki);
      De(this, "defaults", pr());
      De(this, "options", this.setOptions);
      De(this, "parse", xi(this, En, Er).call(this, it.lex, rt.parse));
      De(
        this,
        "parseInline",
        xi(this, En, Er).call(this, it.lexInline, rt.parseInline),
      );
      De(this, "Parser", rt);
      De(this, "Renderer", yi);
      De(this, "TextRenderer", kr);
      De(this, "Lexer", it);
      De(this, "Tokenizer", pi);
      De(this, "Hooks", bn);
      this.use(...t);
    }
    walkTokens(t, n) {
      var r, s;
      let i = [];
      for (const l of t)
        switch (((i = i.concat(n.call(this, l))), l.type)) {
          case "table": {
            const o = l;
            for (const a of o.header)
              i = i.concat(this.walkTokens(a.tokens, n));
            for (const a of o.rows)
              for (const c of a) i = i.concat(this.walkTokens(c.tokens, n));
            break;
          }
          case "list": {
            const o = l;
            i = i.concat(this.walkTokens(o.items, n));
            break;
          }
          default: {
            const o = l;
            (s =
              (r = this.defaults.extensions) == null
                ? void 0
                : r.childTokens) != null && s[o.type]
              ? this.defaults.extensions.childTokens[o.type].forEach((a) => {
                  const c = o[a].flat(1 / 0);
                  i = i.concat(this.walkTokens(c, n));
                })
              : o.tokens && (i = i.concat(this.walkTokens(o.tokens, n)));
          }
        }
      return i;
    }
    use(...t) {
      const n = this.defaults.extensions || { renderers: {}, childTokens: {} };
      return (
        t.forEach((i) => {
          const r = { ...i };
          if (
            ((r.async = this.defaults.async || r.async || !1),
            i.extensions &&
              (i.extensions.forEach((s) => {
                if (!s.name) throw new Error("extension name required");
                if ("renderer" in s) {
                  const l = n.renderers[s.name];
                  l
                    ? (n.renderers[s.name] = function (...o) {
                        let a = s.renderer.apply(this, o);
                        return a === !1 && (a = l.apply(this, o)), a;
                      })
                    : (n.renderers[s.name] = s.renderer);
                }
                if ("tokenizer" in s) {
                  if (!s.level || (s.level !== "block" && s.level !== "inline"))
                    throw new Error(
                      "extension level must be 'block' or 'inline'",
                    );
                  const l = n[s.level];
                  l ? l.unshift(s.tokenizer) : (n[s.level] = [s.tokenizer]),
                    s.start &&
                      (s.level === "block"
                        ? n.startBlock
                          ? n.startBlock.push(s.start)
                          : (n.startBlock = [s.start])
                        : s.level === "inline" &&
                          (n.startInline
                            ? n.startInline.push(s.start)
                            : (n.startInline = [s.start])));
                }
                "childTokens" in s &&
                  s.childTokens &&
                  (n.childTokens[s.name] = s.childTokens);
              }),
              (r.extensions = n)),
            i.renderer)
          ) {
            const s = this.defaults.renderer || new yi(this.defaults);
            for (const l in i.renderer) {
              if (!(l in s)) throw new Error(`renderer '${l}' does not exist`);
              if (l === "options") continue;
              const o = l,
                a = i.renderer[o],
                c = s[o];
              s[o] = (...f) => {
                let p = a.apply(s, f);
                return p === !1 && (p = c.apply(s, f)), p || "";
              };
            }
            r.renderer = s;
          }
          if (i.tokenizer) {
            const s = this.defaults.tokenizer || new pi(this.defaults);
            for (const l in i.tokenizer) {
              if (!(l in s)) throw new Error(`tokenizer '${l}' does not exist`);
              if (["options", "rules", "lexer"].includes(l)) continue;
              const o = l,
                a = i.tokenizer[o],
                c = s[o];
              s[o] = (...f) => {
                let p = a.apply(s, f);
                return p === !1 && (p = c.apply(s, f)), p;
              };
            }
            r.tokenizer = s;
          }
          if (i.hooks) {
            const s = this.defaults.hooks || new bn();
            for (const l in i.hooks) {
              if (!(l in s)) throw new Error(`hook '${l}' does not exist`);
              if (l === "options") continue;
              const o = l,
                a = i.hooks[o],
                c = s[o];
              bn.passThroughHooks.has(l)
                ? (s[o] = (f) => {
                    if (this.defaults.async)
                      return Promise.resolve(a.call(s, f)).then((h) =>
                        c.call(s, h),
                      );
                    const p = a.call(s, f);
                    return c.call(s, p);
                  })
                : (s[o] = (...f) => {
                    let p = a.apply(s, f);
                    return p === !1 && (p = c.apply(s, f)), p;
                  });
            }
            r.hooks = s;
          }
          if (i.walkTokens) {
            const s = this.defaults.walkTokens,
              l = i.walkTokens;
            r.walkTokens = function (o) {
              let a = [];
              return (
                a.push(l.call(this, o)), s && (a = a.concat(s.call(this, o))), a
              );
            };
          }
          this.defaults = { ...this.defaults, ...r };
        }),
        this
      );
    }
    setOptions(t) {
      return (this.defaults = { ...this.defaults, ...t }), this;
    }
    lexer(t, n) {
      return it.lex(t, n ?? this.defaults);
    }
    parser(t, n) {
      return rt.parse(t, n ?? this.defaults);
    }
  }
  (En = new WeakSet()),
    (Er = function (t, n) {
      return (i, r) => {
        const s = { ...r },
          l = { ...this.defaults, ...s };
        this.defaults.async === !0 &&
          s.async === !1 &&
          (l.silent ||
            console.warn(
              "marked(): The async option was set to true by an extension. The async: false option sent to parse will be ignored.",
            ),
          (l.async = !0));
        const o = xi(this, ki, yo).call(this, !!l.silent, !!l.async);
        if (typeof i > "u" || i === null)
          return o(new Error("marked(): input parameter is undefined or null"));
        if (typeof i != "string")
          return o(
            new Error(
              "marked(): input parameter is of type " +
                Object.prototype.toString.call(i) +
                ", string expected",
            ),
          );
        if ((l.hooks && (l.hooks.options = l), l.async))
          return Promise.resolve(l.hooks ? l.hooks.preprocess(i) : i)
            .then((a) => t(a, l))
            .then((a) => (l.hooks ? l.hooks.processAllTokens(a) : a))
            .then((a) =>
              l.walkTokens
                ? Promise.all(this.walkTokens(a, l.walkTokens)).then(() => a)
                : a,
            )
            .then((a) => n(a, l))
            .then((a) => (l.hooks ? l.hooks.postprocess(a) : a))
            .catch(o);
        try {
          l.hooks && (i = l.hooks.preprocess(i));
          let a = t(i, l);
          l.hooks && (a = l.hooks.processAllTokens(a)),
            l.walkTokens && this.walkTokens(a, l.walkTokens);
          let c = n(a, l);
          return l.hooks && (c = l.hooks.postprocess(c)), c;
        } catch (a) {
          return o(a);
        }
      };
    }),
    (ki = new WeakSet()),
    (yo = function (t, n) {
      return (i) => {
        if (
          ((i.message += `
Please report this to https://github.com/markedjs/marked.`),
          t)
        ) {
          const r =
            "<p>An error occurred:</p><pre>" +
            ze(i.message + "", !0) +
            "</pre>";
          return n ? Promise.resolve(r) : r;
        }
        if (n) return Promise.reject(i);
        throw i;
      };
    });
  const Rt = new ql();
  function pe(e, t) {
    return Rt.parse(e, t);
  }
  (pe.options = pe.setOptions =
    function (e) {
      return Rt.setOptions(e), (pe.defaults = Rt.defaults), Il(pe.defaults), pe;
    }),
    (pe.getDefaults = pr),
    (pe.defaults = Tt),
    (pe.use = function (...e) {
      return Rt.use(...e), (pe.defaults = Rt.defaults), Il(pe.defaults), pe;
    }),
    (pe.walkTokens = function (e, t) {
      return Rt.walkTokens(e, t);
    }),
    (pe.parseInline = Rt.parseInline),
    (pe.Parser = rt),
    (pe.parser = rt.parse),
    (pe.Renderer = yi),
    (pe.TextRenderer = kr),
    (pe.Lexer = it),
    (pe.lexer = it.lex),
    (pe.Tokenizer = pi),
    (pe.Hooks = bn),
    (pe.parse = pe);
  function af(e) {
    if (
      (typeof e == "function" && (e = { highlight: e }),
      !e || typeof e.highlight != "function")
    )
      throw new Error("Must provide highlight function");
    return (
      typeof e.langPrefix != "string" && (e.langPrefix = "language-"),
      {
        async: !!e.async,
        walkTokens(t) {
          if (t.type !== "code") return;
          const n = Kl(t.lang);
          if (e.async)
            return Promise.resolve(e.highlight(t.text, n, t.lang || "")).then(
              Zl(t),
            );
          const i = e.highlight(t.text, n, t.lang || "");
          if (i instanceof Promise)
            throw new Error(
              "markedHighlight is not set to async but the highlight function is async. Set the async option to true on markedHighlight to await the async highlight function.",
            );
          Zl(t)(i);
        },
        renderer: {
          code(t, n, i) {
            const r = Kl(n),
              s = r ? ` class="${e.langPrefix}${Yl(r)}"` : "";
            return (
              (t = t.replace(/\n$/, "")),
              `<pre><code${s}>${i ? t : Yl(t, !0)}
</code></pre>`
            );
          },
        },
      }
    );
  }
  function Kl(e) {
    return (e || "").match(/\S*/)[0];
  }
  function Zl(e) {
    return (t) => {
      typeof t == "string" && t !== e.text && ((e.escaped = !0), (e.text = t));
    };
  }
  const Gl = /[&<>"']/,
    cf = new RegExp(Gl.source, "g"),
    Ql = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
    uf = new RegExp(Ql.source, "g"),
    ff = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    },
    Jl = (e) => ff[e];
  function Yl(e, t) {
    if (t) {
      if (Gl.test(e)) return e.replace(cf, Jl);
    } else if (Ql.test(e)) return e.replace(uf, Jl);
    return e;
  }
  const df = /\$.*?\$/,
    hf = /^\$(.*?)\$/,
    pf = /^(?:\s{0,3})\$\$((?:[^\n]|\n[^\n])+?)\n{0,1}\$\$/,
    gf = (e) => [
      {
        name: "blockMath",
        level: "block",
        tokenizer(t) {
          const n = pf.exec(t);
          if (n !== null) return { type: "html", raw: n[0], text: e(!0, n[1]) };
        },
      },
      {
        name: "inlineMath",
        level: "inline",
        start(t) {
          const n = t.search(df);
          return n !== -1 ? n : t.length;
        },
        tokenizer(t) {
          const n = hf.exec(t);
          if (n !== null) return { type: "html", raw: n[0], text: e(!1, n[1]) };
        },
      },
    ],
    Xl = (e = "", t = {}) =>
      e.replace(/:(.+?):/g, (n, i) =>
        t[i] ? `<img class="wl-emoji" src="${t[i]}" alt="${i}">` : n,
      ),
    mf = (e, { emojiMap: t, highlighter: n, texRenderer: i }) => {
      const r = new ql();
      if ((r.setOptions({ breaks: !0 }), n && r.use(af({ highlight: n })), i)) {
        const s = gf(i);
        r.use({ extensions: s });
      }
      return r.parse(Xl(e, t));
    },
    xr = (e) => e.dataset.path || null,
    vf = (e) => e.match(/[\w\d\s,.\u00C0-\u024F\u0400-\u04FF]+/giu),
    yf = (e) => e.match(/[\u4E00-\u9FD5]/gu),
    wf = (e) => {
      var t, n;
      return (
        (((t = vf(e)) == null
          ? void 0
          : t.reduce(
              (i, r) =>
                i +
                (["", ",", "."].includes(r.trim())
                  ? 0
                  : r.trim().split(/\s+/u).length),
              0,
            )) || 0) + (((n = yf(e)) == null ? void 0 : n.length) || 0)
      );
    },
    bf = async () => {
      if (!navigator) return "";
      const { userAgentData: e } = navigator;
      let t = navigator.userAgent;
      if (!e || e.platform !== "Windows") return t;
      const { platformVersion: n } = await e.getHighEntropyValues([
        "platformVersion",
      ]);
      return (
        n &&
          parseInt(n.split(".")[0]) >= 13 &&
          (t = t.replace("Windows NT 10.0", "Windows NT 11.0")),
        t
      );
    },
    eo = ({
      serverURL: e,
      path: t = window.location.pathname,
      selector: n = ".waline-comment-count",
      lang: i = navigator.language,
    }) => {
      const r = new AbortController(),
        s = document.querySelectorAll(n);
      return (
        s.length &&
          Ar({
            serverURL: Ln(e),
            paths: Array.from(s).map((l) => Kr(xr(l) || t)),
            lang: i,
            signal: r.signal,
          })
            .then((l) => {
              s.forEach((o, a) => {
                o.innerText = l[a].toString();
              });
            })
            .catch(Sl),
        r.abort.bind(r)
      );
    },
    to = ({ size: e }) =>
      te(
        "svg",
        {
          class: "wl-close-icon",
          viewBox: "0 0 1024 1024",
          width: e,
          height: e,
        },
        [
          te("path", {
            d: "M697.173 85.333h-369.92c-144.64 0-241.92 101.547-241.92 252.587v348.587c0 150.613 97.28 252.16 241.92 252.16h369.92c144.64 0 241.494-101.547 241.494-252.16V337.92c0-151.04-96.854-252.587-241.494-252.587z",
            fill: "currentColor",
          }),
          te("path", {
            d: "m640.683 587.52-75.947-75.861 75.904-75.862a37.29 37.29 0 0 0 0-52.778 37.205 37.205 0 0 0-52.779 0l-75.946 75.818-75.862-75.946a37.419 37.419 0 0 0-52.821 0 37.419 37.419 0 0 0 0 52.821l75.947 75.947-75.776 75.733a37.29 37.29 0 1 0 52.778 52.821l75.776-75.776 75.947 75.947a37.376 37.376 0 0 0 52.779-52.821z",
            fill: "#888",
          }),
        ],
      ),
    kf = () =>
      te(
        "svg",
        { viewBox: "0 0 1024 1024", width: "24", height: "24" },
        te("path", {
          d: "m341.013 394.667 27.755 393.45h271.83l27.733-393.45h64.106l-28.01 397.952a64 64 0 0 1-63.83 59.498H368.768a64 64 0 0 1-63.83-59.52l-28.053-397.93h64.128zm139.307 19.818v298.667h-64V414.485h64zm117.013 0v298.667h-64V414.485h64zM181.333 288h640v64h-640v-64zm453.483-106.667v64h-256v-64h256z",
          fill: "red",
        }),
      ),
    xf = () =>
      te(
        "svg",
        { viewBox: "0 0 1024 1024", width: "24", height: "24" },
        te("path", {
          d: "M563.2 463.3 677 540c1.7 1.2 3.7 1.8 5.8 1.8.7 0 1.4-.1 2-.2 2.7-.5 5.1-2.1 6.6-4.4l25.3-37.8c1.5-2.3 2.1-5.1 1.6-7.8s-2.1-5.1-4.4-6.6l-73.6-49.1 73.6-49.1c2.3-1.5 3.9-3.9 4.4-6.6.5-2.7 0-5.5-1.6-7.8l-25.3-37.8a10.1 10.1 0 0 0-6.6-4.4c-.7-.1-1.3-.2-2-.2-2.1 0-4.1.6-5.8 1.8l-113.8 76.6c-9.2 6.2-14.7 16.4-14.7 27.5.1 11 5.5 21.3 14.7 27.4zM387 348.8h-45.5c-5.7 0-10.4 4.7-10.4 10.4v153.3c0 5.7 4.7 10.4 10.4 10.4H387c5.7 0 10.4-4.7 10.4-10.4V359.2c0-5.7-4.7-10.4-10.4-10.4zm333.8 241.3-41-20a10.3 10.3 0 0 0-8.1-.5c-2.6.9-4.8 2.9-5.9 5.4-30.1 64.9-93.1 109.1-164.4 115.2-5.7.5-9.9 5.5-9.5 11.2l3.9 45.5c.5 5.3 5 9.5 10.3 9.5h.9c94.8-8 178.5-66.5 218.6-152.7 2.4-5 .3-11.2-4.8-13.6zm186-186.1c-11.9-42-30.5-81.4-55.2-117.1-24.1-34.9-53.5-65.6-87.5-91.2-33.9-25.6-71.5-45.5-111.6-59.2-41.2-14-84.1-21.1-127.8-21.1h-1.2c-75.4 0-148.8 21.4-212.5 61.7-63.7 40.3-114.3 97.6-146.5 165.8-32.2 68.1-44.3 143.6-35.1 218.4 9.3 74.8 39.4 145 87.3 203.3.1.2.3.3.4.5l36.2 38.4c1.1 1.2 2.5 2.1 3.9 2.6 73.3 66.7 168.2 103.5 267.5 103.5 73.3 0 145.2-20.3 207.7-58.7 37.3-22.9 70.3-51.5 98.1-85 27.1-32.7 48.7-69.5 64.2-109.1 15.5-39.7 24.4-81.3 26.6-123.8 2.4-43.6-2.5-87-14.5-129zm-60.5 181.1c-8.3 37-22.8 72-43 104-19.7 31.1-44.3 58.6-73.1 81.7-28.8 23.1-61 41-95.7 53.4-35.6 12.7-72.9 19.1-110.9 19.1-82.6 0-161.7-30.6-222.8-86.2l-34.1-35.8c-23.9-29.3-42.4-62.2-55.1-97.7-12.4-34.7-18.8-71-19.2-107.9-.4-36.9 5.4-73.3 17.1-108.2 12-35.8 30-69.2 53.4-99.1 31.7-40.4 71.1-72 117.2-94.1 44.5-21.3 94-32.6 143.4-32.6 49.3 0 97 10.8 141.8 32 34.3 16.3 65.3 38.1 92 64.8 26.1 26 47.5 56 63.6 89.2 16.2 33.2 26.6 68.5 31 105.1 4.6 37.5 2.7 75.3-5.6 112.3z",
          fill: "currentColor",
        }),
      ),
    _f = () =>
      te("svg", { viewBox: "0 0 1024 1024", width: "24", height: "24" }, [
        te("path", {
          d: "M784 112H240c-88 0-160 72-160 160v480c0 88 72 160 160 160h544c88 0 160-72 160-160V272c0-88-72-160-160-160zm96 640c0 52.8-43.2 96-96 96H240c-52.8 0-96-43.2-96-96V272c0-52.8 43.2-96 96-96h544c52.8 0 96 43.2 96 96v480z",
          fill: "currentColor",
        }),
        te("path", {
          d: "M352 480c52.8 0 96-43.2 96-96s-43.2-96-96-96-96 43.2-96 96 43.2 96 96 96zm0-128c17.6 0 32 14.4 32 32s-14.4 32-32 32-32-14.4-32-32 14.4-32 32-32zm462.4 379.2-3.2-3.2-177.6-177.6c-25.6-25.6-65.6-25.6-91.2 0l-80 80-36.8-36.8c-25.6-25.6-65.6-25.6-91.2 0L200 728c-4.8 6.4-8 14.4-8 24 0 17.6 14.4 32 32 32 9.6 0 16-3.2 22.4-9.6L380.8 640l134.4 134.4c6.4 6.4 14.4 9.6 24 9.6 17.6 0 32-14.4 32-32 0-9.6-4.8-17.6-9.6-24l-52.8-52.8 80-80L769.6 776c6.4 4.8 12.8 8 20.8 8 17.6 0 32-14.4 32-32 0-8-3.2-16-8-20.8z",
          fill: "currentColor",
        }),
      ]),
    Cf = ({ active: e = !1 }) =>
      te("svg", { viewBox: "0 0 1024 1024", width: "24", height: "24" }, [
        te("path", {
          d: `M850.654 323.804c-11.042-25.625-26.862-48.532-46.885-68.225-20.022-19.61-43.258-34.936-69.213-45.73-26.78-11.124-55.124-16.727-84.375-16.727-40.622 0-80.256 11.123-114.698 32.135A214.79 214.79 0 0 0 512 241.819a214.79 214.79 0 0 0-23.483-16.562c-34.442-21.012-74.076-32.135-114.698-32.135-29.25 0-57.595 5.603-84.375 16.727-25.872 10.711-49.19 26.12-69.213 45.73-20.105 19.693-35.843 42.6-46.885 68.225-11.453 26.615-17.303 54.877-17.303 83.963 0 27.439 5.603 56.03 16.727 85.117 9.31 24.307 22.659 49.52 39.715 74.981 27.027 40.293 64.188 82.316 110.33 124.915 76.465 70.615 152.189 119.394 155.402 121.371l19.528 12.525c8.652 5.52 19.776 5.52 28.427 0l19.529-12.525c3.213-2.06 78.854-50.756 155.401-121.371 46.143-42.6 83.304-84.622 110.33-124.915 17.057-25.46 30.487-50.674 39.716-74.981 11.124-29.087 16.727-57.678 16.727-85.117.082-29.086-5.768-57.348-17.221-83.963z${e ? "" : "M512 761.5S218.665 573.55 218.665 407.767c0-83.963 69.461-152.023 155.154-152.023 60.233 0 112.473 33.618 138.181 82.727 25.708-49.109 77.948-82.727 138.18-82.727 85.694 0 155.155 68.06 155.155 152.023C805.335 573.551 512 761.5 512 761.5z"}`,
          fill: e ? "red" : "currentColor",
        }),
      ]),
    $f = () =>
      te("svg", { viewBox: "0 0 1024 1024", width: "24", height: "24" }, [
        te("path", {
          d: "M710.816 654.301c70.323-96.639 61.084-230.578-23.705-314.843-46.098-46.098-107.183-71.109-172.28-71.109-65.008 0-126.092 25.444-172.28 71.109-45.227 46.098-70.756 107.183-70.756 172.106 0 64.923 25.444 126.007 71.194 172.106 46.099 46.098 107.184 71.109 172.28 71.109 51.414 0 100.648-16.212 142.824-47.404l126.53 126.006c7.058 7.06 16.297 10.979 26.406 10.979 10.105 0 19.343-3.919 26.402-10.979 14.467-14.467 14.467-38.172 0-52.723L710.816 654.301zm-315.107-23.265c-65.88-65.88-65.88-172.54 0-238.42 32.069-32.07 74.245-49.149 119.471-49.149 45.227 0 87.407 17.603 119.472 49.149 65.88 65.879 65.88 172.539 0 238.42-63.612 63.178-175.242 63.178-238.943 0zm0 0",
          fill: "currentColor",
        }),
        te("path", {
          d: "M703.319 121.603H321.03c-109.8 0-199.469 89.146-199.469 199.38v382.034c0 109.796 89.236 199.38 199.469 199.38h207.397c20.653 0 37.384-16.645 37.384-37.299 0-20.649-16.731-37.296-37.384-37.296H321.03c-68.582 0-124.352-55.77-124.352-124.267V321.421c0-68.496 55.77-124.267 124.352-124.267h382.289c68.582 0 124.352 55.771 124.352 124.267V524.72c0 20.654 16.736 37.299 37.385 37.299 20.654 0 37.384-16.645 37.384-37.299V320.549c-.085-109.8-89.321-198.946-199.121-198.946zm0 0",
          fill: "currentColor",
        }),
      ]),
    Ef = () =>
      te(
        "svg",
        { width: "16", height: "16", ariaHidden: "true" },
        te("path", {
          d: "M14.85 3H1.15C.52 3 0 3.52 0 4.15v7.69C0 12.48.52 13 1.15 13h13.69c.64 0 1.15-.52 1.15-1.15v-7.7C16 3.52 15.48 3 14.85 3zM9 11H7V8L5.5 9.92 4 8v3H2V5h2l1.5 2L7 5h2v6zm2.99.5L9.5 8H11V5h2v3h1.5l-2.51 3.5z",
          fill: "currentColor",
        }),
      ),
    Tf = () =>
      te(
        "svg",
        { viewBox: "0 0 1024 1024", width: "24", height: "24" },
        te("path", {
          d: "M810.667 213.333a64 64 0 0 1 64 64V704a64 64 0 0 1-64 64H478.336l-146.645 96.107a21.333 21.333 0 0 1-33.024-17.856V768h-85.334a64 64 0 0 1-64-64V277.333a64 64 0 0 1 64-64h597.334zm0 64H213.333V704h149.334v63.296L459.243 704h351.424V277.333zm-271.36 213.334v64h-176.64v-64h176.64zm122.026-128v64H362.667v-64h298.666z",
          fill: "currentColor",
        }),
      ),
    Rf = () =>
      te(
        "svg",
        { viewBox: "0 0 1024 1024", width: "24", height: "24" },
        te("path", {
          d: "M813.039 318.772L480.53 651.278H360.718V531.463L693.227 198.961C697.904 194.284 704.027 192 710.157 192C716.302 192 722.436 194.284 727.114 198.961L813.039 284.88C817.72 289.561 820 295.684 820 301.825C820 307.95 817.72 314.093 813.039 318.772ZM710.172 261.888L420.624 551.431V591.376H460.561L750.109 301.825L710.172 261.888ZM490.517 291.845H240.906V771.09H720.156V521.479C720.156 504.947 733.559 491.529 750.109 491.529C766.653 491.529 780.063 504.947 780.063 521.479V791.059C780.063 813.118 762.18 831 740.125 831H220.937C198.882 831 181 813.118 181 791.059V271.872C181 249.817 198.882 231.935 220.937 231.935H490.517C507.06 231.935 520.47 245.352 520.47 261.888C520.47 278.424 507.06 291.845 490.517 291.845Z",
          fill: "currentColor",
        }),
      ),
    Sf = () =>
      te(
        "svg",
        {
          class: "verified-icon",
          viewBox: "0 0 1024 1024",
          width: "14",
          height: "14",
        },
        te("path", {
          d: "m894.4 461.56-54.4-63.2c-10.4-12-18.8-34.4-18.8-50.4v-68c0-42.4-34.8-77.2-77.2-77.2h-68c-15.6 0-38.4-8.4-50.4-18.8l-63.2-54.4c-27.6-23.6-72.8-23.6-100.8 0l-62.8 54.8c-12 10-34.8 18.4-50.4 18.4h-69.2c-42.4 0-77.2 34.8-77.2 77.2v68.4c0 15.6-8.4 38-18.4 50l-54 63.6c-23.2 27.6-23.2 72.4 0 100l54 63.6c10 12 18.4 34.4 18.4 50v68.4c0 42.4 34.8 77.2 77.2 77.2h69.2c15.6 0 38.4 8.4 50.4 18.8l63.2 54.4c27.6 23.6 72.8 23.6 100.8 0l63.2-54.4c12-10.4 34.4-18.8 50.4-18.8h68c42.4 0 77.2-34.8 77.2-77.2v-68c0-15.6 8.4-38.4 18.8-50.4l54.4-63.2c23.2-27.6 23.2-73.2-.4-100.8zm-216-25.2-193.2 193.2a30 30 0 0 1-42.4 0l-96.8-96.8a30.16 30.16 0 0 1 0-42.4c11.6-11.6 30.8-11.6 42.4 0l75.6 75.6 172-172c11.6-11.6 30.8-11.6 42.4 0 11.6 11.6 11.6 30.8 0 42.4z",
          fill: "#27ae60",
        }),
      ),
    kn = ({ size: e = 100 }) =>
      te(
        "svg",
        {
          width: e,
          height: e,
          viewBox: "0 0 100 100",
          preserveAspectRatio: "xMidYMid",
        },
        te(
          "circle",
          {
            cx: 50,
            cy: 50,
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "4",
            r: "40",
            "stroke-dasharray": "85 30",
          },
          te("animateTransform", {
            attributeName: "transform",
            type: "rotate",
            repeatCount: "indefinite",
            dur: "1s",
            values: "0 50 50;360 50 50",
            keyTimes: "0;1",
          }),
        ),
      ),
    Af = () =>
      te(
        "svg",
        { width: 24, height: 24, fill: "currentcolor", viewBox: "0 0 24 24" },
        [
          te("path", {
            style: "transform: translateY(0.5px)",
            d: "M18.968 10.5H15.968V11.484H17.984V12.984H15.968V15H14.468V9H18.968V10.5V10.5ZM8.984 9C9.26533 9 9.49967 9.09367 9.687 9.281C9.87433 9.46833 9.968 9.70267 9.968 9.984V10.5H6.499V13.5H8.468V12H9.968V14.016C9.968 14.2973 9.87433 14.5317 9.687 14.719C9.49967 14.9063 9.26533 15 8.984 15H5.984C5.70267 15 5.46833 14.9063 5.281 14.719C5.09367 14.5317 5 14.2973 5 14.016V9.985C5 9.70367 5.09367 9.46933 5.281 9.282C5.46833 9.09467 5.70267 9.001 5.984 9.001H8.984V9ZM11.468 9H12.968V15H11.468V9V9Z",
          }),
          te("path", {
            d: "M18.5 3H5.75C3.6875 3 2 4.6875 2 6.75V18C2 20.0625 3.6875 21.75 5.75 21.75H18.5C20.5625 21.75 22.25 20.0625 22.25 18V6.75C22.25 4.6875 20.5625 3 18.5 3ZM20.75 18C20.75 19.2375 19.7375 20.25 18.5 20.25H5.75C4.5125 20.25 3.5 19.2375 3.5 18V6.75C3.5 5.5125 4.5125 4.5 5.75 4.5H18.5C19.7375 4.5 20.75 5.5125 20.75 6.75V18Z",
          }),
        ],
      ),
    If = () => Vt("WALINE_USER_META", { nick: "", mail: "", link: "" }),
    Lf = () => Vt("WALINE_COMMENT_BOX_EDITOR", ""),
    Mf = "WALINE_LIKE";
  let no = null;
  const io = () => no || (no = Vt(Mf, [])),
    Of = "WALINE_REACTION";
  let ro = null;
  const zf = () => ro ?? (ro = Vt(Of, {}));
  var wi =
      typeof globalThis < "u"
        ? globalThis
        : typeof window < "u"
          ? window
          : typeof global < "u"
            ? global
            : typeof self < "u"
              ? self
              : {},
    so = {},
    Bt = {},
    xn = {},
    jf =
      (wi && wi.__awaiter) ||
      function (e, t, n, i) {
        function r(s) {
          return s instanceof n
            ? s
            : new n(function (l) {
                l(s);
              });
        }
        return new (n || (n = Promise))(function (s, l) {
          function o(f) {
            try {
              c(i.next(f));
            } catch (p) {
              l(p);
            }
          }
          function a(f) {
            try {
              c(i.throw(f));
            } catch (p) {
              l(p);
            }
          }
          function c(f) {
            f.done ? s(f.value) : r(f.value).then(o, a);
          }
          c((i = i.apply(e, t || [])).next());
        });
      },
    Pf =
      (wi && wi.__generator) ||
      function (e, t) {
        var n = {
            label: 0,
            sent: function () {
              if (s[0] & 1) throw s[1];
              return s[1];
            },
            trys: [],
            ops: [],
          },
          i,
          r,
          s,
          l;
        return (
          (l = { next: o(0), throw: o(1), return: o(2) }),
          typeof Symbol == "function" &&
            (l[Symbol.iterator] = function () {
              return this;
            }),
          l
        );
        function o(c) {
          return function (f) {
            return a([c, f]);
          };
        }
        function a(c) {
          if (i) throw new TypeError("Generator is already executing.");
          for (; n; )
            try {
              if (
                ((i = 1),
                r &&
                  (s =
                    c[0] & 2
                      ? r.return
                      : c[0]
                        ? r.throw || ((s = r.return) && s.call(r), 0)
                        : r.next) &&
                  !(s = s.call(r, c[1])).done)
              )
                return s;
              switch (((r = 0), s && (c = [c[0] & 2, s.value]), c[0])) {
                case 0:
                case 1:
                  s = c;
                  break;
                case 4:
                  return n.label++, { value: c[1], done: !1 };
                case 5:
                  n.label++, (r = c[1]), (c = [0]);
                  continue;
                case 7:
                  (c = n.ops.pop()), n.trys.pop();
                  continue;
                default:
                  if (
                    ((s = n.trys),
                    !(s = s.length > 0 && s[s.length - 1]) &&
                      (c[0] === 6 || c[0] === 2))
                  ) {
                    n = 0;
                    continue;
                  }
                  if (c[0] === 3 && (!s || (c[1] > s[0] && c[1] < s[3]))) {
                    n.label = c[1];
                    break;
                  }
                  if (c[0] === 6 && n.label < s[1]) {
                    (n.label = s[1]), (s = c);
                    break;
                  }
                  if (s && n.label < s[2]) {
                    (n.label = s[2]), n.ops.push(c);
                    break;
                  }
                  s[2] && n.ops.pop(), n.trys.pop();
                  continue;
              }
              c = t.call(e, n);
            } catch (f) {
              (c = [6, f]), (r = 0);
            } finally {
              i = s = 0;
            }
          if (c[0] & 5) throw c[1];
          return { value: c[0] ? c[1] : void 0, done: !0 };
        }
      };
  Object.defineProperty(xn, "__esModule", { value: !0 }),
    (xn.ReCaptchaInstance = void 0);
  var Uf = (function () {
    function e(t, n, i) {
      (this.siteKey = t),
        (this.recaptchaID = n),
        (this.recaptcha = i),
        (this.styleContainer = null);
    }
    return (
      (e.prototype.execute = function (t) {
        return jf(this, void 0, void 0, function () {
          return Pf(this, function (n) {
            return [
              2,
              this.recaptcha.enterprise
                ? this.recaptcha.enterprise.execute(this.recaptchaID, {
                    action: t,
                  })
                : this.recaptcha.execute(this.recaptchaID, { action: t }),
            ];
          });
        });
      }),
      (e.prototype.getSiteKey = function () {
        return this.siteKey;
      }),
      (e.prototype.hideBadge = function () {
        this.styleContainer === null &&
          ((this.styleContainer = document.createElement("style")),
          (this.styleContainer.innerHTML =
            ".grecaptcha-badge{visibility:hidden !important;}"),
          document.head.appendChild(this.styleContainer));
      }),
      (e.prototype.showBadge = function () {
        this.styleContainer !== null &&
          (document.head.removeChild(this.styleContainer),
          (this.styleContainer = null));
      }),
      e
    );
  })();
  (xn.ReCaptchaInstance = Uf),
    Object.defineProperty(Bt, "__esModule", { value: !0 }),
    (Bt.getInstance = Bt.load = void 0);
  var Ff = xn,
    mt;
  (function (e) {
    (e[(e.NOT_LOADED = 0)] = "NOT_LOADED"),
      (e[(e.LOADING = 1)] = "LOADING"),
      (e[(e.LOADED = 2)] = "LOADED");
  })(mt || (mt = {}));
  var lo = (function () {
    function e() {}
    return (
      (e.load = function (t, n) {
        if ((n === void 0 && (n = {}), typeof document > "u"))
          return Promise.reject(
            new Error("This is a library for the browser!"),
          );
        if (e.getLoadingState() === mt.LOADED)
          return e.instance.getSiteKey() === t
            ? Promise.resolve(e.instance)
            : Promise.reject(
                new Error("reCAPTCHA already loaded with different site key!"),
              );
        if (e.getLoadingState() === mt.LOADING)
          return t !== e.instanceSiteKey
            ? Promise.reject(
                new Error("reCAPTCHA already loaded with different site key!"),
              )
            : new Promise(function (r, s) {
                e.successfulLoadingConsumers.push(function (l) {
                  return r(l);
                }),
                  e.errorLoadingRunnable.push(function (l) {
                    return s(l);
                  });
              });
        (e.instanceSiteKey = t), e.setLoadingState(mt.LOADING);
        var i = new e();
        return new Promise(function (r, s) {
          i.loadScript(
            t,
            n.useRecaptchaNet || !1,
            n.useEnterprise || !1,
            n.renderParameters ? n.renderParameters : {},
            n.customUrl,
          )
            .then(function () {
              e.setLoadingState(mt.LOADED);
              var l = i.doExplicitRender(
                  grecaptcha,
                  t,
                  n.explicitRenderParameters ? n.explicitRenderParameters : {},
                  n.useEnterprise || !1,
                ),
                o = new Ff.ReCaptchaInstance(t, l, grecaptcha);
              e.successfulLoadingConsumers.forEach(function (a) {
                return a(o);
              }),
                (e.successfulLoadingConsumers = []),
                n.autoHideBadge && o.hideBadge(),
                (e.instance = o),
                r(o);
            })
            .catch(function (l) {
              e.errorLoadingRunnable.forEach(function (o) {
                return o(l);
              }),
                (e.errorLoadingRunnable = []),
                s(l);
            });
        });
      }),
      (e.getInstance = function () {
        return e.instance;
      }),
      (e.setLoadingState = function (t) {
        e.loadingState = t;
      }),
      (e.getLoadingState = function () {
        return e.loadingState === null ? mt.NOT_LOADED : e.loadingState;
      }),
      (e.prototype.loadScript = function (t, n, i, r, s) {
        var l = this;
        n === void 0 && (n = !1),
          i === void 0 && (i = !1),
          r === void 0 && (r = {}),
          s === void 0 && (s = "");
        var o = document.createElement("script");
        o.setAttribute("recaptcha-v3-script", "");
        var a = "https://www.google.com/recaptcha/api.js";
        n &&
          (i
            ? (a = "https://recaptcha.net/recaptcha/enterprise.js")
            : (a = "https://recaptcha.net/recaptcha/api.js")),
          i && (a = "https://www.google.com/recaptcha/enterprise.js"),
          s && (a = s),
          r.render && (r.render = void 0);
        var c = this.buildQueryString(r);
        return (
          (o.src = a + "?render=explicit" + c),
          new Promise(function (f, p) {
            o.addEventListener(
              "load",
              l.waitForScriptToLoad(function () {
                f(o);
              }, i),
              !1,
            ),
              (o.onerror = function (h) {
                e.setLoadingState(mt.NOT_LOADED), p(h);
              }),
              document.head.appendChild(o);
          })
        );
      }),
      (e.prototype.buildQueryString = function (t) {
        var n = Object.keys(t);
        return n.length < 1
          ? ""
          : "&" +
              Object.keys(t)
                .filter(function (i) {
                  return !!t[i];
                })
                .map(function (i) {
                  return i + "=" + t[i];
                })
                .join("&");
      }),
      (e.prototype.waitForScriptToLoad = function (t, n) {
        var i = this;
        return function () {
          window.grecaptcha === void 0
            ? setTimeout(function () {
                i.waitForScriptToLoad(t, n);
              }, e.SCRIPT_LOAD_DELAY)
            : n
              ? window.grecaptcha.enterprise.ready(function () {
                  t();
                })
              : window.grecaptcha.ready(function () {
                  t();
                });
        };
      }),
      (e.prototype.doExplicitRender = function (t, n, i, r) {
        var s = {
          sitekey: n,
          badge: i.badge,
          size: i.size,
          tabindex: i.tabindex,
        };
        return i.container
          ? r
            ? t.enterprise.render(i.container, s)
            : t.render(i.container, s)
          : r
            ? t.enterprise.render(s)
            : t.render(s);
      }),
      (e.loadingState = null),
      (e.instance = null),
      (e.instanceSiteKey = null),
      (e.successfulLoadingConsumers = []),
      (e.errorLoadingRunnable = []),
      (e.SCRIPT_LOAD_DELAY = 25),
      e
    );
  })();
  (Bt.load = lo.load),
    (Bt.getInstance = lo.getInstance),
    (function (e) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.ReCaptchaInstance = e.getInstance = e.load = void 0);
      var t = Bt;
      Object.defineProperty(e, "load", {
        enumerable: !0,
        get: function () {
          return t.load;
        },
      }),
        Object.defineProperty(e, "getInstance", {
          enumerable: !0,
          get: function () {
            return t.getInstance;
          },
        });
      var n = xn;
      Object.defineProperty(e, "ReCaptchaInstance", {
        enumerable: !0,
        get: function () {
          return n.ReCaptchaInstance;
        },
      });
    })(so);
  const oo = {},
    Nf = (e) => {
      const t =
        oo[e] ??
        (oo[e] = so.load(e, { useRecaptchaNet: !0, autoHideBadge: !0 }));
      return { execute: (n) => t.then((i) => i.execute(n)) };
    },
    Hf = (e) => ({
      execute: async (t) => {
        const { load: n } = ku(
          "https://challenges.cloudflare.com/turnstile/v0/api.js",
          void 0,
          { async: !1 },
        );
        await n();
        const i = window == null ? void 0 : window.turnstile;
        return new Promise((r) => {
          i == null ||
            i.ready(() => {
              i == null ||
                i.render(".wl-captcha-container", {
                  sitekey: e,
                  action: t,
                  size: "compact",
                  callback: r,
                });
            });
        });
      },
    }),
    Df = "WALINE_USER";
  let ao = null;
  const bi = () => ao ?? (ao = Vt(Df, {})),
    Vf = { key: 0, class: "wl-reaction" },
    Bf = ["textContent"],
    Wf = { class: "wl-reaction-list" },
    qf = ["onClick"],
    Kf = { class: "wl-reaction-img" },
    Zf = ["src", "alt"],
    Gf = ["textContent"],
    Qf = ["textContent"];
  var Jf = sn({
      __name: "ArticleReaction",
      setup(e, { expose: t }) {
        t();
        const n = zf(),
          i = ei("config"),
          r = q(-1),
          s = q([]),
          l = ke(() => i.value.locale),
          o = ke(() => i.value.reaction.length > 0),
          a = ke(() => {
            const { reaction: h, path: m } = i.value;
            return h.map((S, x) => ({
              icon: S,
              desc: l.value[`reaction${x}`],
              active: n.value[m] === x,
            }));
          });
        let c;
        const f = async () => {
            if (!o.value) return;
            const { serverURL: h, lang: m, path: S, reaction: x } = i.value,
              C = new AbortController();
            c = C.abort.bind(C);
            const w = await _i({
              serverURL: h,
              lang: m,
              paths: [S],
              type: x.map((T, P) => `reaction${P}`),
              signal: C.signal,
            });
            s.value = x.map((T, P) => w[0][`reaction${P}`]);
          },
          p = async (h) => {
            if (r.value === -1) {
              const { serverURL: m, lang: S, path: x } = i.value,
                C = n.value[x];
              (r.value = h),
                C !== void 0 &&
                  (await An({
                    serverURL: m,
                    lang: S,
                    path: x,
                    type: `reaction${C}`,
                    action: "desc",
                  }),
                  (s.value[C] = Math.max(s.value[C] - 1, 0))),
                C !== h &&
                  (await An({
                    serverURL: m,
                    lang: S,
                    path: x,
                    type: `reaction${h}`,
                  }),
                  (s.value[h] = (s.value[h] || 0) + 1)),
                C === h ? delete n.value[x] : (n.value[x] = h),
                (r.value = -1);
            }
          };
        return (
          ln(() => {
            Pe(
              () => [i.value.serverURL, i.value.path],
              () => {
                f();
              },
              { immediate: !0 },
            );
          }),
          Yn(() => (c == null ? void 0 : c())),
          (h, m) =>
            a.value.length
              ? (I(),
                O("div", Vf, [
                  j(
                    "div",
                    {
                      class: "wl-reaction-title",
                      textContent: ie(l.value.reactionTitle),
                    },
                    null,
                    8,
                    Bf,
                  ),
                  j("ul", Wf, [
                    (I(!0),
                    O(
                      ae,
                      null,
                      Ue(
                        a.value,
                        ({ active: S, icon: x, desc: C }, w) => (
                          I(),
                          O(
                            "li",
                            {
                              key: w,
                              class: ve(["wl-reaction-item", { active: S }]),
                              onClick: (T) => p(w),
                            },
                            [
                              j("div", Kf, [
                                j("img", { src: x, alt: C }, null, 8, Zf),
                                r.value === w
                                  ? (I(),
                                    Xe(G(kn), {
                                      key: 0,
                                      class: "wl-reaction-loading",
                                    }))
                                  : (I(),
                                    O(
                                      "div",
                                      {
                                        key: 1,
                                        class: "wl-reaction-votes",
                                        textContent: ie(s.value[w] || 0),
                                      },
                                      null,
                                      8,
                                      Gf,
                                    )),
                              ]),
                              j(
                                "div",
                                {
                                  class: "wl-reaction-text",
                                  textContent: ie(C),
                                },
                                null,
                                8,
                                Qf,
                              ),
                            ],
                            10,
                            qf,
                          )
                        ),
                      ),
                      128,
                    )),
                  ]),
                ]))
              : X("v-if", !0)
        );
      },
    }),
    _n = (e, t) => {
      const n = e.__vccOpts || e;
      for (const [i, r] of t) n[i] = r;
      return n;
    },
    Yf = _n(Jf, [["__file", "ArticleReaction.vue"]]),
    Cn = new Map();
  function Xf(e) {
    var t = Cn.get(e);
    t && t.destroy();
  }
  function ed(e) {
    var t = Cn.get(e);
    t && t.update();
  }
  var $n = null;
  typeof window > "u"
    ? ((($n = function (e) {
        return e;
      }).destroy = function (e) {
        return e;
      }),
      ($n.update = function (e) {
        return e;
      }))
    : ((($n = function (e, t) {
        return (
          e &&
            Array.prototype.forEach.call(e.length ? e : [e], function (n) {
              return (function (i) {
                if (
                  i &&
                  i.nodeName &&
                  i.nodeName === "TEXTAREA" &&
                  !Cn.has(i)
                ) {
                  var r,
                    s = null,
                    l = window.getComputedStyle(i),
                    o =
                      ((r = i.value),
                      function () {
                        c({
                          testForHeightReduction:
                            r === "" || !i.value.startsWith(r),
                          restoreTextAlign: null,
                        }),
                          (r = i.value);
                      }),
                    a = function (p) {
                      i.removeEventListener("autosize:destroy", a),
                        i.removeEventListener("autosize:update", f),
                        i.removeEventListener("input", o),
                        window.removeEventListener("resize", f),
                        Object.keys(p).forEach(function (h) {
                          return (i.style[h] = p[h]);
                        }),
                        Cn.delete(i);
                    }.bind(i, {
                      height: i.style.height,
                      resize: i.style.resize,
                      textAlign: i.style.textAlign,
                      overflowY: i.style.overflowY,
                      overflowX: i.style.overflowX,
                      wordWrap: i.style.wordWrap,
                    });
                  i.addEventListener("autosize:destroy", a),
                    i.addEventListener("autosize:update", f),
                    i.addEventListener("input", o),
                    window.addEventListener("resize", f),
                    (i.style.overflowX = "hidden"),
                    (i.style.wordWrap = "break-word"),
                    Cn.set(i, { destroy: a, update: f }),
                    f();
                }
                function c(p) {
                  var h,
                    m,
                    S = p.restoreTextAlign,
                    x = S === void 0 ? null : S,
                    C = p.testForHeightReduction,
                    w = C === void 0 || C,
                    T = l.overflowY;
                  if (
                    i.scrollHeight !== 0 &&
                    (l.resize === "vertical"
                      ? (i.style.resize = "none")
                      : l.resize === "both" && (i.style.resize = "horizontal"),
                    w &&
                      ((h = (function (N) {
                        for (
                          var U = [];
                          N && N.parentNode && N.parentNode instanceof Element;

                        )
                          N.parentNode.scrollTop &&
                            U.push([N.parentNode, N.parentNode.scrollTop]),
                            (N = N.parentNode);
                        return function () {
                          return U.forEach(function (z) {
                            var W = z[0],
                              B = z[1];
                            (W.style.scrollBehavior = "auto"),
                              (W.scrollTop = B),
                              (W.style.scrollBehavior = null);
                          });
                        };
                      })(i)),
                      (i.style.height = "")),
                    (m =
                      l.boxSizing === "content-box"
                        ? i.scrollHeight -
                          (parseFloat(l.paddingTop) +
                            parseFloat(l.paddingBottom))
                        : i.scrollHeight +
                          parseFloat(l.borderTopWidth) +
                          parseFloat(l.borderBottomWidth)),
                    l.maxHeight !== "none" && m > parseFloat(l.maxHeight)
                      ? (l.overflowY === "hidden" &&
                          (i.style.overflow = "scroll"),
                        (m = parseFloat(l.maxHeight)))
                      : l.overflowY !== "hidden" &&
                        (i.style.overflow = "hidden"),
                    (i.style.height = m + "px"),
                    x && (i.style.textAlign = x),
                    h && h(),
                    s !== m &&
                      (i.dispatchEvent(
                        new Event("autosize:resized", { bubbles: !0 }),
                      ),
                      (s = m)),
                    T !== l.overflow && !x)
                  ) {
                    var P = l.textAlign;
                    l.overflow === "hidden" &&
                      (i.style.textAlign = P === "start" ? "end" : "start"),
                      c({ restoreTextAlign: P, testForHeightReduction: !0 });
                  }
                }
                function f() {
                  c({ testForHeightReduction: !0, restoreTextAlign: null });
                }
              })(n);
            }),
          e
        );
      }).destroy = function (e) {
        return e && Array.prototype.forEach.call(e.length ? e : [e], Xf), e;
      }),
      ($n.update = function (e) {
        return e && Array.prototype.forEach.call(e.length ? e : [e], ed), e;
      }));
  var co = $n;
  const td = ["data-index"],
    nd = ["src", "title", "onClick"];
  var id = sn({
      __name: "ImageWall",
      props: {
        items: { default: () => [] },
        columnWidth: { default: 300 },
        gap: { default: 0 },
      },
      emits: ["insert"],
      setup(e, { expose: t }) {
        const n = e;
        t();
        let i = null;
        const r = q(null),
          s = q({}),
          l = q([]),
          o = () => {
            const h = Math.floor(
              (r.value.getBoundingClientRect().width + n.gap) /
                (n.columnWidth + n.gap),
            );
            return h > 0 ? h : 1;
          },
          a = (h) => new Array(h).fill(null).map(() => []),
          c = async (h) => {
            var m;
            if (h >= n.items.length) return;
            await nn();
            const S = Array.from(
              ((m = r.value) == null ? void 0 : m.children) || [],
            ).reduce((x, C) =>
              C.getBoundingClientRect().height <
              x.getBoundingClientRect().height
                ? C
                : x,
            );
            l.value[Number(S.dataset.index)].push(h), await c(h + 1);
          },
          f = async (h = !1) => {
            if (l.value.length === o() && !h) return;
            l.value = a(o());
            const m = window.scrollY;
            await c(0), window.scrollTo({ top: m });
          },
          p = (h) => {
            s.value[h.target.src] = !0;
          };
        return (
          ln(() => {
            f(!0),
              (i = new ResizeObserver(() => {
                f();
              })),
              i.observe(r.value),
              Pe(
                () => [n.items],
                () => {
                  (s.value = {}), f(!0);
                },
              ),
              Pe(
                () => [n.columnWidth, n.gap],
                () => {
                  f();
                },
              );
          }),
          Wa(() => i.unobserve(r.value)),
          (h, m) => (
            I(),
            O(
              "div",
              {
                ref_key: "wall",
                ref: r,
                class: "wl-gallery",
                style: Jt({ gap: `${h.gap}px` }),
              },
              [
                (I(!0),
                O(
                  ae,
                  null,
                  Ue(
                    l.value,
                    (S, x) => (
                      I(),
                      O(
                        "div",
                        {
                          key: x,
                          class: "wl-gallery-column",
                          "data-index": x,
                          style: Jt({ gap: `${h.gap}px` }),
                        },
                        [
                          (I(!0),
                          O(
                            ae,
                            null,
                            Ue(
                              S,
                              (C) => (
                                I(),
                                O(
                                  ae,
                                  { key: C },
                                  [
                                    s.value[h.items[C].src]
                                      ? X("v-if", !0)
                                      : (I(),
                                        Xe(G(kn), {
                                          key: 0,
                                          size: 36,
                                          style: { margin: "20px auto" },
                                        })),
                                    j(
                                      "img",
                                      {
                                        class: "wl-gallery-item",
                                        src: h.items[C].src,
                                        title: h.items[C].title,
                                        loading: "lazy",
                                        onLoad: p,
                                        onClick: (w) =>
                                          h.$emit(
                                            "insert",
                                            `![](${h.items[C].src})`,
                                          ),
                                      },
                                      null,
                                      40,
                                      nd,
                                    ),
                                  ],
                                  64,
                                )
                              ),
                            ),
                            128,
                          )),
                        ],
                        12,
                        td,
                      )
                    ),
                  ),
                  128,
                )),
              ],
              4,
            )
          )
        );
      },
    }),
    rd = _n(id, [["__file", "ImageWall.vue"]]);
  const sd = { class: "wl-comment" },
    ld = { key: 0, class: "wl-login-info" },
    od = { class: "wl-avatar" },
    ad = ["title"],
    cd = ["title"],
    ud = ["src"],
    fd = ["title", "textContent"],
    dd = { class: "wl-panel" },
    hd = ["for", "textContent"],
    pd = ["id", "onUpdate:modelValue", "name", "type"],
    gd = ["placeholder"],
    md = { class: "wl-preview" },
    vd = j("hr", null, null, -1),
    yd = ["innerHTML"],
    wd = { class: "wl-footer" },
    bd = { class: "wl-actions" },
    kd = {
      href: "https://guides.github.com/features/mastering-markdown/",
      title: "Markdown Guide",
      "aria-label": "Markdown is supported",
      class: "wl-action",
      target: "_blank",
      rel: "noopener noreferrer",
    },
    xd = ["title"],
    _d = ["title"],
    Cd = ["title"],
    $d = ["title"],
    Ed = { class: "wl-info" },
    Td = j("div", { class: "wl-captcha-container" }, null, -1),
    Rd = { class: "wl-text-number" },
    Sd = { key: 0 },
    Ad = ["textContent"],
    Id = ["textContent"],
    Ld = ["disabled"],
    Md = ["placeholder"],
    Od = { key: 1, class: "wl-loading" },
    zd = { key: 0, class: "wl-tab-wrapper" },
    jd = ["title", "onClick"],
    Pd = ["src", "alt"],
    Ud = { key: 0, class: "wl-tabs" },
    Fd = ["onClick"],
    Nd = ["src", "alt", "title"],
    Hd = ["title"];
  var Dd = sn({
      __name: "CommentBox",
      props: {
        edit: { default: null },
        rootId: { default: "" },
        replyId: { default: "" },
        replyUser: { default: "" },
      },
      emits: ["log", "cancelEdit", "cancelReply", "submit"],
      setup(e, { expose: t, emit: n }) {
        const i = e,
          r = n;
        t();
        const s = ei("config"),
          l = Lf(),
          o = If(),
          a = bi(),
          c = q({}),
          f = q(null),
          p = q(null),
          h = q(null),
          m = q(null),
          S = q(null),
          x = q(null),
          C = q(null),
          w = q({ tabs: [], map: {} }),
          T = q(0),
          P = q(!1),
          N = q(!1),
          U = q(!1),
          z = q(""),
          W = q(0),
          B = Yt({ loading: !0, list: [] }),
          Q = q(0),
          ue = q(!1),
          Ie = q(""),
          xe = q(!1),
          K = q(!1),
          V = ke(() => s.value.locale),
          le = ke(() => {
            var M;
            return !!((M = a.value) != null && M.token);
          }),
          ye = ke(() => s.value.imageUploader !== !1),
          me = (M) => {
            const A = f.value,
              u = A.selectionStart,
              d = A.selectionEnd || 0,
              g = A.scrollTop;
            (l.value =
              A.value.substring(0, u) +
              M +
              A.value.substring(d, A.value.length)),
              A.focus(),
              (A.selectionStart = u + M.length),
              (A.selectionEnd = u + M.length),
              (A.scrollTop = g);
          },
          $e = (M) => {
            const A = M.key;
            (M.ctrlKey || M.metaKey) && A === "Enter" && Tn();
          },
          _e = (M) => {
            const A = `![${s.value.locale.uploading} ${M.name}]()`;
            return (
              me(A),
              (xe.value = !0),
              Promise.resolve()
                .then(() => s.value.imageUploader(M))
                .then((u) => {
                  l.value = l.value.replace(
                    A,
                    `\r
![${M.name}](${u})`,
                  );
                })
                .catch((u) => {
                  alert(u.message), (l.value = l.value.replace(A, ""));
                })
                .then(() => {
                  xe.value = !1;
                })
            );
          },
          vt = (M) => {
            var A;
            if ((A = M.dataTransfer) != null && A.items) {
              const u = Al(M.dataTransfer.items);
              u && ye.value && (_e(u), M.preventDefault());
            }
          },
          St = (M) => {
            if (M.clipboardData) {
              const A = Al(M.clipboardData.items);
              A && ye.value && _e(A);
            }
          },
          Ne = () => {
            const M = p.value;
            M.files &&
              ye.value &&
              _e(M.files[0]).then(() => {
                M.value = "";
              });
          },
          Tn = async () => {
            var M, A, u, d, g, v;
            const {
                serverURL: y,
                lang: k,
                login: E,
                wordLimit: _,
                requiredMeta: $,
                recaptchaV3Key: b,
                turnstileKey: L,
              } = s.value,
              F = await bf(),
              R = {
                comment: Ie.value,
                nick: o.value.nick,
                mail: o.value.mail,
                link: o.value.link,
                url: s.value.path,
                ua: F,
              };
            if ((M = a.value) != null && M.token && !i.edit)
              (R.nick = a.value.display_name),
                (R.mail = a.value.email),
                (R.link = a.value.url);
            else {
              if (E === "force") return;
              if ($.indexOf("nick") > -1 && !R.nick)
                return (
                  (A = c.value.nick) == null || A.focus(),
                  alert(V.value.nickError)
                );
              if (
                ($.indexOf("mail") > -1 && !R.mail) ||
                (R.mail && !No(R.mail))
              )
                return (
                  (u = c.value.mail) == null || u.focus(),
                  alert(V.value.mailError)
                );
              R.nick || (R.nick = V.value.anonymous);
            }
            if (!R.comment) {
              (d = f.value) == null || d.focus();
              return;
            }
            if (!ue.value)
              return alert(
                V.value.wordHint
                  .replace("$0", _[0].toString())
                  .replace("$1", _[1].toString())
                  .replace("$2", W.value.toString()),
              );
            (R.comment = Xl(R.comment, w.value.map)),
              i.replyId &&
                i.rootId &&
                ((R.pid = i.replyId), (R.rid = i.rootId), (R.at = i.replyUser)),
              (xe.value = !0);
            try {
              b && (R.recaptchaV3 = await Nf(b).execute("social")),
                L && (R.turnstile = await Hf(L).execute("social"));
              const H = {
                  serverURL: y,
                  lang: k,
                  token: (g = a.value) == null ? void 0 : g.token,
                  comment: R,
                },
                Z = await (i.edit
                  ? Kt({ objectId: i.edit.objectId, ...H })
                  : Rr(H));
              if (((xe.value = !1), Z.errmsg)) return alert(Z.errmsg);
              r("submit", Z.data),
                (l.value = ""),
                (z.value = ""),
                i.replyId && r("cancelReply"),
                (v = i.edit) != null && v.objectId && r("cancelEdit");
            } catch (H) {
              (xe.value = !1), alert(H.message);
            }
          },
          _r = (M) => {
            M.preventDefault();
            const { lang: A, serverURL: u } = s.value;
            Ir({ serverURL: u, lang: A }).then((d) => {
              (a.value = d),
                (d.remember ? localStorage : sessionStorage).setItem(
                  "WALINE_USER",
                  JSON.stringify(d),
                ),
                r("log");
            });
          },
          Cr = () => {
            (a.value = {}),
              localStorage.setItem("WALINE_USER", "null"),
              sessionStorage.setItem("WALINE_USER", "null"),
              r("log");
          },
          He = (M) => {
            M.preventDefault();
            const { lang: A, serverURL: u } = s.value,
              d = 800,
              g = 800,
              v = (window.innerWidth - d) / 2,
              y = (window.innerHeight - g) / 2,
              k = new URLSearchParams({ lng: A, token: a.value.token }),
              E = window.open(
                `${u}/ui/profile?${k.toString()}`,
                "_blank",
                `width=${d},height=${g},left=${v},top=${y},scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no`,
              );
            E == null ||
              E.postMessage({ type: "TOKEN", data: a.value.token }, "*");
          },
          At = (M) => {
            var A, u, d, g;
            !((A = h.value) != null && A.contains(M.target)) &&
              !((u = m.value) != null && u.contains(M.target)) &&
              (P.value = !1),
              !((d = S.value) != null && d.contains(M.target)) &&
                !((g = x.value) != null && g.contains(M.target)) &&
                (N.value = !1);
          },
          Wt = async (M) => {
            var A;
            const { scrollTop: u, clientHeight: d, scrollHeight: g } = M.target,
              v = (d + u) / g,
              y = s.value.search,
              k = ((A = C.value) == null ? void 0 : A.value) || "";
            v < 0.9 ||
              B.loading ||
              K.value ||
              ((B.loading = !0),
              (y.more && B.list.length
                ? await y.more(k, B.list.length)
                : await y.search(k)
              ).length
                ? (B.list = [
                    ...B.list,
                    ...(y.more && B.list.length
                      ? await y.more(k, B.list.length)
                      : await y.search(k)),
                  ])
                : (K.value = !0),
              (B.loading = !1),
              setTimeout(() => {
                M.target.scrollTop = u;
              }, 50));
          },
          Rn = au((M) => {
            (B.list = []), (K.value = !1), Wt(M);
          }, 300);
        Pe(
          [s, W],
          ([M, A]) => {
            const { wordLimit: u } = M;
            u
              ? A < u[0] && u[0] !== 0
                ? ((Q.value = u[0]), (ue.value = !1))
                : A > u[1]
                  ? ((Q.value = u[1]), (ue.value = !1))
                  : ((Q.value = u[1]), (ue.value = !0))
              : ((Q.value = 0), (ue.value = !0));
          },
          { immediate: !0 },
        );
        const st = ({ data: M }) => {
          !M ||
            M.type !== "profile" ||
            ((a.value = { ...a.value, ...M.data }),
            [localStorage, sessionStorage]
              .filter((A) => A.getItem("WALINE_USER"))
              .forEach((A) => A.setItem("WALINE_USER", JSON.stringify(a))));
        };
        return (
          ln(() => {
            var M;
            document.body.addEventListener("click", At),
              window.addEventListener("message", st),
              (M = i.edit) != null && M.objectId && (l.value = i.edit.orig),
              Pe(N, async (A) => {
                if (!A) return;
                const u = s.value.search;
                C.value && (C.value.value = ""),
                  (B.loading = !0),
                  (B.list = u.default ? await u.default() : await u.search("")),
                  (B.loading = !1);
              }),
              Pe(
                () => l.value,
                (A) => {
                  const { highlighter: u, texRenderer: d } = s.value;
                  (Ie.value = A),
                    (z.value = mf(A, {
                      emojiMap: w.value.map,
                      highlighter: u,
                      texRenderer: d,
                    })),
                    (W.value = wf(A)),
                    A ? co(f.value) : co.destroy(f.value);
                },
                { immediate: !0 },
              ),
              Pe(
                () => s.value.emoji,
                (A) =>
                  Eu(A).then((u) => {
                    w.value = u;
                  }),
                { immediate: !0 },
              );
          }),
          Yn(() => {
            document.body.removeEventListener("click", At),
              window.removeEventListener("message", st);
          }),
          (M, A) => {
            var u, d;
            return (
              I(),
              O("div", sd, [
                G(s).login !== "disable" &&
                le.value &&
                !((u = M.edit) != null && u.objectId)
                  ? (I(),
                    O("div", ld, [
                      j("div", od, [
                        j(
                          "button",
                          {
                            type: "submit",
                            class: "wl-logout-btn",
                            title: V.value.logout,
                            onClick: Cr,
                          },
                          [re(G(to), { size: 14 })],
                          8,
                          ad,
                        ),
                        j(
                          "a",
                          {
                            href: "#",
                            class: "wl-login-nick",
                            "aria-label": "Profile",
                            title: V.value.profile,
                            onClick: He,
                          },
                          [
                            j(
                              "img",
                              { src: G(a).avatar, alt: "avatar" },
                              null,
                              8,
                              ud,
                            ),
                          ],
                          8,
                          cd,
                        ),
                      ]),
                      j(
                        "a",
                        {
                          href: "#",
                          class: "wl-login-nick",
                          "aria-label": "Profile",
                          title: V.value.profile,
                          onClick: He,
                          textContent: ie(G(a).display_name),
                        },
                        null,
                        8,
                        fd,
                      ),
                    ]))
                  : X("v-if", !0),
                j("div", dd, [
                  G(s).login !== "force" && G(s).meta.length && !le.value
                    ? (I(),
                      O(
                        "div",
                        {
                          key: 0,
                          class: ve(["wl-header", `item${G(s).meta.length}`]),
                        },
                        [
                          (I(!0),
                          O(
                            ae,
                            null,
                            Ue(
                              G(s).meta,
                              (g) => (
                                I(),
                                O("div", { key: g, class: "wl-header-item" }, [
                                  j(
                                    "label",
                                    {
                                      for: `wl-${g}`,
                                      textContent: ie(
                                        V.value[g] +
                                          (G(s).requiredMeta.includes(g) ||
                                          !G(s).requiredMeta.length
                                            ? ""
                                            : `(${V.value.optional})`),
                                      ),
                                    },
                                    null,
                                    8,
                                    hd,
                                  ),
                                  Qn(
                                    j(
                                      "input",
                                      {
                                        id: `wl-${g}`,
                                        ref_for: !0,
                                        ref: (v) => {
                                          v && (c.value[g] = v);
                                        },
                                        "onUpdate:modelValue": (v) =>
                                          (G(o)[g] = v),
                                        class: ve(["wl-input", `wl-${g}`]),
                                        name: g,
                                        type: g === "mail" ? "email" : "text",
                                      },
                                      null,
                                      10,
                                      pd,
                                    ),
                                    [[Jc, G(o)[g]]],
                                  ),
                                ])
                              ),
                            ),
                            128,
                          )),
                        ],
                        2,
                      ))
                    : X("v-if", !0),
                  Qn(
                    j(
                      "textarea",
                      {
                        id: "wl-edit",
                        ref_key: "editorRef",
                        ref: f,
                        "onUpdate:modelValue":
                          A[0] ||
                          (A[0] = (g) => (Te(l) ? (l.value = g) : null)),
                        class: "wl-editor",
                        placeholder: M.replyUser
                          ? `@${M.replyUser}`
                          : V.value.placeholder,
                        onKeydown: $e,
                        onDrop: vt,
                        onPaste: St,
                      },
                      null,
                      40,
                      gd,
                    ),
                    [[fr, G(l)]],
                  ),
                  Qn(
                    j(
                      "div",
                      md,
                      [
                        vd,
                        j("h4", null, ie(V.value.preview) + ":", 1),
                        j(
                          "div",
                          { class: "wl-content", innerHTML: z.value },
                          null,
                          8,
                          yd,
                        ),
                      ],
                      512,
                    ),
                    [[ul, U.value]],
                  ),
                  j("div", wd, [
                    j("div", bd, [
                      j("a", kd, [re(G(Ef))]),
                      Qn(
                        j(
                          "button",
                          {
                            ref_key: "emojiButtonRef",
                            ref: h,
                            type: "button",
                            class: ve(["wl-action", { active: P.value }]),
                            title: V.value.emoji,
                            onClick:
                              A[1] || (A[1] = (g) => (P.value = !P.value)),
                          },
                          [re(G(xf))],
                          10,
                          xd,
                        ),
                        [[ul, w.value.tabs.length]],
                      ),
                      G(s).search
                        ? (I(),
                          O(
                            "button",
                            {
                              key: 0,
                              ref_key: "gifButtonRef",
                              ref: S,
                              type: "button",
                              class: ve(["wl-action", { active: N.value }]),
                              title: V.value.gif,
                              onClick:
                                A[2] || (A[2] = (g) => (N.value = !N.value)),
                            },
                            [re(G(Af))],
                            10,
                            _d,
                          ))
                        : X("v-if", !0),
                      j(
                        "input",
                        {
                          id: "wl-image-upload",
                          ref_key: "imageUploadRef",
                          ref: p,
                          class: "upload",
                          type: "file",
                          accept: ".png,.jpg,.jpeg,.webp,.bmp,.gif",
                          onChange: Ne,
                        },
                        null,
                        544,
                      ),
                      ye.value
                        ? (I(),
                          O(
                            "label",
                            {
                              key: 1,
                              for: "wl-image-upload",
                              class: "wl-action",
                              title: V.value.uploadImage,
                            },
                            [re(G(_f))],
                            8,
                            Cd,
                          ))
                        : X("v-if", !0),
                      j(
                        "button",
                        {
                          type: "button",
                          class: ve(["wl-action", { active: U.value }]),
                          title: V.value.preview,
                          onClick: A[3] || (A[3] = (g) => (U.value = !U.value)),
                        },
                        [re(G($f))],
                        10,
                        $d,
                      ),
                    ]),
                    j("div", Ed, [
                      Td,
                      j("div", Rd, [
                        et(ie(W.value) + " ", 1),
                        G(s).wordLimit
                          ? (I(),
                            O("span", Sd, [
                              et("  /  "),
                              j(
                                "span",
                                {
                                  class: ve({ illegal: !ue.value }),
                                  textContent: ie(Q.value),
                                },
                                null,
                                10,
                                Ad,
                              ),
                            ]))
                          : X("v-if", !0),
                        et("  " + ie(V.value.word), 1),
                      ]),
                      G(s).login !== "disable" && !le.value
                        ? (I(),
                          O(
                            "button",
                            {
                              key: 0,
                              type: "button",
                              class: "wl-btn",
                              onClick: _r,
                              textContent: ie(V.value.login),
                            },
                            null,
                            8,
                            Id,
                          ))
                        : X("v-if", !0),
                      G(s).login !== "force" || le.value
                        ? (I(),
                          O(
                            "button",
                            {
                              key: 1,
                              type: "submit",
                              class: "primary wl-btn",
                              title: "Cmd|Ctrl + Enter",
                              disabled: xe.value,
                              onClick: Tn,
                            },
                            [
                              xe.value
                                ? (I(), Xe(G(kn), { key: 0, size: 16 }))
                                : (I(),
                                  O(
                                    ae,
                                    { key: 1 },
                                    [et(ie(V.value.submit), 1)],
                                    64,
                                  )),
                            ],
                            8,
                            Ld,
                          ))
                        : X("v-if", !0),
                    ]),
                    j(
                      "div",
                      {
                        ref_key: "gifPopupRef",
                        ref: x,
                        class: ve(["wl-gif-popup", { display: N.value }]),
                      },
                      [
                        j(
                          "input",
                          {
                            ref_key: "gifSearchInputRef",
                            ref: C,
                            type: "text",
                            placeholder: V.value.gifSearchPlaceholder,
                            onInput:
                              A[4] || (A[4] = (...g) => G(Rn) && G(Rn)(...g)),
                          },
                          null,
                          40,
                          Md,
                        ),
                        B.list.length
                          ? (I(),
                            Xe(
                              rd,
                              {
                                key: 0,
                                items: B.list,
                                "column-width": 200,
                                gap: 6,
                                onInsert: A[5] || (A[5] = (g) => me(g)),
                                onScroll: Wt,
                              },
                              null,
                              8,
                              ["items"],
                            ))
                          : X("v-if", !0),
                        B.loading
                          ? (I(), O("div", Od, [re(G(kn), { size: 30 })]))
                          : X("v-if", !0),
                      ],
                      2,
                    ),
                    j(
                      "div",
                      {
                        ref_key: "emojiPopupRef",
                        ref: m,
                        class: ve(["wl-emoji-popup", { display: P.value }]),
                      },
                      [
                        (I(!0),
                        O(
                          ae,
                          null,
                          Ue(
                            w.value.tabs,
                            (g, v) => (
                              I(),
                              O(
                                ae,
                                { key: g.name },
                                [
                                  v === T.value
                                    ? (I(),
                                      O("div", zd, [
                                        (I(!0),
                                        O(
                                          ae,
                                          null,
                                          Ue(
                                            g.items,
                                            (y) => (
                                              I(),
                                              O(
                                                "button",
                                                {
                                                  key: y,
                                                  type: "button",
                                                  title: y,
                                                  onClick: (k) => me(`:${y}:`),
                                                },
                                                [
                                                  P.value
                                                    ? (I(),
                                                      O(
                                                        "img",
                                                        {
                                                          key: 0,
                                                          class: "wl-emoji",
                                                          src: w.value.map[y],
                                                          alt: y,
                                                          loading: "lazy",
                                                          referrerPolicy:
                                                            "no-referrer",
                                                        },
                                                        null,
                                                        8,
                                                        Pd,
                                                      ))
                                                    : X("v-if", !0),
                                                ],
                                                8,
                                                jd,
                                              )
                                            ),
                                          ),
                                          128,
                                        )),
                                      ]))
                                    : X("v-if", !0),
                                ],
                                64,
                              )
                            ),
                          ),
                          128,
                        )),
                        w.value.tabs.length > 1
                          ? (I(),
                            O("div", Ud, [
                              (I(!0),
                              O(
                                ae,
                                null,
                                Ue(
                                  w.value.tabs,
                                  (g, v) => (
                                    I(),
                                    O(
                                      "button",
                                      {
                                        key: g.name,
                                        type: "button",
                                        class: ve([
                                          "wl-tab",
                                          { active: T.value === v },
                                        ]),
                                        onClick: (y) => (T.value = v),
                                      },
                                      [
                                        j(
                                          "img",
                                          {
                                            class: "wl-emoji",
                                            src: g.icon,
                                            alt: g.name,
                                            title: g.name,
                                            loading: "lazy",
                                            referrerPolicy: "no-referrer",
                                          },
                                          null,
                                          8,
                                          Nd,
                                        ),
                                      ],
                                      10,
                                      Fd,
                                    )
                                  ),
                                ),
                                128,
                              )),
                            ]))
                          : X("v-if", !0),
                      ],
                      2,
                    ),
                  ]),
                ]),
                M.replyId || ((d = M.edit) != null && d.objectId)
                  ? (I(),
                    O(
                      "button",
                      {
                        key: 1,
                        type: "button",
                        class: "wl-close",
                        title: V.value.cancelReply,
                        onClick:
                          A[6] ||
                          (A[6] = (g) =>
                            M.$emit(M.replyId ? "cancelReply" : "cancelEdit")),
                      },
                      [re(G(to), { size: 24 })],
                      8,
                      Hd,
                    ))
                  : X("v-if", !0),
              ])
            );
          }
        );
      },
    }),
    uo = _n(Dd, [["__file", "CommentBox.vue"]]);
  const Vd = ["id"],
    Bd = { class: "wl-user", "aria-hidden": "true" },
    Wd = ["src"],
    qd = { class: "wl-card" },
    Kd = { class: "wl-head" },
    Zd = ["href"],
    Gd = { key: 1, class: "wl-nick" },
    Qd = ["textContent"],
    Jd = ["textContent"],
    Yd = ["textContent"],
    Xd = ["textContent"],
    eh = ["textContent"],
    th = { class: "wl-comment-actions" },
    nh = ["title"],
    ih = ["title"],
    rh = { class: "wl-meta", "aria-hidden": "true" },
    sh = ["data-value", "textContent"],
    lh = ["innerHTML"],
    oh = { key: 1, class: "wl-admin-actions" },
    ah = { class: "wl-comment-status" },
    ch = ["disabled", "onClick", "textContent"],
    uh = { key: 3, class: "wl-quote" };
  var fh = sn({
      __name: "CommentCard",
      props: {
        comment: {},
        edit: { default: null },
        rootId: {},
        reply: { default: null },
      },
      emits: [
        "log",
        "submit",
        "delete",
        "edit",
        "like",
        "status",
        "sticky",
        "reply",
      ],
      setup(e, { emit: t }) {
        const n = e,
          i = t,
          r = ["approved", "waiting", "spam"],
          s = ei("config"),
          l = io(),
          o = bu(),
          a = bi(),
          c = ke(() => s.value.locale),
          f = ke(() => {
            const { link: w } = n.comment;
            return w ? (Gr(w) ? w : `https://${w}`) : "";
          }),
          p = ke(() => l.value.includes(n.comment.objectId)),
          h = ke(() => Uo(new Date(n.comment.time), o.value, c.value)),
          m = ke(() => a.value.type === "administrator"),
          S = ke(
            () => n.comment.user_id && a.value.objectId === n.comment.user_id,
          ),
          x = ke(() => {
            var w;
            return (
              n.comment.objectId ===
              ((w = n.reply) == null ? void 0 : w.objectId)
            );
          }),
          C = ke(() => {
            var w;
            return (
              n.comment.objectId ===
              ((w = n.edit) == null ? void 0 : w.objectId)
            );
          });
        return (w, T) => {
          var P;
          const N = ja("CommentCard", !0);
          return (
            I(),
            O(
              "div",
              { id: w.comment.objectId, class: "wl-card-item" },
              [
                j("div", Bd, [
                  w.comment.avatar
                    ? (I(),
                      O(
                        "img",
                        {
                          key: 0,
                          class: "wl-user-avatar",
                          src: w.comment.avatar,
                        },
                        null,
                        8,
                        Wd,
                      ))
                    : X("v-if", !0),
                  w.comment.type ? (I(), Xe(G(Sf), { key: 1 })) : X("v-if", !0),
                ]),
                j("div", qd, [
                  j("div", Kd, [
                    f.value
                      ? (I(),
                        O(
                          "a",
                          {
                            key: 0,
                            class: "wl-nick",
                            href: f.value,
                            target: "_blank",
                            rel: "nofollow noopener noreferrer",
                          },
                          ie(w.comment.nick),
                          9,
                          Zd,
                        ))
                      : (I(), O("span", Gd, ie(w.comment.nick), 1)),
                    w.comment.type === "administrator"
                      ? (I(),
                        O(
                          "span",
                          {
                            key: 2,
                            class: "wl-badge",
                            textContent: ie(c.value.admin),
                          },
                          null,
                          8,
                          Qd,
                        ))
                      : X("v-if", !0),
                    w.comment.label
                      ? (I(),
                        O(
                          "span",
                          {
                            key: 3,
                            class: "wl-badge",
                            textContent: ie(w.comment.label),
                          },
                          null,
                          8,
                          Jd,
                        ))
                      : X("v-if", !0),
                    w.comment.sticky
                      ? (I(),
                        O(
                          "span",
                          {
                            key: 4,
                            class: "wl-badge",
                            textContent: ie(c.value.sticky),
                          },
                          null,
                          8,
                          Yd,
                        ))
                      : X("v-if", !0),
                    typeof w.comment.level == "number"
                      ? (I(),
                        O(
                          "span",
                          {
                            key: 5,
                            class: ve(`wl-badge level${w.comment.level}`),
                            textContent: ie(
                              c.value[`level${w.comment.level}`] ||
                                `Level ${w.comment.level}`,
                            ),
                          },
                          null,
                          10,
                          Xd,
                        ))
                      : X("v-if", !0),
                    j(
                      "span",
                      { class: "wl-time", textContent: ie(h.value) },
                      null,
                      8,
                      eh,
                    ),
                    j("div", th, [
                      m.value || S.value
                        ? (I(),
                          O(
                            ae,
                            { key: 0 },
                            [
                              j(
                                "button",
                                {
                                  type: "button",
                                  class: "wl-edit",
                                  onClick:
                                    T[0] ||
                                    (T[0] = (U) => i("edit", w.comment)),
                                },
                                [re(G(Rf))],
                              ),
                              j(
                                "button",
                                {
                                  type: "button",
                                  class: "wl-delete",
                                  onClick:
                                    T[1] ||
                                    (T[1] = (U) => i("delete", w.comment)),
                                },
                                [re(G(kf))],
                              ),
                            ],
                            64,
                          ))
                        : X("v-if", !0),
                      j(
                        "button",
                        {
                          type: "button",
                          class: "wl-like",
                          title: p.value ? c.value.cancelLike : c.value.like,
                          onClick: T[2] || (T[2] = (U) => i("like", w.comment)),
                        },
                        [
                          re(G(Cf), { active: p.value }, null, 8, ["active"]),
                          et(
                            " " + ie("like" in w.comment ? w.comment.like : ""),
                            1,
                          ),
                        ],
                        8,
                        nh,
                      ),
                      j(
                        "button",
                        {
                          type: "button",
                          class: ve(["wl-reply", { active: x.value }]),
                          title: x.value ? c.value.cancelReply : c.value.reply,
                          onClick:
                            T[3] ||
                            (T[3] = (U) =>
                              i("reply", x.value ? null : w.comment)),
                        },
                        [re(G(Tf))],
                        10,
                        ih,
                      ),
                    ]),
                  ]),
                  j("div", rh, [
                    (I(),
                    O(
                      ae,
                      null,
                      Ue(
                        ["addr", "browser", "os"],
                        (U) => (
                          I(),
                          O(
                            ae,
                            null,
                            [
                              w.comment[U]
                                ? (I(),
                                  O(
                                    "span",
                                    {
                                      key: U,
                                      class: ve(`wl-${U}`),
                                      "data-value": w.comment[U],
                                      textContent: ie(w.comment[U]),
                                    },
                                    null,
                                    10,
                                    sh,
                                  ))
                                : X("v-if", !0),
                            ],
                            64,
                          )
                        ),
                      ),
                      64,
                    )),
                  ]),
                  C.value
                    ? X("v-if", !0)
                    : (I(),
                      O(
                        "div",
                        {
                          key: 0,
                          class: "wl-content",
                          innerHTML: w.comment.comment,
                        },
                        null,
                        8,
                        lh,
                      )),
                  m.value && !C.value
                    ? (I(),
                      O("div", oh, [
                        j("span", ah, [
                          (I(),
                          O(
                            ae,
                            null,
                            Ue(r, (U) =>
                              j(
                                "button",
                                {
                                  key: U,
                                  type: "submit",
                                  class: ve(`wl-btn wl-${U}`),
                                  disabled: w.comment.status === U,
                                  onClick: (z) =>
                                    i("status", {
                                      status: U,
                                      comment: w.comment,
                                    }),
                                  textContent: ie(c.value[U]),
                                },
                                null,
                                10,
                                ch,
                              ),
                            ),
                            64,
                          )),
                        ]),
                        m.value && !("rid" in w.comment)
                          ? (I(),
                            O(
                              "button",
                              {
                                key: 0,
                                type: "submit",
                                class: "wl-btn wl-sticky",
                                onClick:
                                  T[4] ||
                                  (T[4] = (U) => i("sticky", w.comment)),
                              },
                              ie(
                                w.comment.sticky
                                  ? c.value.unsticky
                                  : c.value.sticky,
                              ),
                              1,
                            ))
                          : X("v-if", !0),
                      ]))
                    : X("v-if", !0),
                  x.value || C.value
                    ? (I(),
                      O(
                        "div",
                        {
                          key: 2,
                          class: ve({
                            "wl-reply-wrapper": x.value,
                            "wl-edit-wrapper": C.value,
                          }),
                        },
                        [
                          re(
                            uo,
                            {
                              edit: w.edit,
                              "reply-id":
                                (P = w.reply) == null ? void 0 : P.objectId,
                              "reply-user": w.comment.nick,
                              "root-id": w.rootId,
                              onLog: T[5] || (T[5] = (U) => i("log")),
                              onCancelReply:
                                T[6] || (T[6] = (U) => i("reply", null)),
                              onCancelEdit:
                                T[7] || (T[7] = (U) => i("edit", null)),
                              onSubmit: T[8] || (T[8] = (U) => i("submit", U)),
                            },
                            null,
                            8,
                            ["edit", "reply-id", "reply-user", "root-id"],
                          ),
                        ],
                        2,
                      ))
                    : X("v-if", !0),
                  "children" in w.comment
                    ? (I(),
                      O("div", uh, [
                        (I(!0),
                        O(
                          ae,
                          null,
                          Ue(
                            w.comment.children,
                            (U) => (
                              I(),
                              Xe(
                                N,
                                {
                                  key: U.objectId,
                                  comment: U,
                                  reply: w.reply,
                                  edit: w.edit,
                                  "root-id": w.rootId,
                                  onLog: T[9] || (T[9] = (z) => i("log")),
                                  onDelete:
                                    T[10] || (T[10] = (z) => i("delete", z)),
                                  onEdit:
                                    T[11] || (T[11] = (z) => i("edit", z)),
                                  onLike:
                                    T[12] || (T[12] = (z) => i("like", z)),
                                  onReply:
                                    T[13] || (T[13] = (z) => i("reply", z)),
                                  onStatus:
                                    T[14] || (T[14] = (z) => i("status", z)),
                                  onSticky:
                                    T[15] || (T[15] = (z) => i("sticky", z)),
                                  onSubmit:
                                    T[16] || (T[16] = (z) => i("submit", z)),
                                },
                                null,
                                8,
                                ["comment", "reply", "edit", "root-id"],
                              )
                            ),
                          ),
                          128,
                        )),
                      ]))
                    : X("v-if", !0),
                ]),
              ],
              8,
              Vd,
            )
          );
        };
      },
    }),
    dh = _n(fh, [["__file", "CommentCard.vue"]]);
  const fo = "3.1.3",
    hh = { "data-waline": "" },
    ph = { class: "wl-meta-head" },
    gh = { class: "wl-count" },
    mh = ["textContent"],
    vh = { class: "wl-sort" },
    yh = ["onClick"],
    wh = { class: "wl-cards" },
    bh = { key: 1, class: "wl-operation" },
    kh = ["textContent"],
    xh = { key: 2, class: "wl-loading" },
    _h = ["textContent"],
    Ch = { key: 4, class: "wl-operation" },
    $h = ["textContent"],
    Eh = { key: 5, class: "wl-power" },
    Th = j(
      "a",
      {
        href: "https://github.com/walinejs/waline",
        target: "_blank",
        rel: "noopener noreferrer",
      },
      " Waline ",
      -1,
    );
  var Rh = sn({
      __name: "WalineComment",
      props: [
        "serverURL",
        "path",
        "meta",
        "requiredMeta",
        "dark",
        "commentSorting",
        "lang",
        "locale",
        "pageSize",
        "wordLimit",
        "emoji",
        "login",
        "highlighter",
        "texRenderer",
        "imageUploader",
        "search",
        "copyright",
        "recaptchaV3Key",
        "turnstileKey",
        "reaction",
      ],
      setup(e) {
        const t = e,
          n = {
            latest: "insertedAt_desc",
            oldest: "insertedAt_asc",
            hottest: "like_desc",
          },
          i = Object.keys(n),
          r = bi(),
          s = io(),
          l = q("loading"),
          o = q(0),
          a = q(1),
          c = q(0),
          f = ke(() => zo(t)),
          p = q(f.value.commentSorting),
          h = q([]),
          m = q(null),
          S = q(null),
          x = ke(() => jo(f.value.dark)),
          C = ke(() => f.value.locale);
        _u(x, { id: "waline-darkmode" });
        let w;
        const T = (K) => {
            var V;
            const { serverURL: le, path: ye, pageSize: me } = f.value,
              $e = new AbortController();
            (l.value = "loading"),
              w == null || w(),
              Tr({
                serverURL: le,
                lang: f.value.lang,
                path: ye,
                pageSize: me,
                sortBy: n[p.value],
                page: K,
                signal: $e.signal,
                token: (V = r.value) == null ? void 0 : V.token,
              })
                .then((_e) => {
                  (l.value = "success"),
                    (o.value = _e.count),
                    h.value.push(..._e.data),
                    (a.value = K),
                    (c.value = _e.totalPages);
                })
                .catch((_e) => {
                  _e.name !== "AbortError" &&
                    (console.error(_e.message), (l.value = "error"));
                }),
              (w = $e.abort.bind($e));
          },
          P = () => T(a.value + 1),
          N = () => {
            (o.value = 0), (h.value = []), T(1);
          },
          U = (K) => {
            p.value !== K && ((p.value = K), N());
          },
          z = (K) => {
            m.value = K;
          },
          W = (K) => {
            S.value = K;
          },
          B = (K) => {
            if (S.value) (S.value.comment = K.comment), (S.value.orig = K.orig);
            else if ("rid" in K) {
              const V = h.value.find(({ objectId: le }) => le === K.rid);
              if (!V) return;
              Array.isArray(V.children) || (V.children = []),
                V.children.push(K);
            } else h.value.unshift(K), (o.value += 1);
          },
          Q = async ({ comment: K, status: V }) => {
            var le;
            if (K.status === V) return;
            const { serverURL: ye, lang: me } = f.value;
            await Kt({
              serverURL: ye,
              lang: me,
              token: (le = r.value) == null ? void 0 : le.token,
              objectId: K.objectId,
              comment: { status: V },
            }),
              (K.status = V);
          },
          ue = async (K) => {
            var V;
            if ("rid" in K) return;
            const { serverURL: le, lang: ye } = f.value;
            await Kt({
              serverURL: le,
              lang: ye,
              token: (V = r.value) == null ? void 0 : V.token,
              objectId: K.objectId,
              comment: { sticky: K.sticky ? 0 : 1 },
            }),
              (K.sticky = !K.sticky);
          },
          Ie = async ({ objectId: K }) => {
            var V;
            if (!confirm("Are you sure you want to delete this comment?"))
              return;
            const { serverURL: le, lang: ye } = f.value;
            await Sr({
              serverURL: le,
              lang: ye,
              token: (V = r.value) == null ? void 0 : V.token,
              objectId: K,
            }),
              h.value.some((me, $e) =>
                me.objectId === K
                  ? ((h.value = h.value.filter((_e, vt) => vt !== $e)), !0)
                  : me.children.some((_e, vt) =>
                      _e.objectId === K
                        ? ((h.value[$e].children = me.children.filter(
                            (St, Ne) => Ne !== vt,
                          )),
                          !0)
                        : !1,
                    ),
              );
          },
          xe = async (K) => {
            var V;
            const { serverURL: le, lang: ye } = f.value,
              { objectId: me } = K,
              $e = s.value.includes(me);
            await Kt({
              serverURL: le,
              lang: ye,
              objectId: me,
              token: (V = r.value) == null ? void 0 : V.token,
              comment: { like: !$e },
            }),
              $e
                ? (s.value = s.value.filter((_e) => _e !== me))
                : ((s.value = [...s.value, me]),
                  s.value.length > 50 && (s.value = s.value.slice(-50))),
              (K.like = (K.like || 0) + ($e ? -1 : 1));
          };
        return (
          Xa("config", f),
          ln(() => {
            Pe(
              () => [t.serverURL, t.path],
              () => N(),
              { immediate: !0 },
            );
          }),
          Yn(() => (w == null ? void 0 : w())),
          (K, V) => (
            I(),
            O("div", hh, [
              re(Yf),
              m.value
                ? X("v-if", !0)
                : (I(), Xe(uo, { key: 0, onLog: N, onSubmit: B })),
              j("div", ph, [
                j("div", gh, [
                  o.value
                    ? (I(),
                      O(
                        "span",
                        { key: 0, class: "wl-num", textContent: ie(o.value) },
                        null,
                        8,
                        mh,
                      ))
                    : X("v-if", !0),
                  et(" " + ie(C.value.comment), 1),
                ]),
                j("ul", vh, [
                  (I(!0),
                  O(
                    ae,
                    null,
                    Ue(
                      G(i),
                      (le) => (
                        I(),
                        O(
                          "li",
                          {
                            key: le,
                            class: ve([le === p.value ? "active" : ""]),
                            onClick: (ye) => U(le),
                          },
                          ie(C.value[le]),
                          11,
                          yh,
                        )
                      ),
                    ),
                    128,
                  )),
                ]),
              ]),
              j("div", wh, [
                (I(!0),
                O(
                  ae,
                  null,
                  Ue(
                    h.value,
                    (le) => (
                      I(),
                      Xe(
                        dh,
                        {
                          key: le.objectId,
                          "root-id": le.objectId,
                          comment: le,
                          reply: m.value,
                          edit: S.value,
                          onLog: N,
                          onReply: z,
                          onEdit: W,
                          onSubmit: B,
                          onStatus: Q,
                          onDelete: Ie,
                          onSticky: ue,
                          onLike: xe,
                        },
                        null,
                        8,
                        ["root-id", "comment", "reply", "edit"],
                      )
                    ),
                  ),
                  128,
                )),
              ]),
              l.value === "error"
                ? (I(),
                  O("div", bh, [
                    j(
                      "button",
                      {
                        type: "button",
                        class: "wl-btn",
                        onClick: N,
                        textContent: ie(C.value.refresh),
                      },
                      null,
                      8,
                      kh,
                    ),
                  ]))
                : l.value === "loading"
                  ? (I(), O("div", xh, [re(G(kn), { size: 30 })]))
                  : h.value.length
                    ? a.value < c.value
                      ? (I(),
                        O("div", Ch, [
                          j(
                            "button",
                            {
                              type: "button",
                              class: "wl-btn",
                              onClick: P,
                              textContent: ie(C.value.more),
                            },
                            null,
                            8,
                            $h,
                          ),
                        ]))
                      : X("v-if", !0)
                    : (I(),
                      O(
                        "div",
                        {
                          key: 3,
                          class: "wl-empty",
                          textContent: ie(C.value.sofa),
                        },
                        null,
                        8,
                        _h,
                      )),
              f.value.copyright
                ? (I(),
                  O("div", Eh, [
                    et(" Powered by "),
                    Th,
                    et(" v" + ie(G(fo)), 1),
                  ]))
                : X("v-if", !0),
            ])
          )
        );
      },
    }),
    Sh = _n(Rh, [["__file", "WalineComment.vue"]]);
  const ho = (e, t) => {
      t.forEach((n, i) => {
        const r = e[i].time;
        typeof r == "number" && (n.innerText = r.toString());
      });
    },
    po = ({
      serverURL: e,
      path: t = window.location.pathname,
      selector: n = ".waline-pageview-count",
      update: i = !0,
      lang: r = navigator.language,
    }) => {
      const s = new AbortController(),
        l = Array.from(document.querySelectorAll(n)),
        o = (c) => {
          const f = xr(c);
          return f !== null && t !== f;
        },
        a = (c) =>
          Lr({
            serverURL: Ln(e),
            paths: c.map((f) => xr(f) || t),
            lang: r,
            signal: s.signal,
          })
            .then((f) => ho(f, c))
            .catch(Sl);
      if (i) {
        const c = l.filter((p) => !o(p)),
          f = l.filter(o);
        Mr({ serverURL: Ln(e), path: t, lang: r }).then((p) => ho(p, c)),
          f.length && a(f);
      } else a(l);
      return s.abort.bind(s);
    },
    Ah = ({
      el: e = "#waline",
      path: t = window.location.pathname,
      comment: n = !1,
      pageview: i = !1,
      ...r
    }) => {
      const s = e ? hr(e) : null;
      if (e && !s) throw new Error("Option 'el' do not match any domElement!");
      if (!r.serverURL) throw new Error("Option 'serverURL' is missing!");
      const l = Yt({ ...r }),
        o = Yt({ comment: n, pageview: i, path: t }),
        a = () => {
          o.comment &&
            eo({
              serverURL: l.serverURL,
              path: o.path,
              ...(It(o.comment) ? { selector: o.comment } : {}),
            });
        },
        c = () => {
          o.pageview &&
            po({
              serverURL: l.serverURL,
              path: o.path,
              ...(It(o.pageview) ? { selector: o.pageview } : {}),
            });
        },
        f = s ? tu(() => te(Sh, { path: o.path, ...l })) : null;
      f && f.mount(s);
      const p = Us(a),
        h = Us(c);
      return {
        el: s,
        update: ({
          comment: m,
          pageview: S,
          path: x = window.location.pathname,
          ...C
        } = {}) => {
          Object.entries(C).forEach(([w, T]) => {
            l[w] = T;
          }),
            (o.path = x),
            m !== void 0 && (o.comment = m),
            S !== void 0 && (o.pageview = S);
        },
        destroy: () => {
          f == null || f.unmount(), p(), h();
        },
      };
    },
    Ih = ({ el: e, serverURL: t, count: n, lang: i = navigator.language }) => {
      var r;
      const s = bi(),
        l = hr(e),
        o = new AbortController();
      return Or({
        serverURL: t,
        count: n,
        lang: i,
        signal: o.signal,
        token: (r = s.value) == null ? void 0 : r.token,
      }).then((a) =>
        l && a.length
          ? ((l.innerHTML = `<ul class="wl-recent-list">${a.map((c) => `<li class="wl-recent-item"><a href="${c.url}">${c.nick}</a>：${c.comment}</li>`).join("")}</ul>`),
            {
              comments: a,
              destroy: () => {
                o.abort(), (l.innerHTML = "");
              },
            })
          : { comments: a, destroy: () => o.abort() },
      );
    },
    Lh = ({
      el: e,
      serverURL: t,
      count: n,
      locale: i,
      lang: r = navigator.language,
      mode: s = "list",
    }) => {
      const l = hr(e),
        o = new AbortController();
      return zr({ serverURL: t, pageSize: n, lang: r, signal: o.signal }).then(
        (a) =>
          !l || !a.length
            ? { users: a, destroy: () => o.abort() }
            : ((i = { ...qr(r), ...(typeof i == "object" ? i : {}) }),
              (l.innerHTML = `<ul class="wl-user-${s}">${a.map((c, f) => [`<li class="wl-user-item" aria-label="${c.nick}">`, c.link && `<a href="${c.link}" target="_blank">`, '<div class="wl-user-avatar">', `<img src="${c.avatar}" alt="${c.nick}">`, `<span class="wl-user-badge">${f + 1}</span>`, "</div>", '<div class="wl-user-meta">', '<div class="wl-user-name">', c.nick, c.level && `<span class="wl-badge">${i ? i[`level${c.level}`] : `Level ${c.level}`}</span>`, c.label && `<span class="wl-badge">${c.label}</span>`, "</div>", c.link && c.link, "</div>", c.link && "</a>", "</li>"].filter((p) => p).join("")).join("")}</ul>`),
              {
                users: a,
                destroy: () => {
                  o.abort(), (l.innerHTML = "");
                },
              }),
      );
    };
  (J.RecentComments = Ih),
    (J.UserList = Lh),
    (J.addComment = Rr),
    (J.commentCount = eo),
    (J.defaultLocales = In),
    (J.deleteComment = Sr),
    (J.fetchCommentCount = Ar),
    (J.getArticleCounter = _i),
    (J.getComment = Tr),
    (J.getPageview = Lr),
    (J.getRecentComment = Or),
    (J.getUserList = zr),
    (J.init = Ah),
    (J.login = Ir),
    (J.pageviewCount = po),
    (J.updateArticleCounter = An),
    (J.updateComment = Kt),
    (J.updatePageview = Mr),
    (J.version = fo);
});

