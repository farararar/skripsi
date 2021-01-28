<?php

namespace App\Http\Helpers;

use Illuminate\Contracts\Validation\Rule as RuleContract;
use Illuminate\Support\MessageBag;
use Illuminate\Validation\ValidationRuleParser;
use Illuminate\Validation\Validator as BaseValidator;

class Validator extends BaseValidator {

  /** @var MessageBag */
  protected $errorMessages;

  /** @var array */
  protected $hasExplicitFileErrorMessage;

  protected $explicitFileRules = [
    'File', 'Image', 'Mimes', 'Mimetypes', 'Dimensions',
  ];

  function availableErrors()
  {
    $this->errorMessages = new MessageBag();
    $this->hasExplicitFileErrorMessage = [];

    foreach($this->rules as $attribute => $rules) {
      $attribute = str_replace('\.', '->', $attribute);
      foreach($rules as $rule) {
        [$rule, $parameters] = ValidationRuleParser::parse($rule);

        if($rule == '') {
          continue;
        }
        if(($keys = $this->getExplicitKeys($attribute)) &&
          $this->dependsOnOtherFields($rule)) {
          $parameters = $this->replaceAsterisksInParameters($parameters, $keys);
        }
        // explicitly add "failed to upload" error
        if($this->hasRule($attribute, $this->explicitFileRules) && !in_array($attribute, $this->hasExplicitFileErrorMessage)) {
          $this->addFailureMessage($attribute, 'uploaded', []);
          $this->hasExplicitFileErrorMessage[] = $attribute;
        }

        if($rule instanceof RuleContract) {
          $messages = $rule->message() ? (array)$rule->message() : [get_class($rule)];
          foreach($messages as $message) {
            $this->addFailureMessage($attribute, get_class($rule), [], $message);
          }
        } else {
          $this->addFailureMessage($attribute, $rule, $parameters);
        }
      }
    }

    return $this->errorMessages->all();
  }

  function addFailureMessage($attribute, $rule, $parameters = [], $rawMessage = null)
  {
    $this->errorMessages->add($attribute, $this->makeReplacements(
      $rawMessage ?? $this->getMessage($attribute, $rule), $attribute, $rule, $parameters
    ));
  }

  // we have to override this method since file-type errors depends on data value rather than rule type
  protected function getAttributeType($attribute)
  {
    if($this->hasRule($attribute, $this->explicitFileRules)) {
      return 'file';
    }
    return parent::getAttributeType($attribute);
  }
}