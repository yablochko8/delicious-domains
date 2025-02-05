import { checkDomainAvailable } from "../processors/checkDomainAvailable";
import { getDomainLongList } from "../processors/getDomainLongList";

interface DomainProcessingResult {
  status: 'success' | 'error';
  domains?: string[];
  error?: string;
  stage?: string;
}

export class DomainService {
  private readonly MAX_DOMAINS = 100;

  async processDomainRequest(userInput: {
    purpose: string;
    vibe: string;
    theme: string;
    preferredTlds: string[];
  }): Promise<DomainProcessingResult> {
    try {
      // Stage 1: LLM Generation
      const suggestedDomains = await this.generateDomains(userInput);
      
      // Stage 2: Availability Check
      const availableDomains = await this.checkAvailability(suggestedDomains);

      return {
        status: 'success',
        domains: availableDomains
      };
    } catch (error) {
      return {
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        stage: error instanceof ProcessingError ? error.stage : undefined
      };
    }
  }

  private async generateDomains(userInput: {
    purpose: string;
    vibe: string;
    theme: string;
    preferredTlds: string[];
  }): Promise<string[]> {
    try {
      return await getDomainLongList(
        userInput.purpose,
        userInput.vibe,
        userInput.theme,
        userInput.preferredTlds
      );
    } catch (error) {
      throw new ProcessingError('Domain generation failed', 'llm-generation');
    }
  }

  private async checkAvailability(domains: string[]): Promise<string[]> {
    const domainsToCheck = domains.slice(0, this.MAX_DOMAINS);
    const validDomains: string[] = [];

    for (const domain of domainsToCheck) {
      try {
        const isAvailable = await checkDomainAvailable(domain);
        if (isAvailable) {
          validDomains.push(domain);
        }
      } catch (error) {
        console.error(`Error checking domain ${domain}:`, error);
        continue;
      }
    }

    if (validDomains.length === 0) {
      throw new ProcessingError('No available domains found', 'availability-check');
    }

    return validDomains;
  }
}

class ProcessingError extends Error {
  constructor(message: string, public stage: string) {
    super(message);
    this.name = 'ProcessingError';
  }
}