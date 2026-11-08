// DEMO DATA — tools, courses and plans shown in the visual prototype.
import hero from "@/assets/hero-3d-printer.jpg";
import workshop from "@/assets/centrico-workshop.jpg";
import luminaria from "@/assets/prod-luminaria.jpg";
import miniaturas from "@/assets/prod-miniaturas.jpg";
import resina from "@/assets/prod-resina.jpg";
import chaveiros from "@/assets/prod-chaveiros.jpg";
import type { Course, Plan, Tool, ToolCategory } from "./types";

export const toolCategories: { id: ToolCategory; name: string }[] = [
  { id: "documentos", name: "Documentos & PDF" },
  { id: "imagens", name: "Imagens" },
  { id: "calculadoras", name: "Calculadoras" },
  { id: "ia", name: "Inteligência Artificial" },
  { id: "utilidades", name: "Utilidades" },
];

export const tools: Tool[] = [
  { id: "pdf-converter", name: "Conversor PDF", description: "Converta PDF para Word, Excel, JPG e vice-versa em segundos.", category: "documentos", icon: "FileText", popular: true, uses: "48 mil usos/mês" },
  { id: "pdf-merge", name: "Juntar PDFs", description: "Combine vários arquivos PDF em um único documento organizado.", category: "documentos", icon: "Files", uses: "21 mil usos/mês" },
  { id: "pdf-compress", name: "Comprimir PDF", description: "Reduza o tamanho dos seus PDFs mantendo a qualidade.", category: "documentos", icon: "FileArchive", uses: "17 mil usos/mês" },
  { id: "image-editor", name: "Editor de Imagens", description: "Recorte, redimensione, ajuste cores e aplique filtros profissionais.", category: "imagens", icon: "ImagePlus", popular: true, uses: "36 mil usos/mês" },
  { id: "bg-remover", name: "Removedor de Fundo", description: "Remova o fundo de fotos automaticamente com IA.", category: "imagens", icon: "Eraser", pro: true, uses: "29 mil usos/mês" },
  { id: "image-compress", name: "Compressor de Imagens", description: "Otimize JPG, PNG e WebP para web sem perder nitidez.", category: "imagens", icon: "Minimize2", uses: "12 mil usos/mês" },
  { id: "calculators", name: "Calculadoras", description: "Porcentagem, juros, regra de três, IMC e muito mais.", category: "calculadoras", icon: "Calculator", popular: true, uses: "52 mil usos/mês" },
  { id: "print-cost", name: "Custo de Impressão 3D", description: "Calcule filamento, energia e margem de lucro por peça.", category: "calculadoras", icon: "Box", uses: "8 mil usos/mês" },
  { id: "ai-writer", name: "Gerador de Textos com IA", description: "Crie descrições, legendas, e-mails e artigos em segundos.", category: "ia", icon: "Sparkles", popular: true, pro: true, uses: "41 mil usos/mês" },
  { id: "ai-image", name: "Gerador de Imagens IA", description: "Transforme ideias em imagens a partir de uma descrição.", category: "ia", icon: "Wand2", pro: true, uses: "19 mil usos/mês" },
  { id: "qr-code", name: "Gerador de QR Code", description: "Crie QR Codes personalizados com cores e logotipo.", category: "utilidades", icon: "QrCode", uses: "14 mil usos/mês" },
  { id: "unit-converter", name: "Conversor de Unidades", description: "Medidas, peso, temperatura, moedas e dados.", category: "utilidades", icon: "ArrowLeftRight", uses: "9 mil usos/mês" },
  { id: "editor-avancado", name: "Editor Avançado", description: "Recorte, redimensione, ajuste cores e aplique filtros profissionais.", category: "imagens", icon: "ImagePlus", popular: true, uses: "36 mil usos/mês" },
];

export const courses: Course[] = [
  { id: "c1", title: "Impressão 3D do zero ao primeiro produto", level: "Iniciante", duration: "4h 20min", lessons: 24, topic: "Impressão 3D", free: true, image: hero },
  { id: "c2", title: "Resina 8K: acabamento profissional", level: "Intermediário", duration: "3h 05min", lessons: 18, topic: "Impressão 3D", free: false, image: resina },
  { id: "c3", title: "IA para criar descrições que vendem", level: "Iniciante", duration: "1h 40min", lessons: 10, topic: "Inteligência Artificial", free: true, image: workshop },
  { id: "c4", title: "Modelagem 3D para miniaturas", level: "Avançado", duration: "6h 15min", lessons: 32, topic: "Design", free: false, image: miniaturas },
  { id: "c5", title: "Litofanias: da foto à luminária", level: "Intermediário", duration: "2h 10min", lessons: 12, topic: "Design", free: false, image: luminaria },
  { id: "c6", title: "Produtividade com ferramentas online", level: "Iniciante", duration: "1h 15min", lessons: 8, topic: "Produtividade", free: true, image: chaveiros },
];

export const plans: Plan[] = [
  {
    id: "free",
    name: "Essencial",
    priceMonthly: 0,
    priceYearly: 0,
    description: "Para começar a usar as ferramentas do dia a dia.",
    features: ["10 conversões de PDF por dia", "Editor de imagens básico", "Calculadoras ilimitadas", "5 textos com IA por mês", "Acesso a tutoriais gratuitos"],
    cta: "Começar grátis",
  },
  {
    id: "pro",
    name: "Pro",
    priceMonthly: 29.9,
    priceYearly: 299,
    description: "Para criadores e profissionais que querem ir além.",
    features: ["Ferramentas PDF ilimitadas", "Removedor de fundo com IA", "300 textos com IA por mês", "Todos os cursos do Aprenda", "10% de desconto na loja", "Suporte prioritário"],
    highlight: true,
    cta: "Assinar Pro",
  },
  {
    id: "business",
    name: "Empresas",
    priceMonthly: 89.9,
    priceYearly: 899,
    description: "Para equipes, lojas e produção em escala.",
    features: ["Tudo do plano Pro", "Até 10 usuários", "IA ilimitada com marca própria", "Orçamentos 3D com prioridade", "15% de desconto em atacado", "Gerente de conta dedicado"],
    cta: "Falar com vendas",
  },
];
