import { useState, useEffect } from 'react'
import backgroundVideo from './assets/background.mp4'
import logo from './assets/logo.png'
import { Button } from '@/components/ui/button.jsx'
import { Card } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import {
  MessageCircle,
  Monitor,
  Smartphone,
  Zap,
  CalendarOff,
  RefreshCw,
  CheckCircle,
  HelpCircle,
  DollarSign,
  Clock,
  Phone,
  Mail,
  Menu
} from 'lucide-react'
import './App.css'

const WHATSAPP_NUMBER = '351969629265'

const PRICE_MONTHLY = '40,00 '

const getWhatsAppLink = (type, name = '', email = '', phone = '') => {
  let message = ''
  switch (type) {
    case 'teste':
      message = `Teste por 6 horas. Nome: ${name}; E-mail: ${email}; Telefone: ${phone}.`
      break
    case 'assinatura':
      message = `Olá! Quero assinar o plano mensal de R$ ${PRICE_MONTHLY}. Nome: ${name}; E-mail: ${email}; Telefone: ${phone}.`
      break
    case 'contato':
    default:
      message = `Olá! Quero saber mais sobre o serviço. Nome: ${name}; Telefone: ${phone}.`
      break
  }
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'contato'
  })

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['inicio', 'beneficios', 'planos', 'teste', 'como-funciona', 'prova-social', 'contato']
      const scrollPosition = window.scrollY + 100
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const sectionsData = {
    beneficios: [
      { icon: Monitor, title: 'Qualidade de Imagem Superior', description: 'Desfrute de uma experiência visual imersiva com transmissão em alta definição (HD) e Full HD.' },
      { icon: Smartphone, title: 'Compatibilidade Universal', description: 'Assista em qualquer dispositivo: Smart TV, celular, tablet ou computador. Leve seu entretenimento com você.' },
      { icon: Zap, title: 'Conexão Estável e Rápida', description: 'Tecnologia de ponta que garante carregamento instantâneo e zero travamentos, mesmo nos horários de pico.' },
      { icon: MessageCircle, title: 'Suporte Humano', description: 'Nossa equipe está sempre disponível via WhatsApp para resolver qualquer dúvida ou problema, a qualquer hora.' },
      { icon: CalendarOff, title: 'Sem Contratos Longos', description: 'Cancele quando quiser. Assinatura mensal flexível, sem multas ou burocracia. Sua liberdade em primeiro lugar.' },
      { icon: RefreshCw, title: 'Atualizações Constantes', description: 'Adicionamos novos canais, filmes e séries semanalmente para que você nunca fique sem novidades.' },
    ],
    depoimentos: [
      { name: 'Ana C. (São Paulo)', text: 'A qualidade de imagem é impressionante e o suporte é o melhor que já vi. Resolvem tudo em minutos pelo WhatsApp. Recomendo demais!' },
      { name: 'Ricardo M. (Rio de Janeiro)', text: 'Estava cansado de pagar caro por pacotes limitados. O plano de R$ 40,00 é completo e a estabilidade é perfeita. O teste de 6h me convenceu na hora.' },
      { name: 'Juliana P. (Porto Alegre)', text: 'A biblioteca de filmes e séries é gigantesca! Finalmente encontrei um serviço que funciona de verdade na minha Smart TV. Nota 10!' },
    ]
  }

  const handleContactFormChange = (e) => {
    const { name, value } = e.target
    setContactForm(prev => ({ ...prev, [name]: value }))
  }

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault()
    const { name, email, phone, interest } = contactForm
    const whatsappLink = getWhatsAppLink(interest, name, email, phone)
    window.open(whatsappLink, '_blank')
  }

  return (
    <div className="min-h-screen website-background">
      <div className="video-background-container">
        <video autoPlay loop muted playsInline aria-hidden="true" className="video-background">
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      </div>

      <nav className="fixed top-0 w-full bg-blue-900/90 backdrop-blur-sm shadow-md z-50">
        <div className="container mx-auto px-[clamp(1rem,4vw,2rem)] py-[clamp(0.5rem,2vw,1rem)]">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <img src={logo} alt="Entretenimento Digital" className="h-[clamp(1.5rem,3vw,2.5rem)] w-auto" />
            </div>
            <div className="hidden md:flex gap-[clamp(0.75rem,2vw,2rem)] text-[clamp(0.95rem,1.6vw,1.125rem)]">
              {[
                { id: 'inicio', label: 'Início' },
                { id: 'beneficios', label: 'Benefícios' },
                { id: 'planos', label: 'Planos' },
                { id: 'teste', label: 'Teste 6h' },
                { id: 'como-funciona', label: 'Como Funciona' },
                { id: 'contato', label: 'Contato' },
              ].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`hover:text-white transition-colors ${
                    activeSection === id ? 'text-white font-semibold' : 'text-white'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <button 
              className="md:hidden p-[clamp(0.5rem,2vw,0.75rem)] rounded-[clamp(0.25rem,1vw,0.5rem)] focus:outline-none focus:ring-2 focus:ring-white/60"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Abrir menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <Menu className="text-white w-[clamp(1.25rem,5vw,1.5rem)] h-[clamp(1.25rem,5vw,1.5rem)]" />
            </button>
          </div>
          {isMenuOpen && (
            <div id="mobile-menu" className="md:hidden mt-[clamp(0.5rem,2vw,1rem)] pb-[clamp(0.5rem,2vw,1rem)] px-[clamp(1rem,4vw,1.5rem)] flex flex-col gap-[clamp(0.5rem,2vw,1rem)] bg-blue-900/95 rounded-[clamp(0.5rem,1vw,0.75rem)]">
              {[
                { id: 'inicio', label: 'Início' },
                { id: 'beneficios', label: 'Benefícios' },
                { id: 'planos', label: 'Planos' },
                { id: 'teste', label: 'Teste 6h' },
                { id: 'como-funciona', label: 'Como Funciona' },
                { id: 'contato', label: 'Contato' },
              ].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`text-left py-[clamp(0.5rem,2vw,0.75rem)] text-[clamp(0.95rem,2.5vw,1.125rem)] hover:text-white transition-colors ${
                    activeSection === id ? 'text-white font-semibold' : 'text-white'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      <section id="inicio" className="relative pt-40 pb-32 px-4 min-h-screen flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="container mx-auto text-center relative z-20">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 drop-shadow-lg">
              O Fim da TV Tradicional. Assista a Milhares de Canais, Filmes e Séries Onde Quiser.
            </h1>
            <p className="text-xl md:text-3xl mb-10 font-light drop-shadow-md">
              Liberdade total de entretenimento. Qualidade máxima, sem fidelidade e com suporte.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-green-500 hover:bg-green-600 text-white text-xl px-10 py-7 font-bold transition-transform transform hover:scale-105 shadow-xl"
                onClick={() => window.open(getWhatsAppLink('teste'), '_blank')}
              >
                <Clock className="mr-3 h-6 w-6" />
                Comece Agora
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="bg-white/20 border-2 border-white text-white text-xl px-10 py-7 font-bold hover:bg-white/30 transition-transform transform hover:scale-105 shadow-xl"
                onClick={() => window.open(getWhatsAppLink('contato'), '_blank')}
              >
                <MessageCircle className="mr-3 h-6 w-6" />
                Fale Conosco (WhatsApp)
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="beneficios" className="py-20 px-4 bg-gray-900/60">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            Por Que Escolher a Nossa Plataforma?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sectionsData.beneficios.map((item, index) => (
              <Card key={index} className="p-6 text-center shadow-lg hover:shadow-xl transition-shadow border-t-4 border-blue-900">
                <item.icon className="h-12 w-12 text-white mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-white">{item.title}</h3>
                <p className="text-white/90">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="planos" className="py-20 px-4 bg-white/10">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Plano Mensal Premium
          </h2>
          <p className="text-xl text-white/90 mb-10">
            Acesso completo a todo o nosso catálogo por um preço que cabe no seu bolso.
          </p>
          <Card className="p-8 shadow-2xl border-4 border-blue-900 bg-white/10">
            <div className="flex flex-col items-center">
              <DollarSign className="h-16 w-16 text-white mb-4" />
              <p className="text-5xl font-extrabold text-white mb-2">
                R$ {PRICE_MONTHLY}
              </p>
              <p className="text-xl text-white/80 mb-8">
                por mês
              </p>
              <ul className="text-left space-y-3 mb-10 text-lg text-white">
                <li className="flex items-start"><CheckCircle className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-1" /><span>Acesso Ilimitado a Mais de 3.500 Canais (Esportes, Filmes, Notícias, Infantis)</span></li>
                <li className="flex items-start"><CheckCircle className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-1" /><span>Biblioteca VOD com Mais de 15.000 Filmes e Séries</span></li>
                <li className="flex items-start"><CheckCircle className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-1" /><span>Qualidade HD e Full HD Garantida</span></li>
                <li className="flex items-start"><CheckCircle className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-1" /><span>Suporte Técnico via WhatsApp</span></li>
                <li className="flex items-start"><CheckCircle className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-1" /><span>Cancelamento a Qualquer Momento (Sem Fidelidade)</span></li>
              </ul>
              <Button 
                size="lg" 
                className="w-full bg-blue-900 hover:bg-blue-950 text-white text-xl px-10 py-7 font-bold transition-transform transform hover:scale-[1.02] shadow-lg"
                onClick={() => window.open(getWhatsAppLink('assinatura'), '_blank')}
              >
                <DollarSign className="mr-3 h-6 w-6" />
                Assine Agora R$ {PRICE_MONTHLY}
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <section id="teste" className="py-20 px-4 bg-blue-900 text-white">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-4xl font-bold mb-4">Experimente a Revolução do Entretenimento!</h2>
          <p className="text-xl mb-8 font-light">Você não precisa de compromisso para saber que é o melhor. Oferecemos um Teste Gratuito de 6 Horas para que você explore toda a nossa grade de canais, filmes e séries sem custo. É rápido, fácil e sem burocracia. Vagas limitadas!</p>
          <Button 
            size="lg" 
            className="bg-green-500 hover:bg-green-600 text-white text-xl px-10 py-7 font-bold transition-transform transform hover:scale-105 shadow-xl"
            onClick={() => window.open(getWhatsAppLink('teste'), '_blank')}
          >
            <Clock className="mr-3 h-6 w-6" />
            Teste por 6 horas
          </Button>
        </div>
      </section>

      <section id="como-funciona" className="py-20 px-4 bg-gray-900/60">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-12">Como Funciona em 3 Passos Simples</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: 1, title: 'Escolha Seu Acesso', description: 'Clique no botão "Teste Grátis" ou "Assinar Agora" e inicie o contato via WhatsApp.' },
              { step: 2, title: 'Receba o Acesso', description: 'Nossa equipe enviará suas credenciais e o link para o aplicativo em minutos.' },
              { step: 3, title: 'Comece a Assistir', description: 'Configure em seu dispositivo (Smart TV, Celular, etc.) e desfrute de milhares de opções imediatamente.' },
            ].map((item) => (
              <div key={item.step} className="text-center p-6 bg-gray-900/60 rounded-lg shadow-lg border border-white/20">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-blue-900 text-white rounded-full text-3xl font-bold">{item.step}</div>
                <h3 className="text-2xl font-semibold mb-3 text-white">{item.title}</h3>
                <p className="text-white/90">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="prova-social" className="py-20 px-4 bg-white/10">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-12">Quem Assina, Aprova!</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6 border-b-4 border-blue-900">
              <p className="text-5xl font-extrabold text-white">+15.000</p>
              <p className="text-xl text-white/80">Clientes Ativos</p>
            </div>
            <div className="text-center p-6 border-b-4 border-blue-900">
              <p className="text-5xl font-extrabold text-white">+3.500</p>
              <p className="text-xl text-white/80">Canais Disponíveis</p>
            </div>
            <div className="text-center p-6 border-b-4 border-blue-900">
              <p className="text-5xl font-extrabold text-white">100%</p>
              <p className="text-xl text-white/80">Satisfação Comprovada</p>
            </div>
          </div>
          
        </div>
      </section>


      <section id="contato" className="py-0 px-4 bg-white/10">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-4xl font-bold text-center text-white mb-4">Fale Conosco e Tire Suas Dúvidas</h2>
          <p className="text-xl text-center text-white/80 mb-10">Inicie uma conversa com nossa equipe no WhatsApp.</p>
          <Card className="p-8 shadow-2xl border-t-4 border-blue-900">
            <form onSubmit={handleWhatsAppSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white mb-1">Nome Completo</label>
                <Input id="name" name="name" type="text" placeholder="Seu Nome" className="text-white placeholder:text-white/70" value={contactForm.name} onChange={handleContactFormChange} required />
              </div>
                            <div>
                <label htmlFor="phone" className="block text-sm font-medium text-white mb-1">Telefone (WhatsApp)</label>
                <Input id="phone" name="phone" type="tel" placeholder="+351 9XX XXX XXX" className="text-white placeholder:text-white/70" value={contactForm.phone} onChange={handleContactFormChange} required />
              </div>
              <div>
                <label htmlFor="interest" className="block text-sm font-medium text-white mb-1">Seu Interesse Principal</label>
                <select id="interest" name="interest" value={contactForm.interest} onChange={handleContactFormChange} className="flex h-10 w-full rounded-md border border-white/30 bg-gray-900/60 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 disabled:cursor-not-allowed disabled:opacity-50">
                  <option value="teste">Quero o Teste Grátis de 6 Horas</option>
                  <option value="assinatura">Quero Assinar o Plano Mensal</option>
                </select>
              </div>
              <Button type="submit" size="lg" className="w-full bg-green-500 hover:bg-green-600 text-white text-lg px-10 py-7 font-bold transition-transform transform hover:scale-[1.01] shadow-lg">
                <MessageCircle className="mr-3 h-6 w-6" />
                WhatsApp
              </Button>
              <p className="text-center text-sm text-white/70 mt-4">Ao clicar, você será redirecionado para o WhatsApp com sua mensagem pré-preenchida.</p>
            </form>
          </Card>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <img src={logo} alt="Entretenimento Digital" className="mx-auto mb-4 h-20 w-auto" />
          <p className="mb-4 text-lg font-semibold">Entretenimento Digital - Sua Nova Experiência de TV</p>

          <p className="text-sm text-gray-400">© {new Date().getFullYear()} Todos os direitos reservados. Serviço de TV via internet.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
