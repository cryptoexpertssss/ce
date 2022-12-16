import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import create from 'zustand';
import { Announcement } from '../models/model.announcement';
import { AuthUser } from '../models/model.authuser';
import { Signal } from '../models/model.signal';
import { authClient, firestoreClient } from '../_firebase/firebase_client';

type State = {
  isInitialized: boolean;
  isAuthenticated: boolean;
  authUser: AuthUser | null;
  isSuperAdmin: boolean | null;
  streamFirebaseUser: () => void;
  streamAuthUserAdmin: () => void;

  signals: Signal[];
  announcements: Announcement[];
  authUsers: AuthUser[];
  subscriptions: any;

  streamSignals: () => void;
  streamAnnouncements: () => void;
  streamAuthUsers: () => void;
  closeSubscriptions: () => void;
};

export const useFirestoreStoreAdmin = create<State>((set, get) => ({
  isInitialized: false,
  isAuthenticated: false,
  authUser: null,
  isSuperAdmin: null,

  subscriptions: {},
  signals: [],
  announcements: [],
  authUsers: [],

  streamFirebaseUser: () => {
    authClient.onAuthStateChanged((u: any) => {
      console.log('streamAuthStateChanged zustand', u);
      set((state) => {
        return { ...state, isAuthenticated: u ? true : false, isInitialized: true };
      });

      if (!u) get().closeSubscriptions();
    });
  },

  streamSignals: () => {
    const q = query(collection(firestoreClient, 'signals'), orderBy('timestampCreated', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const x = querySnapshot.docs.map((doc) => {
        return Signal.fromJson({
          ...doc.data(),
          id: doc.id,
          timestampCreated: doc.data()!.timestampCreated?.toDate(),
          timestampUpdated: doc.data()!.timestampUpdated?.toDate(),
          entryDate: doc.data()!.entryDate?.toDate(),
          entryTime: doc.data()!.entryTime?.toDate(),
          entryDatetime: doc.data()!.entryDatetime?.toDate(),
          stopLossDate: doc.data()!.stopLossDate?.toDate(),
          stopLossTime: doc.data()!.stopLossTime?.toDate(),
          stopLossDatetime: doc.data()!.stopLossDatetime?.toDate(),
          takeProfit1Date: doc.data()!.takeProfit1Date?.toDate(),
          takeProfit1Time: doc.data()!.takeProfit1Time?.toDate(),
          takeProfit1Datetime: doc.data()!.takeProfit1Datetime?.toDate(),
          takeProfit2Date: doc.data()!.takeProfit2Date?.toDate(),
          takeProfit2Time: doc.data()!.takeProfit2Time?.toDate(),
          takeProfit2Datetime: doc.data()!.takeProfit2Datetime?.toDate(),
          takeProfit3Date: doc.data()!.takeProfit3Date?.toDate(),
          takeProfit3Time: doc.data()!.takeProfit3Time?.toDate(),
          takeProfit3Datetime: doc.data()!.takeProfit3Datetime?.toDate()
        });
      });
      set((state) => {
        return { ...state, signals: x };
      });
    });

    set((state) => {
      return { ...state, subscriptions: { ...state.subscriptions, signals: unsubscribe } };
    });
  },

  streamAnnouncements: () => {
    const q = query(collection(firestoreClient, 'announcements'), orderBy('timestampCreated', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const x = querySnapshot.docs.map((doc) => {
        return Announcement.fromJson({
          ...doc.data(),
          id: doc.id,
          timestampCreated: doc.data()!.timestampCreated?.toDate(),
          timestampUpdated: doc.data()!.timestampUpdated?.toDate()
        });
      });
      set((state) => {
        return { ...state, announcements: x };
      });
    });
    set((state) => {
      return { ...state, subscriptions: { ...state.subscriptions, announcements: unsubscribe } };
    });
  },

  streamAuthUsers: () => {
    const q = query(collection(firestoreClient, 'users'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const x = querySnapshot.docs.map((doc) => {
        return AuthUser.fromJson({
          ...doc.data(),
          id: doc.id,
          timestampCreated: doc.data()!.timestampCreated?.toDate(),
          timestampUpdated: doc.data()!.timestampUpdated?.toDate(),
          timestampLastLogin: doc.data()!.lastLogin?.toDate()
        });
      });
      set((state) => {
        return { ...state, authUsers: x };
      });
    });

    set((state) => {
      return { ...state, subscriptions: { ...state.subscriptions, authUsers: unsubscribe } };
    });
  },

  streamAuthUserAdmin: () => {
    const fbuser = authClient.currentUser;
    if (!fbuser) return get().closeSubscriptions();

    const unsubscribe = onSnapshot(doc(firestoreClient, 'users', fbuser.uid), (doc) => {
      const x = AuthUser.fromJson({
        ...doc.data(),
        id: doc.id,
        timestampCreated: doc.data()!.timestampCreated?.toDate(),
        timestampUpdated: doc.data()!.timestampUpdated?.toDate(),
        timestampLastLogin: doc.data()!.lastLogin?.toDate(),
        subStripeEnd: doc.data()!.subStripeEnd?.toDate(),
        subStripeStart: doc.data()!.subStripeStart?.toDate(),
        subRevenueCatOriginalPurchaseDate: doc.data()!.subRevenueCatOriginalPurchaseDate?.toDate(),
        subRevenueCatLatestPurchaseDate: doc.data()!.subRevenueCatLatestPurchaseDate?.toDate(),
        subRevenueCatExpirationDate: doc.data()!.subRevenueCatExpirationDate?.toDate(),
        subRevenueCatUnsubscribeDetectedAt: doc.data()!.subRevenueCatUnsubscribeDetectedAt?.toDate(),
        subRevenueCatBillingIssueDetectedAt: doc.data()!.subRevenueCatBillingIssueDetectedAt?.toDate()
      });

      if (get().isSuperAdmin !== x.isSuperAdmin) {
        get().closeSubscriptions();

        if (x.isSuperAdmin) {
          get().streamSignals();
          get().streamAnnouncements();
          get().streamAuthUsers();
        }
      }

      set((state) => {
        return { ...state, authUser: x, authUserHasSubscriptions: x.getHasSubscription };
      });
    });
  },

  closeSubscriptions: () => {
    get().subscriptions.signals();
    get().subscriptions.announcements();
    get().subscriptions.authUsers();
  }
}));
