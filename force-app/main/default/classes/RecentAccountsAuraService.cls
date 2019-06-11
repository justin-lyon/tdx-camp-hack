public with sharing class RecentAccountsAuraService {

  @AuraEnabled(cacheable=true)
  public static List<Account> getRecentAccounts(Integer limitter) {
    List<Account> found = new List<Account>();
    for(RecentlyViewed rv : queryRecentlyViewedAccounts(limitter)) {
      found.add(new Account(
        Id = rv.Id,
        Name = rv.Name));
    }
    return found;
  }

  private static List<RecentlyViewed> queryRecentlyViewedAccounts(Integer limitter) {
    limitter = Integer.valueOf(limitter);
    return [
      SELECT Id,
        Name
      FROM RecentlyViewed
      WHERE Type = 'Account'
      LIMIT :limitter];
  }
}
