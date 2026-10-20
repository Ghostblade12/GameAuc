/* GameAuc auto language + currency. Add <script src="gameauc-i18n.js"></script> to every page's <head>.
   - Language: auto-detected from the visitor's browser (they can change it with the 🌐 button).
   - Currency: auto-picked from the visitor's location (time zone, then browser region), live rates with fallback.
   - Text: built-in translations for fr/es/pt/ar/zh; every other language (and any text not in the table,
     e.g. your Shop page) is translated automatically through the free MyMemory API and cached.
   - Mark anything that must never be translated with data-no-translate (account names already are).
   - Prices: write <span data-price-usd="5"></span> and it shows the visitor's currency. */
(function () {
    'use strict';
    var K = { lang: 'gameAucLang', cur: 'gameAucCurrency', rates: 'gameAucRates', mt: 'gameAucMT' };
    var LANGS = { en: 'English', fr: 'Français', es: 'Español', pt: 'Português', ar: 'العربية', zh: '中文', de: 'Deutsch', hi: 'हिन्दी', ru: 'Русский', ja: '日本語', sw: 'Kiswahili', tr: 'Türkçe' };
    var ORDER = ['fr', 'es', 'pt', 'ar', 'zh'];
    var ROWS = [
        ['Home', 'Accueil', 'Inicio', 'Início', 'الرئيسية', '首页'],
        ['GameAuc Shop', 'Boutique GameAuc', 'Tienda GameAuc', 'Loja GameAuc', 'متجر GameAuc', 'GameAuc 商店'],
        ['Inventory', 'Inventaire', 'Inventario', 'Inventário', 'المخزون', '库存'],
        ['Log out', 'Se déconnecter', 'Cerrar sesión', 'Sair', 'تسجيل الخروج', '退出登录'],
        ['GameAuc Menu', 'Menu GameAuc', 'Menú GameAuc', 'Menu GameAuc', 'قائمة GameAuc', 'GameAuc 菜单'],
        ['Register', 'Inscription', 'Registro', 'Cadastro', 'التسجيل', '注册'],
        ['Login', 'Connexion', 'Iniciar sesión', 'Entrar', 'تسجيل الدخول', '登录'],
        ['Sign in', 'Se connecter', 'Iniciar sesión', 'Entrar', 'تسجيل الدخول', '登录'],
        ['Username *', "Nom d'utilisateur *", 'Usuario *', 'Nome de usuário *', 'اسم المستخدم *', '用户名 *'],
        ['Email Address *', 'Adresse e-mail *', 'Correo electrónico *', 'E-mail *', 'البريد الإلكتروني *', '电子邮箱 *'],
        ['Password *', 'Mot de passe *', 'Contraseña *', 'Senha *', 'كلمة المرور *', '密码 *'],
        ['Select Your Role', 'Choisissez votre rôle', 'Elige tu rol', 'Escolha sua função', 'اختر دورك', '选择你的角色'],
        ['Buyer', 'Acheteur', 'Comprador', 'Comprador', 'مشتري', '买家'],
        ['Seller', 'Vendeur', 'Vendedor', 'Vendedor', 'بائع', '卖家'],
        ['Both', 'Les deux', 'Ambos', 'Ambos', 'كلاهما', '两者'],
        ['Create Account', 'Créer un compte', 'Crear cuenta', 'Criar conta', 'إنشاء حساب', '创建账户'],
        ['Login to your account', 'Connectez-vous à votre compte', 'Inicia sesión en tu cuenta', 'Entre na sua conta', 'سجّل الدخول إلى حسابك', '登录你的账户'],
        ['Already have an account?', 'Vous avez déjà un compte ?', '¿Ya tienes una cuenta?', 'Já tem uma conta?', 'هل لديك حساب بالفعل؟', '已有账户？'],
        ['Login here', 'Connectez-vous ici', 'Inicia sesión aquí', 'Entre aqui', 'سجّل الدخول هنا', '在此登录'],
        ['Sign up here', 'Inscrivez-vous ici', 'Regístrate aquí', 'Cadastre-se aqui', 'سجّل هنا', '在此注册'],
        ['Click here to get new password =', 'Cliquez ici pour un nouveau mot de passe =', 'Haz clic aquí para una nueva contraseña =', 'Clique aqui para uma nova senha =', 'انقر هنا للحصول على كلمة مرور جديدة =', '点击此处获取新密码 ='],
        ['Forgot Password', 'Mot de passe oublié', 'Olvidé mi contraseña', 'Esqueci a senha', 'نسيت كلمة المرور', '忘记密码'],
        ['Active Game Accounts', 'Comptes de jeu actifs', 'Cuentas de juego activas', 'Contas de jogo ativas', 'حسابات الألعاب النشطة', '活跃的游戏账户'],
        ['Search accounts by name...', 'Rechercher des comptes par nom...', 'Buscar cuentas por nombre...', 'Buscar contas por nome...', 'ابحث عن الحسابات بالاسم...', '按名称搜索账户...'],
        ['Nothing is listed on Home yet. Go to your Inventory and click an uploaded image to list it here.', 'Rien n’est encore listé sur l’accueil. Allez dans votre inventaire et cliquez sur une image téléversée pour la lister ici.', 'Aún no hay nada en Inicio. Ve a tu inventario y haz clic en una imagen subida para listarla aquí.', 'Nada listado no Início ainda. Vá ao seu inventário e clique em uma imagem enviada para listá-la aqui.', 'لا يوجد شيء في الرئيسية بعد. اذهب إلى مخزونك وانقر على صورة مرفوعة لعرضها هنا.', '首页还没有任何内容。请前往库存并点击已上传的图片以在此上架。'],
        ['No accounts match your search.', 'Aucun compte ne correspond à votre recherche.', 'Ninguna cuenta coincide con tu búsqueda.', 'Nenhuma conta corresponde à sua busca.', 'لا توجد حسابات تطابق بحثك.', '没有符合搜索的账户。'],
        ['No game accounts listed yet. Upload one above to start!', 'Aucun compte de jeu listé. Téléversez-en un ci-dessus pour commencer !', 'Aún no hay cuentas de juego. ¡Sube una arriba para empezar!', 'Nenhuma conta de jogo listada. Envie uma acima para começar!', 'لا توجد حسابات ألعاب بعد. ارفع حسابًا أعلاه للبدء!', '还没有游戏账户。请在上方上传一个开始吧！'],
        ['Upload Item for Auction', 'Téléverser un article pour l’enchère', 'Subir artículo a subasta', 'Enviar item para leilão', 'ارفع عنصرًا للمزاد', '上传拍卖物品'],
        ['Click here or drag and drop image or GIF of your game account to upload it. Then click an uploaded image below to list it on Home.', 'Cliquez ici ou glissez-déposez une image ou un GIF de votre compte de jeu pour le téléverser. Cliquez ensuite sur une image téléversée ci-dessous pour la lister sur l’accueil.', 'Haz clic aquí o arrastra una imagen o GIF de tu cuenta de juego para subirla. Luego haz clic en una imagen subida abajo para listarla en Inicio.', 'Clique aqui ou arraste uma imagem ou GIF da sua conta de jogo para enviá-la. Depois clique em uma imagem enviada abaixo para listá-la no Início.', 'انقر هنا أو اسحب وأفلت صورة أو GIF لحساب لعبتك لرفعها. ثم انقر على صورة مرفوعة أدناه لعرضها في الرئيسية.', '点击此处或拖放你的游戏账户图片或 GIF 进行上传。然后点击下方已上传的图片，将其上架到首页。'],
        ['Account Name (Required)', 'Nom du compte (obligatoire)', 'Nombre de la cuenta (obligatorio)', 'Nome da conta (obrigatório)', 'اسم الحساب (مطلوب)', '账户名称（必填）'],
        ['Browse Files', 'Parcourir les fichiers', 'Examinar archivos', 'Procurar arquivos', 'تصفح الملفات', '浏览文件'],
        ['View Auction →', 'Voir l’enchère →', 'Ver subasta →', 'Ver leilão →', 'عرض المزاد →', '查看拍卖 →'],
        ['Upload in Home →', 'Publier sur l’accueil →', 'Publicar en Inicio →', 'Publicar no Início →', 'انشر في الرئيسية →', '上架到首页 →'],
        ['⚠️ Security Note:', '⚠️ Note de sécurité :', '⚠️ Nota de seguridad:', '⚠️ Nota de segurança:', '⚠️ ملاحظة أمنية:', '⚠️ 安全提示：'],
        ['Beware of fake Game Account links, Before finalizing any purchase of any Game account.', 'Méfiez-vous des faux liens de comptes de jeu avant de finaliser tout achat.', 'Cuidado con los enlaces falsos de cuentas de juego antes de finalizar cualquier compra.', 'Cuidado com links falsos de contas de jogo antes de finalizar qualquer compra.', 'احذر من روابط حسابات الألعاب المزيفة قبل إتمام أي عملية شراء.', '在完成任何游戏账户购买之前，请警惕虚假的账户链接。'],
        ['No item selected. Go back to Home and pick an image.', 'Aucun article sélectionné. Retournez à l’accueil et choisissez une image.', 'Ningún artículo seleccionado. Vuelve a Inicio y elige una imagen.', 'Nenhum item selecionado. Volte ao Início e escolha uma imagem.', 'لم يتم اختيار عنصر. ارجع إلى الرئيسية واختر صورة.', '未选择物品。请返回首页并选择一张图片。'],
        ['This item could not be found. Go back to Home and pick an image.', 'Cet article est introuvable. Retournez à l’accueil et choisissez une image.', 'No se encontró este artículo. Vuelve a Inicio y elige una imagen.', 'Este item não foi encontrado. Volte ao Início e escolha uma imagem.', 'تعذر العثور على هذا العنصر. ارجع إلى الرئيسية واختر صورة.', '找不到该物品。请返回首页并选择一张图片。'],
        ['▶ Join', '▶ Rejoindre', '▶ Unirse', '▶ Entrar', '▶ انضم', '▶ 加入'],
        ['Offline', 'Hors ligne', 'Sin conexión', 'Offline', 'غير متصل', '离线'],
        ['Reconnecting', 'Reconnexion', 'Reconectando', 'Reconectando', 'جارٍ إعادة الاتصال', '正在重新连接'],
        ['Connected', 'Connecté', 'Conectado', 'Conectado', 'متصل', '已连接'],
        ['Space not allowed', 'Espaces non autorisés', 'No se permiten espacios', 'Espaços não permitidos', 'المسافات غير مسموحة', '不允许使用空格'],
        ['Username has been taken', "Ce nom d'utilisateur est déjà pris", 'El nombre de usuario ya está en uso', 'Nome de usuário já em uso', 'اسم المستخدم مستخدم بالفعل', '用户名已被占用'],
        ['Invalid Username or Password', "Nom d'utilisateur ou mot de passe invalide", 'Usuario o contraseña no válidos', 'Usuário ou senha inválidos', 'اسم المستخدم أو كلمة المرور غير صحيحة', '用户名或密码无效'],
        ['Game Ticket', 'Ticket de jeu', 'Ticket de juego', 'Ticket de jogo', 'تذكرة اللعبة', '游戏券'],
        ['Open Navigation Menu', 'Ouvrir le menu de navigation', 'Abrir menú de navegación', 'Abrir menu de navegação', 'افتح قائمة التنقل', '打开导航菜单'],
        ['Please select an image file.', 'Veuillez sélectionner un fichier image.', 'Selecciona un archivo de imagen.', 'Selecione um arquivo de imagem.', 'يرجى اختيار ملف صورة.', '请选择图片文件。'],
        ['Account name is required by force!', 'Le nom du compte est obligatoire !', '¡El nombre de la cuenta es obligatorio!', 'O nome da conta é obrigatório!', 'اسم الحساب مطلوب!', '必须填写账户名称！'],
        ['Language', 'Langue', 'Idioma', 'Idioma', 'اللغة', '语言'],
        ['Currency', 'Devise', 'Moneda', 'Moeda', 'العملة', '货币']
    ];
    var DICT = {};
    ORDER.forEach(function (l, i) { DICT[l] = {}; ROWS.forEach(function (r) { DICT[l][r[0]] = r[i + 1]; }); });

    function ls(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
    function lset(k, v) { try { localStorage.setItem(k, v); } catch (e) { } }
    function norm(s) { return String(s).replace(/\s+/g, ' ').trim(); }

    /* ---------- who is this visitor? ---------- */
    function detectLang() {
        var s = ls(K.lang); if (s && LANGS[s]) return s;
        var list = navigator.languages || [navigator.language || 'en'];
        for (var i = 0; i < list.length; i++) { var b = String(list[i]).toLowerCase().split('-')[0]; if (LANGS[b]) return b; }
        return 'en';
    }
    var TZ = { 'Africa/Lagos': 'NGN', 'Africa/Accra': 'GHS', 'Africa/Nairobi': 'KES', 'Africa/Johannesburg': 'ZAR', 'Africa/Cairo': 'EGP', 'Africa/Casablanca': 'MAD', 'Africa/Algiers': 'DZD', 'Africa/Tunis': 'TND', 'Africa/Addis_Ababa': 'ETB', 'Africa/Dar_es_Salaam': 'TZS', 'Africa/Kampala': 'UGX', 'Africa/Dakar': 'XOF', 'Africa/Abidjan': 'XOF', 'Africa/Douala': 'XAF', 'Europe/London': 'GBP', 'Asia/Kolkata': 'INR', 'Asia/Calcutta': 'INR', 'Asia/Dubai': 'AED', 'Asia/Riyadh': 'SAR', 'Asia/Tokyo': 'JPY', 'Asia/Shanghai': 'CNY', 'Asia/Seoul': 'KRW', 'Asia/Singapore': 'SGD', 'Asia/Manila': 'PHP', 'Asia/Jakarta': 'IDR', 'Asia/Karachi': 'PKR', 'Asia/Dhaka': 'BDT', 'Europe/Istanbul': 'TRY', 'Europe/Moscow': 'RUB', 'America/Sao_Paulo': 'BRL', 'America/Mexico_City': 'MXN', 'America/Toronto': 'CAD', 'America/Vancouver': 'CAD', 'Australia/Sydney': 'AUD', 'Australia/Melbourne': 'AUD', 'Pacific/Auckland': 'NZD' };
    var REG = { NG: 'NGN', GH: 'GHS', KE: 'KES', ZA: 'ZAR', EG: 'EGP', GB: 'GBP', US: 'USD', CA: 'CAD', AU: 'AUD', NZ: 'NZD', IN: 'INR', BR: 'BRL', MX: 'MXN', JP: 'JPY', CN: 'CNY', KR: 'KRW', AE: 'AED', SA: 'SAR', TR: 'TRY', RU: 'RUB', PK: 'PKR', BD: 'BDT', PH: 'PHP', ID: 'IDR', SG: 'SGD', CH: 'CHF', SE: 'SEK', NO: 'NOK', DK: 'DKK', PL: 'PLN', TZ: 'TZS', UG: 'UGX', MA: 'MAD', SN: 'XOF', CI: 'XOF', CM: 'XAF' };
    var EUR = 'DE FR ES IT PT NL BE AT IE FI GR LU SK SI EE LV LT MT CY HR';
    function detectCur() {
        var s = ls(K.cur); if (s) return s;
        try { var tz = Intl.DateTimeFormat().resolvedOptions().timeZone; if (TZ[tz]) return TZ[tz]; if (/^Europe\/(Paris|Berlin|Madrid|Rome|Lisbon|Amsterdam|Brussels|Vienna|Dublin|Helsinki|Athens)/.test(tz)) return 'EUR'; } catch (e) { }
        var list = navigator.languages || [navigator.language || ''];
        for (var i = 0; i < list.length; i++) { var m = /-([A-Za-z]{2})$/.exec(list[i]); if (m) { var r = m[1].toUpperCase(); if (REG[r]) return REG[r]; if (EUR.indexOf(r) > -1) return 'EUR'; } }
        return 'USD';
    }
    var lang = detectLang(), cur = detectCur();
    var CURS = ['USD', 'EUR', 'GBP', 'NGN', 'GHS', 'KES', 'ZAR', 'EGP', 'INR', 'BRL', 'MXN', 'CAD', 'AUD', 'JPY', 'CNY', 'AED', 'SAR', 'TRY', 'RUB'];
    if (CURS.indexOf(cur) < 0) CURS.unshift(cur);
    function locale() { var l = (navigator.languages && navigator.languages[0]) || 'en'; return l.toLowerCase().split('-')[0] === lang ? l : lang; }

    /* ---------- currency ---------- */
    var rates = { USD: 1, NGN: 1500, EUR: 0.92, GBP: 0.78, GHS: 15.5, KES: 129, ZAR: 18.5, EGP: 49, INR: 83.5, BRL: 5.4, MXN: 17.5, CAD: 1.37, AUD: 1.5, JPY: 150, CNY: 7.2, AED: 3.67, SAR: 3.75, TRY: 33, RUB: 92 }; // fallback, approximate
    try { var cached = JSON.parse(ls(K.rates) || 'null'); if (cached && cached.r) rates = cached.r; } catch (e) { }
    function loadRates() {
        var c; try { c = JSON.parse(ls(K.rates) || 'null'); } catch (e) { }
        if (c && Date.now() - c.t < 12 * 36e5) return;
        fetch('https://open.er-api.com/v6/latest/USD').then(function (r) { return r.json(); }).then(function (d) {
            if (d && d.rates) { rates = d.rates; lset(K.rates, JSON.stringify({ t: Date.now(), r: rates })); renderPrices(); }
        }).catch(function () { });
    }
    function money(usd) {
        var v = usd * (rates[cur] || 1);
        try { return new Intl.NumberFormat(locale(), { style: 'currency', currency: cur }).format(v); }
        catch (e) { return cur + ' ' + v.toFixed(2); }
    }
    function number(n) { try { return new Intl.NumberFormat(locale()).format(n); } catch (e) { return String(n); } }
    function renderPrices() {
        document.querySelectorAll('[data-price-usd]').forEach(function (el) {
            el.setAttribute('data-no-translate', ''); el.textContent = money(parseFloat(el.getAttribute('data-price-usd')));
        });
    }

    /* ---------- translation ---------- */
    var mt = {}; try { mt = JSON.parse(ls(K.mt) || '{}'); } catch (e) { }
    var pending = {}, SKIP = '[data-no-translate],.account-card-title,.auction-item h2,script,style,textarea,noscript,code';
    function lookup(s) {
        var n = norm(s); if (!n || lang === 'en') return null;
        return (DICT[lang] && DICT[lang][n]) || mt[lang + '|' + n] || null;
    }
    function queueMT(s) {
        var n = norm(s);
        if (lang === 'en' || DICT[lang] && DICT[lang][n] || mt[lang + '|' + n]) return;
        if (!/[A-Za-z]{3}/.test(n) || n.length > 400 || n === 'GameAuc') return;
        var key = lang + '|' + n; if (pending[key]) return; pending[key] = 1;
        var pair = 'en|' + (lang === 'zh' ? 'zh-CN' : lang);
        fetch('https://api.mymemory.translated.net/get?q=' + encodeURIComponent(n) + '&langpair=' + pair)
            .then(function (r) { return r.json(); }).then(function (d) {
                if (d && d.responseStatus == 200 && d.responseData && d.responseData.translatedText) {
                    mt[key] = d.responseData.translatedText; lset(K.mt, JSON.stringify(mt)); schedule();
                }
            }).catch(function () { });
    }
    var nodes = new WeakMap();
    function doText(node) {
        var p = node.parentElement; if (!p || p.closest(SKIP)) return;
        var rec = nodes.get(node), orig = rec && node.data === rec.out ? rec.o : node.data;
        var tr = lookup(orig);
        if (!tr) { if (lang !== 'en') queueMT(orig); if (rec && rec.out !== orig) node.data = orig; nodes.set(node, { o: orig, out: orig }); return; }
        var out = orig.match(/^\s*/)[0] + tr + orig.match(/\s*$/)[0];
        node.data = out; nodes.set(node, { o: orig, out: out });
    }
    function doAttr(el, a) {
        var cur0 = el.getAttribute(a); if (cur0 === null || el.closest('[data-no-translate]')) return;
        var o = el.getAttribute('data-i18n-o-' + a);
        if (o === null || cur0 !== el.getAttribute('data-i18n-t-' + a)) o = cur0;
        var tr = lookup(o); if (!tr && lang !== 'en') queueMT(o);
        var out = tr || o; el.setAttribute('data-i18n-o-' + a, o); el.setAttribute('data-i18n-t-' + a, out);
        if (out !== cur0) el.setAttribute(a, out);
    }
    var obs, timer;
    function scan() {
        if (obs) obs.disconnect();
        var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT), n;
        while ((n = w.nextNode())) doText(n);
        document.querySelectorAll('[placeholder],[title],[aria-label]').forEach(function (el) { ['placeholder', 'title', 'aria-label'].forEach(function (a) { doAttr(el, a); }); });
        var t0 = document.documentElement.getAttribute('data-i18n-title') || document.title;
        var parts = t0.split(' - '), first = lookup(parts[0]) || parts[0];
        document.documentElement.setAttribute('data-i18n-title', t0); parts[0] = first; document.title = parts.join(' - ');
        document.documentElement.lang = lang; document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        if (obs) obs.observe(document.body, { childList: true, characterData: true, subtree: true, attributes: true, attributeFilter: ['placeholder', 'title', 'aria-label'] });
    }
    function schedule() { clearTimeout(timer); timer = setTimeout(function () { scan(); renderPrices(); }, 40); }

    /* alerts: dictionary or cached auto-translation, otherwise English (and it is queued for next time) */
    var realAlert = window.alert;
    window.alert = function (m) { var s = String(m); if (!lookup(s)) queueMT(s); realAlert.call(window, lookup(s) || s); };

    /* ---------- little 🌐 picker so visitors can override the automatic choice ---------- */
    function picker() {
        var box = document.createElement('div'); box.setAttribute('data-no-translate', '');
        box.style.cssText = 'position:fixed;left:14px;bottom:70px;z-index:2147483000;font:600 13px Inter,Segoe UI,Arial,sans-serif;color:#fff';
        var btn = document.createElement('button'); btn.textContent = '🌐'; btn.title = 'Language / Currency';
        btn.style.cssText = 'width:42px;height:42px;border-radius:50%;border:1px solid rgba(139,92,246,.5);background:#1e1838;color:#fff;font-size:20px;cursor:pointer';
        var panel = document.createElement('div');
        panel.style.cssText = 'display:none;margin-bottom:8px;padding:12px;border-radius:12px;background:#1e1838;border:1px solid rgba(139,92,246,.5);min-width:170px';
        function mk(label, opts, val, fn) {
            var l = document.createElement('label'); l.style.cssText = 'display:block;margin-bottom:8px'; l.textContent = label;
            var s = document.createElement('select'); s.style.cssText = 'display:block;width:100%;margin-top:4px;padding:6px;border-radius:6px;background:#0f0c1b;color:#fff;border:1px solid rgba(139,92,246,.4)';
            opts.forEach(function (o) { var e = document.createElement('option'); e.value = o[0]; e.textContent = o[1]; if (o[0] === val) e.selected = true; s.appendChild(e); });
            s.onchange = function () { fn(s.value); }; l.appendChild(s); panel.appendChild(l);
        }
        function build() {
            panel.innerHTML = '';
            mk(lookup('Language') || 'Language', Object.keys(LANGS).map(function (k) { return [k, LANGS[k]]; }), lang, setLang);
            mk(lookup('Currency') || 'Currency', CURS.map(function (c) { return [c, c]; }), cur, setCurrency);
        }
        build(); box.appendChild(panel); box.appendChild(btn); document.body.appendChild(box);
        btn.onclick = function () { build(); panel.style.display = panel.style.display === 'none' ? 'block' : 'none'; };
    }

    function setLang(l) { lang = l; lset(K.lang, l); schedule(); renderPrices(); }
    function setCurrency(c) { cur = c; lset(K.cur, c); renderPrices(); document.dispatchEvent(new Event('gameauc-currency')); }

    window.GameAucI18n = { t: function (s) { return lookup(s) || s; }, money: money, number: number, setLang: setLang, setCurrency: setCurrency, lang: function () { return lang; }, currency: function () { return cur; } };

    function init() {
        obs = new MutationObserver(schedule);
        scan(); renderPrices(); loadRates(); picker();
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
