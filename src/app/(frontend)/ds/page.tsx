'use client'
import { Button } from '@helder-nicollas/govbr-react-components/button'
import { useTheme } from '@/providers/Theme'
import { useEffect } from 'react'

export default function DesignSystem() {
  const { setTheme } = useTheme()

  useEffect(() => {
    setTheme('light')
  }, [setTheme])

  return (
    <div>
      <div>
        <h1 className="text-2xl">Componentes utilizando classe</h1>
        <button className="br-button primary mr-3" type="button">
          Primário
        </button>
        <button className="br-button primary mr-3 dark:bg-emerald-300 bg-red-500" type="button">
          Primário
        </button>
        <button className="br-button secondary mr-3" type="button">
          Secundário
        </button>
        <button className="br-button" type="button">
          Terciário
        </button>
        <button className="bg-slate-300 p-4 rounded-xl border border-solid border-black">
          Teste com Tailwind
        </button>
      </div>
      <div className="col-sm-6 col-md-4 col-lg-3">
        <div className="br-card">
          <div className="card-header">
            <div className="d-flex">
              <span className="br-avatar mt-1" title="Fulano da Silva">
                <span className="content">
                  <img src="https://picsum.photos/id/823/400" />
                </span>
              </span>
              <div className="ml-3">
                <div className="text-weight-semi-bold text-up-02">Maria Amorim</div>
                <div>UX Designer</div>
              </div>
              <div className="ml-auto">
                <button className="br-button circle" type="button" aria-label="Ícone ilustrativo">
                  <i className="fas fa-ellipsis-v" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="card-content">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste sit dolor
              exercitationem asperiores voluptates tenetur consectetur error vero ut expedita,
              sapiente voluptate nulla esse! Veritatis aliquam consectetur quod harum expedita!
            </p>
          </div>
          <div className="card-footer">
            <div className="text-right">
              <button
                className="br-button circle"
                type="button"
                aria-label="Botão para expandir ou recolher conteúdos adicionais"
                data-toggle="collapse"
                data-target="expanded"
                aria-controls="expanded"
                aria-expanded="false"
                data-visible="false"
              >
                <i className="fas fa-chevron-down" aria-hidden="true"></i>
              </button>
            </div>
            <div id="expanded" hidden={false}>
              <div className="br-list mt-3">
                <div className="br-item">
                  <div className="row">
                    <div className="col-auto">
                      <i className="fas fa-heartbeat" aria-hidden="true"></i>
                    </div>
                    <div className="col">
                      <p className="m-0">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      </p>
                    </div>
                  </div>
                </div>
                <span className="br-divider"></span>
                <div className="br-item">
                  <div className="row">
                    <div className="col-auto">
                      <i className="fas fa-heartbeat" aria-hidden="false"></i>
                    </div>
                    <div className="col">
                      <p className="m-0">
                        Nesciunt, laudantium ea officiis hic tempora velit aperiam nemo accusamus
                        nisi, eligendi ducimus! Incidunt ullam minima ratione amet sequi.
                      </p>
                    </div>
                  </div>
                </div>
                <span className="br-divider"></span>
                <div className="br-item">
                  <div className="row">
                    <div className="col-auto">
                      <i className="fas fa-heartbeat" aria-hidden="true"></i>
                    </div>
                    <div className="col">
                      <p className="m-0">Voluptates, iste recusandae.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-2xl">Componentes de @helder-nicollas/govbr-react-components</h1>
      <Button variant="primary">Botão primário</Button>
      <Button variant="primary" className="dark:bg-emerald-300 bg-emerald-100">
        Botão primário
      </Button>
      <Button variant="outline">Botão outline</Button>
      <Button variant="transparent">Botão transparente</Button>
    </div>
  )
}
