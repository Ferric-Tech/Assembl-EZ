import { Component } from '@angular/core';
import { AgentPageViewState as ViewState } from 'app/enums/viewstates.enum';
import { EmailsService } from 'app/services/emails.service';
import { Agent, AgentService } from 'app/services/agent.service';
import { LoadingService } from 'app/services/loading.service';

@Component({
  selector: 'app-agents-page',
  templateUrl: './agents.page.html',
  styleUrls: ['./agents.page.scss'],
})
export class AgentsPage {
  viewState = ViewState;
  currentViewState = ViewState.VIEW;
  agents: { [key: string]: any } = {};
  agent: { [key: string]: string } = {};

  constructor(
    private emailsService: EmailsService,
    private agentService: AgentService,
    private loadingService: LoadingService
  ) {}

  ngOnInt() {
    this.getUpdatedAgents();
  }

  async onNewAgentFormSubmitted(formValue: { [key: string]: string }) {
    const agent = formValue as unknown as Agent;
    this.loadingService.setLoading();
    await this.agentService.addAgent(agent).then(
      (success) => {},
      (error) => {}
    );
    this.loadingService.cancelLoading();
    this.emailsService.newAgentEmail();
    this.currentViewState = ViewState.MENU;
  }

  onAgentClicked(index: number) {
    let agentRefs = Object.values(this.agents);
    this.agent = agentRefs[index];
    this.currentViewState = ViewState.VIEW_AGENT;
  }

  onViewStateSelected(viewState: number) {
    this.currentViewState = viewState;
  }

  private async getUpdatedAgents(): Promise<void> {
    await this.agentService.getAgents().then(
      async (agents) => {
        this.agents = agents;
      },
      (error) => {}
    );
  }
}
