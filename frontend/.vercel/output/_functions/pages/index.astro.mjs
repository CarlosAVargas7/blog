import { e as createComponent, f as createAstro, h as addAttribute, k as renderHead, l as renderComponent, r as renderTemplate } from '../chunks/astro/server_Ce4Nkgvr.mjs';
import 'kleur/colors';
import { b as bind_props } from '../chunks/_@astro-renderers_B7J8j5P0.mjs';
export { r as renderers } from '../chunks/_@astro-renderers_B7J8j5P0.mjs';
/* empty css                                 */

const CONTENT_REGEX = /[&<]/g;

/**
 * @template V
 * @param {V} value
 * @param {boolean} [is_attr]
 */
function escape_html(value, is_attr) {
	const str = String(value ?? '');

	const pattern = CONTENT_REGEX;
	pattern.lastIndex = 0;

	let escaped = '';
	let last = 0;

	while (pattern.test(str)) {
		const i = pattern.lastIndex - 1;
		const ch = str[i];
		escaped += str.substring(last, i) + (ch === '&' ? '&amp;' : ch === '"' ? '&quot;' : '&lt;');
		last = i + 1;
	}

	return escaped + str.substring(last);
}

// Store the references to globals in case someone tries to monkey patch these, causing the below
// to de-opt (this occurs often when using popular extensions).

/**
 * @template V
 * @param {V} value
 * @param {V | (() => V)} fallback
 * @param {boolean} [lazy]
 * @returns {V}
 */
function fallback(value, fallback, lazy = false) {
	return value === undefined
		? lazy
			? /** @type {() => V} */ (fallback)()
			: /** @type {V} */ (fallback)
		: value;
}

function Hora($$payload, $$props) {
	let hora = $$props['hora'];

	$$payload.out.push(`<h2 class="svelte-s8xzf8">🕒 Hora desde Svelte (SSR)</h2> <p>La hora actual es: <strong>${escape_html(hora)}</strong></p>`);
	bind_props($$props, { hora });
}

function HolaCarlos($$payload, $$props) {
	let nombre = fallback($$props['nombre'], "");

	$$payload.out.push(`<h1>Hola ${escape_html(nombre)}, ¡tu frontend está vivo! 🚀</h1>`);
	bind_props($$props, { nombre });
}

const $$Astro = createAstro();
const prerender = false;
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const horaServidor = (/* @__PURE__ */ new Date()).toLocaleString("es-CO", {
    timeZone: "America/Bogota"
  });
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>Astro</title>${renderHead()}</head> <body> <h1>Astro</h1> <div> ${renderComponent($$result, "HolaCarlos", HolaCarlos, { "nombre": "Carloz" })} </div> <div> <h1>Bienvenido a mi página Astro + Svelte</h1> ${renderComponent($$result, "Hora", Hora, { "hora": horaServidor })} </div> </body></html>`;
}, "D:/Users/Development/Documents/GitHub/blog/frontend/src/pages/index.astro", void 0);

const $$file = "D:/Users/Development/Documents/GitHub/blog/frontend/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
